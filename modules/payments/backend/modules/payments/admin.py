from django.contrib import admin
from .models import StripeUserProfile, StripeUserPaymentMethod, Payment, PaymentLog

admin.site.register(StripeUserProfile)
admin.site.register(StripeUserPaymentMethod)
admin.site.register(Payment)
admin.site.register(PaymentLog)




