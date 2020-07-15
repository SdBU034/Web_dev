from django import forms
from apps.forms import FormMixin
from django.core.cache import cache
from .models import User


class LoginForm(forms.Form, FormMixin):
    telephone = forms.CharField(max_length=11)
    password = forms.CharField(max_length=10, min_length=4)
    remember = forms.IntegerField(required=False)


class RegisterForm(forms.Form, FormMixin):
    telephone = forms.CharField(max_length=11)
    username = forms.CharField(max_length=20, min_length=4)
    pwd1 = forms.CharField(max_length=10, min_length=4, error_messages={
        'min_length': '密码最少不能少于4位！', 'max_length': '密码最大不能超过10位！'
    })
    pwd2 = forms.CharField(max_length=10, min_length=4, error_messages={
        'min_length': '密码最少不能少于4位！', 'max_length': '密码最大不能超过10位！'
    })
    img_captcha = forms.CharField(max_length=4, min_length=4)

    def clean(self):
        cleaned_data = super().clean()

        # 验证两次输入的密码是否一致
        pwd1 = cleaned_data.get('pwd1')
        pwd2 = cleaned_data.get('pwd2')
        if pwd1 != pwd2:
            raise forms.ValidationError('两次密码输入不一致！')

        # 验证图形验证码输入是否正确
        img_captcha = cleaned_data.get('img_captcha')
        cached_img_captcha = cache.get(img_captcha.lower())
        if not cached_img_captcha or img_captcha != cached_img_captcha:
            raise forms.ValidationError('图形验证码错误')

        # 验证手机号码是否已经被注册
        telephone = cleaned_data.get('telephone')
        exists = User.objects.filter(telephone=telephone).exists()
        if exists:
            raise forms.ValidationError('%s已经呗注册' % telephone)

        return cleaned_data
