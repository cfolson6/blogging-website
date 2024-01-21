from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .models import *
from .serializer import *
from rest_framework import generics
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

class Home(APIView):
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
    
class CreateBlogpost(generics.ListCreateAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer

class UserView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
class Login(TokenObtainPairView):
    pass
