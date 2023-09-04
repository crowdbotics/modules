from rest_framework import serializers
from .models import UploadedFile


class CreateBucketSerializer(serializers.Serializer):
    bucket_name = serializers.CharField(required=True)


class UploadFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadedFile
        fields = "__all__"


class DownloadFileSerializer(serializers.Serializer):
    bucket = serializers.CharField(required=True)
    file_name = serializers.CharField(required=True)


class PresignedUrlFileSerializer(serializers.Serializer):
    file_name = serializers.CharField(required=True)
    bucket = serializers.CharField(required=True)
    expiration = serializers.IntegerField(required=False)
