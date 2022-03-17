from django.contrib import admin
from .models import PhoneNumber, Verify


@admin.register(PhoneNumber)
class AdminPhoneNumber(admin.ModelAdmin):
    list_display = ['id', 'phone_number', 'email']


@admin.register(Verify)
class AdminPhoneNumber(admin.ModelAdmin):
    list_display = ['id', 'phone_number', 'email', 'code']


