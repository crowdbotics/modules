import json

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from os import path
from django.conf import settings
from docusign_esign import ApiClient, EnvelopesApi


def get_private_key(private_key_path):
    private_key_file = path.abspath(private_key_path)
    if path.isfile(private_key_file):
        with open(private_key_file) as private_key_file:
            private_key = private_key_file.read()
    else:
        private_key = private_key_path

    return private_key


def get_consent_url():
    url_scopes = "+".join(settings.SCOPES)
    consent_url = f"https://account-d.docusign.com/oauth/auth?response_type=code&" \
                  f"scope={url_scopes}&client_id={settings.CLIENT_ID}&redirect_uri={settings.REDIRECT_URI}"

    return consent_url


class AuthTokenViewSet(APIView):

    def get(self, request, *args, **kwargs):
        try:
            api_client = ApiClient()
            api_client.set_base_path(settings.OAUTH_HOST_NAME)
            api_client.set_oauth_host_name(settings.OAUTH_HOST_NAME)
            private_key = get_private_key(settings.PRIVATE_KEY_FILE_PATH).encode(
                "ascii").decode("utf-8")
            request_token = api_client.request_jwt_user_token(
                client_id=settings.CLIENT_ID,
                user_id=settings.USER_ID,
                oauth_host_name=settings.OAUTH_HOST_NAME,
                private_key_bytes=private_key,
                expires_in=settings.EXPIRES_IN,
                scopes=settings.SCOPES
            )
            payload = {
                'access_token': request_token.access_token,
                'expires_in': request_token.expires_in,
                'scope': request_token.scope,
                'token_type': request_token.token_type
            }
            return Response(payload, status=status.HTTP_200_OK)
        except Exception as e:
            body = e.body.decode('utf8')
            if "consent_required" in body:
                consent_url = get_consent_url()
                return Response({
                    "errorCode": "CONSENT_REQUIRED",
                    "message": "Consent required",
                    "consent_url": consent_url
                }, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(json.loads(body), status=status.HTTP_400_BAD_REQUEST)


class CreateEnvelopeViewSet(APIView):

    def post(self, request, *args, **kwargs):
        try:
            access_token = request.META.get('HTTP_AUTHORIZATION')
            if access_token:
                api_client = ApiClient()
                api_client.host = settings.HOST
                api_client.set_default_header(header_name="Authorization", header_value=access_token)
                envelopes_api = EnvelopesApi(api_client)
                create_envelope = envelopes_api.create_envelope(
                    account_id=settings.ACCOUNT_ID,
                    envelope_definition=request.data
                )
                payload = {
                    'envelope_id': create_envelope.envelope_id,
                    'uri': create_envelope.uri,
                    'status_date_time': create_envelope.status_date_time,
                    'status': create_envelope.status
                }
                return Response(payload, status=status.HTTP_200_OK)
            else:
                return Response({
                    "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                    "message": "Access token not found"
                }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            body = e.body.decode('utf8')
            return Response(json.loads(body), status=status.HTTP_400_BAD_REQUEST)
            