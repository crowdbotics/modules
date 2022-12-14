from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
import requests
import json


class CreateUserIdView(APIView):

    def get(self, request, *args, **kwargs):
        try:

            headers = {
                "Authorization": request.data.get('Authorization')
            }
            req = requests.get('https://api.calendly.com/users/me', headers=headers)
            load = json.loads(req.text)
            return Response(load, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


class ListEventsView(APIView):

    def get(self, request, *args, **kwargs):
        try:
            params = {
                "user": request.data.get('user'),
            }
            headers = {
                "Authorization": request.data.get('Authorization')
            }
            req = requests.get('https://api.calendly.com/event_types', params=params, headers=headers)
            load = json.loads(req.text)
            return Response(load, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


class UserEventView(APIView):

    def get(self, request, *args, **kwargs):
        try:
            headers = {
                "Authorization": request.data.get('Authorization')
            }
            req = requests.get('https://api.calendly.com/event_types/' + request.data.get('uuid'),
                               headers=headers)
            load = json.loads(req.text)
            return Response(load, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


