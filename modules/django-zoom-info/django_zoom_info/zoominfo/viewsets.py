import requests

from django.conf import settings

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response


class ZoomInfoAPIView(APIView):

    def get_payload(self):
        return {}

    def get_url(self):
        return ""

    def get_header(self):
        return {}

    def post(self, request, *args, **kwargs):
        try:
            response = requests.post(url=self.get_url(), json=self.get_payload(), headers=self.get_header())
            response.raise_for_status()
            return Response(data=response.json(), status=status.HTTP_200_OK)
        except requests.exceptions.RequestException as e:
            return Response(e.response, status=e.response.status_code)


class AuthTokenViewSet(ZoomInfoAPIView):

    def get_url(self):
        return f"{settings.ZOOM_INFO_BASE_URL}/authenticate/"

    def get_payload(self):
        return self.request.data

    def get_header(self):
        return {
            'Content-Type': 'application/json'
        }


class SearchViewSet(ZoomInfoAPIView):

    def get_url(self):
        return f"{settings.ZOOM_INFO_BASE_URL}/search/{self.request.query_params.get('data_type')}"

    def get_payload(self):
        return self.request.data

    def get_header(self):
        return {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {self.request.META.get("HTTP_AUTHORIZATION")}'

        }


class EnrichViewSet(ZoomInfoAPIView):

    def get_url(self):
        return f"{settings.ZOOM_INFO_BASE_URL}/enrich/{self.request.query_params.get('data_type')}"

    def get_payload(self):
        return self.request.data

    def get_header(self):
        return {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {self.request.META.get("HTTP_AUTHORIZATION")}'
        }


class BulkViewSet(ZoomInfoAPIView):

    def get_url(self):
        return (
            f"{settings.ZOOM_INFO_BASE_URL}/bulk/"
            f"{self.request.query_params.get('endpoint')}/"
            f"{self.request.query_params.get('data_type')}"
        )

    def get_payload(self):
        return self.request.data

    def get_header(self):
        return {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {self.request.META.get("HTTP_AUTHORIZATION")}'
        }
