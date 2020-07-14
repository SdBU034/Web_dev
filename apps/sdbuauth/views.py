from django.contrib.auth import login, logout, authenticate
from django.views.decorators.http import require_POST
from .forms import LoginForm
from utils import restful
from django.shortcuts import redirect, reverse
from utils.captcha.sdbucaptcha import Captcha
from io import BytesIO
from django.http import HttpResponse


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
                return restful.ok()
            # 如果用户不可用
            else:
                return restful.result(code=restful.HttpCode.auth_error, message='您的账号已经被冻结')
        # 登录验证失败
        else:
            return restful.params_error(message='手机号码或者密码错误')
    # 表单验证失败
    else:
        errors = form.get_errors()
        return restful.params_error(message=errors)


def logout_view(request):
    logout(request)
    return redirect(reverse('index'))


def img_captcha(request):
    text, image = Captcha.gene_code()
    # 创建流对象，存储图片的流数据
    out = BytesIO()
    # 将img随想保存到BytesIO中
    image.save(out, 'png')
    # 将文件指针移动到文件开头
    out.seek(0)

    response = HttpResponse(content_type='image/png')
    response.write(out.read())
    # out.tell()代表指针当前所在的位置
    response['content-length'] = out.tell()
    return response
