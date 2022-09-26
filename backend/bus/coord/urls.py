from django.urls import path

from . import views

urlpatterns = [
        path('coord/<int:pk>/',views.coord,name='coord'),
        ]
