from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import TermAndConditionViewSet


router = DefaultRouter()
# because we are using a custom queryset for our viewset, the basename
# must be specified explicitly here. See: https://www.django-rest-framework.org/api-guide/routers/#Usage
# Your terms will be available at : /modules/terms-and-conditions/
router.register("", TermAndConditionViewSet, basename="terms-and-conditions")

urlpatterns = [
    path("", include(router.urls)),
]
