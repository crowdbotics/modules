from django.contrib.auth import get_user_model
from .models import (
    Chat,
    DownvotePost,
    FollowRequest,
    LikeComment,
    Post,
    PostComment,
    PostMedia,
    ReportPost,
    UpvotePost,
)
from django.utils.translation import ugettext_lazy as _
from rest_framework import serializers


class PostMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostMedia
        fields = "__all__"


class PostSerializer(serializers.ModelSerializer):
    media = PostMediaSerializer(many=True, source='postmedia_post')
    upvotes = serializers.SerializerMethodField()
    downvotes = serializers.SerializerMethodField()

    def get_upvotes(self, obj):
        return obj.upvotepost_post.count()

    def get_downvotes(self, obj):
        return obj.downvotepost_post.count()

    class Meta:
        model = Post
        fields = "__all__"


class ReportPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportPost
        fields = "__all__"


class FollowRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FollowRequest
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


class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = "__all__"


class PostDetailSerializer(serializers.ModelSerializer):
    media = PostMediaSerializer(many=True, source='postmedia_post')
    upvotes = serializers.SerializerMethodField()
    downvotes = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()

    def get_downvotes(self, obj):
        return obj.downvotepost_post.count()

    def get_upvotes(self, obj):
        return obj.upvotepost_post.count()

    def get_comments(self, obj):
        all_comments = obj.postcomment_post.all()
        x = []
        for comment in all_comments.filter(ref_comment=None):
            root = comment.as_dict()
            children = []
            for child in all_comments.filter(ref_comment=comment):
                children.append(child.as_dict())
            root['children'] = children
            x.append(root)
        return x

    class Meta:
        model = Post
        fields = "__all__"