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

def json(request):
    """
    Called from javascript fill.js
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

def save(request):

    session = get_session(EARL)

    MIS1_NAME = request.GET.get("MIS1_NAME", "")
    MIS1_REL = request.GET.get("MIS1_REL", "")
    MIS1_PHONE1 = request.GET.get("MIS1_PHONE1", "")
    MIS1_PHONE2 = request.GET.get("MIS1_PHONE2", "")
    MIS1_PHONE3 = request.GET.get("MIS1_PHONE3", "")
    MIS2_NAME = request.GET.get("MIS2_NAME", "")
    MIS2_PHONE1 = request.GET.get("MIS2_PHONE1", "")
    MIS3_NAME = request.GET.get("MIS3_NAME", "")
    MIS3_PHONE1 = request.GET.get("MIS3_PHONE1", "")
    ENS_SELF_CELL = request.GET.get("ENS_SELF_CELL", "")
    ENS_SMS = request.GET.get("ENS_SMS", "")
    ENS_CARRIER = request.GET.get("ENS_CARRIER", "")
    ENS_EMAIL = request.GET.get("ENS_EMAIL", "")
    ICE_NAME = request.GET.get("ICE_NAME", "")
    ICE_PHONE1 = request.GET.get("ICE_PHONE1", "")
    ICE_PHONE2 = request.GET.get("ICE_PHONE2", "")
    ICE_PHONE3 = request.GET.get("ICE_PHONE3", "")
    ICE_REL = request.GET.get("ICE_REL", "")
    ICE2_NAME = request.GET.get("ICE2_NAME", "")
    USERID = request.GET.get("UserID", "")
    ICE2_PHONE1 = request.GET.get("ICE2_PHONE1", "")
    ICE2_PHONE2 = request.GET.get("ICE2_PHONE2", "")
    ICE2_PHONE3 = request.GET.get("ICE2_PHONE3", "")
    ICE2_REL = request.GET.get("ICE2_REL", "")

    HOSTID = USERID
    now = datetime.datetime.now()

    end_date=''
    this_year = now.year
    next_year = this_year+1

    if now.month > 1 and now.month < 9:
        end_date = '11-01-'+str(this_year)
    elif now.month > 8:
        end_date = '04-01-'+str(next_year)
    else:
        end_date = '04-01-'+str(this_year)

    if MIS1_NAME != '':
        try:
            mis1 = session.query(AARec).filter_by(id=HOSTID).\
                filter_by(aa="MIS1").one()
            sql = """
                UPDATE
                    aa_rec
                SET
                    line1='{}', cell_carrier='{}',
                    phone='{}', line2='{}', line3='{}',
                    beg_date='{}', end_date='{}'
                WHERE
                    aa = 'MIS1'
                AND
                    id = '{}'
            """.format(
                MIS1_NAME, MIS1_REL, MIS1_PHONE1, MIS1_PHONE2,
                MIS1_PHONE3, now.strftime("%m-%d-%Y"), end_date, HOSTID
            )
            do_sql(sql)
        except:
            sql = """
                INSERT INTO
                    aa_rec (
                        line1, cell_carrier, phone, line2, line3,
                        id, aa, beg_date, end_date
                    )
                VALUES (
                    '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s'
                )
            """ % (
                MIS1_NAME, MIS1_REL, MIS1_PHONE1, MIS1_PHONE2,
                MIS1_PHONE3, HOSTID, 'MIS1', now.strftime("%m-%d-%Y"),
                end_date
            )
            do_sql(sql)

    if MIS2_NAME != '':
        try:
            mis2 = session.query(AARec).filter_by(id=HOSTID).\
                filter_by(aa="MIS2").one()
            sql = """
                UPDATE
                    aa_rec
                SET
                    line1='%s', phone='%s', beg_date='%s', end_date='%s'
                WHERE
                    aa = 'MIS2'
                AND
                    id = '%s'
            """ % (
                MIS2_NAME, MIS2_PHONE1, now.strftime("%m-%d-%Y"),
                end_date, HOSTID
            )
            do_sql(sql)
        except:
            sql = """
                INSERT INTO
                    aa_rec (
                        line1, phone, id, aa, beg_date, end_date
                    )
                VALUES (
                    '%s', '%s', '%s', '%s', '%s', '%s'
                )
            """ % (
                MIS2_NAME, MIS2_PHONE1, HOSTID, 'MIS2',
                now.strftime("%m-%d-%Y"), end_date
            )
            do_sql(sql)

    if MIS3_NAME != '':
        try:
            mis3 = session.query(AARec).filter_by(id=HOSTID).\
                filter_by(aa="MIS3").one()
            sql = """
                UPDATE
                    aa_rec
                SET
                    line1='%s', phone='%s', beg_date='%s', end_date='%s'
                WHERE
                    aa = 'MIS3'
                AND
                    id = '%s'
            """ % (
                MIS3_NAME, MIS3_PHONE1, now.strftime("%m-%d-%Y"),
                end_date, HOSTID
            )
            do_sql(sql)
        except:
            sql = """
                INSERT INTO
                    aa_rec (
                        line1, phone, id, aa, beg_date, end_date
                    )
                VALUES (
                    '%s', '%s', '%s', '%s', '%s', '%s'
                )
            """ % (
                MIS3_NAME, MIS3_PHONE1, HOSTID, 'MIS3',
                now.strftime("%m-%d-%Y"), end_date
            )
            do_sql(sql)

    if ENS_SMS != '':
        try:
            ens = session.query(AARec).filter_by(id=HOSTID).\
                filter_by(aa="ENS").one()
            sql = """
                UPDATE
                    aa_rec
                SET
                    opt_out='%s', phone='%s', cell_carrier='%s',
                    line1='%s', beg_date='%s', end_date='%s'
                WHERE
                    aa = 'ENS'
                AND
                    id = '%s'
            """ % (
                ENS_SMS, ENS_SELF_CELL, ENS_CARRIER, ENS_EMAIL,
                now.strftime("%m-%d-%Y"), end_date, HOSTID
            )
            do_sql(sql)
        except:
            sql = """
                INSERT INTO
                    aa_rec (
                        opt_out, phone, cell_carrier, line1, id,
                        aa, beg_date, end_date
                    )
                VALUES (
                    '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s'
                )
            """ % (
                ENS_SMS, ENS_SELF_CELL, ENS_CARRIER, ENS_EMAIL,
                HOSTID, 'ENS', now.strftime("%m-%d-%Y"), end_date
            )
            do_sql(sql)

    if ICE_NAME != '':
        try:
            ice = session.query(AARec).filter_by(id=HOSTID).\
                filter_by(aa="ICE").one()
            sql = """
                UPDATE
                    aa_rec
                SET
                    line1='%s', phone='%s', line2='%s', line3='%s',
                    cell_carrier='%s', beg_date='%s', end_date='%s'
                WHERE
                    aa = 'ICE'
                AND
                    id = '%s'
            """ % (
                ICE_NAME, ICE_PHONE1, ICE_PHONE2, ICE_PHONE3,
                ICE_REL, now.strftime("%m-%d-%Y"), end_date, HOSTID
            )
            do_sql(sql)
        except:
            sql = """
                INSERT INTO
                    aa_rec (
                        line1, phone, line2, line3, cell_carrier,
                        id, aa, beg_date, end_date
                    )
                VALUES (
                    '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s'
                )
            """ % (
                ICE_NAME, ICE_PHONE1, ICE_PHONE2, ICE_PHONE3,
                ICE_REL, HOSTID, 'ICE', now.strftime("%m-%d-%Y"), end_date
            )
            do_sql(sql)

    if ICE2_NAME != '':
        try:
            ice2 = session.query(AARec).filter_by(id=HOSTID).\
                filter_by(aa="ENS").one()
            sql = """
                UPDATE
                    aa_rec
                SET
                    line1='%s', phone='%s', line2='%s', line3='%s',
                    cell_carrier='%s', beg_date='%s', end_date='%s'
                WHERE
                    aa = 'ICE2'
                AND
                    id = '%s'
            """ % (
                ICE2_NAME, ICE2_PHONE1, ICE2_PHONE2, ICE2_PHONE3,
                ICE2_REL, now.strftime("%m-%d-%Y"), end_date, HOSTID
            )
            do_sql(sql)
        except:
            sql = """
                INSERT INTO
                    aa_rec (
                        line1, phone, line2, line3, cell_carrier, id,
                        aa, beg_date, end_date
                    )
                VALUES (
                    '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')
            """ % (
                ICE2_NAME, ICE2_PHONE1, ICE2_PHONE2, ICE2_PHONE3, ICE2_REL,
                HOSTID, 'ICE2', now.strftime("%m-%d-%Y"), end_date
            )
            do_sql(sql)

    return HttpResponse(
        'saveDone({"Status":"Success"})',
        content_type="application/json; charset=utf-8"
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

    return render_to_response(
        "contact/solo.html", data,
        context_instance=RequestContext(request)
    )

def populate(request):
    HOSTID = request.GET.get("UserID", "")

    session = get_session(EARL)

    objs = session.query(AARec).filter_by(id=HOSTID).\
        filter(AARec.aa.in_(ENS_CODES)).all()
    data = {}
    for e in ENS_CODES:
        data[e] = {}
    for o in objs:
        data[o.aa] = row2dict(o)
    retVal = simplejson.dumps(data)
    return HttpResponse(
        'jsonResponcePopulate(' + retVal + ')',
        content_type="application/json; charset=utf-8"
    )

