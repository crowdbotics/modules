from rest_framework import serializers
from .models import TermAndCondition


class TermAndConditionSerializer(serializers.ModelSerializer):


    class Meta:
        model = TermAndCondition
        fields = [
            "id",
            "body",
            "author",
            "is_active",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id"]



