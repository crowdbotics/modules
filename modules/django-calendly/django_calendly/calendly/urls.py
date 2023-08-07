from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .viewsets import CalendlyViewSet

router = DefaultRouter()
router.register("", CalendlyViewSet, basename="calendly_service")

urlpatterns = [
    path("", include(router.urls)),

]
