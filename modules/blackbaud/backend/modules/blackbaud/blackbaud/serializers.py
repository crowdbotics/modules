from rest_framework import serializers


class EmailSerializer(serializers.Serializer):
    address = serializers.EmailField(required=True)
    type = serializers.CharField(required=True)


class PhoneSerializer(serializers.Serializer):
    number = serializers.CharField(required=True)
    type = serializers.CharField(required=True)


class CreateConstituentsSerializers(serializers.Serializer):
    type = serializers.CharField(required=True)
    email = EmailSerializer(required=True, many=False)
    phone = PhoneSerializer(required=True, many=False)
    first = serializers.CharField(required=True)
    last = serializers.CharField(required=True)
    city = serializers.CharField(required=False, max_length=50)
    gender = serializers.CharField(required=False)


class CreateConstituentsAttachmentsSerializers(serializers.Serializer):
    type = serializers.CharField(required=True)
    parent_id = serializers.CharField(required=True)


class CreateConstituentsCodeSerializers(serializers.Serializer):
    constituent_id = serializers.CharField(required=True)
    description = serializers.CharField(required=True)


class CreateConstituentsCustomFieldsSerializers(serializers.Serializer):
    category = serializers.CharField(required=True)
    comment = serializers.CharField(required=False)
    parent_id = serializers.CharField(required=True)


class CreateConstituentsCustomFieldsCollectionSerializers(serializers.Serializer):
    category = serializers.CharField(required=True)


class CreateConstituentDocumentSerializers(serializers.Serializer):
    file_name = serializers.CharField(required=True)
    upload_thumbnail = serializers.BooleanField(required=True)


class CreateConstituentEducationSerializers(serializers.Serializer):
    constituent_id = serializers.CharField(required=True)
    school = serializers.CharField(required=True)
    department = serializers.CharField(required=False)
    degree = serializers.CharField(required=False)
    status = serializers.CharField(required=False)
    type = serializers.CharField(required=False)


class CreateConstituentEducationCustomFieldSerializers(serializers.Serializer):
    category = serializers.CharField(required=True)
    parent_id = serializers.CharField(required=True)
    comment = serializers.CharField(required=False)


class CreateConstituentAddressSerializers(serializers.Serializer):
    constituent_id = serializers.CharField(required=True)
    type = serializers.CharField(required=True)
    city = serializers.CharField(required=False)
    country = serializers.CharField(required=False)
    postal_code = serializers.CharField(required=False)
    region = serializers.CharField(required=False)


class CreateConstituentAliasesSerializers(serializers.Serializer):
    constituent_id = serializers.CharField(required=True)
    name = serializers.CharField(required=True)
    type = serializers.CharField(required=False)


class CreateConstituentAliasCollectionSerializers(serializers.Serializer):
    name = serializers.CharField(required=True)
    type = serializers.CharField(required=False)


class CreateConstituentAliasesCollectionSerializers(serializers.Serializer):
    aliases = CreateConstituentAliasCollectionSerializers(required=True, many=True)


class CreateParticipantInvitationDateSerializer(serializers.Serializer):
    d = serializers.CharField(required=False)
    m = serializers.CharField(required=False)
    y = serializers.CharField(required=False)


class CreateParticipantsSerializer(serializers.Serializer):
    RSVP_STATUS_CHOICES = (
        ('attending', 'Attending'),
        ('canceled', 'Canceled'),
        ('declined', 'Declined'),
        ('interested', 'Interested'),
        ('noResponse', 'NoResponse'),
        ('notApplicable', 'NotApplicable'),
        ('waitlisted', 'Waitlisted'),
    )
    constituent_id = serializers.CharField(required=False)
    rsvp_status = serializers.ChoiceField(required=False, choices=RSVP_STATUS_CHOICES)
    summary_note = serializers.CharField(required=False)
    invitation_date = CreateParticipantInvitationDateSerializer(required=False, many=False)


class EventCategorySerializer(serializers.Serializer):
    id = serializers.CharField(required=False)
    name = serializers.CharField(required=False)


class CreateEventSerializer(serializers.Serializer):
    name = serializers.CharField(required=True)
    start_date = serializers.DateField(required=True)
    start_time = serializers.CharField(required=False)
    end_time = serializers.CharField(required=False)
    category = EventCategorySerializer(required=False)
    description = serializers.CharField(required=False)


class CreateEventCategorySerializer(serializers.Serializer):
    name = serializers.CharField(required=True)


class CreateEventFeeSerializer(serializers.Serializer):
    name = serializers.CharField(required=True)
    cost = serializers.DecimalField(required=True, max_digits=5, decimal_places=2)
    contribution_amount = serializers.DecimalField(required=True, max_digits=5, decimal_places=2)


class GiftCurrencySerializer(serializers.Serializer):
    value = serializers.IntegerField(required=True)


class GiftSplitSerializer(serializers.Serializer):
    amount = GiftCurrencySerializer(required=True)
    fund_id = serializers.CharField(required=True)


class GiftPaymentSplitSerializer(serializers.Serializer):
    payment_method = serializers.CharField(required=True)


class CreateGiftSerializer(serializers.Serializer):
    amount = GiftCurrencySerializer(required=True)
    constituent_id = serializers.CharField(required=True)
    type = serializers.CharField(required=True)
    gift_splits = GiftSplitSerializer(required=True, many=True)
    payments = GiftPaymentSplitSerializer(required=True, many=True)


class CreateParticipantDonationSerializer(serializers.Serializer):
    gift_id = serializers.CharField(required=True)


class CreateParticipantFeeSerializer(serializers.Serializer):
    quantity = serializers.IntegerField()
    fee_amount = serializers.DecimalField(max_digits=5, decimal_places=2)
    contribution_amount = serializers.DecimalField(max_digits=5, decimal_places=2)
    event_fee_id = serializers.IntegerField()


class CreateParticipantFeePaymentSerializer(serializers.Serializer):
    gift_id = serializers.CharField(required=True)
    applied_amount = serializers.DecimalField(max_digits=5, decimal_places=2)


class ListOptionSerializer(serializers.Serializer):
    name = serializers.CharField(required=False)
    sequence = serializers.IntegerField


class CreateEventParticipantOptionSerializer(serializers.Serializer):
    InputTypeChoices = (
        ('boolean', 'Boolean'),
        ('list', 'List'),
        ('string', 'String')
    )
    name = serializers.CharField(required=True)
    input_type = serializers.ChoiceField(required=True, choices=InputTypeChoices)
    list_options = ListOptionSerializer(required=False, many=True)


class CreateParticipantOptionSerializer(serializers.Serializer):
    event_participant_option_id = serializers.CharField(required=True)
    option_value = serializers.CharField(required=True)


class CreateParticipantLevelSerializer(serializers.Serializer):
    name = serializers.CharField(required=True)


class CreateEventAttachmentUploadSerializer(serializers.Serializer):
    file_name = serializers.CharField(required=True)
    upload_thumbnail = serializers.BooleanField(default=True, required=False)


class CreateEventAttachmentSerializer(serializers.Serializer):
    file_id = serializers.CharField(required=True)
    file_name = serializers.CharField(required=False)
    type = serializers.CharField(required=True)
    url = serializers.CharField(required=False)
    thumbnail_id = serializers.CharField(required=False)


class EditParticipantsSerializer(serializers.Serializer):
    RSVP_STATUS_CHOICES = (
        ('attending', 'Attending'),
        ('canceled', 'Canceled'),
        ('declined', 'Declined'),
        ('interested', 'Interested'),
        ('noResponse', 'NoResponse'),
        ('notApplicable', 'NotApplicable'),
        ('waitlisted', 'Waitlisted'),
    )
    rsvp_status = serializers.ChoiceField(required=False, choices=RSVP_STATUS_CHOICES)
    summary_note = serializers.CharField(required=False)
    invitation_date = CreateParticipantInvitationDateSerializer(required=False, many=False)


class EditParticipantOptionSerializer(serializers.Serializer):
    option_value = serializers.CharField(required=True)


class EditParticipantLevelSerializer(serializers.Serializer):
    name = serializers.CharField(required=True)


class EditEventSerializer(serializers.Serializer):
    name = serializers.CharField(required=False)
    category = EventCategorySerializer(required=False)
    description = serializers.CharField(required=False)


class EventEventCategorySerializer(serializers.Serializer):
    name = serializers.CharField(required=True)
    inactive = serializers.BooleanField(default=True)


class EditEventFeeSerializer(serializers.Serializer):
    name = serializers.CharField(required=False)
    cost = serializers.DecimalField(required=False, max_digits=5, decimal_places=2)
    contribution_amount = serializers.DecimalField(required=False, max_digits=5, decimal_places=2)


class EditEventParticipantOptionSerializer(serializers.Serializer):
    InputTypeChoices = (
        ('boolean', 'Boolean'),
        ('list', 'List'),
        ('string', 'String')
    )
    input_type = serializers.ChoiceField(required=True, choices=InputTypeChoices)
    name = serializers.CharField(required=False)
    list_options = ListOptionSerializer(required=False, many=True)


class CreateConstituentRelationshipSerializers(serializers.Serializer):
    constituent_id = serializers.CharField(required=True)
    comment = serializers.CharField(required=True)
    type = serializers.CharField(required=True)
    relation_id = serializers.CharField(required=True)


class EditConstituentRelationshipSerializers(serializers.Serializer):
    constituent_id = serializers.CharField(required=False)
    comment = serializers.CharField(required=False)
    type = serializers.CharField(required=False)


class CreateConstituentRatingSerializers(serializers.Serializer):
    constituent_id = serializers.CharField(required=True)
    category = serializers.CharField(required=True)
    date = serializers.DateTimeField(required=True)
    comment = serializers.CharField(required=False)


class EditConstituentRatingSerializers(serializers.Serializer):
    comment = serializers.CharField(required=False)
    date = serializers.DateTimeField(required=False)


class UpdateConstituentActionSerializer(serializers.Serializer):
    DIRECTION_CHOICES = (
        ('Inbound', 'Inbound'),
        ('Outbound', 'Outbound'),
    )
    category = serializers.CharField(required=False)
    date = serializers.DateTimeField(required=False)
    type = serializers.CharField(required=False)
    status = serializers.CharField(required=False)
    direction = serializers.ChoiceField(required=False, choices=DIRECTION_CHOICES)


class CreateActionAttachmentSerializer(serializers.Serializer):
    TYPE_CHOICES = (
        ('link', 'Link'),
        ('physical', 'Physical'),
    )
    name = serializers.CharField(required=False)
    parent_id = serializers.CharField(required=True)
    type = serializers.CharField(required=True)
    url = serializers.CharField(required=False)
    file_name = serializers.CharField(required=False)
    file_id = serializers.CharField(required=False)


class UpdateActionAttachmentSerializer(serializers.Serializer):
    name = serializers.CharField(required=False)
    parent_id = serializers.CharField(required=False)
    type = serializers.CharField(required=False)
    url = serializers.CharField(required=False)


class CreateConstituentsActionCustomFieldsSerializers(serializers.Serializer):
    category = serializers.CharField(required=True)
    comment = serializers.CharField(required=False)
    parent_id = serializers.CharField(required=True)


class CreateConstituentActionSerializer(serializers.Serializer):
    DIRECTION_CHOICES = (
        ('Inbound', 'Inbound'),
        ('Outbound', 'Outbound'),
    )
    category = serializers.CharField(required=True)
    constituent_id = serializers.CharField(required=True)
    date = serializers.DateTimeField(required=True)
    type = serializers.CharField(required=False)
    status = serializers.CharField(required=False)
    direction = serializers.ChoiceField(required=False, choices=DIRECTION_CHOICES)


class EditConstituentAddressSerializer(serializers.Serializer):
    country = serializers.CharField(required=False)
    postal_code = serializers.CharField(required=False, max_length=12)
    city = serializers.CharField(required=False)
    type = serializers.CharField(required=False)


class EditConstituentAliasesSerializer(serializers.Serializer):
    name = serializers.CharField(required=False)
    type = serializers.CharField(required=False)
    

class UpdateConstituentsActionCustomFieldsSerializers(serializers.Serializer):
    category = serializers.CharField(required=False)
    comment = serializers.CharField(required=False)
    parent_id = serializers.CharField(required=False)