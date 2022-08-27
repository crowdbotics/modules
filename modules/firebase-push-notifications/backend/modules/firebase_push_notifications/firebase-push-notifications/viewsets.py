# from fcm_django.models import FCMDevice
from django.db.models import Q, F, Avg
from rest_framework.generics import *
from rest_framework import authentication, permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from .serializers import *


class UserFCMDeviceAdd(CreateAPIView):
    authentication_classes = [authentication.TokenAuthentication, authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    queryset = FCMDevice.objects.all()
    serializer_class = FCMDeviceSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, active=True)

    def create(self, request, *args, **kwargs):
        registration_id = request.data.get('registration_id')
        user_device = FCMDevice.objects.filter(user=request.user, registration_id=registration_id)
        if user_device:
            return Response({
                'success': True,
                'message': 'Device Already Exist'
            }, status=200)
        else:
            return super(UserFCMDeviceAdd, self).create(request, *args, **kwargs)


class NotificationViewSet(ModelViewSet):
    authentication_classes = [authentication.TokenAuthentication, authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = NotificationSerializer
    queryset = Notification.objects.all()

    def get_queryset(self):
        queryset = self.queryset.order_by("-created")
        queryset = queryset.filter(Q(receiver_id=self.request.user) | Q(receiver_id=None))
        return queryset


class UserNotificationViewSet(ModelViewSet):
    authentication_classes = [authentication.TokenAuthentication, authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserNotificationSerializer
    queryset = UserNotification.objects.all()

    def create(self, request, *args, **kwargs):
        notification_id = request.data.get("notification")
        all_ready_notification = UserNotification.objects.filter(notification=notification_id)
        if all_ready_notification:
            return Response("all ready seen ")
        else:
            notification = Notification.objects.filter(id=notification_id).first()
            UserNotification.objects.create(user=self.request.user, notification=notification)
            return Response("ok")
