from rest_framework import serializers
from .models import Comment, LikeOnComment


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class LikeOnCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikeOnComment
        fields = '__all__'





