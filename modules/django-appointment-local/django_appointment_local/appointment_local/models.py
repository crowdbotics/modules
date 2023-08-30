from django.db import models
from users.models import User


class TimeStamp(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=False)

    class Meta:
        abstract = True


class MeetingInformation(TimeStamp):
    """
    MeetingInformation Model:
    This model will save appointment details for the user's selected type of meeting service.
    Save meeting types along with their descriptions and associated fees.
    """

    MEETING_TYPE_CHOICES = [
        ("Message", "Messaging"),
        ("Voice", "Voice Call"),
        ("Video", "Video Call"),
        ("Onsite", "Onsite"),
    ]
    service_provider = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="service_provider_fee_info"
    )
    meeting_type = models.CharField(
        max_length=10, choices=MEETING_TYPE_CHOICES, default="Message"
    )
    meeting_type_detail = models.TextField()
    fees = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return self.meeting_type


class AppointmentSession(TimeStamp):
    type = models.CharField(max_length=20)

    def __str__(self):
        return self.type


class Appointment(TimeStamp):
    """
    Appointment Model:
    This model will save the details of newly created appointment.
    It will save the SESSION details if a user is creating a meeting in morning or afternoon, evening or night.
    Detail of the client details like, name, email, age, gender and notes.
    The model will save the appointment date, start_time, end_time, cost for the appointment, discount on that
    appointment and additional fee.
    """

    GENDER_CHOICES = [("Male", "Male"), ("Female", "Female")]
    service_provider = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="appointment_service_provider"
    )
    client = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="appointment_client"
    )
    selected_date = models.DateField()
    session = models.ForeignKey(
        AppointmentSession,
        on_delete=models.DO_NOTHING,
        related_name="session_appointment",
    )
    start_time = models.TimeField()
    end_time = models.TimeField()
    is_available = models.BooleanField(default=False)
    name = models.CharField(max_length=40)
    address = models.CharField(max_length=256, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    age = models.PositiveIntegerField(null=True, blank=True)
    gender = models.CharField(max_length=7, choices=GENDER_CHOICES, default="Male")
    add_note = models.TextField(null=True, blank=True)
    appointment_cost = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, blank=True
    )
    additional_fee = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, blank=True
    )
    sub_total = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, blank=True
    )
    discount = models.DecimalField(
        max_digits=6, decimal_places=2, null=True, blank=True
    )
    total = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    appointment_type = models.ManyToManyField(
        MeetingInformation, related_name="appointment_meeting_type"
    )

    def __str__(self):
        return str(self.name)
