from rest_framework import serializers
from .models import PrivacyPolicy


class PrivacyPolicySerializer(serializers.ModelSerializer):


    class Meta:
        model = PrivacyPolicy
        fields = [
            "id",
            "body",
            "author",
            "is_active",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id"]



