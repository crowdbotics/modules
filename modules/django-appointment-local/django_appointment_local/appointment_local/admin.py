from django.contrib import admin
from .models import MeetingInformation, Appointment

# Register your models here.
admin.site.register(MeetingInformation)
admin.site.register(Appointment)