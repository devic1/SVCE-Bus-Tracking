from django.urls import path

from . import views

urlpatterns = [
        path('',views.Home,name='Home'),
        path('driver',views.Driver,name="Driver"),
        path('coord/<str:rt>/',views.coord,name='coord'),
        path('coord/busno',views.busno,name='busno'),
        path('coord/busno/<str:k>',views.busstop,name='busstop'),
        path('route/<int:pk>/',views.route,name="route"),
        ]
