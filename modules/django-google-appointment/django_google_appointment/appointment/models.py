from django.db import models


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class MeetingType(BaseModel):
    type_tag = models.CharField(max_length=220)
    type_text = models.CharField(max_length=220)

    def __str__(self):
        return f"{self.type_tag}"

    class Meta:
        verbose_name_plural = "MeetingTypes"


class Meetings(BaseModel):
    title = models.CharField(verbose_name="meeting title", max_length=220)
    type = models.ForeignKey(MeetingType, on_delete=models.CASCADE, null=True, blank=True, related_name="meeting_type")
    description = models.CharField(null=True, blank=True, max_length=220)
    html_link = models.URLField(null=True, blank=True)
    hang_out = models.URLField(null=True, blank=True)
    start = models.DateTimeField(verbose_name="meeting start time", null=True, blank=True)
    end = models.DateTimeField(verbose_name="meeting end time", null=True, blank=True)
    meeting_id = models.CharField(null=True, blank=True, max_length=220)
    organizer = models.EmailField(verbose_name="organizer's email")
    location = models.CharField(null=True, blank=True, max_length=220)
    status = models.CharField(null=True, blank=True, max_length=220)
    summary = models.CharField(null=True, blank=True, max_length=220)

    def __str__(self):
        return f"{self.title}"

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
        