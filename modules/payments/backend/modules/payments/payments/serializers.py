from rest_framework import serializers

from .models import StripeSetting


class StripeSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = StripeSetting
        fields = '__all__'
