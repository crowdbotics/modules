import os

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .services.PaypalService import PaypalService


class PaypalViewSet(viewsets.GenericViewSet):
    paypal_service = PaypalService(
        base_url=os.getenv('PAYPAL_BASE_URL', ""),
        client_id=os.getenv('PAYPAL_CLIENT_ID', ""),
        client_secrets=os.getenv('PAYPAL_CLIENT_SECRETS', "")
    )

    @action(detail=False, methods=['post'], url_path='create-order')
    def create_order(self, request):
        data = request.data
        response = self.paypal_service.create_order(order_details=data)
        return Response(data=response, status=response.status_code)

    @action(detail=False, methods=['get'], url_path='get-captured-payment')
    def get_captured_payment(self, request):
        capture_id = request.query_params.get('capture_id')
        response = self.paypal_service.show_captured_payment(capture_id=capture_id)
        return Response(data=response, status=response.status_code)
    