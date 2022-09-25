from django.db import models
from oscar.apps.address.abstract_models import AbstractUserAddress


class UserAddress(AbstractUserAddress):
    lat = models.FloatField(null=True, blank=True)
    lng = models.FloatField(null=True, blank=True)


from oscar.apps.address.models import *  # noqa isort:skip
