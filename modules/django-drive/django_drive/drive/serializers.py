from rest_framework import serializers


class ShareFileSerializer(serializers.Serializer):
    file_id = serializers.CharField(required=True)
    role = serializers.CharField(required=True)
    user_type = serializers.CharField(required=True)
    emails = serializers.ListField(
        child=serializers.EmailField()
    )


class CreateFolderSerializer(serializers.Serializer):
    folder_name = serializers.CharField(required=True)


class UploadFileSerializer(serializers.Serializer):
    file = serializers.FileField(required=True)
