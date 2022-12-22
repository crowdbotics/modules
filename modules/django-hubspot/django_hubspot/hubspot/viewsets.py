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
        except requests.exceptions.RequestException as e:
            return Response(e.response, status=e.response.status_code)


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
        except requests.exceptions.RequestException as e:
            return Response(e.response, status=e.response.status_code)


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
        except requests.exceptions.RequestException as e:
            return Response(e.response, status=e.response.status_code)


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
        except requests.exceptions.RequestException as e:
            return Response(e.response, status=e.response.status_code)


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
        except requests.exceptions.RequestException as e:
            return Response(e.response, status=e.response.status_code)


class WebHookViewSet(APIView):

    def post(self, request, *args, **kwargs):
        print("Event Triggered: ", request.data)
        return Response(request.data, status=status.HTTP_200_OK)
        