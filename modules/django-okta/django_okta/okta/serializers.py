from rest_framework import serializers

from modules.django_okta.okta.models import Okta


class OktaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Okta
        fields = [
            'oktaID',
            "stateToken",
            "expiresAt",
            "created_at",
        ]
        read_only_fields = ["id"]


class OktaProfileDetailSerializer(serializers.Serializer):
    firstName = serializers.CharField(max_length=30)
    lastName = serializers.CharField(max_length=30)
    email = serializers.EmailField(max_length=100)
    login = serializers.EmailField(max_length=100)


class PasswordSerializer(serializers.Serializer):
    value = serializers.CharField()


class RecoveryQuestionSerializer(serializers.Serializer):
    question = serializers.CharField(max_length=256)
    answer = serializers.CharField(max_length=256)


class CredentialsSerializer(serializers.Serializer):
    password = PasswordSerializer(allow_null=False)
    recovery_question = RecoveryQuestionSerializer(allow_null=True)


class CreateOktaUserSerializer(serializers.Serializer):
    profile = OktaProfileDetailSerializer()
    credentials = CredentialsSerializer()


class OptionSerializer(serializers.Serializer):
    multiOptionalFactorEnroll = serializers.BooleanField(default=False)
    warnBeforePasswordExpired = serializers.BooleanField(default=False)


class OktaUserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    options = OptionSerializer(required=False)


class OktaUserLogoutSerializer(serializers.Serializer):
    stateToken = serializers.CharField()


class OktaCallBackSerializer(serializers.Serializer):
    SAMLResponse = serializers.CharField()
