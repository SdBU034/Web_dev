from django import forms
from apps.forms import FormMixin
from apps.news.models import News


class EditNewsCategoryForm(forms.Form, FormMixin):
    pk = forms.IntegerField()
    name = forms.CharField(max_length=20)


class NewsForm(forms.ModelForm, FormMixin):
    category = forms.IntegerField()

    class Meta:
        model = News
        exclude = ['category', 'pub_time', 'author']