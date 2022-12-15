from rest_auth.registration.serializers import SocialLoginSerializer, SocialConnectMixin
from rest_framework import serializers
from django.http import HttpRequest
from django.contrib.auth import get_user_model
from allauth.socialaccount.providers.oauth2.client import OAuth2Error
from allauth.socialaccount.helpers import complete_social_login
from allauth.account import app_settings as allauth_settings


class CustomAppleSocialLoginSerializer(SocialLoginSerializer):
    access_token = serializers.CharField(required=False, allow_blank=True)
    code = serializers.CharField(required=False, allow_blank=True)
    id_token = serializers.CharField(required=False, allow_blank=True)

    def _get_request(self):
        request = self.context.get("request")
        if not isinstance(request, HttpRequest):
            request = request._request
        return request

    def get_social_login(self, adapter, app, token, response):
        """
        :param adapter: allauth.socialaccount Adapter subclass.
            Usually OAuthAdapter or Auth2Adapter
        :param app: `allauth.socialaccount.SocialApp` instance
        :param token: `allauth.socialaccount.SocialToken` instance
        :param response: Provider's response for OAuth1. Not used in the
        :returns: A populated instance of the
            `allauth.socialaccount.SocialLoginView` instance
        """
        request = self._get_request()
        social_login = adapter.complete_login(request, app, token, response=response)
        social_login.token = token
        return social_login

    def validate(self, attrs):
        view = self.context.get("view")
        request = self._get_request()

        if not view:
            raise serializers.ValidationError(
                "View is not defined, pass it as a context variable"
            )

        adapter_class = getattr(view, "adapter_class", None)
        if not adapter_class:
            raise serializers.ValidationError("Define adapter_class in view")

        adapter = adapter_class(request)
        app = adapter.get_provider().get_app(request)

        # More info on code vs access_token
        # http://stackoverflow.com/questions/8666316/facebook-oauth-2-0-code-and-token

        # Case 1: We received the access_token
        if attrs.get("access_token"):
            access_token = attrs.get("access_token")
            token = {"access_token": access_token}

        # Case 2: We received the authorization code
        elif attrs.get("code"):
            self.callback_url = getattr(view, "callback_url", None)
            self.client_class = getattr(view, "client_class", None)

            if not self.callback_url:
                raise serializers.ValidationError("Define callback_url in view")
            if not self.client_class:
                raise serializers.ValidationError("Define client_class in view")

            code = attrs.get("code")

            provider = adapter.get_provider()
            scope = provider.get_scope(request)
            client = self.client_class(
                request,
                app.client_id,
                app.secret,
                adapter.access_token_method,
                adapter.access_token_url,
                self.callback_url,
                scope,
                key=app.key,
                cert=app.cert,
            )
            token = client.get_access_token(code)
            access_token = token["access_token"]

        else:
            raise serializers.ValidationError(
                "Incorrect input. access_token or code is required."
            )

        # Custom changes introduced to handle apple login on allauth
        try:
            social_token = adapter.parse_token(
                {
                    "access_token": access_token,
                    "id_token": attrs.get("id_token"),  # For apple login
                }
            )
            social_token.app = app
        except OAuth2Error as err:
            raise serializers.ValidationError(str(err)) from err

        try:
            login = self.get_social_login(adapter, app, social_token, access_token)
            complete_social_login(request, login)
        except HTTPError:
            raise serializers.ValidationError("Incorrect value")

        if not login.is_existing:
            # We have an account already signed up in a different flow
            # with the same email address: raise an exception, for security reasons.
            # If you decide to follow up with this flow, checkout allauth implementation:
            # add login.connect(request, email_address.user)
            # https://github.com/pennersr/django-allauth/issues/1149
            #
            # if allauth_settings.UNIQUE_EMAIL:
            #     # Do we have an account already with this email address?
            #     if get_user_model().objects.filter(email=login.user.email).exists():
            #         raise serializers.ValidationError(
            #             'E-mail already registered using different signup method.')

            login.lookup()
            login.save(request, connect=True)

        attrs["user"] = login.account.user
        return attrs


class CustomAppleConnectSerializer(
    SocialConnectMixin, CustomAppleSocialLoginSerializer
):
    pass
