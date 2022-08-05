from django.contrib import admin
from .models import StripeUserProfile, AppleIAPProduct

admin.site.register(StripeUserProfile)
admin.site.register(AppleIAPProduct)