from django.conf.urls import url
from django.views.generic import TemplateView

from djmaidez.contact import views


urlpatterns = [
    url(
        r'^$',
        TemplateView.as_view(template_name='contact/home.html')
    ),
    url(r'^form/$', views.form, name='form'),
    url(r'^populate/$', views.populate, name='populate'),
    url(r'^save/$', views.save, name='save'),
    url(r'^test/$', views.test, name='test')
]
