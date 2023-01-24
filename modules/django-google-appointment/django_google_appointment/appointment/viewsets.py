from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializers import EventsListSerializer, MeetingSerializer, MeetingListSerializer
from .services.GoogleAppointmentServices import GoogleAppointmentService
from .models import Meetings


class GoogleAppointmentViewSet(viewsets.GenericViewSet):
    """
        - appointment_list: This class without any parameters return all events from the Google Calendar. Filter
        results according to the provided queries.
        - single_appointment: The class method gets a single event from the calendar.
        - create_appointment: This class creates a new events with its attendees on Google Calendar
        - delete_appointment: The method deletes a single event from the calendar
        - sync_appointment: The method to sync event from the calendar
        - synced_appointment_list: The method to get synced appointment list of calendar events
    """

    allowed_serializers = {
        "appointment_list": EventsListSerializer,
        "sync_appointment": MeetingSerializer
    }

    def get_serializer_class(self):
        return self.allowed_serializers.get(self.action, EventsListSerializer)

    @action(detail=False, methods=['get'], url_path='appointment-list')
    def appointment_list(self, request):
        try:
            google_appointment_service = GoogleAppointmentService(access_token=request.META.get('HTTP_AUTHORIZATION'))
            serializer = self.get_serializer(data=request.query_params)
            serializer.is_valid(raise_exception=True)
            response = google_appointment_service.appointment_list(**serializer.data)
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e.args, status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'], url_path='appointment-single')
    def single_appointment(self, request, pk):
        try:
            google_appointment_service = GoogleAppointmentService(access_token=request.META.get('HTTP_AUTHORIZATION'))
            response = google_appointment_service.single_appointment(eventId=pk)
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e.args, status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='appointment-create')
    def create_appointment(self, request):
        try:
            google_appointment_service = GoogleAppointmentService(access_token=request.META.get('HTTP_AUTHORIZATION'))
            response = google_appointment_service.create_appointment(request.data)
            return Response(response, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(e.args, status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['delete'], url_path='appointment-remove')
    def delete_appointment(self, request, pk):
        try:
            google_appointment_service = GoogleAppointmentService(access_token=request.META.get('HTTP_AUTHORIZATION'))
            response = google_appointment_service.delete_appointment(eventId=pk)
            return Response(response, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(e.args, status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='appointment-sync')
    def sync_appointment(self, request):
        try:
            query = {
                "show_deleted": True
            }
            google_appointment_service = GoogleAppointmentService(access_token=request.META.get('HTTP_AUTHORIZATION'))
            response = google_appointment_service.appointment_list(**query)
            serializer = self.get_serializer(data=response['items'], many=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({"message": "Synced successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(e.args, status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'], url_path='appointment-synced-list', permission_classes=[IsAuthenticated])
    def synced_appointment_list(self, request):
        serializer = MeetingListSerializer(Meetings.objects.all(), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
