from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class BlogPost(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    title = models.CharField(max_length=100)
    text = models.CharField(max_length=1000)
    time_created = models.DateTimeField(auto_now_add=True)