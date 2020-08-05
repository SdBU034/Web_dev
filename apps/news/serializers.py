# encoding = utf-8

from rest_framework import serializers
from .models import News, NewsCategory
from apps.sdbuauth.serializers import AuthorSerializer


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = NewsCategory
        fields = ('id', 'name')


class NewsSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    author = AuthorSerializer()

    class Meta:
        model = News
        fields = ('id', 'title', 'desc', 'thumbnail', 'pub_time', 'category', 'author')
