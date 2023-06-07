
from django.urls import path, include
from rest_framework import routers

from .viewsets import QRCodeView

router = routers.DefaultRouter()
urlpatterns = [
    path('', include(router.urls)),
    path('qrcode/', QRCodeView.as_view()),
]