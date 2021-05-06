from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import TermAndConditionViewSet


router = DefaultRouter()
router.register("termsandconditions", TermAndConditionViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
