from django.db import models
from django.conf import settings

from modules.subscription.services.StripeSubscriptionService import StripeSubscriptionService


class SubscriptionPlan(models.Model):
    price_id = models.CharField(max_length=100, null=True, blank=True, unique=True)
    price = models.DecimalField(null=True, blank=True, decimal_places=2, max_digits=10,
                                help_text="Filled Automatically by pulling from stripe according to price_id")
    plan_type = models.CharField(max_length=100, null=True, blank=True,
                                 help_text="Filled Automatically by pulling from stripe according to price_id")
    interval = models.CharField(max_length=100, null=True, blank=True,
                                help_text="Filled Automatically by pulling from stripe according to price_id")
    name = models.CharField(max_length=100, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    is_active = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        p = StripeSubscriptionService.get_price_details(self.price_id)
        self.price = p.unit_amount / 100
        self.plan_type = p.type
        self.interval = p.recurring.interval
        super(SubscriptionPlan, self).save(*args, **kwargs)

    def __str__(self):
        return self.name

class UserSubscription(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='user_subscription'
    )
    tier = models.ForeignKey(
        SubscriptionPlan,
        on_delete=models.CASCADE,
        related_name='tier_user_subscriptions',
        null=True, blank=True
    )
    subscription_id = models.CharField(max_length=512, null=True, blank=True)
    is_active = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "{} {}".format(self.user, self.tier)


class UserSubscriptionHistory(models.Model):
    sub = models.ForeignKey(
        UserSubscription,
        on_delete=models.CASCADE,
        related_name='subscription_history'
    )
    action = models.CharField(max_length=512, null=True, blank=True)
    result = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class SubscriptionInvoice(models.Model):
    sub = models.ForeignKey(
        UserSubscription,
        on_delete=models.CASCADE,
        related_name='subscription_invoices'
    )
    date = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class StripeWebhookLog(models.Model):
    type = models.CharField(max_length=512, null=True, blank=True)
    data = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)