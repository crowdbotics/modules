from .models import Image
from rest_framework import serializers

class ImageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Image
        fields = "__all__"

class ImageUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('image',)