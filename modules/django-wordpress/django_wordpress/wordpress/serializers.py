from rest_framework import serializers


class CreatePostSerializer(serializers.Serializer):

    date = serializers.DateTimeField(required=False, allow_null=True)
    title = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    content = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    excerpt = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    slug = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    author = serializers.CharField(required=False,  allow_null=True, allow_blank=True)
    publicize = serializers.BooleanField(required=False, allow_null=True)
    publicize_message = serializers.CharField(required=False,  allow_null=True, allow_blank=True)
    status = serializers.CharField(required=False,  allow_null=True, allow_blank=True)
    sticky = serializers.BooleanField(required=False, allow_null=True)
    password = serializers.CharField(required=False, allow_null=True,
                                     style={'input_type': 'password', 'placeholder': 'Password'})
    parent = serializers.IntegerField(required=False, allow_null=True)
    terms = serializers.JSONField(required=False, allow_null=True)
    categories = serializers.ListField(required=False, allow_null=True)
    tags = serializers.ListField(required=False, allow_null=True)
    format = serializers.CharField(required=False,  allow_null=True, allow_blank=True)
    featured_image = serializers.CharField(required=False,  allow_null=True, allow_blank=True)
    media = serializers.JSONField(required=False, allow_null=True)
    media_urls = serializers.ListField(required=False, allow_null=True)
    media_attrs = serializers.ListField(required=False, allow_null=True)
    meta_data = serializers.ListField(required=False, allow_null=True)
    discussion = serializers.JSONField(required=False, allow_null=True)
    likes_enabled = serializers.BooleanField(required=False, allow_null=True)
    sharing_enabled = serializers.BooleanField(required=False, allow_null=True)
    menu_order = serializers.IntegerField(required=False, allow_null=True)
    page_template = serializers.CharField(required=False,  allow_null=True, allow_blank=True)


class DeleteMultiplePostSerializer(serializers.Serializer):
    post_ids = serializers.ListField(allow_null=False)


class UpdateUserDetailsSerializer(serializers.Serializer):
    ID = serializers.IntegerField(allow_null=False)
    login = serializers.CharField(allow_null=False, allow_blank=False)
    email = serializers.CharField(required=False,  allow_null=True, allow_blank=True)
    name = serializers.CharField(required=False,  allow_null=True, allow_blank=True)
    first_name = serializers.CharField(required=False,  allow_null=True, allow_blank=True)
    last_name = serializers.CharField(required=False,  allow_null=True, allow_blank=True)
    nice_name = serializers.CharField(required=False,  allow_null=True, allow_blank=True)
    URL = serializers.CharField(required=False,  allow_null=True, allow_blank=True)
    avatar_URL = serializers.URLField(required=False,  allow_null=True, allow_blank=True)
    profile_URL = serializers.URLField(required=False,  allow_null=True, allow_blank=True)
    site_ID = serializers.URLField(required=False,  allow_null=True, allow_blank=True)
    roles = serializers.ListField(required=False, allow_null=True)


class ActivateWidgetsSerializer(serializers.Serializer):
    id_base = serializers.CharField(required=False,  allow_null=True, allow_blank=True)
    sidebar = serializers.CharField(required=False,  allow_null=True, allow_blank=True)
    position = serializers.CharField(required=False,  allow_null=True, allow_blank=True)
    settings = serializers.JSONField(required=False, allow_null=True)


class CommentOnPostSerializer(serializers.Serializer):
    content = serializers.CharField(required=False,  allow_null=True, allow_blank=True)


class EditCommentSerializer(serializers.Serializer):
    author = serializers.CharField(required=False,  allow_null=True, allow_blank=True)
    author_email = serializers.CharField(required=False,  allow_null=True, allow_blank=True)
    author_url = serializers.CharField(required=False,  allow_null=True, allow_blank=True)
    content = serializers.CharField(required=False,  allow_null=True, allow_blank=True)
    date = serializers.DateTimeField(required=False, allow_null=True)
    status = serializers.CharField(required=False,  allow_null=True, allow_blank=True)


class CategoriesSerializer(serializers.Serializer):
    name = serializers.CharField(allow_blank=True, allow_null=True)
    description = serializers.CharField(allow_blank=True, allow_null=True)
    parent = serializers.IntegerField(required=False, allow_null=True)


class TagSerializer(serializers.Serializer):
    name = serializers.CharField(allow_blank=True, allow_null=True)
    description = serializers.CharField(allow_blank=True, allow_null=True)


class MenuSerializer(serializers.Serializer):
    name = serializers.CharField(allow_blank=True, allow_null=True)
