from django.conf import settings

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from slack_sdk.errors import SlackApiError
from slack_sdk import WebClient


def get_authorized_client(token):
    return WebClient(token=token)


class FileViewSet(APIView):
    """
    API will send message with file/attachment to Slack channel. To send message with attachment the API will require
    the following:
    - SLACK_BOT_TOKEN (BOT Token for Authentication)
    - file (Attachment)
    - message (Text message)
    - channel_name (Channel Name)
    """
    def post(self, request, *args, **kwargs):
        try:
            file = request.FILES.get('file')
            comment = request.data.get('message')
            channel = request.data.get('channel_name')

            client = get_authorized_client(settings.SLACK_BOT_TOKEN)
            response = client.files_upload(file=file.file, initial_comment=comment,
                                           channels=channel)
            return Response(data=response.data, status=response.status_code)
        except SlackApiError as e:
            return Response(e.args, status=status.HTTP_400_BAD_REQUEST)


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
            message = request.data.get('message')
            channel = request.data.get('channel_name')

            client = get_authorized_client(settings.SLACK_BOT_TOKEN)
            response = client.chat_postMessage(text=message, channel=channel)
            return Response(data=response.data, status=response.status_code)
        except SlackApiError as e:
            return Response(e.args, status=status.HTTP_400_BAD_REQUEST)
