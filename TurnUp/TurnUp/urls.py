from django.conf.urls import include, url
from django.contrib import admin

from business.views import rsvp

urlpatterns = [
    url(r'', include('business.urls')),
    url(r'^rsvp', rsvp),
    url(r'^business/', include('business.urls')),
    url(r'^admin/', admin.site.urls),
]
