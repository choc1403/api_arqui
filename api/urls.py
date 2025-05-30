
from django.contrib import admin
from django.urls import path, include

from rest_framework import routers

from sensors import views

router = routers.DefaultRouter()
router.register(r'sensor',views.SensorViewSet,'sensor_api')


urlpatterns = [
    path('', include(router.urls)),
    path('inicio',views.inicio, name='inicio'),
    path('admin/', admin.site.urls),
]
