import json

from demo import settings
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
import requests

from modules.django_okta.okta.models import Okta


class OktaUserViewSet(APIView):

	def post(self, request, *args, **kwargs):
		try:
			r = requests.post(settings.OKTA_BASE_URL + "/users", json=request.data, headers={"Authorization": "SSWS " + settings.OKTA_API_TOKEN})
			return Response(json.loads(r.text), status=status.HTTP_200_OK)
		except Exception as e:
			return Response(e.args[0], status=status.HTTP_400_BAD_REQUEST)


class OktaViewSet(APIView):
	
	def post(self, request, *args, **kwargs):
		try:
			r = requests.post(settings.OKTA_BASE_URL + "/authn", json=request.data)
			data = json.loads(r.text)
			payload = {
				"oktaID": data["_embedded"]["user"]["id"],
				"stateToken": data["stateToken"],
				"expiresAt": data["expiresAt"],
			}
			Okta.objects.update_or_create(**payload)
			return Response(data, status=status.HTTP_200_OK)
		except Exception as e:
			return Response(e.args[0], status=status.HTTP_400_BAD_REQUEST)


class OktaCancelViewSet(APIView):

	def post(self, request, *args, **kwargs):
		try:
			r = requests.post(settings.OKTA_BASE_URL + "/authn/cancel", json=request.data)
			okta = Okta.objects.get(stateToken=request.data["stateToken"])
			okta.delete()
			return Response(json.loads(r.text), status=status.HTTP_200_OK)
		except Exception as e:
			return Response(e.args[0], status=status.HTTP_400_BAD_REQUEST)


class OktaCallbackViewSet(APIView):

    def post(self, request, *args, **kwargs):
        try:
            return Response({"SAMLResponse": request.data["SAMLResponse"]}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e.args[0], status=status.HTTP_400_BAD_REQUEST)