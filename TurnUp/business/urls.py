from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.invitation),
    url(r'^food/', views.food),
    url(r'^index/', views.index),
]
