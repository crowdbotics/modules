from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .viewsets import WordpressViewSet

router = DefaultRouter()
router.register("service", WordpressViewSet, basename="wordpress_service")

urlpatterns = [
    path("", include(router.urls)),
]
