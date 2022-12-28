import os

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .services.HubspotService import HubspotService


class HubspotViewSet(viewsets.GenericViewSet):

    hubspot_service = HubspotService(
        base_url=os.getenv('HUBSPOT_BASE_URL', ""),
        grant_type=os.getenv('HUBSPOT_GRANT_TYPE', ""),
        redirect_url=os.getenv('HUBSPOT_REDIRECT_URL', ""),
        client_id=os.getenv('HUBSPOT_CLIENT_ID', ""),
        client_secret=os.getenv('HUBSPOT_CLIENT_SECRET', ""),
        access_token=os.getenv('HUBSPOT_ACCESS_TOKEN', ""),
    )

    @action(detail=False, methods=['get'], url_path='deals-list')
    def deals_list(self, request):
        response = self.hubspot_service.deals_list()
        return Response(data=response.get("data"), status=response.get("status_code"))