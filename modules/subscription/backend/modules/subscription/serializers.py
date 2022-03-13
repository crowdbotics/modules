from rest_framework import serializers

from modules.subscription.models import SubscriptionPlan


class SubscriptionPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionPlan
        fields = ["id", "name", "description", "price_id", "price", "interval"]