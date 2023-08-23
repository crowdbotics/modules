from rest_framework import viewsets
from .serializers import AppointmentSerializer
from .models import Appointment
from datetime import date


class AppointmentViewSet(viewsets.ModelViewSet):
    today = date.today()
    """
    Validating appointment are for today or incoming dates.
    """
    queryset = Appointment.objects.filter(selected_date__gte = today)
    serializer_class = AppointmentSerializer
