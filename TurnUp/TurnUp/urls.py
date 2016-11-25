from django.conf.urls import include, url
from django.contrib import admin

from business.views import rsvp, business

urlpatterns = [
    url(r'', include('business.urls')),
    url(r'^rsvp', rsvp),
    url(r'^business/', business),
    url(r'^admin/', admin.site.urls),
]
