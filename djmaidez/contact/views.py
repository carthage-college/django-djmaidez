from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.template import RequestContext, loader
from django.utils import simplejson

from djzbar.utils.informix import do_sql
from djzbar.utils.mssql import get_userid

import datetime

def home(request):
    return render_to_response('contact/index.html')

def json(request):

    template = "contact/index.html"
    t = loader.get_template(template)
    c = RequestContext(request)
    page = t.render(c)
    json = {'emc':page}
    page = simplejson.dumps(json)
    return HttpResponse("successCallback(" + page + ")", mimetype="application/javascript; charset=utf-8")
    
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
    #HOSTID = get_userid(USERID)
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
            mis1 = do_sql("SELECT * FROM aa_rec WHERE aa = 'MIS1' AND id='%s'" % HOSTID)
            mis1Exists=False
            for m1 in mis1:
                    if m1.id:
                            mis1Exists=True
                            do_sql("UPDATE aa_rec SET line1='%s', cell_carrier='%s', phone='%s', line2='%s', line3='%s', beg_date='%s', end_date='%s' WHERE aa = 'MIS1' AND id = '%s'" % (MIS1_NAME, MIS1_REL, MIS1_PHONE1, MIS1_PHONE2, MIS1_PHONE3, now.strftime("%m-%d-%Y"), end_date, HOSTID))  
            if mis1Exists == False:
                    do_sql("INSERT INTO aa_rec (line1, cell_carrier, phone, line2, line3, id, aa, beg_date, end_date) VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')" %(MIS1_NAME, MIS1_REL, MIS1_PHONE1, MIS1_PHONE2, MIS1_PHONE3, HOSTID, 'MIS1', now.strftime("%m-%d-%Y"), end_date))
    
    if MIS2_NAME != '':              
            mis2 = do_sql("SELECT * FROM aa_rec WHERE aa = 'MIS2' AND id='%s'" % HOSTID)
            mis2Exists=False
            for m2 in mis2:
                    if m2.id:
                            mis2Exists=True
                            do_sql("UPDATE aa_rec SET line1='%s', phone='%s', beg_date='%s', end_date='%s' WHERE aa = 'MIS2' AND id = '%s' " % (MIS2_NAME, MIS2_PHONE1, now.strftime("%m-%d-%Y"), end_date, HOSTID))
            if mis2Exists == False:
                    do_sql("INSERT INTO aa_rec (line1, phone, id, aa, beg_date, end_date) VALUES ('%s', '%s', '%s', '%s', '%s', '%s')" % (MIS2_NAME, MIS2_PHONE1, HOSTID, 'MIS2', now.strftime("%m-%d-%Y"), end_date))
    else:
            do_sql("DELETE FROM aa_rec WHERE id = '%s' AND aa = 'MIS2'" % HOSTID)
 
    if MIS3_NAME != '':
            mis3 = do_sql("SELECT * FROM aa_rec WHERE aa = 'MIS3' AND id='%s'" % HOSTID)
            mis3Exists=False
            for m3 in mis3:    
                    if m3.id:
                            mis3Exists=True
                            do_sql("UPDATE aa_rec SET line1='%s', phone='%s', beg_date='%s', end_date='%s' WHERE aa = 'MIS3' AND id = '%s' " % (MIS3_NAME, MIS3_PHONE1, now.strftime("%m-%d-%Y"), end_date, HOSTID))
            if mis3Exists == False:
                    do_sql("INSERT INTO aa_rec (line1, phone, id, aa, beg_date, end_date) VALUES ('%s', '%s', '%s', '%s', '%s', '%s')" % (MIS3_NAME, MIS3_PHONE1, HOSTID, 'MIS3', now.strftime("%m-%d-%Y"), end_date))
    else:
            do_sql("DELETE FROM aa_rec WHERE id = '%s' AND aa = 'MIS3'" % HOSTID)    

    if ENS_SMS != '':
            ens = do_sql("SELECT * FROM aa_rec WHERE aa = 'ENS' AND id='%s'" % HOSTID)
            ensExists=False
            for e in ens:
                    if e.id:
                            ensExists=True
                            do_sql("UPDATE aa_rec SET opt_out='%s', phone='%s', cell_carrier='%s', line1='%s', beg_date='%s', end_date='%s' WHERE aa = 'ENS' AND id = '%s' " % (ENS_SMS, ENS_SELF_CELL, ENS_CARRIER, ENS_EMAIL, now.strftime("%m-%d-%Y"), end_date, HOSTID))
            if ensExists == False:
                    do_sql("INSERT INTO aa_rec (opt_out, phone, cell_carrier, line1, id, aa, beg_date, end_date) VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')" %(ENS_SMS, ENS_SELF_CELL, ENS_CARRIER, ENS_EMAIL, HOSTID, 'ENS', now.strftime("%m-%d-%Y"), end_date))
    
    if ICE_NAME != '':
            ice1 = do_sql("SELECT * FROM aa_rec WHERE aa = 'ICE' AND id='%s'" % HOSTID)
            iceExists=False
            for i1 in ice1:
                    if i1.id:
                            iceExists=True
                            do_sql("UPDATE aa_rec SET line1='%s', phone='%s', line2='%s', line3='%s', cell_carrier='%s', beg_date='%s', end_date='%s' WHERE aa = 'ICE' AND id = '%s' " % (ICE_NAME, ICE_PHONE1, ICE_PHONE2, ICE_PHONE3, ICE_REL, now.strftime("%m-%d-%Y"), end_date, HOSTID))
            if iceExists == False:
                    do_sql("INSERT INTO aa_rec (line1, phone, line2, line3, cell_carrier, id, aa, beg_date, end_date) VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')" % (ICE_NAME, ICE_PHONE1, ICE_PHONE2, ICE_PHONE3, ICE_REL, HOSTID, 'ICE', now.strftime("%m-%d-%Y"), end_date))
    
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
            
            
    return HttpResponse('saveDone({"Status":"Success"})', mimetype="application/json; charset=utf-8")
    
def populate(request):
    HOSTID = request.GET.get("UserID", "")
    
    mis1_line1=''
    mis1_cell_carrier=''
    mis1_phone=''
    mis1_line2=''
    mis1_line3=''
    mis2_line1=''
    mis2_phone=''
    mis3_line1=''
    mis3_phone=''
    ens_opt_out=''
    ens_phone=''
    ens_cell_carrier=''
    ens_line1=''
    ice1_line1=''
    ice1_phone=''
    ice1_line2=''
    ice1_line3=''
    ice1_cell_carrier=''
    ice2_line1=''
    ice2_phone=''
    ice2_line2=''
    ice2_line3=''
    ice2_cell_carrier=''
    ens_end_date=''
    
    mis1Q = do_sql("SELECT * FROM aa_rec WHERE aa = 'MIS1' AND id='%s'" % HOSTID)
    mis1=''
    for m1 in mis1Q:
         mis1_line1=m1.line1
         mis1_cell_carrier=m1.cell_carrier
         mis1_phone=m1.phone
         mis1_line2=m1.line2
         mis1_line3=m1.line3
         
    mis2Q = do_sql("SELECT * FROM aa_rec WHERE aa = 'MIS2' AND id='%s'" % HOSTID)
    mis2=''
    for m2 in mis2Q:
         mis2_line1=m2.line1
         mis2_phone=m2.phone
         
    mis3Q = do_sql("SELECT * FROM aa_rec WHERE aa = 'MIS3' AND id='%s'" % HOSTID)
    mis3=''
    for m3 in mis3Q:
         mis3_line1=m3.line1
         mis3_phone=m3.phone       
         
    ensQ = do_sql("SELECT * FROM aa_rec WHERE aa = 'ENS' AND id='%s'" % HOSTID)
    ens=''
    for e in ensQ:
         ens_opt_out=e.opt_out
         ens_phone=e.phone
         ens_cell_carrier=e.cell_carrier
         ens_line1=e.line1
         ens_end_date=e.end_date
         
    ice1Q = do_sql("SELECT * FROM aa_rec WHERE aa = 'ICE' AND id='%s'" % HOSTID)
    ice1=''
    for i1 in ice1Q:
         ice1_line1=i1.line1
         ice1_phone=i1.phone
         ice1_line2=i1.line2
         ice1_line3=i1.line3
         ice1_cell_carrier=i1.cell_carrier
         
    ice2Q = do_sql("SELECT * FROM aa_rec WHERE aa = 'ICE2' AND id='%s'" % HOSTID)
    ice2=''
    for i2 in ice2Q:
         ice2_line1=i2.line1
         ice2_phone=i2.phone
         ice2_line2=i2.line2
         ice2_line3=i2.line3
         ice2_cell_carrier=i2.cell_carrier
    
    ###### FIX THIS ######
    #STATUS='Missing'
    STATUS='Fresh'
    
    context = {
            'mis1_name':mis1_line1,
            'mis1_rel':mis1_cell_carrier,
            'mis1_phone1':mis1_phone,
            'mis1_phone2':mis1_line2,
            'mis1_phone3':mis1_line3,
            'mis2_name':mis2_line1,
            'mis2_phone1':mis2_phone,
            'mis3_name':mis3_line1,
            'mis3_phone1':mis3_phone,
            'ens_self_cell':ens_opt_out,
            'ens_sms':ens_phone,
            'ens_carrier':ens_cell_carrier,
            'ens_email':ens_line1,
            'ice_name':ice1_line1,
            'ice_phone1':ice1_phone,
            'ice_phone2':ice1_line2,
            'ice_phone3':ice1_line3,
            'ice_rel':ice1_cell_carrier,
            'ice2_name':ice2_line1,
            'ice2_phone1':ice2_phone,
            'ice2_phone2':ice2_line2,
            'ice2_phone3':ice2_line3,
            'ice2_rel':ice2_cell_carrier,
            'ens_end_date':str(ens_end_date)
    }
    retVal = simplejson.dumps(context)
    return HttpResponse('jsonResponcePopulate(' + retVal + ')', mimetype="application/json; charset=utf-8")

