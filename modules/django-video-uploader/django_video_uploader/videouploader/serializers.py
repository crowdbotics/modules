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
    privacy = serializers.ChoiceField(choices=SHOWCASE_PRIVACY_CHOICES, required=False, allow_null=True,
                                      allow_blank=True)
    review_mode = serializers.BooleanField()
    sort = serializers.ChoiceField(choices=SORT_CHOICES, required=False, allow_null=True, allow_blank=True)
    theme = serializers.ChoiceField(choices=THEME_CHOICES, required=False, allow_null=True, allow_blank=True)


class UpdateShowcaseSerializer(ShowcaseSerializer):
    url = serializers.URLField()
    use_custom_domain = serializers.BooleanField()


class FolderSerializer(serializers.Serializer):
    name = serializers.CharField(required=True)
    parent_folder_uri = serializers.URLField()


class UploadSerializer(serializers.Serializer):
    approach = serializers.CharField()
    size = serializers.CharField()
    redirect_url = serializers.URLField()


class CreateVideoSerializer(serializers.Serializer):
    name = serializers.CharField(required=False)
    description = serializers.CharField(required=False)
    upload = UploadSerializer()


class ButtonsSerializer(serializers.Serializer):
    watchlater = serializers.BooleanField(required=False)
    share = serializers.BooleanField(required=False)
    embed = serializers.BooleanField(required=False)
    hd = serializers.BooleanField(required=False)
    fullscreen = serializers.BooleanField(required=False)
    scaling = serializers.BooleanField(required=False)
    like = serializers.BooleanField(required=False)


class CustomSerializer(serializers.Serializer):
    id = serializers.IntegerField(required=False)
    active = serializers.BooleanField(required=False)
    link = serializers.URLField(required=False)
    sticky = serializers.BooleanField(required=False)


class LogosSerializer(serializers.Serializer):
    custom = CustomSerializer(required=False)
    vimeo = serializers.BooleanField(required=False)


class TitleSerializer(serializers.Serializer):
    NAME_CHOICES = [
        ('hide', 'hide'),
        ('show', 'show'),
        ('user', 'user'),
    ]
    OWNER_CHOICES = [
        ('hide', 'hide'),
        ('show', 'show'),
        ('user', 'user'),
    ]
    PORTRAIT_CHOICES = [
        ('hide', 'hide'),
        ('show', 'show'),
        ('user', 'user'),
    ]
    name = serializers.ChoiceField(choices=NAME_CHOICES, required=False)
    owner = serializers.ChoiceField(choices=OWNER_CHOICES, required=False)
    portrait = serializers.ChoiceField(choices=PORTRAIT_CHOICES, required=False)


class EmbdedSerializer(serializers.Serializer):
    buttons = ButtonsSerializer(required=False)
    color = serializers.CharField(required=False)
    logos = LogosSerializer(required=False)
    playbar = serializers.BooleanField(required=False)
    title = TitleSerializer(required=False)
    volume = serializers.BooleanField(required=False)


class PrivacySerializer(serializers.Serializer):
    VIEW_CHOICES = [
        ('anybody', 'anybody'),
        ('contacts', 'contacts'),
        ('disable', 'disable'),
        ('nobody', 'nobody'),
        ('unlisted', 'unlisted'),
        ('users', 'users'),
    ]
    EMBED_CHOICES = [
        ('private', 'private'),
        ('public', 'public'),
        ('whitelist', 'whitelist'),
    ]
    COMMENTS_CHOICES = [
        ('anybody', 'anybody'),
        ('contacts', 'contacts'),
        ('nobody', 'nobody')
    ]
    view = serializers.ChoiceField(choices=VIEW_CHOICES, required=False)
    embed = serializers.ChoiceField(choices=EMBED_CHOICES, required=False)
    download = serializers.BooleanField(required=False)
    add = serializers.BooleanField(required=False)
    comments = serializers.ChoiceField(choices=COMMENTS_CHOICES, required=False)


class ReviewPageSerializer(serializers.Serializer):
    active = serializers.BooleanField(required=False)


class EditVideoSerializer(serializers.Serializer):
    LICENSE_CHOICES = [
        ('by', 'by'),
        ('by-nc', 'by-nc'),
        ('by-nc-nd', 'by-nc-nd'),
        ('by-nc-sa', 'by-nc-sa'),
        ('by-nd', 'by-nd'),
        ('by-sa', 'by-sa'),
        ('cc0', 'cc0'),
    ]
    content_rating = serializers.ListField(required=False)
    custom_url = serializers.CharField(required=False)
    description = serializers.CharField(required=False)
    embded = EmbdedSerializer(required=False)
    embed_domains = serializers.ListField(required=False)
    embed_domains_add = serializers.ListField(required=False)
    embed_domains_delete = serializers.ListField(required=False)
    license = serializers.ChoiceField(choices=LICENSE_CHOICES, required=False)
    locale = serializers.CharField(required=False)
    name = serializers.CharField(required=False)
    password = serializers.CharField(required=False)
    privacy = PrivacySerializer(required=False)
    review_page = ReviewPageSerializer(required=False)