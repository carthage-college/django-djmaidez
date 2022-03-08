# -*- coding: utf-8 -*-

import datetime
import json

from django.conf import settings
from django.core.serializers.json import DjangoJSONEncoder
from djimix.core.utils import get_connection
from djimix.core.utils import xsql
from djmaidez.contact.data import AA_REC
from djmaidez.contact.data import ENS_FIELDS

EARL = settings.INFORMIX_ODBC_TRAIN

cid = '1217657'

sql = '{0} AND id="{1}"'.format(AA_REC, cid)
print(sql)
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
    #print(ens_data)
jason = json.dumps(ens_data, cls=DjangoJSONEncoder)
print(jason)
