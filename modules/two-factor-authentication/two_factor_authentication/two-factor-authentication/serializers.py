from .models import TwoFactorAuth, Verify
from rest_framework import serializers


class PhoneNumberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TwoFactorAuth
        fields = '__all__'


class VerifySerializer(serializers.ModelSerializer):
    class Meta:
        model = Verify
        fields = '__all__'

