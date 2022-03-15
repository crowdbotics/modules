from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class PhoneNumber(models.Model):
    phone_number = PhoneNumberField()

    def __str__(self):
        return str(self.phone_number)


class Verify(models.Model):
    phone_number = models.ForeignKey(PhoneNumber, on_delete=models.SET_NULL, null=True, blank=True)
    code = models.IntegerField(null=True, blank=True)






