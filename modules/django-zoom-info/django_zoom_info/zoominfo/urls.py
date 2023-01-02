from django.urls import path
from .viewsets import AuthTokenViewSet, SearchViewSet, EnrichViewSet, BulkViewSet

urlpatterns = [
    path('auth/token/', AuthTokenViewSet.as_view()),
    path('data/search/', SearchViewSet.as_view()),
    path('data/enrich/', EnrichViewSet.as_view()),
    path('data/bulk/', BulkViewSet.as_view()),

]
