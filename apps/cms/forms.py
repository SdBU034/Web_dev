from django import forms
from apps.forms import FormMixin


class EditNewsCategoryForm(forms.Form, FormMixin):
    pk = forms.IntegerField()
    name = forms.CharField(max_length=20)
