from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
import requests
from demo.settings import BASE_URL, GRANT_TYPE, REDIRECT_URL, CLIENT_ID, CLIENT_SECRET


class AccessTokenViewSet(APIView):

    def post(self, request, *args, **kwargs):
        try:
            token_payload = {
                "grant_type": GRANT_TYPE,
                "redirect_uri": REDIRECT_URL,
                "client_id": CLIENT_ID,
                "client_secret": CLIENT_SECRET,
                "code": request.data.get('code')
            }
            response = requests.post(BASE_URL + 'oauth/v1/token', data=token_payload)
            response.raise_for_status()
            load = response.json()
            return Response(load, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


class DealsListViewSet(APIView):

    def get(self, request, *args, **kwargs):
        try:
            header = {
                "Authorization": request.META.get("HTTP_AUTHORIZATION"),
            }
            response = requests.get(BASE_URL + 'crm/v4/objects/deals/', headers=header)
            response.raise_for_status()
            load = response.json()
            return Response(load, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


class CreateDealViewSet(APIView):

    def post(self, request, *args, **kwargs):
        try:
            header = {
                "Authorization": request.META.get("HTTP_AUTHORIZATION"),
            }
            response = requests.post(BASE_URL + 'crm/v4/objects/deals/', json=request.data, headers=header)
            response.raise_for_status()
            load = response.json()
            return Response(load, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


class RemoveDealViewSet(APIView):

    def delete(self, request, *args, **kwargs):
        try:
            header = {
                "Authorization": request.META.get("HTTP_AUTHORIZATION"),
            }
            response = requests.delete(BASE_URL + 'crm/v4/objects/deals/' + request.data.get('id'),
                                       headers=header)
            response.raise_for_status()
            return Response(response, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


class SingleDealViewSet(APIView):

    def get(self, request, *args, **kwargs):
        try:
            header = {
                "Authorization": request.META.get("HTTP_AUTHORIZATION"),
            }
            response = requests.get(BASE_URL + 'crm/v4/objects/deals/' + request.data.get('id'),
                                    headers=header)
            response.raise_for_status()
            load = response.json()
            return Response(load, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)
