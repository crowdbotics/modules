from django.test import TestCase
from .models import MyModel
from .mailchimp.mailchimp_client import MailchimpClient

class MailchimpClientTest(TestCase):
    def setUp(self):
        self.client = MailchimpClient()

    def test_mailchimp_connection(self):
        response = self.client.test_connection()
        self.assertEqual(response.status_code, 200)

class MyModelTest(TestCase):
    def setUp(self):
        MyModel.objects.create(name="Test")

    def test_model_name(self):
        model = MyModel.objects.get(name="Test")
        self.assertEqual(model.name, 'Test')