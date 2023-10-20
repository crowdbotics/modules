from django import forms
from django.contrib.admin.helpers import ActionForm


class CustomAdminNotificationForm(ActionForm):
    title = forms.CharField(label="Title:", required=True)
    message = forms.CharField(label="Message:", widget=forms.Textarea, required=True)
