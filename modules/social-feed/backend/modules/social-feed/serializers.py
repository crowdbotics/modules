from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()

from home.api.v1.serializers import UserSerializer
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


class PostMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostMedia
        fields = "__all__"


class CreatePostSerializer(serializers.ModelSerializer):
    media = PostMediaSerializer(many=True)

    class Meta:
        model = Post
        fields = "__all__"


class LikeCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikeComment
        fields = "__all__"


class PostCommentSerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField()

    def get_likes(self, obj):
        return obj.likecomment_comment.count()

    class Meta:
        model = PostComment
        fields = "__all__"
        extra_kwargs = {'user': {'default': serializers.CurrentUserDefault()}}


class PostSerializer(serializers.ModelSerializer):
    media = PostMediaSerializer(many=True, source='postmedia_post', required=False)
    comments = PostCommentSerializer(many=True, source='postcomment_post', required=False)
    upvotes = serializers.SerializerMethodField()
    downvotes = serializers.SerializerMethodField()
    liked = serializers.SerializerMethodField()
    reported = serializers.SerializerMethodField()

    def get_reported(self, obj):
        return obj.reportpost_post.count()

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
        extra_kwargs = {'user': {'default': serializers.CurrentUserDefault()}}


class ReportPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportPost
        fields = "__all__"
        extra_kwargs = {'reported_by': {'default': serializers.CurrentUserDefault()}}


class FollowRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FollowRequest
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
    """
    User Profile Serializer
    """
    posts = serializers.SerializerMethodField()
    followers = serializers.SerializerMethodField()
    following = serializers.SerializerMethodField()
    i_follow = serializers.SerializerMethodField()
    is_owner = serializers.SerializerMethodField()

    def get_following(self, obj):
        return obj.user_following.count()

    def get_followers(self, obj):
        return obj.user_followers.count()

    def get_posts(self, obj):
        return PostSerializer(obj.post_user, many=True, context={'request': self.context['request']}).data

    def get_i_follow(self, obj):
        try:
            user = self.context['request'].user
            if user.is_authenticated:
                return obj.user_followers.filter(user=user).exists()
            return False
        except KeyError:
            return False

    def get_is_owner(self, obj):
        try:
            user = self.context['request'].user
            if user.is_authenticated:
                return obj == user
            return False
        except KeyError:
            return False

    class Meta:
        model = get_user_model()
        fields = (
            "id", "username", "first_name", "last_name",
            "email", "posts", "followers", "following", "i_follow", "is_owner"
        )


class FollowingSerializer(serializers.ModelSerializer):
    follow = serializers.SerializerMethodField()

    def get_follow(self, obj):
        try:
            user = self.context['request'].user
            if user.is_authenticated:
                return obj.user_following.filter(follow=user).exists()
            return False
        except KeyError:
            return False

    class Meta:
        model = get_user_model()
        fields = ("id", "username", "name", "follow")


class FollowersSerializer(serializers.ModelSerializer):
    follow = serializers.SerializerMethodField()

    def get_follow(self, obj):
        try:
            user = self.context['request'].user
            if user.is_authenticated:
                return obj.user_followers.filter(user=user).exists()
            return False
        except KeyError:
            return False

    class Meta:
        model = get_user_model()
        fields = ("id", "username", "name", 'follow')


class UnlikeCommentsSerializer(serializers.Serializer):
    comment_id = serializers.PrimaryKeyRelatedField(queryset=PostComment.objects.all(), required=True)


class likeCommentsSerializer(serializers.Serializer):
    comment_id = serializers.PrimaryKeyRelatedField(queryset=PostComment.objects.all(), required=True)


class CommentDeleteSerializer(serializers.Serializer):
    comment_id = serializers.PrimaryKeyRelatedField(queryset=PostComment.objects.all(), required=True)


class PostLikeSerializer(serializers.Serializer):
    post_id = serializers.PrimaryKeyRelatedField(queryset=Post.objects.all(), required=True)


class PostUnlikeSerializer(serializers.Serializer):
    post_id = serializers.PrimaryKeyRelatedField(queryset=Post.objects.all(), required=True)
