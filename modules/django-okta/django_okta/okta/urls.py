from django.urls import path, include
from rest_framework import routers

from .viewsets import OktaViewSet

router = routers.DefaultRouter()
router.register("", OktaViewSet, basename="okta")
urlpatterns = [
    path("", include(router.urls)),
]
