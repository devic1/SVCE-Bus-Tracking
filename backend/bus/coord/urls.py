from django.urls import path

from . import views

urlpatterns = [
        path('',views.Home,name='Home'),
        path('driver',views.Driver,name="Driver"),
        path('coord/<int:pk>/',views.coord,name='coord'),
        ]