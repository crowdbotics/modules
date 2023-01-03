from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .viewsets import AWSViewSet


router = DefaultRouter()
router.register("service", AWSViewSet, basename="s3_service")

urlpatterns = [
    path("", include(router.urls)),
]
