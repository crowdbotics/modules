from allauth.account import app_settings as allauth_settings
from allauth.account.adapter import get_adapter
from allauth.account.forms import ResetPasswordForm
from allauth.account.utils import setup_user_email
from allauth.utils import email_address_exists, generate_unique_username
from django.contrib.auth import get_user_model
from django.http import HttpRequest
from django.utils.translation import ugettext_lazy as _
from rest_framework import serializers

from modules.corporate_event.corporate_event.models import OfferigsPage, Activities, UserConnectRequest, ConnectProfile, AboutTeamAndBoardMember, Session, \
    UserSession, SessionAttachment, ActivitiesAttachment, UserActivities

from home.api.v1.serializers import UserSerializer

class ActivitiesAttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivitiesAttachment
        fields = '__all__'

class SessionAttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = SessionAttachment
        fields = '__all__'


class UserSessionSerializer(serializers.ModelSerializer):
    attachments = serializers.SerializerMethodField()

    def get_attachments(self, obj):
        return SessionAttachmentSerializer(obj.session_attachment.all(), many=True, context=self.context).data

    class Meta:
        model = Session
        fields = [
            'id', 'title', 'date', 'start_time', 'session_number', 'image', 'sort', 'description', 'attachments'
        ]
        extra_kwargs = {
            "user": {"required": False}
        }


class EventsActivitySerializer(serializers.ModelSerializer):
    attachments = serializers.SerializerMethodField()

    def get_attachments(self, obj):
        return ActivitiesAttachmentSerializer(obj.activity_attachment.all(), many=True, context=self.context).data

    class Meta:
        model = Activities
        fields = '__all__'


class UserRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserConnectRequest
        fields = '__all__'
        extra_kwargs = {
            "requester": {"required": False}
        }


class ConnectProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = ConnectProfile
        fields = '__all__'


class AboutTeamAndBoardSerializer(serializers.ModelSerializer):
    connect_user = ConnectProfileSerializer(read_only=True)

    class Meta:
        model = AboutTeamAndBoardMember
        fields = ['select', 'connect_user']
        ordering = ['connect_user__user__last_name']


class OfferigsPageSerializer(serializers.ModelSerializer):

    class Meta:
        model = OfferigsPage
        fields = '__all__'


class HomeSessionSerializer(serializers.ModelSerializer):
    start_time = serializers.TimeField(format="%I:%M %p", required=False, source='session.start_time')
    title = serializers.CharField(required=False, source='session.title')
    description = serializers.CharField(required=False, source='session.description')
    image = serializers.ImageField(required=False, source='session.image')
    type = serializers.SerializerMethodField()
    attachments = serializers.SerializerMethodField()
    start_time_stamp = serializers.SerializerMethodField()

    def get_start_time_stamp(self, obj):
        return obj.session.start_time

    def get_type(self, obj):
        return "session"

    def get_attachments(self, obj):
        all_session_attachments = self.context.get('all_session_attachments')
        session_id = obj.session.id
        if not all_session_attachments:
            all_session_attachments = obj.session.session_attachment.all()
        return SessionAttachmentSerializer(
            all_session_attachments.filter(session_id=session_id), many=True,
            context=self.context
        ).data

    class Meta:
        model = UserSession
        fields = '__all__'




class HomeActivitiesSerializer(serializers.ModelSerializer):
    start_time = serializers.TimeField(format="%I:%M %p", required=False, source='activity.start_time')
    title = serializers.CharField(required=False, source='activity.title')
    description = serializers.CharField(required=False, source='activity.description')
    image = serializers.ImageField(required=False, source='activity.image')
    type = serializers.SerializerMethodField()
    attachments = serializers.SerializerMethodField()
    start_time_stamp = serializers.SerializerMethodField()

    def get_type(self, obj):
        return "activity"

    def get_start_time_stamp(self, obj):
        return obj.activity.start_time

    def get_attachments(self, obj):
        all_activity_attachments = self.context.get('all_activity_attachments')
        activity_id = obj.activity.id
        if not all_activity_attachments:
            all_activity_attachments = obj.activity.activity_attachment.all()
        return ActivitiesAttachmentSerializer(
            all_activity_attachments.filter(activity_id=activity_id), many=True,
            context=self.context
        ).data

    class Meta:
        model = UserActivities
        fields = '__all__'

