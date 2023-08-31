from rest_framework import viewsets, status
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
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

    @action(detail=False, methods=['get'], url_path='appointment/list')
    def appointment_list(self, request):
        """
               Returns a list of the all the events scheduled in past and for the future

               :query_params int max_results: Maximum number of events returned on one result page  \n
               :query_params str order_by: The order of the events returned in the result. Supported values are 'startTime' and 'updated'  \n
               :query_params str time_max: An event's start time to filter by. Supported format is '2011-06-03T10:00:00-07:00'  \n
               :query_params str time_min: An event's end time to filter by. Supported format is '2011-06-03T10:00:00-07:00'  \n
               :query_params str page_token: Token specifying which result page to return  \n
               :query_params bool show_deleted: Whether to include deleted events (with status equals "cancelled") in the result  \n
               :query_params bool single_events: Whether to expand recurring events into instances and only return single one-off events and instances of recurring events  \n
               :return: Returns events on the according to the specified queries if are provided.  \n
               """
        try:
            google_appointment_service = GoogleAppointmentService(access_token=request.META.get('HTTP_AUTHORIZATION'))
            serializer = self.get_serializer(data=request.query_params)
            serializer.is_valid(raise_exception=True)
            response = google_appointment_service.appointment_list(**serializer.data)
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e.args, status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'], url_path='appointment/single')
    def single_appointment(self, request, pk):
        """
                Retrieves a single event from the calendar

                :path_param eventId: The id of the scheduled event  \n
                :return: Returns a single event object
                """
        try:
            google_appointment_service = GoogleAppointmentService(access_token=request.META.get('HTTP_AUTHORIZATION'))
            response = google_appointment_service.single_appointment(eventId=pk)
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e.args, status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='appointment/create')
    def create_appointment(self, request):
        """
                Creates a new event of the calendar.

                :param str summary: The title for the appointment  \n
                :param str description: Description for the appointment  \n
                :param str location: Location where meeting will be held  \n
                :param obj start: Object containing the starting `dateTime` for the appointment   \n
                :param obj end: Object containing the ending `dateTime` for the appointment   \n
                :param arr attendees: Array/List containing objects. Each object has the attendees `email`   \n
                :param obj conferenceData: Object containing details if the user wants to create the meeting hangoutLink.  \n
                :return: Creates a new event/appointment on the calendar and returns event object.  \n
                """
        try:
            google_appointment_service = GoogleAppointmentService(access_token=request.META.get('HTTP_AUTHORIZATION'))
            response = google_appointment_service.create_appointment(request.data)
            return Response(response, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(e.args, status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['delete'], url_path='appointment/remove')
    def delete_appointment(self, request, pk):
        """
                Deletes a single event from the calendar

                :path_param eventId: The id of the scheduled event  \n
                :return: Removes a single event object from the calendar.   \n
                """
        try:
            google_appointment_service = GoogleAppointmentService(access_token=request.META.get('HTTP_AUTHORIZATION'))
            response = google_appointment_service.delete_appointment(eventId=pk)
            return Response(response, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(e.args, status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='appointment/sync')
    def sync_appointment(self, request):
        """
        Syncs all the appointments from the Google Calendar 
        """
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

    @action(detail=False, methods=['get'], url_path='appointment/synced/list', permission_classes=[IsAuthenticated],
            authentication_classes=[SessionAuthentication, TokenAuthentication])
    def synced_appointment_list(self, request):
        """
        Returns list of all asynced appointments
        """
        serializer = MeetingListSerializer(Meetings.objects.all(), many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
