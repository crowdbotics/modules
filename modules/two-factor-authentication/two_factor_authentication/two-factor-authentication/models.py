from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class TwoFactorAuth(models.Model):
    phone_number = PhoneNumberField(null=True, blank=True)
    email = models.EmailField(max_length=255, null=True, blank=True)
    secret = models.CharField(max_length=16, null=True, blank=True)
    method = models.CharField(max_length=20, null=True, blank=True)

    def __str__(self):
        return str(self.phone_number)


class Verify(models.Model):
    phone_number = models.ForeignKey(TwoFactorAuth, on_delete=models.SET_NULL, null=True, blank=True)
    email = models.EmailField(max_length=255, null=True, blank=True)
    code = models.IntegerField(null=True, blank=True)

