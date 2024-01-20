from django.urls import path
from . import views

urlpatterns = [
    path('', views.home.as_view(), name=""),
    path('register', views.register.as_view(), name="register"),
    path('login', views.login, name="login"),
    path('create-blogpost', views.create_blogpost.as_view(), name="create-blogpost"),
]