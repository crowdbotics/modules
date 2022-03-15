
from django.urls import path, include
from rest_framework import routers

from .viewsets import PhoneNumberViewset, VerifyViewSet


router = routers.DefaultRouter()
router.register('phonenumber', PhoneNumberViewset)
router.register('verify', VerifyViewSet)
urlpatterns = [
    path('', include(router.urls)),
]
