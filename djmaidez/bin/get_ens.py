from django.conf import settings
from djzbar.utils.informix import do_sql as do_esql

cid = ""

FIELDS = ['aa','beg_date','end_date','line1','line2','line3',
'phone','phone_ext','cell_carrier','opt_out']

CODES = ['MIS1','MIS2','ICE','ICE2','ENS','MIS3']

ens = ""
for c in CODES:
    sql = "SELECT * FROM aa_rec WHERE aa = '%s' AND id='%s'" % (c,cid)
    result = do_esql(
        sql,key=settings.INFORMIX_DEBUG,
        earl=settings.INFORMIX_EARL)
    ens +=  "++%s++++++++++++++++++++++\n" % c
    for r in result:
        for f in FIELDS:
            try:
                if result[f]:
                    ens += "%s = %s\n" % (f, result[f])
                else:
                    ens += "%s = \n" % (f)
            except:
                ens += "%s = \n" % (f)
        print ens
        ens = ""

