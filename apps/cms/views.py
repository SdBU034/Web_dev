from django.shortcuts import render
from django.contrib.admin.views.decorators import staff_member_required
from django.views.decorators.http import require_POST, require_GET
from apps.news.models import NewsCategory
from utils import restful


# Create your views here.
# django自带的验证是否位员工的装饰器
@staff_member_required(login_url='index')
def index(request):
    return render(request, 'cms/index.html')


def write_news(request):
    categories = NewsCategory.objects.all()
    context = {'categories': categories}
    return render(request, 'cms/write_news.html', context=context)


@require_GET
def news_category(request):
    categories = NewsCategory.objects.all()
    context = {'categories': categories}
    return render(request, 'cms/news_category.html', context=context)


@require_POST
def add_news_category(request):
    name = request.POST.get('name')
    print(name)
    exists = NewsCategory.objects.filter(name=name).exists()
    if not exists:
        NewsCategory.objects.create(name=name)
        return restful.ok()
    else:
        return restful.params_error(message='该分类已经存在。')
