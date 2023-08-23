from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .serializers import AppointmentSerializer, MeetingInformationSerializer
from .models import Appointment, MeetingInformation
from datetime import date


class MeetingInformationViewSet(viewsets.ModelViewSet):

    queryset = MeetingInformation.objects.all()
    serializer_class = MeetingInformationSerializer
    permission_classes = [IsAuthenticated]


class AppointmentViewSet(viewsets.ModelViewSet):
    today = date.today()
    """
    Validating appointment are for today or incoming dates.
    """
    queryset = Appointment.objects.filter(selected_date__gte=today)
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]
