from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .api.v1.urls import urlpatterns as api_v1_urls

urlpatterns = [
    
]+ api_v1_urls
