from django.urls import path
from . import views

app_name = 'cms'

urlpatterns = [
    path('', views.index, name='cms_index'),
    path('write_news/', views.write_news, name='write_news'),
]
