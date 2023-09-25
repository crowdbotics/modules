import json
from os import path

from django.conf import settings

from docusign_esign import ApiClient, EnvelopesApi, FoldersApi

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response


def get_private_key(private_key_path):
    """
     Return private key
     :param str private_key_path: Complete path of private key (required)
    """
    private_key_file = path.abspath(private_key_path)
    if path.isfile(private_key_file):
        with open(private_key_file) as private_key_file:
            private_key = private_key_file.read()
    else:
        private_key = private_key_path

    return private_key


def get_envelope_list(folder_data):
    """
    Gets the data from multiple custom classes made by docusign and return dictionary
    :param dict folder_data: Data that is returned by docusign API (required)
    """
    envelopes_list = []
    for row in folder_data.folder_items:
        row_data = {k: getattr(row, k) for k in row.__dict__}
        del row_data['_configuration']
        envelopes_list.append(row_data)
    return envelopes_list


def get_consent_url():
    """
    Return the consent url that will use further to get access token
    """
    url_scopes = "+".join(settings.SCOPES)
    consent_url = f"https://account-d.docusign.com/oauth/auth?response_type=code&" \
                  f"scope={url_scopes}&client_id={settings.CLIENT_ID}&redirect_uri={settings.REDIRECT_URI}"

    return consent_url


def get_authorize_client(access_token):
    """
    Return authorized api client using access token
    """
    api_client = ApiClient()
    api_client.host = settings.ACCOUNT_BASE_URL
    api_client.set_default_header(header_name="Authorization", header_value=access_token)
    return api_client


class AuthTokenViewSet(APIView):
    """
    API Return a payload that contain access token, token Expiry time, token scope and token type, to return the payload
    the required data are as following:
     - client id
     - user id
     - OAuth host name
     - token expire time
     - token scope.
    """

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
    """
    API will create envelope with attachment on docusign server and sent it to the recipient, to create the envelope API will
    require Access Token from API header to authenticate and envelope definition from API body that contain
     - documentBase64
     - documentId
     - fileExtension
     - name
     - emailSubject
     - recipients
     - signer email
     - signer name
     - recipientId
     - status
     :authorization : access_token(required)
     :return : Created envelope attachment with details
    """

    def post(self, request, *args, **kwargs):
        try:
            access_token = request.META.get('HTTP_AUTHORIZATION')
            if access_token:
                envelopes_api = EnvelopesApi(api_client=get_authorize_client(access_token))
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


class RetrieveEnvelopeViewSet(APIView):
    """
    API will return envelope based on envelope id. To get envelope API will require Access Token from API header and
    envelope id from API body.
    :authorization : access_token(required)
    :query_params : envelope_id(required)
    :return : retrieve specific envelope details
    """

    def get(self, request, *args, **kwargs):
        try:
            envelope_id = request.query_params.get('envelope_id')
            access_token = request.META.get('HTTP_AUTHORIZATION')
            if access_token:
                envelopes_api = EnvelopesApi(api_client=get_authorize_client(access_token))
                envelope_data = envelopes_api.get_envelope(
                    account_id=settings.ACCOUNT_ID,
                    envelope_id=envelope_id
                )
                payload = {
                    'envelope_id': envelope_data.envelope_id,
                    'attachments_uri': envelope_data.attachments_uri,
                    'created_date_time': envelope_data.created_date_time,
                    'delivered_date_time': envelope_data.delivered_date_time,
                    'declined_date_time': envelope_data.declined_date_time,
                    'deleted_date_time': envelope_data.deleted_date_time,
                    'completed_date_time': envelope_data.completed_date_time,
                    'initial_sent_date_time': envelope_data.initial_sent_date_time,
                    'last_modified_date_time': envelope_data.last_modified_date_time,
                    'notification_uri': envelope_data.notification_uri,
                    'recipients_uri': envelope_data.recipients_uri,
                    'sender': {
                        'account_id': envelope_data.sender.account_id,
                        'email': envelope_data.sender.email,
                        'user_name': envelope_data.sender.user_name,
                    },
                    'sent_date_time': envelope_data.sent_date_time,
                    'status': envelope_data.status,
                    'status_changed_date_time': envelope_data.status_changed_date_time,
                    'templates_uri': envelope_data.templates_uri
                }
                return Response(data=payload, status=status.HTTP_200_OK)
            else:
                return Response({
                    "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                    "message": "Access token not found"
                }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            body = e.body.decode('utf8')
            return Response(json.loads(body), status=status.HTTP_400_BAD_REQUEST)


class DownloadEnvelopeDocumentViewSet(APIView):
    """
    API will return the specific document from envelope. To get document from envelope API will require Access Token
    from API header to authenticate, envelope id and document id from API body.
    :authorization : access_token(required)
    :query_params : envelope_id(required), document_id(required)
    :return : downloaded specific envelope with details
    """
    def get(self, request, *args, **kwargs):
        try:
            envelope_id = request.query_params.get("envelope_id")
            document_id = request.query_params.get("document_id")
            access_token = request.META.get('HTTP_AUTHORIZATION')
            if access_token:
                envelopes_api = EnvelopesApi(api_client=get_authorize_client(access_token))
                document = envelopes_api.get_document(
                    account_id=settings.ACCOUNT_ID,
                    document_id=document_id,
                    envelope_id=envelope_id,
                )
                return Response(data=document, status=status.HTTP_200_OK)
            else:
                return Response({
                    "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                    "message": "Access token not found"
                }, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            body = e.body.decode('utf8')
            return Response(json.loads(body), status=status.HTTP_400_BAD_REQUEST)


class RetrieveAllEnvelopeViewSet(APIView):
    """
    API will retrieve all the envelopes from the folder, to get envelope from folder API will require Access Token
    from API header to authenticate, folder value from API body. Folder value Specifies the envelope group that is
    searched by the request. These are logical groupings, not actual folder names. Valid values are: drafts,
    awaiting_my_signature, completed, out_for_signature.
    :authorization : access_token(required)
    :query_params : folder_value(required)
    :return : Retrieve all envelope list
    """
    def get(self, request, *args, **kwargs):
        try:
            access_token = request.META.get('HTTP_AUTHORIZATION')
            folder_value = request.query_params.get('folder_value')
            if access_token:
                folders_api = FoldersApi(api_client=get_authorize_client(access_token))
                folder_data = folders_api.search(
                    account_id=settings.ACCOUNT_ID,
                    search_folder_id=folder_value
                )
                envelopes_list = get_envelope_list(folder_data)
                payload = {'envelope_list': envelopes_list}
                return Response(data=payload, status=status.HTTP_200_OK)
            else:
                return Response({
                    "errorCode": "ACCESS_TOKEN_NOT_FOUND",
                    "message": "Access token not found"
                }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            body = e.body.decode('utf8')
            return Response(json.loads(body), status=status.HTTP_400_BAD_REQUEST)
