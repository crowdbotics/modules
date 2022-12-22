from rest_framework import serializers


class FileSerializer(serializers.Serializer):
    file = serializers.FileField(required=True, allow_null=False, allow_empty_file=False)
    message = serializers.CharField(required=True, allow_blank=False, allow_null=False)
    channel_name = serializers.CharField(required=True, allow_blank=False, allow_null=False)


class MessageSerializer(serializers.Serializer):
    message = serializers.CharField(required=True, allow_blank=False, allow_null=False)
    channel_name = serializers.CharField(required=True, allow_blank=False, allow_null=False)
