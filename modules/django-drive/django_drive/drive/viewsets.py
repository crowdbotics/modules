import apiclient
from demo import settings
from googleapiclient import discovery
from google.oauth2.credentials import Credentials
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


def init_service(token):
    """
    The method authorizes a user and creates an access point to interact with google drive.
    Gives access to the user to access the files and folders of the drive
    """
    creds = Credentials(token=token)
    return discovery.build('drive', 'v3', credentials=creds)


class GetDriveFilesViewSet(APIView):
    """
    :No-params:
    :return: Returns list of the files and folder from user's Google Drive.
    """
    def get(self, request, *args, **kwargs):
        try:
            drive_service = init_service(token=request.META.get('HTTP_AUTHORIZATION'))
            files = drive_service.files().list().execute()
            return Response(files, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e.args, status=status.HTTP_400_BAD_REQUEST)


class UploadDriveFileViewSet(APIView):
    """
    :param file: The file sent needs to be uploaded on the google drive. File must be sent as multipart/form-data
    :return: Uploads the file to the specified folder and returns file id.
    """

    def post(self, request, *args, **kwargs):
        try:
            drive_service = init_service(token=request.META.get('HTTP_AUTHORIZATION'))
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
    :param folder_name: Folder will be created with this name in google drive.
    :return: Creates the folder and returns folder id.
    """
    def post(self, request, *args, **kwargs):
        try:
            drive_service = init_service(token=request.META.get('HTTP_AUTHORIZATION'))
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
    :param file_id: ID of the file/folder that will be shared with the user.
    :param request_body: Object containing the `role`, `type` and `email` of the user sharing file with.
    :return: Shares file/folder with the user and returns the shared file/folder detail object.
    """
    def get(self, request, *args, **kwargs):
        try:
            drive_service = init_service(token=request.META.get('HTTP_AUTHORIZATION'))
            drive_service.permissions().create(
                fileId=request.data.get("file_id"),
                body=request.data.get("request_body")
            ).execute()
            response_share_link = drive_service.files().get(
                fileId=request.data.get("file_id"),
                fields="id, name, webViewLink",
            ).execute()
            return Response(response_share_link, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e.args, status=status.HTTP_400_BAD_REQUEST)
