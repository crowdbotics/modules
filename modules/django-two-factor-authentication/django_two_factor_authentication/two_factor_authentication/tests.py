from datetime import timedelta
import pyotp
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from freezegun import freeze_time
from demo import settings
from .models import TwoFactorAuth

User = get_user_model()


class TwoFactorAuthenticationTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="john", email="john24@gmail.com", phone_number=+14442222333, password="john123@")
        self.token = Token.objects.create(user=self.user)
        self.token.save()
        self.otp_code = pyotp.TOTP(settings.TOTP_SECRET).now()
        self.factor_user = User.objects.create_user(username="william", phone_number=235675, password="william123@")
        self.token1 = Token.objects.create(user=self.factor_user)
        self.token1.save()

    def test_send_otp_with_email(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        url = '/modules/two-factor-authentication/send/otp'
        data = {
            "method": "email"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_send_otp_again_and_again(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        url = '/modules/two-factor-authentication/send/otp'
        data = {
            "method": "email"
        }
        self.client.post(url, data, format='json')
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_send_otp_with_phone_number(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        url = '/modules/two-factor-authentication/send/otp'
        data = {"method": "phone_number"}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_send_otp_with_wrong_method(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        url = '/modules/two-factor-authentication/send/otp'
        data = {"method": "wrong"}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_send_otp_with_invalid_user(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token1.key)
        url = '/modules/two-factor-authentication/send/otp'
        data = {"method": "phone_number"}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class GoogleAuthenticatorTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="william", email="william24@gmail.com",
                                             phone_number=+14442222333, password="william123@")
        self.token = Token.objects.create(user=self.user)
        self.token.save()
        self.otp_code = pyotp.TOTP(settings.TOTP_SECRET).now()
        self.factor_user = User.objects.create_user(username="jo", email='john23@gmail.com', password="john")
        self.token1 = Token.objects.create(user=self.factor_user)
        self.token1.save()
        TwoFactorAuth.objects.create(user=self.user, method='email', code=3344)

    def test_get_link_with_google_authenticator(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        url = '/modules/two-factor-authentication/google/authenticator/qr'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_str_is_equal_to_two_factor_user(self):
        factor = TwoFactorAuth.objects.get(pk=1)
        self.assertEqual(str(factor), factor.user.username)


class OTPVerificationTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="john", email="john24@gmail.com", phone_number=+14442222333,
                                             password="john123@")
        self.token = Token.objects.create(user=self.user)
        self.token.save()
        self.otp_code = pyotp.TOTP(settings.TOTP_SECRET).now()
        self.new_user = User.objects.create_user(username="devil", email="devil24@gmail.com", password="devil123@")
        self.fact = TwoFactorAuth.objects.create(user=self.new_user, method='email', code=334465)
        self.new_token = Token.objects.create(user=self.new_user)
        self.new_token.save()

    def test_verify_otp_with_google_authenticator(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        url = '/modules/two-factor-authentication/verify/otp'
        data = {
            "method": "google_authenticator",
            "code": self.otp_code
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_verify_wrong_otp_with_google_authenticator(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        url = '/modules/two-factor-authentication/verify/otp'
        data = {
            "method": "google_authenticator",
            "code": 123
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_verify_otp_with_email(self):
        self.client.login(username='john', password="john123@")
        url = '/modules/two-factor-authentication/send/otp'
        data = {"method": "email"}
        self.client.post(url, data, format='json')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        url = '/modules/two-factor-authentication/verify/otp'
        data = {
            "method": "email",
            "code": self.otp_code
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_verify_otp_with_phone_number(self):
        self.client.login(username='john', password="john123@")
        url = '/modules/two-factor-authentication/send/otp'
        data = {"method": "phone_number"}
        self.client.post(url, data, format='json')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        url = '/modules/two-factor-authentication/verify/otp'
        data = {
            "method": "phone_number",
            "code": self.otp_code
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_verify_otp_with_invalid_user(self):
        self.client.login(username='js', password="joh")
        url = '/modules/two-factor-authentication/send/otp'
        data = {"method": "phone_number"}
        self.client.post(url, data, format='json')
        url = '/modules/two-factor-authentication/verify/otp'
        data = {
            "method": "phone_number",
            "code": self.otp_code
        }
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_verify_otp_with_wrong_method(self):
        url = '/modules/two-factor-authentication/verify/otp'
        data = {"method": "wrong"}
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_verify_expired_otp_code(self):
        with freeze_time() as frozen_time:
            frozen_time.tick(delta=timedelta(seconds=5.1))
            self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.new_token.key)

            url = '/modules/two-factor-authentication/verify/otp'
            data = {
                "method": "email",
                "code": self.fact.code
            }
            response = self.client.post(url, data, format='json')
            self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

