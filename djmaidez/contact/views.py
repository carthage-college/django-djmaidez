from django.conf import settings
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template import RequestContext, loader
from django.utils import simplejson

from djzbar.utils.informix import do_sql, get_session
from djtools.utils.database import row2dict

from djmaidez.core.models import AARec, MOBILE_CARRIER, RELATIONSHIP

import datetime

EARL = settings.INFORMIX_EARL
ENS_CODES = ['MIS1','MIS2','MIS3','ENS','ICE','ICE2']

def test(request):
    """
    Test
    """
    return render_to_response(
        "contact/test.html",
        context_instance=RequestContext(request)
    )

def json(request):
    """
    Called from javascript file fill.js
    """
    template = "contact/home.html"
    t = loader.get_template(template)
    c = RequestContext(request)
    page = t.render(c)
    json = {'emc':page}
    page = simplejson.dumps(json)
    return HttpResponse(
        "successCallback(" + page + ")",
        content_type="application/json; charset=utf-8"
    )

def save(request):

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

    update=''
    if MIS1_NAME != '':
        sql = """
            SELECT * FROM aa_rec WHERE aa = 'MIS1' AND id='{}'
        """.format(HOSTID)
        mis1 = do_sql(sql)
        mis1Exists=False
        for m1 in mis1:
            if m1.id:
                mis1Exists=True
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

        if not mis1Exists:
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
        sql = "SELECT * FROM aa_rec WHERE aa = 'MIS2' AND id='%s'" % HOSTID
        mis2 = do_sql(sql)
        mis2Exists=False
        for m2 in mis2:
            if m2.id:
                mis2Exists=True
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
            if not mis2Exists:
                sql = """
                    INSERT INTO
                        aa_rec (
                            line1, phone, id, aa, beg_date, end_date
                        )
                    VALUES (
                        '%s', '%s', '%s', '%s', '%s', '%s'
                    )""" % (
                        MIS2_NAME, MIS2_PHONE1, HOSTID, 'MIS2',
                        now.strftime("%m-%d-%Y"), end_date
                    )
                do_sql(sql)
    else:
        sql = "DELETE FROM aa_rec WHERE id ='{}' AND aa ='MIS2'".format(HOSTID)
        do_sql(sql)

    if MIS3_NAME != '':
        sql = "SELECT * FROM aa_rec WHERE aa='MIS3' AND id='{}'".format(HOSTID)
        mis3 = do_sql(sql)
        mis3Exists=False
        for m3 in mis3:
            if m3.id:
                mis3Exists=True
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
            if not mis3Exists:
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
    else:
        do_sql("DELETE FROM aa_rec WHERE id = '%s' AND aa = 'MIS3'" % HOSTID)

    if ENS_SMS != '':
        sql = "SELECT * FROM aa_rec WHERE aa ='ENS' AND id='{}'".format(HOSTID)
        ens = do_sql(sql)
        ensExists=False
        for e in ens:
            if e.id:
                ensExists=True
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
            if not ensExists:
                sql = """
                    INSERT INTO
                        aa_rec (
                            opt_out, phone, cell_carrier, line1, id,
                            aa, beg_date, end_date
                        )
                    VALUES (
                        '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s'
                    )""" % (
                        ENS_SMS, ENS_SELF_CELL, ENS_CARRIER, ENS_EMAIL,
                        HOSTID, 'ENS', now.strftime("%m-%d-%Y"), end_date
                    )
                do_sql(sql)

    if ICE_NAME != '':
        sql = "SELECT * FROM aa_rec WHERE aa ='ICE' AND id='{}'".format(HOSTID)
        ice1 = do_sql(sql)
        iceExists=False
        for i1 in ice1:
            if i1.id:
                iceExists=True
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
            if not iceExists:
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
        ice2 = do_sql("SELECT * FROM aa_rec WHERE aa = 'ICE2' AND id='%s'" % HOSTID)
        ice2Exists=False
        for i2 in ice2:
            if i2.id:
                ice2Exists=True
                do_sql("UPDATE aa_rec SET line1='%s', phone='%s', line2='%s', line3='%s', cell_carrier='%s', beg_date='%s', end_date='%s' WHERE aa = 'ICE2' AND id = '%s' " % (ICE2_NAME, ICE2_PHONE1, ICE2_PHONE2, ICE2_PHONE3, ICE2_REL, now.strftime("%m-%d-%Y"), end_date, HOSTID))
            if ice2Exists == False:
                do_sql("INSERT INTO aa_rec (line1, phone, line2, line3, cell_carrier, id, aa, beg_date, end_date) VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')" % (ICE2_NAME, ICE2_PHONE1, ICE2_PHONE2, ICE2_PHONE3, ICE2_REL, HOSTID, 'ICE2', now.strftime("%m-%d-%Y"), end_date))

    else:
        do_sql("DELETE FROM aa_rec WHERE id = '%s' AND aa = 'ICE2'" % HOSTID)


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
        "contact/home.html", data,
        context_instance=RequestContext(request)
    )

    return render_to_response(
        "contact/solo.html",
        context_instance=RequestContext(request)
    )

def populate(request):
    HOSTID = request.GET.get("UserID", "")

    session = get_session(EARL)

    objs = session.query(AARec).filter_by(id=HOSTID).\
        filter(AARec.aa.in_(ENS_CODES)).all()

    data = {}
    for o in objs:
        data[o.aa] = row2dict(o)
    context = {
            'mis1_name':data.get("MIS1", {}).get("line1"),
            'mis1_rel':data.get("MIS1", {}).get("cell_carrier"),
            'mis1_phone1':data.get("MIS1", {}).get("phone"),
            'mis1_phone2':data.get("MIS1", {}).get("line2"),
            'mis1_phone3':data.get("MIS1", {}).get("line3"),
            'mis2_name':data.get("MIS2", {}).get("line1"),
            'mis2_phone1':data.get("MIS2", {}).get("phone"),
            'mis3_name':data.get("MIS3", {}).get("line1"),
            'mis3_phone1':data.get("MIS3", {}).get("phone"),
            'ens_self_cell':data.get("ENS", {}).get("opt_out"),
            'ens_sms':data.get("ENS", {}).get("phone"),
            'ens_carrier':data.get("ENS", {}).get("cell_carrier"),
            'ens_email':data.get("ENS", {}).get("line1"),
            'ice_name':data.get("ICE1", {}).get("line1"),
            'ice_phone1':data.get("ICE1", {}).get("phone"),
            'ice_phone2':data.get("ICE1", {}).get("line2"),
            'ice_phone3':data.get("ICE1", {}).get("line3"),
            'ice_rel':data.get("ICE1", {}).get("cell_carrier"),
            'ice2_name':data.get("ICE2", {}).get("line1"),
            'ice2_phone1':data.get("ICE2", {}).get("phone"),
            'ice2_phone2':data.get("ICE2", {}).get("line2"),
            'ice2_phone3':data.get("ICE2", {}).get("line3"),
            'ice2_rel':data.get("ICE2", {}).get("cell_carrier"),
            'ens_end_date':str(data.get("ENS", {}).get("end_date"))
    }
    retVal = simplejson.dumps(context)
    return HttpResponse(
        'jsonResponcePopulate(' + retVal + ')',
        content_type="application/json; charset=utf-8"
    )

