from django.conf import settings

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .services.SlackService import SlackService

from .serializers import FileSerializer, MessageSerializer, ChannelSerializer, InviteUserToChannelSerializer

slack_service = SlackService(slack_token=settings.SLACK_BOT_TOKEN)


class SlackViewSet(viewsets.GenericViewSet):
    allowed_serializers = {
        "send_message": MessageSerializer,
        "upload_file": FileSerializer,
        "create_channel": ChannelSerializer,
        "invite_user_to_channel": InviteUserToChannelSerializer,
    }

    def get_serializer_class(self):
        return self.allowed_serializers.get(self.action, MessageSerializer)

    @action(detail=False, methods=['post'], url_path='send-message')
    def send_message(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = slack_service.send_message(**serializer.data)
        return Response(response.data, status=response.status_code)

    @action(detail=False, methods=['post'], url_path='upload-file')
    def upload_file(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = slack_service.upload_file(file=request.data.get('file').file, message=serializer.data.get('message'),
                                             channel_names=serializer.data.get('channel_name'))
        return Response(response.data, status=response.status_code)

    @action(detail=False, methods=['post'], url_path='create-channel')
    def create_channel(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = slack_service.create_channel(**serializer.data)
        return Response(response.data, status=response.status_code)

    @action(detail=False, methods=['post'], url_path='invite-user-to-channel')
    def invite_user_to_channel(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = slack_service.invite_user_to_channel(**serializer.data)
        return Response(response.data, status=response.status_code)

    @action(detail=True, methods=['get'], url_path='channel-id')
    def get_channel_id(self, request, pk):
        response, status_code = slack_service.get_channel_id(pk)
        if status_code:
            return Response(data={'channel_id': response}, status=status_code)
        else:
            return Response(data=response.data, status=response.status_code)

    @action(detail=True, methods=['get'], url_path='channel_history')
    def get_channel_history(self, request, pk):
        next_cursor = request.query_params.get('next_cursor')
        limit = request.query_params.get('limit')
        response = slack_service.get_channel_history(pk, limit, next_cursor)
        return Response(data=response.data, status=response.status_code)

    @action(detail=True, methods=['post'], url_path='archive_channel')
    def archive_channel(self, request, pk):
        response = slack_service.archive_channel(pk)
        return Response(data=response.data, status=response.status_code)
