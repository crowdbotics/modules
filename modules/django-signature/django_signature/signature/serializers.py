from .models import Signature
from rest_framework import serializers


class SignatureSerializer(serializers.HyperlinkedModelSerializer):
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        return obj.image.url

    class Meta:
        model = Signature
        fields = (
            "id",
            "image",
        )


class SignatureUploadSerializer(serializers.ModelSerializer):
    image = serializers.ImageField()

    class Meta:
        model = Signature
        fields = ("image",)
