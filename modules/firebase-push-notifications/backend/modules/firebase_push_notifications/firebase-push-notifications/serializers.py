from rest_framework import serializers
from fcm_django.models import FCMDevice

from .models import Notification, UserNotification


class FCMDeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = FCMDevice
        fields = '__all__'


class NotificationSerializer(serializers.ModelSerializer):
    is_seen = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Notification
        fields = "__all__"


    def get_is_seen(self, obj):
        is_seen = False
        try:
            # user_id = obj.send_to
            user_id = self.context.get('request').user
            UserNotification.objects.get(notification_id=obj.id, user_id=user_id)
            is_seen = True
        except UserNotification.DoesNotExist:
            pass
        return is_seen


class UserNotificationSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserNotification
        fields = "__all__"
