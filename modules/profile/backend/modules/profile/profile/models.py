from django.contrib.auth import get_user_model
from django.db import models
from django_countries.fields import CountryField
from phonenumber_field.modelfields import PhoneNumberField

User = get_user_model()


class TimeStamp(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now_add=True, editable=False)

    class Meta:
        abstract = True


class Profile(TimeStamp):
    """
    This Class Contain Common fields related to User Profile
    """
    GENDER_CHOICES = (
        ('MALE', 'Male'),
        ('FEMALE', 'Female'),
        ('OTHER', 'Other'),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user_profile')
    first_name = models.CharField('first name', max_length=30, null=True, blank=True)
    last_name = models.CharField('last name', max_length=30, null=True, blank=True)
    phone = PhoneNumberField(unique=True, null=True, blank=True)
    country = CountryField(null=True, blank=True)
    city = models.CharField(max_length=50, null=True, blank=True)
    state = models.CharField(max_length=10, null=True, blank=True)
    profile_image = models.ImageField(upload_to='media/')
    address = models.CharField(max_length=255, null=True, blank=True)
    zip_code = models.CharField(max_length=20, null=True, blank=True)
    gender = models.CharField(max_length=5, choices=GENDER_CHOICES, default='MALE', null=True, blank=True)
    birthday = models.DateTimeField(auto_now=True, null=True, blank=True)
    age = models.IntegerField(blank=True, null=True, default=None)

    class Meta:
        verbose_name_plural = "Profile"

    def __str__(self):
        return f"{self.user}"
