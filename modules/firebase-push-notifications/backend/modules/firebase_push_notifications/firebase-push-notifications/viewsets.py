import os

import firebase_admin
from fcm_django.models import FCMDevice
from firebase_admin import credentials
from rest_framework import authentication, permissions
from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from .models import Notification, UserNotification
from .serializers import FCMDeviceSerializer, FCMNotificationSerializer, UserNotificationSerializer

cred = credentials.Certificate(os.getenv('FCM_SERVICE_FILE_PATH', ''))
firebase_admin.initialize_app(cred)


class UserFCMDeviceAdd(CreateAPIView):
    """
    UserFCMDeviceAdd class is to handle the registration of user device information both iOS and Android while
    ensuring that duplicate registrations are avoided and the validity of the registration ID is verified.
    body_params: "name", "user", "device_id", "type", "registration_token"
    """
    authentication_classes = [authentication.TokenAuthentication, authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    queryset = FCMDevice.objects.all()
    serializer_class = FCMDeviceSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, active=True)

    def create(self, request, *args, **kwargs):
        try:
            registration_id = request.data.get('registration_id')
            user_device = self.queryset.filter(user=request.user, registration_id=registration_id)
            if user_device:
                return Response({
                    'success': True,
                    'message': 'Device Already Exist'
                }, status=status.HTTP_200_OK)
            self.queryset.filter(registration_id=registration_id).delete()
            return super(UserFCMDeviceAdd, self).create(request, *args, **kwargs)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


class NotificationViewSet(ModelViewSet):
    """
    The NotificationViewSet class serves the purpose of sending notifications and retrieving
    details about sent notifications.
    body_params: "sender", "receiver", "title", "message", "image".
    """
    authentication_classes = [authentication.TokenAuthentication, authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = FCMNotificationSerializer
    queryset = Notification.objects.all()

    def get_queryset(self):
        queryset = self.queryset.order_by("-created")
        queryset = queryset.filter(receiver_id=self.request.user)
        return queryset


class UserNotificationViewSet(ModelViewSet):
    """
    The UserNotificationViewSet class serves the purpose of sending user's notifications and retrieving
    details about sent notifications.
    body_params: "sender", "receiver", "title", "message", "image".
    """
    authentication_classes = [authentication.TokenAuthentication, authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserNotificationSerializer
    queryset = UserNotification.objects.all()

    def create(self, request, *args, **kwargs):
        notification_id = request.data.get("notification")
        all_ready_notification = UserNotification.objects.filter(notification=notification_id)

        try:
            if all_ready_notification:
                return Response("all ready seen ", status=status.HTTP_200_OK)
            notification = Notification.objects.filter(id=notification_id).first()
            UserNotification.objects.create(user=self.request.user, notification=notification)
            return Response("Created Successfully", status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)
