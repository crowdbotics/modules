import apiclient
from demo import settings
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from googleapiclient import discovery
from google.oauth2.credentials import Credentials

from .serializers import (ShareFileSerializer, CreateFolderSerializer, UploadFileSerializer)


def init_service(token):
    """
    The method authorizes a user and creates an access point to interact with Google Drive.
    Gives access to the user to access the files and folders of the drive
    """
    creds = Credentials(token=token)
    return discovery.build('drive', 'v3', credentials=creds)


class GetDriveFilesViewSet(APIView):
    """
    This class without any parameters return all the files and folders from the Google Drive. 
    Filters results according to the provided queries.
    """

    def get(self, request, *args, **kwargs):
        """
        :header:
            Authorization: send access token in header without keyword 'Bearer'
        :query_param str query: To search for a specific set of files or folders, use the query. 
        :param num pageSize: The maximum number of files to return per page
        :param str pageToken: The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response.
        :param str mimeType: Specifies if the user wants to get files or folders supported values are `application/vnd.google-apps.file` and `application/vnd.google-apps.folder`
        :return: Returns list of the files and folder from user's Google Drive.
        """
        try:
            drive_service = init_service(token=request.META.get('HTTP_AUTHORIZATION'))
            files = drive_service.files().list(
                q=request.query_params.get('query'),
                pageToken=request.data.get('pageToken'),
                pageSize=request.data.get('pageSize')
                ).execute()
            return Response(files, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e.args, status=status.HTTP_400_BAD_REQUEST)


class UploadDriveFileViewSet(APIView):
    """
    This class uploads file data on the Google Drive by making  multipart upload request.
    """

    def post(self, request, *args, **kwargs):
        """
        :header:
            Authorization: send access token in header without keyword 'Bearer'
        :param file: The file sent needs to be uploaded on the Google Drive. File must be sent as multipart/form-data
        :return: Uploads the file to the specified folder and returns file id.
        """
        try:
            drive_service = init_service(token=request.META.get('HTTP_AUTHORIZATION'))
            serializer = UploadFileSerializer(data=request.FILES)
            serializer.is_valid(raise_exception=True)

            uploaded_file = request.FILES['file']
            file_metadata = {
                "name": uploaded_file.name,
                "parents": [settings.PARENT_FOLDER]
            }
            media = apiclient.http.MediaInMemoryUpload(
                body=uploaded_file.read(),
                mimetype=uploaded_file.content_type)
            file = drive_service.files().create(
                body=file_metadata,
                media_body=media,
                fields='id').execute()
            return Response(file, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e.args, status=status.HTTP_400_BAD_REQUEST)


class CreateDriveFolderViewSet(APIView):
    """
    This class creates a folder on Google Drive with the MIME type `application/vnd.google-apps.folder` with no extension.
    """

    def post(self, request, *args, **kwargs):
        """
        :header:
            Authorization: send access token in header without keyword 'Bearer'
        :param folder_name: Folder will be created with this name in Google Drive
        :return: Creates the folder and returns folder id.
        """
        try:
            drive_service = init_service(token=request.META.get('HTTP_AUTHORIZATION'))
            serializer = CreateFolderSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            file_metadata = {
                "name": request.data.get("folder_name"),
                "mimeType": 'application/vnd.google-apps.folder'
            }
            file = drive_service.files().create(
                 body=file_metadata,
                 fields='id',
            ).execute()
            return Response(file, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e.args, status=status.HTTP_400_BAD_REQUEST)


class ShareFileViewSet(APIView):
    """
    Shares a Google Drive file, folder with multiple users with associated permissions resources.
    Creates permission for a specific type (user, group, domain, anyone) and role, such as "commenter" or "reader." 
    """

    def post(self, request, *args, **kwargs):
        """
        :header:
            Authorization: send access token in header without keyword 'Bearer'
        :param str file_id: ID of the file/folder that will be shared with the user
        :param str role: Object containing the `role`, `type` and `email` of the user sharing file with
        :return: Shares file/folder with the user and returns the shared file/folder detail object
        """
        try:
            drive_service = init_service(token=request.META.get('HTTP_AUTHORIZATION'))
            serializer = ShareFileSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            emails = request.data.get("emails")
            role = request.data.get("role")
            user_type = request.data.get("user_type")
            file_id = request.data.get("file_id")
            for email in emails:
                drive_service.permissions().create(
                    fileId=file_id,
                    body={
                        "role": role,
                        "type": user_type,
                        "emailAddress": email
                    }
                ).execute()

            response_share_link = drive_service.files().get(
                fileId=file_id,
                fields="id, name, webViewLink",
            ).execute()
            return Response(response_share_link, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e.args, status=status.HTTP_400_BAD_REQUEST)
