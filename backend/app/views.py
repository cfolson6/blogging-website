from django.shortcuts import render
from django.http import HttpResponse
from .models import *
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework import status
from .serializer import *
from rest_framework.views import APIView
from rest_framework import generics

# authentification stuff
from django.contrib.auth.models import auth
from django.contrib.auth import authenticate, login, logout

class home(APIView):
    def get(self, request, *args, **kwargs):
        users = User.objects.all()
        blog_posts = BlogPost.objects.all()

        user_serializer = UserSerializer(users, many=True)
        blogpost_serializer = BlogPostSerializer(blog_posts, many=True)

        response_data = {
            'users': user_serializer.data,
            'blog_posts': blogpost_serializer.data,
        }

        return Response(response_data, status=status.HTTP_200_OK)




class register(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

def login(request):
    username = request.POST["username"]
    password = request.POST["password"]
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
    else:
        return "Error: Login failed"
        

class create_blogpost(generics.ListCreateAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
