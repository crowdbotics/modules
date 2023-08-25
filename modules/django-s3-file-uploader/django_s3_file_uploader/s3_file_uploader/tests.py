import datetime
from django.core.files.uploadedfile import SimpleUploadedFile
import mock
from dateutil.tz import tzlocal
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from .models import UploadedFile
from django.contrib.auth import get_user_model

User = get_user_model()


class S3ViewSetTestCases(APITestCase):
    @mock.patch(
        "modules.django_s3_file_uploader.s3_file_uploader.services.S3Service.S3Service.list_s3_buckets"
    )
    def test_bucket_list(self, list_s3_buckets_mock):
        response = {
            "ResponseMetadata": {
                "RequestId": "V31K7MWVNRMP15QH",
                "HostId": "1d+F1x8c87LvWH9z0RlOUBLSsaxESF+cbI2haxYRhrAFBho2P/hqvT0ZQFsQDIKItRCsd5SB/lo=",
                "HTTPStatusCode": 200,
                "HTTPHeaders": {
                    "x-amz-id-2": "1d+F1x8c87LvWH9z0RlOUBLSsaxESF+cbI2haxYRhrAFBho2P/hqvT0ZQFsQDIKItRCsd5SB/lo=",
                    "x-amz-request-id": "V31K7MWVNRMP15QH",
                    "date": "Mon, 16 Jan 2023 11:18:17 GMT",
                    "content-type": "application/xml",
                    "transfer-encoding": "chunked",
                    "server": "AmazonS3",
                },
                "RetryAttempts": 0,
            },
            "Buckets": [
                {
                    "Name": "app-dev-6693",
                    "CreationDate": datetime.datetime(
                        2023, 1, 3, 7, 51, 29, tzinfo=tzlocal()
                    ),
                },
                {
                    "Name": "confidential-album-156",
                    "CreationDate": datetime.datetime(
                        2023, 1, 16, 10, 22, 23, tzinfo=tzlocal()
                    ),
                },
                {
                    "Name": "demo-buket-15256",
                    "CreationDate": datetime.datetime(
                        2023, 1, 4, 15, 27, 9, tzinfo=tzlocal()
                    ),
                },
                {
                    "Name": "new-buket-15256",
                    "CreationDate": datetime.datetime(
                        2023, 1, 3, 9, 0, 30, tzinfo=tzlocal()
                    ),
                },
            ],
            "Owner": {
                "DisplayName": "m.amir.6693",
                "ID": "efb8e13f84e4ff693f01ded22cf16a5325949677613eada32a98e8b9df347620",
            },
        }
        list_s3_buckets_mock.return_value = response
        responses = self.client.get(reverse("s3_service-bucket-list"))
        self.assertEqual(responses.status_code, status.HTTP_200_OK)
        self.assertEqual(responses.data, response)
        self.assertEqual(
            responses.data["ResponseMetadata"]["RequestId"],
            response["ResponseMetadata"]["RequestId"],
        )
        self.assertEqual(
            responses.data["Buckets"][0]["CreationDate"],
            response["Buckets"][0]["CreationDate"],
        )
        self.assertEqual(
            responses.data["Owner"]["DisplayName"], response["Owner"]["DisplayName"]
        )
        list_s3_buckets_mock.assert_called_once()

    @mock.patch(
        "modules.django_s3_file_uploader.s3_file_uploader.services.S3Service.S3Service.list_s3_buckets"
    )
    def test_bucket_list_with_excetion(self, list_s3_buckets_mock):
        list_s3_buckets_mock.side_effect = Exception()
        with self.assertRaises(Exception):
            self.client.get(reverse("s3_service-bucket-list"))
            list_s3_buckets_mock.assert_called_once()

    @mock.patch(
        "modules.django_s3_file_uploader.s3_file_uploader.services.S3Service.S3Service.create_s3_bucket"
    )
    def test_create_bucket(self, create_s3_bucket_mock):
        response = {
            "ResponseMetadata": {
                "RequestId": "1Q87AZP0QD31VM1E",
                "HostId": "kVTTNYHnJAxUebDrIqmd7IAb9w6+lYoPG572GU4y9BvU6pbCuONEsikojbV8Dvf9ditGkDmVlos=",
                "HTTPStatusCode": 200,
                "HTTPHeaders": {
                    "x-amz-id-2": "kVTTNYHnJAxUebDrIqmd7IAb9w6+lYoPG572GU4y9BvU6pbCuONEsikojbV8Dvf9ditGkDmVlos=",
                    "x-amz-request-id": "1Q87AZP0QD31VM1E",
                    "date": "Mon, 16 Jan 2023 11:52:25 GMT",
                    "location": "/confidential-album-156",
                    "server": "AmazonS3",
                    "content-length": "0",
                },
                "RetryAttempts": 3,
            },
            "Location": "/confidential-album-156",
        }
        create_s3_bucket_mock.return_value = response
        data = {"bucket_name": "confidential-album-156"}
        responses = self.client.post(reverse("s3_service-create-bucket"), data=data)
        self.assertEqual(responses.status_code, status.HTTP_201_CREATED)
        self.assertEqual(responses.data, response)
        self.assertEqual(
            responses.data["ResponseMetadata"]["RequestId"],
            response["ResponseMetadata"]["RequestId"],
        )
        self.assertEqual(responses.data["Location"], response["Location"])
        create_s3_bucket_mock.assert_called_once()
        create_s3_bucket_mock.assert_called_once_with(
            bucket_name="confidential-album-156"
        )

    @mock.patch(
        "modules.django_s3_file_uploader.s3_file_uploader.services.S3Service.S3Service.create_s3_bucket"
    )
    def test_create_bucket_with_exception(self, create_s3_bucket_mock):
        create_s3_bucket_mock.side_effect = Exception()
        with self.assertRaises(Exception):
            data = {"bucket_name": "confidential-album-156"}
            self.client.post(reverse("s3_service-create-bucket"), data=data)
            create_s3_bucket_mock.assert_called_once()
            create_s3_bucket_mock.assert_called_once_with(
                bucket_name="confidential-album-156"
            )

    @mock.patch(
        "modules.django_s3_file_uploader.s3_file_uploader.services.S3Service.S3Service.delete_s3_bucket"
    )
    def test_delete_bucket(self, delete_s3_bucket_mock):
        response = {
            "ResponseMetadata": {
                "RequestId": "9PCXDT7T4VW5TZF7",
                "HostId": "1Wx6pe/QiXnDY1xo22/qkZz6Dj9p4oXrGk440I5xAV7fI//vSQBZ6A8e4HTZ7h1ewJMY4IBOMqo=",
                "HTTPStatusCode": 204,
                "HTTPHeaders": {
                    "x-amz-id-2": "1Wx6pe/QiXnDY1xo22/qkZz6Dj9p4oXrGk440I5xAV7fI//vSQBZ6A8e4HTZ7h1ewJMY4IBOMqo=",
                    "x-amz-request-id": "9PCXDT7T4VW5TZF7",
                    "date": "Mon, 16 Jan 2023 12:46:13 GMT",
                    "server": "AmazonS3",
                },
                "RetryAttempts": 0,
            }
        }
        delete_s3_bucket_mock.return_value = response
        owner_id = "efb8e13f84e4ff693f01ded22cf16a5325949677613eada32a98e8b9df347620"
        bucket_name = "enigmatix"
        responses = self.client.delete(
            reverse("s3_service-delete-bucket", args=(owner_id, bucket_name))
        )
        self.assertEqual(responses.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(responses.data, response)
        delete_s3_bucket_mock.assert_called_once()
        delete_s3_bucket_mock.assert_called_once_with(
            owner_id=owner_id, bucket_name=bucket_name
        )

    @mock.patch(
        "modules.django_s3_file_uploader.s3_file_uploader.services.S3Service.S3Service.delete_s3_bucket"
    )
    def test_delete_bucket_with_exception(self, delete_s3_bucket_mock):
        delete_s3_bucket_mock.side_effect = Exception()
        with self.assertRaises(Exception):
            owner_id = (
                "efb8e13f84e4ff693f01ded22cf16a5325949677613eada32a98e8b9df347620"
            )
            bucket_name = "enigmatix"
            self.client.delete(
                reverse("s3_service-delete-bucket", args=(owner_id, bucket_name))
            )
            delete_s3_bucket_mock.assert_called_once()
            delete_s3_bucket_mock.assert_called_once_with(
                owner_id=owner_id, bucket_name=bucket_name
            )

    @mock.patch(
        "modules.django_s3_file_uploader.s3_file_uploader.services.S3Service.S3Service.upload_s3_file"
    )
    def test_upload_file(self, upload_s3_file_mock):
        response = None
        upload_s3_file_mock.return_value = response
        f = SimpleUploadedFile(
            "Screenshot from 2023-01-09 14-01-53.png", b"file_content"
        )
        adminuser = User.objects.create_user("admin", "admin@test.com", "pass")
        data = {"file": f, "bucket": "confidential-album-156", "user_id": adminuser.id}
        responses = self.client.post(reverse("s3_service-upload-file"), data=data)
        self.assertEqual(responses.status_code, status.HTTP_200_OK)
        self.assertEqual(responses.data, response)
        upload_s3_file_mock.assert_called_once()
        upload_s3_file_mock.assert_called_once_with(
            file=b"file_content",
            bucket="confidential-album-156",
            file_name="Screenshot from 2023-01-09 14-01-53.png",
        )

    @mock.patch(
        "modules.django_s3_file_uploader.s3_file_uploader.services.S3Service.S3Service.upload_s3_file"
    )
    def test_upload_file_with_exception(self, upload_s3_file_mock):
        upload_s3_file_mock.side_effect = Exception()
        with self.assertRaises(Exception):
            f = SimpleUploadedFile(
                "Screenshot from 2023-01-09 14-01-53.png", b"file_content"
            )
            adminuser = User.objects.create_user("admin", "admin@test.com", "pass")
            data = {
                "file": f,
                "bucket": "confidential-album-156",
                "user_id": adminuser.id,
            }
            self.client.post(reverse("s3_service-upload-file"), data=data)
            upload_s3_file_mock.assert_called_once()
            upload_s3_file_mock.assert_called_once_with(
                file=b"file_content",
                bucket="confidential-album-156",
                file_name="Screenshot from 2023-01-09 14-01-53.png",
            )

    @mock.patch(
        "modules.django_s3_file_uploader.s3_file_uploader.services.S3Service.S3Service.download_s3_file"
    )
    def test_download_file(self, download_s3_file_mock):
        response = (
            "/home/cb-enigmatix/Projects/modules/demo/backend/staticfiles/"
            "Screenshot from 2023-01-10 16-14-55.png"
        )
        download_s3_file_mock.return_value = response
        file_name = "Screenshot from 2023-01-09 14-01-53.png"
        bucket_name = "enigmatix"
        responses = self.client.get(
            reverse("s3_service-download-file", args=(bucket_name, file_name))
        )
        self.assertEqual(responses.status_code, status.HTTP_200_OK)
        download_s3_file_mock.assert_called_once()
        download_s3_file_mock.assert_called_once_with(
            bucket="enigmatix",
            file_name="Screenshot from 2023-01-09 14-01-53.png",
            path_to_save_file="/home/cb-enigmatix/Projects/modules/demo/"
            "backend/staticfiles",
        )

    @mock.patch(
        "modules.django_s3_file_uploader.s3_file_uploader.services.S3Service.S3Service.download_s3_file"
    )
    def test_download_file_with_wrong_exception(self, download_s3_file_mock):
        download_s3_file_mock.side_effect = Exception()
        with self.assertRaises(Exception):
            file_name = "Screenshot from 2023-01-09 14-01-53.png"
            bucket_name = "enigmatix"
            self.client.get(
                reverse("s3_service-download-file", args=(bucket_name, file_name))
            )
            download_s3_file_mock.assert_called_once()
            download_s3_file_mock.assert_called_once_with(
                bucket="enigmatix",
                file_name="Screenshot from 2023-01-09 14-01-53.png",
                path_to_save_file="/home/cb-enigmatix/Projects/modules/demo/"
                "backend/staticfiles",
            )

    @mock.patch(
        "modules.django_s3_file_uploader.s3_file_uploader.services.S3Service.S3Service.create_presigned_s3_url"
    )
    def test_create_presigned_url(self, create_presigned_s3_url_mock):
        response = (
            "https://confidential-album-156.s3.amazonaws.com/Screenshot%20from%202023-01-10%2016-14-55.png"
            "?AWSAccessKeyId=AKIAS24EJQ66HS6CXFPW&Signature=1TAN760PJQkUTEp%2BRl6MIirObUI%3D&Expires=1673882736"
        )
        create_presigned_s3_url_mock.return_value = response
        data = {
            "file_name": "Screenshot from 2023-01-09 14-01-53.png",
            "bucket": "confidential-album-156",
            "expiration": "4000",
        }
        responses = self.client.post(
            reverse("s3_service-create-presigned-url"), data=data, format="json"
        )
        self.assertEqual(responses.status_code, status.HTTP_200_OK)
        create_presigned_s3_url_mock.assert_called_once()
        create_presigned_s3_url_mock.assert_called_once_with(
            file_name="Screenshot from 2023-01-09 14-01-53.png",
            bucket="confidential-album-156",
            expiration=4000,
        )

    @mock.patch(
        "modules.django_s3_file_uploader.s3_file_uploader.services.S3Service.S3Service.create_presigned_s3_url"
    )
    def test_create_presigned_url_with_exception(self, create_presigned_s3_url_mock):
        create_presigned_s3_url_mock.side_effect = Exception()
        with self.assertRaises(Exception):
            data = {
                "file_name": "Screenshot from 2023-01-09 14-01-53.png",
                "bucket": "confidential-album-156",
                "expiration": "4000",
            }
            self.client.post(
                reverse("s3_service-create-presigned-url"), data=data, format="json"
            )
            create_presigned_s3_url_mock.assert_called_once()
            create_presigned_s3_url_mock.assert_called_once_with(
                file_name="Screenshot from 2023-01-09 14-01-53.png",
                bucket="confidential-album-156",
                expiration=3600,
            )

    @mock.patch(
        "modules.django_s3_file_uploader.s3_file_uploader.services.S3Service.S3Service.delete_s3_file"
    )
    def test_delete_file(self, delete_s3_file_mock):
        response = {
            "ResponseMetadata": {
                "RequestId": "V4HM8N4EF5KKWXQD",
                "HostId": "F64qr0KDntEuTZTteTpqmCYUQie9yWuSQzOKcIfmJbNy9f4yc/xFwxEWhTT28l2q6cSEiKXx1xpMPE9NEHCgTA==",
                "HTTPStatusCode": 204,
                "HTTPHeaders": {
                    "x-amz-id-2": "F64qr0KDntEuTZTteTpqmCYUQie9yWuSQzOKcIfmJbNy9f4yc/xFwxEWhTT28l2q6cSEiKXx1xpMPE9NEHCgTA==",
                    "x-amz-request-id": "V4HM8N4EF5KKWXQD",
                    "date": "Mon, 16 Jan 2023 14:28:52 GMT",
                    "server": "AmazonS3",
                },
                "RetryAttempts": 0,
            }
        }
        delete_s3_file_mock.return_value = response
        user_id = 6
        bucket_name = "confidential-album-156"
        file_name = "Screenshot from 2023-01-10 16-14-55.png"
        responses = self.client.delete(
            reverse("s3_service-delete-file", args=(user_id, bucket_name, file_name))
        )
        self.assertEqual(responses.status_code, status.HTTP_204_NO_CONTENT)
        delete_s3_file_mock.assert_called_once()
        delete_s3_file_mock.assert_called_once_with(
            bucket="confidential-album-156",
            file_name="Screenshot from 2023-01-10 16-14-55.png",
        )

    @mock.patch(
        "modules.django_s3_file_uploader.s3_file_uploader.services.S3Service.S3Service.delete_s3_file"
    )
    def test_delete_file_with_wrong_exception(self, delete_s3_file_mock):
        delete_s3_file_mock.side_effect = Exception()
        with self.assertRaises(Exception):
            user_id = 6
            bucket_name = "confidential-album-156"
            file_name = "Screenshot from 2023-01-10 16-14-55.png"
            self.client.delete(
                reverse(
                    "s3_service-delete-file", args=(user_id, bucket_name, file_name)
                )
            )
            delete_s3_file_mock.assert_called_once()
            delete_s3_file_mock.assert_called_once_with(
                user_id=6,
                bucket_name="confidential-album-156",
                file_name="Screenshot from 2023-01-10 16-14-55.png",
            )

    def test_str_uploaded_file_title(self):
        """
        Method `__str__` should be equal to field `title`
        """
        user = User.objects.create_user(username="john", password="john123@")
        uploads = UploadedFile.objects.create(
            user_id=user, file_name="image.jpg", bucket="aws_bucket"
        )
        self.assertEqual(str(uploads), uploads.file_name)
