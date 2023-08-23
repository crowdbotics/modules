import os

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import UploadedFile
from .serializers import (CreateBucketSerializer, DeleteBucketSerializer, UploadFileSerializer, DownloadFileSerializer, DeleteFileSerializer, PresignedUrlFileSerializer)
from .services.S3Service import S3Service



class S3ViewSet(viewsets.GenericViewSet):
    """
        - bucket_list: This method without any parameters returns all the existing buckets.
        - create_bucket: This method creates a new s3 bucket.
        - delete_bucket: This method deletes an s3 bucket.
        - upload_file: Uploads a s3 object/file to the specified bucket.
        - download_file: Downloads a s3 object/file from the specified bucket.
        - delete_file: Deleted a s3 object/file from the specified bucket.
        - create_presigned_url: The method generates presigned url for the file/object that grants a user temporary access to an S3 object.
    """
    s3_service = S3Service(
        region=os.getenv('AWS_STORAGE_REGION', ""),
        access_key=os.getenv('AWS_ACCESS_KEY_ID', ""),
        access_secret=os.getenv('AWS_SECRET_ACCESS_KEY')
    )

    allowed_serializers = {
        "create_bucket": CreateBucketSerializer,
        "delete_bucket": DeleteBucketSerializer,
        "upload_file": UploadFileSerializer,
        "download_file": DownloadFileSerializer,
        "delete_file": DeleteFileSerializer,
        "create_presigned_url": PresignedUrlFileSerializer,
    }

    def get_serializer_class(self):
        return self.allowed_serializers.get(self.action, UploadFileSerializer)

    @action(detail=False, methods=['get'], url_path='bucket/list')
    def bucket_list(self, request):
        try:
            response = self.s3_service.list_s3_buckets()
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e.args, status.HTTP_400_BAD_REQUEST)


    @action(detail=False, methods=['post'], url_path='bucket/create')
    def create_bucket(self, request):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            response = self.s3_service.create_s3_bucket(**serializer.data)
            return Response(response, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(e.args, status.HTTP_400_BAD_REQUEST)


    @action(detail=False, methods=['delete'], url_path='bucket/remove')
    def delete_bucket(self, request):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            response = self.s3_service.delete_s3_bucket(**serializer.data)
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e.args, status.HTTP_400_BAD_REQUEST)


    @action(detail=False, methods=['post'], url_path='file/upload')
    def upload_file(self, request):
        try:
            file = request.FILES['file']
            file_binary = file.read()
            response = self.s3_service.upload_s3_file(
                file=file_binary,
                bucket=request.data.get('bucket'),
                file_name=file.name
            )
            payload = {"bucket": request.data.get('bucket'), "file_name": file.name, "user_id": request.data.get("user_id")}
            serializer = self.get_serializer(data=payload)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e.args, status.HTTP_400_BAD_REQUEST)



    @action(detail=False, methods=['get'], url_path='file/download')
    def download_file(self, request):
        try:
            serializer = self.get_serializer(data=request.query_params)
            serializer.is_valid(raise_exception=True)
            response = self.s3_service.download_s3_file(
                bucket=request.query_params.get('bucket'),
                file_name=request.query_params.get('file_name'),
                path_to_save_file=os.getenv('PATH_TO_SAVE_FILE', "")
            )
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e.args, status.HTTP_400_BAD_REQUEST)


    @action(detail=False, methods=['delete'], url_path='file/remove')
    def delete_file(self, request):
        try:

            response = self.s3_service.delete_s3_file(
                bucket=request.data.get('bucket'),
                file_name=request.data.get('file_name')
            )
            user_id = request.data.get("user_id")
            bucket = request.data.get("bucket")
            file_name = request.data.get("file_name")
            delete_file = UploadedFile.objects.filter(user_id=user_id, bucket=bucket, file_name=file_name)
            delete_file.delete()
            serializer = self.get_serializer(data=delete_file)
            serializer.is_valid()
            return Response(response, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(e.args, status.HTTP_400_BAD_REQUEST)


    @action(detail=False, methods=['get'], url_path='file/presigned/url')
    def create_presigned_url(self, request):
        try:
            serializer = self.get_serializer(data=request.query_params)
            serializer.is_valid(raise_exception=True)
            response = self.s3_service.create_presigned_s3_url(**serializer.data)
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e.args, status.HTTP_400_BAD_REQUEST)
