from .models import Image
from rest_framework import serializers


class ImageSerializer(serializers.HyperlinkedModelSerializer):
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        return obj.image.url

    class Meta:
        model = Image
        fields = (
            "id",
            "image",
        )


class ImageUploadSerializer(serializers.ModelSerializer):
    image = serializers.ImageField()

    class Meta:
        model = Image
        fields = ("image",)
