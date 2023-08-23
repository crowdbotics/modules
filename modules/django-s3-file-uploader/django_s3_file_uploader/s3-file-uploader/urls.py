from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .viewsets import S3ViewSet


router = DefaultRouter()
router.register("service", S3ViewSet, basename="s3_service")

urlpatterns = [
    path("", include(router.urls)),
]
