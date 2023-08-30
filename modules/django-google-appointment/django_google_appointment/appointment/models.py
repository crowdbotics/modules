from django.db import models


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
        

class Meetings(BaseModel):
    event_id = models.CharField(max_length=255, null=True, blank=True)
    summary = models.TextField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    event_type = models.CharField(max_length=220, null=True, blank=True)
    html_link = models.URLField(null=True, blank=True)
    hangout = models.URLField(null=True, blank=True)
    start = models.DateTimeField(verbose_name="meeting start time", null=True, blank=True)
    end = models.DateTimeField(verbose_name="meeting end time", null=True, blank=True)
    timezone = models.CharField(max_length=255)
    organizer = models.EmailField(verbose_name="organizer's email", null=True, blank=True)
    location = models.CharField(null=True, blank=True, max_length=220)
    status = models.CharField(null=True, blank=True, max_length=220)

    def __str__(self):
        return f"{self.summary}"

    class Meta:
        verbose_name_plural = "Meetings"


class MeetingAttendees(BaseModel):
    meeting = models.ForeignKey(Meetings, on_delete=models.CASCADE, null=True, blank=True,
                                    related_name="meeting_to_attends")
    email = models.EmailField(verbose_name="attendee's email")
    response_status = models.CharField(null=True, blank=True, max_length=220)

    def __str__(self):
        return f"{self.email}"

    class Meta:
        verbose_name_plural = "MeetingAttendees"
        