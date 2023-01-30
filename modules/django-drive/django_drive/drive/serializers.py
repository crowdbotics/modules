from rest_framework import serializers


class FileListSerializer(serializers.Serializer):
    query = serializers.CharField(required=False)
    page_token = serializers.CharField(required=False)
    page_size = serializers.CharField(required=False)


class CreateFolderSerializer(serializers.Serializer):
    folder_name = serializers.CharField(required=True)
    share_with = serializers.ListField(
        child=serializers.EmailField()
    )


class UploadFileSerializer(serializers.Serializer):
    file = serializers.FileField(required=True)
    parent_folder_id = serializers.CharField(required=False)


class ShareFileSerializer(serializers.Serializer):
    file_id = serializers.CharField(required=True)
    role = serializers.CharField(required=True)
    user_type = serializers.CharField(required=True)
    emails = serializers.ListField(
        child=serializers.EmailField()
    )


