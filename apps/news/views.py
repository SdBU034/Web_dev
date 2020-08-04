from django.shortcuts import render
from .models import News, NewsCategory
from django.conf import settings
from utils import restful


# Create your views here.
def index(request):
    count = settings.ONE_PAGE_NEWS_COUNT
    newses = News.objects.order_by('-pub_time')[:count]
    categories = NewsCategory.objects.all()
    context = {'newses': newses, 'categories': categories}
    return render(request, 'news/index.html', context=context)


def news_list(request):
    page = int(request.GET.get('p', 1))
    start = (page - 1) * settings.ONE_PAGE_NEWS_COUNT
    end = start + settings.ONE_PAGE_NEWS_COUNT
    newses = News.objects.select_related('category').order_by('-pub_time')[start:end].values('pub_time', 'id', 'title', 'category')
    for news in newses:
        print(news)
    return restful.ok()


def news_detail(request, news_id):
    return render(request, 'news/news_detail.html')


def search(request):
    return render(request, 'search')