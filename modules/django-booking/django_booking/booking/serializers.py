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


class BookingCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = BookingDetail
        fields = '__all__'

    def validate(self, attrs):
        """
        Before creating a booking, validating if there is a booking already exists of the same product/booking variantId
        for the selected date.
        """
        attrs = super().validate(attrs)
        if not self.instance:
            if BookingDetail.objects.filter(identity_number=attrs['identity_number'],
                                            from_date__lte=attrs['to_date'], to_date__gte=attrs['from_date']).exists():
                raise serializers.ValidationError(f'This Booking slot is already booked.')
        return attrs