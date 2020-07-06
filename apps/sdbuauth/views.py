from django.contrib.auth import login, logout, authenticate
from django.views.decorators.http import require_POST
from .forms import LoginForm
from django.http import JsonResponse


# Create your views here.
@require_POST
def login_view(request):
    form = LoginForm(request.POST)
    if form.is_valid():
        telephone = form.cleaned_data.get('telephone')
        password = form.cleaned_data.get('password')
        remember = form.cleaned_data.get('remember')
        user = authenticate(request, username=telephone, password=password)
        if user:
            if user.is_active:
                login(request, user)
                if remember:
                    # 设施过期时间为默认，两个星期
                    request.session.set_expiry(None)
                else:
                    request.session.set_expiry(0)
                return JsonResponse({
                    'code': 200,
                    'message': '',
                    'data': {}
                })
            # 如果用户不可用
            else:
                return JsonResponse({
                    'code': 405,
                    'message': '您的帐号已经被冻结',
                    'data': {}
                })
        # 登录验证失败
        else:
            return JsonResponse({
                'code': 400,
                'message': '手机号码或者密码错误',
                'data': {}
            })
    # 表单验证失败
    else:
        errors = form.get_errors()
        return JsonResponse({
            'code': 400,
            'message': '',
            'data': errors
        })
