from PIL import Image
from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase
from six import BytesIO

from .models import Profile

User = get_user_model()


class ProfileTestCase(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(username="example", password="Password@123")
        self.token = Token.objects.create(user=self.user)
        self.token.save()
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

    def test_create_profile_with_valid_data(self):
        image = BytesIO()
        Image.new('RGB', (100, 100)).save(image, 'JPEG')
        image.seek(0)
        profile_image = SimpleUploadedFile('lungs.png', image.getvalue())
        data = {
            "first_name": "testName", "last_name": "testLastName",
            "phone": "+923024911944", "country": "PK", "city": "Karachi",
            "profile_image": profile_image, "address": "Bwp", "zip_code": 23,
            "gender": "MALE", "birthday": 221990, "age": 12
        }
        response = self.client.post('/modules/profile/user-profile/', data=data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_profile_without_data(self):
        data = {
            "first_name": "testName", "last_name": "testLastName",
            "phone": "+9232323232323", "country": "PK", "city": "Karachi",
            "address": "Bwp", "zip_code": 23,
            "gender": "MALE", "birthday": 221990, "age": 12
        }
        response = self.client.post('/modules/profile/user-profile/', data=data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_profile_invalid_age_format(self):
        image = BytesIO()
        Image.new('RGB', (100, 100)).save(image, 'JPEG')
        image.seek(0)
        profile_image = SimpleUploadedFile('lungs.png', image.getvalue())
        data = {
            "first_name": "testName", "last_name": "testLastName",
            "phone": "+923024911944", "country": "PK", "city": "Karachi",
            "profile_image": profile_image, "address": "Bwp", "zip_code": 23,
            "gender": "MALE", "birthday": 221990, "age": "'12'"
        }
        response = self.client.post('/modules/profile/user-profile/', data=data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_profile_without_age(self):
        image = BytesIO()
        Image.new('RGB', (100, 100)).save(image, 'JPEG')
        image.seek(0)
        profile_image = SimpleUploadedFile('lungs.png', image.getvalue())
        data = {
            "first_name": "testName", "last_name": "testLastName",
            "phone": "+923024911944", "country": "PK", "city": "Karachi",
            "profile_image": profile_image, "address": "Bwp", "zip_code": 23,
            "gender": "MALE", "birthday": 221990, "age": ""
        }
        response = self.client.post('/modules/profile/user-profile/', data=data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_profile(self):
        response = self.client.get('/modules/profile/user-profile/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_profile(self):
        self.profile_update = Profile.objects.create(first_name="testName",
                                                     last_name="testLastName",
                                                     phone="+9232323232323", country="Pakistan", city="Karachi",
                                                     profile_image="https://images.com",
                                                     address="Bwp", zip_code=23, gender="MALE",
                                                     birthday=221990, age=12, user_id=self.user.id
                                                     )
        image = BytesIO()
        Image.new('RGB', (100, 100)).save(image, 'JPEG')
        image.seek(0)
        profile_image = SimpleUploadedFile('lungs.png', image.getvalue())
        data = {
            "first_name": "testName", "last_name": "testLastName",
            "phone": "+923232323233", "country": "PK", "city": "Karachi",
            "profile_image": profile_image, "address": "Bwp", "zip_code": 23,
            "gender": "MALE", "birthday": 221990, "age": 12
        }
        response = self.client.post('/modules/profile/user-profile/', data=data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_profile(self):
        self.profile_delete = Profile.objects.create(user=self.user, first_name="testName",
                                                     last_name="testLastName",
                                                     phone="+9232323232323", country="Pakistan", city="Karachi",
                                                     profile_image="https://images.com",
                                                     address="Bwp", zip_code=23, gender="MALE",
                                                     birthday=221990, age=12)
        self.client.login(username="example", password="Password@123")
        response = self.client.delete(f'/modules/profile/user-profile/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_get_profile_with_id(self):
        self.profile_get = Profile.objects.create(user=self.user, first_name="testName",
                                                  last_name="testLastName",
                                                  phone="+9232323232323", country="Pakistan", city="Karachi",
                                                  profile_image="https://images.com",
                                                  address="Bwp", zip_code=23, gender="MALE",
                                                  birthday=221990, age=12)
        response = self.client.get(f'/modules/profile/user-profile/{self.profile_get.id}')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_patch_profile_with_data(self):
        self.profile_patch = Profile.objects.create(first_name="testName",
                                                    last_name="testLastName", age=12, user_id=self.user.id)
        image = BytesIO()
        Image.new('RGB', (100, 100)).save(image, 'JPEG')
        image.seek(0)
        profile_image = SimpleUploadedFile('lungs.png', image.getvalue())
        data = {
            "phone": "+923232323323", "country": "PK", "city": "Karachi",
            "profile_image": profile_image, "address": "Bwp", "zip_code": 23,
            "gender": "MALE", "birthday": 221990, "age": 12
        }
        response = self.client.patch(f'/modules/profile/user-profile/{self.profile_patch.id}/', data=data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_patch_profile_with_single_field(self):
        self.profile_patch = Profile.objects.create(user=self.user, first_name="testName",
                                                    last_name="testLastName",
                                                    phone="+920202020202", country="Pakistan", city="Karachi",
                                                    profile_image="https://images.com",
                                                    address="Bwp", zip_code=23, gender="MALE",
                                                    birthday=221990, age=12)
        data = {"country": "PK"}
        response = self.client.patch(f'/modules/profile/user-profile/{self.profile_patch.id}/', data=data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class ProfileModelTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="example", password="Password@123")
        self.token = Token.objects.create(user=self.user)
        self.token.save()
        Profile.objects.create(first_name="testName",
                               last_name="testLastName",
                               phone="+9232323232323", country="Pakistan", city="Karachi",
                               profile_image="https://images.com",
                               address="Bwp", zip_code=23, gender="MALE",
                               birthday=221990, age=12, user_id=self.user.id
                               )

    def test_profile_model(self):
        profile = Profile.objects.get(user=self.user)
        self.assertEqual(str(profile), profile.user.username)
