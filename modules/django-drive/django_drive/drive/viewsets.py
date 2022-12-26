import apiclient

from demo import settings
from googleapiclient import discovery
from google.oauth2.credentials import Credentials
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

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
    :header:
        Authorization: send access token in header without keyword 'Bearer'
    :param str file_name: Name of the file with file extension
    :param num pageSize: The maximum number of files to return per page
    :param str pageToken: The token for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response.
    :return: Returns list of the files and folder from user's Google Drive.
    """

    def get(self, request, *args, **kwargs):
        try:
            drive_service = init_service(token=request.META.get('HTTP_AUTHORIZATION'))
            file_name = None
            if request.data.get('file_name'):
                file_name = f"name = '{request.data.get('file_name')}'"
            files = drive_service.files().list(
                q=file_name,
                pageToken=request.data.get('pageToken'),
                pageSize=request.data.get('pageSize')).execute()
            return Response(files, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e.args, status=status.HTTP_400_BAD_REQUEST)


class UploadDriveFileViewSet(APIView):
    """
    :header:
        Authorization: send access token in header without keyword 'Bearer'
    :param file: The file sent needs to be uploaded on the Google Drive. File must be sent as multipart/form-data
    :return: Uploads the file to the specified folder and returns file id.
    """

    def post(self, request, *args, **kwargs):
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
    :header:
        Authorization: send access token in header without keyword 'Bearer'
    :param folder_name: Folder will be created with this name in Google Drive
    :return: Creates the folder and returns folder id.
    """

    def post(self, request, *args, **kwargs):
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
    :header:
        Authorization: send access token in header without keyword 'Bearer'
    :param str file_id: ID of the file/folder that will be shared with the user
    :param str role: Object containing the `role`, `type` and `email` of the user sharing file with
    :return: Shares file/folder with the user and returns the shared file/folder detail object
    """

    def post(self, request, *args, **kwargs):
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
