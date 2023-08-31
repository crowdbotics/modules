from fcm_django.models import FCMDevice
from rest_framework import serializers

from .models import Notification, UserNotification


class FCMDeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = FCMDevice
        fields = "__all__"


class FCMNotificationSerializer(serializers.ModelSerializer):
    is_seen = serializers.BooleanField(default=False, read_only=True)

    class Meta:
        model = Notification
        fields = "__all__"


class UserNotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserNotification
        fields = "__all__"


class UserNotificationValidationSerializer(serializers.Serializer):
    notification = serializers.IntegerField(required=True, allow_null=False)
