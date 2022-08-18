from re import U
from ...models import ChatMessage
from rest_framework import serializers
from django.contrib.auth import get_user_model

User =  get_user_model()
from django.db.models import Q

class ChatSerializer(serializers.ModelSerializer):
    is_sender = serializers.SerializerMethodField()
    user_profile_image = serializers.SerializerMethodField()

    def get_is_sender(self, obj):
        return obj.sender == self.context['request'].user

    def get_user_profile_image(self, obj):
        try:
            return obj.sender.profile_info.profile_image.url
        except:
            return None

    class Meta:
        model = ChatMessage
        fields = '__all__'


class UserChatSerializer(serializers.ModelSerializer):
    last_message = serializers.SerializerMethodField()
    user_profile_image = serializers.SerializerMethodField()

    def get_last_message(self, obj):
        # get user from context
        user = self.context['request'].user
        chat = ChatMessage.objects.filter(
            Q(sender=obj) | Q(receiver=obj)
        ).order_by('created_at').last()
        return chat.as_dict(user=user) if chat else None

    def get_user_profile_image(self, obj):
        try:
            return obj.profile_info.profile_image.url
        except:
            return None

    class Meta:
        model = User
        fields = ('id', 'name', 'last_message', 'user_profile_image')