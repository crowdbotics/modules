from django.db import models


class Faq(models.Model):
    created_at = models.DateTimeField(verbose_name="Created", auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name="Updated", auto_now=True)
    question = models.TextField(blank=True)
    answer = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    sequence = models.PositiveIntegerField(default=1, blank=True)

    class Meta:
        ordering = ["sequence", "-updated_at"]
