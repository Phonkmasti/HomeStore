from django.shortcuts import render


def index(request):

    return render(request, 'main/index.html')


def about(request):

    context = {
        'title': 'About Us',
        'content': 'About Our Store',
        'text_on_page': 'Learn about our mission and commitment to quality furniture',
    }
    return render(request, 'main/about.html', context)


def contact(request):

    context = {
        'title': 'Contact Us',
        'content': 'Contact Information',
        'text_on_page': 'Get in touch with our customer service team',
    }
    return render(request, 'main/contact-information.html', context)


def returns(request):

    context = {
        'title': 'Returns Policy',
        'content': 'Returns & Exchanges',
        'text_on_page': 'Learn about our hassle-free return policy',
    }
    return render(request, 'main/returns.html', context)


def account_details(request):

    context = {
        'title': 'Account Details',
        'content': 'Manage Your Account',
        'text_on_page': 'Update your personal information and preferences',
    }
    return render(request, 'main/account-details.html', context)


def faq(request):

    context = {
        'title': 'FAQ - Frequently Asked Questions',
        'content': 'Frequently Asked Questions',
        'text_on_page': 'Find answers to common questions',
    }
    return render(request, 'main/faq.html', context)


def addresses(request):

    context = {
        'title': 'Our Locations',
        'content': 'Store Locations & Warehouses',
        'text_on_page': 'Visit our showrooms and warehouses across the United States',
    }
    return render(request, 'main/addresses.html', context)