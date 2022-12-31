from rest_framework import serializers


class EventsListSerializer(serializers.Serializer):
    max_results = serializers.IntegerField(required=False)
    order_by = serializers.CharField(required=False)
    time_max = serializers.CharField(required=False)
    time_min = serializers.CharField(required=False)
    page_token = serializers.CharField(required=False)
