
from django.urls import path, include
from rest_framework import routers

from .viewsets import AuthTokenViewSet, CreateEnvelopeViewSet


router = routers.DefaultRouter()
urlpatterns = [
    path('', include(router.urls)),
    path('auth/token/', AuthTokenViewSet.as_view()),
    path('create/envelope/', CreateEnvelopeViewSet.as_view()),
]
