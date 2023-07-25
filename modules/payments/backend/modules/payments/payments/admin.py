from django.contrib import admin

from .models import StripeSetting, StripeUserProfile

admin.site.register(StripeUserProfile)
admin.site.register(StripeSetting)
