import os

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .services.GoogleAppointmentServices import GoogleAppointmentService


class GoogleAppointmentViewSet(viewsets.GenericViewSet):
    google_appointment_service = GoogleAppointmentService(
        credential_file_path=os.getenv('CREDENTIAL_FILE_PATH', "")
    )

    @action(detail=False, methods=['get'], url_path='appointment/list')
    def appointment_list(self, request):
        try:
            response = self.google_appointment_service.appointment_list()
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e.args, status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'], url_path='appointment/single')
    def single_appointment(self, request, eventId):
        try:
            response = self.google_appointment_service.single_appointment(eventId=eventId)
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e.args, status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='appointment/create')
    def create_appointment(self, request):
        try:
            response = self.google_appointment_service.create_appointment(request.data)
            return Response(response, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(e.args, status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['delete'], url_path='appointment/remove')
    def delete_appointment(self, request, eventId):
        try:
            response = self.google_appointment_service.delete_appointment(eventId=eventId)
            return Response(response, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(e.args, status.HTTP_400_BAD_REQUEST)
