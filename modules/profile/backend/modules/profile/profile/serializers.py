from django.contrib.auth import get_user_model
from django_countries.serializers import CountryFieldMixin
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from .models import Profile

User = get_user_model()


class ProfileSerializer(CountryFieldMixin, ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False, allow_null=True)
    age = serializers.CharField(allow_null=True, allow_blank=True, required=False)

    class Meta:
        model = Profile
        fields = '__all__'

    @staticmethod
    def validate_age(age):
        if age == "null" or age == "":
            return None
        try:
            return int(age)
        except ValueError:
            raise serializers.ValidationError('Age must be an integer value')
