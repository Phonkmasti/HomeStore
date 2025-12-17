from django.core.mail import send_mail

from app import settings

def subscribe_to_newsletter(user):
    subject = 'Hello'
    message = 'This is a test email.'
    from_email = settings.EMAIL_HOST_USER
    to_email = user.email
    
    send_mail(
        subject,
        message,
        from_email,
        [to_email],
        fail_silently=False,
    )