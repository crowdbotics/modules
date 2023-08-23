from django.db import models


class Okta(models.Model):
    oktaID = models.CharField(max_length=100, unique=True, primary_key=True)
    stateToken = models.CharField(max_length=256)
    expiresAt = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
