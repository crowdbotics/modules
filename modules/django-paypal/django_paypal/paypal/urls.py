from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .viewsets import PaypalViewSet

router = DefaultRouter()
router.register("service", PaypalViewSet, basename="paypal_service")

urlpatterns = [
    path("", include(router.urls)),

]
