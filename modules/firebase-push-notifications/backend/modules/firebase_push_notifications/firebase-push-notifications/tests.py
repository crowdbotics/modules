from PIL import Image
from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile
from fcm_django.models import FCMDevice
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase
from six import BytesIO

from .models import UserNotification, Notification


User = get_user_model()


class UserFCMDeviceAddTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create(
            username="john", email="fabelet661@semonir.com", password="john123@"
        )
        self.user_token = Token.objects.create(user=self.user)
        self.user_token.save()

    def test_add_user_fcm_device_ios(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.user_token.key)
        url = "/modules/firebase-push-notifications/user_fcm_device_add/"
        data = {
            "name": "test_ios_device",
            "is_active": "True",
            "device_id": "112233",
            "registration_id": "ePs6mLMc6ExsmZOPR7H9i5:APA91bGg5i8w2TwBQ7KsWr0e3Y4ykSB3TOI97I6H-vTVv_eChK2Ad2fcvRl3KfPz_2d8Y2nyZIbFpGU42LKEkYOVfmyd51_uTlEdC9kBrNOcHz7e3jmRTL4QAPh75I6wogFkmAq6_y1b",
            "type": "ios",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.data["name"], "test_ios_device")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_add_user_fcm_device_android(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.user_token.key)
        url = "/modules/firebase-push-notifications/user_fcm_device_add/"
        data = {
            "name": "test_android_device",
            "is_active": "True",
            "device_id": "112233",
            "registration_id": "f8qVx1QzSAyuGiWwadubR_:APA91bHvOEyiFwkYKRkpvk-IIfhC8GqabP0lxeiYE4wMcccODX0Fb7wYinpdPwzxhcBcppi_XIokWm3FyGpaywddEaD5Qy1jScvBsu4sB9MYh_qdzaXsBxHJPJ6qsQG4R4aKQDr3SEdx",
            "type": "android",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.data["name"], "test_android_device")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_exist_validation_on_add_user_fcm_device(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.user_token.key)
        url = "/modules/firebase-push-notifications/user_fcm_device_add/"
        data = {
            "name": "test_android_device",
            "is_active": "True",
            "device_id": "112233",
            "registration_id": "f8qVx1QzSAyuGiWwadubR_:APA91bHvOEyiFwkYKRkpvk-IIfhC8GqabP0lxeiYE4wMcccODX0Fb7wYinpdPwzxhcBcppi_XIokWm3FyGpaywddEaD5Qy1jScvBsu4sB9MYh_qdzaXsBxHJPJ6qsQG4R4aKQDr3SEdx",
            "type": "android",
        }
        self.client.post(url, data, format="json")
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.data["message"], "Device Already Exist")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_exception_on_add_user_fcm_device(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.user_token.key)
        url = "/modules/firebase-push-notifications/user_fcm_device_add/"
        data = {
            "name": "test_android_device",
            "is_active": "True",
            "device_id": "112233",
            "type": "android",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_authorization_on_add_user_fcm_device(self):
        url = "/modules/firebase-push-notifications/user_fcm_device_add/"
        data = {
            "name": "test_android_device",
            "is_active": "True",
            "device_id": "112233",
            "type": "android",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class NotificationTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create(
            username="john", email="fabelet661@semonir.com", password="john123@"
        )
        self.user_token = Token.objects.create(user=self.user)
        self.user_token.save()
        self.receiver_user = User.objects.create(
            username="david", email="david661@semonir.com", password="david123@"
        )
        self.receiver_user_token = Token.objects.create(user=self.receiver_user)
        self.receiver_user_token.save()
        self.fcm_devices = FCMDevice.objects.create(
            name="test_device",
            device_id="112233",
            registration_id="ePs6mLMc6ExsmZOPR7H9i5:APA91bGg5i8w2TwBQ7KsWr0e3Y4ykSB3TOI97I6H-vTVv_eChK2Ad2fcvRl3KfPz_2d8Y2nyZIbFpGU42LKEkYOVfmyd51_uTlEdC9kBrNOcHz7e3jmRTL4QAPh75I6wogFkmAq6_y1b",
            type="ios",
        )

    def test_create_notification(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.user_token.key)
        url = "/modules/firebase-push-notifications/notification/"
        image = BytesIO()
        Image.new("RGB", (100, 100)).save(image, "JPEG")
        image.seek(0)
        image_1 = SimpleUploadedFile("image.JPG", image.getvalue())
        data = {
            "sender": self.user.id,
            "receiver": self.receiver_user.id,
            "title": "message",
            "message": "hi demo here",
            "image": image_1,
        }
        response = self.client.post(url, data, format="multipart")
        self.assertEqual(response.data["message"], "hi demo here")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_notification_without_sender_and_receiver(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.user_token.key)
        url = "/modules/firebase-push-notifications/notification/"
        image = BytesIO()
        Image.new("RGB", (100, 100)).save(image, "JPEG")
        image.seek(0)
        image_1 = SimpleUploadedFile("image.JPG", image.getvalue())
        data = {"title": "message", "message": "hi demo here", "image": image_1}
        response = self.client.post(url, data, format="multipart")
        self.assertEqual(response.data["message"], "hi demo here")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_notification_details(self):
        self.client.credentials(
            HTTP_AUTHORIZATION="Token " + self.receiver_user_token.key
        )
        url = "/modules/firebase-push-notifications/notification/"
        image = BytesIO()
        Image.new("RGB", (100, 100)).save(image, "JPEG")
        image.seek(0)
        image_1 = SimpleUploadedFile("image.JPG", image.getvalue())
        data = {
            "sender": self.user.id,
            "receiver": self.receiver_user.id,
            "title": "message",
            "message": "hi demo here",
            "image": image_1,
        }
        self.client.post(url, data, format="multipart")
        response = self.client.get(url, format="json")
        self.assertEqual(response.data[0]["title"], "message")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_authorization_create_notification(self):
        url = "/modules/firebase-push-notifications/notification/"
        image = BytesIO()
        Image.new("RGB", (100, 100)).save(image, "JPEG")
        image.seek(0)
        image_1 = SimpleUploadedFile("image.JPG", image.getvalue())
        data = {
            "sender": self.user.id,
            "receiver": self.receiver_user.id,
            "title": "message",
            "message": "hi demo here",
            "image": image_1,
        }
        response = self.client.post(url, data, format="multipart")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class UserNotificationTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create(
            username="john", email="fabelet661@semonir.com", password="john123@"
        )
        self.user_token = Token.objects.create(user=self.user)
        self.user_token.save()
        self.receiver_user = User.objects.create(
            username="david", email="david661@semonir.com", password="david123@"
        )
        self.receiver_user_token = Token.objects.create(user=self.receiver_user)

    def test_create_user_notification(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.user_token.key)
        url = "/modules/firebase-push-notifications/notification/"
        image = BytesIO()
        Image.new("RGB", (100, 100)).save(image, "JPEG")
        image.seek(0)
        image_1 = SimpleUploadedFile("image.JPG", image.getvalue())
        data = {
            "sender": self.user.id,
            "receiver": self.receiver_user.id,
            "title": "message",
            "message": "hi demo here",
            "image": image_1,
        }
        notification_response = self.client.post(url, data, format="multipart")
        user_notification_url = (
            "/modules/firebase-push-notifications/user-notification/"
        )
        user_notification_data = {"notification": notification_response.data["id"]}
        response = self.client.post(
            user_notification_url, user_notification_data, format="json"
        )
        self.assertEqual(response.data, {"message": "Created Successfully"})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_user_notification_again(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.user_token.key)
        url = "/modules/firebase-push-notifications/notification/"
        image = BytesIO()
        Image.new("RGB", (100, 100)).save(image, "JPEG")
        image.seek(0)
        image_1 = SimpleUploadedFile("image.JPG", image.getvalue())
        data = {
            "sender": self.user.id,
            "receiver": self.receiver_user.id,
            "title": "message",
            "message": "hi demo here",
            "image": image_1,
        }
        notification_response = self.client.post(url, data, format="multipart")
        user_notification_url = (
            "/modules/firebase-push-notifications/user-notification/"
        )
        user_notification_data = {"notification": notification_response.data["id"]}
        self.client.post(user_notification_url, user_notification_data, format="json")
        response = self.client.post(
            user_notification_url, user_notification_data, format="json"
        )
        self.assertEqual(response.data, {"message": "all ready seen "})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_exception_on_create_user_notification(self):
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.user_token.key)
        user_notification_url = (
            "/modules/firebase-push-notifications/user-notification/"
        )
        user_notification_data = {"notify": 22}
        response = self.client.post(
            user_notification_url, user_notification_data, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class ModelStrTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create(
            username="john", email="fabelet661@semonir.com", password="john123@"
        )
        self.user_token = Token.objects.create(user=self.user)
        self.user_token.save()
        self.receiver_user = User.objects.create(
            username="david", email="david661@semonir.com", password="david123@"
        )
        self.receiver_user_token = Token.objects.create(user=self.receiver_user)
        self.receiver_user_token.save()
        image = BytesIO()
        Image.new("RGB", (100, 100)).save(image, "JPEG")
        image.seek(0)
        image_1 = SimpleUploadedFile("image.JPG", image.getvalue())
        self.create_notification = Notification.objects.create(
            sender=self.user,
            receiver=self.receiver_user,
            title="message",
            message="hi this is demo",
            image=image_1,
        )
        self.user_notification = UserNotification.objects.create(
            user=self.user, notification=self.create_notification
        )

    def test_str_is_equal_to_notification_title(self):
        test = Notification.objects.get(pk=1)
        self.assertEqual(str(test), test.title)

    def test_str_is_equal_to_user_notification(self):
        test = UserNotification.objects.get(pk=1)
        self.assertEqual(str(test), test.user.username)
