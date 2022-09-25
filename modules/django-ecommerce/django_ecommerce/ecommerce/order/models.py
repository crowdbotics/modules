from django.db import models
from oscar.apps.order.abstract_models import AbstractOrder


class Order(AbstractOrder):
    stripe_payment_intent_id = models.CharField(max_length=255, blank=True, default='')


from oscar.apps.order.models import *  # noqa isort:skip
