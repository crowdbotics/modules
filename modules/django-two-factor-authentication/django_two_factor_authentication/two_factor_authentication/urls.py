from django.urls import path, include
from rest_framework import routers

from .viewsets import TwoFactorAuthViewSet, OTPVerificationViewSet, GoogleAuthenticatorViewSet, \
    EnableTwoFactorAuthViewSet

router = routers.DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('send/otp', TwoFactorAuthViewSet.as_view()),
    path('google/authenticator/qr', GoogleAuthenticatorViewSet.as_view()),
    path('verify/otp', OTPVerificationViewSet.as_view()),
    path('enable/2fa', EnableTwoFactorAuthViewSet.as_view()),
    path('verify/otp/<str:enable>', OTPVerificationViewSet.as_view()),
]
