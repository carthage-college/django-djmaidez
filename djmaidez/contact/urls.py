from django.conf.urls.defaults import *

urlpatterns = patterns('',
     url(r'^contact/$', 'emergency.contact.views.home', name="home"),
     url(r'^contact/json/$', 'emergency.contact.views.json', name="json"),
     url(r'^contact/save/$', 'emergency.contact.views.save', name="save"),
     url(r'^contact/populate/$', 'emergency.contact.views.populate', name="populate"),
)
