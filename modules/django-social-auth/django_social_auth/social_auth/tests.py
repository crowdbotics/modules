import os

from allauth.socialaccount.models import SocialApp
from django.contrib.sites.models import Site
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient

facebook_client_id = os.getenv("FACEBOOK_CLIENT_ID")
facebook_client_secret = os.getenv("FACEBOOK_CLIENT_SECRET")
facebook_access_token = os.getenv("FACEBOOK_ACCESS_TOKEN")

google_client_id = os.getenv("GOOGLE_CLIENT_ID")
google_client_secret = os.getenv("GOOGLE_CLIENT_SECRET")
google_access_token = os.getenv("GOOGLE_ACCESS_TOKEN")

apple_client_id = os.getenv("APPLE_CLIENT_ID")
apple_client_secret = os.getenv("APPLE_CLIENT_SECRET")
apple_access_token = os.getenv("APPLE_ACCESS_TOKEN_OR_GRANT_CODE")
apple_id_token = os.getenv("APPLE_ID_TOKEN")


class FacebookLoginTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.site = Site.objects.create(domain='127.0.0.1', name='facebook login')
        self.facebook_app = SocialApp.objects.create(
            provider='facebook',
            name='Facebook',
            client_id=facebook_client_id,
            secret=facebook_client_secret,
        )
        self.facebook_app.sites.add(self.site)

    def test_get_facebook_login(self):
        url = reverse('social_facebook_login')
        data = {"access_token": facebook_access_token}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 200)

    def test_get_facebook_login_with_invalid_token(self):
        url = reverse('social_facebook_login')
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, 400)

    def test_get_facebook_connect(self):
        url = reverse('social_facebook_connect')
        data = {"access_token": facebook_access_token}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 200)

    def test_get_facebook_connect_with_invalid_token(self):
        url = reverse('social_facebook_connect')
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, 400)


class GoogleLoginTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.site = Site.objects.create(domain='127.0.0.1', name='google login')
        self.google_app = SocialApp.objects.create(
            provider='google',
            name='Google',
            client_id=google_client_id,
            secret=google_client_secret,
        )
        self.google_app.sites.add(self.site)

    def test_get_google_login(self):
        url = reverse('social_google_login')
        data = {"access_token": google_access_token}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 200)

    def test_get_google_login_with_invalid_token(self):
        url = reverse('social_google_login')
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, 400)

    def test_get_google_connect(self):
        url = reverse('social_google_connect')
        data = {"access_token": google_access_token}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 200)

    def test_get_google_connect_with_invalid_token(self):
        url = reverse('social_google_connect')
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, 400)


class AppleLoginTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.site = Site.objects.create(domain='127.0.0.1', name='apple login')
        self.apple_app = SocialApp.objects.create(
            provider='apple',
            name='Apple',
            client_id=apple_client_id,
            secret=apple_client_secret,
        )
        self.apple_app.sites.add(self.site)

    def test_get_apple_login(self):
        url = reverse('social_apple_login')
        data = {
            "access_token": apple_access_token,
            "id_token": apple_id_token
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 200)

    def test_get_apple_login_with_invalid_token(self):
        url = reverse('social_apple_login')
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, 400)

    def test_get_apple_connect(self):
        url = reverse('social_apple_connect')
        data = {
            "access_token": apple_access_token,
            "id_token": apple_id_token
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 200)

    def test_get_apple_connect_with_invalid_token(self):
        url = reverse('social_apple_connect')
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, 400)