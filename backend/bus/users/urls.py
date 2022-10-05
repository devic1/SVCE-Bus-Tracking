from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
        path('',views.index,name="index"),
        path('current_user',views.current_user,name="current_user"),
        path('login',views.login_user,name="login"),
        path('logout',views.logout_user,name="logout"),
        path('signup',views.signup,name="signup"),
        path('reset_password/',auth_views.PasswordResetView.as_view(template_name="reset_password.html"),name="reset_password"),
        path('reset_password_sent/',auth_views.PasswordResetDoneView.as_view(template_name="password_reset_sent.html"),name="password_reset_done"),
        path('reset/<uidb64>/<token>/',auth_views.PasswordResetConfirmView.as_view(template_name="password_reset_form.html"),name="password_reset_confirm"),
        path('reset_password_complete/',auth_views.PasswordResetCompleteView.as_view(template_name="password_reset_done.html"),name="password_reset_complete"),
        path('activate/<uidb64>/<token>',views.activate,name="activate"),
        ]
