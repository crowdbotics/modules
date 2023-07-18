from rest_framework import serializers

from .models import TwoFactorAuth, EnableTwoFactorAuthentication


class OTPVerificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = TwoFactorAuth
        fields = ['method', 'code']
        extra_kwargs = {'user': {'required': False}}


class TwoFactorAuthValidationSerializer(serializers.Serializer):
    method = serializers.ChoiceField(choices=TwoFactorAuth.METHOD, required=True, allow_blank=False, allow_null=False)


class EnableTwoFactorAuthenticationUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = EnableTwoFactorAuthentication
        fields = '__all__'
        extra_kwargs = {'user': {'required': False}}
