from django.contrib.auth import get_user_model
from django.http import HttpRequest
from django.utils.translation import ugettext_lazy as _
from allauth.account import app_settings as allauth_settings
from allauth.account.forms import ResetPasswordForm
from allauth.utils import email_address_exists, generate_unique_username
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from rest_framework import serializers
from rest_auth.serializers import PasswordResetSerializer
from ...models import (
    DownvotePost,
    LikeComment,
    Post,
    PostComment,
    PostMedia,
    ReportPost,
    UpvotePost,
    UserProfile, 
    ProfileConfig,
    MatchRequest
)
from django.utils.translation import ugettext_lazy as _


User = get_user_model()


class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'email', 'password')
        extra_kwargs = {
            'password': {
                'write_only': True,
                'style': {
                    'input_type': 'password'
                }
            },
            'email': {
                'required': True,
                'allow_blank': False,
            }
        }

    def _get_request(self):
        request = self.context.get('request')
        if request and not isinstance(request, HttpRequest) and hasattr(request, '_request'):
            request = request._request
        return request

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_settings.UNIQUE_EMAIL:
            if email and email_address_exists(email):
                raise serializers.ValidationError(
                    _("A user is already registered with this e-mail address."))
        return email

    def create(self, validated_data):
        user = User(
            email=validated_data.get('email'),
            name=validated_data.get('name'),
            username=generate_unique_username([
                validated_data.get('name'),
                validated_data.get('email'),
                'user'
            ])
        )
        user.set_password(validated_data.get('password'))
        user.save()
        request = self._get_request()
        setup_user_email(request, user, [])
        return user

    def save(self, request=None):
        """rest_auth passes request so we must override to accept it"""
        return super().save()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'name']


class PasswordSerializer(PasswordResetSerializer):
    """Custom serializer for rest_auth to solve reset password error"""
    password_reset_form_class = ResetPasswordForm

class ProfileInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = "__all__"

class ProfileConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileConfig
        fields = "__all__"


class PostMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostMedia
        fields = "__all__"


class CreatePostSerializer(serializers.ModelSerializer):
    media = PostMediaSerializer(many=True)
    
    class Meta:
        model = Post
        fields = "__all__"


class PostSerializer(serializers.ModelSerializer):
    media = PostMediaSerializer(many=True, source='postmedia_post')
    upvotes = serializers.SerializerMethodField()
    downvotes = serializers.SerializerMethodField()
    liked = serializers.SerializerMethodField()

    def get_upvotes(self, obj):
        return obj.upvotepost_post.count()

    def get_downvotes(self, obj):
        return obj.downvotepost_post.count()

    def get_liked(self, obj):
        try:
            user = self.context['request'].user
            if user.is_authenticated:
                return obj.upvotepost_post.filter(upvote_by=user).exists()
            return False
        except KeyError:
            return False

    class Meta:
        model = Post
        fields = "__all__"


class ReportPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportPost
        fields = "__all__"


class PostCommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = PostComment
        fields = "__all__"


class LikeCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikeComment
        fields = "__all__"


class UpvotePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = UpvotePost
        fields = "__all__"


class DownvotePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = DownvotePost
        fields = "__all__"


class PostDetailSerializer(serializers.ModelSerializer):
    media = PostMediaSerializer(many=True, source='postmedia_post')
    upvotes = serializers.SerializerMethodField()
    downvotes = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()
    user = UserSerializer()
    liked = serializers.SerializerMethodField()
    is_owner = serializers.SerializerMethodField()

    def get_liked(self, obj):
        try:
            user = self.context['request'].user
            if user.is_authenticated:
                return obj.upvotepost_post.filter(upvote_by=user).exists()
            return False
        except KeyError:
            return False

    def get_is_owner(self, obj):
        try:
            user = self.context['request'].user
            if user.is_authenticated:
                return obj.user == user
            return False
        except KeyError:
            return False

    def get_downvotes(self, obj):
        return obj.downvotepost_post.count()

    def get_upvotes(self, obj):
        return obj.upvotepost_post.count()

    def get_comments(self, obj):
        all_comments_obj = obj.postcomment_post.all()
        try:
            user = self.context['request'].user
        except KeyError:
            user = None
        all_comments = []
        for comment in all_comments_obj.filter(ref_comment=None):
            root = comment.as_dict(user)
            children = []
            for child in all_comments_obj.filter(ref_comment=comment):
                children.append(child.as_dict(user))
            root['children'] = children
            all_comments.append(root)
        return all_comments


    def get_comments_count(self, obj):
        return obj.postcomment_post.count()

    class Meta:
        model = Post
        fields = "__all__"

class ProfileSerializer(serializers.ModelSerializer):
    profile_info = ProfileInfoSerializer(read_only=True)
    profile_configs = ProfileConfigSerializer(read_only=True)
    profile_posts = serializers.SerializerMethodField()
    is_owner = serializers.SerializerMethodField()
    match_requested = serializers.SerializerMethodField()
    swipe_lefts = serializers.SerializerMethodField()
    swipe_rights = serializers.SerializerMethodField()
    
    def get_is_owner(self, obj):
        try:
            user = self.context['request'].user
            if user == obj:
                return True
            return False
        except KeyError:
            return False

    def get_profile_configs(self, obj):
        try:
            if self.get_is_owner(obj):
                return ProfileConfigSerializer(obj.profile_configs.all(), many=True).data
            return False
        except KeyError:
            return False

    def get_match_requested(self, obj):
        """
        user: the user calling the API
        obj: the user in the iterative queryset
        """
        try:
            user = self.context['request'].user
            return MatchRequest.objects.filter(user=user, match_request_for=obj).exists()
        except KeyError:
            return False
    
    def get_profile_posts(self, obj):
        return PostDetailSerializer(obj.post_user.all(), many=True).data

    def get_swipe_rights(self, obj):
        return obj.match_user.count() + obj.match_with_user.count()

    def get_swipe_lefts(self, obj):
        return obj.match_denied_with_user.count()
    
    class Meta:
        model = User
        fields = [
            'id', 'email', 'name', 'first_name',  'match_requested',
            'profile_info', 'profile_configs', 'profile_posts', 'is_owner', 
            'swipe_rights', 'swipe_lefts'
        ]