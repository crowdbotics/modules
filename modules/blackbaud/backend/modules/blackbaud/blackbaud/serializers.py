from rest_framework import serializers


class EmailSerializer(serializers.Serializer):
    address = serializers.EmailField(required=False)
    email = serializers.CharField(required=False)


class PhoneSerializer(serializers.Serializer):
    number = serializers.CharField(required=False)
    type = serializers.CharField(required=False)


class CreateConstituentsSerializers(serializers.Serializer):
    type = serializers.CharField(required=True)
    email = EmailSerializer(required=False)
    phone = PhoneSerializer(required=False)


class CreateConstituentsAttachmentsSerializers(serializers.Serializer):
    type = serializers.CharField(required=True)
    parent_id = serializers.CharField(required=True)


class CreateConstituentsCodeSerializers(serializers.Serializer):
    constituent_id = serializers.CharField(required=True)
    description = serializers.CharField(required=True)
