from django.urls import path, include
from rest_framework.routers import DefaultRouter


from .viewsets import UserFCMDeviceAdd, NotificationViewSet, UserNotificationViewSet

router = DefaultRouter()
router.register("notification", NotificationViewSet, basename="notification")
router.register(
    "user-notification", UserNotificationViewSet, basename="user_notification"
)

urlpatterns = [
    path("", include(router.urls)),
    path(
        "user_fcm_device_add/", UserFCMDeviceAdd.as_view(), name="user_fcm_device_add"
    ),
]
