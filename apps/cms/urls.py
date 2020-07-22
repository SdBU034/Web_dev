from django.urls import path
from . import views

app_name = 'cms'

urlpatterns = [
    path('', views.index, name='cms_index'),
    path('write_news/', views.write_news, name='write_news'),
    path('news_category/', views.news_category, name='news_category'),
    path('add_news_category/', views.add_news_category, name='add_news_category'),
]
