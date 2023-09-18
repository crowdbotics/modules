from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from .models import Settings, StateChoices, UserAppSetting

User = get_user_model()


class GetUserAppSettingsViewTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="john", email="john12@gmail.com", password="pass@123")
        self.token = Token.objects.create(user=self.user)
        self.token.save()

    def test_get_settings(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        url = '/modules/settings/get_settings/'
        response = self.client.get(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)

    def test_get_settings_without_authorization(self):
        url = '/modules/settings/get_settings/'
        response = self.client.get(url, format='json')
        self.assertEquals(response.status_code, status.HTTP_401_UNAUTHORIZED)


class UpdateUserSettingsViewTestCases(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="david", email="david12@gmail.com", password="pass@123")
        self.token = Token.objects.create(user=self.user)
        self.token.save()
        self.settings = Settings.objects.create(title="notification", type="BOOLEAN")
        self.state_choices = StateChoices.objects.create(choice="yes", default_choice=True, settings=self.settings)
        self.state_choice = StateChoices.objects.create(choice="no", default_choice=False, settings=self.settings)
        self.user_app_settings = UserAppSetting.objects.create(user=self.user, setting=self.settings)
        self.user_app_settings.current_choices.add(self.state_choices)

    def test_update_user_settings(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        url = '/modules/settings/update_settings/'
        data = {
            "setting": self.settings.id,
            "current_choices": [self.state_choices.id]
        }
        response = self.client.patch(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEquals(response.data['setting_title'], 'notification')

    def test_update_user_settings_invalid_data(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        url = '/modules/settings/update_settings/'
        data = {
            "setting": self.settings.id,
            "current_choices": [self.state_choices.id, self.state_choice.id]
        }
        response = self.client.patch(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEquals(response.data['error'], "Can't send multiple selected_state id's for selected setting")

    def test_update_user_settings_without_authorization(self):
        url = '/modules/settings/update_settings/'
        data = {
            "setting": self.settings.id,
            "current_choices": [self.state_choices.id]
        }
        response = self.client.patch(url, data, format='json')
        self.assertEquals(response.status_code, status.HTTP_401_UNAUTHORIZED)


class ModelSteReturnTestCases(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="david", email="david12@gmail.com", password="pass@123")
        self.settings = Settings.objects.create(title="notification", type="BOOLEAN")
        self.state_choices = StateChoices.objects.create(choice="yes", default_choice=True, settings=self.settings)
        self.user_app_settings = UserAppSetting.objects.create(user=self.user, setting=self.settings)
        self.user_app_settings.current_choices.add(self.state_choices)

    def test_settings_str_is_equal_to_title(self):
        setting_model = Settings.objects.get(pk=1)
        self.assertEqual(str(setting_model), setting_model.title)

    def test_state_choice_str_is_equal_to_title_and_choice(self):
        state_choices = StateChoices.objects.get(pk=1)
        self.assertEqual(str(state_choices), f"{state_choices.settings.title} - {state_choices.choice}")

    def test_user_app_setting_str_is_equal_to_title_and_choice(self):
        user_app_settings = UserAppSetting.objects.get(pk=1)
        self.assertEqual(str(user_app_settings), f"{user_app_settings.user.name} - {user_app_settings.setting.title}")


class SignalTestCases(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="david", email="david12@gmail.com", password="pass@123")
        self.settings = Settings.objects.create(title="notification", type="BOOLEAN")
        self.state_choices = StateChoices.objects.create(choice="yes", default_choice=True, settings=self.settings)

    def test_new_user_signup_default_settings(self):
        response = User.objects.create_user(username="demo", email="demo@gmail.com", password="pass@123")
        self.assertEquals(response.username, 'demo')

    def test_delete_user_settings(self):
        setting_counts = Settings.objects.count()
        self.settings.delete()
        self.assertEquals(0, setting_counts - 1)
