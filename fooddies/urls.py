from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from rest_framework import routers
from restaurants import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include('restaurants.api.urls'))
]
