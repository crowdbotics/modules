from unittest import mock

from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from .models import TwoFactorAuth, EnableTwoFactorAuthentication

User = get_user_model()


class TwoFactorAuthenticationTestCase(APITestCase):
    def setUp(self):
        self.two_fa_user = User.objects.create_user(username="john", email="fabelet661@semonir.com",
                                                    phone_number="+447520662353",
                                                    password="john123@")
        self.enable_two_fa_user = EnableTwoFactorAuthentication.objects.create(user=self.two_fa_user, method='email')
        self.two_fa_user_token = Token.objects.create(user=self.two_fa_user)
        self.two_fa_user_token.save()
        self.new_user = User.objects.create_user(username="walker", email="fabelet661@semonir.com",
                                                 phone_number="+447520662353",
                                                 password="john123@")
        self.enable_two_fa_new_user = EnableTwoFactorAuthentication.objects.create(user=self.new_user,
                                                                                   method='phone_number')
        self.enable_two_fa_new_user_token = Token.objects.create(user=self.new_user)
        self.enable_two_fa_new_user_token.save()
        self.simple_user = User.objects.create_user(username="william", phone_number="+447520662353",
                                                    password="william123@")
        self.simple_user_token = Token.objects.create(user=self.simple_user)
        self.simple_user_token.save()

    @mock.patch(
        'modules.django_two_factor_authentication.two_factor_authentication.service.TwoFactorAuthenticationService.SendGridAPIClient.send')
    def test_send_otp_with_email(self, send_otp_with_email_mock):
        Response = {
            "message": "Verification code has been sent to your Email Address",
            "status": 200
        }
        send_otp_with_email_mock.return_value = Response
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.two_fa_user_token.key)
        url = '/modules/two-factor-authentication/send/otp'
        data = {
            "method": "email"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.data, {
            "message": "Verification code has been sent to your Email Address"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        send_otp_with_email_mock.assert_called_once()

    @mock.patch(
        "modules.django_two_factor_authentication.two_factor_authentication.service.TwoFactorAuthenticationService.Client")
    def test_send_otp_with_phone_number(self, send_otp_with_phone_number_mock):
        mock_message_create = send_otp_with_phone_number_mock.messages.create
        Response = {
            "message": "Verification code has been sent to your Phone number",
            "status": 200
        }
        mock_message_create.return_value = Response
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.enable_two_fa_new_user_token.key)
        url = '/modules/two-factor-authentication/send/otp'
        data = {"method": "phone_number"}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.data, {
            "message": "Verification code has been sent to your Phone number"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        send_otp_with_phone_number_mock.assert_called_once()

    def test_send_otp_with_invalid_method(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.two_fa_user_token.key)
        url = '/modules/two-factor-authentication/send/otp'
        data = {"meth": "email"}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_send_otp_without_two_fa_enabled_user(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.simple_user_token.key)
        url = '/modules/two-factor-authentication/send/otp'
        data = {"method": "email"}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.data,
                         {"message": "Two factor authentication is not enabled"})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_send_otp_with_two_fa_enabled_user_and_invalid_method(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.two_fa_user_token.key)
        url = '/modules/two-factor-authentication/send/otp'
        data = {"method": "phone_number"}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.data,
                         {"message": "You have not selected valid method"})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_send_otp_with_invalid_user(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.simple_user_token.key)
        url = '/modules/two-factor-authentication/send/otp'
        data = {"method": "phone_number"}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_send_otp_without_user(self):
        url = '/modules/two-factor-authentication/send/otp'
        data = {"method": "email"}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class GoogleAuthenticatorTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="william", email="william24@gmail.com",
                                             phone_number="+14442222333", password="william123@")
        self.user_enable_two_fa = EnableTwoFactorAuthentication.objects.create(user=self.user,
                                                                               method='google_authenticator')
        self.user_token = Token.objects.create(user=self.user)
        self.user_token.save()
        self.simple_user = User.objects.create_user(username="john", phone_number="+447520662393",
                                                    password="john123@")
        self.two_fa_user = TwoFactorAuth.objects.create(user=self.user, method="email", code="112233")
        self.simple_user_token = Token.objects.create(user=self.simple_user)
        self.simple_user_token.save()
        self.test_invalid_user = User.objects.create_user(username="alan_walker", phone_number="+447520662393",
                                                          password="alan123@")
        self.enable_two_fa_test_invalid_user = EnableTwoFactorAuthentication.objects.create(user=self.test_invalid_user,
                                                                                            method='email')
        self.test_invalid_user_token = Token.objects.create(user=self.test_invalid_user)
        self.test_invalid_user_token.save()

    @mock.patch(
        "modules.django_two_factor_authentication.two_factor_authentication.service.TwoFactorAuthenticationService.TwoFactorAuthenticationService.google_authenticator")
    def test_get_link_with_google_authenticator(self, get_link_with_google_authenticator_mock):
        Response = {'data': {'link': 'otpauth://totp/2FA:fabelet661%40semonir.com?secret=3232323232323232&issuer=2FA'},
                    'status': 200}
        get_link_with_google_authenticator_mock.return_value = Response
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = '/modules/two-factor-authentication/google/authenticator/qr'
        response = self.client.get(url, format='json')
        get_link_with_google_authenticator_mock.assert_called_once()
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_google_auth_link_without_two_fa_enabled_user(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.simple_user_token.key)
        url = '/modules/two-factor-authentication/google/authenticator/qr'
        response = self.client.get(url, format='json')
        self.assertEqual(response.data, {"message": "Two factor authentication is not enabled"})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_google_authenticator_link_by_enabled_two_fa_user_with_invalid_method(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.test_invalid_user_token.key)
        url = '/modules/two-factor-authentication/google/authenticator/qr'
        response = self.client.get(url, format='json')
        self.assertEqual(response.data, {"message": "You have not selected valid method"})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_google_authenticator_link_without_user(self):
        url = '/modules/two-factor-authentication/google/authenticator/qr'
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_str_is_equal_to_two_factor_user(self):
        factor = TwoFactorAuth.objects.get(pk=1)
        self.assertEqual(str(factor), factor.user.username)

    def test_str_is_equal_to_enable_two_factor_user(self):
        factor = EnableTwoFactorAuthentication.objects.get(pk=1)
        self.assertEqual(str(factor), factor.user.username)


class OTPVerificationTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="john", email="fabelet661@semonir.com", phone_number=+14442222333,
                                             password="john123@")
        self.user_enable_two_fa = EnableTwoFactorAuthentication.objects.create(user=self.user,
                                                                               method='google_authenticator')
        self.user_token = Token.objects.create(user=self.user)
        self.user_token.save()
        self.test_user = User.objects.create_user(username="alan_walker", email="fabelet661@semonir.com",
                                                  phone_number=+14442222333,
                                                  password="alan123@")
        self.user_enable_two_fa = EnableTwoFactorAuthentication.objects.create(user=self.test_user,
                                                                               method='email')
        self.test_user_token = Token.objects.create(user=self.test_user)
        self.test_user_token.save()
        self.new_user = User.objects.create_user(username="devil", email="devil24@gmail.com", password="devil123@")
        self.two_fa_user = TwoFactorAuth.objects.create(user=self.new_user, method='email', code=112233)
        self.two_fa_token = Token.objects.create(user=self.new_user)
        self.two_fa_token.save()

    @mock.patch(
        "modules.django_two_factor_authentication.two_factor_authentication.service.TwoFactorAuthenticationService.TwoFactorAuthenticationService.otp_verification")
    def test_verify_otp_with_google_authenticator(self, verify_otp_with_google_authenticator_mock):
        Response = {"data": {"message": "Verified"}}
        verify_otp_with_google_authenticator_mock.return_value = Response
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = '/modules/two-factor-authentication/verify/otp'
        data = {
            "method": "google_authenticator",
            "code": 123213
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.data, {'message': 'Verified'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        verify_otp_with_google_authenticator_mock.assert_called_once()

    def test_verify_expired_otp_with_google_authenticator(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.two_fa_token.key)
        url = '/modules/two-factor-authentication/verify/otp'
        data = {
            "method": "google_authenticator",
            "code": 123345
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.data, {'error': ['Code expired']})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @mock.patch(
        'modules.django_two_factor_authentication.two_factor_authentication.service.TwoFactorAuthenticationService.SendGridAPIClient.send')
    @mock.patch(
        "modules.django_two_factor_authentication.two_factor_authentication.service.TwoFactorAuthenticationService.TwoFactorAuthenticationService.otp_verification")
    def test_verify_otp_with_email(self, verify_otp_with_email_mock, verify_send_email_mock):
        Responses = {
            "message": "Verification code has been sent to your Email Address",
            "status": 200
        }
        verify_send_email_mock.return_value = Responses
        Response = {"data": {"message": "Verified"}}
        verify_otp_with_email_mock.return_value = Response
        self.client.login(username='alan_walker', password="alan123@")
        url = '/modules/two-factor-authentication/send/otp'
        data = {"method": "email"}
        self.client.post(url, data, format='json')
        url = '/modules/two-factor-authentication/verify/otp'
        data = {
            "method": "email",
            "code": 112233
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.data, {'message': 'Verified'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        verify_otp_with_email_mock.assert_called_once()
        verify_send_email_mock.assert_called_once()

    def test_verify_otp_with_invalid_user(self):
        url = '/modules/two-factor-authentication/verify/otp'
        data = {
            "method": "phone_number",
            "code": 112233
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_verify_otp_with_invalid_method(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = '/modules/two-factor-authentication/verify/otp'
        data = {
            "code": 938088
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_verify_opt_with_invalid_code_for_enabled_users(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.two_fa_token.key)
        url = '/modules/two-factor-authentication/verify/otp/enable'
        data = {
            "code": "39733",
            "method": "email"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_verify_opt_for_enabled_users(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.two_fa_token.key)
        url = '/modules/two-factor-authentication/verify/otp/enable'
        data = {
            "code": 112233,
            "method": "email"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_verify_otp_with_invalid_method_with_two_fa_user(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = '/modules/two-factor-authentication/verify/otp'
        data = {
            "code": 938088,
            "method": "email"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.data, {"message": "Two factor authentication is not enabled"})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class EnableTwoFactorAuthTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="john", email="fabelet661@semonir.com", phone_number=+14442222333,
                                             password="john123@")
        self.user_token = Token.objects.create(user=self.user)
        self.user_token.save()
        self.new_user = User.objects.create_user(username="devil", email="devil24@gmail.com", password="devil123@")
        self.enable_two_fa_user = EnableTwoFactorAuthentication.objects.create(user=self.new_user, method='email')
        self.two_fa_token = Token.objects.create(user=self.new_user)
        self.two_fa_token.save()

    @mock.patch(
        'modules.django_two_factor_authentication.two_factor_authentication.service.TwoFactorAuthenticationService.SendGridAPIClient.send')
    def test_enable_two_factor_authentication_by_email(self, enable_two_factor_authentication_mock_by_email):
        Response = {
            "message": "Verification code has been sent to your Email Address",
            "status": 200
        }
        enable_two_factor_authentication_mock_by_email.return_value = Response
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = '/modules/two-factor-authentication/enable/2fa'
        data = {
            "method": "email"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        enable_two_factor_authentication_mock_by_email.assert_called_once()

    @mock.patch(
        "modules.django_two_factor_authentication.two_factor_authentication.service.TwoFactorAuthenticationService.Client")
    def test_enable_two_factor_authentication_by_phone_number(self,
                                                              enable_two_factor_authentication_by_phone_number_mock):
        mock_message_create = enable_two_factor_authentication_by_phone_number_mock.messages.create
        Response = {
            "message": "Verification code has been sent to your Phone number",
            "status": 200
        }
        mock_message_create.return_value = Response
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = '/modules/two-factor-authentication/enable/2fa'
        data = {"method": "phone_number"}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.data, {
            "message": "Verification code has been sent to your Phone number"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        enable_two_factor_authentication_by_phone_number_mock.assert_called_once()

    @mock.patch(
        "modules.django_two_factor_authentication.two_factor_authentication.service.TwoFactorAuthenticationService.TwoFactorAuthenticationService.google_authenticator")
    def test_enable_link_with_google_authenticator(self, enable_link_with_google_authenticator):
        Response = {'data': {'link': 'otpauth://totp/2FA:fabelet661%40semonir.com?secret=3232323232323232&issuer=2FA'},
                    'status': 200}
        enable_link_with_google_authenticator.return_value = Response
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = '/modules/two-factor-authentication/enable/2fa'
        data = {"method": "google_authenticator"}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        enable_link_with_google_authenticator.assert_called_once()

    def test_enable_two_factor_authentication_without_method(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = '/modules/two-factor-authentication/enable/2fa'
        data = {}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_disable_two_factor_authentication(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.two_fa_token.key)
        url = '/modules/two-factor-authentication/enable/2fa'
        data = {
            "method": "email"
        }
        response = self.client.delete(url, data, format='json')
        self.assertEqual(response.data, {
            "message": "Two Factor Authentication disable Successfully"
        })
        self.assertEqual(response.status_code, status.HTTP_202_ACCEPTED)

    def test_disable_two_factor_authentication_with_invalid_user(self):
        url = '/modules/two-factor-authentication/enable/2fa'
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_disable_two_factor_authentication_without_enable_two_factor_auth(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = '/modules/two-factor-authentication/enable/2fa'
        response = self.client.delete(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_user_two_factor_authentication_is_enabled(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.two_fa_token.key)
        url = '/modules/two-factor-authentication/enable/2fa'
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_user_two_factor_authentication_is_disable(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = '/modules/two-factor-authentication/enable/2fa'
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
