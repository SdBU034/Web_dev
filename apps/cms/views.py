from django.shortcuts import render
from django.contrib.admin.views.decorators import staff_member_required


# Create your views here.
# django自带的验证是否位员工的装饰器
@staff_member_required(login_url='index')
def index(request):
    return render(request, 'cms/index.html')


def write_news(request):
    return render(request, 'cms/write_news.html')
