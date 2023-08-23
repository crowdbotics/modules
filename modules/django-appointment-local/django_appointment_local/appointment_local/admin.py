from django.contrib import admin
from .models import MeetingInformation, Appointment, AppointmentSession

admin.site.register(MeetingInformation)
admin.site.register(Appointment)
admin.site.register(AppointmentSession)
