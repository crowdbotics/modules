from django.db import models
from datetime import timedelta

class Appointment(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=500, default='')
    date_time = models.DateTimeField(default=timedelta)
    duration = models.DurationField(default=timedelta)
    location = models.CharField(max_length=500, default='')

    def __str__(self):
        return self.title