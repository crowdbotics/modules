import os

from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags


def send_invitation_email(recipient_email, sender, sender_email, host, requestee_user):
    subject = "Invitation to Event"
    from_email = os.getenv('EMAIL')
    recipient_list = recipient_email

    html_message = render_to_string('email_template.html', context={
        'subject': subject,
        'recipient_email': recipient_email,
        'from_email': sender_email,
        'host': host,
        'requestee_user': requestee_user,
        'sender': sender
    })

    plain_message = strip_tags(html_message)
    print(plain_message)
    send_mail(subject, plain_message, from_email, recipient_list, html_message=html_message)
