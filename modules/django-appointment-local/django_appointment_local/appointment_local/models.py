from django.db import models
from users.models import User


class TimeStamp(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=False)

    class Meta:
        abstract = True


class MeetingInformation(TimeStamp):
    MEETING_TYPE = [
        ('message', 'Messaging'),
        ('voice', 'Voice Call'),
        ('video', 'Video Call'),
    ]
    service_provider = models.ForeignKey(User, on_delete=models.CASCADE, related_name='service_provider_fee_info')
    meeting_type = models.CharField(max_length=10, choices=MEETING_TYPE)
    meeting_type_detail = models.TextField()
    fees = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return self.meeting_type


class Appointment(TimeStamp):
    SESSION_DAY = [
        ('morning', 'Morning'),
        ('afternoon', 'Afternoon'),
        ('evening', 'Evening'),
        ('night', 'Night'),
    ]
    GENDER = [
        ('male', 'Male'),
        ('female', 'Female')
    ]
    service_provider = models.ForeignKey(User, on_delete=models.CASCADE, related_name='appointment_service_provider')
    client = models.ForeignKey(User, on_delete=models.CASCADE, related_name='appointment_client')
    selected_date = models.DateField()
    session = models.CharField(max_length=9, choices=SESSION_DAY)
    start_time = models.TimeField()
    end_time = models.TimeField()
    is_available = models.BooleanField(default=False)
    name = models.CharField(max_length=40)
    email = models.EmailField(null=True, blank=True)
    age = models.PositiveIntegerField()
    gender = models.CharField(max_length=7, choices=GENDER)
    add_note = models.TextField()
    appointment_cost = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    additional_fee = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    sub_total = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    discount = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    total = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    appointment_type = models.ManyToManyField(MeetingInformation, related_name='appointment_meeting_type')

    def __str__(self):
        return str(self.name)