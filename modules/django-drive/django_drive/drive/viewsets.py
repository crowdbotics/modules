import requests
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

DRIVE_URL = 'https://www.googleapis.com/drive/v3/'
UPLOAD_URL = 'https://www.googleapis.com/upload/drive/v3/files'


class DriveAPIView(APIView):

    def get_payload(self):
        return {}

    def get_params(self):
        return {}

    def get_url(self):
        return ""

    def get(self, request, *args, **kwargs):
        try:
            headers = {
                "Authorization": request.META.get('HTTP_AUTHORIZATION')
            }
            response = requests.get(self.get_url(), params=self.get_params(), headers=headers)
            response.raise_for_status()
            load = response.json()
            return Response(load, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e.args, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, *args, **kwargs):
        try:
            headers = {
                "Authorization": request.META.get('HTTP_AUTHORIZATION')
            }
            response = requests.post(self.get_url(), json=self.get_payload(), params=self.get_params(),
                                     headers=headers)
            response.raise_for_status()
            load = response.json()
            return Response(load, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e.args, status=status.HTTP_400_BAD_REQUEST)


class GetDriveFilesViewSet(DriveAPIView):

    def get_url(self):
        return f"{DRIVE_URL}files"

    def get_params(self):
        return self.request.data


class UploadDriveFileViewSet(DriveAPIView):

    def get_url(self):
        return f"{UPLOAD_URL}"

    def get_payload(self):
        return self.request.data

    def get_params(self):
        return {"uploadType": 'multipart'}


class CreateDriveFolderViewSet(DriveAPIView):

    def get_url(self):
        return f"{DRIVE_URL}files"

    def get_payload(self):
        return self.request.data

    def get_params(self):
        return {"uploadType": 'multipart'}