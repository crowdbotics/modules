from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .viewsets import TextractOCRViewSet, TesserOCRViewSet, GoogleOCRViewSet


router = DefaultRouter()
router.register("textract-ocr", TextractOCRViewSet, basename="text_ocr")
router.register("tesser-ocr", TesserOCRViewSet, basename="tesser_ocr")
router.register("google-ocr", GoogleOCRViewSet, basename="google_ocr")

urlpatterns = [
    path("", include(router.urls)),
]
