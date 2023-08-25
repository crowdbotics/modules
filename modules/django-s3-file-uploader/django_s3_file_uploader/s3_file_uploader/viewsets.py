import os
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import UploadedFile
from .serializers import (
    CreateBucketSerializer,
    UploadFileSerializer,
    DownloadFileSerializer,
    PresignedUrlFileSerializer,
)
from .services.S3Service import S3Service


class S3ViewSet(viewsets.GenericViewSet):
    s3_service = S3Service(
        region=os.getenv("AWS_STORAGE_REGION", ""),
        access_key=os.getenv("AWS_ACCESS_KEY_ID", ""),
        access_secret=os.getenv("AWS_SECRET_ACCESS_KEY"),
    )

    allowed_serializers = {
        "create_bucket": CreateBucketSerializer,
        "upload_file": UploadFileSerializer,
        "download_file": DownloadFileSerializer,
        "create_presigned_url": PresignedUrlFileSerializer,
    }

    def get_serializer_class(self):
        return self.allowed_serializers.get(self.action)

    @action(detail=False, methods=["get"], url_path="bucket/list")
    def bucket_list(self, request):
        """
        To get bucket list\n
        return: This method without any parameters returns all the existing buckets.
        """
        try:
            response = self.s3_service.list_s3_buckets()
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                e.args,
                e.__getattribute__("response")
                .get("ResponseMetadata", {})
                .get("HTTPStatusCode"),
            )

    @action(detail=False, methods=["post"], url_path="bucket/create")
    def create_bucket(self, request):
        """
        To create a bucket/n
        body_params: str bucket_name(required)\n
        create_bucket: This method create s3 bucket.\n
        return:Returns detail of newly created s3 bucket.
        """
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            response = self.s3_service.create_s3_bucket(**serializer.data)
            return Response(response, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(
                e.args,
                e.__getattribute__("response")
                .get("ResponseMetadata", {})
                .get("HTTPStatusCode"),
            )

    @action(
        detail=False,
        methods=["delete"],
        url_path="owners/(?P<owner_id>[A-Za-z0-9]*)/buckets/"
        "(?P<bucket_name>[A-Za-z0-9- _]*)/remove",
    )
    def delete_bucket(self, request, owner_id, bucket_name):
        """
        To delete an existing bucket \n
        path_params: str bucket\n
        path_params: str owner_id\n
        delete_bucket: This method deletes s3 bucket.\n
        return: no content
        """
        try:
            response = self.s3_service.delete_s3_bucket(
                owner_id=owner_id, bucket_name=bucket_name
            )
            return Response(response, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(
                e.args,
                e.__getattribute__("response")
                .get("ResponseMetadata", {})
                .get("HTTPStatusCode"),
            )

    @action(detail=False, methods=["post"], url_path="file/upload")
    def upload_file(self, request):
        """
        To upload s3 object/file to the specified bucket\n
        body_param: user_id\n
        body_param: str file_name\n
        body_param: str bucket\n
        upload_file: Uploads a s3 object/file to the specified bucket.
        """
        try:
            file = request.FILES["file"]
            file_binary = file.read()
            response = self.s3_service.upload_s3_file(
                file=file_binary, bucket=request.data.get("bucket"), file_name=file.name
            )
            payload = {
                "bucket": request.data.get("bucket"),
                "file_name": file.name,
                "user_id": request.data.get("user_id"),
            }
            serializer = self.get_serializer(data=payload)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                e.args,
                e.__getattribute__("response")
                .get("ResponseMetadata", {})
                .get("HTTPStatusCode"),
            )

    @action(
        detail=False,
        methods=["get"],
        url_path="buckets/(?P<bucket_name>[A-Za-z0-9- _]*)/files/"
        "(?P<file_name>[A-Za-z0-9- ._]*)/download",
    )
    def download_file(self, request, bucket_name, file_name):
        """
        To Download s3 object/file from the specified bucket.\n
        path_param: str bucket_name\n
        path_param: str file_name\n
        :returns: Returns a file
        """
        try:
            response = self.s3_service.download_s3_file(
                bucket=bucket_name,
                file_name=file_name,
                path_to_save_file=os.getenv("PATH_TO_SAVE_FILE", ""),
            )
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                e.args,
                e.__getattribute__("response")
                .get("ResponseMetadata", {})
                .get("HTTPStatusCode"),
            )

    @action(
        detail=False,
        methods=["delete"],
        url_path="users/(?P<user_id>[0-9]*)/buckets/"
        "(?P<bucket_name>[A-Za-z0-9-]*)/files/"
        "(?P<file_name>[A-Za-z0-9- ._]*)/remove",
    )
    def delete_file(self, request, user_id, bucket_name, file_name):
        """
        To delete s3 object/file from the specified bucket.\n
        path_param: user_id\n
        path_param: str bucket_name\n
        path_param: str file_name\n
        :returns: No content
        """
        try:
            response = self.s3_service.delete_s3_file(
                bucket=bucket_name, file_name=file_name
            )
            file = UploadedFile.objects.filter(
                user_id=user_id, bucket=bucket_name, file_name=file_name
            )
            file.delete()
            return Response(response, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(
                e.args,
                e.__getattribute__("response")
                .get("ResponseMetadata", {})
                .get("HTTPStatusCode"),
            )

    @action(detail=False, methods=["post"], url_path="file/presigned/url")
    def create_presigned_url(self, request):
        """
        To create presigned_url\n
        body_param: str file_name\n
        body_param: str bucket\n
        body_param: int expiration\n
        create_presigned_url: The method generates presigned url for the file/object that grants a user
                temporary access to an S3 object.\n
        :return: Presigned URL as string. If error, returns None.
        """
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            response = self.s3_service.create_presigned_s3_url(**serializer.data)
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                e.args,
                e.__getattribute__("response")
                .get("ResponseMetadata", {})
                .get("HTTPStatusCode"),
            )
