from allauth.socialaccount.providers.apple.client import AppleOAuth2Client
from allauth.socialaccount.providers.apple.views import AppleOAuth2Adapter
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView, SocialConnectView
from django.contrib.sites.shortcuts import get_current_site
from rest_framework.permissions import AllowAny

from .serializers import CustomAppleSocialLoginSerializer, CustomAppleConnectSerializer

try:
    APP_DOMAIN = f"https://{get_current_site(None)}"
except Exception:
    APP_DOMAIN = ""


class FacebookLogin(SocialLoginView):
    """
    The FacebookLogin class handles user logins and returns a key for the login process.
    body_params: access_token or code is required
    """
    permission_classes = (AllowAny,)
    adapter_class = FacebookOAuth2Adapter


class GoogleLogin(SocialLoginView):
    """
        The GoogleLogin class handles user logins and returns a key for the login process.
        body_params: access_token or code is required
    """
    permission_classes = (AllowAny,)
    adapter_class = GoogleOAuth2Adapter
    client_class = OAuth2Client


class AppleLogin(SocialLoginView):
    """
       The AppleLogin class handles user logins and returns a key for the login process.
       body_params: access_token and id_token is required
       """
    adapter_class = AppleOAuth2Adapter
    client_class = AppleOAuth2Client
    serializer_class = CustomAppleSocialLoginSerializer
    callback_url = f"{APP_DOMAIN}/accounts/apple/login/callback/"


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
