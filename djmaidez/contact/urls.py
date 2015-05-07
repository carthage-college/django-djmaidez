from django.conf.urls.defaults import *
from django.views.generic import TemplateView

urlpatterns = patterns('djmaidez.contact.views',
    url(
        r'^$',
        TemplateView.as_view(template_name="contact/home.html")
    ),
    url(r'^json/$', 'json', name="json"),
    url(r'^save/$', 'save', name="save"),
    url(r'^populate/$', 'populate', name="populate"),
)
