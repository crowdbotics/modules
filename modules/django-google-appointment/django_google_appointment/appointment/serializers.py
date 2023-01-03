from rest_framework import serializers
from .models import Meetings, MeetingType, MeetingAttendees


class EventsListSerializer(serializers.Serializer):
    max_results = serializers.IntegerField(required=False)
    order_by = serializers.CharField(required=False)
    time_max = serializers.CharField(required=False)
    time_min = serializers.CharField(required=False)
    page_token = serializers.CharField(required=False)


class MeetingTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeetingType
        fields = '__all__'
        read_only_fields = ['id']


class MeetingAttendeesSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeetingAttendees
        fields = '__all__'
        read_only_fields = ['id']


class MeetingSerializer(serializers.ModelSerializer):
    attendees_list = MeetingAttendeesSerializer(many=True, source="meeting_to_attends")

    class Meta:
        model = Meetings
        fields = '__all__'
        read_only_fields = ['id']

    def create(self, validated_data):
        meeting_to_attends = validated_data.pop("meeting_to_attends")
        instance = Meetings.objects.create(**validated_data)
        for meeting_to_attend in meeting_to_attends:
            MeetingAttendees.objects.create(meeting=instance, **meeting_to_attend)
        return instance
        