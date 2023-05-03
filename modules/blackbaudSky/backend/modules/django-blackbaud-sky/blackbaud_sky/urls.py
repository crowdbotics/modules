from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .viewsets import BlackbaudViewSet

router = DefaultRouter()
router.register("service", BlackbaudViewSet, basename="blackbaud_service")


urlpatterns = [
    path("", include(router.urls)),
    
]