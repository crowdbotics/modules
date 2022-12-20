from django.urls import path
from .viewsets import AuthTokenViewSet, CreateEnvelopeViewSet, DownloadEnvelopeDocumentViewSet, RetrieveEnvelopeViewSet, RetrieveAllEnvelopeViewSet


urlpatterns = [
    path('auth/token/', AuthTokenViewSet.as_view()),
    path('envelope/create/', CreateEnvelopeViewSet.as_view()),
    path('envelope/retrieve/', RetrieveEnvelopeViewSet.as_view()),
    path('envelope/download/', DownloadEnvelopeDocumentViewSet.as_view()),
    path('envelope/retrieve-all/', RetrieveAllEnvelopeViewSet.as_view()),
]
