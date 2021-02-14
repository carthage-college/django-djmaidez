# -*- coding: utf-8 -*-

"""Views for all requests."""

import datetime
import json
import logging
import textwrap

from django.conf import settings
from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse
from django.shortcuts import render
from django.template import loader
from django.urls import reverse_lazy
from djauth.decorators import portal_auth_required
from djimix.core.utils import get_connection
from djimix.core.utils import xsql
from djmaidez.contact.data import AA_REC
from djmaidez.contact.data import ENS_FIELDS
from djmaidez.contact.data import MOBILE_CARRIER
from djmaidez.contact.data import RELATIONSHIP


error_logger = logging.getLogger('error_logfile')
debug_logger = logging.getLogger('debug_logfile')

if settings.DEBUG:
    EARL = settings.INFORMIX_ODBC_TRAIN
else:
    EARL = settings.INFORMIX_ODBC


@portal_auth_required(
    session_var='DJSANI_AUTH', redirect_url=reverse_lazy('access_denied'),
)
def test(request):
    """Test the modal outside of an embedded environment."""
    return render(
        request, 'emergency/test.html', {
            'uid': settings.DEFAULT_UID, 'uuid': settings.DEFAULT_UUID,
        },
    )


@portal_auth_required(
    session_var='DJSANI_AUTH', redirect_url=reverse_lazy('access_denied'),
)
def form(request):
    """Called from javascript fill.js onload."""
    template = loader.get_template('emergency/modal.html')
    context_data = {}
    context_data['mobile_carrier'] = MOBILE_CARRIER
    context_data['relationship'] = RELATIONSHIP
    page = template.render(context_data, request)
    page = json.dumps({'emc': page})

    return HttpResponse(
        'successCallback({0})'.format(page),
        content_type='application/json; charset=utf-8',
    )


@portal_auth_required(
    session_var='DJSANI_AUTH', redirect_url=reverse_lazy('access_denied'),
)
def populate(request):
    """Obtain the emergency contacts for display in the form."""
    cid = request.GET.get('UserID', '')
    return_val = ''
    # prevent nefarious deeds and sql injection
    if cid and cid == str(request.user.id) or request.user.is_superuser:
        sql = '{0} AND id="{1}"'.format(AA_REC, cid)
        with get_connection(EARL) as connection:
            rows = xsql(sql, connection).fetchall()
            ens_data = {}

            for row in rows:
                contact = {}
                for field in ENS_FIELDS:
                    if isinstance(getattr(row, field), datetime.date):
                        field_val = getattr(row, field)
                    else:
                        field_val = getattr(row, field)
                        if field_val:
                            field_val = field_val.strip()
                    contact[field] = field_val

                ens_data[row.aa.strip()] = contact
            # the encoder is needed for date values
            return_val = json.dumps(ens_data, cls=DjangoJSONEncoder)
    return HttpResponse(
        'jsonResponcePopulate({0})'.format(return_val),
        content_type='application/json; charset=utf-8',
    )


@portal_auth_required(
    session_var='DJSANI_AUTH', redirect_url=reverse_lazy('access_denied'),
)
def save(request):
    """Called from jquery ui modal construction. .getJSON in buttons."""
    # college ID
    cid = request.GET.get('UserID', '')
    # did the data come from medical forms project?
    djsani = request.GET.get('DJSANI', '')
    # default return message
    message = 'saveDone({"Status":"Failed"})'
    # no need to proceed if we don't have a college ID and the id
    # does not match the signed in user (also prevents sql injection)
    if cid and cid == str(request.user.id):
        # missing person 1
        mis1 = {
            'aa': 'MIS1',
            'line1': request.GET.get('MIS1_NAME', ''),
            'line2': request.GET.get('MIS1_PHONE2', ''),
            'line3': request.GET.get('MIS1_PHONE3', ''),
            'phone': request.GET.get('MIS1_PHONE1', ''),
            'cell_carrier': request.GET.get('MIS1_REL', ''),
        }
        # missing person 2
        mis2 = {
            'aa': 'MIS2',
            'line1': request.GET.get('MIS2_NAME', ''),
            'line2': '',
            'line3': '',
            'phone': request.GET.get('MIS2_PHONE1', ''),
            'cell_carrier': '',
        }
        # missing person 3
        mis3 = {
            'aa': 'MIS3',
            'line1': request.GET.get('MIS3_NAME', ''),
            'line2': '',
            'line3': '',
            'phone': request.GET.get('MIS3_PHONE1', ''),
            'cell_carrier': '',
        }
        # emergency notification system
        ens = {
            'aa': 'ENS',
            'line1': request.GET.get('ENS_EMAIL', ''),
            'line2': '',
            'line3': '',
            'phone': request.GET.get('ENS_SELF_CELL', ''),
            'cell_carrier': request.GET.get('ENS_CARRIER', ''),
        }
        # in case of emergency 1
        ice = {
            'aa': 'ICE',
            'line1': request.GET.get('ICE_NAME', ''),
            'line2': request.GET.get('ICE_PHONE2', ''),
            'line3': request.GET.get('ICE_PHONE3', ''),
            'phone': request.GET.get('ICE_PHONE1', ''),
            'cell_carrier': request.GET.get('ICE_REL', ''),
        }
        # in case of emergency 2
        ice2 = {
            'aa': 'ICE2',
            'line1': request.GET.get('ICE2_NAME', ''),
            'line2': request.GET.get('ICE2_PHONE2', ''),
            'line3': request.GET.get('ICE2_PHONE3', ''),
            'phone': request.GET.get('ICE2_PHONE1', ''),
            'cell_carrier': request.GET.get('ICE2_REL', ''),
        }

        # begin and end dates
        now = datetime.datetime.now()
        this_year = now.year
        next_year = this_year + 1

        if now.month > 1 and now.month < 9:
            end_date = datetime.datetime(year=this_year, month=11, day=1)
        elif now.month > 8:
            end_date = datetime.datetime(year=next_year, month=4, day=1)
        else:
            end_date = datetime.datetime(year=this_year, month=4, day=1)

        with get_connection(EARL) as connection:
            # used for inserts
            cursor = connection.cursor()
            for code in (mis1, mis2, mis3, ens, ice, ice2):
                sql = 'SELECT * FROM aa_rec WHERE aa = "{0}" AND id={1}'.format(
                    code['aa'], cid,
                )
                ens_obj = xsql(sql, connection).fetchone()
                if ens_obj:
                    sql = 'UPDATE aa_rec SET '
                    for key, data_value in code.items():
                        if key != 'aa':
                            sql += '{0} = "{1}",'.format(key, data_value)
                    sql += 'beg_date = TODAY, end_date = ADD_MONTHS(TODAY,6) '
                    sql += 'WHERE aa = "{0}" and id={1}'.format(
                        code['aa'], cid,
                    )
                    xsql(sql, connection)
                else:
                    code['id'] = cid
                    code['beg_date'] = now
                    code['end_date'] = end_date
                    columns = ', '.join(clave for clave in code.keys())
                    insert_sql = textwrap.dedent("""
                        INSERT INTO aa_rec (
                            {0}
                        ) VALUES (
                            ?, ?, ?, ?, ?, ?, ?, ?, ?
                        )
                        """.format(columns),
                    )
                    try:
                        cursor.execute(insert_sql, list(code.values()))
                    except Exception as error:
                        error_logger.error(error, code)

            # medical forms data
            if djsani:
                now = datetime.datetime.now()
                year = now.year
                if now.month < 6:
                    year = now.year - 1
                sql_man = """
                    UPDATE
                        cc_student_medical_manager
                    SET
                        emergency_contact = 1
                    WHERE
                        college_id = {0}
                    AND
                        created_at > "{1}"
                """.format(cid, datetime.datetime(year, 6, 1))
                xsql(sql_man, connection)

            message = 'saveDone({"Status":"Success"})'

    return HttpResponse(message, content_type='application/json; charset=utf-8')
