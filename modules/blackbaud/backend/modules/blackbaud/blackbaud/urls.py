from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .viewsets import BlackbaudViewSet

router = DefaultRouter()
router.register("", BlackbaudViewSet, basename="blackbaud")


urlpatterns = [
    path("", include(router.urls)),
    
]