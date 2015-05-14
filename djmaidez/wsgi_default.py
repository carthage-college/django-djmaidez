import os, sys

# Python
sys.path.append('/usr/lib/python2.7/')
sys.path.append('/usr/lib/python2.7/dist-packages/')
sys.path.append('/usr/local/lib/python2.7/dist-packages/')
sys.path.append('/usr/local/django_current/')
sys.path.append('/usr/local/django_projects/')
sys.path.append('/usr/local/django_third/')
# Django
os.environ['DJANGO_SETTINGS_MODULE'] = 'djmaidez.settings'
os.environ.setdefault("PYTHON_EGG_CACHE", "/var/cache/python/.python-eggs")
os.environ.setdefault("TZ", "America/Chicago")
# informix
os.environ['INFORMIXSERVER'] = ''
os.environ['DBSERVERNAME'] = ''
os.environ['INFORMIXDIR'] = ''
os.environ['ODBCINI'] = ''
os.environ['ONCONFIG'] = ''
os.environ['INFORMIXSQLHOSTS'] = ''
os.environ['LD_LIBRARY_PATH'] = ''
os.environ['LD_RUN_PATH'] = ''
# wsgi
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
