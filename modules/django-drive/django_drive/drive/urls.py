from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .viewsets import DriveViewSet


router = DefaultRouter()
router.register("service", DriveViewSet, basename="drive_service")

urlpatterns = [
    path("", include(router.urls)),
]
