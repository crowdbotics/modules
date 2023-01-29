import os

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .serializers import (ChannelSerializer, GroupSerializer, ShowcaseSerializer,
                          UpdateShowcaseSerializer, FolderSerializer, CreateVideoSerializer, EditVideoSerializer,
                          TokenSerializer)
from .services.VideoUPloaderService import VideoUploaderService
import base64


class VideoUploaderViewSet(viewsets.GenericViewSet):
    video_uploader_service = VideoUploaderService(
        base_url=os.getenv('VIDEO_UPLOADER_BASE_URL', ""),
        access_token=os.getenv('VIDEO_UPLOADER_ACCESS_TOKEN', ""),
    )

    allowed_serializer = {
        "create_channel": ChannelSerializer,
        "update_channel": ChannelSerializer,
        "create_group": GroupSerializer,
        "create_showcase": ShowcaseSerializer,
        "update_showcase": UpdateShowcaseSerializer,
        "create_folder": FolderSerializer,
        "update_folder": FolderSerializer,
        "create_video": CreateVideoSerializer,
        "update_video": EditVideoSerializer,
        "create_access_token": TokenSerializer,
    }

    def get_serializer_class(self):
        return self.allowed_serializer.get(self.action)

    @staticmethod
    def convert_into_base64():
        client_id = os.getenv('VIDEO_UPLOADER_CLIENT_ID', "")
        client_secret = os.getenv('VIDEO_UPLOADER_CLIENT_SECRET', "")
        token = client_id+':'+client_secret
        byte_token = base64.b64encode(bytes(token, 'utf-8'))
        return byte_token.decode('utf-8')


    @action(detail=False, methods=['post'], url_path='access-token')
    def create_access_token(self, request):
        """
        To get the access token
        :return: Returns access_token.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.video_uploader_service.create_access_token(payload=serializer.data, token=self.convert_into_base64())
        data = response.get("data")
        if 'access_token' in data:
            self.video_uploader_service.access_token = data['access_token']
        return Response(data=data, status=response.get("status_code"))


    @action(detail=False, methods=['post'], url_path='channel/create')
    def create_channel(self, request):
        """
        To create a channel

        :body_params str name: Name of the channel
        :body_params str description: Description of the channel
        :body_params str(uri) link: The link to access the channel
        :body_params str privacy: The privacy level of the channel. Allowed values are (anybody, moderators, user)
        :return: Returns newly created channel.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.video_uploader_service.create_channel(serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['delete'], url_path='channel/delete')
    def delete_channel(self, request, pk):
        """
        To delete an existing channel
        :path_params int channel_id: ID of the channel to be deleted
        :return: Returns no content.
        """
        response = self.video_uploader_service.delete_channel(channel_id=pk)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['patch'], url_path='channel/update')
    def update_channel(self, request, pk):
        """
        To update/edit an existing channel
        :path_params int channel_id: ID of the channel to be updated
        :body_params str name:Name of the Chanel
        :body_params str description: Description of the channel
        :body_params str(uri) link: The link to access the channel
        :body_params str privacy: The privacy level of the channel. Allowed values are (anybody, moderators, user)
        :return: Returns updated channel.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.video_uploader_service.update_channel(channel_id=pk, payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='channel/list')
    def channel_list(self, request):
        """
        To get all the channels
        :query_params str direction: Direction can be (asc/desc)
        :query_params str filter: Any feature of the channel can be used as filter
        :query_params int page: page number to get the specific channels from a page
        :query_params int per_page:Number of results to be returned per page
        :query_params str query: The search query to use to filter the results
        :query_params str sort: The way to sort the results. Allowed values are `alphabetical, data, default, followers,
         relevant, videos`
        :return: Returns all channels list
        """
        response = self.video_uploader_service.channel_list(query_params=request.query_params)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['get'], url_path='channel/specific')
    def specific_channel(self, request, pk):
        """
        To get a specific channel
        :path_params int channel_id: ID of the channel to be returned
        :return: Returns a specific channel.
        """
        response = self.video_uploader_service.specific_channel(channel_id=pk)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='group/create')
    def create_group(self, request):
        """
        To create a group

        :body_params str name: Name of the group
        :body_params str description: Description for the group
        :return: Returns newly created group.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.video_uploader_service.create_group(serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['delete'], url_path='group/delete')
    def delete_group(self, request, pk):
        """
        To delete an existing group

        :path_params int group_id: ID specified to the group
        :return: Returns no content.
        """
        response = self.video_uploader_service.delete_group(group_id=pk)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='group/list')
    def group_list(self, request):
        """
        To get all the groups

        :query_params str direction: Direction can be (asc/desc)
        :query_params str filter: Any feature of the channel can be used as filter
        :query_params int page: page number to get the specific groups from a page
        :query_params int per_page:Number of results to be returned per page
        :query_params str query: The search query to use to filter the results
        :query_params str sort: The way to sort the results. Allowed values are `alphabetical, data, default, followers,
         relevant, videos`
        :return: Returns all groups list.
        """
        response = self.video_uploader_service.groups_list(query_params=request.query_params)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['get'], url_path='group/specific')
    def specific_group(self, request, pk):
        """
        To get a specific group

        :path_params int group_id: ID specified to the group
        :return: Returns a specific group.
        """
        response = self.video_uploader_service.specific_group(group_id=pk)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['put'], url_path='group/add-user/(?P<user_id>[A-Za-z0-9]*)')
    def add_user_to_group(self, request, pk, user_id):
        """
        To add a user to a group

        :path_params int group_id: ID specified to the group
        :path_params int user_id: ID specified to the user
        :return:  joined the group. Returns no content
        """
        response = self.video_uploader_service.add_user_to_group(user_id=user_id, group_id=pk)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['put'], url_path='group/add-video/(?P<video_id>[A-Za-z0-9]*)')
    def add_video_to_group(self, request, pk, video_id):
        """
        To add a video to a group

        :path_params int group_id: ID specified to the group
        :path_params int video_id: ID specified to the video
        :return:  was added. Returns OK
        """
        response = self.video_uploader_service.add_video_to_group(video_id=video_id, group_id=pk)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['post'], url_path='user/showcase/create')
    def create_showcase(self, request, pk):
        """
        To create a showcase

        :path_params int user_id: ID specified to the user
        :body_params str brand_color: The hexadecimal code for the color of the player buttons and showcase controls
        :body_params str description: The description of the showcase
        :body_params bool hide_nav: Whether to hide Vimeo navigation when displaying the showcase
        :body_params bool hide_upcoming: Whether to include the upcoming live event in the showcase
        :body_params str layout: The type of layout for presenting the showcase. Allowed values are (grid/player)
        :body_params str name: The name of the showcase
        :body_params str password: The showcase's password. This field is required only when privacy is password
        :body_params str privacy : The privacy level of the showcase. Allowed values are (anybody/nobody/team/embed_only/password)
        :body_params bool review_mode: Whether showcase videos use the review mode URL
        :body_params str sort: The default sort order of the videos as they appear in the showcase. Allowed values are (added_first/added_last/alphabetical/arranged/likes/newest/oldest/plays)
        :body_params str theme: The color theme of the showcase. Allowed values are (dark/standard)
        :return: Returns newly created showcase.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.video_uploader_service.create_showcase(user_id=pk, payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['delete'], url_path='user/showcase/delete/(?P<album_id>[A-Za-z0-9]*)')
    def delete_showcase(self, request, pk, album_id):
        """
        To delete an existing showcase

        :path_params int user_id: ID specified to the user
        :path_params int album_id: ID specified to the album
        :return: Returns no content.
        """
        response = self.video_uploader_service.delete_showcase(user_id=pk, album_id=album_id)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['patch'], url_path='user/showcase/update/(?P<album_id>[A-Za-z0-9]*)')
    def update_showcase(self, request, pk, album_id):
        """
        To update/edit an existing showcase

        :path_params int user_id: ID specified to the user
        :path_params int album_id: ID specified to the album
        :body_params str brand_color: The hexadecimal code for the color of the player buttons and showcase controls
        :body_params str description: The description of the showcase
        :body_params bool hide_nav: Whether to hide Vimeo navigation when displaying the showcase
        :body_params bool hide_upcoming: Whether to include the upcoming live event in the showcase
        :body_params str layout: The type of layout for presenting the showcase. Allowed values are (grid/player)
        :body_params str name: The name of the showcase
        :body_params str password: The showcase's password. This field is required only when privacy is password
        :body_params str privacy : The privacy level of the showcase. Allowed values are (anybody/nobody/team/embed_only/password)
        :body_params bool review_mode: Whether showcase videos use the review mode URL
        :body_params str sort: The default sort order of the videos as they appear in the showcase. Allowed values are (added_first/added_last/alphabetical/arranged/likes/newest/oldest/plays)
        :body_params str theme: The color theme of the showcase. Allowed values are (dark/standard)
        :body_params str url: The custom Vimeo URL of the showcase
        :body_params bool use_custom_domain: Whether the user has opted for a custom domain for their showcase
        :return: Returns updated showcase.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.video_uploader_service.update_showcase(user_id=pk, album_id=album_id, payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['get'], url_path='user/showcase/list')
    def showcase_list(self, request, pk):
        """
        To get all the showcase

        :path_params int user_id: ID specified to the user
        :query_params str direction: Direction can be (asc/desc)
        :query_params int page: page number to get the specific showcases from a page
        :query_params int per_page:Number of results to be returned per page
        :query_params str query: The search query to use to filter the results
        :query_params str sort: The way to sort the results. Allowed values are `alphabetical, data, default, followers,
         relevant, videos`
        :return: Returns all showcase list.
        """
        response = self.video_uploader_service.showcase_list(user_id=pk, query_params=request.query_params)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['get'], url_path='user/showcase/specific/(?P<album_id>[A-Za-z0-9]*)')
    def specific_showcase(self, request, pk, album_id):
        """
        To get a specific showcase
        :path_params int user_id: ID specified to the user
        :path_params int album_id: ID specified to the album
        :return: Returns a specific showcase
        """
        response = self.video_uploader_service.specific_showcase(user_id=pk, album_id=album_id)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['put'],
            url_path='user/showcase/album/(?P<album_id>[A-Za-z0-9]*)/add-video/(?P<video_id>[A-Za-z0-9]*)')
    def add_video_to_showcase(self, request, pk, album_id, video_id):
        """
        To add a video to a showcase

        :path_params int user_id: ID specified to the user
        :path_params int album_id: ID specified to the album
        :path_params int video_id: ID specified to the video
        :return: Returns no content
        The video was added
        """
        response = self.video_uploader_service.add_video_to_showcase(video_id=video_id, user_id=pk, album_id=album_id)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['post'], url_path='user/folder/create')
    def create_folder(self, request, pk):
        """
        To create a folder
        :path_params int user_id: ID specified to the user
        :body_params str name: Name for the folder
        :body_params str(uri) parent_folder_uri: The URI of the parent folder
        :return: Returns newly created folder.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.video_uploader_service.create_folder(user_id=pk, payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['delete'], url_path='user/folder/delete/(?P<folder_id>[A-Za-z0-9]*)')
    def delete_folder(self, request, pk, folder_id):
        """
        To delete an existing folder

        :path_params int user_id: ID specified to the user
        :path_params int folder_id: ID specified to the folder
        :return: Returns no content.
        """
        response = self.video_uploader_service.delete_folder(user_id=pk, project_id=folder_id)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['patch'], url_path='user/folder/update/(?P<folder_id>[A-Za-z0-9]*)')
    def update_folder(self, request, pk, folder_id):
        """
        To update/edit an existing folder

        :path_params int user_id: ID specified to the user
        :path_params int folder_id: ID specified to the folder
        :body_params str name: Name for the folder
        :body_params str(uri) parent_folder_uri: The URI of the parent folder
        :return: Returns updated folder
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.video_uploader_service.update_folder(user_id=pk, project_id=folder_id, payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['get'], url_path='user/folder/list')
    def folder_list(self, request, pk):
        """
        To get all the folder list

        :path_params int user_id: ID specified to the user
        :query_params str direction: Direction can be (asc/desc)
        :query_params int page: page number to get the specific folders from a page
        :query_params int per_page:Number of results to be returned per page
        :query_params str query: The search query to use to filter the results
        :query_params str sort: The way to sort the results. Allowed values are `alphabetical, data, default, followers,
         relevant, videos`
        :return: Returns all folder list.
        """
        response = self.video_uploader_service.folder_list(user_id=pk, query_params=request.query_params)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['get'], url_path='user/folder/specific/(?P<folder_id>[A-Za-z0-9]*)')
    def specific_folder(self, request, pk, folder_id):
        """
        To get a specific folder

        :path_params int user_id: ID specified to the user
        :path_params int folder_id: ID specified to the folder
        :return: Returns a specific folder.
        """
        response = self.video_uploader_service.specific_folder(user_id=pk, project_id=folder_id)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['put'],
            url_path='user/folder/(?P<folder_id>[A-Za-z0-9]*)/add-video/(?P<video_id>[A-Za-z0-9]*)')
    def add_video_to_folder(self, request, pk, folder_id, video_id):
        """
        To add a video to a folder

        :path_params int user_id: ID specified to the user
        :path_params int folder_id: ID specified to the folder
        :path_params int video_id: ID specified to the video
        :return:  was added. Returns no content
        """
        response = self.video_uploader_service.add_video_to_folder(video_id=video_id, user_id=pk, project_id=folder_id)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['delete'], url_path='video/delete')
    def delete_video(self, request, pk):
        """
        To delete an existing video

        :path_params int video_id: ID specified to the video
        :return: Returns no content.
        """
        response = self.video_uploader_service.delete_video(video_id=pk)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['get'], url_path='user/video/list')
    def user_video_list(self, request, pk):
        """
        To get all the videos list
        :path_params int user_id: ID specified to the user
        :return: Returns all videos list.
        """
        response = self.video_uploader_service.user_video_list(user_id=pk)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['get'], url_path='video/specific')
    def specific_video(self, request, pk):
        """
        To get a specific video

        :path_params int video_id: ID specified to the video
        :return: Returns a specific video.
        """
        response = self.video_uploader_service.specific_video(video_id=pk)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='video/create')
    def create_video(self, request):
        """
        To create a video

        :body_params str name: Name of the video
        :body_params str description: Description of the video
        :body_params str approach: The approach by which to upload the version. Allowed approaches are (post/pull)
        :body_params str size: The upload size of the video
        :body_params str redirect_url: The app's redirect URL when `approach` is post
        :return: Returns newly created video
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.video_uploader_service.create_video(payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['patch'], url_path='video/update')
    def update_video(self, request, pk):
        """
        To update a video

        :path_params int video_id: ID specified to the video
        :body_params str approach: The approach by which to upload the version. Allowed approaches are (post/pull)
        :body_params str size: The upload size of the video
        :body_params str redirect_url: The app's redirect URL when `approach` is post
        :return: Returns updated video
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.video_uploader_service.update_video(video_id=pk, payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['put'],
            url_path='user/likes/video/(?P<video_id>[A-Za-z0-9]*)')
    def like_video(self, request, pk, video_id):
        """
        To like a video

        :path_params int user_id: ID specified to the user
        :path_params int video_id: ID specified to the video
        :return: Returns no content. The video was liked
        """
        response = self.video_uploader_service.like_video(video_id=video_id, user_id=pk)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['delete'],
            url_path='user/unlikes/video/(?P<video_id>[A-Za-z0-9]*)')
    def unlike_video(self, request, pk, video_id):
        """
        To unlike a video
        
        :path_params int user_id: ID specified to the user
        :path_params int video_id: ID specified to the video
        :return: Returns no content.
        The video was unliked
        """
        response = self.video_uploader_service.unlike_video(video_id=video_id, user_id=pk)
        return Response(data=response.get("data"), status=response.get("status_code"))
