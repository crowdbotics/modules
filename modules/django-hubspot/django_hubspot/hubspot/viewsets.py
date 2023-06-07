import os

from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .services.HubspotService import HubspotService


class HubspotViewSet(viewsets.GenericViewSet):
    hubspot_service = HubspotService(
        base_url=os.getenv('HUBSPOT_BASE_URL', "https://api.hubapi.com"),
        grant_type=os.getenv('HUBSPOT_GRANT_TYPE', "authorization_code"),
        redirect_url=os.getenv('HUBSPOT_REDIRECT_URL', ""),
        client_id=os.getenv('HUBSPOT_CLIENT_ID', ""),
        client_secret=os.getenv('HUBSPOT_CLIENT_SECRET', ""),
        access_token=os.getenv('HUBSPOT_ACCESS_TOKEN', ""),
    )

    @action(detail=False, methods=['post'], url_path='access/token')
    def get_token(self, request):
        """
        To get the access token
        :return: Returns access_token, refresh_token and expires_in.
        """
        response = self.hubspot_service.auth_token(request.data.get('code'))
        data = response.get("data")
        if 'access_token' in data:
            self.hubspot_service.access_token = data['access_token']
        return Response(data=data, status=response.get("status_code"))
        
    @action(detail=False, methods=['get'], url_path='deals/list')
    def deals_list(self, request):
        """
        To get all the deals'
        :return: Returns all deals list.
        """
        response = self.hubspot_service.deals_list()
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='deals/create')
    def create_deal(self, request):
        """
        To create a deal
        :params
        properties
            amount
            closedate
            dealname
            dealstage
            hubspot_owner_id
            pipeline
        :return: Returns a newly created deal.
        """
        response = self.hubspot_service.create_deal(request.data.get("deal"))
        if "associations" in request.data:
            emails = request.data.get('associations', {}).get("emails")
            deal_id = response.get("data").get("id")
            self.hubspot_service.create_deal_contact_association(emails, deal_id)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['delete'], url_path='deals/remove')
    def remove_deal(self, request):
        """
        To delete a deal
        :param str dealId:  HubSpot deal id to delete the deal.
        :return: Removes the deal from hubspot and returns no content.      
        """
        response = self.hubspot_service.remove_deal(request.data.get('dealId'))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='deals/single')
    def single_deal(self, request):
        """
        To retrieve a deal
        :param str dealId:  HubSpot deal id to retrieve the deal.
        :return: Returns a deal object with properties.       
        """
        response = self.hubspot_service.single_deal(request.data.get('dealId'))
        return Response(data=response.get("data"), status=response.get("status_code"))

    # deal associations
    @action(detail=False, methods=['post'], url_path='deals/associations/create')
    def create_deal_association(self, request):
        """
        To create a deal association
        :params
        dealId
        associationId
        associationType
        :return: Returns a newly created deal association.
        """
        deal_id = request.data.get('dealId')
        emails = request.data.get('emails')
        response = self.hubspot_service.create_deal_contact_association(emails, deal_id)
        resp = {
            "result": "success" if response else "failure"
        }
        return Response(data=resp, status=200)

    @action(detail=False, methods=['get'], url_path='tickets/list')
    def ticket_list(self, request):
        """
        To get all the tickets'
        :return: Returns a list of HobSpot tickets.
        """
     
        response = self.hubspot_service.ticket_list()
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='tickets/create')
    def create_ticket(self, request):
        """
        To create a ticket
        :params
        properties
            hs_pipeline
            hs_pipeline_stage
            hs_ticket_priority
            hubspot_owner_id
            subject
            content
        :return: Returns a newly created ticket object.
        """
        response = self.hubspot_service.create_ticket(request.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['delete'], url_path='tickets/remove')
    def remove_ticket(self, request):
        """
        To delete a ticket
        :param str ticketId:  HubSpot ticket id to delete the ticket.
        :return: Removes the ticket from hubspot and returns no content.      
        """
        response = self.hubspot_service.remove_ticket(request.data.get('ticketId'))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='tickets/single')
    def single_ticket(self, request):
        """
        To retrieve a ticket
        :param str ticketId:  HubSpot ticket id to retrieve the ticket.
        :return: Returns a ticket object containing ticket detail.       
        """
        response = self.hubspot_service.single_ticket(request.data.get('ticketId'))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['put'], url_path='ticket/associations/create')
    def create_ticket_association(self, request):
        """
        To associate the ticket with other CRM objects
        :params
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
        :return: Returns a ticket associated with other HubSpot objects.
        """
        response = self.hubspot_service.create_ticket_association(request.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='ticket/associations/list')
    def ticket_association_list(self, request):
        """
        To get a ticket associated with other CRM objects
        :param str ticketId: HubSpot ticket id associated with a CRM object
        :param str toObjectType: Type of the CRM object to with ticket is being associated
        :return: Returns a ticket associated with other HubSpot objects.
        """
        response = self.hubspot_service.ticket_association_list(request.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='contact/deals/list')
    def contact_deals_association_list(self, request):
        """
        To get a contact associated with other HubSpot deals
        :param str contactId: HubSpot contact id associated with a CRM deals object
        :return: Returns a contact associated with other HubSpot deals.
        """
        response = self.hubspot_service.contact_deals_association_list(request.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='meeting/contacts/list')
    def meeting_contacts_association_list(self, request):
        """
        To get a meeting associated with other HubSpot contacts.
        :param str meetingId: HubSpot meeting id associated with a CRM contact object
        :return: Returns a meeting associated with other HubSpot contacts.
        """
        response = self.hubspot_service.meeting_contact_association_list(request.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='events/create')
    def create_event(self, request):
        """
        To create an event
        :params
            properties
                eventName
                eventType
                startDateTime
                endDateTime
                eventOrganizer
                eventDescription
                eventUrl
                eventCancelled
                externalAccountId
                externalEventId
        :return: Returns a newly created event.
        """
        response = self.hubspot_service.create_event(request.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='webhook')
    def webhook(self, request):
        """
        This method will be used while creating a webhook. This method will be called every time when your
        subscribed hubspot events triggered.
        """
        response = self.hubspot_service.webhook(request.data)
        return Response(data=response, status=status.HTTP_200_OK)
