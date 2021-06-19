from django.db import models
from django.conf import settings

class Image(models.Model):
    user = 1
    title = models.CharField(max_length=128, null=True, blank=True)
    comment = models.CharField(max_length=512, null=True, blank=True)
    lat_long = models.CharField(max_length=100, null=True, blank=True)
    image = models.ImageField(upload_to='images/')
    thumbnail = models.ImageField(upload_to='thumbnails/', null=True, blank=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(auto_now_add=True)


    @property
    def coords(self):
        """
        return coords in array format
        """
        return [self.split(',')[0], self.split(',')[1]] if self.lat_long else []

    def __str__(self):
        return self.id