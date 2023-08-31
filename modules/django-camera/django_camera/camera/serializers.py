from .models import Image
from rest_framework import serializers


class ImageSerializer(serializers.HyperlinkedModelSerializer):
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        """
        get_image takes image from the user whether he selects from device or captures using camera. Returns url of the image.
        :param obj: An object containing image info like name, url, data etc.

        """
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
