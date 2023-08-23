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
