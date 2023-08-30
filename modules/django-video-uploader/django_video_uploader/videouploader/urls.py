from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .viewsets import VideoUploaderViewSet

router = DefaultRouter()
router.register("service", VideoUploaderViewSet, basename="video_uploader_service")

urlpatterns = [
    path("", include(router.urls)),

]
