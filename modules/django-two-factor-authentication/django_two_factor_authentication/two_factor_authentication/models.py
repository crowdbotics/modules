from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class TimeStamp(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=False)

    class Meta:
        abstract = True


class TwoFactorAuth(TimeStamp):
    EMAIL = 'email'
    PHONE_NUMBER = 'phone_number'
    GOOGLE_AUTHENTICATOR = 'google_authenticator'
    METHOD = (
        (EMAIL, 'Email'),
        (PHONE_NUMBER, 'Phone Number'),
        (GOOGLE_AUTHENTICATOR, 'Google Authenticator')
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="user_two_factor")
    method = models.CharField(max_length=32, choices=METHOD, default="email")
    code = models.IntegerField()

    def __str__(self):
        return str(self.user)


class EnableTwoFactorAuthentication(TimeStamp):
    METHOD = (
        ('email', 'Email'),
        ('phone_number', 'Phone Number'),
        ('google_authenticator', 'Google Authenticator')
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="enable_user")
    method = models.CharField(max_length=32, choices=METHOD, default="email")

    def __str__(self):
        return str(self.user)
