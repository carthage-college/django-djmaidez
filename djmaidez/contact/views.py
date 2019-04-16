from django.conf import settings
from django.shortcuts import render
from django.template import Context, loader
from django.http import HttpResponse, Http404
from django.core.urlresolvers import reverse_lazy

from djzbar.utils.informix import get_session
from djzbar.decorators.auth import portal_auth_required

from djmaidez.core.models import (
    AARec, ENS_CODES, ENS_FIELDS, MOBILE_CARRIER, RELATIONSHIP
)

import sys
import datetime
import simplejson

EARL = settings.INFORMIX_EARL


@portal_auth_required(
    group = 'SuperStaff',
    session_var='DJSANI_AUTH', redirect_url=reverse_lazy('access_denied')
)
def test(request):
    """
    Test the modal outside of an embedded environment
    """

    return render(
        request, 'contact/test.html', {
            'uid':settings.DEFAULT_UID, 'uuid':settings.DEFAULT_UUID
        }
    )


@portal_auth_required(
    session_var='DJSANI_AUTH', redirect_url=reverse_lazy('access_denied')
)
def form(request):
    """
    Called from javascript fill.js onload
    """

    t = loader.get_template('contact/modal.html')
    data = {}
    data['mobile_carrier'] = MOBILE_CARRIER
    data['relationship'] = RELATIONSHIP
    page = t.render(data, request)
    json = {'emc':page}
    page = simplejson.dumps(json)

    return HttpResponse(
        'successCallback(' + page + ')',
        content_type='application/json; charset=utf-8'
    )


@portal_auth_required(
    session_var='DJSANI_AUTH', redirect_url=reverse_lazy('access_denied')
)
def populate(request):
    cid = request.GET.get('UserID', '')

    if cid and cid == str(request.user.id):
        session = get_session(EARL)

        sql = 'SELECT * FROM aa_rec WHERE aa in {} AND id="{}"'.format(
            ENS_CODES, cid
        )
        objs = session.execute(sql)

        data = {}

        for o in objs:
            row = {}
            for field in ENS_FIELDS:
                row[field] = str(
                    getattr(o, field)
                ).decode('cp1252').encode('utf-8')
            data[o.aa] = row

        retVal = simplejson.dumps(data)

        session.close()

        return HttpResponse(
            'jsonResponcePopulate(' + retVal + ')',
            content_type='application/json; charset=utf-8'
        )
    else:
        raise Http404


@portal_auth_required(
    session_var='DJSANI_AUTH', redirect_url=reverse_lazy('access_denied')
)
def save(request):
    """
    Called from jquery ui modal construction. .getJSON in buttons.
    """

    # college ID
    cid = request.GET.get('UserID', '')
    # did the data come from medical forms project?
    djsani = request.GET.get('DJSANI','')
    # no need to proceed if we don't have a college ID and the id
    # does not match the signed in user
    if cid and cid == str(request.user.id):
        # missing person 1
        MIS1 = {
            'aa': 'MIS1',
            'line1': request.GET.get('MIS1_NAME', ''),
            'cell_carrier': request.GET.get('MIS1_REL', ''),
            'phone': request.GET.get('MIS1_PHONE1', ''),
            'line2': request.GET.get('MIS1_PHONE2', ''),
            'line3': request.GET.get('MIS1_PHONE3', '')
        }
        # missing person 2
        MIS2 = {
            'aa': 'MIS2',
            'line1': request.GET.get('MIS2_NAME', ''),
            'phone': request.GET.get('MIS2_PHONE1', '')
        }
        # missing person 3
        MIS3 = {
            'aa': 'MIS3',
            'line1': request.GET.get('MIS3_NAME', ''),
            'phone': request.GET.get('MIS3_PHONE1', '')

        }
        # emergency notification system
        ENS = {
            'aa': 'ENS',
            'opt_out': request.GET.get('ENS_SMS', ''),
            'phone': request.GET.get('ENS_SELF_CELL', ''),
            'cell_carrier': request.GET.get('ENS_CARRIER', ''),
            'line1': request.GET.get('ENS_EMAIL', '')
        }
        # in case of emergency 1
        ICE = {
            'aa': 'ICE',
            'line1': request.GET.get('ICE_NAME', ''),
            'phone': request.GET.get('ICE_PHONE1', ''),
            'line2': request.GET.get('ICE_PHONE2', ''),
            'line3': request.GET.get('ICE_PHONE3', ''),
            'cell_carrier': request.GET.get('ICE_REL', '')
        }
        # in case of emergency 2
        ICE2 = {
            'aa': 'ICE2',
            'line1': request.GET.get('ICE2_NAME', ''),
            'phone': request.GET.get('ICE2_PHONE1', ''),
            'line2': request.GET.get('ICE2_PHONE2', ''),
            'line3': request.GET.get('ICE2_PHONE3', ''),
            'cell_carrier': request.GET.get('ICE2_REL', '')
        }

        # begin and end dates
        now = datetime.datetime.now()
        this_year = now.year
        next_year = this_year+1

        if now.month > 1 and now.month < 9:
            end_date = datetime.datetime(year=this_year, month=11, day=1)
        elif now.month > 8:
            end_date = datetime.datetime(year=next_year, month=04, day=1)
        else:
            end_date = datetime.datetime(year=this_year, month=04, day=1)

        # instantiate our session
        session = get_session(EARL) # update else insert
        for code in [MIS1, MIS2, MIS3, ENS, ICE, ICE2]:
            sql = 'SELECT * FROM aa_rec WHERE aa = "{}" AND id={}'.format(
                code['aa'], cid
            )
            obj = session.execute(sql).fetchone()
            if obj:
                sql = 'UPDATE aa_rec SET '
                for key, value in code.iteritems():
                    if key != 'aa':
                        sql += '{} = "{}",'.format(key, value)
                sql += 'beg_date = TODAY, end_date = ADD_MONTHS(TODAY,6) '
                sql += 'WHERE aa = "{}" and id={}'.format(
                    code['aa'], cid
                )
                session.execute(sql)
            else:
                code['id'] = cid
                code['beg_date'] = now
                code['end_date'] = end_date
                a = AARec(**code)
                try:
                    session.add(a)
                except Exception as e:
                    logger.debug("errors = {} {}".format(e.message, e.args))

        # medical forms data?
        if djsani:
            from djsani.core.utils import get_manager
            manager = get_manager(session, cid)
            manager.emergency_contact=True

        session.commit()
        session.close()

        return HttpResponse(
            'saveDone({"Status":"Success"})',
            content_type='application/json; charset=utf-8'
        )
    else:
        raise Http404
