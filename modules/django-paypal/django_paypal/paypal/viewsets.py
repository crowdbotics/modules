from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .services.paypal import PaypalService


class PaypalViewSet(viewsets.GenericViewSet):
    """
    PayPal ViewSet Set will take "PAYPAL_BASE_URL", "PAYPAL_CLIENT_ID", "PAYPAL_CLIENT_SECRETS" to perform
    authenticate in PayPal Service Class and provide following functionality:
    - create_order: Creates an order
    - get_order_details : Shows details for an order, by ID.
    - authorize_payment_for_order: Authorizes payment for an order.
    To successfully authorize payment for an order, the buyer must first approve the order.
    - capture_payment_for_order: Captures payment for an order.
    To successfully capture payment for an order, the buyer must first approve the order.
    - get_authorized_payment: Shows details for an authorized payment, by ID.
    - capture_authorized_payment: Captures an authorized payment, by ID.
    - get_captured_payment: Shows details for a captured payment, by ID.
    - refund_capture_payment: Refunds a captured payment, by ID.
    For a full refund, include an empty payload in the JSON request body.
    - get_refund_details: Shows details for a refund, by ID.
    - create_product: Creates a product.
    - get_product_details: Shows details for a product, by ID.
    - create_plan: Creates a plan that defines pricing and billing cycle details for subscriptions.
    - get_plan_details: Shows details for a plan, by ID.
    - deactivate_plan: Deactivates a plan, by ID.
    - activate_plan: Activates a plan, by ID.
    - create_subscription: Creates a subscription.
    - get_subscription_details: Shows details for a subscription, by ID.
    - suspend_subscription: Suspends the subscription.
    - activate_subscription: Activates the subscription.
    - cancel_subscription: Cancels the subscription.
    - capture_authorized_payment_on_subscription: Captures an authorized payment from the
    subscriber on the subscription.
    - generate_invoice_number: Generates the next invoice number that is available to the merchant
    - create_draft_invoice: Creates a draft invoice. To move the invoice from a
    draft to payable state, you must send the invoice.
    - get_invoice_details: Shows details for an invoice, by ID.
    - send_invoice: Sends or schedules an invoice, by ID, to be sent to a customer.
    - list_disputes: Lists disputes with a summary set of details, which shows
    the dispute_id, reason, status, dispute_state, dispute_life_cycle_stage, dispute_channel,
    dispute_amount, create_time and update_time fields.
    - get_dispute_details : Shows details for a dispute, by ID.
    - accept_clam: Accepts liability for a claim, by ID. When you accept liability for a claim, the dispute closes in
    the customer’s favor and PayPal automatically refunds money to the customer from the merchant's account
    - create_web_hook: Subscribes your webhook listener to events.
    """
    paypal_service = PaypalService()

    @action(detail=True, methods=['post'], url_path='confirm-order')
    def confirm_order(self, request, pk):
        """
        create_order: Creates an order
        :body_params: For details about request body(intent, purchased_unit, amount, ....) visit serializers or
        the given link https://developer.paypal.com/docs/api/orders/v2/#orders_create
        :return : Order ID and details
        """

        data = request.data
        response = self.paypal_service.confirm_order(order_id=pk, card_data=data)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='create-order')
    def create_order(self, request):
        """
        create_order: Creates an order
        :body_params: For details about request body(intent, purchased_unit, amount, ....) visit serializers or
        the given link https://developer.paypal.com/docs/api/orders/v2/#orders_create
        :return : Order ID and details
        """

        data = request.data
        response = self.paypal_service.create_order(order_details=data)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=True, methods=['get'], url_path='get-order-details')
    def get_order_details(self, request, pk):
        """
        Shows details for an order by ID.
        :path_param str pk: Order ID (required)
        :return : specific order details
        """

        response = self.paypal_service.show_order_details(order_id=pk)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=True, methods=['post'], url_path='authorize-payment-for-order')
    def authorize_payment_for_order(self, request, pk):
        """
        Authorizes payment for an order. To successfully authorize payment for an order, the buyer must
        first approve the order.
        :path_param str pk: Order ID (required)
        :return : Authorized payment for order with ID and details
        """

        response = self.paypal_service.authorize_payment_for_order(order_id=pk)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=True, methods=['post'], url_path='capture-payment-for-order')
    def capture_payment_for_order(self, request, pk):
        """
        Captures payment for an order. To successfully capture payment for an order, the buyer must first approve
        the order.
        :path_param str pk: Order ID (required)
        :return : Captured payment for order with ID and details
        """

        response = self.paypal_service.capture_payment_for_order(order_id=pk)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=True, methods=['get'], url_path='get-authorized-payment')
    def get_authorized_payment(self, request, pk):
        """
        Shows details for an authorized payment, by ID
        :path_param str pk: Authorization ID (required)
        :return : specific authorized payment with ID and details
        """

        response = self.paypal_service.show_authorized_payment(authorization_id=pk)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=True, methods=['post'], url_path='capture-authorized-payment')
    def capture_authorized_payment(self, request, pk):
        """
        Captures an authorized payment by ID.
        :path_param str pk: Authorization ID (required)
        :body_params : For details about request body(amount, invoice_id, ...) visit serializers or the given link below
        https://developer.paypal.com/docs/api/payments/v2/#authorizations_capture
        :return : captured authorized payment with ID and details
        """

        details = request.data
        response = self.paypal_service.capture_authorized_payment(order_detail=details,
                                                                  authorization_id=pk)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=True, methods=['get'], url_path='get-captured-payment')
    def get_captured_payment(self, request, pk):
        """
        Shows details for a captured payment, by ID.
        :path_param str pk: Capture ID (required)
        :return : Specific captured payment details
        """

        response = self.paypal_service.show_captured_payment(capture_id=pk)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=True, methods=['post'], url_path='refund-capture-payment')
    def refund_capture_payment(self, request, pk):
        """
        Refunds a captured payment, by ID. For a full refund, include an empty payload in the JSON request body.
        :body_params : For more details about request body(amount) visit serializers or
        the given link below.
        https://developer.paypal.com/docs/api/payments/v2/#captures_refund
        :path_param str pk: Capture ID (required)
        :return : Refund captured payment with ID and details
        """

        details = request.data
        response = self.paypal_service.refund_capture_payment(capture_id=pk, order_detail=details)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=True, methods=['get'], url_path='get-refund-details')
    def get_refund_details(self, request, pk):
        """
        Shows details for a refund, by ID.
        :path_param str pk: Refund ID (required)
        :return : Specific refund details
        """

        response = self.paypal_service.show_refund_details(refund_id=pk)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='create-product')
    def create_product(self, request):
        """
        Create a product
        :body_params : For details about request body(name, description, category, ...) visit serializers or
        the given link https://developer.paypal.com/docs/api/catalog-products/v1/#products_create
        :return : Created product with ID and details
        """

        product_data = request.data
        response = self.paypal_service.create_product(product_detail=product_data)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=True, methods=['get'], url_path='get-product-details')
    def get_product_details(self, request, pk):
        """
        Shows details for a product by ID
        :path_param str pk: Product ID (required)
        :return : Specific product details
        """

        response = self.paypal_service.show_product_details(product_id=pk)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='create-plan')
    def create_plan(self, request):
        """
        Creates a plan that defines pricing and billing cycle details for subscriptions.
        :body_params : For details about request body(product_id, name, ....) visit serializers or the given link below
        https://developer.paypal.com/docs/api/subscriptions/v1/#plans_create
        :return : Created plan with ID and details
        """

        plan_data = request.data
        response = self.paypal_service.create_plan(plan_detail=plan_data)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=True, methods=['get'], url_path='get-plan-details')
    def get_plan_details(self, request, pk):
        """
        Shows details for a plan, by ID.
        :path_param str pk: Plan ID (required)
        :return : Specific plan details
        """

        response = self.paypal_service.show_plans_details(plan_id=pk)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=True, methods=['post'], url_path='deactivate-plan')
    def deactivate_plan(self, request, pk):
        """
        Deactivates a plan by ID.
        :path_param str pk: Plan ID (required)
        :return : 204 no content
        """

        response = self.paypal_service.deactivate_plan(plan_id=pk)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=True, methods=['post'], url_path='activate-plan')
    def activate_plan(self, request, pk):
        """
         Activates a plan, by ID.
        :path_param str pk: Plan ID (required)
        :return : 204 no content
        """

        response = self.paypal_service.activate_plan(plan_id=pk)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='create-subscription')
    def create_subscription(self, request):
        """
        Creates a subscription.
        :body_params : For details about request body(plan_id, start_time, shipping_amount, ...) visit serializers or
        the given link https://developer.paypal.com/docs/api/subscriptions/v1/#subscriptions_create
        :return : Created subscription with ID and details
        """
        subscription_data = request.data
        response = self.paypal_service.create_subscription(subscription_details=subscription_data)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=True, methods=['get'], url_path='get-subscription-details')
    def get_subscription_details(self, request, pk):
        """
        Shows details for a subscription, by ID.
        :path_param str pk: Subscription ID (required)
        :return : Specific subscription details
        """

        response = self.paypal_service.show_subscription_details(subscription_id=pk)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=True, methods=['post'], url_path='suspend-subscription')
    def suspend_subscription(self, request, pk):
        """
        Suspends the subscription.
        :path_param str pk: Subscription ID (required)
        :return : 204 no content
        """

        response = self.paypal_service.suspend_subscription(subscription_id=pk)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=True, methods=['post'], url_path='activate-subscription')
    def activate_subscription(self, request, pk):
        """
        Activates the subscription.
        :path_param str pk: Subscription ID (required)
        :return : 204 no content
        """

        response = self.paypal_service.activate_subscription(subscription_id=pk)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=True, methods=['post'], url_path='cancel-subscription')
    def cancel_subscription(self, request, pk):
        """
        Cancels the subscription. To cancel the subscription you must suspend it first
        :path_param str pk: Subscription ID (required)
        :return : 204 no content
        """

        reason = request.data
        response = self.paypal_service.cancel_subscription(subscription_id=pk, reason=reason)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=True, methods=['post'], url_path='capture-authorized-payment-on-subscription')
    def capture_authorized_payment_on_subscription(self, request, pk):
        """
        Captures an authorized payment from the subscriber on the subscription.
        :body_params : For details about request body(note, capture_type, amount, ...) visit serializers or
        the given link https://developer.paypal.com/docs/api/subscriptions/v1/#subscriptions_capture
        :path_param str pk: Subscription ID (required)
        :return : 202 accepted
        """

        data = request.data
        response = self.paypal_service. \
            capture_authorized_payment_on_subscription(subscription_id=pk, details=data)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='generate-invoice-number')
    def generate_invoice_number(self, request):
        """
        Generates the next invoice number that is available to the merchant
        :return : Invoice Number
        """

        response = self.paypal_service.generate_invoice_number()
        return Response(data=response, status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='create-draft-invoice')
    def create_draft_invoice(self, request):
        """
        Creates a draft invoice. To move the invoice from a draft to payable state, you must send the invoice
        :body_params : For details about request body(detail, business, amount,...) visit serializers or
        the given link https://developer.paypal.com/docs/api/invoicing/v2/#invoices_create
        :return : Created draft invoice with ID and details
        """

        body = request.data
        response = self.paypal_service.create_draft_invoice(invoice_details=body)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=True, methods=['get'], url_path='get-invoice-details')
    def get_invoice_details(self, request, pk):
        """
        Shows details for an invoice, by ID.
        :path_aram str pk: Invoice ID (required)
        :return : Specific invoice details

        """

        response = self.paypal_service.show_invoice_details(invoice_id=pk)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=True, methods=['post'], url_path='send-invoice')
    def send_invoice(self, request, pk):
        """
        Sends or schedules an invoice, by ID, to be sent to a customer.
        :body_params : For details about request body(send_to_invoicer) visit serializers or the given link below
        https://developer.paypal.com/docs/api/invoicing/v2/#invoices_send
        :return : 202 accepted
        """
        body = request.data
        response = self.paypal_service.send_invoice(message_body=body, invoice_id=pk)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='list-disputes')
    def list_disputes(self, request):
        """
        Lists disputes with a summary set of details, which shows the dispute_id, reason, status, dispute_state,
        dispute_life_cycle_stage, dispute_channel, dispute_amount, create_time and update_time fields
        :return : List of all disputes
        """

        response = self.paypal_service.list_disputes()
        return Response(data=response, status=response.get("status_code"))

    @action(detail=True, methods=['get'], url_path='get-dispute-details')
    def get_dispute_details(self, request, pk):
        """
        Shows details for a dispute, by ID.
        :param str pk: Dispute ID (required)
        :return : Specific dispute details
        """
        response = self.paypal_service.show_dispute_details(dispute_id=pk)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=True, methods=['post'], url_path='accept-claim')
    def accept_clam(self, request, pk):
        """
        Accepts liability for a claim, by ID. When you accept liability for a claim, the dispute closes in the
        customer’s favor and PayPal automatically refunds money to the customer from the merchant's account.
        :body_params:  For details about request body(note) visit serializers or the given link below
        https://developer.paypal.com/docs/api/customer-disputes/v1/#disputes-actions_accept-claim
        :return : Accepted clam with Links and details
        """

        message = request.data
        response = self.paypal_service.accept_claim(dispute_id=pk, message=message)
        return Response(data=response, status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='create-web-hook')
    def create_web_hook(self, request):
        """
        Subscribes your webhook listener to events.
        :body_params : For details about request body(URL, event_type, ...) visit serializers or the given link below
        https://developer.paypal.com/docs/api/webhooks/v1/#webhooks_post
        :return : Created webhook ID and details
        """
        message = request.data
        response = self.paypal_service.create_web_hook(body=message)
        return Response(data=response, status=response.get("status_code"))
