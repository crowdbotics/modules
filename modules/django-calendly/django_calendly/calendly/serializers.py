from rest_framework import serializers


class RemoveInviteesSerializer(serializers.Serializer):
    emails = serializers.ListSerializer(child=serializers.EmailField())


class InviteUserOrganizationsSerializer(serializers.Serializer):
    email = serializers.EmailField()


class CancelScheduleEventSerializer(serializers.Serializer):
    reason = serializers.CharField(required=False, allow_null=True)


class CreateInviteeNoShowSerializer(serializers.Serializer):
    invitee = serializers.URLField()


class CreateWebhookSubscriptionSerializer(serializers.Serializer):
    url = serializers.URLField()
    events = serializers.ListSerializer(child=serializers.CharField())
    organization = serializers.URLField()
    user = serializers.URLField()
    scope = serializers.CharField()
    signing_key = serializers.CharField()


