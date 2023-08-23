from django.urls import path, include
from rest_framework.routers import DefaultRouter
from push_notifications.api.rest_framework import APNSDeviceAuthorizedViewSet, GCMDeviceAuthorizedViewSet
from rest_framework.routers import DefaultRouter
from .viewsets import (
    UserFCMDeviceAdd,
    NotificationViewSet,
    UserNotificationViewSet
)


router = DefaultRouter()
router.register("notification", NotificationViewSet, basename="notification")
router.register("user-notification", UserNotificationViewSet, basename="user_notification")
router.register(r'device/apns', APNSDeviceAuthorizedViewSet)
router.register(r'device/fcm', GCMDeviceAuthorizedViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path('user_fcm_device_add/', UserFCMDeviceAdd.as_view(), name='user_fcm_device_add'),
]
