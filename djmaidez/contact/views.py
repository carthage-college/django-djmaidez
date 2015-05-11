from django.conf import settings
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template import Context, RequestContext, loader
from django.utils import simplejson

from djzbar.utils.informix import do_sql, get_session
from djtools.utils.database import row2dict

from djmaidez.core.models import AARec, MOBILE_CARRIER, RELATIONSHIP

import datetime

EARL = settings.INFORMIX_EARL
ENS_CODES = ['MIS1','MIS2','MIS3','ENS','ICE','ICE2']

def test(request):
    """
    Test the modal outside of portal
    """
    return render_to_response(
        "contact/test.html",{"uid":settings.DEFAULT_UID},
        context_instance=RequestContext(request)
    )

def solo(request):
    """
    """
    cid = request.GET.get("UserID", "")

    session = get_session(EARL)

    objs = session.query(AARec).filter_by(id=cid).\
        filter(AARec.aa.in_(ENS_CODES)).all()

    data = {}
    for o in objs:
        data[o.aa] = row2dict(o)
    data["mobile_carrier"] = MOBILE_CARRIER
    data["relationship"] = RELATIONSHIP
    data["solo"] = True

    session.close()

    return render_to_response(
        "contact/solo.html", data,
        context_instance=RequestContext(request)
    )

def json(request):
    """
    Called from javascript fill.js onload
    """
    template = "contact/modal.html"
    t = loader.get_template(template)
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

    objs = session.query(AARec).filter_by(id=cid).\
        filter(AARec.aa.in_(ENS_CODES)).all()
    data = {}
    for e in ENS_CODES:
        data[e] = {}
    for o in objs:
        data[o.aa] = row2dict(o)
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
        end_date = datetime.datetime(year=this_year, month=11, day=1)
    elif now.month > 8:
        end_date = datetime.datetime(year=next_year, month=04, day=1)
    else:
        end_date = datetime.datetime(year=this_year, month=04, day=1)

    # instantiate our session
    session = get_session(EARL)
    # update else insert
    for code in [MIS1, MIS2, MIS3, ENS, ICE, ICE2]:
        code["beg_date"] = now
        code["end_date"] = end_date
        try:
            obj = session.query(AARec).filter_by(id=cid).\
                filter_by(aa = code["aa"]).one()
            for key, value in code.iteritems():
                setattr(obj, key, value)
        except:
            code["id"] = cid
            a = AARec(**code)
            session.add(a)
    session.commit()
    session.close()

    return HttpResponse(
        'saveDone({"Status":"Success"})',
        content_type="application/json; charset=utf-8"
    )
