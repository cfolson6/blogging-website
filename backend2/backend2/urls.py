"""
URL configuration for backend2 project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from main.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', Home.as_view(), name=""),
    path('blogpost/', BlogPostView.as_view(), name="blogpost"),
    path('login/', Login.as_view(), name="login"),
    path('user/', UserView.as_view(), name="user"),
    path('blogpost/create/', CreateBlogPostView.as_view(), name="create blogpost"),
    path('user/get-by-token/', GetUserByToken.as_view(), name="get user by token"),
]
