from rest_framework import serializers

from .models import Comment, LikeOnComment


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
        extra_kwargs = {"user": {"required": False}}

    def create(self, validated_data):
        request = self.context.get('request')
        validated_data.update({'user': request.user})
        return super(CommentSerializer, self).create(validated_data)


class LikeOnCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikeOnComment
        fields = '__all__'
