from ast import Num
from statistics import mode
from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.utils.translation import ugettext_lazy as _

from .services.StripeService import StripeService

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
        stripe_user = StripeService.create_user(instance)
        if stripe_user:
            StripeUserProfile.objects.create(user=instance, stripe_cus_id=stripe_user.id)

post_save.connect(create_stripe_profile, sender=settings.AUTH_USER_MODEL, dispatch_uid="create_user_profile")


class AppleIAPProduct(models.Model):
    name = models.CharField(max_length=128, null=True, blank=True)
    product_id = models.CharField(max_length=128)
    is_active = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"{self.pk}-{self.name}"

    def as_dict(self):
        return {
            "id": self.pk,
            "name": self.name,
            "product_id": self.product_id
        }