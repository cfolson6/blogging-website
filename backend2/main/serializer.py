from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            email=None,
            password=validated_data['password']
        )
        return user

# for use when GETting blogposts
class BlogPostSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    
    class Meta:
        model = BlogPost
        fields = ['user', 'title', 'text', 'time_created']

# for use when creating new blogposts (doesn't serialize the user field)
class BlogPostSerializer2(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = ['user', 'title', 'text', 'time_created']