from datetime import date

from django.db.models import Q
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import Appointment, MeetingInformation, AppointmentSession
from .serializers import (
    AppointmentSerializer,
    MeetingInformationSerializer,
    AppointmentSessionSerializer,
)


class MeetingInformationViewSet(viewsets.ModelViewSet):
    """
    MeetingInformation module provide CRUD operations for a meeting information type,
    including fees for messaging, calling, and video services.
    body_params: "service_provider", "meeting_type". "meeting_type_detail", "fees"
    """

    queryset = MeetingInformation.objects.all()
    serializer_class = MeetingInformationSerializer
    permission_classes = [IsAuthenticated]


class AppointmentViewSet(viewsets.ModelViewSet):
    """
    AppointmentViewSet  provide CRUD (Create, Read, Update, Delete) operations for appointments
    between clients and service providers, with validation to ensure appointments are for today or future
    dates.
    body_params: "service_provider", "client", "selected_date", "session", "start_time", "end_time", "name"
                 "email", "age", "gender", "add_note", "appointment_type".
    """

    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        today = date.today()
        user = self.request.user
        return self.queryset.filter(
            Q(service_provider=user) | Q(client=user) | Q(selected_date__gte=today)
        )


class AppointmentSessionViewSet(viewsets.ModelViewSet):
    """
    AppointmentSessionViewSet module provide CRUD (Create, Read, Update, Delete) operations for appointments
    body_params: "type" include("Morning", "Afternoon", "Evening", "Night")
    """

    queryset = AppointmentSession.objects.all()
    serializer_class = AppointmentSessionSerializer
    permission_classes = [IsAuthenticated]
