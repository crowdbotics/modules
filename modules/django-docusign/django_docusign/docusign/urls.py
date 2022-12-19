
from django.urls import path, include
from rest_framework import routers
from .viewsets import AuthTokenViewSet, CreateEnvelopeViewSet, DownloadEnvelopeDocumentViewSet, RetrieveEnvelopeViewSet, RetrieveAllEnvelopeViewSet


router = routers.DefaultRouter()
urlpatterns = [
    path('', include(router.urls)),
    path('auth/token/', AuthTokenViewSet.as_view()),
    path('create/envelope/', CreateEnvelopeViewSet.as_view()),
    path('retrieve/envelope/', RetrieveEnvelopeViewSet.as_view()),
    path('download/envelope/', DownloadEnvelopeDocumentViewSet.as_view()),
    path('retrive-all/envelope/', RetrieveAllEnvelopeViewSet.as_view()),

]
