from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .viewsets import FileUploadViewSet

router = DefaultRouter()
router.register("uploads", FileUploadViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
