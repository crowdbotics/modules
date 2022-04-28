from django.db import models
from datetime import timedelta


class Appointment(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    selected_date = models.DateField(null=False)
    time_slot = models.DurationField(null=False)
    duration = models.DurationField()
    location = models.CharField(max_length=500, null=True, blank=True)

    def __str__(self):
        return self.title
