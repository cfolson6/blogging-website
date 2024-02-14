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
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

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
    
class BlogPostView(generics.ListCreateAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer

class CreateBlogPostView(APIView):
    #authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Access the authenticated user using request.user
        user_id = request.user.id

        # Create a serializer instance with user and request data
        serializer = BlogPostSerializer2(data={'user': user_id, **request.data})

        if serializer.is_valid():
            # Save the serializer instance to create a new blog post
            serializer.save()
            return Response({"message": "Blog post created successfully"})
        else:
            return Response(serializer.errors, status=400)

class UserView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class GetUserById(APIView):
    def get(self, request, user_id):
        try:
            user = User.objects.get(pk=user_id)  # Retrieve user by user id
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = UserSerializer(user)  # Serialize user object
        return Response(serializer.data)
    
class Login(TokenObtainPairView):
    pass

class GetUserByToken(APIView):
    #authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user

        user_serializer = UserSerializer(user)

        return Response(user_serializer.data, status=status.HTTP_200_OK)


    





