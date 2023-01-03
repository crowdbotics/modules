import os

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .serializers import (UploadFileSerializer, DownloadFileSerializer, PresignedUrlFileSerializer, CreateBucketSerializer, DeleteBucketSerializer)
from .services.S3Service import S3Service



class AWSViewSet(viewsets.GenericViewSet):

    s3_service = S3Service(
        region=os.getenv('S3_REGION', ""),
        access_key=os.getenv('S3_ACCESS_KEY', ""),
        access_secret=os.getenv('S3_ACCESS_SECRET')
    )

    allowed_serializers = {
        "create_bucket": CreateBucketSerializer,
        "delete_bucket": DeleteBucketSerializer,
        "upload_file": UploadFileSerializer,
        "download_file": DownloadFileSerializer,
        "create_presigned_url": PresignedUrlFileSerializer
    }

    def get_serializer_class(self):
        return self.allowed_serializers.get(self.action, UploadFileSerializer)

    @action(detail=False, methods=['get'], url_path='bucket/list')
    def bucket_list(self, request):
        try:
            response = self.s3_service.list_aws_buckets()
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e.args, status.HTTP_400_BAD_REQUEST)


    @action(detail=False, methods=['post'], url_path='bucket/create')
    def create_bucket(self, request):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            response = self.s3_service.create_aws_bucket(**serializer.data)
            return Response(response, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(e.args, status.HTTP_400_BAD_REQUEST)


    @action(detail=False, methods=['delete'], url_path='bucket/remove')
    def delete_bucket(self, request):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            response = self.s3_service.delete_aws_bucket(**serializer.data)
            print("response: ", response)
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e.args, status.HTTP_400_BAD_REQUEST)


    @action(detail=False, methods=['post'], url_path='file/upload')
    def upload_file(self, request):
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            file = request.FILES['file']
            file_binary = file.read()
            response = self.s3_service.upload_aws_file(
                file=file_binary,
                bucket=request.data.get('bucket'),
                file_name=file.name
            )
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e.args, status.HTTP_400_BAD_REQUEST)



    @action(detail=False, methods=['get'], url_path='file/download')
    def download_file(self, request):
        try:
            serializer = self.get_serializer(data=request.query_params)
            serializer.is_valid(raise_exception=True)
            response = self.s3_service.download_aws_file(
                bucket=request.query_params.get('bucket'),
                file_name=request.query_params.get('file_name'),
                path_to_save_file=os.getenv('PATH_TO_SAVE_FILE', "")
            )
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e.args, status.HTTP_400_BAD_REQUEST)


    @action(detail=False, methods=['get'], url_path='file/presigned/url')
    def create_presigned_url(self, request):
        try:
            serializer = self.get_serializer(data=request.query_params)
            serializer.is_valid(raise_exception=True)
            response = self.s3_service.create_presigned_aws_url(**serializer.data)
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e.args, status.HTTP_400_BAD_REQUEST)
