from rest_framework import serializers
from .models import UploadFile

class CreateBucketSerializer(serializers.Serializer):
    bucket = serializers.CharField(required=True)


class DeleteBucketSerializer(serializers.Serializer):
    bucket = serializers.CharField(required=True)
    owner_id = serializers.CharField(required=True)


class UploadFileSerializer(serializers.ModelSerializer):

    class Meta:
        model = UploadFile
        fields = '__all__'


class DownloadFileSerializer(serializers.Serializer):
    bucket = serializers.CharField(required=True)
    file_name = serializers.CharField(required=True)


class DeleteFileSerializer(serializers.Serializer):
    bucket = serializers.CharField(required=True)
    file_name = serializers.CharField(required=True)


class PresignedUrlFileSerializer(serializers.Serializer):
    file_name = serializers.CharField(required=True)
    bucket = serializers.CharField(required=True)
    expiration = serializers.IntegerField(required=False)