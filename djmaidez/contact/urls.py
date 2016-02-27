from django.conf.urls import patterns, url
from django.views.generic import TemplateView

urlpatterns = patterns('djmaidez.contact.views',
    url(
        r'^$',
        TemplateView.as_view(template_name="contact/home.html")
    ),
    url(r'^form/$', 'form', name="form"),
    url(r'^populate/$', 'populate', name="populate"),
    url(r'^save/$', 'save', name="save"),
    url(r'^test/$', 'test', name="test")
)
