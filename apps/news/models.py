from django.db import models


# Create your models here.
class NewsCategory(models.Model):
    name = models.CharField(max_length=20)


class News(models.Model):
    title = models.CharField(max_length=40)
    desc = models.CharField(max_length=100)
    thumbnail = models.URLField()
    content = models.TextField()
    pub_time = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey('NewsCategory', on_delete=models.SET_NULL, null=True)
    author = models.ForeignKey('sdbuauth.User', on_delete=models.SET_NULL, null=True)

    class Meta:
        ordering = ['-pub_time']
