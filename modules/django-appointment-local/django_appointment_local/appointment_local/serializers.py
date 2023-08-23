from django.db.models import Q
from rest_framework import serializers

from .models import Appointment, MeetingInformation, AppointmentSession


class MeetingInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeetingInformation
        fields = "__all__"
        read_only_fields = ("id",)


class AppointmentSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppointmentSession
        fields = "__all__"
        read_only_fields = ("id",)


class AppointmentSerializer(serializers.ModelSerializer):
    """
    The AppointmentSerializer used for handle validation that another user has already booked the appointment slot or not.
    """

    class Meta:
        model = Appointment
        fields = "__all__"
        read_only_fields = ("id",)

    def validate(self, attrs):
        user = self.context.get("request").user
        selected_date = attrs.get("selected_date")
        start_time = attrs.get("start_time")
        end_time = attrs.get("end_time")

        appointment_exists = Appointment.objects.filter(
            Q(service_provider=user) | Q(client=user),
            Q(start_time__range=(start_time, end_time))
            | Q(end_time__range=(start_time, end_time)),
            selected_date__gte=selected_date,
        ).exists()

        if appointment_exists:
            raise serializers.ValidationError(
                "This meeting slot is already booked. Please select a different time slot."
            )

        return attrs
