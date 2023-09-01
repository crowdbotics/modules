import base64
import os
import secrets

from django.core.files.base import ContentFile
from django.utils.text import slugify
from rest_framework import serializers, exceptions

from .models import FileUpload


class Base64FileField(serializers.FileField):
    """
    A Django REST framework field for handling image-uploads through raw post data.
    It uses base64 for encoding and decoding the contents of the file.
    """

    def to_internal_value(self, data):
        # Check if this is a base64 string
        if isinstance(data, str):
            # NOTE:: Uses custom header: "data:[filename.ext];base64,"
            # Check if the base64 string is in the "data:" format
            if "data:" in data and ";base64," in data:
                # Break out the header from the base64 content
                header, data = data.split(";base64,")
                # Try to decode the file. Return validation error if it fails.
                try:
                    decoded_file = base64.b64decode(data)
                except Exception:
                    raise exceptions.ValidationError("Unable to decode content.")

                # Generate file name:
                token = secrets.token_urlsafe(12)  # 12 characters are more than enough.
                # Get the file name extension:
                orig_file_name = header.split(":")[-1].strip()
                file_name, file_extension = os.path.splitext(orig_file_name)
                complete_file_name = "{0}_{1}{2}".format(
                    token, slugify(file_name), file_extension
                )
                data = ContentFile(decoded_file, name=complete_file_name)

        return super().to_internal_value(data)


class FileUploadSerializer(serializers.ModelSerializer):
    file = Base64FileField(max_length=None, required=False)

    class Meta:
        model = FileUpload
        fields = [
            "id",
            "title",
            "description",
            "user",
            "file",
            "created_at",
            "updated_at",
            "size",
        ]
        read_only_fields = ["id"]
