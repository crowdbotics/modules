
from django.urls import path, include
from rest_framework import routers

from .viewsets import *


router = routers.DefaultRouter()
router.register('twofactorauth', PhoneNumberViewset)
router.register('verify', VerifyViewSet)
urlpatterns = [
    path('', include(router.urls)),
    path('2fa', Google_AUTH.as_view()),
]

