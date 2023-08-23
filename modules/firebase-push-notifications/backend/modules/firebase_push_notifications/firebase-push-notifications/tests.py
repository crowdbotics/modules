from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

User = get_user_model()


class UserFCMDeviceAddTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create(username="john", email="fabelet661@semonir.com",
                                        password="john123@")
        self.user_token = Token.objects.create(user=self.user)
        self.user_token.save()

    def test_add_user_fcm_device_ios(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = "/modules/firebase-push-notifications/user_fcm_device_add/"
        data = {
            "name": "test_ios_device",
            "is_active": "True",
            "device_id": "112233",
            "registration_id": "ePs6mLMc6ExsmZOPR7H9i5:APA91bGg5i8w2TwBQ7KsWr0e3Y4ykSB3TOI97I6H-vTVv_eChK2Ad2fcvRl3KfPz_2d8Y2nyZIbFpGU42LKEkYOVfmyd51_uTlEdC9kBrNOcHz7e3jmRTL4QAPh75I6wogFkmAq6_y1b",
            "type": "ios"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.data['name'], 'test_ios_device')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_add_user_fcm_device_android(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = "/modules/firebase-push-notifications/user_fcm_device_add/"
        data = {
            "name": "test_android_device",
            "is_active": "True",
            "device_id": "112233",
            "registration_id": "f8qVx1QzSAyuGiWwadubR_:APA91bHvOEyiFwkYKRkpvk-IIfhC8GqabP0lxeiYE4wMcccODX0Fb7wYinpdPwzxhcBcppi_XIokWm3FyGpaywddEaD5Qy1jScvBsu4sB9MYh_qdzaXsBxHJPJ6qsQG4R4aKQDr3SEdx",
            "type": "android"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.data['name'], 'test_android_device')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_exist_validation_on_add_user_fcm_device(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = "/modules/firebase-push-notifications/user_fcm_device_add/"
        data = {
            "name": "test_android_device",
            "is_active": "True",
            "device_id": "112233",
            "registration_id": "f8qVx1QzSAyuGiWwadubR_:APA91bHvOEyiFwkYKRkpvk-IIfhC8GqabP0lxeiYE4wMcccODX0Fb7wYinpdPwzxhcBcppi_XIokWm3FyGpaywddEaD5Qy1jScvBsu4sB9MYh_qdzaXsBxHJPJ6qsQG4R4aKQDr3SEdx",
            "type": "android"
        }
        self.client.post(url, data, format='json')
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.data['message'], 'Device Already Exist')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_exception_on_add_user_fcm_device(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.user_token.key)
        url = "/modules/firebase-push-notifications/user_fcm_device_add/"
        data = {
            "name": "test_android_device",
            "is_active": "True",
            "device_id": "112233",
            "type": "android"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
