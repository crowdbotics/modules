from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .serializers import FileSerializer, MessageSerializer, ChannelSerializer, InviteUserToChannelSerializer
from .services.Slack import SlackService


class SlackViewSet(viewsets.GenericViewSet):
    """
    SlackView Set  will take "SLACK_BOT_TOKEN" to authenticate slack client and provide following functionality
    - send_message : Send Message to specific Slack Channel
    - upload_message: Send File with message to specific Slack Channel
    - create_channel : Create Slack channel
    - invite_user_to_channel : Invite user to specific Slack channel
    - get_channel_id :  Returns channel id by passing channel name
    - get_channel_history : Returns all the conversations done in specific channel
    - archive_channel : Archive the specific channel
    - get_users : This method returns a list of all users in the workspace.
    """

    allowed_serializers = {
        "send_message": MessageSerializer,
        "upload_file": FileSerializer,
        "create_channel": ChannelSerializer,
        "invite_user_to_channel": InviteUserToChannelSerializer,
    }

    slack_service = SlackService()

    def get_serializer_class(self):
        return self.allowed_serializers.get(self.action, MessageSerializer)

    @action(detail=False, methods=["post"], url_path="send-message")
    def send_message(self, request):
        """
        Send Message to a specific Slack Channel

        :body_params str message: content of your message  \n
        :body_params channel_name str message: channel name where the message is being sent \n
        :return: Message id with details
        """

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.slack_service.send_message(**serializer.data)
        return Response(response.data, status=response.status_code)

    @action(detail=False, methods=["post"], url_path="upload-file")
    def upload_file(self, request):
        """
        Send File with a message content to a specific Slack Channel

        :body_params  file: File to be uploaded    \n
        :body_params  str message: A message content that sent in the channel    \n
        :body_params  str channel_name: Name of the channel where the file will upload  \n
        :return: An uploaded file id and details sent to that respective channel
        """

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.slack_service.upload_file(
            file=request.data.get("file").file,
            message=serializer.data.get("message"),
            channel_names=serializer.data.get("channel_name"),
        )
        return Response(response.data, status=response.status_code)

    @action(detail=False, methods=["post"], url_path="create-channel")
    def create_channel(self, request):
        """
        Create Slack channel with invite multiple users to channel
        User Pass Multiple Emails in CharField using comma separation

        :channel_name str message: Name of channel    \n
        :body_params str emails: Multiple emails can pass using comma separation(,) to invite users to channel    \n
        :return: Returns a created channel id and details
        """

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.slack_service.create_channel_with_users(**serializer.data)
        return Response(response.data, status=response.status_code)

    @action(detail=False, methods=["post"], url_path="invite-user-to-channel")
    def invite_user_to_channel(self, request):
        """
        Invite multiple users to specific Slack channel

        body_params str channel_id: id of channel from invite
        :body_params  str channel_name: name of channel from invite
        :body_params str emails: An emails list separated with ',' to invite users to channel
        :return: An invitation id with details of users that invited to respective channel
        """

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.slack_service.invite_user_to_channel(**serializer.data)
        return Response(response.data, status=response.status_code)

    @action(detail=True, methods=["get"], url_path="get-channel-id")
    def get_channel_id(self, request, pk):
        """
        Returns channel id by passing channel name

        :path_params str channel_name: Name of channel to get its ID \n
        :return: Channel id of respective channel
        """

        response, status_code = self.slack_service.get_channel_id(pk)
        if status_code:
            return Response(data={'channel_id': response}, status=status_code)

    @action(detail=True, methods=["get"], url_path="channel_history")
    def get_channel_history(self, request, pk):
        """
        Returns all the history and conversations done in specific channel

        :path_params str channel_id: ID of the channel to get its history \n
        :return: A channel History with complete details

        """

        next_cursor = request.query_params.get("next_cursor")
        limit = request.query_params.get("limit")
        response = self.slack_service.get_channel_history(pk, limit, next_cursor)
        return Response(data=response.data, status=response.status_code)

    @action(detail=True, methods=["post"], url_path="archive_channel")
    def archive_channel(self, request, pk):
        """
        Archive the specific channel

        :path_params str channel_id: ID of the channel going to be archived  \n
        :return: Return status 'ok' only

        """

        response = self.slack_service.archive_channel(pk)
        return Response(data=response.data, status=response.status_code)

    @action(detail=False, methods=["get"], url_path="get_users")
    def get_users(self, request):
        """
        This method returns a list of all users in the workspace. This includes deleted/deactivated users.
        """
        response = self.slack_service.get_users_list()
        return Response(data=response.data, status=response.status_code)
