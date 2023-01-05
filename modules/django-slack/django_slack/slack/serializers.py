from rest_framework import serializers


class MessageSerializer(serializers.Serializer):
    message = serializers.CharField(required=True, allow_blank=False, allow_null=False)
    channel_name = serializers.CharField(required=True, allow_blank=False, allow_null=False)


class FileSerializer(serializers.Serializer):
    file = serializers.FileField(required=True, allow_null=False, allow_empty_file=False)
    message = serializers.CharField(required=True, allow_blank=False, allow_null=False)
    channel_name = serializers.CharField(required=True, allow_blank=False, allow_null=False)


class ChannelSerializer(serializers.Serializer):
    channel_name = serializers.CharField(required=True, allow_blank=False, allow_null=False)
    emails = serializers.CharField(required=True, allow_blank=False, allow_null=False)


class InviteUserToChannelSerializer(serializers.Serializer):
    channel_id = serializers.CharField(required=False, allow_blank=False, allow_null=False)
    channel_name = serializers.CharField(required=False, allow_blank=False, allow_null=False)
    emails = serializers.CharField(required=True, allow_blank=False, allow_null=False)

