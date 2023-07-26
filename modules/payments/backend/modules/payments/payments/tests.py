from unittest import mock

from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from .models import StripeUserProfile, StripeSetting

User = get_user_model()


class PaymentSheetTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='john', email='john34@gmail.com', password='john123@')
        self.token = Token.objects.create(user=self.user)
        self.stripe_user = User.objects.create_user(username='david', email='david4@gmail.com', password='david123@')
        self.stripe_user_token = Token.objects.create(user=self.stripe_user)
        self.stripe_setting = StripeSetting.objects.create(user=self.stripe_user)
        self.stripe_setting_user = User.objects.create_user(username='alan', email='alan4@gmail.com',
                                                            password='alan123@')
        self.stripe_setting_user_token = Token.objects.create(user=self.stripe_setting_user)
        self.stripe_setting = StripeSetting.objects.create(user=self.stripe_setting_user, is_wallet_connect=True)

    @mock.patch('modules.payments.payments.viewsets.stripe.Customer.create')
    @mock.patch('modules.payments.payments.services.StripeService.StripeService.create_payment_intent_sheet')
    def test_create_payment_intent(self, create_payment_intent_sheet_mock, stripe_customer_create_mock):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        Response = dict(paymentIntent='pi_3MRXEOHoclwoilpC0abme7kH_secret_2iOQZgcjjEs6I9rlREMMw73bK',
                        ephemeralKey='ek_test_YWNjdF8xTVJXUTNIb2Nsd29pbHBDLGVGQnQ2dThFQmRkbGpDbEcxSnVER3MyNkdIVm9uaTE_00kebdfIzi',
                        customer='cus_NBuhdM3dJZeQa3')
        create_payment_intent_sheet_mock.return_value = Response
        stripe_customer_create_mock.return_value = {"id": "cus_NBuhdM3dJZeQa3"}
        url = '/modules/payments/create_payment_intent_sheet/'
        response = self.client.post(url, format='json')
        self.assertEqual(Response['paymentIntent'], response.data['paymentIntent'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        create_payment_intent_sheet_mock.assert_called_once()
        create_payment_intent_sheet_mock.assert_called_once_with(response.data['customer'], 100)

    @mock.patch('modules.payments.payments.viewsets.stripe.Customer.create')
    @mock.patch('modules.payments.payments.services.StripeService.StripeService.create_payment_intent_sheet')
    def test_create_payment_intent_with_stripe_setting(self, create_payment_intent_sheet_mock,
                                                       stripe_customer_create_mock):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.stripe_user_token.key)
        Response = dict(paymentIntent='pi_3MRXEOHoclwoilpC0abme7kH_secret_2iOQZgcjjEs6I9rlREMMw73bK',
                        ephemeralKey='ek_test_YWNjdF8xTVJXUTNIb2Nsd29pbHBDLGVGQnQ2dThFQmRkbGpDbEcxSnVER3MyNkdIVm9uaTE_00kebdfIzi',
                        customer='cus_NBuhdM3dJZeQa3')
        create_payment_intent_sheet_mock.return_value = Response
        stripe_customer_create_mock.return_value = {"id": "cus_NBuhdM3dJZeQa3"}
        url = '/modules/payments/create_payment_intent_sheet/'
        response = self.client.post(url, format='json')
        self.assertEqual(Response['paymentIntent'], response.data['paymentIntent'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        create_payment_intent_sheet_mock.assert_called_once()
        create_payment_intent_sheet_mock.assert_called_once_with(response.data['customer'], 100)

    @mock.patch('modules.payments.payments.viewsets.stripe.Customer.create')
    @mock.patch('modules.payments.payments.services.StripeService.StripeService.create_payment_intent_sheet')
    def test_create_payment_intent_with_stripe_setting_wallet_connect(self, create_payment_intent_sheet_mock,
                                                                      stripe_customer_create_mock):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.stripe_setting_user_token.key)
        Response = dict(paymentIntent='pi_3MRXEOHoclwoilpC0abme7kH_secret_2iOQZgcjjEs6I9rlREMMw73bK',
                        ephemeralKey='ek_test_YWNjdF8xTVJXUTNIb2Nsd29pbHBDLGVGQnQ2dThFQmRkbGpDbEcxSnVER3MyNkdIVm9uaTE_00kebdfIzi',
                        customer='cus_NBuhdM3dJZeQa3')
        create_payment_intent_sheet_mock.return_value = Response
        stripe_customer_create_mock.return_value = {"id": "cus_NBuhdM3dJZeQa3"}
        url = '/modules/payments/create_payment_intent_sheet/'
        response = self.client.post(url, format='json')
        self.assertEqual(Response['paymentIntent'], response.data['paymentIntent'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        create_payment_intent_sheet_mock.assert_called_once()

    @mock.patch('modules.payments.payments.viewsets.stripe.Customer.create')
    @mock.patch('modules.payments.payments.services.StripeService.StripeService.create_payment_intent_sheet')
    def test_create_payment_intent_with_stripe_customer_id(self, create_payment_intent_sheet_mock,
                                                           stripe_customer_create_mock):
        new_user = User.objects.create(username='wick', email='wick77@gmail.com', password='wick123@')
        tokens = Token.objects.create(user=new_user)
        stripe_profile, created = StripeUserProfile.objects.get_or_create(user_id=new_user.pk)
        if not created:
            stripe_profile.stripe_cus_id = "cus_NBuhdM3dJZeQa3"
            stripe_profile.save()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + tokens.key)
        Response = {'paymentIntent': 'pi_3MRXEOHoclwoilpC0abme7kH_secret_2iOQZgcjjEs6I9rlREMMw73bK',
                    'ephemeralKey': 'ek_test_YWNjdF8xTVJXUTNIb2Nsd29pbHBDLGVGQnQ2dThFQmRkbGpDbEcxSnVER3MyNkdIVm9uaTE_00kebdfIzi',
                    'customer': 'cus_NBuhdM3dJZeQa3'}
        create_payment_intent_sheet_mock.return_value = Response
        stripe_customer_create_mock.return_value = {"id": "cus_NBuhdM3dJZeQa3"}
        url = '/modules/payments/create_payment_intent_sheet/'
        response = self.client.post(url, format='json')
        self.assertEqual(Response['paymentIntent'], response.data['paymentIntent'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        create_payment_intent_sheet_mock.assert_called_once()
        create_payment_intent_sheet_mock.assert_called_once_with(response.data['customer'], 100)

    def test_create_payment_intent_without_authorization(self):
        url = '/modules/payments/create_payment_intent_sheet/'
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_payment_intent_without_stripe_profile(self):
        self.get_user = User.objects.create(username='wick', email='wick77@gmail.com', password='wick123@')
        tokens = Token.objects.create(user=self.get_user)
        StripeUserProfile.objects.get(user=self.get_user).delete()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + tokens.key)
        url = '/modules/payments/create_payment_intent_sheet/'
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class GetStripePaymentsTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create(username='david', email='david77@gmail.com', password='david123@')
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

    @mock.patch('modules.payments.payments.services.StripeService.StripeService.get_payments_history')
    def test_get_stripe_payments_history(self, get_stripe_payments_mock):
        Response = {
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
                    "capture_method": "automatic",
                    "client_secret": "pi_3MRXEOHoclwoilpC0abme7kH_secret_2iOQZgcjjEs6I9rlREMMw73bK",
                    "confirmation_method": "automatic",
                    "created": 1674031372,
                    "currency": "usd",
                    "customer": "cus_NBuhdM3dJZeQa3",
                    "payment_method_options": {
                        "card": {
                            "request_three_d_secure": "automatic"
                        }
                    },
                    "payment_method_types": [
                        "card"
                    ],
                    "status": "requires_payment_method",
                }
            ]
        }
        get_stripe_payments_mock.return_value = Response
        url = '/modules/payments/get_payments_history/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['data']['data'], Response['data'])
        self.assertEqual(response.data['data']['data'][0], Response['data'][0])
        self.assertEqual(response.data['success'], Response['success'])
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
        Response = {
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
                    "capture_method": "automatic",
                    "client_secret": "pi_3MRXEOHoclwoilpC0abme7kH_secret_2iOQZgcjjEs6I9rlREMMw73bK",
                    "confirmation_method": "automatic",
                    "created": 1674031372,
                    "currency": "usd",
                    "customer": "cus_NBuhdM3dJZeQa3",
                    "payment_method_options": {
                        "card": {
                            "request_three_d_secure": "automatic"
                        }
                    },
                    "payment_method_types": [
                        "card"
                    ],
                    "status": "requires_payment_method",
                }
            ]
        }
        get_stripe_payments_mock.return_value = Response
        url = '/modules/payments/get_payments_history/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['data']['data'], Response['data'])
        self.assertEqual(response.data['data']['data'][0], Response['data'][0])
        self.assertEqual(response.data['success'], Response['success'])
        get_stripe_payments_mock.assert_called_once()
        get_stripe_payments_mock.assert_called_once_with("cus_NBuhdM3dJZeQa3")

    @mock.patch('modules.payments.payments.services.StripeService.StripeService.get_payments_history')
    def test_get_stripe_payments_history_without_authorization(self, get_stripe_payments_mock):
        self.client.force_authenticate(user=None, token=None)
        Response = None
        get_stripe_payments_mock.return_value = Response
        url = '/modules/payments/get_payments_history/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_payment_history_without_stripe_profile(self):
        self.get_user = User.objects.create(username='wicks', email='wicks77@gmail.com', password='wicks123@')
        tokens = Token.objects.create(user=self.get_user)
        StripeUserProfile.objects.get(user=self.get_user).delete()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + tokens.key)
        url = '/modules/payments/get_payments_history/'
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class GetPaymentMethodsTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create(username='david', email='david77@gmail.com', password='david123@')
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

    @mock.patch('modules.payments.payments.services.StripeService.StripeService.get_payments_methods')
    def test_get_payments_methods(self, get_payments_methods_mock):
        Response = {'success': True, 'data': []}
        get_payments_methods_mock.return_value = Response
        url = '/modules/payments/get_payments_methods/'
        response = self.client.get(url)
        self.assertEqual(response.data['success'], Response['success'])
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
        Response = {'success': True, 'data': []}
        get_payments_methods_mock.return_value = Response
        url = '/modules/payments/get_payments_methods/'
        response = self.client.get(url)
        self.assertEqual(response.data['success'], Response['success'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        get_payments_methods_mock.assert_called_once()
        get_payments_methods_mock.assert_called_once_with("cus_NBuhdM3dJZeQa3")

    @mock.patch('modules.payments.payments.services.StripeService.StripeService.get_payments_methods')
    def test_get_payments_methods_without_authorization(self, get_payments_methods_mock):
        self.client.force_authenticate(user=None, token=None)
        Response = None
        get_payments_methods_mock.return_value = Response
        url = '/modules/payments/get_payments_methods/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_payment_method_without_stripe_profile(self):
        self.get_user = User.objects.create(username='vicky', email='vicky77@gmail.com', password='vicky123@')
        tokens = Token.objects.create(user=self.get_user)
        StripeUserProfile.objects.get(user=self.get_user).delete()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + tokens.key)
        url = '/modules/payments/get_payments_methods/'
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
