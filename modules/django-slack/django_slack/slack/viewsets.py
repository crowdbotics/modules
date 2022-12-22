from django.conf import settings

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from slack_sdk.errors import SlackApiError
from slack_sdk import WebClient

from .serializers import FileSerializer, MessageSerializer


def get_authorized_client():
    """
     SLACK_BOT_TOKEN (BOT Token for Authentication)
    """
    return WebClient(token=settings.SLACK_BOT_TOKEN)


class FileViewSet(APIView):
    """
    API will send message with file/attachment to Slack channel. To send message with attachment the API will require
    the following:
    - file (Attachment)
    - message (Text message)
    - channel_name (Channel Name)
    """
    def post(self, request, *args, **kwargs):
        try:
            serializer = FileSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            client = get_authorized_client()
            response = client.files_upload(file=request.data.get('file').file,
                                           initial_comment=serializer.data.get('message'),
                                           channels=serializer.data.get('channel_name')
                                           )
            return Response(response.data, status=response.status_code)
        except SlackApiError as e:
            return Response(e.response.data, status=status.HTTP_400_BAD_REQUEST)


class MessageViewSet(APIView):
    """
    API will send message without file/attachment to Slack channel. To send message  the API will require
    the following:
    - SLACK_BOT_TOKEN (BOT Token for Authentication)
    - message (Text message)
    - channel_name (Channel Name)
    """
    def post(self, request, *args, **kwargs):
        try:
            serializer = MessageSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            client = get_authorized_client()
            response = client.chat_postMessage(text=serializer.data.get('message'),
                                               channel=serializer.data.get('channel_name')
                                               )
            return Response(data=response.data, status=response.status_code)
        except SlackApiError as e:
            return Response(e.response.data, status=status.HTTP_400_BAD_REQUEST)
