import os, sys

#Add the path to 3rd party django application and to django itself.

sys.path.append('/usr/lib/python2.6/site-packages/')
sys.path.append('/usr/lib/python2.6/')
sys.path.append('/data2/django_trunk/')
sys.path.append('/data2/django_projects/')

os.environ['DJANGO_SETTINGS_MODULE'] = 'emergency.settings'
os.environ['PYTHON_EGG_CACHE'] = '/var/cache/python/.python-eggs'
os.environ['INFORMIXSERVER'] = 'wilson'
os.environ['INFORMIXDIR'] = '/opt/ibm/informix'
os.environ['LD_LIBRARY_PATH'] = '$INFORMIXDIR/lib:$INFORMIXDIR/lib/esql:$INFORMIXDIR/lib/tools:/usr/lib/apache2/modules:$INFORMIXDIR/lib/cli'
os.environ['LD_RUN_PATH'] = '/opt/ibm/informix/lib:/opt/ibm/informix/lib/esql:/opt/ibm/informix/lib/tools:/usr/lib/apache2/modules'
# for TZ see:
# http://groups.google.com/group/django-users/browse_thread/thread/c75ad3d36dda5d78?hl=en
os.environ['TZ']='America/Chicago'

import django.core.handlers.wsgi
application = django.core.handlers.wsgi.WSGIHandler()
