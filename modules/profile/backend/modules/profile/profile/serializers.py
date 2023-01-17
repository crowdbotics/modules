from django.contrib.auth import get_user_model
from django_countries.serializers import CountryFieldMixin
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers

from .models import Profile


User = get_user_model()


class ProfileSerializer(CountryFieldMixin, ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False, allow_null=True)
    age = serializers.CharField(allow_null=True, allow_blank=True, required=False)

    class Meta:
        model = Profile
        fields = '__all__'

    def validate_age(self, value):
        if value == "null" or value == "":
            return None
        try:
            return int(value)
        except ValueError:
            raise serializers.ValidationError('You must supply an integer or null')
