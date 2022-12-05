from rest_framework import serializers
from .models import Booking, BookingPlan, BookingPenalty, BookingDetail


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'
        read_only_fields = ["id"]


class BookingPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingPlan
        fields = '__all__'
        read_only_fields = ["id"]


class BookingPenaltySerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingPenalty
        fields = '__all__'
        read_only_fields = ["id"]


class BookingDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingDetail
        fields = '__all__'
        read_only_fields = ["id"]
        