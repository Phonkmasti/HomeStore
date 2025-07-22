from django.shortcuts import render

# Create your views here.
def login(request):
    context = {
        'title': 'Home - Авторизация'
    }
    return render(request, 'users/login.html', context)


def registration(request):
    context = {
        'title': 'Home - Регистрация'
    }
    return render(request, 'users/registration.html', context)


def profile(request):
    context = {
        'title': 'Home - Личный кабинет'
    }
    return render(request, 'users/profile.html', context)


def logout(request):
    ...