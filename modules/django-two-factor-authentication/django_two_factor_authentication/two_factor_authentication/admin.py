from django.contrib import admin
from .models import TwoFactorAuth, EnableTwoFactorAuthentication

admin.site.register(TwoFactorAuth)
admin.site.register(EnableTwoFactorAuthentication)

