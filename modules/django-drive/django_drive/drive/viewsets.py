from googleapiclient import discovery
from google.oauth2.credentials import Credentials
import apiclient

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


def init_service(token):
    creds = Credentials(token=token)
    return discovery.build('drive', 'v3', credentials=creds)


class GetDriveFilesViewSet(APIView):

    def get(self, request, *args, **kwargs):
        try:
            drive_service = init_service(token=request.META.get('HTTP_AUTHORIZATION'))
            files = drive_service.files().list().execute()
            return Response(files, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e.args, status=status.HTTP_400_BAD_REQUEST)


class UploadDriveFileViewSet(APIView):
    """
    header:
        Authorization: send access token in header without keyword 'Bearer'
    form-data:
        file
    """
    def post(self, request, *args, **kwargs):
        try:
            drive_service = init_service(token=request.META.get('HTTP_AUTHORIZATION'))
            uploaded_file = request.FILES['file']
            file_metadata = {
                "name": uploaded_file.name,
                "parents": ["1iivW-XJSqDbe37qt34sUeIEg9bgwtWa5"]
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
        body:
            folder_name
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
                fields='id'
            ).execute()
            return Response(file, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e.args, status=status.HTTP_400_BAD_REQUEST)
