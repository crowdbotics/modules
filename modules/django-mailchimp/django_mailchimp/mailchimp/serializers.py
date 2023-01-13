from rest_framework import serializers


class ContactSerializer(serializers.Serializer):
    country = serializers.CharField(required=True, allow_null=False, allow_blank=False)
    state = serializers.CharField(required=False, allow_null=False, allow_blank=False)
    city = serializers.CharField(required=True, allow_null=False, allow_blank=False)
    zip = serializers.CharField(required=True, allow_null=False, allow_blank=False)
    address1 = serializers.CharField(required=True, allow_null=False, allow_blank=False)
    address2 = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    company = serializers.CharField(required=True, allow_null=False, allow_blank=False)
    phone = serializers.CharField(required=True, allow_null=False, allow_blank=False)


class CampaignDefaultSerializer(serializers.Serializer):
    from_name = serializers.CharField(required=True, allow_null=False, allow_blank=False)
    from_email = serializers.CharField(required=True, allow_null=False, allow_blank=False)
    subject = serializers.CharField(required=True, allow_null=False, allow_blank=False)
    language = serializers.CharField(required=True, allow_null=False, allow_blank=False)


class LocationSerializer(serializers.Serializer):
    latitude = serializers.IntegerField(required=False, allow_null=True)
    longitude = serializers.IntegerField(required=False, allow_null=True)


class TagSerializer(serializers.Serializer):
    name = serializers.CharField(required=True, allow_null=False, allow_blank=False)
    status = serializers.CharField(required=True, allow_null=False, allow_blank=False)


class MarketingPermissionSerializer(serializers.Serializer):
    marketing_permission_id = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    enabled = serializers.BooleanField(required=False, allow_null=True)


class SegmentOptionsSerializer(serializers.Serializer):
    match = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    conditions = serializers.ListField(required=False, allow_null=True, allow_empty=True)


class DaySerializer(serializers.Serializer):
    sunday = serializers.BooleanField(required=False, allow_null=True)
    monday = serializers.BooleanField(required=False, allow_null=True)
    tuesday = serializers.BooleanField(required=False, allow_null=True)
    wednesday = serializers.BooleanField(required=False, allow_null=True)
    thursday = serializers.BooleanField(required=False, allow_null=True)
    friday = serializers.BooleanField(required=False, allow_null=True)
    saturday = serializers.BooleanField(required=False, allow_null=True)


class ScheduleSerializer(serializers.Serializer):
    hours = serializers.IntegerField(required=False, allow_null=False)
    daily_send = DaySerializer(many=True)
    weekly_send_day = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    monthly_send_date = serializers.IntegerField(required=False, allow_null=False)


class RssOptsSerializer(serializers.Serializer):
    schedule = ScheduleSerializer(many=True)
    constrain_rss_img = serializers.BooleanField(required=False, allow_null=True)
    feed_url = serializers.CharField(required=True, allow_null=False, allow_blank=False)
    frequency = serializers.CharField(required=True, allow_null=False, allow_blank=False)


class SegmentOptsSerializer(serializers.Serializer):
    saved_segment_id = serializers.IntegerField(required=False, allow_null=False)
    match = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    conditions = serializers.ListField(required=False, allow_null=True, allow_empty=True)
    prebuilt_segment_id = serializers.CharField(required=False, allow_null=True, allow_blank=True)


class RecipientsSerializer(serializers.Serializer):
    segment_opts = SegmentOptsSerializer(many=True)
    list_id = serializers.CharField(required=True, allow_null=False, allow_blank=False)


class VariateSettingsSerializer(serializers.Serializer):
    wait_time = serializers.IntegerField(required=False, allow_null=True)
    test_size = serializers.ListField(required=False, allow_null=True, allow_empty=True)
    subject_lines = serializers.ListField(required=False, allow_null=True, allow_empty=True)
    send_times = serializers.ListField(required=False, allow_null=True, allow_empty=True)
    from_names = serializers.ListField(required=False, allow_null=True, allow_empty=True)
    reply_to_addresses = serializers.ListField(required=False, allow_null=True, allow_empty=True)
    winner_criteria = serializers.CharField(required=True, allow_null=False, allow_blank=False)


class SegmentSettingsSerializer(serializers.Serializer):
    subject_line = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    preview_text = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    title = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    from_name = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    reply_to = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    use_conversation = serializers.BooleanField(required=False, allow_null=True)
    to_name = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    folder_id = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    authenticate = serializers.BooleanField(required=False, allow_null=True)
    auto_footer = serializers.BooleanField(required=False, allow_null=True)
    inline_css = serializers.BooleanField(required=False, allow_null=True)
    auto_tweet = serializers.BooleanField(required=False, allow_null=True)
    auto_fb_post = serializers.ListField(required=False, allow_null=True, allow_empty=True)
    fb_comments = serializers.BooleanField(required=False, allow_null=True)
    template_id = serializers.IntegerField(required=False, allow_null=True)


class SegmentTrackingSerializer(serializers.Serializer):
    opens = serializers.BooleanField(required=False, allow_null=True)
    html_clicks = serializers.BooleanField(required=False, allow_null=True)
    text_clicks = serializers.BooleanField(required=False, allow_null=True)
    ecomm360 = serializers.BooleanField(required=False, allow_null=True)
    google_analytics = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    clicktale = serializers.CharField(required=False, allow_null=True, allow_blank=True)


class SocialCardSerializer(serializers.Serializer):
    image_url = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    description = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    title = serializers.CharField(required=False, allow_null=True, allow_blank=True)


class BatchDeliverySerializer(serializers.Serializer):
    batch_delay = serializers.IntegerField(required=True, allow_null=False)
    batch_count = serializers.IntegerField(required=True, allow_null=False)


class AddAudienceListSerializer(serializers.Serializer):
    name = serializers.CharField(required=True, allow_null=False, allow_blank=False)
    contact = ContactSerializer(many=True)
    permission_reminder = serializers.CharField(required=True, allow_null=False, allow_blank=False)
    campaign_defaults = CampaignDefaultSerializer(many=True)
    email_type_option = serializers.BooleanField(required=True, allow_null=False)
    use_archive_bar = serializers.BooleanField(required=False, allow_null=True)
    notify_on_subscribe = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    double_optin = serializers.BooleanField(required=False, allow_null=True)
    marketing_permissions = serializers.BooleanField(required=False, allow_null=True)


class BatchSerializer(serializers.Serializer):
    members = serializers.ListField(required=True, allow_null=False, allow_empty=False)


class AddMemberSerializer(serializers.Serializer):
    email_address = serializers.CharField(required=True, allow_null=False, allow_blank=False)
    status = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    email_type = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    merge_fields = serializers.JSONField(required=False)
    interests = serializers.JSONField(required=False)
    language = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    vip = serializers.BooleanField(required=False, allow_null=True)
    location = LocationSerializer(many=True)
    marketing_permissions = MarketingPermissionSerializer(many=True)
    ip_signup = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    timestamp_signup = serializers.DateTimeField(required=False, allow_null=True)
    ip_opt = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    timestamp_opt = serializers.DateTimeField(required=False, allow_null=True)
    tags = serializers.ListField(required=False, allow_null=True, allow_empty=True)


class AddTagSerializer(serializers.Serializer):
    tags = TagSerializer(many=True, required=True)
    is_syncing = serializers.BooleanField(required=True, allow_null=False)


class AddSegmentSerializer(serializers.Serializer):
    name = serializers.CharField(required=True, allow_null=False, allow_blank=False)
    static_segment = serializers.ListField(required=False, allow_null=True, allow_empty=True)
    options = SegmentOptionsSerializer(many=True)


class AddTemplateSerializer(serializers.Serializer):
    name = serializers.CharField(required=True, allow_null=False, allow_blank=False)
    html = serializers.CharField(required=True, allow_null=False, allow_blank=False)
    folder_id = serializers.CharField(required=False, allow_null=True, allow_blank=True)


class AddFolderSerializer(serializers.Serializer):
    name = serializers.CharField(required=True, allow_null=False, allow_blank=False)


class AddCampaignSerializer(serializers.Serializer):
    type = serializers.CharField(required=True, allow_null=False, allow_blank=False)
    rss_opts = RssOptsSerializer(many=True)
    recipients = RecipientsSerializer(many=True)
    variate_settings = VariateSettingsSerializer(many=True)
    settings = SegmentSettingsSerializer(many=True)
    tracking = SegmentTrackingSerializer(many=True)
    social_card = SocialCardSerializer(many=True)
    content_type = serializers.CharField(required=False, allow_null=True, allow_blank=True)


class UpdateCampaignSettingsSerializer(serializers.Serializer):
    recipients = RecipientsSerializer(many=True)
    settings = SegmentSettingsSerializer(many=True, required=True)
    rss_opts = RssOptsSerializer(many=True)
    variate_settings = VariateSettingsSerializer(many=True)
    tracking = SegmentTrackingSerializer(many=True)
    social_card = SocialCardSerializer(many=True)


class ScheduleCampaignSerializer(serializers.Serializer):
    schedule_time = serializers.DateTimeField(required=True, allow_null=False)
    batch_delivery = BatchDeliverySerializer(many=True)
    timewarp = serializers.BooleanField(required=False, allow_null=False)
