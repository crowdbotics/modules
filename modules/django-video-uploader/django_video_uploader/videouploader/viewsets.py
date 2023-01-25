import os


from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .serializers import ChannelSerializer, GroupSerializer, GroupIdSerializer, ShowcaseSerializer, \
    UpdateShowcaseSerializer, FolderSerializer
from .services.VideoUPloaderService import VideoUploaderService


class VideoUploaderViewSet(viewsets.GenericViewSet):
    video_uploader_service = VideoUploaderService(
        base_url=os.getenv('VIDEO_UPLOADER_BASE_URL', "https://api.vimeo.com"),
        access_token=os.getenv('VIDEO_UPLOADER_ACCESS_TOKEN', ""),
    )

    allowed_serializer = {
        "create_channel": ChannelSerializer,
        "update_channel": ChannelSerializer,
        "create_group": GroupSerializer,
        "add_user_to_group": GroupIdSerializer,
        "add_video_to_group": GroupIdSerializer,
        "create_showcase": ShowcaseSerializer,
        "update_showcase": UpdateShowcaseSerializer,
        "create_folder": FolderSerializer,
        "update_folder": FolderSerializer,
    }

    def get_serializer_class(self):
        return self.allowed_serializer.get(self.action)

    @action(detail=False, methods=['post'], url_path='channel/create')
    def create_channel(self, request):
        """
        To create a channel'
        :return: Returns newly created channel.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.video_uploader_service.create_channel(serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['delete'], url_path='channel/delete')
    def delete_channel(self, request, pk):
        """
        To delete an existing channel'
        :return: Returns no content.
        """
        response = self.video_uploader_service.delete_channel(channel_id=pk)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['patch'], url_path='channel/update')
    def update_channel(self, request, pk):
        """
        To update/edit an existing channel
        :return: Returns updated channel.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.video_uploader_service.update_channel(channel_id=pk, payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='channel/list')
    def channel_list(self, request):
        """
        To get all the channels'
        :return: Returns all channels list.
        """
        response = self.video_uploader_service.channel_list()
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['get'], url_path='channel/specific')
    def specific_channel(self, request, pk):
        """
        To get a specific channel
        :return: Returns a specific channel.
        """
        response = self.video_uploader_service.specific_channel(channel_id=pk)
        return Response(data=response.get("data"), status=response.get("status_code"))


    @action(detail=False, methods=['post'], url_path='group/create')
    def create_group(self, request):
        """
        To create a group
        :return: Returns newly created group.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.video_uploader_service.create_group(serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['delete'], url_path='group/delete')
    def delete_group(self, request, pk):
        """
        To delete an existing group'
        :return: Returns no content.
        """
        response = self.video_uploader_service.delete_group(group_id=pk)
        return Response(data=response.get("data"), status=response.get("status_code"))


    @action(detail=False, methods=['get'], url_path='group/list')
    def group_list(self, request):
        """
        To get all the groups'
        :return: Returns all groups list.
        """
        response = self.video_uploader_service.groups_list()
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['get'], url_path='group/specific')
    def specific_group(self, request, pk):
        """
        To get a specific group
        :return: Returns a specific group.
        """
        response = self.video_uploader_service.specific_group(group_id=pk)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['put'], url_path='group/add-user/(?P<user_id>[A-Za-z0-9]*)')
    def add_user_to_group(self, request, pk, user_id):
        """
        To add a user to a group
        :return: Returns a specific group.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.video_uploader_service.add_user_to_group(user_id=user_id, group_id=pk, payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))


    @action(detail=True, methods=['put'], url_path='group/add-video/(?P<video_id>[A-Za-z0-9]*)')
    def add_video_to_group(self, request, pk, video_id):
        """
        To add a video to a group
        :return: Returns a specific group.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.video_uploader_service.add_video_to_group(video_id=video_id, group_id=pk, payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['post'], url_path='user/showcase/create')
    def create_showcase(self, request, pk):
        """
        To create a channel'
        :return: Returns newly created channel.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.video_uploader_service.create_showcase(user_id=pk, payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['delete'], url_path='user/showcase/delete/(?P<album_id>[A-Za-z0-9]*)')
    def delete_showcase(self, request, pk, album_id):
        """
        To delete an existing channel'
        :return: Returns no content.
        """
        response = self.video_uploader_service.delete_showcase(user_id=pk, album_id=album_id)
        return Response(data=response.get("data"), status=response.get("status_code"))


    @action(detail=True, methods=['patch'], url_path='user/showcase/update/(?P<album_id>[A-Za-z0-9]*)')
    def update_showcase(self, request, pk, album_id):
        """
        To update/edit an existing channel
        :return: Returns updated channel.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.video_uploader_service.update_showcase(user_id=pk, album_id=album_id, payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))


    @action(detail=True, methods=['get'], url_path='user/showcase/list')
    def showcase_list(self, request, pk):
        """
        To get all the groups'
        :return: Returns all groups list.
        """
        response = self.video_uploader_service.showcase_list(user_id=pk)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['get'], url_path='user/showcase/specific/(?P<album_id>[A-Za-z0-9]*)')
    def specific_showcase(self, request, pk, album_id):
        """
        To get all the groups'
        :return: Returns all groups list.
        """
        response = self.video_uploader_service.specific_showcase(user_id=pk, album_id=album_id)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['put'], url_path='user/showcase/album/(?P<album_id>[A-Za-z0-9]*)/add-video/(?P<video_id>[A-Za-z0-9]*)')
    def add_video_to_showcase(self, request, pk, album_id,  video_id):
        """
        To add a video to a group
        :return: Returns a specific group.
        """
        response = self.video_uploader_service.add_video_to_showcase(video_id=video_id, user_id=pk, album_id=album_id)
        return Response(data=response.get("data"), status=response.get("status_code"))



    @action(detail=True, methods=['post'], url_path='user/folder/create')
    def create_folder(self, request, pk):
        """
        To create a channel'
        :return: Returns newly created channel.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.video_uploader_service.create_folder(user_id=pk, payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['delete'], url_path='user/folder/delete/(?P<folder_id>[A-Za-z0-9]*)')
    def delete_folder(self, request, pk, folder_id):
        """
        To delete an existing channel'
        :return: Returns no content.
        """
        response = self.video_uploader_service.delete_folder(user_id=pk, project_id=folder_id)
        return Response(data=response.get("data"), status=response.get("status_code"))


    @action(detail=True, methods=['patch'], url_path='user/folder/update/(?P<folder_id>[A-Za-z0-9]*)')
    def update_folder(self, request, pk, folder_id):
        """
        To update/edit an existing channel
        :return: Returns updated channel.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.video_uploader_service.update_folder(user_id=pk, project_id=folder_id, payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))


    @action(detail=True, methods=['get'], url_path='user/folder/list')
    def folder_list(self, request, pk):
        """
        To get all the groups'
        :return: Returns all groups list.
        """
        response = self.video_uploader_service.folder_list(user_id=pk)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['get'], url_path='user/folder/specific/(?P<folder_id>[A-Za-z0-9]*)')
    def specific_folder(self, request, pk, folder_id):
        """
        To get all the groups'
        :return: Returns all groups list.
        """
        response = self.video_uploader_service.specific_folder(user_id=pk, project_id=folder_id)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['put'], url_path='user/folder/(?P<folder_id>[A-Za-z0-9]*)/add-video/(?P<video_id>[A-Za-z0-9]*)')
    def add_video_to_folder(self, request, pk, folder_id,  video_id):
        """
        To add a video to a group
        :return: Returns a specific group.
        """
        response = self.video_uploader_service.add_video_to_folder(video_id=video_id, user_id=pk, project_id=folder_id)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['delete'], url_path='video/delete')
    def delete_video(self, request, pk):
        """
        To delete an existing channel'
        :return: Returns no content.
        """
        response = self.video_uploader_service.delete_video(video_id=pk)
        return Response(data=response.get("data"), status=response.get("status_code"))


    @action(detail=True, methods=['get'], url_path='user/video/list')
    def user_video_list(self, request, pk):
        """
        To get all the channels'
        :return: Returns all channels list.
        """
        response = self.video_uploader_service.user_video_list(user_id=pk)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['get'], url_path='video/specific')
    def specific_video(self, request, pk):
        """
        To get a specific channel
        :return: Returns a specific channel.
        """
        response = self.video_uploader_service.specific_video(video_id=pk)
        return Response(data=response.get("data"), status=response.get("status_code"))

