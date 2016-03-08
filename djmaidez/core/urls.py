from django.conf.urls import patterns, include

handler404 = 'djtools.views.errors.four_oh_four_error'
handler500 = 'djtools.views.errors.server_error'

urlpatterns = patterns('',
    (r'^contact/', include('djmaidez.contact.urls')),
)
