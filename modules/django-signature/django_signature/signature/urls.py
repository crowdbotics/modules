from django.urls import path, include
from rest_framework import routers

from .viewsets import SignatureViewSet, SignatureUploadView


router = routers.DefaultRouter()
router.register(r"signature", SignatureViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("upload_signature/", SignatureUploadView.as_view()),
]
