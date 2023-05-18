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


class CreateConstituentsCustomFieldsSerializers(serializers.Serializer):
    category = serializers.CharField(required=True)
    comment = serializers.CharField(required=False)
    parent_id = serializers.CharField(required=True)


class CreateConstituentsCustomFieldsCollectionSerializers(serializers.Serializer):
    category = serializers.CharField(required=True)


class CreateConstituentDocumentSerializers(serializers.Serializer):
    file_name = serializers.CharField(required=True)
    upload_thumbnail = serializers.BooleanField(required=True)


class CreateConstituentEducationSerializers(serializers.Serializer):
    constituent_id = serializers.CharField(required=True)
    school = serializers.CharField(required=True)
    department = serializers.CharField(required=False)
    degree = serializers.CharField(required=False)
    status = serializers.CharField(required=False)
    type = serializers.CharField(required=False)


class CreateConstituentEducationCustomFieldSerializers(serializers.Serializer):
    category = serializers.CharField(required=True)
    parent_id = serializers.CharField(required=True)
    comment = serializers.CharField(required=False)


class CreateConstituentAddressSerializers(serializers.Serializer):
    constituent_id = serializers.CharField(required=True)
    type = serializers.CharField(required=True)
    city = serializers.CharField(required=False)
    country = serializers.CharField(required=False)
    postal_code = serializers.CharField(required=False)
    region = serializers.CharField(required=False)


class CreateConstituentAliasesSerializers(serializers.Serializer):
    constituent_id = serializers.CharField(required=True)
    name = serializers.CharField(required=True)
    type = serializers.CharField(required=False)


class CreateConstituentAliasCollectionSerializers(serializers.Serializer):
    name = serializers.CharField(required=True)
    type = serializers.CharField(required=False)


class CreateConstituentAliasesCollectionSerializers(serializers.Serializer):
    aliases = CreateConstituentAliasCollectionSerializers(required=True, many=True)
