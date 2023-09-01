from rest_framework import serializers
from .models import Meetings, MeetingAttendees


class EventsListSerializer(serializers.Serializer):
    max_results = serializers.IntegerField(required=False)
    order_by = serializers.CharField(required=False)
    time_max = serializers.CharField(required=False)
    time_min = serializers.CharField(required=False)
    page_token = serializers.CharField(required=False)


class MeetingAttendeesSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeetingAttendees
        fields = '__all__'
        read_only_fields = ['id']


class MeetingSerializer(serializers.ModelSerializer):
    attendees = MeetingAttendeesSerializer(many=True, required=False)
    id = serializers.CharField(required=False)
    eventType = serializers.CharField(required=False)
    htmlLink = serializers.URLField(required=False)
    hangoutLink = serializers.URLField(required=False)
    timezone = serializers.CharField(required=False)
    organizer = serializers.DictField(required=False)
    start = serializers.DictField()
    end = serializers.DictField()

    class Meta:
        model = Meetings
        fields = '__all__'
        read_only_fields = ['id']

    def validate(self, attrs):
        start = attrs.get("start", {})
        new_attr = {
            "html_link": attrs.get("htmlLink"),
            "event_type": attrs.get("eventType"),
            "event_id": attrs.get("id"),
            "organizer": attrs.get("organizer", {}).get("email"),
            "summary": attrs.get("summary"),
            "description": attrs.get("description", ""),
            "attendees": attrs.get("attendees", []),
            "hangout": attrs.get("hangoutLink", ""),
            "location": attrs.get("location", ""),
            "status": attrs.get("status", ""),
            "start": start.get("dateTime"),
            "end": attrs.get("end", {}).get("dateTime"),
            "timezone": start.get("timeZone")
        }
        return super(MeetingSerializer, self).validate(new_attr)

    def create(self, validated_data):
        attendees = validated_data.pop("attendees", [])

        instance, created = Meetings.objects.update_or_create(
            event_id=validated_data.get("event_id"), defaults=validated_data)
        for attendee in attendees:
            attendee["response_status"] = attendee.pop("responseStatus", "")
            MeetingAttendees.objects.update_or_create(meeting=instance, email=attendee.get("email"), defaults=attendee)
        return instance


class MeetingListSerializer(serializers.ModelSerializer):
    attendees = MeetingAttendeesSerializer(many=True, source='meeting_to_attends')

    class Meta:
        model = Meetings
        fields = '__all__'
        read_only_fields = ['id']
        