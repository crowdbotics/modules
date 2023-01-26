from rest_framework import serializers


class OCRSerializer(serializers.Serializer):
    file = serializers.FileField(required=True, allow_null=False, allow_empty_file=False)
