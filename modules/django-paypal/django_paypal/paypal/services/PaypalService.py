import base64
import json
import requests


class PaypalBase:
    def __init__(self, base_url, client_id, client_secrets):
        self.PAYPAL_BASE_URL = base_url
        self.PAYPAL_CLIENT_ID = client_id
        self.PAYPAL_CLIENT_SECRETS = client_secrets
        self.auth = {}

    def basic_auth(self, client_id, client_secret):
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
            return None
        except Exception as e:
            return e.body.decode('utf8')

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

    def _api_call(self, request_type, url, headers=None, payload=None):

        if not self.auth:
            auth = self.get_auth_token()
            if auth:
                self.auth = auth
                headers.update({"Authorization": f"{auth.get('token_type')} {auth.get('access_token')}"})
        response = requests.request(request_type, url, headers=headers, data=payload)
        if 200 <= response.status_code <= 300:
            return {"data": response.json(), "status_code": response.status_code, "success": True}
        return {"data": response.content, "status_code": response.status_code, "success": False}


class PaypalService(PaypalBase):

    def create_order(self, order_details):
        try:
            url = f'{self.PAYPAL_BASE_URL}/v2/checkout/orders'
            payload = json.dumps(order_details)
            response = self._api_call(request_type="POST", url=url, payload=payload,
                                      headers=self.get_header()
                                      )
            return response
        except Exception as e:
            return {'success': False, 'Message': e.body.decode('utf8')}

    def show_order_details(self, order_id):
        try:
            url = f'{self.PAYPAL_BASE_URL}/v2/checkout/orders/{order_id}'
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(request_type="GET"))
            return response
        except Exception as e:
            return {'success': False, 'Message': e.body.decode('utf8')}

    def authorize_payment_for_order(self, order_id):
        try:
            url = f'{self.PAYPAL_BASE_URL}/v2/checkout/orders/{order_id}/authorize'
            response = self._api_call(request_type="POST", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return {'success': False, 'Message': e.body.decode('utf8')}

    def capture_payment_for_order(self, order_id):
        try:
            url = f'{self.PAYPAL_BASE_URL}/v2/checkout/orders/{order_id}/capture'
            response = self._api_call(request_type="POST", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return {'success': False, 'Message': e.body.decode('utf8')}

    def show_authorized_payment(self, authorization_id):
        try:
            url = f'{self.PAYPAL_BASE_URL}/v2/payments/authorizations/{authorization_id}'
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(request_type="GET"))
            return response
        except Exception as e:
            return {'success': False, 'Message': e.body.decode('utf8')}

    def capture_authorized_payment(self, authorization_id, order_detail):
        try:
            url = f'{self.PAYPAL_BASE_URL}/v2/payments/authorizations/{authorization_id}/capture'
            payload = json.dumps(order_detail)
            response = self._api_call(request_type="POST", url=url, payload=payload,
                                      headers=self.get_header()
                                      )
            return response
        except Exception as e:
            return {'success': False, 'Message': e.body.decode('utf8')}

    def show_captured_payment(self, capture_id):
        try:
            url = f'{self.PAYPAL_BASE_URL}/v2/payments/captures/{capture_id}'
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(request_type="GET"))
            return response
        except Exception as e:
            return {'success': False, 'Message': e.body.decode('utf8')}

    def refund_capture_payment(self, capture_id, order_detail):
        try:
            url = f'{self.PAYPAL_BASE_URL}/v2/payments/captures/{capture_id}/refund'
            payload = json.dumps(order_detail)
            response = self._api_call(request_type="POST", url=url, payload=payload,
                                      headers=self.get_header(request_type="POST")
                                      )
            return response
        except Exception as e:
            return {'success': False, 'Message': e.body.decode('utf8')}

    def show_refund_details(self, refund_id):
        try:
            url = f'{self.PAYPAL_BASE_URL}/v2/payments/refunds/{refund_id}'
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(request_type="GET"))
            return response
        except Exception as e:
            return {'success': False, 'Message': e.body.decode('utf8')}

    def create_product(self, product_detail):
        try:
            url = f'{self.PAYPAL_BASE_URL}/v1/catalogs/products'
            payload = json.dumps(product_detail)
            response = self._api_call(request_type="POST", url=url,
                                      payload=payload,
                                      headers=self.get_header()
                                      )
            return response
        except Exception as e:
            return {'success': False, 'Message': e.body.decode('utf8')}

    def show_product_details(self, product_id):
        try:
            url = f'{self.PAYPAL_BASE_URL}/v1/catalogs/products/{product_id}'
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(request_type="GET"))
            return response
        except Exception as e:
            return {'success': False, 'Message': e.body.decode('utf8')}

    def create_plan(self, plan_detail):
        try:
            url = f'{self.PAYPAL_BASE_URL}/v1/billing/plans'
            payload = json.dumps(plan_detail)
            response = self._api_call(request_type="POST", url=url,
                                      payload=payload,
                                      headers=self.get_header()
                                      )
            return response
        except Exception as e:
            return {'success': False, 'Message': e.body.decode('utf8')}

    def show_plans_details(self, plan_id):
        try:
            url = f'{self.PAYPAL_BASE_URL}/v1/billing/plans/{plan_id}'
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(request_type="GET"))
            return response
        except Exception as e:
            return {'success': False, 'Message': e.body.decode('utf8')}

    def deactivate_plan(self, plan_id):
        try:
            url = f'{self.PAYPAL_BASE_URL}/v1/billing/plans/{plan_id}/deactivate'
            response = self._api_call(request_type="POST", url=url,
                                      headers=self.get_header()
                                      )
            return response
        except Exception as e:
            return {'success': False, 'Message': e.body.decode('utf8')}

    def activate_plan(self, plan_id):
        try:
            url = f'{self.PAYPAL_BASE_URL}/v1/billing/plans/{plan_id}/activate'
            response = self._api_call(request_type="POST", url=url,
                                      headers=self.get_header()
                                      )
            return response
        except Exception as e:
            return {'success': False, 'Message': e.body.decode('utf8')}

    def create_subscription(self, subscription_details):
        try:
            url = f'{self.PAYPAL_BASE_URL}/v1/billing/subscriptions'
            payload = json.dumps(subscription_details)
            response = self._api_call(request_type="POST", url=url,
                                      payload=payload,
                                      headers=self.get_header()
                                      )
            return response
        except Exception as e:
            return {'success': False, 'Message': e.body.decode('utf8')}

    def show_subscription_details(self, subscription_id):
        try:
            url = f'{self.PAYPAL_BASE_URL}/v1/billing/subscriptions/{subscription_id}'
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(request_type="GET"))
            return response
        except Exception as e:
            return {'success': False, 'Message': e.body.decode('utf8')}

    def suspend_subscription(self, subscription_id):
        try:
            url = f'{self.PAYPAL_BASE_URL}/v1/billing/subscriptions/{subscription_id}/suspend'
            response = self._api_call(request_type="POST", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return {'success': False, 'Message': e.body.decode('utf8')}

    def activate_subscription(self, subscription_id):
        try:
            url = f'{self.PAYPAL_BASE_URL}/v1/billing/subscriptions/{subscription_id}/activate'
            response = self._api_call(request_type="POST", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return {'success': False, 'Message': e.body.decode('utf8')}

    def cancel_subscription(self, subscription_id, reason):
        try:
            url = f'{self.PAYPAL_BASE_URL}/v1/billing/subscriptions/{subscription_id}/activate'
            payload = json.dumps(reason)
            response = self._api_call(request_type="POST", url=url, payload=payload, headers=self.get_header())
            return response
        except Exception as e:
            return {'success': False, 'Message': e.body.decode('utf8')}

    def capture_authorized_payment_on_subscription(self, subscription_id, details):
        try:
            url = f'{self.PAYPAL_BASE_URL}/v1/billing/subscriptions/{subscription_id}/capture'
            payload = json.dumps(details)
            response = self._api_call(request_type="POST", url=url, payload=payload, headers=self.get_header())
            return response
        except Exception as e:
            return {'success': False, 'Message': e.body.decode('utf8')}
        