from django.conf.urls import patterns, include

urlpatterns = patterns('',
    (r'^contact/', include('djmaidez.contact.urls')),
)
