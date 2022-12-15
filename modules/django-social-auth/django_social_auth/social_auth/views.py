from rest_framework.permissions import AllowAny
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from allauth.socialaccount.providers.apple.views import AppleOAuth2Adapter
from allauth.socialaccount.providers.apple.client import AppleOAuth2Client
from rest_auth.registration.views import SocialLoginView, SocialConnectView
from .serializers import CustomAppleSocialLoginSerializer, CustomAppleConnectSerializer
from django.contrib.sites.shortcuts import get_current_site

try:
    APP_DOMAIN = f"https://{get_current_site(None)}"
except Exception:
    APP_DOMAIN = ""


class FacebookLogin(SocialLoginView):
    permission_classes = (AllowAny,)
    adapter_class = FacebookOAuth2Adapter


class GoogleLogin(SocialLoginView):
    permission_classes = (AllowAny,)
    adapter_class = GoogleOAuth2Adapter
    client_class = OAuth2Client


class AppleLogin(SocialLoginView):
    adapter_class = AppleOAuth2Adapter
    client_class = AppleOAuth2Client
    serializer_class = CustomAppleSocialLoginSerializer
    callback_url = f"https://{APP_DOMAIN}/accounts/apple/login/callback/"


class FacebookConnect(SocialConnectView):
    permission_classes = (AllowAny,)
    adapter_class = FacebookOAuth2Adapter


class GoogleConnect(SocialConnectView):
    permission_classes = (AllowAny,)
    adapter_class = GoogleOAuth2Adapter
    client_class = OAuth2Client


class AppleConnect(SocialConnectView):
    adapter_class = AppleOAuth2Adapter
    client_class = AppleOAuth2Client
    serializer_class = CustomAppleConnectSerializer
