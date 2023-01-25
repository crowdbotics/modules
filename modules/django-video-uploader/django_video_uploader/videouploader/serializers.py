from rest_framework import serializers


class ChannelSerializer(serializers.Serializer):

    CHANNEL_PRIVACY_CHOICES = [
        ('anybody', 'anybody'),
        ('moderators', 'moderators'),
        ('user', 'user'),
    ]

    description = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    link = serializers.URLField(required=False, allow_null=True, allow_blank=True)
    name = serializers.CharField()
    privacy = serializers.ChoiceField(choices=CHANNEL_PRIVACY_CHOICES)


class GroupSerializer(serializers.Serializer):
    description = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    name = serializers.CharField()


class GroupIdSerializer(serializers.Serializer):
    group_id = serializers.IntegerField()


class ShowcaseSerializer(serializers.Serializer):

    LAYOUT_CHOICES = [
        ('grid', 'grid'),
        ('player', 'player'),
    ]
    SHOWCASE_PRIVACY_CHOICES = [
        ('anybody', 'anybody'),
        ('nobody', 'nobody'),
        ('team', 'team'),
        ('embed_only', 'embed_only'),
        ('password', 'password'),
    ]
    SORT_CHOICES = [
        ('added_first', 'added_first'),
        ('added_last', 'added_last'),
        ('alphabetical', 'alphabetical'),
        ('arranged', 'arranged'),
        ('likes', 'likes'),
        ('newest', 'newest'),
        ('oldest', 'oldest'),
        ('plays', 'plays'),
    ]
    THEME_CHOICES = [
        ('dark', 'dark'),
        ('standard', 'standard'),
    ]
    brand_color = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    description = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    hide_nav = serializers.BooleanField()
    hide_upcoming = serializers.BooleanField()
    layout = serializers.ChoiceField(choices=LAYOUT_CHOICES, required=False, allow_null=True, allow_blank=True)
    name = serializers.CharField(required=True)
    password = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    privacy = serializers.ChoiceField(choices=SHOWCASE_PRIVACY_CHOICES, required=False, allow_null=True, allow_blank=True)
    review_mode = serializers.BooleanField()
    sort = serializers.ChoiceField(choices=SORT_CHOICES, required=False, allow_null=True, allow_blank=True)
    theme = serializers.ChoiceField(choices=THEME_CHOICES, required=False, allow_null=True, allow_blank=True)



class UpdateShowcaseSerializer(ShowcaseSerializer):
    url = serializers.URLField()
    use_custom_domain = serializers.BooleanField()


class FolderSerializer(serializers.Serializer):
    name = serializers.CharField(required=True)
    parent_folder_uri = serializers.URLField()


