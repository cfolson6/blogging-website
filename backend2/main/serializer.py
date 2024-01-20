from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User

class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = ['user', 'title', 'text', 'time_created']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']