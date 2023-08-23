from django.urls import path, include
from rest_framework import routers

from .viewsets import (
    AppointmentViewSet,
    MeetingInformationViewSet,
    AppointmentSessionViewSet,
)

router = routers.DefaultRouter()
router.register(
    "meetings-information", MeetingInformationViewSet, basename="meetings-information"
)
router.register("appointment", AppointmentViewSet, basename="appointment")
router.register(
    "appointment_session", AppointmentSessionViewSet, basename="appointment_session"
)

urlpatterns = [
    path("", include(router.urls)),
]
