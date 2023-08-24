from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.utils.translation import ugettext_lazy as _


class StripeUserProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="stripe_profile",
    )
    stripe_cus_id = models.CharField(
        max_length=120, null=True, blank=True, help_text="Stripe Customer ID"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


def create_stripe_profile(sender, instance, created, **kwargs):
    if created:
        StripeUserProfile.objects.create(user=instance)


post_save.connect(
    create_stripe_profile,
    sender=settings.AUTH_USER_MODEL,
    dispatch_uid="create_user_profile",
)
