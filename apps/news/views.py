from django.shortcuts import render
from .models import News, NewsCategory
from django.conf import settings
from utils import restful
from .serializers import NewsSerializer


# Create your views here.
def index(request):
    count = settings.ONE_PAGE_NEWS_COUNT
    newses = News.objects.all()[:count]
    categories = NewsCategory.objects.all()
    context = {'newses': newses, 'categories': categories}
    return render(request, 'news/index.html', context=context)


def news_list(request):
    page = int(request.GET.get('p', 1))
    # 分类为0代表不进行任何分类
    category_id = int(request.GET.get('category_id', 0))
    start = (page - 1) * settings.ONE_PAGE_NEWS_COUNT
    end = start + settings.ONE_PAGE_NEWS_COUNT

    if category_id == 0:
        newses = News.objects.select_related('category')[start:end]
    else:
        newses = News.objects.filter(category_id=category_id)[start:end]

    serializer = NewsSerializer(newses, many=True)
    data = serializer.data
    return restful.result(data=data)


def news_detail(request, news_id):
    return render(request, 'news/news_detail.html')


def search(request):
    return render(request, 'search')