from django.http import HttpResponse
from django.shortcuts import render

from goods.models import Categories


def index(request):
    return render(request, "main/index.html")
    

def about(request):
    context = {
        "title": "Home - О нас",
        'content': "О нас",
        'text_on_page': 'Текст о том что наш товар самый популярный в мире',
        
    }
    return render(request, "main/about.html", context)

def contact(request):
    context = {
        "title": "Home - Контактная информация",
        'content': "Контактная информация о нашем магазине",
        'text_on_page': 'Наши контактные данные',
    }
    return render(request, 'main/contact-information.html', context)