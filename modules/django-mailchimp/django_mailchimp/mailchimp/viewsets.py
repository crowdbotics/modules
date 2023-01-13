import os
from rest_framework.decorators import action
from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response

from .services.MailchimpService import MailchimpService
from .serializers import AddAudienceListSerializer, BatchSerializer, AddMemberSerializer, AddTagSerializer, \
    AddSegmentSerializer, AddTemplateSerializer, AddFolderSerializer, AddCampaignSerializer, \
    ScheduleCampaignSerializer, UpdateCampaignSettingsSerializer

mailchimp_service = MailchimpService(config={
    "api_key": os.getenv("MAILCHIMP_API_KEY", ""),
    "server": os.getenv("MAILCHIMP_SERVER_REGION", "")
})


class MailchimpAudienceViewSet(GenericViewSet):
    """
    MailchimpAudience ViewSet provides the following functionality:

    - get_audience_lists : Provide information about all lists in the account.
    - add_audience_list : Create a new list in Mailchimp account.
    - get_audience_list : Provide information about a specific list in Mailchimp account.
    - update_audience_list : Update the settings for a specific list.
    - delete_audience_lists : Delete a list from Mailchimp account.
    - batch_subscribe_or_unsubscribe_audience : Batch subscribe or unsubscribe list members.
    - list_member_info : Get information about members in a specific Mailchimp list.
    - add_list_member: Add a new member to the list.
    - get_member_info : Get information about a specific list member, including a currently subscribed, unsubscribed, or bounced member.
    - update_list_member : Update information for a specific list member.
    - delete_list_member : Delete all personally identifiable information related to a list member, and remove them from a list. This will make it impossible to re-import the list member.
    - get_list_member_tags : Provide the tags on a list member.
    - add_or_remove_member_tag : Add or remove tags from a list member.
    - list_segment : Get information about all available segments for a specific list.
    - add_segment : Create a new segment in a specific list.
    - get_segment_info : Get information about a specific segment.
    - delete_segment : Delete a specific segment in a list.
    - update_segment: Update a specific segment in a list.

    """
    allowed_serializers = {
        "add_audience_list": AddAudienceListSerializer,
        "update_audience_list": AddAudienceListSerializer,
        "batch_subscribe_or_unsubscribe_audience": BatchSerializer,
        "add_list_member": AddMemberSerializer,
        "update_list_member": AddMemberSerializer,
        "add_or_remove_member_tag": AddTagSerializer,
        "add_segment": AddSegmentSerializer,
        "update_segment": AddSegmentSerializer,


    }

    def get_serializer_class(self):
        return self.allowed_serializers.get(self.action)

    @action(detail=False, methods=['get'], url_path='get-audience-lists')
    def get_audience_lists(self, request):
        """
        Provide information about all lists in the account.
        """

        response = mailchimp_service.get_audience_lists()
        return Response(response.get('text'), status=response.get('status_code'))

    @action(detail=False, methods=['post'], url_path='add-audience-list')
    def add_audience_list(self, request):
        """
        Create a new list in Mailchimp account.
        Required the request body. For details about request body visit the given link below
        https://mailchimp.com/developer/marketing/api/lists/add-list/
        """

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = mailchimp_service.add_audience_list(body=serializer.data)
        return Response(response.get('text'), status=response.get('status_code'))

    @action(detail=True, methods=['get'], url_path='get-audience-list')
    def get_audience_list(self, request, pk):
        """
        Provide information about a specific list in Mailchimp account.
        :param str pk: List ID (required)
        """

        response = mailchimp_service.get_audience_list(list_id=pk)
        return Response(response.get('text'), status=response.get('status_code'))

    @action(detail=True, methods=['post'], url_path='update-audience-list')
    def update_audience_list(self, request, pk):
        """
        Update the settings for a specific list.
        :param str pk: List ID (required)
        Required the request body. For details about request body visit the given link below
        https://mailchimp.com/developer/marketing/api/lists/update-lists/
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = mailchimp_service.update_audience_list(body=serializer.data, list_id=pk)
        return Response(response.get('text'), status=response.get('status_code'))

    @action(detail=True, methods=['post'], url_path='delete-audience-list')
    def delete_audience_list(self, request, pk):
        """
        Delete a list from Mailchimp account.
        :param str pk: List ID (required)
        """

        response = mailchimp_service.delete_audience_list(list_id=pk)
        return Response(response.get('text'), status=response.get('status_code'))

    @action(detail=True, methods=['post'], url_path='batch-subscribe-unsubscribe-audience')
    def batch_subscribe_or_unsubscribe_audience(self, request, pk):
        """
        Batch subscribe or unsubscribe list members.
        :param str pk: List ID (required)
        Required the request body. For details about request body visit the given link below
        https://mailchimp.com/developer/marketing/api/lists/batch-subscribe-or-unsubscribe/
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = mailchimp_service.batch_subscribe_or_unsubscribe_audience(list_id=pk, body=serializer.data)
        return Response(response.get('text'), status=response.get('status_code'))

    @action(detail=True, methods=['get'], url_path='list-member-info')
    def list_member_info(self, request, pk):
        """
        Get information about members in a specific Mailchimp list.
        :param str pk: List ID (required)
        """

        params = request.query_params.dict()
        response = mailchimp_service.list_member_info(list_id=pk, **params)
        return Response(response.get('text'), status=response.get('status_code'))

    @action(detail=True, methods=['post'], url_path='add-list-member')
    def add_list_member(self, request, pk):
        """
        Add a new member to the list.
        Required the request body. For details about request body visit the given link below
        https://mailchimp.com/developer/marketing/api/lists/add-list/
        :param str pk: List ID (required)
        """

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = mailchimp_service.add_list_member(list_id=pk, body=serializer.data)
        return Response(response.get('text'), status=response.get('status_code'))

    @action(detail=True, methods=['get'], url_path='get-member-info/(?P<subscriber_hash>[A-Za-z0-9]*)')
    def get_member_info(self, request, pk, subscriber_hash):
        """
        Get information about a specific list member, including a currently subscribed, unsubscribed, or bounced member.
        :param str pk: List ID (required)
        :param str subscriber_hash: Subscriber Hash (required)
        """

        response = mailchimp_service.get_member_info(list_id=pk, subscriber_hash=subscriber_hash)
        return Response(response.get('text'), status=response.get('status_code'))

    @action(detail=True, methods=['post'], url_path='update-list-member/(?P<subscriber_hash>[A-Za-z0-9]*)')
    def update_list_member(self, request, pk, subscriber_hash):
        """
        Update information for a specific list member.
        https://mailchimp.com/developer/marketing/api/list-members/update-list-member/
        :param str pk: List ID (required)
        :param str subscriber_hash: Subscriber Hash (required)
        """

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = mailchimp_service.update_list_member(list_id=pk, subscriber_hash=subscriber_hash,
                                                        body=serializer.data)
        return Response(response.get('text'), status=response.get('status_code'))

    @action(detail=True, methods=['post'], url_path='delete-list-member/(?P<subscriber_hash>[A-Za-z0-9]*)')
    def delete_list_member(self, request, pk, subscriber_hash):
        """
        Delete all personally identifiable information related to a list member, and remove them from a list.
        This will make it impossible to re-import the list member.
        :param str pk: List ID (required)
        :param str subscriber_hash: Subscriber Hash (required)
        """

        response = mailchimp_service.delete_list_member(list_id=pk, subscriber_hash=subscriber_hash)
        return Response(response.get('text'), status=response.get('status_code'))

    @action(detail=True, methods=['get'], url_path='list-member-tags/(?P<subscriber_hash>[A-Za-z0-9]*)')
    def get_list_member_tags(self, request, pk, subscriber_hash):
        """
        Provide the tags on a list member.
        :param str pk: List ID (required)
        :param str subscriber_hash: Subscriber Hash (required)
        """

        response = mailchimp_service.get_list_member_tags(list_id=pk, subscriber_hash=subscriber_hash)
        return Response(response.get('text'), status=response.get('status_code'))

    @action(detail=True, methods=['post'], url_path='add-or-remove-member-tag/(?P<subscriber_hash>[A-Za-z0-9]*)')
    def add_or_remove_member_tag(self, request, pk, subscriber_hash):
        """
        Add or remove tags from a list member.
        :param str pk: List ID (required)
        :param str subscriber_hash: Subscriber Hash (required)
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = mailchimp_service.add_or_remove_member_tag(list_id=pk, subscriber_hash=subscriber_hash,
                                                              body=serializer.data)
        return Response(response.get('text'), status=response.get('status_code'))

    @action(detail=True, methods=['post'], url_path='list-segment')
    def list_segment(self, request, pk):
        """
        Provide information about all available segments for a specific list.
        :param str pk: List ID (required)
        """

        response = mailchimp_service.list_segments(list_id=pk)
        return Response(response.get('text'), status=response.get('status_code'))

    @action(detail=True, methods=['post'], url_path='add-segment')
    def add_segment(self, request, pk):
        """
        Create a new segment in a specific list.
        :param str pk: List ID (required)
        Required the request body. For details about request body visit the given link below
        https://mailchimp.com/developer/marketing/api/list-segments/add-segment/
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = mailchimp_service.add_segment(list_id=pk, body=serializer.data)
        return Response(response.get('text'), status=response.get('status_code'))

    @action(detail=True, methods=['get'], url_path='get-segment-info/(?P<segment_id>[A-Za-z0-9]*)')
    def get_segment_info(self, request, pk, segment_id):
        """
        Get information about a specific segment.
        :param str pk: List ID (required)
        :param str segment_id: Segment ID (required)
        """
        response = mailchimp_service.get_segment_info(list_id=pk, segment_id=segment_id)
        return Response(response.get('text'), status=response.get('status_code'))

    @action(detail=True, methods=['post'], url_path='delete-segment/(?P<segment_id>[A-Za-z0-9]*)')
    def delete_segment(self, request, pk, segment_id):
        """
        Delete a specific segment in a list.
        :param str pk: List ID (required)
        :param str segment_id: Segment ID (required)
        """

        response = mailchimp_service.delete_segment(list_id=pk, segment_id=segment_id)
        return Response(response.get('text'), status=response.get('status_code'))

    @action(detail=True, methods=['post'], url_path='update-segment/(?P<segment_id>[A-Za-z0-9]*)')
    def update_segment(self, request, pk, segment_id):
        """
        Update a specific segment in a list.
        :param str pk: List ID (required)
        :param str segment_id: Segment ID (required)
        Required the request body. For details about request body visit the given link below
        https://mailchimp.com/developer/marketing/api/list-segments/update-segment/
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = mailchimp_service.update_segment(list_id=pk, segment_id=segment_id, body=serializer.data)
        return Response(response.get('text'), status=response.get('status_code'))


class MailchimpTemplatesViewSet(GenericViewSet):
    """
       Your Mailchimp list, also known as your audience, is where you store and manage all of your contacts.

       MailchimpAudience ViewSet provides the following functionality:

       - list_template : Get a list of an account's available templates.
       - add_template : Create a new template for the account. Only Classic templates are supported.
       - get_template_info : Get information about a specific template.
       - delete_template : Delete a specific template.
       - update_template : Update the name, HTML, or folder_id of an existing template.
       - list_template_folder : Get all folders used to organize templates.
       - add_template_folder : Create a new template folder.
       - get_template_folder : Get information about a specific folder used to organize templates.
       - delete_template_folder : Delete a specific template folder, and mark all the templates in the folder as 'unfilled'.
       - update_template_folder : Update a specific folder used to organize templates.
    """
    allowed_serializers = {
        "add_template": AddTemplateSerializer,
        "update_template": AddTemplateSerializer,
        "add_template_folder": AddFolderSerializer,
        "update_template_folder": AddFolderSerializer
    }

    def get_serializer_class(self):
        return self.allowed_serializers.get(self.action)

    @action(detail=False, methods=['get'], url_path='list-template')
    def list_template(self, request):
        """
        Get a list of an account's available templates.
        """
        response = mailchimp_service.list_template()
        return Response(response.get('text'), status=response.get('status_code'))

    @action(detail=False, methods=['post'], url_path='add-template')
    def add_template(self, request):
        """
        Create a new template for the account. Only Classic templates are supported.
        Required the request body. For details about request body visit the given link below
        https://mailchimp.com/developer/marketing/api/templates/add-template/
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = mailchimp_service.add_template(body=serializer.data)
        return Response(response.get('text'), status=response.get('status_code'))

    @action(detail=True, methods=['get'], url_path='get_template_info')
    def get_template_info(self, request, pk):
        """
        Get information about a specific template.
        :param str pk: Template ID (required)
        """

        response = mailchimp_service.get_template_info(template_id=pk)
        return Response(response.get('text'), status=response.get('status_code'))

    @action(detail=True, methods=['post'], url_path='delete-template')
    def delete_template(self, request, pk):
        """
        Delete a specific template.
        :param str pk: Template ID (required)
        """

        response = mailchimp_service.delete_template(template_id=pk)
        return Response(response.get('text'), status=response.get('status_code'))

    @action(detail=True, methods=['post'], url_path='update-template')
    def update_template(self, request, pk):
        """
         Update the name, HTML, or folder_id of an existing template.
         :param str pk: Template ID (required)
         Required the request body. For details about request body visit the given link below
         https://mailchimp.com/developer/marketing/api/templates/update-template/
         """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = mailchimp_service.update_template(template_id=pk, body=serializer.data)
        return Response(response.get('text'), status=response.get('status_code'))

    @action(detail=False, methods=['get'], url_path='list-template-folder')
    def list_template_folder(self, request):
        """
        Get all folders used to organize templates.
        """

        response = mailchimp_service.list_template_folder()
        return Response(response.get('text'), status=response.get('status_code'))

    @action(detail=False, methods=['post'], url_path='add-template-folder')
    def add_template_folder(self, request):
        """
        Create a new template folder.
        Required the request body. For details about request body visit the given link below
        https://mailchimp.com/developer/marketing/api/template-folders/add-template-folder/
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = mailchimp_service.add_template_folder(body=serializer.data)
        return Response(response.get('text'), status=response.get('status_code'))

    @action(detail=False, methods=['get'], url_path='get-template-folder')
    def get_template_folder(self, request, pk):
        """
        Get information about a specific template.
        :param str pk: Folder ID (required)
        """

        response = mailchimp_service.get_template_folder(folder_id=pk)
        return Response(response.get('text'), status=response.get('status_code'))

    @action(detail=True, methods=['post'], url_path='delete-template-folder')
    def delete_template_folder(self, request, pk):
        """
        Delete a specific template folder, and mark all the templates in the folder as 'unfilled'.
        :param str pk: Folder ID (required)
        """

        response = mailchimp_service.delete_template_folder(folder_id=pk)
        return Response(response.get('text'), status=response.get('status_code'))

    @action(detail=True, methods=['post'], url_path='update-template-folder')
    def update_template_folder(self, request, pk):
        """
        Update a specific folder used to organize templates.
        :param str pk: Folder ID (required)
        Required the request body. For details about request body visit the given link below
        https://mailchimp.com/developer/marketing/api/template-folders/update-template-folder/
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = mailchimp_service.update_template_folder(folder_id=pk, body=serializer.data)
        return Response(response.get('text'), status=response.get('status_code'))


class MailchimpCampaignViewSet(GenericViewSet):
    """
        MailchimpCampaign ViewSet provides the following functionality:

       - list_campaigns : Get all campaigns in an account.
       - add_campaigns : Create a new Mailchimp campaign.
       - get_campaign_info : Get information about a specific campaign.
       - delete_campaign : Remove a campaign from your Mailchimp account.
       - update_campaign_settings : Update some or all of the settings for a specific campaign.
       - cancel_campaign : Cancel a Regular or Plain-Text Campaign after you send, before all of your recipients receive it.
       - send_campaign : Send a Mailchimp campaign.
       - schedule_campaign : Schedule a campaign for delivery.
       - unschedule_campaign : Unschedule a scheduled campaign that hasn't started sending.
       - list_campaign_folder : Get all folders used to organize campaigns.
       - add_campaign_folder : Create a new campaign folder.
       - get_campaign_folder : Get information about a specific folder used to organize campaigns.
       - delete_campaign_folder : Delete a specific campaign folder, and mark all the campaigns in the folder as 'unfilled'.
       - update_campaign_folder : Update a specific folder used to organize campaigns.
    """
    allowed_serializers = {
        "add_campaigns": AddCampaignSerializer,
        "update_campaign_settings": UpdateCampaignSettingsSerializer,
        "schedule_campaign": ScheduleCampaignSerializer,
        "add_campaign_folder": AddFolderSerializer,
        "update_campaign_folder": AddFolderSerializer
    }

    def get_serializer_class(self):
        return self.allowed_serializers.get(self.action)

    @action(detail=False, methods=['get'], url_path='list-campaigns')
    def list_campaigns(self, request):
        """
        Get all campaigns in an account.
        """

        response = mailchimp_service.list_campaigns()
        return Response(response.get('text'), status=response.get('status_code'))

    @action(detail=False, methods=['post'], url_path='add-campaigns')
    def add_campaigns(self, request):
        """
        Create a new Mailchimp campaign.
        Required the request body. For details about request body visit the given link below
        https://mailchimp.com/developer/marketing/api/campaigns/add-campaign/
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = mailchimp_service.add_template(body=serializer.data)
        return Response(response.get('text'), status=response.get('status_code'))

    @action(detail=True, methods=['get'], url_path='get-campaign-info')
    def get_campaign_info(self, request, pk):
        """
        Get information about a specific campaign.
        :param str pk: Campaign ID (required)
        """

        response = mailchimp_service.get_campaign_info(campaign_id=pk)
        return Response(response.get('text'), status=response.get('status_code'))

    @action(detail=True, methods=['post'], url_path='delete-campaign')
    def delete_campaign(self, request, pk):
        """
        Remove a campaign from your Mailchimp account.
        :param str pk: Campaign ID (required)
        """

        response = mailchimp_service.delete_campaign(campaign_id=pk)
        return Response(response.get('text'), status=response.get('status_code'))

    @action(detail=True, methods=['post'], url_path='update-campaign-settings')
    def update_campaign_settings(self, request, pk):
        """
        Update some or all of the settings for a specific campaign.
        :param str pk: Campaign ID (required)
        Required the request body. For details about request body visit the given link below
        https://mailchimp.com/developer/marketing/api/campaigns/update-campaign-settings/
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = mailchimp_service.update_campaign_settings(campaign_id=pk, body=serializer.data)
        return Response(response.get('text'), status=response.get('status_code'))

    @action(detail=True, methods=['post'], url_path='cancel-campaign')
    def cancel_campaign(self, request, pk):
        """
        Cancel a Regular or Plain-Text Campaign after you send, before all of your recipients receive it. This feature is included with Mailchimp Pro.
        :param str pk: Campaign ID (required)
        """

        response = mailchimp_service.cancel_campaign(campaign_id=pk)
        return Response(response.get('text'), status=response.get('status_code'))

    @action(detail=True, methods=['post'], url_path='send-campaign')
    def send_campaign(self, request, pk):
        """
        Send a Mailchimp campaign. For RSS Campaigns, the campaign will send according to its schedule. All other campaigns will send immediately.
        :param str pk: Campaign ID (required)
        """

        response = mailchimp_service.send_campaign(campaign_id=pk)
        return Response(response.get('text'), status=response.get('status_code'))

    @action(detail=True, methods=['post'], url_path='send-campaign')
    def schedule_campaign(self, request, pk):
        """
        Schedule a campaign for delivery. If you're using Multivariate Campaigns to test send times or sending RSS Campaigns, use the send action instead.
        :param str pk: Campaign ID (required)
        Required the request body. For details about request body visit the given link below
        https://mailchimp.com/developer/marketing/api/campaigns/schedule-campaign/
        """

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = mailchimp_service.schedule_campaign(campaign_id=pk, body=serializer.data)
        return Response(response.get('text'), status=response.get('status_code'))

    @action(detail=True, methods=['post'], url_path='unschedule-campaign')
    def unschedule_campaign(self, request, pk):
        """
        Unschedule a scheduled campaign that hasn't started sending.
        :param str pk: Campaign ID (required)
        Required the request body. For details about request body visit the given link below
        https://mailchimp.com/developer/marketing/api/campaigns/unschedule-campaign/
        """

        response = mailchimp_service.unschedule_campaign(campaign_id=pk)
        return Response(response.get('text'), status=response.get('status_code'))

    @action(detail=False, methods=['get'], url_path='list-campaign-folder')
    def list_campaign_folder(self, request):
        """
        Get all folders used to organize campaigns.
        """

        response = mailchimp_service.list_template_folder()
        return Response(response.get('text'), status=response.get('status_code'))

    @action(detail=False, methods=['post'], url_path='add-campaign-folder')
    def add_campaign_folder(self, request):
        """
        Create a new campaign folder.
        Required the request body. For details about request body visit the given link below
        https://mailchimp.com/developer/marketing/api/campaign-folders/add-campaign-folder/
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = mailchimp_service.add_campaign_folder(body=serializer.data)
        return Response(response.get('text'), status=response.get('status_code'))

    @action(detail=True, methods=['get'], url_path='get-campaign-folder')
    def get_campaign_folder(self, request, pk):
        """
        Get information about a specific folder used to organize campaigns.
        :param str pk: Folder ID (required)
        Required the request body. For details about request body visit the given link below
        https://mailchimp.com/developer/marketing/api/campaign-folders/get-campaign-folder/
        """

        response = mailchimp_service.get_campaign_folder(folder_id=pk)
        return Response(response.get('text'), status=response.get('status_code'))

    @action(detail=True, methods=['post'], url_path='delete_campaign_folder')
    def delete_campaign_folder(self, request, pk):
        """
        Delete a specific campaign folder, and mark all the campaigns in the folder as 'unfiled'.
        :param str pk: Folder ID (required)
        Required the request body. For details about request body visit the given link below
        https://mailchimp.com/developer/marketing/api/campaign-folders/delete-campaign-folder/
        """

        response = mailchimp_service.delete_campaign_folder(folder_id=pk)
        return Response(response.get('text'), status=response.get('status_code'))

    @action(detail=True, methods=['post'], url_path='update-campaign-folder')
    def update_campaign_folder(self, request, pk):
        """
        Update a specific folder used to organize campaigns.
        :param str pk: Folder ID (required)
        Required the request body. For details about request body visit the given link below
        https://mailchimp.com/developer/marketing/api/campaign-folders/update-campaign-folder/
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = mailchimp_service.update_campaign_folder(folder_id=pk, body=serializer.data)
        return Response(response.get('text'), status=response.get('status_code'))


class MailchimpReportsViewSet(GenericViewSet):
    """
        MailchimpReports ViewSet provides the following functionality:

        - list_campaign_report : Get campaign reports.
        - get_campaign_report : Get report details for a specific sent campaign.
        - get_campaign_abuse_reports : Get a list of abuse complaints for a specific campaign.
        - get_campaign_abuse_report : Get information about a specific abuse report for a campaign.
        - get_campaign_open_details : Get detailed information about any campaign emails that were opened by a list member.
        - get_campaign_click_details : Get information about clicks on specific links in your Mailchimp campaigns.
    """

    @action(detail=False, methods=['get'], url_path='list-campaign-report')
    def list_campaign_report(self, request):
        """
        Get campaign reports.
        """

        response = mailchimp_service.list_campaign_reports()
        return Response(response.get('text'), status=response.get('status_code'))

    @action(detail=True, methods=['get'], url_path='get-campaign-report')
    def get_campaign_report(self, request, pk):
        """
        Get report details for a specific sent campaign.
        :param str pk: Campaign ID (required)
        """

        response = mailchimp_service.get_campaign_report(campaign_id=pk)
        return Response(response.get('text'), status=response.get('status_code'))

    @action(detail=True, methods=['get'], url_path='get-campaign-abuse-reports')
    def get_campaign_abuse_reports(self, request, pk):
        """
        Get a list of abuse complaints for a specific campaign.
        :param str pk: Campaign ID (required)
        """

        response = mailchimp_service.get_campaign_abuse_reports(campaign_id=pk)
        return Response(response.get('text'), status=response.get('status_code'))

    @action(detail=True, methods=['get'], url_path='get-campaign-abuse-report/(?P<report_id>[A-Za-z0-9]*)')
    def get_campaign_abuse_report(self, request, pk, report_id):
        """
        Get information about a specific abuse report for a campaign.
        :param str pk: Campaign ID (required)
        :param str report_id: Report ID (required)
        """

        response = mailchimp_service.get_campaign_abuse_report(campaign_id=pk, report_id=report_id)
        return Response(response.get('text'), status=response.get('status_code'))

    @action(detail=True, methods=['get'], url_path='get-campaign-open-details')
    def get_campaign_open_details(self, request, pk):
        """
        Get detailed information about any campaign emails that were opened by a list member.
        :param str pk: Campaign ID (required)
        """

        response = mailchimp_service.get_campaign_open_details(campaign_id=pk)
        return Response(response.get('text'), status=response.get('status_code'))

    @action(detail=True, methods=['get'], url_path='get-campaign-click-details')
    def get_campaign_click_details(self, request, pk):
        """
        Get information about clicks on specific links in your Mailchimp campaigns.
        :param str pk: Campaign ID (required)
        """

        response = mailchimp_service.get_campaign_click_details(campaign_id=pk)
        return Response(response.get('text'), status=response.get('status_code'))
