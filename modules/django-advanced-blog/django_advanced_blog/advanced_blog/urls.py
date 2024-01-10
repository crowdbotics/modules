from django.urls import path, include
from rest_framework import routers

from .api import api_router

urlpatterns = [
    path("api/v1/", api_router.urls),
]