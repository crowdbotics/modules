import base64
import json
import os

import requests


class PaypalBase:
    def __init__(self):
        self.PAYPAL_BASE_URL = os.getenv('PAYPAL_BASE_URL', "")
        self.PAYPAL_CLIENT_ID = os.getenv('PAYPAL_CLIENT_ID', "")
        self.PAYPAL_CLIENT_SECRETS = os.getenv('PAYPAL_CLIENT_SECRETS', "")
        self.auth = {}

    @staticmethod
    def basic_auth(client_id, client_secret):
        """
        Find basic auth, and returns base64 encoded
        """
        credentials = "%s:%s" % (client_id, client_secret)
        return base64.b64encode(credentials.encode('utf-8')).decode('utf-8').replace("\n", "")

    def get_auth_token(self):
        try:
            url = f'{self.PAYPAL_BASE_URL}/v1/oauth2/token'
            payload = 'grant_type=client_credentials&ignoreCache=true&return_authn_schemes=' \
                      'false&return_client_metadata=false&return_unconsented_scopes=false'

            basic_auth_token = self.basic_auth(client_id=self.PAYPAL_CLIENT_ID,
                                               client_secret=self.PAYPAL_CLIENT_SECRETS
                                               )
            headers = {
                'Authorization': f'Basic {basic_auth_token}',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
            response = requests.post(url, headers=headers, data=payload)
            if response.status_code == 200:
                return response.json()
            return {}
        except Exception as e:
            return e.args

    def get_header(self, request_type=None, request_id=None):
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'{self.auth.get("token_type", "")} {self.auth.get("access_token", "")}',
            'Prefer': 'return=representation',
        }
        if request_id:
            headers.update({'PayPal-Request-Id': request_id})
        if request_type == 'GET':
            headers.pop("Content-Type")
            headers.pop("Prefer")
        return headers

    def _api_call(self, request_type, action_url, headers=None, payload=None):
        try:
            if not self.auth:
                auth = self.get_auth_token()
                if auth:
                    self.auth = auth
                    headers.update({"Authorization": f"{auth.get('token_type')} {auth.get('access_token')}"})
            response = requests.request(request_type, f"{self.PAYPAL_BASE_URL}{action_url}", headers=headers,
                                        data=payload)
            response.raise_for_status()
            if response.status_code == 204:
                return {"data": response, "status_code": response.status_code, "success": True}
            return {"data": response.json(), "status_code": response.status_code, "success": True}

        except requests.exceptions.RequestException as e:
            return {"data": e.response.json(), "status_code": e.response.status_code}


class PaypalService(PaypalBase):

    def create_order(self, order_details):
        try:
            url = '/v2/checkout/orders'
            payload = json.dumps(order_details)
            response = self._api_call(request_type="POST", action_url=url, payload=payload,
                                      headers=self.get_header()
                                      )
            return response
        except Exception as e:
            return e

    def confirm_order(self, order_id, card_data):
        try:
            url = f'/v2/checkout/orders/{order_id}/confirm-payment-source'
            payload = json.dumps(card_data)
            response = self._api_call(request_type="POST", action_url=url, payload=payload,
                                      headers=self.get_header()
                                      )
            return response
        except Exception as e:
            return e

    def show_order_details(self, order_id):
        try:
            url = f'/v2/checkout/orders/{order_id}'
            response = self._api_call(request_type="GET", action_url=url, headers=self.get_header(request_type="GET"))
            return response
        except Exception as e:
            return e

    def authorize_payment_for_order(self, order_id):
        try:
            url = f'/v2/checkout/orders/{order_id}/authorize'
            response = self._api_call(request_type="POST", action_url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def capture_payment_for_order(self, order_id):
        try:
            url = f'/v2/checkout/orders/{order_id}/capture'
            response = self._api_call(request_type="POST", action_url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def show_authorized_payment(self, authorization_id):
        try:
            url = f'/v2/payments/authorizations/{authorization_id}'
            response = self._api_call(request_type="GET", action_url=url, headers=self.get_header(request_type="GET"))
            return response
        except Exception as e:
            return e

    def capture_authorized_payment(self, authorization_id, order_detail):
        try:
            url = f'/v2/payments/authorizations/{authorization_id}/capture'
            payload = json.dumps(order_detail)
            response = self._api_call(request_type="POST", action_url=url, payload=payload,
                                      headers=self.get_header()
                                      )
            return response
        except Exception as e:
            return e

    def show_captured_payment(self, capture_id):
        try:
            url = f'/v2/payments/captures/{capture_id}'
            response = self._api_call(request_type="GET", action_url=url, headers=self.get_header(request_type="GET"))
            return response
        except Exception as e:
            return e

    def refund_capture_payment(self, capture_id, order_detail):
        try:
            url = f'/v2/payments/captures/{capture_id}/refund'
            payload = json.dumps(order_detail)
            response = self._api_call(request_type="POST", action_url=url, payload=payload,
                                      headers=self.get_header(request_type="POST")
                                      )
            return response
        except Exception as e:
            return e

    def show_refund_details(self, refund_id):
        try:
            url = f'/v2/payments/refunds/{refund_id}'
            response = self._api_call(request_type="GET", action_url=url, headers=self.get_header(request_type="GET"))
            return response
        except Exception as e:
            return e

    def create_product(self, product_detail):
        try:
            url = f'/v1/catalogs/products'
            payload = json.dumps(product_detail)
            response = self._api_call(request_type="POST", action_url=url,
                                      payload=payload,
                                      headers=self.get_header()
                                      )
            return response
        except Exception as e:
            return e

    def show_product_details(self, product_id):
        try:
            url = f'/v1/catalogs/products/{product_id}'
            response = self._api_call(request_type="GET", action_url=url, headers=self.get_header(request_type="GET"))
            return response
        except Exception as e:
            return e

    def create_plan(self, plan_detail):
        try:
            url = '/v1/billing/plans'
            payload = json.dumps(plan_detail)
            response = self._api_call(request_type="POST", action_url=url,
                                      payload=payload,
                                      headers=self.get_header()
                                      )
            return response
        except Exception as e:
            return e

    def show_plans_details(self, plan_id):
        try:
            url = f'/v1/billing/plans/{plan_id}'
            response = self._api_call(request_type="GET", action_url=url, headers=self.get_header(request_type="GET"))
            return response
        except Exception as e:
            return e

    def deactivate_plan(self, plan_id):
        try:
            url = f'/v1/billing/plans/{plan_id}/deactivate'
            response = self._api_call(request_type="POST", action_url=url,
                                      headers=self.get_header()
                                      )
            return response
        except Exception as e:
            return e

    def activate_plan(self, plan_id):
        try:
            url = f'/v1/billing/plans/{plan_id}/activate'
            response = self._api_call(request_type="POST", action_url=url,
                                      headers=self.get_header()
                                      )
            return response
        except Exception as e:
            return e

    def create_subscription(self, subscription_details):
        try:
            url = '/v1/billing/subscriptions'
            payload = json.dumps(subscription_details)
            response = self._api_call(request_type="POST", action_url=url,
                                      payload=payload,
                                      headers=self.get_header()
                                      )
            return response
        except Exception as e:
            return e

    def show_subscription_details(self, subscription_id):
        try:
            url = f'/v1/billing/subscriptions/{subscription_id}'
            response = self._api_call(request_type="GET", action_url=url, headers=self.get_header(request_type="GET"))
            return response
        except Exception as e:
            return e

    def suspend_subscription(self, subscription_id):
        try:
            url = f'/v1/billing/subscriptions/{subscription_id}/suspend'
            response = self._api_call(request_type="POST", action_url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def activate_subscription(self, subscription_id):
        try:
            url = f'/v1/billing/subscriptions/{subscription_id}/activate'
            response = self._api_call(request_type="POST", action_url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def cancel_subscription(self, subscription_id, reason):
        try:
            url = f'/v1/billing/subscriptions/{subscription_id}/activate'
            payload = json.dumps(reason)
            response = self._api_call(request_type="POST", action_url=url, payload=payload, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def capture_authorized_payment_on_subscription(self, subscription_id, details):
        try:
            url = f'/v1/billing/subscriptions/{subscription_id}/capture'
            payload = json.dumps(details)
            response = self._api_call(request_type="POST", action_url=url, payload=payload, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def generate_invoice_number(self):
        try:
            url = f'/v2/invoicing/generate-next-invoice-number'
            response = self._api_call(request_type="POST", action_url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def create_draft_invoice(self, invoice_details):
        try:
            url = '/v2/invoicing/invoices'
            payload = json.dumps(invoice_details)
            response = self._api_call(request_type="POST", action_url=url, payload=payload, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def show_invoice_details(self, invoice_id):
        try:
            url = f'/v2/invoicing/invoices/{invoice_id}'
            response = self._api_call(request_type="GET", action_url=url, headers=self.get_header(request_type="GET"))
            return response
        except Exception as e:
            return e

    def send_invoice(self, invoice_id, message_body):
        try:
            url = f'/v2/invoicing/invoices/{invoice_id}/send'
            payload = json.dumps(message_body)
            response = self._api_call(request_type="POST", action_url=url, payload=payload, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def list_disputes(self):
        try:
            url = '/v1/customer/disputes'
            response = self._api_call(request_type="GET",
                                      action_url=url,
                                      headers=self.get_header(request_type="GET")
                                      )
            return response
        except Exception as e:
            return e

    def show_dispute_details(self, dispute_id):
        try:
            url = f'/v1/customer/disputes/{dispute_id}'
            response = self._api_call(request_type="GET",
                                      action_url=url,
                                      headers=self.get_header(request_type="GET")
                                      )
            return response
        except Exception as e:
            return e

    def accept_claim(self, dispute_id, message):
        try:
            url = f'/v1/customer/disputes/{dispute_id}/accept-claim'
            payload = json.dumps(message)
            response = self._api_call(request_type="POST", action_url=url,
                                      payload=payload,
                                      headers=self.get_header()
                                      )
            return response
        except Exception as e:
            return e

    def create_web_hook(self, body):
        try:
            url = '/v1/notifications/webhooks'
            payload = json.dumps(body)
            response = self._api_call(request_type="POST", action_url=url,
                                      payload=payload,
                                      headers=self.get_header()
                                      )
            return response
        except Exception as e:
            return e
