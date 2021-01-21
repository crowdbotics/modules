from rest_framework import serializers
from .models import Article
import base64
import imghdr
import io
import secrets
from django.core.files.base import ContentFile
from PIL import Image


class Base64ImageField(serializers.ImageField):
    """
    A Django REST framework field for handling image-uploads through raw post data.
    It uses base64 for encoding and decoding the contents of the file.
    """

    def to_internal_value(self, data):
        # Check if this is a base64 string
        if isinstance(data, str):
            # Check if the base64 string is in the "data:" format
            if "data:" in data and ";base64," in data:
                # Break out the header from the base64 content
                header, data = data.split(";base64,")
                # Try to decode the file. Return validation error if it fails.
                try:
                    decoded_file = base64.b64decode(data)
                except TypeError:
                    self.fail("invalid_image")

                # Generate file name:
                file_name = secrets.token_urlsafe(
                    12
                )  # 12 characters are more than enough.
                # Get the file name extension:
                file_extension = self.get_file_extension(file_name, decoded_file)
                complete_file_name = "{0}.{1}".format(file_name, file_extension)
                data = ContentFile(decoded_file, name=complete_file_name)

        return super().to_internal_value(data)

    @staticmethod
    def get_file_extension(file_name, decoded_file):
        extension = imghdr.what(file_name, decoded_file)
        if extension is None:
            image = Image.open(io.BytesIO(decoded_file))
            extension = image.format.lower()
        extension = "jpg" if extension == "jpeg" else extension
        return extension


class ArticleSerializer(serializers.ModelSerializer):
    image = Base64ImageField(max_length=None, required=False)

    class Meta:
        model = Article
        fields = [
            "id",
            "title",
            "body",
            "author",
            "image",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id"]
