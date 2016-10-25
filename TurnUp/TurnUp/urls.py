from django.conf.urls import include, url
from django.contrib import admin


urlpatterns = [
    url(r'^business/', include('business.urls')),
    url(r'^api/', include('api.urls')),
    url(r'^admin/', admin.site.urls),
]
