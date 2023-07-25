from .models import StripeSetting
from rest_framework import serializers


class StripeSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = StripeSetting
        fields = '__all__'