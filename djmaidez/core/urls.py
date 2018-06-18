from django.conf.urls import include, url

handler404 = 'djtools.views.errors.four_oh_four_error'
handler500 = 'djtools.views.errors.server_error'


urlpatterns = [
    url(
        r'^contact/', include('djmaidez.contact.urls')
    ),
]
