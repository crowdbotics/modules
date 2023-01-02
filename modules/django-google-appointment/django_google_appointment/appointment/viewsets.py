import os

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .serializers import EventsListSerializer
from .services.GoogleAppointmentServices import GoogleAppointmentService


class GoogleAppointmentViewSet(viewsets.GenericViewSet):
    """
        - appointment_list: This class without any parameters return all events from the Google Calendar. Filter
        results according to the provided queries.
        - single_appointment: The class method gets a single event from the calendar.
        - create_appointment: This class creates a new events with its attendees on Google Calendar
        - delete_appointment: The method deletes a single event from the calendar
    """

    allowed_serializers = {
        "appointment_list": EventsListSerializer
    }

    def get_serializer_class(self):
        return self.allowed_serializers.get(self.action, EventsListSerializer)

    @action(detail=False, methods=['get'], url_path='appointment/list')
    def appointment_list(self, request):
        try:
            serializer = self.get_serializer(data=request.query_params)
            serializer.is_valid(raise_exception=True)
            google_appointment_service = GoogleAppointmentService(access_token=request.META.get('HTTP_AUTHORIZATION'))
            response = google_appointment_service.appointment_list(**serializer.data)
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e.args, status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'], url_path='appointment/single')
    def single_appointment(self, request, eventId):
        try:
            google_appointment_service = GoogleAppointmentService(access_token=request.META.get('HTTP_AUTHORIZATION'))
            response = google_appointment_service.single_appointment(eventId=eventId)
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e.args, status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='appointment/create')
    def create_appointment(self, request):
        try:
            google_appointment_service = GoogleAppointmentService(access_token=request.META.get('HTTP_AUTHORIZATION'))            
            response = google_appointment_service.create_appointment(request.data)
            return Response(response, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(e.args, status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['delete'], url_path='appointment/remove')
    def delete_appointment(self, request, eventId):
        try:
            google_appointment_service = GoogleAppointmentService(access_token=request.META.get('HTTP_AUTHORIZATION'))  
            response = google_appointment_service.delete_appointment(eventId=eventId)
            return Response(response, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(e.args, status.HTTP_400_BAD_REQUEST)
