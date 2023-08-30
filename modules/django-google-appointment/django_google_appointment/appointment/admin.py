from django.contrib import admin
from .models import Meetings, MeetingAttendees


@admin.register(Meetings)
class MeetingsAdmin(admin.ModelAdmin):
    list_display = ["event_id", "summary", "event_type", "hangout", "timezone"]


@admin.register(MeetingAttendees)
class MeetingAttendeesAdmin(admin.ModelAdmin):
    list_display = ["meeting", "email", "response_status"]
