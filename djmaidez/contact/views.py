from django.conf import settings
from django.http import HttpResponse, Http404
from django.shortcuts import render_to_response
from django.template import Context, RequestContext, loader

from djzbar.utils.informix import get_session
from djtools.utils.database import row2dict

from djmaidez.core.models import (
    AARec, ENS_CODES, ENS_FIELDS, MOBILE_CARRIER, RELATIONSHIP
)

import sys
import datetime
import simplejson

EARL = settings.INFORMIX_EARL

import logging
logger = logging.getLogger(__name__)


def test(request):
    """
    Test the modal outside of an embedded environment
    """
    return render_to_response(
        "contact/test.html",{"uid":settings.DEFAULT_UID},
        context_instance=RequestContext(request)
    )

def form(request):
    """
    Called from javascript fill.js onload
    """
    t = loader.get_template("contact/modal.html")
    data = {}
    data["mobile_carrier"] = MOBILE_CARRIER
    data["relationship"] = RELATIONSHIP
    c = Context(data)
    page = t.render(c)
    json = {'emc':page}
    page = simplejson.dumps(json)
    return HttpResponse(
        "successCallback(" + page + ")",
        content_type="application/json; charset=utf-8"
    )

def populate(request):
    cid = request.GET.get("UserID", "")

    session = get_session(EARL)

    sql = 'SELECT * FROM aa_rec WHERE aa in {} AND id="{}"'.format(
        ENS_CODES, cid
    )
    objs = session.execute(sql)

    data = {}

    for o in objs:
        row = {}
        for field in ENS_FIELDS:
            row[field] = str(getattr(o, field)).decode('cp1252').encode('utf-8')
        data[o.aa] = row

    retVal = simplejson.dumps(data)

    session.close()

    return HttpResponse(
        'jsonResponcePopulate(' + retVal + ')',
        content_type="application/json; charset=utf-8"
    )

def save(request):
    """
    Called from jquery ui modal construction. .getJSON in buttons.
    """

    # college ID
    cid = request.GET.get("UserID", "")
    # did the data come from medical forms project?
    djsani = request.GET.get("DJSANI","")
    # no need to proceed if we don't have a college ID
    if cid:

        # missing person 1
        MIS1 = {
            "aa": "MIS1",
            "line1": request.GET.get("MIS1_NAME", ""),
            "cell_carrier": request.GET.get("MIS1_REL", ""),
            "phone": request.GET.get("MIS1_PHONE1", ""),
            "line2": request.GET.get("MIS1_PHONE2", ""),
            "line3": request.GET.get("MIS1_PHONE3", "")
        }
        # missing person 2
        MIS2 = {
            "aa": "MIS2",
            "line1": request.GET.get("MIS2_NAME", ""),
            "phone": request.GET.get("MIS2_PHONE1", "")
        }
        # missing person 3
        MIS3 = {
            "aa": "MIS3",
            "line1": request.GET.get("MIS3_NAME", ""),
            "phone": request.GET.get("MIS3_PHONE1", "")

        }
        # emergency notification system
        ENS = {
            "aa": "ENS",
            "opt_out": request.GET.get("ENS_SMS", ""),
            "phone": request.GET.get("ENS_SELF_CELL", ""),
            "cell_carrier": request.GET.get("ENS_CARRIER", ""),
            "line1": request.GET.get("ENS_EMAIL", "")
        }
        # in case of emergency 1
        ICE = {
            "aa": "ICE",
            "line1": request.GET.get("ICE_NAME", ""),
            "phone": request.GET.get("ICE_PHONE1", ""),
            "line2": request.GET.get("ICE_PHONE2", ""),
            "line3": request.GET.get("ICE_PHONE3", ""),
            "cell_carrier": request.GET.get("ICE_REL", "")
        }
        # in case of emergency 2
        ICE2 = {
            "aa": "ICE2",
            "line1": request.GET.get("ICE2_NAME", ""),
            "phone": request.GET.get("ICE2_PHONE1", ""),
            "line2": request.GET.get("ICE2_PHONE2", ""),
            "line3": request.GET.get("ICE2_PHONE3", ""),
            "cell_carrier": request.GET.get("ICE2_REL", "")
        }

        # begin and end dates
        now = datetime.datetime.now()
        this_year = now.year
        next_year = this_year+1

        if now.month > 1 and now.month < 9:
            #end_date = datetime.datetime(year=this_year, month=11, day=1).strftime('%Y-%m-%d')
            end_date = datetime.datetime(year=this_year, month=11, day=1)
        elif now.month > 8:
            #end_date = datetime.datetime(year=next_year, month=04, day=1).strftime('%Y-%m-%d')
            end_date = datetime.datetime(year=next_year, month=04, day=1)
        else:
            #end_date = datetime.datetime(year=this_year, month=04, day=1).strftime('%Y-%m-%d')
            end_date = datetime.datetime(year=this_year, month=04, day=1)

        # instantiate our session
        session = get_session(EARL)
        # update else insert
        for code in [MIS1, MIS2, MIS3, ENS, ICE, ICE2]:
            #code["beg_date"] = datetime.datetime.now().strftime('%Y-%m-%d')
            #code["end_date"] = end_date
            sql = 'SELECT * FROM aa_rec WHERE aa = "{}" AND id={}'.format(
                code['aa'], cid
            )
            #logger.debug("select sql = {}".format(sql))
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
                #logger.debug("update sql = {}".format(sql))
                session.execute(sql)
            else:
                code["id"] = cid
                code["beg_date"] = now
                code["end_date"] = end_date
                #logger.debug("code = {}".format(code))
                a = AARec(**code)
                #logger.debug("a = {}".format(a))
                try:
                    session.add(a)
                except Exception as e:
                    #logger.debug("error = {}".format(sys.exc_info()[0]))
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
            content_type="application/json; charset=utf-8"
        )
    else:
        raise Http404
