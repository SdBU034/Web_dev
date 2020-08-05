from rest_framework import serializers
from .models import User


# 作者模型序列化
class AuthorSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('uid', 'username', 'telephone', 'email', 'is_active', 'is_staff')
