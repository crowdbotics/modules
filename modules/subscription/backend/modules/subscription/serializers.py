from rest_framework import serializers

from modules.subscription.models import SubscriptionPlan


class SubscriptionPlanSerializer(serializers.ModelSerializer):
    is_subscribed = serializers.SerializerMethodField()

    def get_is_subscribed(self, obj):
        user = self.context.get("user")
        has_user_sub = hasattr(user, 'user_subscription')
        return user.user_subscription.tier == obj if has_user_sub else False

    class Meta:
        model = SubscriptionPlan
        fields = ["id", "name", "description", "price_id", "price", "interval", "is_subscribed"]