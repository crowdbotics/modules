from rest_framework import serializers

from .models import TwoFactorAuth


class OTPVerificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = TwoFactorAuth
        fields = ['method', 'code']
        extra_kwargs = {'user': {'required': False}}


class TwoFactorAuthValidationSerializer(serializers.Serializer):
    method = serializers.ChoiceField(choices=TwoFactorAuth.METHOD, required=True, allow_blank=False, allow_null=False)


class EnableTwoFactorAuthenticationUserSerializer(serializers.Serializer):
    method = serializers.ChoiceField(choices=TwoFactorAuth.METHOD, required=True, allow_blank=False, allow_null=False)
