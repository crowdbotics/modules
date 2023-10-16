from unittest import mock

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class SlackTestCases(APITestCase):
    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.confirm_order')
    def test_confirm_order(self, mock_confirm_order):
        response_data = {'data': {
            "id": "5O190127TN364715T",
            "status": "PAYER_ACTION_REQUIRED",
            "payment_source": {
                "paypal": {
                    "name": {
                        "given_name": "John",
                        "surname": "Doe"
                    },
                    "email_address": "customer@example.com"
                }
            },
            "payer": {
                "name": {
                    "given_name": "John",
                    "surname": "Doe"
                },
                "email_address": "customer@example.com"
            },
            "links": [
                {
                    "href": "https://api.paypal.com/v2/checkout/orders/5O190127TN364715T",
                    "rel": "self",
                    "method": "GET"
                },
                {
                    "href": "https://www.paypal.com/checkoutnow?token=5O190127TN364715T",
                    "rel": "payer-action",
                    "method": "GET"
                }
            ]
        }, 'status_code': 201, 'success': True}
        mock_confirm_order.return_value = response_data
        pk = "5O190127TN364715T"
        data = {
            "payment_source": {
                "paypal": {
                    "name": {
                        "given_name": "John",
                        "surname": "Doe"
                    },
                    "email_address": "customer@example.com",
                    "experience_context": {
                        "payment_method_preference": "IMMEDIATE_PAYMENT_REQUIRED",
                        "brand_name": "EXAMPLE INC",
                        "locale": "en-US",
                        "landing_page": "LOGIN",
                        "shipping_preference": "SET_PROVIDED_ADDRESS",
                        "user_action": "PAY_NOW",
                        "return_url": "https://example.com/returnUrl",
                        "cancel_url": "https://example.com/cancelUrl"
                    }
                }
            }
        }
        url = reverse("paypal_service-confirm-order", args=[pk])
        Response = self.client.post(url, data=data, format='json')
        self.assertEqual(Response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Response.data["data"], response_data['data'])
        self.assertEqual(Response.data["data"]['payment_source'], response_data['data']['payment_source'])
        self.assertEqual(Response.data["data"]['payer'], response_data['data']['payer'])
        mock_confirm_order.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.confirm_order')
    def test_confirm_order_with_invalid_id_and_data(self, mock_confirm_order):
        response_data = {'data': {'name': 'RESOURCE_NOT_FOUND', 'details': [{'issue': 'INVALID_RESOURCE_ID',
                                                                             'description': 'Specified resource ID does not exist. Please check the resource ID and try again.'}],
                                  'message': 'The specified resource does not exist.', 'debug_id': 'ff708ca3d9352',
                                  'links': [{
                                      'href': 'https://developer.paypal.com/docs/api/orders/v2/#error-INVALID_RESOURCE_ID',
                                      'rel': 'information_link', 'method': 'GET'}]}, 'status_code': 404}
        mock_confirm_order.return_value = response_data
        pk = "5O19012"
        data = {
            "payment_source": {
                "paypal": {
                    "name": {
                        "surname": "Doe"
                    },
                    "experience_context": {
                        "payment_method_preference": "IMMEDIATE_PAYMENT_REQUIRED",
                        "brand_name": "EXAMPLE INC",
                        "landing_page": "LOGIN",
                        "shipping_preference": "SET_PROVIDED_ADDRESS",
                        "user_action": "PAY_NOW",
                        "return_url": "https://example.com/returnUrl",
                        "cancel_url": "https://example.com/cancelUrl"
                    }
                }
            }
        }
        url = reverse("paypal_service-confirm-order", args=[pk])
        Response = self.client.post(url, data=data, format='json')
        self.assertEqual(Response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Response.data["data"], response_data['data'])
        self.assertEqual(Response.data["data"]['name'], response_data['data']['name'])
        self.assertEqual(Response.data["data"]['details'], response_data['data']['details'])
        mock_confirm_order.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.create_order')
    def test_create_order(self, mock_create_order):
        response_data = {'data': {'id': '4RF40453UK115074K', 'intent': 'CAPTURE', 'status': 'CREATED',
                                  'purchase_units': [{'reference_id': 'default',
                                                      'amount': {'currency_code': 'USD', 'value': '100.00',
                                                                 'breakdown': {'item_total': {'currency_code': 'USD',
                                                                                              'value': '100.00'}}},
                                                      'payee': {
                                                          'email_address': 'sb-w1j7g24429123@business.example.com',
                                                          'merchant_id': 'S95J77Y7FBVHU'}, 'items': [
                                          {'name': 'shirt', 'unit_amount': {'currency_code': 'USD', 'value': '100.00'},
                                           'quantity': '1', 'description': ''}]}],
                                  'create_time': '2023-08-07T15:15:01Z', 'links': [
                {'href': 'https://api.sandbox.paypal.com/v2/checkout/orders/4RF40453UK115074K', 'rel': 'self',
                 'method': 'GET'},
                {'href': 'https://www.sandbox.paypal.com/checkoutnow?token=4RF40453UK115074K', 'rel': 'approve',
                 'method': 'GET'},
                {'href': 'https://api.sandbox.paypal.com/v2/checkout/orders/4RF40453UK115074K', 'rel': 'update',
                 'method': 'PATCH'},
                {'href': 'https://api.sandbox.paypal.com/v2/checkout/orders/4RF40453UK115074K/capture',
                 'rel': 'capture', 'method': 'POST'}]}, 'status_code': 201, 'success': True}
        mock_create_order.return_value = response_data
        url = reverse('paypal_service-create-order')
        data = {
            "intent": "CAPTURE",
            "purchase_units": [
                {
                    "items": [
                        {
                            "name": "shirt",
                            "description": "",
                            "quantity": "1",
                            "unit_amount": {
                                "currency_code": "USD",
                                "value": "100.00"
                            }
                        }
                    ],
                    "amount": {
                        "currency_code": "USD",
                        "value": "100.00",
                        "breakdown": {
                            "item_total": {
                                "currency_code": "USD",
                                "value": "100.00"
                            }
                        }
                    }
                }
            ],
            "application_context": {
                "return_url": "https://example.com/return",
                "cancel_url": "https://example.com/cancel"
            }
        }

        response = self.client.post(url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["data"], response_data['data'])
        self.assertEqual(response.data["data"]["status"], response_data['data']['status'])
        mock_create_order.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.create_order')
    def test_create_order_with_invalid_data(self, mock_create_order):
        response_data = {'data': {'name': 'INVALID_REQUEST',
                                  'message': 'Request is not well-formed, syntactically incorrect, or violates schema.',
                                  'debug_id': '766ac32fa4c7d', 'details': [
                {'field': "/purchase_units/@reference_id=='default'/items/0/unit_amount", 'value': '',
                 'location': 'body', 'issue': 'MISSING_REQUIRED_PARAMETER',
                 'description': 'A required field / parameter is missing.'}], 'links': [
                {'href': 'https://developer.paypal.com/docs/api/orders/v2/#error-MISSING_REQUIRED_PARAMETER',
                 'rel': 'information_link', 'encType': 'application/json'}]}, 'status_code': 400}
        mock_create_order.return_value = response_data
        url = reverse('paypal_service-create-order')
        data = {
            "intent": "CAPTURE",
            "purchase_units": [
                {
                    "items": [
                        {
                            "name": "shirt",
                            "description": "",
                            "quantity": "1"
                        }
                    ],
                    "amount": {
                        "currency_code": "USD",
                        "value": "100.00",
                        "breakdown": {
                            "item_total": {
                                "currency_code": "USD",
                                "value": "100.00"
                            }
                        }
                    }
                }
            ],
            "application_context": {
                "return_url": "https://example.com/return",
                "cancel_url": "https://example.com/cancel"
            }
        }

        response = self.client.post(url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["data"], response_data['data'])
        self.assertEqual(response.data["data"]["message"], response_data["data"]["message"])
        mock_create_order.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.show_order_details')
    def test_get_order_details(self, mock_get_order_details):
        response_data = {'data': {'id': '96115046LF970604P', 'intent': 'CAPTURE', 'status': 'CREATED',
                                  'purchase_units': [{'reference_id': 'default',
                                                      'amount': {'currency_code': 'USD', 'value': '100.00',
                                                                 'breakdown': {'item_total': {'currency_code': 'USD',
                                                                                              'value': '100.00'}}},
                                                      'payee': {
                                                          'email_address': 'sb-w1j7g24429123@business.example.com',
                                                          'merchant_id': 'S95J77Y7FBVHU'}, 'items': [
                                          {'name': 'shirt', 'unit_amount': {'currency_code': 'USD', 'value': '100.00'},
                                           'quantity': '1', 'description': ''}]}],
                                  'create_time': '2023-08-07T14:24:07Z', 'links': [
                {'href': 'https://api.sandbox.paypal.com/v2/checkout/orders/96115046LF970604P', 'rel': 'self',
                 'method': 'GET'},
                {'href': 'https://www.sandbox.paypal.com/checkoutnow?token=96115046LF970604P', 'rel': 'approve',
                 'method': 'GET'},
                {'href': 'https://api.sandbox.paypal.com/v2/checkout/orders/96115046LF970604P', 'rel': 'update',
                 'method': 'PATCH'},
                {'href': 'https://api.sandbox.paypal.com/v2/checkout/orders/96115046LF970604P/capture',
                 'rel': 'capture', 'method': 'POST'}]}, 'status_code': 200, 'success': True}
        mock_get_order_details.return_value = response_data
        pk = "96115046LF970604P"
        url = reverse('paypal_service-get-order-details', args=[pk])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["data"], response_data['data'])
        self.assertEqual(response.data['data']['intent'], response_data['data']['intent'])
        mock_get_order_details.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.show_order_details')
    def test_get_order_details_with_wrong_id(self, mock_get_order_details):
        response_data = {'data': {'name': 'RESOURCE_NOT_FOUND', 'details': [{'issue': 'INVALID_RESOURCE_ID',
                                                                             'description': 'Specified resource ID does not exist. Please check the resource ID and try again.'}],
                                  'message': 'The specified resource does not exist.', 'debug_id': 'fa57e1651122e',
                                  'links': [{
                                      'href': 'https://developer.paypal.com/docs/api/orders/v2/#error-INVALID_RESOURCE_ID',
                                      'rel': 'information_link', 'method': 'GET'}]}, 'status_code': 404}
        mock_get_order_details.return_value = response_data
        wrong_pk = "96115046LF970"
        url = reverse('paypal_service-get-order-details', args=[wrong_pk])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data["data"], response_data['data'])
        self.assertEqual(response.data['data']['message'], response_data['data']['message'])
        self.assertEqual(response.data['data']['name'], response_data['data']['name'])
        mock_get_order_details.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.authorize_payment_for_order')
    def test_authorize_payment_for_order(self, mock_authorize_payment_for_order):
        response_data = {'data': {
            "id": "5O190127TN364715T",
            "status": "COMPLETED",
            "payment_source": {
                "paypal": {
                    "name": {
                        "given_name": "John",
                        "surname": "Doe"
                    },
                    "email_address": "customer@example.com",
                    "account_id": "QYR5Z8XDVJNXQ"
                }
            },
            "purchase_units": [
                {
                    "reference_id": "d9f80740-38f0-11e8-b467-0ed5f89f718b",
                    "payments": {
                        "authorizations": [
                            {
                                "id": "3C679366HH908993F",
                                "status": "CREATED",
                                "amount": {
                                    "currency_code": "USD",
                                    "value": "100.00"
                                },
                                "seller_protection": {
                                    "status": "ELIGIBLE",
                                    "dispute_categories": [
                                        "ITEM_NOT_RECEIVED",
                                        "UNAUTHORIZED_TRANSACTION"
                                    ]
                                },
                                "expiration_time": "2021-10-08T23:37:39Z",
                                "links": [
                                    {
                                        "href": "https://api-m.paypal.com/v2/payments/authorizations/5O190127TN364715T",
                                        "rel": "self",
                                        "method": "GET"
                                    },
                                    {
                                        "href": "https://api-m.paypal.com/v2/payments/authorizations/5O190127TN364715T/capture",
                                        "rel": "capture",
                                        "method": "POST"
                                    },
                                    {
                                        "href": "https://api-m.paypal.com/v2/payments/authorizations/5O190127TN364715T/void",
                                        "rel": "void",
                                        "method": "POST"
                                    },
                                    {
                                        "href": "https://api-m.paypal.com/v2/checkout/orders/5O190127TN364715T",
                                        "rel": "up",
                                        "method": "GET"
                                    }
                                ]
                            }
                        ]
                    }
                }
            ],
            "payer": {
                "name": {
                    "given_name": "John",
                    "surname": "Doe"
                },
                "email_address": "customer@example.com",
                "payer_id": "QYR5Z8XDVJNXQ"
            },
            "links": [
                {
                    "href": "https://api-m.paypal.com/v2/checkout/orders/5O190127TN364715T",
                    "rel": "self",
                    "method": "GET"
                }
            ]
        }, 'status_code': 201}
        mock_authorize_payment_for_order.return_value = response_data
        pk = "96115046LF970604P"
        url = reverse('paypal_service-authorize-payment-for-order', args=[pk])
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["data"], response_data['data'])
        self.assertEqual(response.data['data']['status'], response_data['data']['status'])
        self.assertEqual(response.data['data']['payment_source'], response_data['data']['payment_source'])
        mock_authorize_payment_for_order.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.authorize_payment_for_order')
    def test_authorize_payment_for_order_with_wrong_id(self, mock_authorize_payment_for_order):
        response_data = {'data': {'name': 'RESOURCE_NOT_FOUND', 'details': [
            {'field': 'order_id', 'value': '96115046LF97060', 'location': 'path', 'issue': 'INVALID_RESOURCE_ID',
             'description': 'Specified resource ID does not exist. Please check the resource ID and try again.'}],
                                  'message': 'The specified resource does not exist.', 'debug_id': '0c5d20d74e0d7',
                                  'links': [{
                                      'href': 'https://developer.paypal.com/docs/api/orders/v2/#error-INVALID_RESOURCE_ID',
                                      'rel': 'information_link', 'method': 'GET'}]}, 'status_code': 404}
        mock_authorize_payment_for_order.return_value = response_data
        wrong_pk = "96115046LF970"
        url = reverse('paypal_service-authorize-payment-for-order', args=[wrong_pk])
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data["data"], response_data['data'])
        self.assertEqual(response.data['data']['name'], response_data['data']['name'])
        self.assertEqual(response.data['data']['details'], response_data['data']['details'])
        mock_authorize_payment_for_order.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.capture_payment_for_order')
    def test_capture_payment_for_order(self, mock_capture_payment_for_order):
        response_data = {'data': {
            "id": "5O190127TN364715T",
            "status": "COMPLETED",
            "payment_source": {
                "paypal": {
                    "name": {
                        "given_name": "John",
                        "surname": "Doe"
                    },
                    "email_address": "customer@example.com",
                    "account_id": "QYR5Z8XDVJNXQ"
                }
            },
            "purchase_units": [
                {
                    "reference_id": "d9f80740-38f0-11e8-b467-0ed5f89f718b",
                    "shipping": {
                        "address": {
                            "address_line_1": "2211 N First Street",
                            "address_line_2": "Building 17",
                            "admin_area_2": "San Jose",
                            "admin_area_1": "CA",
                            "postal_code": "95131",
                            "country_code": "US"
                        }
                    },
                    "payments": {
                        "captures": [
                            {
                                "id": "3C679366HH908993F",
                                "status": "COMPLETED",
                                "amount": {
                                    "currency_code": "USD",
                                    "value": "100.00"
                                },
                                "seller_protection": {
                                    "status": "ELIGIBLE",
                                    "dispute_categories": [
                                        "ITEM_NOT_RECEIVED",
                                        "UNAUTHORIZED_TRANSACTION"
                                    ]
                                },
                                "final_capture": True,
                                "disbursement_mode": "INSTANT",
                                "seller_receivable_breakdown": {
                                    "gross_amount": {
                                        "currency_code": "USD",
                                        "value": "100.00"
                                    },
                                    "paypal_fee": {
                                        "currency_code": "USD",
                                        "value": "3.00"
                                    },
                                    "net_amount": {
                                        "currency_code": "USD",
                                        "value": "97.00"
                                    }
                                },
                                "create_time": "2018-04-01T21:20:49Z",
                                "update_time": "2018-04-01T21:20:49Z",
                                "links": [
                                    {
                                        "href": "https://api-m.paypal.com/v2/payments/captures/3C679366HH908993F",
                                        "rel": "self",
                                        "method": "GET"
                                    },
                                    {
                                        "href": "https://api-m.paypal.com/v2/payments/captures/3C679366HH908993F/refund",
                                        "rel": "refund",
                                        "method": "POST"
                                    }
                                ]
                            }
                        ]
                    }
                }
            ],
            "payer": {
                "name": {
                    "given_name": "John",
                    "surname": "Doe"
                },
                "email_address": "customer@example.com",
                "payer_id": "QYR5Z8XDVJNXQ"
            },
            "links": [
                {
                    "href": "https://api-m.paypal.com/v2/checkout/orders/5O190127TN364715T",
                    "rel": "self",
                    "method": "GET"
                }
            ]
        }, 'status_code': 201}
        mock_capture_payment_for_order.return_value = response_data
        pk = "96115046LF970"
        url = reverse('paypal_service-capture-payment-for-order', args=[pk])
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["data"], response_data['data'])
        self.assertEqual(response.data['data']['payment_source'], response_data['data']['payment_source'])
        self.assertEqual(response.data['data']['status'], response_data['data']['status'])
        mock_capture_payment_for_order.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.capture_payment_for_order')
    def test_capture_payment_for_order_with_wrong_id(self, mock_capture_payment_for_order):
        response_data = {'data': {'name': 'RESOURCE_NOT_FOUND', 'details': [{'issue': 'INVALID_RESOURCE_ID',
                                                                             'description': 'Specified resource ID does not exist. Please check the resource ID and try again.'}],
                                  'message': 'The specified resource does not exist.', 'debug_id': '0811fb7626ef4',
                                  'links': [{
                                      'href': 'https://developer.paypal.com/docs/api/orders/v2/#error-INVALID_RESOURCE_ID',
                                      'rel': 'information_link', 'method': 'GET'}]}, 'status_code': 404}
        mock_capture_payment_for_order.return_value = response_data
        wrong_pk = "96115046LF970"
        url = reverse('paypal_service-capture-payment-for-order', args=[wrong_pk])
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data["data"], response_data['data'])
        self.assertEqual(response.data['data']['name'], response_data['data']['name'])
        self.assertEqual(response.data['data']['details'], response_data['data']['details'])
        mock_capture_payment_for_order.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.show_authorized_payment')
    def test_get_authorized_payment(self, mock_get_authorized_payment):
        response_data = {'data': {
            "id": "0VF52814937998046",
            "status": "CREATED",
            "amount": {
                "value": "10.99",
                "currency_code": "USD"
            },
            "invoice_id": "INVOICE-123",
            "seller_protection": {
                "status": "ELIGIBLE",
                "dispute_categories": [
                    "ITEM_NOT_RECEIVED",
                    "UNAUTHORIZED_TRANSACTION"
                ]
            },
            "payee": {
                "email_address": "merchant@example.com",
                "merchant_id": "7KNGBPH2U58GQ"
            },
            "expiration_time": "2017-10-10T23:23:45Z",
            "create_time": "2017-09-11T23:23:45Z",
            "update_time": "2017-09-11T23:23:45Z",
            "links": [
                {
                    "rel": "self",
                    "method": "GET",
                    "href": "https://api-m.paypal.com/v2/payments/authorizations/0VF52814937998046"
                },
                {
                    "rel": "capture",
                    "method": "POST",
                    "href": "https://api-m.paypal.com/v2/payments/authorizations/0VF52814937998046/capture"
                },
                {
                    "rel": "void",
                    "method": "POST",
                    "href": "https://api-m.paypal.com/v2/payments/authorizations/0VF52814937998046/void"
                },
                {
                    "rel": "reauthorize",
                    "method": "POST",
                    "href": "https://api-m.paypal.com/v2/payments/authorizations/0VF52814937998046/reauthorize"
                }
            ]
        }, 'status_code': 200}
        mock_get_authorized_payment.return_value = response_data
        pk = "96115046LF970"
        url = reverse('paypal_service-get-authorized-payment', args=[pk])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["data"], response_data['data'])
        self.assertEqual(response.data['data']['invoice_id'], response_data['data']['invoice_id'])
        self.assertEqual(response.data['data']['amount'], response_data['data']['amount'])
        mock_get_authorized_payment.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.show_authorized_payment')
    def test_get_authorized_payment_with_wrong_id(self, mock_get_authorized_payment):
        response_data = {'data': {'name': 'RESOURCE_NOT_FOUND', 'message': 'The specified resource does not exist.',
                                  'debug_id': 'd8ed741d5da69', 'details': [{'issue': 'INVALID_RESOURCE_ID',
                                                                            'description': 'Specified resource ID does not exist. Please check the resource ID and try again.'}],
                                  'links': [{
                                      'href': 'https://developer.paypal.com/docs/api/payments/v2/#error-INVALID_RESOURCE_ID',
                                      'rel': 'information_link'}]}, 'status_code': 404}
        mock_get_authorized_payment.return_value = response_data
        wrong_pk = "96115046LF"
        url = reverse('paypal_service-get-authorized-payment', args=[wrong_pk])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data["data"], response_data['data'])
        self.assertEqual(response.data['data']['debug_id'], response_data['data']['debug_id'])
        self.assertEqual(response.data['data']['message'], response_data['data']['message'])
        mock_get_authorized_payment.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.capture_authorized_payment')
    def test_capture_authorized_payment(self, mock_capture_authorized_payment):
        response_data = {'data': {
            "id": "2GG279541U471931P",
            "status": "COMPLETED",
            "links": [
                {
                    "rel": "self",
                    "method": "GET",
                    "href": "https://api-m.paypal.com/v2/payments/captures/2GG279541U471931P"
                },
                {
                    "rel": "refund",
                    "method": "POST",
                    "href": "https://api-m.paypal.com/v2/payments/captures/2GG279541U471931P/refund"
                },
                {
                    "rel": "up",
                    "method": "GET",
                    "href": "https://api-m.paypal.com/v2/payments/authorizations/0VF52814937998046"
                }
            ]
        }, 'status_code': 201}
        mock_capture_authorized_payment.return_value = response_data
        pk = "96115046LF970604P"
        url = reverse('paypal_service-capture-authorized-payment', args=[pk])
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["data"], response_data['data'])
        self.assertEqual(response.data['data']['links'], response_data['data']['links'])
        self.assertEqual(response.data['data']['id'], response_data['data']['id'])
        mock_capture_authorized_payment.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.capture_authorized_payment')
    def test_capture_authorized_payment_with_wrong_id(self, mock_capture_authorized_payment):
        response_data = {'data': {'name': 'RESOURCE_NOT_FOUND', 'message': 'The specified resource does not exist.',
                                  'debug_id': '42fefbf507d96', 'details': [{'issue': 'INVALID_RESOURCE_ID',
                                                                            'description': 'Specified resource ID does not exist. Please check the resource ID and try again.'}],
                                  'links': [{
                                      'href': 'https://developer.paypal.com/docs/api/payments/v2/#error-INVALID_RESOURCE_ID',
                                      'rel': 'information_link'}]}, 'status_code': 404}
        mock_capture_authorized_payment.return_value = response_data
        wrong_pk = "96115046L"
        url = reverse('paypal_service-capture-authorized-payment', args=[wrong_pk])
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data["data"], response_data['data'])
        self.assertEqual(response.data['data']['name'], response_data['data']['name'])
        self.assertEqual(response.data['data']['message'], response_data['data']['message'])
        mock_capture_authorized_payment.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.show_captured_payment')
    def test_get_captured_payment(self, mock_get_captured_payment):
        response_data = {'data': {
            "id": "2GG279541U471931P",
            "status": "COMPLETED",
            "status_details": {},
            "amount": {
                "total": "10.99",
                "currency": "USD"
            },
            "final_capture": True,
            "seller_protection": {
                "status": "ELIGIBLE",
                "dispute_categories": [
                    "ITEM_NOT_RECEIVED",
                    "UNAUTHORIZED_TRANSACTION"
                ]
            },
            "seller_receivable_breakdown": {
                "gross_amount": {
                    "total": "10.99",
                    "currency": "USD"
                },
                "paypal_fee": {
                    "value": "0.33",
                    "currency": "USD"
                },
                "net_amount": {
                    "value": "10.66",
                    "currency": "USD"
                },
                "receivable_amount": {
                    "currency_code": "CNY",
                    "value": "59.26"
                },
                "paypal_fee_in_receivable_currency": {
                    "currency_code": "CNY",
                    "value": "1.13"
                },
                "exchange_rate": {
                    "source_currency": "USD",
                    "target_currency": "CNY",
                    "value": "5.9483297432325"
                }
            },
            "invoice_id": "INVOICE-123",
            "create_time": "2017-09-11T23:24:01Z",
            "update_time": "2017-09-11T23:24:01Z",
            "links": [
                {
                    "href": "https://api-m.paypal.com/v2/payments/captures/2GG279541U471931P",
                    "rel": "self",
                    "method": "GET"
                },
                {
                    "href": "https://api-m.paypal.com/v2/payments/captures/2GG279541U471931P/refund",
                    "rel": "refund",
                    "method": "POST"
                },
                {
                    "href": "https://api-m.paypal.com/v2/payments/authorizations/0VF52814937998046",
                    "rel": "up",
                    "method": "GET"
                }
            ]
        }, 'status_code': 200}
        mock_get_captured_payment.return_value = response_data
        pk = "96115046LF970604P"
        url = reverse('paypal_service-get-captured-payment', args=[pk])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["data"], response_data['data'])
        self.assertEqual(response.data['data']['final_capture'], response_data['data']['final_capture'])
        self.assertEqual(response.data['data']['seller_protection'], response_data['data']['seller_protection'])
        mock_get_captured_payment.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.show_captured_payment')
    def test_get_captured_payment_with_wrong_id(self, mock_get_captured_payment):
        response_data = {'data': {'name': 'RESOURCE_NOT_FOUND', 'message': 'The specified resource does not exist.',
                                  'debug_id': '8abeed87e538f', 'details': [{'issue': 'INVALID_RESOURCE_ID',
                                                                            'description': 'Specified resource ID does not exist. Please check the resource ID and try again.'}],
                                  'links': [{
                                      'href': 'https://developer.paypal.com/docs/api/payments/v2/#error-INVALID_RESOURCE_ID',
                                      'rel': 'information_link'}]}, 'status_code': 404}
        mock_get_captured_payment.return_value = response_data
        wrong_pk = "96115046LF970604P"
        url = reverse('paypal_service-get-captured-payment', args=[wrong_pk])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data["data"], response_data['data'])
        self.assertEqual(response.data['data']['message'], response_data['data']['message'])
        self.assertEqual(response.data['data']['debug_id'], response_data['data']['debug_id'])
        mock_get_captured_payment.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.refund_capture_payment')
    def test_refund_capture_payment(self, mock_refund_capture_payment):
        response_data = {'data': {
            "id": "1JU08902781691411",
            "amount": {
                "value": "10.00",
                "currency_code": "USD"
            },
            "status": "COMPLETED",
            "note": "Defective product",
            "seller_payable_breakdown": {
                "gross_amount": {
                    "value": "10.00",
                    "currency_code": "USD"
                },
                "paypal_fee": {
                    "value": "0",
                    "currency_code": "USD"
                },
                "platform_fees": [
                    {
                        "amount": {
                            "currency_code": "USD",
                            "value": "1.00"
                        }
                    }
                ],
                "net_amount": {
                    "value": "9.00",
                    "currency_code": "USD"
                },
                "total_refunded_amount": {
                    "value": "10.00",
                    "currency_code": "USD"
                }
            },
            "invoice_id": "INVOICE-123",
            "create_time": "2022-04-23T23:24:19Z",
            "update_time": "2022-04-23T23:24:19Z",
            "links": [
                {
                    "rel": "self",
                    "method": "GET",
                    "href": "https://api.paypal.com/v2/payments/refunds/1JU08902781691411"
                },
                {
                    "rel": "up",
                    "method": "GET",
                    "href": "https://api.paypal.com/v2/payments/captures/2GG279541U471931P"
                }
            ]
        }, 'status_code': 201}
        mock_refund_capture_payment.return_value = response_data
        data = {
            "amount": {
                "value": "10.00",
                "currency_code": "USD"
            },
            "invoice_id": "INVOICE-123",
            "note_to_payer": "DefectiveProduct",
            "payment_instruction": {
                "platform_fees": [
                    {
                        "amount": {
                            "currency_code": "USD",
                            "value": "1.00"
                        }
                    }
                ]
            }
        }
        pk = "96115046LF970604P"
        url = reverse('paypal_service-refund-capture-payment', args=[pk])
        response = self.client.post(url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["data"], response_data['data'])
        self.assertEqual(response.data['data']['seller_payable_breakdown'],
                         response_data['data']['seller_payable_breakdown'])
        self.assertEqual(response.data['data']['note'], response_data['data']['note'])
        mock_refund_capture_payment.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.refund_capture_payment')
    def test_refund_capture_payment_with_invalid_data(self, mock_refund_capture_payment):
        response_data = {'data': {'name': 'INVALID_REQUEST',
                                  'message': 'Request is not well-formed, syntactically incorrect, or violates schema',
                                  'debug_id': 'a1622f65897aa', 'details': [
                {'issue': 'MISSING_REQUIRED_PARAMETER', 'field': '/amount/currency_code', 'value': '',
                 'description': 'A required field/parameter is missing', 'location': 'body'}], 'links': [
                {'href': 'https://developer.paypal.com/docs/api/payments/v2/#error-MISSING_REQUIRED_PARAMETER',
                 'rel': 'information_link'}]}, 'status_code': 400}
        mock_refund_capture_payment.return_value = response_data
        data = {
            "amount": {
                "value": "10.00"
            },
            "invoice_id": "INVOICE-123",
            "note_to_payer": "DefectiveProduct",
            "payment_instruction": {
                "platform_fees": [
                    {
                        "amount": {
                            "currency_code": "USD",
                            "value": "1.00"
                        }
                    }
                ]
            }
        }
        pk = "96115046LF970604P"
        url = reverse('paypal_service-refund-capture-payment', args=[pk])
        response = self.client.post(url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["data"], response_data['data'])
        self.assertEqual(response.data['data']['message'], response_data['data']['message'])
        self.assertEqual(response.data['data']['debug_id'], response_data['data']['debug_id'])
        mock_refund_capture_payment.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.show_refund_details')
    def test_get_refund_details(self, mock_get_refund_details):
        response_data = {'data': {
            "id": "1JU08902781691411",
            "amount": {
                "value": "10.99",
                "currency_code": "USD"
            },
            "status": "COMPLETED",
            "note_to_payer": "Defective product",
            "seller_payable_breakdown": {
                "gross_amount": {
                    "value": "10.99",
                    "currency_code": "USD"
                },
                "paypal_fee": {
                    "value": "0",
                    "currency_code": "USD"
                },
                "net_amount": {
                    "value": "10.99",
                    "currency_code": "USD"
                },
                "total_refunded_amount": {
                    "value": "10.99",
                    "currency_code": "USD"
                }
            },
            "payer": {
                "email_address": "merchant@example.com",
                "merchant_id": "7KNGBPH2U58GQ"
            },
            "invoice_id": "INVOICE-123",
            "create_time": "2018-09-11T23:24:19Z",
            "update_time": "2018-09-11T23:24:19Z",
            "links": [
                {
                    "rel": "self",
                    "method": "GET",
                    "href": "https://api-m.paypal.com/v2/payments/refunds/1JU08902781691411"
                },
                {
                    "rel": "up",
                    "method": "GET",
                    "href": "https://api-m.paypal.com/v2/payments/captures/2GG279541U471931P"
                }
            ]
        }, 'status_code': 200}
        mock_get_refund_details.return_value = response_data

        pk = "96115046LF970604P"
        url = reverse('paypal_service-get-refund-details', args=[pk])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["data"], response_data['data'])
        self.assertEqual(response.data['data']['seller_payable_breakdown'],
                         response_data['data']['seller_payable_breakdown'])
        self.assertEqual(response.data['data']['payer'], response_data['data']['payer'])
        mock_get_refund_details.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.show_refund_details')
    def test_get_refund_details_with_wrong(self, mock_get_refund_details):
        response_data = {'data': {'name': 'RESOURCE_NOT_FOUND', 'message': 'The specified resource does not exist.',
                                  'debug_id': 'a72cea736f637', 'details': [
                {'issue': 'INVALID_RESOURCE_ID', 'field': 'refund_id', 'value': '6WJ598252N5',
                 'description': 'Specified resource ID does not exist. Please check the resource ID and try again.',
                 'location': 'path'}], 'links': [
                {'href': 'https://developer.paypal.com/docs/api/payments/v2/#error-INVALID_RESOURCE_ID',
                 'rel': 'information_link'}]}, 'status_code': 404}
        mock_get_refund_details.return_value = response_data
        pk = "96115046LF"
        url = reverse('paypal_service-get-refund-details', args=[pk])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data["data"], response_data['data'])
        self.assertEqual(response.data['data']['name'], response_data['data']['name'])
        self.assertEqual(response.data['data']['message'], response_data['data']['message'])
        mock_get_refund_details.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.create_product')
    def test_create_product(self, mock_create_product):
        response_data = {
            'data': {'id': 'PROD-84R69754RB513341J', 'name': 'Shoe', 'description': 'For men', 'type': 'PHYSICAL',
                     'category': 'ADULT', 'image_url': 'https://example.com/streaming.jpg',
                     'home_url': 'https://example.com/home', 'create_time': '2023-08-07T18:42:48Z',
                     'update_time': '2023-08-07T18:42:48Z', 'links': [
                    {'href': 'https://api.sandbox.paypal.com/v1/catalogs/products/PROD-84R69754RB513341J',
                     'rel': 'self', 'method': 'GET'},
                    {'href': 'https://api.sandbox.paypal.com/v1/catalogs/products/PROD-84R69754RB513341J',
                     'rel': 'edit', 'method': 'PATCH'}]}, 'status_code': 201, 'success': True}
        mock_create_product.return_value = response_data
        data = {
            "name": "Shoe",
            "description": "For men",
            "type": "PHYSICAL",
            "category": "ADULT",
            "image_url": "https://example.com/streaming.jpg",
            "home_url": "https://example.com/home"
        }
        url = reverse('paypal_service-create-product')
        response = self.client.post(url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["data"], response_data['data'])
        self.assertEqual(response.data['data']['category'], response_data['data']['category'])
        self.assertEqual(response.data['data']['home_url'], response_data['data']['home_url'])
        mock_create_product.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.create_product')
    def test_create_product_with_invalid_data(self, mock_create_product):
        response_data = {'data': {'name': 'INVALID_REQUEST',
                                  'message': 'Request is not well-formed, syntactically incorrect, or violates schema.',
                                  'debug_id': 'c025952e4e8e0', 'details': [
                {'field': '/name', 'location': 'body', 'issue': 'MISSING_REQUIRED_PARAMETER',
                 'description': 'A required field is missing.'}], 'links': [
                {'href': 'https://developer.paypal.com/docs/api/v1/billing/subscriptions#INVALID_REQUEST',
                 'rel': 'information_link', 'method': 'GET'}]}, 'status_code': 400}
        mock_create_product.return_value = response_data
        data = {
            "category": "ADULT",
            "image_url": "https://example.com/streaming.jpg",
            "home_url": "https://example.com/home"
        }
        url = reverse('paypal_service-create-product')
        response = self.client.post(url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["data"], response_data['data'])
        self.assertEqual(response.data['data']['message'], response_data['data']['message'])
        self.assertEqual(response.data['data']['debug_id'], response_data['data']['debug_id'])
        mock_create_product.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.show_product_details')
    def test_get_product_details(self, mock_get_product_details):
        response_data = {
            'data': {'id': 'PROD-8N141247FF446930W', 'name': 'Shoe', 'description': 'For men', 'type': 'PHYSICAL',
                     'category': 'ADULT', 'image_url': 'https://example.com/streaming.jpg',
                     'home_url': 'https://example.com/home', 'create_time': '2023-08-07T14:41:22Z',
                     'update_time': '2023-08-07T14:41:22Z', 'links': [
                    {'href': 'https://api.sandbox.paypal.com/v1/catalogs/products/PROD-8N141247FF446930W',
                     'rel': 'self', 'method': 'GET'},
                    {'href': 'https://api.sandbox.paypal.com/v1/catalogs/products/PROD-8N141247FF446930W',
                     'rel': 'edit', 'method': 'PATCH'}]}, 'status_code': 200, 'success': True}
        mock_get_product_details.return_value = response_data
        pk = "PROD-8N141247FF446930W"
        url = reverse('paypal_service-get-product-details', args=[pk])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["data"], response_data['data'])
        self.assertEqual(response.data['data']['home_url'], response_data['data']['home_url'])
        self.assertEqual(response.data['data']['update_time'], response_data['data']['update_time'])
        mock_get_product_details.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.show_product_details')
    def test_get_product_details_with_wrong_id(self, mock_get_product_details):
        response_data = {'data': {'name': 'RESOURCE_NOT_FOUND', 'message': 'The specified resource does not exist.',
                                  'debug_id': '90a5d0d8f04d6',
                                  'details': [{'issue': 'INVALID_RESOURCE_ID', 'description': 'Invalid product id'}],
                                  'links': [{
                                      'href': 'https://developer.paypal.com/docs/api/v1/billing/subscriptions#RESOURCE_NOT_FOUND',
                                      'rel': 'information_link', 'method': 'GET'}]}, 'status_code': 404}
        mock_get_product_details.return_value = response_data
        pk = "PROD-8N141247FF44"
        url = reverse('paypal_service-get-product-details', args=[pk])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data["data"], response_data['data'])
        self.assertEqual(response.data['data']['name'], response_data['data']['name'])
        self.assertEqual(response.data['data']['message'], response_data['data']['message'])
        mock_get_product_details.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.create_plan')
    def test_create_plan(self, mock_create_plan):
        response_data = {
            'data': {'id': 'P-8AN90980D4487610MMTIUFGY', 'product_id': 'PROD-8N141247FF446930W', 'name': 'Shoes plan',
                     'status': 'ACTIVE', 'description': 'For men basic plan', 'usage_type': 'LICENSED',
                     'billing_cycles': [{'pricing_scheme': {'version': 1,
                                                            'fixed_price': {'currency_code': 'USD', 'value': '3.0'},
                                                            'create_time': '2023-08-07T19:14:35Z',
                                                            'update_time': '2023-08-07T19:14:35Z'},
                                         'frequency': {'interval_unit': 'MONTH', 'interval_count': 1},
                                         'tenure_type': 'TRIAL', 'sequence': 1, 'total_cycles': 2}, {
                                            'pricing_scheme': {'version': 1,
                                                               'fixed_price': {'currency_code': 'USD', 'value': '6.0'},
                                                               'create_time': '2023-08-07T19:14:35Z',
                                                               'update_time': '2023-08-07T19:14:35Z'},
                                            'frequency': {'interval_unit': 'MONTH', 'interval_count': 1},
                                            'tenure_type': 'TRIAL', 'sequence': 2, 'total_cycles': 3}, {
                                            'pricing_scheme': {'version': 1,
                                                               'fixed_price': {'currency_code': 'USD', 'value': '10.0'},
                                                               'create_time': '2023-08-07T19:14:35Z',
                                                               'update_time': '2023-08-07T19:14:35Z'},
                                            'frequency': {'interval_unit': 'MONTH', 'interval_count': 1},
                                            'tenure_type': 'REGULAR', 'sequence': 3, 'total_cycles': 12}],
                     'payment_preferences': {'service_type': 'PREPAID', 'auto_bill_outstanding': True,
                                             'setup_fee': {'currency_code': 'USD', 'value': '15.0'},
                                             'setup_fee_failure_action': 'CONTINUE', 'payment_failure_threshold': 3},
                     'taxes': {'percentage': '10.0', 'inclusive': False}, 'quantity_supported': False,
                     'create_time': '2023-08-07T19:14:35Z', 'update_time': '2023-08-07T19:14:35Z', 'links': [
                    {'href': 'https://api.sandbox.paypal.com/v1/billing/plans/P-8AN90980D4487610MMTIUFGY',
                     'rel': 'self', 'method': 'GET', 'encType': 'application/json'},
                    {'href': 'https://api.sandbox.paypal.com/v1/billing/plans/P-8AN90980D4487610MMTIUFGY',
                     'rel': 'edit', 'method': 'PATCH', 'encType': 'application/json'},
                    {'href': 'https://api.sandbox.paypal.com/v1/billing/plans/P-8AN90980D4487610MMTIUFGY/deactivate',
                     'rel': 'self', 'method': 'POST', 'encType': 'application/json'}]}, 'status_code': 201,
            'success': True}
        mock_create_plan.return_value = response_data
        data = {
            "product_id": "PROD-8N141247FF446930W",
            "name": "Shoes plan",
            "description": "For men basic plan",
            "billing_cycles": [
                {
                    "frequency": {
                        "interval_unit": "MONTH",
                        "interval_count": 1
                    },
                    "tenure_type": "TRIAL",
                    "sequence": 1,
                    "total_cycles": 2,
                    "pricing_scheme": {
                        "fixed_price": {
                            "value": "3",
                            "currency_code": "USD"
                        }
                    }
                },
                {
                    "frequency": {
                        "interval_unit": "MONTH",
                        "interval_count": 1
                    },
                    "tenure_type": "TRIAL",
                    "sequence": 2,
                    "total_cycles": 3,
                    "pricing_scheme": {
                        "fixed_price": {
                            "value": "6",
                            "currency_code": "USD"
                        }
                    }
                },
                {
                    "frequency": {
                        "interval_unit": "MONTH",
                        "interval_count": 1
                    },
                    "tenure_type": "REGULAR",
                    "sequence": 3,
                    "total_cycles": 12,
                    "pricing_scheme": {
                        "fixed_price": {
                            "value": "10",
                            "currency_code": "USD"
                        }
                    }
                }
            ],
            "payment_preferences": {
                "auto_bill_outstanding": True,
                "setup_fee": {
                    "value": "15",
                    "currency_code": "USD"
                },
                "setup_fee_failure_action": "CONTINUE",
                "payment_failure_threshold": 3
            },
            "taxes": {
                "percentage": "10",
                "inclusive": False
            }
        }
        url = reverse('paypal_service-create-plan')
        response = self.client.post(url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["data"], response_data['data'])
        self.assertEqual(response.data['data']['billing_cycles'], response_data['data']['billing_cycles'])
        self.assertEqual(response.data['data']['taxes'], response_data['data']['taxes'])
        mock_create_plan.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.create_plan')
    def test_create_plan_with_invalid_data(self, mock_create_plan):
        response_data = {'data': {'name': 'INVALID_REQUEST',
                                  'message': 'Request is not well-formed, syntactically incorrect, or violates schema.',
                                  'debug_id': '15b61ccde7f7f', 'details': [
                {'field': '/billing_cycles/0/frequency', 'location': 'body', 'issue': 'MISSING_REQUIRED_PARAMETER',
                 'description': 'A required field is missing.'}], 'links': [
                {'href': 'https://developer.paypal.com/docs/api/v1/billing/subscriptions#INVALID_REQUEST',
                 'rel': 'information_link', 'method': 'GET'}]}, 'status_code': 400}
        mock_create_plan.return_value = response_data
        data = {
            "product_id": "PROD-8N141247FF446930W",
            "name": "Shoes plan",
            "description": "For men basic plan",
            "billing_cycles": [
                {
                    "frequency": {
                        "interval_unit": "MONTH",
                        "interval_count": 1
                    },
                    "tenure_type": "TRIAL",
                    "sequence": 1,
                    "total_cycles": 2,
                    "pricing_scheme": {
                        "fixed_price": {
                            "value": "3",
                            "currency_code": "USD"
                        }
                    }
                },
                {
                    "frequency": {
                        "interval_unit": "MONTH",
                        "interval_count": 1
                    },
                    "tenure_type": "TRIAL",
                    "sequence": 2,
                    "total_cycles": 3,
                    "pricing_scheme": {
                        "fixed_price": {
                            "value": "6",
                            "currency_code": "USD"
                        }
                    }
                },
                {

                    "tenure_type": "REGULAR",
                    "sequence": 3,
                    "total_cycles": 12,
                    "pricing_scheme": {
                        "fixed_price": {
                            "value": "10",
                            "currency_code": "USD"
                        }
                    }
                }
            ],
            "payment_preferences": {
                "auto_bill_outstanding": True,
                "setup_fee": {
                    "value": "15",
                    "currency_code": "USD"
                },
                "setup_fee_failure_action": "CONTINUE",
                "payment_failure_threshold": 3
            },
            "taxes": {
                "percentage": "10",
                "inclusive": False
            }
        }
        url = reverse('paypal_service-create-plan')
        response = self.client.post(url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["data"], response_data['data'])
        self.assertEqual(response.data['data']['debug_id'], response_data['data']['debug_id'])
        self.assertEqual(response.data['data']['message'], response_data['data']['message'])
        mock_create_plan.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.show_plans_details')
    def test_get_plan_details(self, mock_get_plan_details):
        response_data = {
            'data': {'id': 'P-3353356906454002GMTIQFQI', 'product_id': 'PROD-8N141247FF446930W', 'name': 'Shoes plan',
                     'status': 'ACTIVE', 'description': 'For men basic plan', 'usage_type': 'LICENSED',
                     'billing_cycles': [{'pricing_scheme': {'version': 1,
                                                            'fixed_price': {'currency_code': 'USD', 'value': '3.0'},
                                                            'create_time': '2023-08-07T14:42:09Z',
                                                            'update_time': '2023-08-07T14:42:09Z'},
                                         'frequency': {'interval_unit': 'MONTH', 'interval_count': 1},
                                         'tenure_type': 'TRIAL', 'sequence': 1, 'total_cycles': 2}, {
                                            'pricing_scheme': {'version': 1,
                                                               'fixed_price': {'currency_code': 'USD', 'value': '6.0'},
                                                               'create_time': '2023-08-07T14:42:09Z',
                                                               'update_time': '2023-08-07T14:42:09Z'},
                                            'frequency': {'interval_unit': 'MONTH', 'interval_count': 1},
                                            'tenure_type': 'TRIAL', 'sequence': 2, 'total_cycles': 3}, {
                                            'pricing_scheme': {'version': 1,
                                                               'fixed_price': {'currency_code': 'USD', 'value': '10.0'},
                                                               'create_time': '2023-08-07T14:42:09Z',
                                                               'update_time': '2023-08-07T14:42:09Z'},
                                            'frequency': {'interval_unit': 'MONTH', 'interval_count': 1},
                                            'tenure_type': 'REGULAR', 'sequence': 3, 'total_cycles': 12}],
                     'payment_preferences': {'service_type': 'PREPAID', 'auto_bill_outstanding': True,
                                             'setup_fee': {'currency_code': 'USD', 'value': '15.0'},
                                             'setup_fee_failure_action': 'CONTINUE', 'payment_failure_threshold': 3},
                     'taxes': {'percentage': '10.0', 'inclusive': False}, 'quantity_supported': False,
                     'create_time': '2023-08-07T14:42:09Z', 'update_time': '2023-08-07T14:43:34Z', 'links': [
                    {'href': 'https://api.sandbox.paypal.com/v1/billing/plans/P-3353356906454002GMTIQFQI',
                     'rel': 'self', 'method': 'GET', 'encType': 'application/json'},
                    {'href': 'https://api.sandbox.paypal.com/v1/billing/plans/P-3353356906454002GMTIQFQI',
                     'rel': 'edit', 'method': 'PATCH', 'encType': 'application/json'},
                    {'href': 'https://api.sandbox.paypal.com/v1/billing/plans/P-3353356906454002GMTIQFQI/deactivate',
                     'rel': 'self', 'method': 'POST', 'encType': 'application/json'}]}, 'status_code': 200,
            'success': True}
        mock_get_plan_details.return_value = response_data
        pk = "P-3353356906454002GMTIQFQI"
        url = reverse('paypal_service-get-plan-details', args=[pk])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["data"], response_data['data'])
        self.assertEqual(response.data['data']['billing_cycles'], response_data['data']['billing_cycles'])
        self.assertEqual(response.data['data']['payment_preferences'], response_data['data']['payment_preferences'])
        mock_get_plan_details.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.show_plans_details')
    def test_get_plan_details_with_wrong_id(self, mock_get_plan_details):
        response_data = {'data': {'name': 'INVALID_REQUEST',
                                  'message': 'Request is not well-formed, syntactically incorrect, or violates schema.',
                                  'debug_id': '5dc37b9670286', 'details': [
                {'field': 'plan_id', 'value': 'P-3353356906454002', 'location': 'path',
                 'issue': 'INVALID_PARAMETER_VALUE', 'description': 'The value of a field is invalid.'}], 'links': [
                {'href': 'https://developer.paypal.com/docs/api/v1/billing/subscriptions#INVALID_REQUEST',
                 'rel': 'information_link', 'method': 'GET'}]}, 'status_code': 400}
        mock_get_plan_details.return_value = response_data
        wrong_pk = "P-3353356906454002"
        url = reverse('paypal_service-get-plan-details', args=[wrong_pk])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["data"], response_data['data'])
        self.assertEqual(response.data['data']['message'], response_data['data']['message'])
        self.assertEqual(response.data['data']['debug_id'], response_data['data']['debug_id'])
        mock_get_plan_details.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.deactivate_plan')
    def test_deactivate_plan(self, mock_deactivate_plan):
        response_data = {'data': ['Response [204]'], 'status_code': 204, 'success': True}
        mock_deactivate_plan.return_value = response_data
        pk = "P-3353356906454002"
        url = reverse('paypal_service-deactivate-plan', args=[pk])
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data["data"], response_data['data'])
        mock_deactivate_plan.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.deactivate_plan')
    def test_deactivate_plan_with_wrong_id(self, mock_deactivate_plan):
        response_data = {'data': {'name': 'INVALID_REQUEST',
                                  'message': 'Request is not well-formed, syntactically incorrect, or violates schema.',
                                  'debug_id': '146cfcf172ae6', 'details': [
                {'field': 'plan_id', 'value': 'P-3353356906454002G', 'location': 'path',
                 'issue': 'INVALID_PARAMETER_VALUE', 'description': 'The value of a field is invalid.'}], 'links': [
                {'href': 'https://developer.paypal.com/docs/api/v1/billing/subscriptions#INVALID_REQUEST',
                 'rel': 'information_link', 'method': 'GET'}]}, 'status_code': 400}
        mock_deactivate_plan.return_value = response_data
        wrong_pk = "P-3353356906"
        url = reverse('paypal_service-deactivate-plan', args=[wrong_pk])
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["data"], response_data['data'])
        mock_deactivate_plan.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.activate_plan')
    def test_activate_plan(self, mock_activate_plan):
        response_data = {'data': ['Response [204]'], 'status_code': 204, 'success': True}
        mock_activate_plan.return_value = response_data
        pk = "P-3353356906454002"
        url = reverse('paypal_service-activate-plan', args=[pk])
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data["data"], response_data['data'])
        mock_activate_plan.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.activate_plan')
    def test_activate_plan_with_wrong_id(self, mock_activate_plan):
        response_data = {'data': {'name': 'INVALID_REQUEST',
                                  'message': 'Request is not well-formed, syntactically incorrect, or violates schema.',
                                  'debug_id': '3754d1133ec83', 'details': [
                {'field': 'plan_id', 'value': 'P-3353356906454002GMTII', 'location': 'path',
                 'issue': 'INVALID_PARAMETER_VALUE', 'description': 'The value of a field is invalid.'}], 'links': [
                {'href': 'https://developer.paypal.com/docs/api/v1/billing/subscriptions#INVALID_REQUEST',
                 'rel': 'information_link', 'method': 'GET'}]}, 'status_code': 400}
        mock_activate_plan.return_value = response_data
        wrong_pk = "P-3353356906"
        url = reverse('paypal_service-activate-plan', args=[wrong_pk])
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["data"], response_data['data'])
        mock_activate_plan.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.create_subscription')
    def test_create_subscription(self, mock_create_subscription):
        response_data = {
            'data': {'status': 'APPROVAL_PENDING', 'status_update_time': '2023-08-07T19:47:46Z', 'id': 'I-R2WBDR7U7GH7',
                     'plan_id': 'P-3353356906454002GMTIQFQI', 'start_time': '2023-12-01T00:00:00Z', 'quantity': '1',
                     'shipping_amount': {'currency_code': 'USD', 'value': '10.0'},
                     'subscriber': {'email_address': 'sb-notda24548001@personal.example.com',
                                    'name': {'given_name': 'Jhon', 'surname': 'Roy'},
                                    'shipping_address': {'name': {'full_name': 'Jhon Roy'},
                                                         'address': {'address_line_1': '2211 N First Street',
                                                                     'address_line_2': 'Building 17',
                                                                     'admin_area_2': 'San Jose', 'admin_area_1': 'CA',
                                                                     'postal_code': '95131', 'country_code': 'US'}}},
                     'create_time': '2023-08-07T19:47:46Z', 'plan_overridden': False, 'links': [{
                    'href': 'https://www.sandbox.paypal.com/webapps/billing/subscriptions?ba_token=BA-5NJ78062NF835634F',
                    'rel': 'approve',
                    'method': 'GET'}, {
                    'href': 'https://api-m.sandbox.paypal.com/v1/billing/subscriptions/I-R2WBDR7U7GH7',
                    'rel': 'edit',
                    'method': 'PATCH'},
                    {
                        'href': 'https://api-m.sandbox.paypal.com/v1/billing/subscriptions/I-R2WBDR7U7GH7',
                        'rel': 'self',
                        'method': 'GET'}]},
            'status_code': 201, 'success': True}
        mock_create_subscription.return_value = response_data
        data = {
            "plan_id": "P-3353356906454002GMTIQFQI",
            "start_time": "2023-12-01T00:00:00Z",
            "shipping_amount": {
                "currency_code": "USD",
                "value": "10.00"
            },
            "subscriber": {
                "name": {
                    "given_name": "Jhon",
                    "surname": "Roy"
                },
                "email_address": "sb-notda24548001@personal.example.com",
                "shipping_address": {
                    "name": {
                        "full_name": "Jhon Roy"
                    },
                    "address": {
                        "address_line_1": "2211 N First Street",
                        "address_line_2": "Building 17",
                        "admin_area_2": "San Jose",
                        "admin_area_1": "CA",
                        "postal_code": "95131",
                        "country_code": "US"
                    }
                }
            }
        }

        url = reverse('paypal_service-create-subscription')
        response = self.client.post(url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["data"], response_data['data'])
        mock_create_subscription.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.create_subscription')
    def test_create_subscription_with_invalid_data(self, mock_create_subscription):
        response_data = {'data': {'name': 'INVALID_REQUEST',
                                  'message': 'Request is not well-formed, syntactically incorrect, or violates schema.',
                                  'debug_id': '65fa1b6e55b6f', 'details': [
                {'field': '/subscriber/shipping_address/name/full_name', 'location': 'body',
                 'issue': 'INVALID_SUBSCRIBER_SHIPPING_INFO_NAME',
                 'description': 'Invalid name in subscriber shipping information'}], 'links': [
                {'href': 'https://developer.paypal.com/docs/api/v1/billing/subscriptions#INVALID_REQUEST',
                 'rel': 'information_link', 'method': 'GET'}]}, 'status_code': 400}
        mock_create_subscription.return_value = response_data
        data = {
            "plan_id": "P-3353356906454002GMTIQFQI",
            "start_time": "2023-12-01T00:00:00Z",
            "shipping_amount": {
                "currency_code": "USD",
                "value": "10.00"
            },
            "subscriber": {
                "name": {
                    "given_name": "Jhon",
                    "surname": "Roy"
                },

                "shipping_address": {

                    "address": {
                        "address_line_1": "2211 N First Street",
                        "address_line_2": "Building 17",
                        "admin_area_2": "San Jose",
                        "admin_area_1": "CA",
                        "postal_code": "95131",
                        "country_code": "US"
                    }
                }
            }
        }

        url = reverse('paypal_service-create-subscription')
        response = self.client.post(url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["data"], response_data['data'])
        mock_create_subscription.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.show_subscription_details')
    def test_get_subscription_details(self, mock_get_subscription_details):
        response_data = {'data': {
            "id": "I-BW452GLLEP1G",
            "plan_id": "P-5ML4271244454362WXNWU5NQ",
            "start_time": "2019-04-10T07:00:00Z",
            "quantity": "20",
            "shipping_amount": {
                "currency_code": "USD",
                "value": "10.0"
            },
            "subscriber": {
                "shipping_address": {
                    "name": {
                        "full_name": "John Doe"
                    },
                    "address": {
                        "address_line_1": "2211 N First Street",
                        "address_line_2": "Building 17",
                        "admin_area_2": "San Jose",
                        "admin_area_1": "CA",
                        "postal_code": "95131",
                        "country_code": "US"
                    }
                },
                "name": {
                    "given_name": "John",
                    "surname": "Doe"
                },
                "email_address": "customer@example.com",
                "payer_id": "2J6QB8YJQSJRJ"
            },
            "billing_info": {
                "outstanding_balance": {
                    "currency_code": "USD",
                    "value": "1.0"
                },
                "cycle_executions": [
                    {
                        "tenure_type": "TRIAL",
                        "sequence": 1,
                        "cycles_completed": 0,
                        "cycles_remaining": 2,
                        "total_cycles": 2
                    },
                    {
                        "tenure_type": "TRIAL",
                        "sequence": 2,
                        "cycles_completed": 0,
                        "cycles_remaining": 3,
                        "total_cycles": 3
                    },
                    {
                        "tenure_type": "REGULAR",
                        "sequence": 3,
                        "cycles_completed": 0,
                        "cycles_remaining": 12,
                        "total_cycles": 12
                    }
                ],
                "last_payment": {
                    "amount": {
                        "currency_code": "USD",
                        "value": "1.15"
                    },
                    "time": "2019-04-09T10:27:20Z"
                },
                "next_billing_time": "2019-04-10T10:00:00Z",
                "failed_payments_count": 0
            },
            "create_time": "2019-04-09T10:26:04Z",
            "update_time": "2019-04-09T10:27:27Z",
            "links": [
                {
                    "href": "https://api-m.paypal.com/v1/billing/subscriptions/I-BW452GLLEP1G/cancel",
                    "rel": "cancel",
                    "method": "POST"
                },
                {
                    "href": "https://api-m.paypal.com/v1/billing/subscriptions/I-BW452GLLEP1G",
                    "rel": "edit",
                    "method": "PATCH"
                },
                {
                    "href": "https://api-m.paypal.com/v1/billing/subscriptions/I-BW452GLLEP1G",
                    "rel": "self",
                    "method": "GET"
                },
                {
                    "href": "https://api-m.paypal.com/v1/billing/subscriptions/I-BW452GLLEP1G/suspend",
                    "rel": "suspend",
                    "method": "POST"
                },
                {
                    "href": "https://api-m.paypal.com/v1/billing/subscriptions/I-BW452GLLEP1G/capture",
                    "rel": "capture",
                    "method": "POST"
                }
            ],
            "status": "ACTIVE",
            "status_update_time": "2019-04-09T10:27:27Z"
        }, 'status_code': 200}
        mock_get_subscription_details.return_value = response_data
        pk = "P-3353356906454002"
        url = reverse('paypal_service-get-subscription-details', args=[pk])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["data"], response_data['data'])
        mock_get_subscription_details.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.show_subscription_details')
    def test_get_subscription_details_with_wrong_id(self, mock_get_subscription_details):
        response_data = {'data': {'name': 'RESOURCE_NOT_FOUND', 'message': 'The specified resource does not exist.',
                                  'debug_id': '48acd74e4b472', 'details': [
                {'issue': 'INVALID_RESOURCE_ID', 'description': 'Requested resource ID was not found.'}], 'links': [
                {'href': 'https://developer.paypal.com/docs/api/v1/billing/subscriptions#RESOURCE_NOT_FOUND',
                 'rel': 'information_link', 'method': 'GET'}]}, 'status_code': 404}
        mock_get_subscription_details.return_value = response_data
        wrong_pk = "P-3353356906"
        url = reverse('paypal_service-get-subscription-details', args=[wrong_pk])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data["data"], response_data['data'])
        mock_get_subscription_details.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.suspend_subscription')
    def test_suspend_subscription(self, mock_suspend_subscription):
        response_data = {'data': ['Response [204]'], 'status_code': 204, 'success': True}
        mock_suspend_subscription.return_value = response_data
        pk = "P-3353356906454002"
        url = reverse('paypal_service-suspend-subscription', args=[pk])
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data["data"], response_data['data'])
        mock_suspend_subscription.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.suspend_subscription')
    def test_suspend_subscription_with_wrong_id(self, mock_suspend_subscription):
        response_data = {'data': {'name': 'RESOURCE_NOT_FOUND', 'message': 'The specified resource does not exist.',
                                  'debug_id': '980e96b90cc06', 'details': [
                {'issue': 'INVALID_RESOURCE_ID', 'description': 'Requested resource ID was not found.'}], 'links': [
                {'href': 'https://developer.paypal.com/docs/api/v1/billing/subscriptions#RESOURCE_NOT_FOUND',
                 'rel': 'information_link', 'method': 'GET'}]}, 'status_code': 404}
        mock_suspend_subscription.return_value = response_data
        wrong_pk = "P-3353356906"
        url = reverse('paypal_service-suspend-subscription', args=[wrong_pk])
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data["data"], response_data['data'])
        mock_suspend_subscription.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.activate_subscription')
    def test_activate_subscription(self, mock_activate_subscription):
        response_data = {'data': ['Response [202]'], 'status_code': 202, 'success': True}
        mock_activate_subscription.return_value = response_data
        pk = "P-3353356906454002"
        url = reverse('paypal_service-activate-subscription', args=[pk])
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_202_ACCEPTED)
        self.assertEqual(response.data["data"], response_data['data'])
        mock_activate_subscription.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.activate_subscription')
    def test_activate_subscription_with_wrong_id(self, mock_activate_subscription):
        response_data = {'data': {'name': 'RESOURCE_NOT_FOUND', 'message': 'The specified resource does not exist.',
                                  'debug_id': '980e96b90cc06', 'details': [
                {'issue': 'INVALID_RESOURCE_ID', 'description': 'Requested resource ID was not found.'}], 'links': [
                {'href': 'https://developer.paypal.com/docs/api/v1/billing/subscriptions#RESOURCE_NOT_FOUND',
                 'rel': 'information_link', 'method': 'GET'}]}, 'status_code': 404}
        mock_activate_subscription.return_value = response_data
        wrong_pk = "P-3353356906"
        url = reverse('paypal_service-activate-subscription', args=[wrong_pk])
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data["data"], response_data['data'])
        mock_activate_subscription.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.cancel_subscription')
    def test_cancel_subscription(self, mock_cancel_subscription):
        response_data = {'data': ['Response [204]'], 'status_code': 204, 'success': True}
        mock_cancel_subscription.return_value = response_data
        pk = "P-3353356906454002"
        data = {
            "reason": "Not satisfied with the service"
        }
        url = reverse('paypal_service-cancel-subscription', args=[pk])
        response = self.client.post(url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data["data"], response_data['data'])
        mock_cancel_subscription.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.cancel_subscription')
    def test_cancel_subscription_with_wrong_id(self, mock_cancel_subscription):
        response_data = {'data': {'name': 'RESOURCE_NOT_FOUND', 'message': 'The specified resource does not exist.',
                                  'debug_id': '980e96b90cc06', 'details': [
                {'issue': 'INVALID_RESOURCE_ID', 'description': 'Requested resource ID was not found.'}], 'links': [
                {'href': 'https://developer.paypal.com/docs/api/v1/billing/subscriptions#RESOURCE_NOT_FOUND',
                 'rel': 'information_link', 'method': 'GET'}]}, 'status_code': 404}
        mock_cancel_subscription.return_value = response_data
        wrong_pk = "P-3353356906"
        data = {
            "reason": "Not satisfied with the service"
        }
        url = reverse('paypal_service-cancel-subscription', args=[wrong_pk])
        response = self.client.post(url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data["data"], response_data['data'])
        mock_cancel_subscription.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.capture_authorized_payment_on_subscription')
    def test_capture_authorized_payment_on_subscription(self, mock_capture_authorized_payment_on_subscription):
        response_data = {'data': ['Response [202]'], 'status_code': 202, 'success': True}
        mock_capture_authorized_payment_on_subscription.return_value = response_data
        pk = "P-3353356906454002"
        data = {
            "note": "Charging as the balance reached the limit",
            "capture_type": "ELIGIBLE",
            "amount": {
                "currency_code": "USD",
                "value": "10"
            }
        }
        url = reverse('paypal_service-capture-authorized-payment-on-subscription', args=[pk])
        response = self.client.post(url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_202_ACCEPTED)
        self.assertEqual(response.data["data"], response_data['data'])
        mock_capture_authorized_payment_on_subscription.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.capture_authorized_payment_on_subscription')
    def test_capture_authorized_payment_on_subscription_with_wrong_id(self,
                                                                      mock_capture_authorized_payment_on_subscription):
        response_data = {'data': {'name': 'RESOURCE_NOT_FOUND', 'message': 'The specified resource does not exist.',
                                  'debug_id': '980e96b90cc06', 'details': [
                {'issue': 'INVALID_RESOURCE_ID', 'description': 'Requested resource ID was not found.'}], 'links': [
                {'href': 'https://developer.paypal.com/docs/api/v1/billing/subscriptions#RESOURCE_NOT_FOUND',
                 'rel': 'information_link', 'method': 'GET'}]}, 'status_code': 404}
        mock_capture_authorized_payment_on_subscription.return_value = response_data
        wrong_pk = "P-3353356906"
        data = {
            "note": "Charging as the balance reached the limit",
            "capture_type": "ELIGIBLE",
            "amount": {
                "currency_code": "USD",
                "value": "10"
            }
        }
        url = reverse('paypal_service-capture-authorized-payment-on-subscription', args=[wrong_pk])
        response = self.client.post(url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data["data"], response_data['data'])
        mock_capture_authorized_payment_on_subscription.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.generate_invoice_number')
    def test_generate_invoice_number(self, mock_generate_invoice_number):
        response_data = {'data': {'invoice_number': '0003'}, 'status_code': 200, 'success': True}
        mock_generate_invoice_number.return_value = response_data
        url = reverse('paypal_service-generate-invoice-number')
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["data"], response_data['data'])
        self.assertEqual(response.data["data"]['invoice_number'], response_data['data']['invoice_number'])
        mock_generate_invoice_number.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.create_draft_invoice')
    def test_create_draft_invoice(self, mock_create_draft_invoice):
        response_data = {'data': ['Response [202]'], 'status_code': 202, 'success': True}
        mock_create_draft_invoice.return_value = response_data
        data = {
            "detail": {
                "invoice_number": "0002",
                "reference": "deal-ref",
                "invoice_date": "2022-12-30",
                "currency_code": "USD",
                "note": "Thank you for your business.",
                "term": "No refunds after 30 days.",
                "memo": "This is a long contract",
                "payment_term": {
                    "term_type": "NET_10",
                    "due_date": "2023-01-09"
                }
            },
            "invoicer": {
                "name": {
                    "given_name": "John",
                    "surname": "Doe"
                },
                "email_address": "sb-notda24548001@personal.example.com"
            },
            "primary_recipients": [
                {
                    "billing_info": {
                        "name": {
                            "given_name": "John",
                            "surname": "Doe"
                        },
                        "email_address": "sb-notda24548001@personal.example.com",
                        "additional_info_value": "add-info"
                    },
                    "shipping_info": {
                        "name": {
                            "given_name": "Stephanie",
                            "surname": "Meyers"
                        },
                        "address": {
                            "address_line_1": "1234 Main Street",
                            "admin_area_2": "Anytown",
                            "admin_area_1": "CA",
                            "postal_code": "98765",
                            "country_code": "US"
                        }
                    }
                }
            ],
            "items": [
                {
                    "name": "Yoga Mat",
                    "description": "Elastic mat to practice yoga.",
                    "quantity": "1",
                    "unit_amount": {
                        "currency_code": "USD",
                        "value": "50.00"
                    },
                    "tax": {
                        "name": "Sales Tax",
                        "percent": "7.25"
                    },
                    "discount": {
                        "percent": "5"
                    },
                    "unit_of_measure": "QUANTITY"
                },
                {
                    "name": "Yoga t-shirt",
                    "quantity": "1",
                    "unit_amount": {
                        "currency_code": "USD",
                        "value": "10.00"
                    },
                    "tax": {
                        "name": "Sales Tax",
                        "percent": "7.25"
                    },
                    "discount": {
                        "amount": {
                            "currency_code": "USD",
                            "value": "5.00"
                        }
                    },
                    "unit_of_measure": "QUANTITY"
                }
            ],
            "configuration": {
                "partial_payment": {
                    "allow_partial_payment": True,
                    "minimum_amount_due": {
                        "currency_code": "USD",
                        "value": "20.00"
                    }
                },
                "allow_tip": True,
                "tax_calculated_after_discount": True,
                "tax_inclusive": False
            },
            "amount": {
                "breakdown": {
                    "custom": {
                        "label": "Packing Charges",
                        "amount": {
                            "currency_code": "USD",
                            "value": "10.00"
                        }
                    },
                    "shipping": {
                        "amount": {
                            "currency_code": "USD",
                            "value": "10.00"
                        },
                        "tax": {
                            "name": "Sales Tax",
                            "percent": "7.25"
                        }
                    },
                    "discount": {
                        "invoice_discount": {
                            "percent": "5"
                        }
                    }
                }
            }
        }
        url = reverse('paypal_service-create-draft-invoice')
        response = self.client.post(url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_202_ACCEPTED)
        self.assertEqual(response.data["data"], response_data['data'])
        mock_create_draft_invoice.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.create_draft_invoice')
    def test_create_draft_invoice_with_invalid_data(self, mock_create_draft_invoice):
        response_data = {'data': {'name': 'INVALID_REQUEST',
                                  'message': 'Request is not well-formed, syntactically incorrect, or violates schema.',
                                  'debug_id': 'ac7e824c94103', 'details': [
                {'field': '/detail/currency_code', 'location': 'body', 'issue': 'MISSING_REQUIRED_PARAMETER',
                 'description': 'Currency code is missing.'}], 'links': [
                {'href': 'https://developer.paypal.com/docs/api/invoicing/#errors', 'method': 'GET'}]},
                         'status_code': 400}
        mock_create_draft_invoice.return_value = response_data
        data = {
            "detail": {
                "invoice_number": "0002",
                "payment_term": {
                    "term_type": "NET_10",
                    "due_date": "2023-01-09"
                }
            },
            "invoicer": {
                "name": {
                    "given_name": "John",
                    "surname": "Doe"
                },
                "email_address": "sb-notda24548001@personal.example.com"
            },
            "primary_recipients": [
                {
                    "billing_info": {
                        "name": {
                            "given_name": "John",
                            "surname": "Doe"
                        },
                        "email_address": "sb-notda24548001@personal.example.com",
                        "additional_info_value": "add-info"
                    },
                    "shipping_info": {
                        "name": {
                            "given_name": "Stephanie",
                            "surname": "Meyers"
                        },
                        "address": {
                            "address_line_1": "1234 Main Street",
                            "admin_area_2": "Anytown",
                            "admin_area_1": "CA",
                            "postal_code": "98765",
                            "country_code": "US"
                        }
                    }
                }
            ],
            "items": [
                {
                    "name": "Yoga Mat",
                    "description": "Elastic mat to practice yoga.",
                    "quantity": "1",
                    "unit_amount": {
                        "currency_code": "USD",
                        "value": "50.00"
                    },
                    "tax": {
                        "name": "Sales Tax",
                        "percent": "7.25"
                    },
                    "discount": {
                        "percent": "5"
                    },
                    "unit_of_measure": "QUANTITY"
                },
                {
                    "name": "Yoga t-shirt",
                    "quantity": "1",
                    "unit_amount": {
                        "currency_code": "USD",
                        "value": "10.00"
                    },
                    "tax": {
                        "name": "Sales Tax",
                        "percent": "7.25"
                    },
                    "discount": {
                        "amount": {
                            "currency_code": "USD",
                            "value": "5.00"
                        }
                    },
                    "unit_of_measure": "QUANTITY"
                }
            ],
            "configuration": {
                "partial_payment": {
                    "allow_partial_payment": True,
                    "minimum_amount_due": {
                        "currency_code": "USD",
                        "value": "20.00"
                    }
                },
                "allow_tip": True,
                "tax_calculated_after_discount": True,
                "tax_inclusive": False
            },
            "amount": {
                "breakdown": {
                    "custom": {
                        "label": "Packing Charges",
                        "amount": {
                            "currency_code": "USD",
                            "value": "10.00"
                        }
                    },
                    "shipping": {
                        "amount": {
                            "currency_code": "USD",
                            "value": "10.00"
                        },
                        "tax": {
                            "name": "Sales Tax",
                            "percent": "7.25"
                        }
                    },
                    "discount": {
                        "invoice_discount": {
                            "percent": "5"
                        }
                    }
                }
            }
        }
        url = reverse('paypal_service-create-draft-invoice', )
        response = self.client.post(url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["data"], response_data['data'])
        mock_create_draft_invoice.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.show_invoice_details')
    def test_get_invoice_details(self, mock_get_invoice_details):
        response_data = {'data': {'id': 'INV2-JVNA-LP2K-TDKM-BATN', 'status': 'DRAFT',
                                  'detail': {'reference': 'deal-ref', 'currency_code': 'USD',
                                             'note': 'Thank you for your business.', 'memo': 'This is a long contract',
                                             'category_code': 'SHIPPABLE', 'invoice_number': '0002',
                                             'invoice_date': '2022-12-30',
                                             'payment_term': {'term_type': 'NET_10', 'due_date': '2023-01-09'},
                                             'viewed_by_recipient': False, 'group_draft': False,
                                             'metadata': {'create_time': '2023-08-07T14:48:38Z',
                                                          'last_update_time': '2023-08-07T14:48:38Z',
                                                          'created_by_flow': 'REGULAR_SINGLE',
                                                          'recipient_view_url': 'https://www.sandbox.paypal.com/invoice/p/#JVNALP2KTDKMBATN',
                                                          'invoicer_view_url': 'https://www.sandbox.paypal.com/invoice/details/INV2-JVNA-LP2K-TDKM-BATN',
                                                          'caller_type': 'API_V2_INVOICE'}, 'archived': False},
                                  'invoicer': {
                                      'name': {'given_name': 'John', 'surname': 'Doe', 'full_name': 'John Doe'},
                                      'email_address': 'sb-notda24548001@personal.example.com'}, 'primary_recipients': [
                {'billing_info': {'name': {'given_name': 'John', 'surname': 'Doe', 'full_name': 'John Doe'},
                                  'email_address': 'sb-notda24548001@personal.example.com'}, 'shipping_info': {
                    'name': {'given_name': 'Stephanie', 'surname': 'Meyers', 'full_name': 'Stephanie Meyers'},
                    'address': {'address_line_1': '1234 Main Street', 'admin_area_2': 'Anytown', 'admin_area_1': 'CA',
                                'postal_code': '98765', 'country_code': 'US'}}}], 'items': [
                {'id': 'ITEM-1GU27784FL151374N', 'name': 'Yoga Mat', 'description': 'Elastic mat to practice yoga.',
                 'quantity': '1', 'unit_amount': {'currency_code': 'USD', 'value': '50.00'},
                 'tax': {'id': 'TAX-5TS30954CH915874L', 'name': 'Sales Tax', 'percent': '7.25',
                         'amount': {'currency_code': 'USD', 'value': '3.27'}},
                 'discount': {'percent': '5', 'amount': {'currency_code': 'USD', 'value': '-2.50'}},
                 'unit_of_measure': 'QUANTITY'},
                {'id': 'ITEM-3TM07103RV058813Y', 'name': 'Yoga t-shirt', 'quantity': '1',
                 'unit_amount': {'currency_code': 'USD', 'value': '10.00'},
                 'tax': {'id': 'TAX-5TS30954CH915874L', 'name': 'Sales Tax', 'percent': '7.25',
                         'amount': {'currency_code': 'USD', 'value': '0.34'}},
                 'discount': {'amount': {'currency_code': 'USD', 'value': '-5.00'}}, 'unit_of_measure': 'QUANTITY'}],
                                  'configuration': {'tax_calculated_after_discount': True, 'tax_inclusive': False,
                                                    'allow_tip': True,
                                                    'partial_payment': {'allow_partial_payment': True,
                                                                        'minimum_amount_due': {'currency_code': 'USD',
                                                                                               'value': '20.00'}},
                                                    'template_id': 'TEMP-95G635681V994214T'}, 'amount': {
                'breakdown': {'item_total': {'currency_code': 'USD', 'value': '60.00'}, 'discount': {
                    'invoice_discount': {'percent': '5', 'amount': {'currency_code': 'USD', 'value': '-2.63'}},
                    'item_discount': {'currency_code': 'USD', 'value': '-7.50'}},
                              'tax_total': {'currency_code': 'USD', 'value': '4.34'},
                              'shipping': {'amount': {'currency_code': 'USD', 'value': '10.00'},
                                           'tax': {'id': 'TAX-2Y690445LM819384H', 'name': 'Sales Tax',
                                                   'percent': '7.25',
                                                   'amount': {'currency_code': 'USD', 'value': '0.73'}}},
                              'custom': {'label': 'Packing Charges',
                                         'amount': {'currency_code': 'USD', 'value': '10.00'}}}, 'currency_code': 'USD',
                'value': '74.21'}, 'due_amount': {'currency_code': 'USD', 'value': '74.21'}, 'links': [
                {'href': 'https://api.sandbox.paypal.com/v2/invoicing/invoices/INV2-JVNA-LP2K-TDKM-BATN', 'rel': 'self',
                 'method': 'GET'},
                {'href': 'https://api.sandbox.paypal.com/v2/invoicing/invoices/INV2-JVNA-LP2K-TDKM-BATN/send',
                 'rel': 'send', 'method': 'POST'},
                {'href': 'https://api.sandbox.paypal.com/v2/invoicing/invoices/INV2-JVNA-LP2K-TDKM-BATN',
                 'rel': 'replace', 'method': 'PUT'},
                {'href': 'https://api.sandbox.paypal.com/v2/invoicing/invoices/INV2-JVNA-LP2K-TDKM-BATN',
                 'rel': 'delete', 'method': 'DELETE'},
                {'href': 'https://api.sandbox.paypal.com/v2/invoicing/invoices/INV2-JVNA-LP2K-TDKM-BATN/payments',
                 'rel': 'record-payment', 'method': 'POST'}], 'unilateral': False}, 'status_code': 200, 'success': True}
        mock_get_invoice_details.return_value = response_data
        pk = "P-3353356906454002"
        url = reverse('paypal_service-get-invoice-details', args=[pk])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["data"], response_data['data'])
        self.assertEqual(response.data["data"]['detail'], response_data['data']['detail'])
        self.assertEqual(response.data["data"]['invoicer'], response_data['data']['invoicer'])
        mock_get_invoice_details.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.show_invoice_details')
    def test_get_invoice_details_with_invalid_id(self, mock_get_invoice_details):
        response_data = {'data': {'debug_id': '4a35cd7316078', 'details': [], 'links': [
            {'href': 'https://developer.paypal.com/docs/api/invoicing/#errors', 'method': 'GET'}],
                                  'message': 'The specified resource does not exist.', 'name': 'RESOURCE_NOT_FOUND'},
                         'status_code': 404}
        mock_get_invoice_details.return_value = response_data
        wrong_pk = "P-3353356906"
        url = reverse('paypal_service-get-invoice-details', args=[wrong_pk])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data["data"], response_data['data'])
        self.assertEqual(response.data["data"]['debug_id'], response_data['data']['debug_id'])
        self.assertEqual(response.data["data"]['links'], response_data['data']['links'])
        mock_get_invoice_details.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.send_invoice')
    def test_send_invoice(self, mock_send_invoice):
        response_data = {'data': {
            "links": [
                {
                    "href": "string",
                    "rel": "string",
                    "method": "GET"
                }
            ]
        }, 'status_code': 202, 'success': True}
        mock_send_invoice.return_value = response_data
        pk = "INV2-JVNA-LP2K-TDKM-BATN"
        data = {
            "send_to_invoicer": True
        }
        url = reverse('paypal_service-send-invoice', args=[pk])
        response = self.client.post(url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_202_ACCEPTED)
        self.assertEqual(response.data["data"], response_data['data'])
        self.assertEqual(response.data["data"]['links'], response_data['data']['links'])
        self.assertEqual(response.data["data"]['links'][0]['href'], response_data['data']['links'][0]['href'])
        mock_send_invoice.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.send_invoice')
    def test_send_invoice_with_invalid_id(self, mock_send_invoice):
        response_data = {'data': {'debug_id': 'a0a8740ce369d', 'details': [], 'links': [
            {'href': 'https://developer.paypal.com/docs/api/invoicing/#errors', 'method': 'GET'}],
                                  'message': 'The specified resource does not exist.', 'name': 'RESOURCE_NOT_FOUND'},
                         'status_code': 404}
        mock_send_invoice.return_value = response_data
        wrong_pk = "INV2-JVNA-LP2K-TDKM-"
        data = {
            "send_to_invoicer": True
        }
        url = reverse('paypal_service-send-invoice', args=[wrong_pk])
        response = self.client.post(url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data["data"], response_data['data'])
        self.assertEqual(response.data["data"]['debug_id'], response_data['data']['debug_id'])
        self.assertEqual(response.data["data"]['links'], response_data['data']['links'])
        mock_send_invoice.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.list_disputes')
    def test_list_disputes(self, mock_list_disputes):
        response_data = {'data': {'items': [], 'links': [
            {'href': 'https://api-m.sandbox.paypal.com/v1/customer/disputes', 'rel': 'self', 'method': 'GET'},
            {'href': 'https://api-m.sandbox.paypal.com/v1/customer/disputes', 'rel': 'first', 'method': 'GET'}]},
                         'status_code': 200, 'success': True}
        mock_list_disputes.return_value = response_data
        url = reverse('paypal_service-list-disputes')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["data"], response_data['data'])
        self.assertEqual(response.data["data"]['links'], response_data['data']['links'])
        self.assertEqual(response.data["data"]['links'][0]['href'], response_data['data']['links'][0]['href'])
        mock_list_disputes.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.show_dispute_details')
    def test_get_dispute_details(self, mock_get_dispute_details):
        response_data = {'data': {
            "dispute_id": "PP-D-4012",
            "create_time": "2019-04-11T04:18:00.000Z",
            "update_time": "2019-04-21T04:19:08.000Z",
            "disputed_transactions": [
                {
                    "seller_transaction_id": "3BC38643YC807283D",
                    "create_time": "2019-04-11T04:16:58.000Z",
                    "transaction_status": "REVERSED",
                    "gross_amount": {
                        "currency_code": "USD",
                        "value": "192.00"
                    },
                    "buyer": {
                        "name": "Lupe Justin"
                    },
                    "seller": {
                        "email": "merchant@example.com",
                        "merchant_id": "5U29WL78XSAEL",
                        "name": "Lesley Paul"
                    }
                }
            ],
            "reason": "MERCHANDISE_OR_SERVICE_NOT_AS_DESCRIBED",
            "status": "RESOLVED",
            "dispute_amount": {
                "currency_code": "USD",
                "value": "96.00"
            },
            "dispute_outcome": {
                "outcome_code": "RESOLVED_BUYER_FAVOUR",
                "amount_refunded": {
                    "currency_code": "USD",
                    "value": "96.00"
                }
            },
            "dispute_life_cycle_stage": "CHARGEBACK",
            "dispute_channel": "INTERNAL",
            "messages": [
                {
                    "posted_by": "BUYER",
                    "time_posted": "2019-04-11T04:18:04.000Z",
                    "content": "SNAD case created through automation",
                    "documents": [
                        {
                            "name": "SNAD_Issue.pdf",
                            "url": "https://api-m.paypal.com/v2/content/documents/DIS-010-4c465d94-241c-4e1f-b384-9de78f7200bb/files/1/download"
                        }
                    ]
                }
            ],
            "extensions": {
                "merchandize_dispute_properties": {
                    "issue_type": "SERVICE",
                    "service_details": {
                        "sub_reasons": [
                            "INCOMPLETE"
                        ],
                        "purchase_url": "https://ebay.in"
                    }
                }
            },
            "offer": {
                "buyer_requested_amount": {
                    "currency_code": "USD",
                    "value": "96.00"
                },
                "offer_type": "REFUND",
                "history": {
                    "offer_time": "2019-04-29T07:04:54.000Z",
                    "actor": "SELLER",
                    "event_type": "PROPOSED",
                    "offer_type": "REFUND",
                    "offer_amount": {
                        "currency_code": "USD",
                        "value": "96.00"
                    },
                    "notes": "Full refund offer.",
                    "dispute_life_cycle_stage": "CHARGEBACK"
                }
            },
            "links": [
                {
                    "href": "https://api-m.sandbox.paypal.com/v1/customer/disputes/PP-D-4012",
                    "rel": "self",
                    "method": "GET"
                }
            ]
        }, 'status_code': 200, 'success': True}
        mock_get_dispute_details.return_value = response_data
        pk = "INV2-JVNA-LP2K-TDKM-BATN"
        url = reverse('paypal_service-get-dispute-details', args=[pk])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["data"], response_data['data'])
        self.assertEqual(response.data["data"]['disputed_transactions'], response_data['data']['disputed_transactions'])
        self.assertEqual(response.data["data"]["extensions"], response_data['data']['extensions'])
        mock_get_dispute_details.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.show_dispute_details')
    def test_get_dispute_details_with_invalid_id(self, mock_get_dispute_details):
        response_data = {'data': {'name': 'RESOURCE_NOT_FOUND', 'message': 'The specified resource does not exist.',
                                  'debug_id': '249cc72570a16',
                                  'information_link': 'https://developer.paypal.com/docs/api/customer-disputes/v1/#errors',
                                  'details': [{'issue': 'RESOURCE_NOT_FOUND'}], 'links': []}, 'status_code': 404}
        mock_get_dispute_details.return_value = response_data
        wrong_pk = "INV2-JVNA-LP2K-TDKM-"
        url = reverse('paypal_service-get-dispute-details', args=[wrong_pk])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data["data"], response_data['data'])
        self.assertEqual(response.data["data"]['name'], response_data['data']['name'])
        self.assertEqual(response.data["data"]['message'], response_data['data']['message'])
        mock_get_dispute_details.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.accept_claim')
    def test_accept_clam(self, mock_accept_clam):
        response_data = {'data': {
            "links": [
                {
                    "rel": "self",
                    "method": "GET",
                    "href": "https://api-m.sandbox.paypal.com/v1/customer/disputes/PP-D-27803"
                }
            ]
        }, 'status_code': 200, 'success': True}
        mock_accept_clam.return_value = response_data
        pk = "1"
        data = {
            "message": "hello"
        }
        url = reverse('paypal_service-accept-clam', args=[pk])
        response = self.client.post(url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["data"], response_data['data'])
        self.assertEqual(response.data["data"]['links'], response_data['data']['links'])
        self.assertEqual(response.data["data"]['links'][0]['href'], response_data['data']['links'][0]['href'])
        mock_accept_clam.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.accept_claim')
    def test_accept_clam_with_invalid_id(self, mock_accept_clam):
        response_data = {'data': {'name': 'RESOURCE_NOT_FOUND', 'message': 'The specified resource does not exist.',
                                  'debug_id': '249cc72570a16',
                                  'information_link': 'https://developer.paypal.com/docs/api/customer-disputes/v1/#errors',
                                  'details': [{'issue': 'RESOURCE_NOT_FOUND'}], 'links': []}, 'status_code': 404}
        mock_accept_clam.return_value = response_data
        data = {
            "message": "hello"
        }
        wrong_pk = "11221"
        url = reverse('paypal_service-accept-clam', args=[wrong_pk])
        response = self.client.post(url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data["data"], response_data['data'])
        self.assertEqual(response.data["data"]['name'], response_data['data']['name'])
        self.assertEqual(response.data["data"]['message'], response_data['data']['message'])
        mock_accept_clam.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.create_web_hook')
    def test_create_web_hook(self, mock_create_web_hook):
        response_data = {
            'data': {'id': '2X223727MD5479618', 'url': 'https://developer.paypal.com/dashboard/webhooks/sandbox/',
                     'event_types': [{'name': 'PAYMENT.AUTHORIZATION.CREATED',
                                      'description': 'A payment authorization is created, approved, executed, or a future payment authorization is created.'}],
                     'links': [{'href': 'https://api.sandbox.paypal.com/v1/notifications/webhooks/2X223727MD5479618',
                                'rel': 'self', 'method': 'GET'},
                               {'href': 'https://api.sandbox.paypal.com/v1/notifications/webhooks/2X223727MD5479618',
                                'rel': 'update', 'method': 'PATCH'},
                               {'href': 'https://api.sandbox.paypal.com/v1/notifications/webhooks/2X223727MD5479618',
                                'rel': 'delete', 'method': 'DELETE'}]}, 'status_code': 201, 'success': True}
        mock_create_web_hook.return_value = response_data
        data = {
            "url": "https://developer.paypal.com/dashboard/webhooks/sandbox/",
            "event_types": [
                {
                    "name": "PAYMENT.AUTHORIZATION.CREATED"
                }
            ]
        }
        url = reverse('paypal_service-create-web-hook')
        response = self.client.post(url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["data"], response_data['data'])
        self.assertEqual(response.data["data"]['event_types'], response_data['data']['event_types'])
        self.assertEqual(response.data["data"]['links'], response_data['data']['links'])
        self.assertEqual(response.data["data"]['links'][0]['href'], response_data['data']['links'][0]['href'])
        mock_create_web_hook.assert_called_once()

    @mock.patch('modules.django_paypal.paypal.services.paypal.PaypalService.create_web_hook')
    def test_create_web_hook_with_same_data(self, mock_create_web_hook):
        response_data = {'data': {'debug_id': '98db31aa882e7', 'details': [],
                                  'information_link': 'https://developer.paypal.com/docs/api/webhooks/#errors',
                                  'links': [], 'message': 'Webhook URL already exists',
                                  'name': 'WEBHOOK_URL_ALREADY_EXISTS'}, 'status_code': 400}
        mock_create_web_hook.return_value = response_data
        data = {
            "url": "https://developer.paypal.com/dashboard/webhooks/sandbox/",
            "event_types": [
                {
                    "name": "PAYMENT.AUTHORIZATION.CREATED"
                }
            ]
        }
        url = reverse('paypal_service-create-web-hook')
        response = self.client.post(url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["data"], response_data['data'])
        self.assertEqual(response.data["data"]['name'], response_data['data']['name'])
        self.assertEqual(response.data["data"]['information_link'], response_data['data']['information_link'])
        mock_create_web_hook.assert_called_once()
