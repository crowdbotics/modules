from rest_framework import serializers
from .models import Appointment, MeetingInformation


class MeetingInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeetingInformation
        fields = '__all__'
        read_only_fields = ('id',)


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'
        read_only_fields = ('id',)
