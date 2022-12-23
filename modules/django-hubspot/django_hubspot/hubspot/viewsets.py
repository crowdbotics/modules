from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
import requests
from demo.settings import BASE_URL, GRANT_TYPE, REDIRECT_URL, CLIENT_ID, CLIENT_SECRET


class HubspotAPIView(APIView):

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
        except requests.exceptions.RequestException as e:
            return Response(e.response, status=e.response.status_code)

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
        except requests.exceptions.RequestException as e:
            return Response(e.response, status=e.response.status_code)

    def delete(self, request, *args, **kwargs):
        try:
            headers = {
                "Authorization": request.META.get('HTTP_AUTHORIZATION')
            }
            response = requests.delete(self.get_url(), json=self.get_payload(), params=self.get_params(),
                                       headers=headers)
            response.raise_for_status()
            return Response(response, status=status.HTTP_204_NO_CONTENT)
        except requests.exceptions.RequestException as e:
            return Response(e.response, status=e.response.status_code)


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


class DealsListViewSet(HubspotAPIView):

    def get_url(self):
        return f"{BASE_URL}crm/v4/objects/deals/"


class CreateDealViewSet(HubspotAPIView):
    def get_url(self):
        return f"{BASE_URL}crm/v4/objects/deals/"

    def get_payload(self):
        return self.request.data


class RemoveDealViewSet(HubspotAPIView):

    def get_url(self):
        return f"{BASE_URL}'crm/v4/objects/deals/{self.request.data.get('id')}"


class SingleDealViewSet(HubspotAPIView):

    def get_url(self):
        return f"{BASE_URL}crm/v4/objects/deals/{self.request.data.get('id')}"


class MeetingToContactsListViewSet(HubspotAPIView):

    def get_url(self):
        return f"{BASE_URL}crm/v4/objects/meetings/{self.request.data.get('meetingId')}/associations/contacts/"


class ContactToDealsListViewSet(HubspotAPIView):

    def get_url(self):
        return f"{BASE_URL}crm/v4/objects/contacts/{self.request.data.get('contactId')}/associations/deals/"


class WebHookViewSet(APIView):

    def post(self, request, *args, **kwargs):
        print("Event Triggered: ", request.data)
        return Response(request.data, status=status.HTTP_200_OK)
