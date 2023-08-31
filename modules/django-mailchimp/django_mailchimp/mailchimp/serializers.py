from rest_framework import serializers


class ContactSerializer(serializers.Serializer):
    country = serializers.CharField(required=True, allow_null=False, allow_blank=False)
    state = serializers.CharField(required=True, allow_null=False, allow_blank=False)
    city = serializers.CharField(required=True, allow_null=False, allow_blank=False)
    zip = serializers.CharField(required=True, allow_null=False, allow_blank=False)
    address1 = serializers.CharField(required=True, allow_null=False, allow_blank=False)
    address2 = serializers.CharField(required=False, allow_null=False, allow_blank=True)
    company = serializers.CharField(required=True, allow_null=False, allow_blank=False)
    phone = serializers.CharField(required=True, allow_null=False, allow_blank=False)


class CampaignDefaultSerializer(serializers.Serializer):
    from_name = serializers.CharField(required=True, allow_null=False, allow_blank=False)
    from_email = serializers.EmailField(required=True, allow_null=False, allow_blank=False)
    subject = serializers.CharField(required=True, allow_null=False, allow_blank=False)
    language = serializers.CharField(required=True, allow_null=False, allow_blank=False)


class LocationSerializer(serializers.Serializer):
    latitude = serializers.IntegerField(required=False, allow_null=False)
    longitude = serializers.IntegerField(required=False, allow_null=False)


class TagSerializer(serializers.Serializer):
    name = serializers.CharField(required=True, allow_null=False, allow_blank=False)
    status = serializers.CharField(required=True, allow_null=False, allow_blank=False)


class MarketingPermissionSerializer(serializers.Serializer):
    marketing_permission_id = serializers.CharField(required=False, allow_null=False, allow_blank=True)
    enabled = serializers.BooleanField(required=False, allow_null=False)


class MemberSerializer(serializers.Serializer):
    email_address = serializers.EmailField(required=True, allow_null=False, allow_blank=False)
    status = serializers.CharField(required=False, allow_null=False, allow_blank=True)
    email_type = serializers.CharField(required=False, allow_null=False, allow_blank=True)
    merge_fields = serializers.JSONField(required=False)
    interests = serializers.JSONField(required=False)
    language = serializers.CharField(required=False, allow_null=False, allow_blank=True)
    vip = serializers.BooleanField(required=False, allow_null=False)
    location = LocationSerializer(many=False)
    ip_signup = serializers.CharField(required=False, allow_null=False, allow_blank=True)
    timestamp_signup = serializers.DateTimeField(required=False, allow_null=False)
    ip_opt = serializers.CharField(required=False, allow_null=False, allow_blank=True)
    timestamp_opt = serializers.DateTimeField(required=False, allow_null=False)


class SegmentOptionsSerializer(serializers.Serializer):
    match = serializers.CharField(required=False, allow_null=False, allow_blank=True)
    conditions = serializers.ListField(required=False, allow_null=False, allow_empty=True)


class DaySerializer(serializers.Serializer):
    sunday = serializers.BooleanField(required=False, allow_null=False)
    monday = serializers.BooleanField(required=False, allow_null=False)
    tuesday = serializers.BooleanField(required=False, allow_null=False)
    wednesday = serializers.BooleanField(required=False, allow_null=False)
    thursday = serializers.BooleanField(required=False, allow_null=False)
    friday = serializers.BooleanField(required=False, allow_null=False)
    saturday = serializers.BooleanField(required=False, allow_null=False)


class ScheduleSerializer(serializers.Serializer):
    hours = serializers.IntegerField(required=False, allow_null=False)
    daily_send = DaySerializer(many=False)
    weekly_send_day = serializers.CharField(required=False, allow_null=False, allow_blank=True)
    monthly_send_date = serializers.IntegerField(required=False, allow_null=False)


class RssOptsSerializer(serializers.Serializer):
    schedule = ScheduleSerializer(many=False)
    constrain_rss_img = serializers.BooleanField(required=False, allow_null=False)
    feed_url = serializers.CharField(required=True, allow_null=False, allow_blank=False)
    frequency = serializers.CharField(required=True, allow_null=False, allow_blank=False)


class SegmentOptsSerializer(serializers.Serializer):
    saved_segment_id = serializers.IntegerField(required=False, allow_null=False)
    match = serializers.CharField(required=False, allow_null=False, allow_blank=True)
    conditions = serializers.ListField(required=False, allow_null=False, allow_empty=True)
    prebuilt_segment_id = serializers.CharField(required=False, allow_null=False, allow_blank=True)


class RecipientsSerializer(serializers.Serializer):
    segment_opts = SegmentOptsSerializer(many=False)
    list_id = serializers.CharField(required=True, allow_null=False, allow_blank=False)


class VariateSettingsSerializer(serializers.Serializer):
    wait_time = serializers.IntegerField(required=False, allow_null=False)
    test_size = serializers.ListField(required=False, allow_null=False, allow_empty=True)
    subject_lines = serializers.ListField(required=False, allow_null=False, allow_empty=True)
    send_times = serializers.ListField(required=False, allow_null=False, allow_empty=True)
    from_names = serializers.ListField(required=False, allow_null=False, allow_empty=True)
    reply_to_addresses = serializers.ListField(required=False, allow_null=False, allow_empty=True)
    winner_criteria = serializers.CharField(required=True, allow_null=False, allow_blank=False)


class SegmentSettingsSerializer(serializers.Serializer):
    subject_line = serializers.CharField(required=False, allow_null=False, allow_blank=True)
    preview_text = serializers.CharField(required=False, allow_null=False, allow_blank=True)
    title = serializers.CharField(required=False, allow_null=False, allow_blank=True)
    from_name = serializers.CharField(required=False, allow_null=False, allow_blank=True)
    reply_to = serializers.CharField(required=False, allow_null=False, allow_blank=True)
    use_conversation = serializers.BooleanField(required=False, allow_null=False)
    to_name = serializers.CharField(required=False, allow_null=False, allow_blank=True)
    folder_id = serializers.CharField(required=False, allow_null=False, allow_blank=True)
    authenticate = serializers.BooleanField(required=False, allow_null=False)
    auto_footer = serializers.BooleanField(required=False, allow_null=False)
    inline_css = serializers.BooleanField(required=False, allow_null=False)
    auto_tweet = serializers.BooleanField(required=False, allow_null=False)
    auto_fb_post = serializers.ListField(required=False, allow_null=False, allow_empty=True)
    fb_comments = serializers.BooleanField(required=False, allow_null=False)
    template_id = serializers.IntegerField(required=False, allow_null=False)


class SegmentTrackingSerializer(serializers.Serializer):
    opens = serializers.BooleanField(required=False, allow_null=False)
    html_clicks = serializers.BooleanField(required=False, allow_null=False)
    text_clicks = serializers.BooleanField(required=False, allow_null=False)
    ecomm360 = serializers.BooleanField(required=False, allow_null=False)
    google_analytics = serializers.CharField(required=False, allow_null=False, allow_blank=True)
    clicktale = serializers.CharField(required=False, allow_null=False, allow_blank=True)


class SocialCardSerializer(serializers.Serializer):
    image_url = serializers.CharField(required=False, allow_null=False, allow_blank=True)
    description = serializers.CharField(required=False, allow_null=False, allow_blank=True)
    title = serializers.CharField(required=False, allow_null=False, allow_blank=True)


class BatchDeliverySerializer(serializers.Serializer):
    batch_delay = serializers.IntegerField(required=True, allow_null=False)
    batch_count = serializers.IntegerField(required=True, allow_null=False)


class AddAudienceListSerializer(serializers.Serializer):
    name = serializers.CharField(required=True, allow_null=False, allow_blank=False)
    contact = ContactSerializer(many=False)
    permission_reminder = serializers.CharField(required=True, allow_null=False, allow_blank=False)
    campaign_defaults = CampaignDefaultSerializer(many=False)
    email_type_option = serializers.BooleanField(required=True, allow_null=False)
    use_archive_bar = serializers.BooleanField(required=False, allow_null=False)
    notify_on_subscribe = serializers.CharField(required=False, allow_null=False, allow_blank=True)
    double_optin = serializers.BooleanField(required=False, allow_null=False)
    marketing_permissions = serializers.BooleanField(required=False, allow_null=False)


class BatchSerializer(serializers.Serializer):
    members = MemberSerializer(many=True, required=False)


class AddMemberSerializer(serializers.Serializer):
    email_address = serializers.EmailField(required=True, allow_null=False, allow_blank=False)
    status = serializers.CharField(required=False, allow_null=False, allow_blank=True)
    email_type = serializers.CharField(required=False, allow_null=False, allow_blank=True)
    merge_fields = serializers.JSONField(required=False)
    interests = serializers.JSONField(required=False)
    language = serializers.CharField(required=False, allow_null=False, allow_blank=True)
    vip = serializers.BooleanField(required=False, allow_null=False)
    location = LocationSerializer(many=False, required=False)
    marketing_permissions = MarketingPermissionSerializer(many=True, required=False)
    ip_signup = serializers.CharField(required=False, allow_null=False, allow_blank=True)
    timestamp_signup = serializers.DateTimeField(required=False, allow_null=False)
    ip_opt = serializers.CharField(required=False, allow_null=False, allow_blank=True)
    timestamp_opt = serializers.DateTimeField(required=False, allow_null=False)
    tags = serializers.ListField(required=False, allow_null=False, allow_empty=True)


class AddTagSerializer(serializers.Serializer):
    tags = TagSerializer(many=True, required=True)
    is_syncing = serializers.BooleanField(required=True, allow_null=False)


class AddSegmentSerializer(serializers.Serializer):
    name = serializers.CharField(required=True, allow_null=False, allow_blank=False)
    static_segment = serializers.ListField(required=False, allow_null=False, allow_empty=True)
    options = SegmentOptionsSerializer(many=False, required=False)


class AddTemplateSerializer(serializers.Serializer):
    name = serializers.CharField(required=True, allow_null=False, allow_blank=False)
    html = serializers.CharField(required=True, allow_null=False, allow_blank=False)
    folder_id = serializers.CharField(required=False, allow_null=False, allow_blank=True)


class AddFolderSerializer(serializers.Serializer):
    name = serializers.CharField(required=True, allow_null=False, allow_blank=False)


class AddCampaignSerializer(serializers.Serializer):
    type = serializers.CharField(required=True, allow_null=False, allow_blank=False)
    rss_opts = RssOptsSerializer(many=False, required=False)
    recipients = RecipientsSerializer(many=False, required=False)
    variate_settings = VariateSettingsSerializer(many=False, required=False)
    settings = SegmentSettingsSerializer(many=False, required=False)
    tracking = SegmentTrackingSerializer(many=False, required=False)
    social_card = SocialCardSerializer(many=False, required=False)
    content_type = serializers.CharField(required=False, allow_null=False, allow_blank=True)


class UpdateCampaignSettingsSerializer(serializers.Serializer):
    recipients = RecipientsSerializer(many=False, required=False)
    settings = SegmentSettingsSerializer(many=False, required=True)
    rss_opts = RssOptsSerializer(many=False, required=False)
    variate_settings = VariateSettingsSerializer(many=False, required=False)
    tracking = SegmentTrackingSerializer(many=False, required=False)
    social_card = SocialCardSerializer(many=False, required=False)


class ScheduleCampaignSerializer(serializers.Serializer):
    schedule_time = serializers.DateTimeField(required=True, allow_null=False)
    batch_delivery = BatchDeliverySerializer(many=False, required=False)
    timewarp = serializers.BooleanField(required=False, allow_null=False)
