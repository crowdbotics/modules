from django.contrib.auth import get_user_model
from django.contrib.contenttypes.models import ContentType
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from .models import Report, Choices

User = get_user_model()


class CreateReportViewTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create(username='john', email="john12@gmail.com", password="john@123")
        self.token = Token.objects.create(user=self.user)
        self.token.save()

    def test_create_content_report_with_choices(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)
        url = '/modules/flag-user-content/create-report/'
        data = {
            "model_name": "user",
            "reported_id": 2,
            "reason": 1,
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['message'], 'Content reported successfully')

    def test_create_content_report(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)
        url = '/modules/flag-user-content/create-report/'
        data = {
            "model_name": "user",
            "reported_id": 2,
            "reason": 10,
            "other": "I dont like this"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['message'], 'Content reported successfully')

    def test_create_content_report_with_duplication(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)
        url = '/modules/flag-user-content/create-report/'
        data = {
            "model_name": "user",
            "reported_id": 2,
            "reason": 9
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        again_response = self.client.post(url, data, format='json')
        self.assertEqual(again_response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(again_response.data['non_field_errors'][0], 'Already reported')

    def test_create_content_report_without_authorization(self):
        url = '/modules/flag-user-content/create-report/'
        data = {
            "model_name": "user",
            "reported_id": 2,
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class GetReportViewTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create(username='john', email="john12@gmail.com", password="john@123")
        self.token = Token.objects.create(user=self.user)
        self.token.save()
        self.content_type = ContentType.objects.get_for_model(self.user)
        self.report = Report.objects.create(model_name=self.content_type, reported_id=1, reported_by=self.user,
                                            reason=3)
        self.admin_user = User.objects.create_superuser(username='admin', email="admin@gmail.com", password="admin@123")
        self.admin_user_token = Token.objects.create(user=self.admin_user)
        self.admin_user_token.save()

    def test_get_list_of_reported_content(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)
        url = '/modules/flag-user-content/reported-list/'
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]['reason'], 3)

    def test_get_list_of_reported_content_with_admin_user(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.admin_user_token.key)
        url = '/modules/flag-user-content/reported-list/'
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_list_of_reported_content_with_un_authorization(self):
        url = '/modules/flag-user-content/reported-list/'
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class ChoicesView(APITestCase):

    def test_get_choices_list(self):
        url = '/modules/flag-user-content/choice-list/'
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]['value'], dict(Choices.REPORT_CHOICES).get(1))
