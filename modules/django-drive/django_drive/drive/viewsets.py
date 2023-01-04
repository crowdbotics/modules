from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .services.DriveService import DriveService
from .serializers import FileListSerializer, CreateFolderSerializer, ShareFileSerializer, UploadFileSerializer


class DriveViewSet(viewsets.GenericViewSet):
    """
        - file_list: This class without any parameters return all the files and folders from the Google Drive. Filter
        results according to the provided queries.
        - upload_file: This class uploads file data on the Google Drive by
        making  multipart upload request.
        - create_folder: This class creates a folder on Google Drive with the MIME type
        `application/vnd.google-apps.folder` with no extension.
        - upload_file: Shares a Google Drive file, folder with multiple users with associated permissions resources.
        Creates permission for a specific type (user, group, domain, anyone) and role, such as "commenter" or "reader."
    """

    allowed_serializers = {
        "file_list": FileListSerializer,
        "create_folder": CreateFolderSerializer,
        "share_file": ShareFileSerializer,
        "upload_file": UploadFileSerializer,
    }

    def get_serializer_class(self):
        return self.allowed_serializers.get(self.action, FileListSerializer)

    @action(detail=False, methods=['get'], url_path='file/list')
    def file_list(self, request):
        try:
            drive_service = DriveService(access_token=request.META.get('HTTP_AUTHORIZATION'))
            serializer = self.get_serializer(data=request.query_params)
            serializer.is_valid(raise_exception=True)
            response = drive_service.get_drive_files(**serializer.data)
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e.args, status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='create/folder')
    def create_folder(self, request):
        try:
            drive_service = DriveService(access_token=request.META.get('HTTP_AUTHORIZATION'))
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            response = drive_service.create_drive_folder(**serializer.data)
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e.args, status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='share/file')
    def share_file(self, request):
        try:
            drive_service = DriveService(access_token=request.META.get('HTTP_AUTHORIZATION'))
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            response = drive_service.share_drive_file(**serializer.data)
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e.args, status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='upload/file')
    def upload_file(self, request):
        try:
            drive_service = DriveService(access_token=request.META.get('HTTP_AUTHORIZATION'))
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            response = drive_service.upload_drive_file(
                file=request.FILES.get("file"),
                parent_folder_id=request.data.get("parent_folder_id")
            )
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e.args, status.HTTP_400_BAD_REQUEST)
