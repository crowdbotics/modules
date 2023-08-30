from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .viewsets import GoogleAppointmentViewSet


router = DefaultRouter()
router.register("service", GoogleAppointmentViewSet, basename="appointment_service")

urlpatterns = [
    path("", include(router.urls)),
]
