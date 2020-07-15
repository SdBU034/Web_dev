from django.urls import path
from . import views

app_name = 'sdbuauth'

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('img_captcha/', views.img_captcha, name='img_captcha'),
    path('register/', views.register, name='register'),
    # 测试memcached
    # path('cache/', views.cache_text, name='cache_test'),
]