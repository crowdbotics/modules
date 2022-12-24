from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
import requests
from demo.settings import HUBSPOT_URL, GRANT_TYPE, REDIRECT_URL, CLIENT_ID, CLIENT_SECRET


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
            return Response(e.response.json(), status=e.response.status_code)

    def post(self, request, *args, **kwargs):
        try:
            headers = {
                "Authorization": request.META.get('HTTP_AUTHORIZATION')
            }
            response = requests.post(self.get_url(), json=self.get_payload(), params=self.get_params(),
                                     headers=headers)
            response.raise_for_status()
            load = response.json()
            return Response(load, status=status.HTTP_201_CREATED)
        except requests.exceptions.RequestException as e:
            return Response(e.response.json(), status=e.response.status_code)

    def put(self, request, *args, **kwargs):
        try:
            headers = {
                "Authorization": request.META.get('HTTP_AUTHORIZATION')
            }
            response = requests.put(self.get_url(), json=self.get_payload(), headers=headers)
            response.raise_for_status()
            load = response.json()
            return Response(load, status=status.HTTP_202_ACCEPTED)
        except requests.exceptions.RequestException as e:
            return Response(e.response.json(), status=e.response.status_code)

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
            return Response(e.response.json(), status=e.response.status_code)


class AccessTokenViewSet(APIView):
    """
        To get access token

        :body
            code
    """
    def post(self, request, *args, **kwargs):
        try:
            token_payload = {
                "grant_type": GRANT_TYPE,
                "redirect_uri": REDIRECT_URL,
                "client_id": CLIENT_ID,
                "client_secret": CLIENT_SECRET,
                "code": request.data.get('code')
            }
            response = requests.post(HUBSPOT_URL + 'oauth/v1/token', data=token_payload)
            response.raise_for_status()
            load = response.json()
            return Response(load, status=status.HTTP_201_CREATED)
        except requests.exceptions.RequestException as e:
            return Response(e.response, status=e.response.status_code)


# Deals

class DealsListViewSet(HubspotAPIView):
    """
        To get all the deals
        header:
            access_token
    """
    def get_url(self):
        return f"{HUBSPOT_URL}crm/v4/objects/deals/"


class CreateDealViewSet(HubspotAPIView):

    """
        To create a deal
        :header
             access_token
        :body params
            properties
                amount
                closedate
                dealname
                dealstage
                hubspot_owner_id
                pipeline
    """
    def get_url(self):
        return f"{HUBSPOT_URL}crm/v4/objects/deals/"

    def get_payload(self):
        return self.request.data


class RemoveDealViewSet(HubspotAPIView):
    """
        To delete the deal
        :header
             access_token
        :body params
            dealId
    """

    def get_url(self):
        return f"{HUBSPOT_URL}crm/v4/objects/deals/{self.request.data.get('dealId')}/"


class SingleDealViewSet(HubspotAPIView):
    """
        To reterive the deal
        :header
             access_token
        :body params
            dealId
    """

    def get_url(self):
        return f"{HUBSPOT_URL}crm/v4/objects/deals/{self.request.data.get('dealId')}"


# ContactDealsAssociation


class ContactToDealsListViewSet(HubspotAPIView):
     """
        To reterive the contact associated with deals
        :header
             access_token
        :body params
            contactId
     """

    def get_url(self):
        return f"{HUBSPOT_URL}crm/v4/objects/contacts/{self.request.data.get('contactId')}/associations/deals/"


# MeetingContactAssociation


class MeetingToContactsListViewSet(HubspotAPIView):
    """
        To reterive the meeting associated with contacts
        :header
             access_token
        :body params
            meetingId
     """

    def get_url(self):
        return f"{HUBSPOT_URL}crm/v4/objects/meetings/{self.request.data.get('meetingId')}/associations/contacts/"


# Ticket


class CreateTicketViewSet(HubspotAPIView):

    """
        To create the ticket
        :header
             access_token
        :body params
            properties
                hs_pipeline
                hs_pipeline_stage
                hs_ticket_priority
                hubspot_owner_id
                subject
                content
    """
     
    def get_url(self):
        return f"{HUBSPOT_URL}crm/v3/objects/tickets/"

    def get_payload(self):
        return self.request.data


class SingleTicketViewSet(HubspotAPIView):
    """
        To reterive the ticket
          :header
             access_token
          :body params
             ticketId
    """

    def get_url(self):
        return f"{HUBSPOT_URL}crm/v4/objects/tickets/{self.request.data.get('ticketId')}"


class TicketListViewSet(HubspotAPIView):
     """
        To get all the tickets
        header:
            access_token
    """

    def get_url(self):
        return f"{HUBSPOT_URL}crm/v3/objects/tickets/"


class RemoveTicketViewSet(HubspotAPIView):
    """
        To delete the ticket
          :header
             access_token
          :body params
             ticketId
    """

    def get_url(self):
        return f"{HUBSPOT_URL}crm/v4/objects/tickets/{self.request.data.get('ticketId')}/"


# Ticket Association

class CreateTicketAssociationViewSet(HubspotAPIView):
    """
        To associate the ticket with other CRM objects
        :header
                access_token
        :body params
            {
                "ticketId": 
                "toObjectType": 
                "toObjectId":
                "param": 
                [{
                    "associationCategory": 
                    "associationTypeId": 
                }]
            }
    """

    def get_url(self):
        return f"{HUBSPOT_URL}crm/v4/objects/tickets/{self.request.data.get('ticketId')}/associations/" \
               f"{self.request.data.get('toObjectType')}/{self.request.data.get('toObjectId')}/"

    def get_payload(self):
        payload = self.request.data
        return payload['param']


class TicketAssociationListViewSet(HubspotAPIView):
    """
        To get the ticket associated with other CRM objects
        :header
                access_token
        :body params
             ticketId
             toObjectType
     """

    def get_url(self):
        return f"{HUBSPOT_URL}crm/v4/objects/tickets/{self.request.data.get('ticketId')}/associations/" \
               f"{self.request.data.get('toObjectType')}/"


# WebHook


class WebHookViewSet(APIView):
    """
        This url will be used while creating a webhook. This method will be called every time when your subscribed hubspot events triggered.
    """
    def post(self, request, *args, **kwargs):
        print("Event Triggered: ", request.data)
        return Response(request.data, status=status.HTTP_200_OK)