from django.db import models
from django.conf import settings

class Image(models.Model):
    image = models.ImageField(upload_to='static/img/')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "%s"%self.id