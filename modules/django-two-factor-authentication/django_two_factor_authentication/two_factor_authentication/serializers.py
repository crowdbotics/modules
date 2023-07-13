from .models import TwoFactorAuth
from rest_framework import serializers


class TwoFactorAuthSerializer(serializers.ModelSerializer):
    class Meta:
        model = TwoFactorAuth
        fields = '__all__'


class OTPVerificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = TwoFactorAuth
        fields = '__all__'
        extra_kwargs = {'user': {'required': False}}
