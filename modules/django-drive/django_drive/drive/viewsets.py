from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .services.DriveService import DriveService
from .serializers import CreateFolderSerializer, ShareFileSerializer, UploadFileSerializer


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
        "create_folder": CreateFolderSerializer,
        "share_file": ShareFileSerializer,
        "upload_file": UploadFileSerializer,
    }

    def get_serializer_class(self):
        return self.allowed_serializers.get(self.action)

    @action(detail=False, methods=['get'], url_path='file/list')
    def file_list(self, request):
        """
        Retrieve list of files and folders from the google drive 

        :query_param str query: To search for a specific set of files or folders, use the query. \n
        :query_param num page_size: The maximum number of files to return per page \n
        :query_param str page_token: The token for continuing a previous list request on the next page. \n
            This should be set to the value of 'nextPageToken' from the previous response. \n
        :return: Returns list of the files and folder from user's Google Drive.
        """
        try:
            drive_service = DriveService(access_token=request.META.get('HTTP_AUTHORIZATION'))
            response = drive_service.get_drive_files(query=request.query_params.get('query', None),
                                                     page_token=request.query_params.get('page_token', None),
                                                     page_size=request.query_params.get('page_size', None))
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e.args, status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='create/folder')
    def create_folder(self, request):
        """
        Create a new folder with given name in Google Drive

        :param folder_name: Folder will be created with this name in Google Drive \n
        :return: Creates the folder and returns folder id.
        """
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
        """
        Shares a folder with provided list of user's emails

        :param str file_id: ID of the file/folder that will be shared with the user \n
        :param str emails: A list of emails which user wants to share file \n
        :param str role: Object containing the `role`, `type` and `email` of the user sharing file with \n
        :param str user_type: "user" or "group" \n
        :return: Shares file/folder with the user and returns the shared file/folder detail object
        """
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
        """
        Uploads a file on Google Drive

        :param file: The file sent needs to be uploaded on the Google Drive. File must be sent as
            multipart/form-data \n
        :param parent_folder_id: Use if user wants to add file inside the specific folder \n
        :return: Uploads the file to the specified folder and returns file id.
        """
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
