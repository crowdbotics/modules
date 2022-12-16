import requests
from django.conf import settings

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response


class AuthGrant(APIView):
    def post(self, request, *args, **kwargs):
        try:
            client_token = request.META.get('HTTP_CLIENT_TOKEN')
            if client_token:
                payload = f"code={client_token}&grant_type=authorization_code"
                header = {
                    'Authorization': f'Basic {settings.ENCODED_KEY}',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
                response = requests.request(method="POST", url=settings.ACCOUNT_URL, headers=header, data=payload)
                if response:
                    return Response(data=response.json(), status=status.HTTP_200_OK)
                else:
                    return Response({'error': "Error while getting token"},
                                    status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'error': "Client token not found"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


class CreateEnvelop(APIView):
    def post(self, request, *args, **kwargs):
        try:
            access_token = request.META.get('HTTP_ACCESS_TOKEN')
            url = f"{settings.BASE_ACCOUNT_URL}/{settings.ACCOUNT_ID}/envelopes"
            headers = {
                'Content-Type': 'application/json',
                'Authorization': f'Bearer {access_token}'
            }
            response = requests.request(method="POST", url=url, headers=headers, json=request.data)
            if response:
                return Response(data=response.json(), status=status.HTTP_200_OK)
            else:
                return Response({'error': f"{response.json()}"},
                                status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)
