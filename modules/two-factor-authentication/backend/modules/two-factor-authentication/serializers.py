from .models import PhoneNumber, Verify
from rest_framework import serializers


class PhoneNumberSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhoneNumber
        fields = '__all__'


class VerifySerializer(serializers.ModelSerializer):
    class Meta:
        model = Verify
        fields = '__all__'


