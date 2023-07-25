from unittest import mock

from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from .models import StripeUserProfile

User = get_user_model()


class PaymentSheetTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='john', email='john34@gmail.com', password='john123@')
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

    @mock.patch('modules.payments.payments.viewsets.stripe.Customer.create')
    @mock.patch('modules.payments.payments.services.StripeService.StripeService.create_payment_intent_sheet')
    def test_create_payment_intent(self, create_payment_intent_sheet_mock, stripe_Customer_create_mock):
        responses = dict(paymentIntent='pi_3MRXEOHoclwoilpC0abme7kH_secret_2iOQZgcjjEs6I9rlREMMw73bK',
                         ephemeralKey='ek_test_YWNjdF8xTVJXUTNIb2Nsd29pbHBDLGVGQnQ2dThFQmRkbGpDbEcxSnVER3MyNkdIVm9uaTE_00kebdfIzi',
                         customer='cus_NBuhdM3dJZeQa3')
        create_payment_intent_sheet_mock.return_value = responses
        stripe_Customer_create_mock.return_value = {"id": "cus_NBuhdM3dJZeQa3"}
        url = '/modules/payments/payment_sheet/'
        response = self.client.post(url, format='json')
        self.assertEqual(responses['paymentIntent'], response.data['paymentIntent'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        create_payment_intent_sheet_mock.assert_called_once()
        create_payment_intent_sheet_mock.assert_called_once_with(response.data['customer'], 100)

    @mock.patch('modules.payments.payments.viewsets.stripe.Customer.create')
    @mock.patch('modules.payments.payments.services.StripeService.StripeService.create_payment_intent_sheet')
    def test_create_payment_intent_with_stripe_customer_id(self, create_payment_intent_sheet_mock,
                                                           stripe_Customer_create_mock):
        new_user = User.objects.create(username='wick', email='wick77@gmail.com', password='wick123@')
        tokens = Token.objects.create(user=new_user)
        stripe_profile, created = StripeUserProfile.objects.get_or_create(user_id=new_user.pk)
        if not created:
            stripe_profile.stripe_cus_id = "cus_NBuhdM3dJZeQa3"
            stripe_profile.save()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + tokens.key)
        responses = {'paymentIntent': 'pi_3MRXEOHoclwoilpC0abme7kH_secret_2iOQZgcjjEs6I9rlREMMw73bK',
                     'ephemeralKey': 'ek_test_YWNjdF8xTVJXUTNIb2Nsd29pbHBDLGVGQnQ2dThFQmRkbGpDbEcxSnVER3MyNkdIVm9uaTE_00kebdfIzi',
                     'customer': 'cus_NBuhdM3dJZeQa3'}
        create_payment_intent_sheet_mock.return_value = responses
        stripe_Customer_create_mock.return_value = {"id": "cus_NBuhdM3dJZeQa3"}
        url = '/modules/payments/payment_sheet/'
        response = self.client.post(url, format='json')
        self.assertEqual(responses['paymentIntent'], response.data['paymentIntent'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        create_payment_intent_sheet_mock.assert_called_once()
        create_payment_intent_sheet_mock.assert_called_once_with(response.data['customer'], 100)

    @mock.patch('modules.payments.payments.services.StripeService.StripeService.create_payment_intent_sheet')
    def test_create_payment_intent_without_authorization(self, create_payment_intent_mock):
        self.client.force_authenticate(user=None, token=None)
        responses = None
        create_payment_intent_mock.return_value = responses
        url = '/modules/payments/payment_sheet/'
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class GetStripePaymentsTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create(username='david', email='david77@gmail.com', password='david123@')
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

    @mock.patch('modules.payments.payments.services.StripeService.StripeService.get_payments_history')
    def test_get_stripe_payments_history(self, get_stripe_payments_mock):
        responses = {
            "success": True,
            "data": [
                {
                    "id": "pi_3MRXEOHoclwoilpC0abme7kH",
                    "object": "payment_intent",
                    "amount": 100,
                    "amount_capturable": 0,
                    "amount_details": {
                        "tip": {}
                    },
                    "amount_received": 0,
                    "application": 'null',
                    "application_fee_amount": "null",
                    "automatic_payment_methods": "null",
                    "canceled_at": "null",
                    "cancellation_reason": "null",
                    "capture_method": "automatic",
                    "client_secret": "pi_3MRXEOHoclwoilpC0abme7kH_secret_2iOQZgcjjEs6I9rlREMMw73bK",
                    "confirmation_method": "automatic",
                    "created": 1674031372,
                    "currency": "usd",
                    "customer": "cus_NBuhdM3dJZeQa3",
                    "description": "null",
                    "invoice": "null",
                    "last_payment_error": "null",
                    "latest_charge": "null",
                    "livemode": "false",
                    "metadata": {},
                    "next_action": "null",
                    "on_behalf_of": "null",
                    "payment_method": "null",
                    "payment_method_options": {
                        "card": {
                            "installments": "null",
                            "mandate_options": "null",
                            "network": "null",
                            "request_three_d_secure": "automatic"
                        }
                    },
                    "payment_method_types": [
                        "card"
                    ],
                    "processing": "null",
                    "receipt_email": "null",
                    "review": "null",
                    "setup_future_usage": "null",
                    "shipping": "null",
                    "source": "null",
                    "statement_descriptor": "null",
                    "statement_descriptor_suffix": "null",
                    "status": "requires_payment_method",
                    "transfer_data": "null",
                    "transfer_group": "null"
                },
                {
                    "id": "pi_3MRWyIHoclwoilpC0wZIm65k",
                    "object": "payment_intent",
                    "amount": 100,
                    "amount_capturable": 0,
                    "amount_details": {
                        "tip": {}
                    },
                    "amount_received": 0,
                    "application": "null",
                    "application_fee_amount": "null",
                    "automatic_payment_methods": "null",
                    "canceled_at": "null",
                    "cancellation_reason": "null",
                    "capture_method": "automatic",
                    "client_secret": "pi_3MRWyIHoclwoilpC0wZIm65k_secret_9ncYvtXhHO1m5sR61gaeVynNm",
                    "confirmation_method": "automatic",
                    "created": 1674030374,
                    "currency": "usd",
                    "customer": "cus_NBuhdM3dJZeQa3",
                    "description": "null",
                    "invoice": "null",
                    "last_payment_error": "null",
                    "latest_charge": "null",
                    "livemode": "false",
                    "metadata": {},
                    "next_action": "null",
                    "on_behalf_of": "null",
                    "payment_method": "null",
                    "payment_method_options": {
                        "card": {
                            "installments": "null",
                            "mandate_options": "null",
                            "network": "null",
                            "request_three_d_secure": "automatic"
                        }
                    },
                    "payment_method_types": [
                        "card"
                    ],
                    "processing": "null",
                    "receipt_email": "null",
                    "review": "null",
                    "setup_future_usage": "null",
                    "shipping": "null",
                    "source": "null",
                    "statement_descriptor": "null",
                    "statement_descriptor_suffix": "null",
                    "status": "requires_payment_method",
                    "transfer_data": "null",
                    "transfer_group": "null"
                }
            ]
        }
        get_stripe_payments_mock.return_value = responses
        url = '/modules/payments/get_payments_history/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['data']['data'], responses['data'])
        self.assertEqual(response.data['data']['data'][0], responses['data'][0])
        self.assertEqual(response.data['success'], responses['success'])
        get_stripe_payments_mock.assert_called_once()
        get_stripe_payments_mock.assert_called_once_with(None)

    @mock.patch('modules.payments.payments.services.StripeService.StripeService.get_payments_history')
    def test_get_stripe_payments_history_with_user_stripe_customer_id(self, get_stripe_payments_mock):
        new_user = User.objects.create(username='wick', email='wick77@gmail.com', password='wick123@')
        tokens = Token.objects.create(user=new_user)
        stripe_profile, created = StripeUserProfile.objects.get_or_create(user_id=new_user.pk)
        if not created:
            stripe_profile.stripe_cus_id = "cus_NBuhdM3dJZeQa3"
            stripe_profile.save()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + tokens.key)
        responses = {
            "success": True,
            "data": [
                {
                    "id": "pi_3MRXEOHoclwoilpC0abme7kH",
                    "object": "payment_intent",
                    "amount": 100,
                    "amount_capturable": 0,
                    "amount_details": {
                        "tip": {}
                    },
                    "amount_received": 0,
                    "application": 'null',
                    "application_fee_amount": "null",
                    "automatic_payment_methods": "null",
                    "canceled_at": "null",
                    "cancellation_reason": "null",
                    "capture_method": "automatic",
                    "client_secret": "pi_3MRXEOHoclwoilpC0abme7kH_secret_2iOQZgcjjEs6I9rlREMMw73bK",
                    "confirmation_method": "automatic",
                    "created": 1674031372,
                    "currency": "usd",
                    "customer": "cus_NBuhdM3dJZeQa3",
                    "description": "null",
                    "invoice": "null",
                    "last_payment_error": "null",
                    "latest_charge": "null",
                    "livemode": "false",
                    "metadata": {},
                    "next_action": "null",
                    "on_behalf_of": "null",
                    "payment_method": "null",
                    "payment_method_options": {
                        "card": {
                            "installments": "null",
                            "mandate_options": "null",
                            "network": "null",
                            "request_three_d_secure": "automatic"
                        }
                    },
                    "payment_method_types": [
                        "card"
                    ],
                    "processing": "null",
                    "receipt_email": "null",
                    "review": "null",
                    "setup_future_usage": "null",
                    "shipping": "null",
                    "source": "null",
                    "statement_descriptor": "null",
                    "statement_descriptor_suffix": "null",
                    "status": "requires_payment_method",
                    "transfer_data": "null",
                    "transfer_group": "null"
                },
                {
                    "id": "pi_3MRWyIHoclwoilpC0wZIm65k",
                    "object": "payment_intent",
                    "amount": 100,
                    "amount_capturable": 0,
                    "amount_details": {
                        "tip": {}
                    },
                    "amount_received": 0,
                    "application": "null",
                    "application_fee_amount": "null",
                    "automatic_payment_methods": "null",
                    "canceled_at": "null",
                    "cancellation_reason": "null",
                    "capture_method": "automatic",
                    "client_secret": "pi_3MRWyIHoclwoilpC0wZIm65k_secret_9ncYvtXhHO1m5sR61gaeVynNm",
                    "confirmation_method": "automatic",
                    "created": 1674030374,
                    "currency": "usd",
                    "customer": "cus_NBuhdM3dJZeQa3",
                    "description": "null",
                    "invoice": "null",
                    "last_payment_error": "null",
                    "latest_charge": "null",
                    "livemode": "false",
                    "metadata": {},
                    "next_action": "null",
                    "on_behalf_of": "null",
                    "payment_method": "null",
                    "payment_method_options": {
                        "card": {
                            "installments": "null",
                            "mandate_options": "null",
                            "network": "null",
                            "request_three_d_secure": "automatic"
                        }
                    },
                    "payment_method_types": [
                        "card"
                    ],
                    "processing": "null",
                    "receipt_email": "null",
                    "review": "null",
                    "setup_future_usage": "null",
                    "shipping": "null",
                    "source": "null",
                    "statement_descriptor": "null",
                    "statement_descriptor_suffix": "null",
                    "status": "requires_payment_method",
                    "transfer_data": "null",
                    "transfer_group": "null"
                }
            ]
        }
        get_stripe_payments_mock.return_value = responses
        url = '/modules/payments/get_payments_history/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['data']['data'], responses['data'])
        self.assertEqual(response.data['data']['data'][0], responses['data'][0])
        self.assertEqual(response.data['success'], responses['success'])
        get_stripe_payments_mock.assert_called_once()
        get_stripe_payments_mock.assert_called_once_with("cus_NBuhdM3dJZeQa3")

    @mock.patch('modules.payments.payments.services.StripeService.StripeService.get_payments_history')
    def test_get_stripe_payments_history_without_authorization(self, get_stripe_payments_mock):
        self.client.force_authenticate(user=None, token=None)
        responses = None
        get_stripe_payments_mock.return_value = responses
        url = '/modules/payments/get_payments_history/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class GetPaymentMethodsTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create(username='david', email='david77@gmail.com', password='david123@')
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

    @mock.patch('modules.payments.payments.services.StripeService.StripeService.get_payments_methods')
    def test_get_payments_methods(self, get_payments_methods_mock):
        responses = {'success': True, 'data': []}
        get_payments_methods_mock.return_value = responses
        url = '/modules/payments/get_payments_methods/'
        response = self.client.get(url)
        self.assertEqual(response.data['success'], responses['success'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        get_payments_methods_mock.assert_called_once()
        get_payments_methods_mock.assert_called_once_with(None)

    @mock.patch('modules.payments.payments.services.StripeService.StripeService.get_payments_methods')
    def test_get_payments_methods_with_user_stripe_customer_id(self, get_payments_methods_mock):
        new_user = User.objects.create(username='wick', email='wick77@gmail.com', password='wick123@')
        tokens = Token.objects.create(user=new_user)
        stripe_profile, created = StripeUserProfile.objects.get_or_create(user_id=new_user.pk)
        if not created:
            stripe_profile.stripe_cus_id = "cus_NBuhdM3dJZeQa3"
            stripe_profile.save()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + tokens.key)
        responses = {'success': True, 'data': []}
        get_payments_methods_mock.return_value = responses
        url = '/modules/payments/get_payments_methods/'
        response = self.client.get(url)
        self.assertEqual(response.data['success'], responses['success'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        get_payments_methods_mock.assert_called_once()
        get_payments_methods_mock.assert_called_once_with("cus_NBuhdM3dJZeQa3")

    @mock.patch('modules.payments.payments.services.StripeService.StripeService.get_payments_methods')
    def test_get_payments_methods_without_authorization(self, get_payments_methods_mock):
        self.client.force_authenticate(user=None, token=None)
        responses = None
        get_payments_methods_mock.return_value = responses
        url = '/modules/payments/get_payments_methods/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
