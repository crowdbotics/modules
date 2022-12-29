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
        return Response(data=response, status=response.get("status_code"))

    @action(detail=True, methods=['get'], url_path='get-order-details')
    def get_order_details(self, request, pk):
        response = self.paypal_service.show_order_details(order_id=pk)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=True, methods=['post'], url_path='authorize-payment-for-order')
    def authorize_payment_for_order(self, request, pk):
        response = self.paypal_service.authorize_payment_for_order(order_id=pk)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=True, methods=['post'], url_path='capture-payment-for-order')
    def capture_payment_for_order(self, request, pk):
        response = self.paypal_service.capture_payment_for_order(order_id=pk)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=True, methods=['get'], url_path='get-authorized-payment')
    def get_authorized_payment(self, request, pk):
        response = self.paypal_service.show_authorized_payment(authorization_id=pk)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=True, methods=['post'], url_path='capture-authorized-payment')
    def capture_authorized_payment(self, request, pk):
        details = request.data
        response = self.paypal_service.capture_authorized_payment(order_detail=details,
                                                                  authorization_id=pk)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=True, methods=['get'], url_path='get-captured-payment')
    def get_captured_payment(self, request, pk):
        response = self.paypal_service.show_captured_payment(capture_id=pk)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=True, methods=['post'], url_path='refund-capture-payment')
    def refund_capture_payment(self, request, pk):
        details = request.data
        response = self.paypal_service.refund_capture_payment(capture_id=pk, order_detail=details)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=True, methods=['get'], url_path='get-refund-details')
    def get_refund_details(self, request, pk):
        response = self.paypal_service.show_refund_details(refund_id=pk)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='create-product')
    def create_product(self, request):
        product_data = request.data
        response = self.paypal_service.create_product(product_detail=product_data)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=True, methods=['get'], url_path='get-product-details')
    def get_product_details(self, request, pk):
        response = self.paypal_service.show_product_details(product_id=pk)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='create-plan')
    def create_plan(self, request):
        plan_data = request.data
        response = self.paypal_service.create_plan(plan_detail=plan_data)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=True, methods=['get'], url_path='get-plan-details')
    def get_plan_details(self, request, pk):
        response = self.paypal_service.show_plans_details(plan_id=pk)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=True, methods=['post'], url_path='deactivate-plan')
    def deactivate_plan(self, request, pk):
        response = self.paypal_service.deactivate_plan(plan_id=pk)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=True, methods=['post'], url_path='activate-plan')
    def activate_plan(self, request, pk):
        response = self.paypal_service.activate_plan(plan_id=pk)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='create-subscription')
    def create_subscription(self, request):
        subscription_data = request.data
        response = self.paypal_service.create_subscription(subscription_details=subscription_data)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=True, methods=['get'], url_path='get-subscription-details')
    def get_subscription_details(self, request, pk):
        response = self.paypal_service.show_subscription_details(subscription_id=pk)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=True, methods=['post'], url_path='suspend-subscription')
    def suspend_subscription(self, request, pk):
        response = self.paypal_service.suspend_subscription(subscription_id=pk)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=True, methods=['post'], url_path='activate-subscription')
    def activate_subscription(self, request, pk):
        response = self.paypal_service.activate_subscription(subscription_id=pk)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=True, methods=['post'], url_path='cancel-subscription')
    def cancel_subscription(self, request, pk):
        reason = request.data
        response = self.paypal_service.cancel_subscription(subscription_id=pk, reason=reason)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=True, methods=['post'], url_path='capture-authorized-payment-on-subscription')
    def capture_authorized_payment_on_subscription(self, request, pk):
        data = request.data
        response = self.paypal_service. \
            capture_authorized_payment_on_subscription(subscription_id=pk, details=data)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='generate-invoice-number')
    def generate_invoice_number(self, request):
        response = self.paypal_service.generate_invoice_number()
        return Response(data=response, status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='create-draft-invoice')
    def create_draft_invoice(self, request):
        body = request.data
        response = self.paypal_service.create_draft_invoice(invoice_details=body)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=True, methods=['get'], url_path='get-invoice-details')
    def get_invoice_details(self, request, pk):
        response = self.paypal_service.show_invoice_details(invoice_id=pk)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=True, methods=['post'], url_path='send-invoice')
    def send_invoice(self, request, pk):
        body = request.data
        response = self.paypal_service.send_invoice(message_body=body, invoice_id=pk)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='list-disputes')
    def list_disputes(self, request):
        response = self.paypal_service.list_disputes()
        return Response(data=response, status=response.get("status_code"))

    @action(detail=True, methods=['get'], url_path='get-dispute-details')
    def get_dispute_details(self, request, pk):
        response = self.paypal_service.show_dispute_details(dispute_id=pk)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=True, methods=['post'], url_path='accept-claim')
    def accept_clam(self, request, pk):
        message = request.data
        response = self.paypal_service.accept_claim(dispute_id=pk, message=message)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='create-web-hook')
    def create_web_hook(self, request):
        message = request.data
        response = self.paypal_service.create_web_hook(body=message)
        return Response(data=response, status=response.get("status_code"))
