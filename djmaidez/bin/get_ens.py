# -*- coding: utf-8 -*-

from django.conf import settings
from djimix.core.utils import get_connection
from djimix.core.utils import xsql


cid = ''
fields = (
    'aa',
    'beg_date',
    'end_date',
    'line1',
    'line2',
    'line3',
    'phone',
    'phone_ext',
    'cell_carrier',
    'opt_out',
)
codes = ('MIS1', 'MIS2', 'ICE', 'ICE2', 'ENS', 'MIS3')

ens = ''
for code in codes:
    sql = 'SELECT * FROM aa_rec WHERE aa = "{0}" AND id="{1}"'.format(code, cid)
    with get_connection(settings.INFORMIX_ODBC) as connection:
        rows = xsql(sql, connection).fetchall()
    ens += '++{0}++++++++++++++++++++++\n'.format(code)
    for row in rows:
        for field in fields:
            try:
                if row[field]:
                    ens += '{0} = {1}\n'.format(field, row[field])
                else:
                    ens += '{0} = \n'.format(field)
            except Exception:
                ens += '{0} = \n'.format(field)
        print(ens)
        ens = ""
