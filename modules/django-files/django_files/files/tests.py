import base64

from PIL import Image
from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase
from six import BytesIO

from .models import FileUpload
from .serializers import FileUploadSerializer

User = get_user_model()


class FileUploadTestCases(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='john', email='john12@gmail.com', password='john123@')
        self.user_token = Token.objects.create(user=self.user)
        self.user_token.save()
        self.client.credentials()
        image = BytesIO()
        Image.new('RGB', (100, 100)).save(image, 'JPEG')
        image.seek(0)
        image_1 = SimpleUploadedFile('cnic_image.png', image.getvalue())
        self.fileUpload = FileUpload.objects.create(
            title="my new image",
            description="description",
            user=self.user,
            file=image_1
        )

    def test_upload_files_with_image_base64(self):
        url = reverse('fileupload-list')
        image = BytesIO()
        Image.new('RGB', (100, 100)).save(image, 'JPEG')
        image.seek(0)
        image_1 = SimpleUploadedFile('cnic_image.png', image.getvalue())
        encoded_file = f"data:image/png;base64,{base64.b64encode(image_1.read()).decode()}"
        data = {
            "title": "my new image",
            "description": "description",
            "user": self.user.id,
            "file": encoded_file
        }
        serializer = FileUploadSerializer(data=data)
        response = self.client.post(url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(serializer.is_valid(), True)

    def test_upload_files_with_invalid_image_base64(self):
        url = reverse('fileupload-list')
        encoded_file = f"data:image/png;base64,89iour0943jkdkjLKDFJHK"
        data = {
            "title": "my new image",
            "description": "description",
            "user": self.user.id,
            "file": encoded_file
        }
        serializer = FileUploadSerializer(data=data)
        response = self.client.post(url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(serializer.is_valid(), False)

    def test_upload_files(self):
        url = reverse('fileupload-list')
        image = BytesIO()
        Image.new('RGB', (100, 100)).save(image, 'JPEG')
        image.seek(0)
        image_1 = SimpleUploadedFile('cnic_image.png', image.getvalue())
        data = {
            "title": "my new image",
            "description": "description",
            "user": self.user.id,
            "file": image_1
        }
        serializer = FileUploadSerializer(data=data)
        response = self.client.post(url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(serializer.is_valid(), True)

    def test_model(self):
        file_upload = FileUpload.objects.first()
        self.assertEqual(str(file_upload),
                         f"{self.user} - my new image | {self.fileUpload.size} | {self.fileUpload.created_at}")

    def test_upload_files_without_description(self):
        url = reverse('fileupload-list')
        image = BytesIO()
        Image.new('RGB', (100, 100)).save(image, 'JPEG')
        image.seek(0)
        image_1 = SimpleUploadedFile('cnic_image.png', image.getvalue())
        data = {
            "title": "my new image",
            "user": self.user.id,
            "file": image_1
        }
        response = self.client.post(url, data=data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_upload_files_without_title(self):
        url = reverse('fileupload-list')
        image = BytesIO()
        Image.new('RGB', (100, 100)).save(image, 'JPEG')
        image.seek(0)
        image_1 = SimpleUploadedFile('cnic_image.png', image.getvalue())
        data = {
            "description": "description",
            "user": self.user.id,
            "file": image_1
        }
        response = self.client.post(url, data=data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_upload_files_without_user(self):
        url = reverse('fileupload-list')
        image = BytesIO()
        Image.new('RGB', (100, 100)).save(image, 'JPEG')
        image.seek(0)
        image_1 = SimpleUploadedFile('cnic_image.png', image.getvalue())
        data = {
            "title": "my new image",
            "description": "description",
            "file": image_1
        }
        response = self.client.post(url, data=data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_upload_files_without_image(self):
        url = reverse('fileupload-list')
        data = {
            "title": "my new image",
            "description": "description",
            "user": self.user.id
        }
        serializer = FileUploadSerializer(data=data)
        response = self.client.post(url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(serializer.is_valid(), True)

    def test_get_all_upload_files(self):
        url = reverse('fileupload-list')
        response = self.client.get(url, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_by_id_upload_file(self):
        fileupload_id = self.fileUpload.id
        url = f"/modules/files/uploads/{fileupload_id}/"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_by_static_id_upload_file(self):
        url = f"/modules/files/uploads/15/"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class UpdateSingleFileUploadTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user('admin', 'admin@test.com', 'pass')
        image = BytesIO()
        Image.new('RGB', (100, 100)).save(image, 'JPEG')
        image.seek(0)
        self.image_1 = SimpleUploadedFile('cnic_image.png', image.getvalue())

        self.fileUpload = FileUpload.objects.create(
            title='CB',
            description='About CB',
            user=self.user,
            file=self.image_1
        )
        self.image_1 = SimpleUploadedFile("Python coding .mp4", b"file_content")
        self.valid_payload = {
            "title": "Coding",
            "description": "first file",
            "user": self.user.id,
            "file": self.image_1
        }

    def test_Valid_update_fileUpload(self):
        response = self.client.put(f"/modules/files/uploads/{self.fileUpload.id}/", data=self.valid_payload)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], self.valid_payload['title'])
        self.assertEqual(response.data['description'], self.valid_payload["description"])
        self.assertEqual(response.data['user'], self.valid_payload['user'])

    def test_Invalid_update_fileUpload(self):
        data = {
            "title": "",
            "description": "first file",
            "user": self.user.id,
            "file": self.image_1

        }
        response = self.client.put(f"/modules/files/uploads/{self.fileUpload.id}/", data=data)
        self.fileUpload.refresh_from_db()
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertNotEqual(self.fileUpload.title, data['title'])
        self.assertNotEqual(self.fileUpload.description, data["description"])
        self.assertNotEqual(self.fileUpload.user, data['user'])
        self.assertNotEqual(self.fileUpload.file, data['file'])


class DeleteSingleAppointment(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user('admin', 'admin@test.com', 'pass')
        self.f = SimpleUploadedFile("Python coding .mp4", b"file_content")

        self.fileUpload = FileUpload.objects.create(
            title='CB',
            description='About CB',
            user=self.user,
            file=self.f
        )

    def test_delete_appointment(self):
        current_list_amount = FileUpload.objects.count()
        url = f"/modules/files/uploads/{self.fileUpload.id}/"
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(FileUpload.objects.count(), current_list_amount - 1)

    def test_invalid_delete_appointment(self):
        current_list_amount = FileUpload.objects.count()

        url = f"/modules/files/uploads/15/"
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(FileUpload.objects.count(), current_list_amount)
