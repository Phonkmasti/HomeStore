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


def returns(request):
    context = {
        "title": "Returns Policy",
        'content': "Returns & Exchanges",
        'text_on_page': 'Learn about our hassle-free return policy',
    }
    return render(request, 'main/returns.html', context)


def account_details(request):
    context = {
        "title": "Account Details",
        'content': "Manage Your Account",
        'text_on_page': 'Update your personal information and preferences',
    }
    return render(request, 'main/account-details.html', context)


def faq(request):
    context = {
        "title": "FAQ - Frequently Asked Questions",
        'content': "Frequently Asked Questions",
        'text_on_page': 'Find answers to common questions',
    }
    return render(request, 'main/faq.html', context)