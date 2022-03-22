from django.contrib import admin
from .models import TwoFactorAuth, Verify


@admin.register(TwoFactorAuth)
class AdminPhoneNumber(admin.ModelAdmin):
    list_display = ['id', 'phone_number', 'email']


@admin.register(Verify)
class AdminPhoneNumber(admin.ModelAdmin):
    list_display = ['id', 'phone_number', 'email', 'code']

