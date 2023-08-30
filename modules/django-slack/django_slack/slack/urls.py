from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .viewsets import SlackViewSet


router = DefaultRouter()
router.register("service", SlackViewSet, basename="slack_service")

urlpatterns = [
    path("", include(router.urls)),
]
