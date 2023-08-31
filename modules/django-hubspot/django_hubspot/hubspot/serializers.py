from rest_framework import serializers


class TokenSerializer(serializers.Serializer):
    code = serializers.CharField(required=True)


class DealAssociationSerializer(serializers.Serializer):
    dealId = serializers.IntegerField()
    emails = serializers.ListSerializer(child=serializers.EmailField())


class DealSerializer(serializers.Serializer):
    amount = serializers.FloatField(required=True)
    closedate = serializers.DateTimeField()
    dealname = serializers.CharField()
    dealstage = serializers.CharField()
    hubspot_owner_id = serializers.IntegerField()
    pipeline = serializers.CharField()


class TicketSerializer(serializers.Serializer):
    hs_pipeline = serializers.CharField()
    hs_pipeline_stage = serializers.CharField()
    hs_ticket_priority = serializers.CharField()
    hubspot_owner_id = serializers.IntegerField()
    subject = serializers.CharField()
    content = serializers.CharField()


class TicketAssociationSerializer(serializers.Serializer):
    associationCategory = serializers.CharField()
    associationTypeId = serializers.IntegerField()


class CustomPropertiesSerializer(serializers.Serializer):
    name = serializers.CharField()
    value = serializers.CharField()
    timestamp = serializers.IntegerField()
    sourceId = serializers.CharField()
    sourceLabel = serializers.CharField()
    source = serializers.CharField()
    selectedByUser = serializers.BooleanField()
    selectedByUserTimestamp = serializers.IntegerField()
    sourceVid = serializers.ListField()
    sourceMetadata = serializers.CharField()
    requestId = serializers.CharField()
    updatedByUserId = serializers.IntegerField(required=False)
    persistenceTimestamp = serializers.IntegerField(required=False)
    useTimestampAsPersistenceTimestamp = serializers.BooleanField(required=False)


class EventSerializer(serializers.Serializer):
    eventName = serializers.CharField()
    eventType = serializers.CharField(required=False)
    startDateTime = serializers.DateTimeField(required=False)
    endDateTime = serializers.DateTimeField(required=False)
    eventOrganizer = serializers.CharField()
    eventDescription = serializers.CharField(required=False)
    eventUrl = serializers.CharField(required=False)
    eventCancelled = serializers.BooleanField(required=False)
    customProperties = CustomPropertiesSerializer(many=True, required=False, allow_null=True)
    externalAccountId = serializers.CharField()
    externalEventId = serializers.CharField()
