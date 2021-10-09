from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.utils.translation import ugettext_lazy as _

class StripeUserProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='stripe_profile'
    )
    stripe_cus_id = models.CharField(
        max_length=120, 
        null=True, blank=True,
        help_text="Stripe Customer ID"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


def create_stripe_profile(sender, instance, created, **kwargs):
    if created:
        StripeUserProfile.objects.create(user=instance)

post_save.connect(create_stripe_profile, sender=settings.AUTH_USER_MODEL, dispatch_uid="create_user_profile")



class StripeUserPaymentMethod(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='stripe_payment_methods'
    )
    payment_source_id = models.CharField(max_length=120, null=True, blank=True)
    last4 = models.CharField(max_length=8, null=True, blank=True)
    brand = models.CharField(max_length=120, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Payment(models.Model):
    PENDING = 1
    PRE_AUTHORIZED = 2
    CAPTURED = 3
    CANCELLED = 4
    REFUNDED = 5
    PARTIAL_REFUNDED = 6
    FAILED = 7

    PAYMENT_STATUS = [
        (PENDING, _("Pending")),
        (PRE_AUTHORIZED, _("Pre Authorized")),
        (CAPTURED, _("Captured")),
        (CANCELLED, _("Cancelled")),
        (REFUNDED, _("Refunded")),
        (PARTIAL_REFUNDED, _("Partial Refunded")),
        (FAILED, _("Failed")),
    ]
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.SET_NULL, 
        null=True, blank=True,
        related_name="stripe_payments"
    )
    amount_cents = models.PositiveIntegerField(default=0, help_text="Amount in cents")
    amount_dollars = models.DecimalField(default=0, decimal_places=2, max_digits=10)
    currency = models.CharField(max_length=50, null=True, blank=True, default='USD')
    payment_status = models.IntegerField(choices=PAYMENT_STATUS, default=1)
    timestamp = models.DateTimeField(auto_now_add=True)


class PaymentLog(models.Model):
    type = models.CharField(max_length=120, null=True, blank=True)
    path = models.TextField(null=True, blank=True)
    request = models.TextField(null=True, blank=True)
    response = models.TextField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
