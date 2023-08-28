import os

from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .serializers import TokenSerializer, DealSerializer, DealAssociationSerializer, TicketSerializer, EventSerializer,\
    TicketAssociationSerializer
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

    allowed_serializer = {"get_token": TokenSerializer,
                          "create_deal": DealSerializer,
                          "create_deal_association": DealAssociationSerializer,
                          "create_ticket": TicketSerializer,
                          "create_ticket_association": TicketAssociationSerializer,
                          "create_event": EventSerializer}

    def get_serializer_class(self):
        return self.allowed_serializer.get(self.action)

    @action(detail=False, methods=['post'], url_path='access/token')
    def get_token(self, request):
        """
        To get the access token \n
        :body_params str code: auth code \n
        :return: Returns access_token, refresh_token and expires_in.
        """

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.hubspot_service.auth_token(payload=serializer.data)
        data = response.get("data")
        if 'access_token' in data:
            self.hubspot_service.access_token = data['access_token']
        return Response(data=data, status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='deals/list')
    def deals_list(self, request):
        """
        To get all the deals
        
        :query_params(optional): limit(int32), after(string), properties(array), propertiesWithHistory(array),
         associations(array), archived(bool) \n
        :return: Returns all deals list.
        """

        response = self.hubspot_service.deals_list(query_params=request.query_params)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='deals/create')
    def create_deal(self, request):
        """
        To create a deal, All the params will be wrapped in a dict named `properties`.

        :params int amount: The amount of deal  \n
        :params str closedate: The close time of deal   \n
        :params str dealname: The name of deal    \n
        :params str dealstage: The stage of deal   \n
        :params int hubspot_owner_id: The id of hubspot owner    \n
        :params str pipeline: The pipeline of deal    \n
        :return: Returns a newly created deal.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.hubspot_service.create_deal(payload=serializer.data)
        if "associations" in request.data:
            payload = {
                "emails": request.data.get('associations', {}).get("emails", []),
                "deal_id": response.get("data").get("id")
            }
            self.hubspot_service.create_deal_contact_association(payload=payload)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['delete'], url_path='deals/remove')
    def remove_deal(self, request, pk):
        """
        To delete a deal

        :param str dealId:  HubSpot deal id to delete the deal. \n
        :return: Removes the deal from hubspot and returns no content.      
        """

        response = self.hubspot_service.remove_deal(dealId=pk)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['get'], url_path='deals/single')
    def single_deal(self, request, pk):
        """
        To retrieve a deal

        :path_params str dealId:  HubSpot deal id to retrieve the deal
        :query_params(optional):  properties(array), propertiesWithHistory(array),
         associations(array), archived(bool) idProperty(string)\n
        :return: Returns a deal object with properties.       
        """

        response = self.hubspot_service.single_deal(dealId=pk, query_params=request.query_params)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='deals/associations/create')
    def create_deal_association(self, request):
        """
        To create a deal association

        :params int dealId: Id of the deal \n
        :params list emails: List of emails \n
        :return: Returns a newly created deal association.
        """

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.hubspot_service.create_deal_contact_association(payload=serializer.data)
        resp = {
            "result": "success" if response else "failure"
        }
        return Response(data=resp, status=200)

    @action(detail=False, methods=['get'], url_path='tickets/list')
    def ticket_list(self, request):
        """
        To get all the tickets
        
        :query_params(optional): limit(int32), after(string), properties(array), propertiesWithHistory(array),
         associations(array), archived(bool) \n
        :return: Returns a list of HobSpot tickets.
        """

        response = self.hubspot_service.ticket_list(query_params=request.query_params)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='tickets/create')
    def create_ticket(self, request):
        """
        To create a ticket. All the params will be wrapped in a dict named `properties`

        :params str hs_pipeline: The hs pipeline of ticket \n
        :params str hs_pipeline_stage: The stage hs pipeline of ticket \n
        :params str hs_ticket_priority: The priority hs ticket \n
        :params int hubspot_owner_id: The owner id of hubspot \n
        :params str subject: The subject of ticket \n
        :params str content: The content of ticket \n
        :return: Returns a newly created ticket object.
        """

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.hubspot_service.create_ticket(payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['delete'], url_path='tickets/remove')
    def remove_ticket(self, request, pk):
        """
        To delete a ticket

        :param str ticketId:  HubSpot ticket id to delete the ticket. \n
        :return: Removes the ticket from hubspot and returns no content.      
        """
        response = self.hubspot_service.remove_ticket(ticketId=pk)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['get'], url_path='tickets/single')
    def single_ticket(self, request, pk):
        """
        To retrieve a ticket
        
        :path_param str ticketId:  HubSpot ticket id to retrieve the ticket
        :query_params(optional):  properties(array), propertiesWithHistory(array),
            associations(array), archived(bool) idProperty(string)\n
        :return: Returns a ticket object containing ticket detail.       
        """

        response = self.hubspot_service.single_ticket(ticketId=pk, query_params=request.query_params)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['put'], url_path='ticket/associations/(?P<toObjectType>[A-Za-z]*)/('
                                                   '?P<toObjectId>[A-Za-z0-9]*)/create')
    def create_ticket_association(self, request, pk, toObjectType, toObjectId):
        """
        To associate the ticket with other CRM objects \n
        :path_params str ticketId: HubSpot ticket id to create association of the deal. \n
        :path_params str toObjectType: HubSpot object type to create association \n
        :path_params str toObjectId: HubSpot to object id to create association \n
        :body_params associationCategory: Hubspot association category for association \n
        :body_params associationTypeId: Hubspot association type id for association \n
        :return: Returns a ticket associated with other HubSpot objects.
        """

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.hubspot_service.create_ticket_association(ticketId=pk, toObjectType=toObjectType,
                                                                  toObjectId=toObjectId, payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['get'], url_path='ticket/associations/(?P<toObjectType>[A-Za-z]*)/list')
    def ticket_association_list(self, request, pk, toObjectType):
        """
        To get a ticket associated with other CRM objects

        :path_param str ticketId: HubSpot ticket id associated with a CRM object \n
        :path_param str toObjectType: Type of the CRM object to with ticket is being associated \n
        :query_params(optional): limit(int32), after(string) \n
        :return: Returns a ticket associated with other HubSpot objects.
        """
        response = self.hubspot_service.ticket_association_list(ticketId=pk, toObjectType=toObjectType,
                                                                query_params=request.query_params)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['get'], url_path='contact/deals/list')
    def contact_deals_association_list(self, request, pk):
        """
        To get a contact associated with HubSpot deals

        :path_param str contactId: HubSpot contact id associated with CRM deals objects \n
        :query_params(optional): limit(int32), after(string) \n
        :return: Returns a contact associated with HubSpot deals.
        """
        response = self.hubspot_service.contact_deals_association_list(contactId=pk, query_params=request.query_params)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['get'], url_path='meeting/contacts/list')
    def meeting_contacts_association_list(self, request, pk):
        """
        To get a meeting associated with other HubSpot contacts 
        
        :path_param str meetingId: HubSpot meeting id associated with CRM contact objects \n
        :query_params(optional): limit(int32), after(string) \n
        :return: Returns a meeting associated with other HubSpot contacts.
        """
        response = self.hubspot_service.meeting_contact_association_list(meetingId=pk,
                                                                         query_params=request.query_params)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='events/create')
    def create_event(self, request):

        """
        To create an event. All the params will be wrapped in a dict named `properties`

        :param str eventName: The name of event. \n
        :param str eventType: The type of event. \n
        :param str startDateTime: The start date & time of event. \n
        :param str endDateTime: The end date & time of event. \n
        :param str eventOrganizer: The Organizer of event. \n
        :param str eventDescription: The description of event. \n
        :param str eventUrl: The url of event. \n
        :param bool eventCancelled: The status of event. \n
        :param str externalAccountId: The external account id. \n
        :param str externalEventId
        :return: Returns a newly created event.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.hubspot_service.create_event(payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='webhook')
    def webhook(self, request):
        """
        This method will be used while creating a webhook.This method will be called every time when your subscribed hubspot events triggered.
        """
        response = self.hubspot_service.webhook(data=request.data)
        return Response(data=response, status=status.HTTP_200_OK)
