from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .viewsets import HubspotViewSet

router = DefaultRouter()
router.register("service", HubspotViewSet, basename="hubspot_service")


urlpatterns = [
    path("", include(router.urls)),
    
]
