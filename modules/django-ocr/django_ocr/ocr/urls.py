from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .viewsets import TextractOCRViewSet, TesserOCRViewSet, GoogleOCRViewSet


router = DefaultRouter()
router.register("aws", TextractOCRViewSet, basename="aws_textract_ocr")
router.register("tesser", TesserOCRViewSet, basename="tesser_ocr")
router.register("google", GoogleOCRViewSet, basename="google_ocr")

urlpatterns = [
    path("", include(router.urls)),
]
