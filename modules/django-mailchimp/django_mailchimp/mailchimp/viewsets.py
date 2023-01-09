import os

from rest_framework.decorators import action
from rest_framework.viewsets import GenericViewSet
from rest_framework.response import Response
from rest_framework import status

from .services.MailchimpService import MailchimpService

mailchimp_service = MailchimpService(config={
    "api_key": os.getenv("MAILCHIMP_API_KEY", ""),
    "server": os.getenv("MAILCHIMP_SERVER_REGION", "")
})


class MailchimpAudienceViewSet(GenericViewSet):

    @action(detail=False, methods=['get'], url_path='get-audience-lists')
    def get_audience_lists(self, request):
        params = request.query_params.dict()
        response = mailchimp_service.get_audience_lists(**params)
        return Response(response, status=response.status_code)

    @action(detail=False, methods=['post'], url_path='add-audience-list')
    def add_audience_list(self, request):
        response = mailchimp_service.add_audience_list(body=request.body)
        return Response(response, status=response.status_code)

    @action(detail=True, methods=['get'], url_path='get-audience-list')
    def get_audience_list(self, request, pk):
        response = mailchimp_service.get_audience_list(list_id=pk)
        return Response(response, status=response.status_code)

    @action(detail=True, methods=['post'], url_path='update-audience-list')
    def update_audience_list(self, request, pk):
        response = mailchimp_service.update_audience_list(body=request.body, list_id=pk)
        return Response(response, status=response.status_code)

    @action(detail=True, methods=['post'], url_path='delete-audience-list')
    def delete_audience_list(self, request, pk):
        response = mailchimp_service.delete_audience_list(list_id=pk)
        return Response(response, status=response.status_code)

    @action(detail=True, methods=['post'], url_path='batch-subscribe-unsubscribe-audience')
    def batch_subscribe_or_unsubscribe_audience(self, request, pk):
        response = mailchimp_service.batch_subscribe_or_unsubscribe_audience(list_id=pk, body=request.body)
        return Response(response, status=response.status_code)

    @action(detail=True, methods=['get'], url_path='list-member-info')
    def list_member_info(self, request, pk):
        params = request.query_params.dict()
        response = mailchimp_service.list_member_info(list_id=pk, **params)
        return Response(response, status=response.status_code)

    @action(detail=True, methods=['post'], url_path='add-list-member')
    def add_list_member(self, request, pk):
        response = mailchimp_service.add_list_member(list_id=pk, body=request.body)
        return Response(response, status=response.status_code)

    @action(detail=True, methods=['get'], url_path='get-member-info/(?P<subscriber_hash>[A-Za-z0-9]*)')
    def get_member_info(self, request, pk, subscriber_hash):
        response = mailchimp_service.get_member_info(list_id=pk, subscriber_hash=subscriber_hash)
        return Response(response, status=response.status_code)

    @action(detail=True, methods=['post'], url_path='update-list-member/(?P<subscriber_hash>[A-Za-z0-9]*)')
    def update_list_member(self, request, pk, subscriber_hash):
        response = mailchimp_service.update_list_member(list_id=pk, subscriber_hash=subscriber_hash, body=request.body)
        return Response(response, status=response.status_code)

    @action(detail=True, methods=['post'], url_path='delete-list-member/(?P<subscriber_hash>[A-Za-z0-9]*))')
    def delete_list_member(self, request, pk, subscriber_hash):
        response = mailchimp_service.delete_list_member(list_id=pk, subscriber_hash=subscriber_hash)
        return Response(response, status=response.status_code)

    @action(detail=True, methods=['get'], url_path='list-member-tags/(?P<subscriber_hash>[A-Za-z0-9]*))')
    def get_list_member_tags(self, request, pk, subscriber_hash):
        response = mailchimp_service.get_list_member_tags(list_id=pk, subscriber_hash=subscriber_hash)
        return Response(response, status=response.status_code)

    @action(detail=True, methods=['post'], url_path='add-or-remove-member-tag/(?P<subscriber_hash>[A-Za-z0-9]*)')
    def add_or_remove_member_tag(self, request, pk, subscriber_hash):
        response = mailchimp_service.add_or_remove_member_tag(list_id=pk, subscriber_hash=subscriber_hash,
                                                              body=request.body)
        return Response(response, status=response.status_code)

    @action(detail=True, methods=['post'], url_path='list-segment')
    def list_segment(self, request, pk):
        response = mailchimp_service.list_segments(list_id=pk)
        return Response(response, status=response.status_code)

    @action(detail=True, methods=['post'], url_path='add-segment')
    def add_segment(self, request, pk):
        response = mailchimp_service.add_segment(list_id=pk, body=request.body)
        return Response(response, status=response.status_code)

    @action(detail=True, methods=['post'], url_path='get-segment-info/(?P<segment_id>[A-Za-z0-9]*)')
    def get_segment_info(self, request, pk, segment_id):
        response = mailchimp_service.get_segment_info(list_id=pk, segment_id=segment_id)
        return Response(response, status=response.status_code)

    @action(detail=True, methods=['post'], url_path='delete-segment/(?P<segment_id>[A-Za-z0-9]*)')
    def delete_segment(self, request, pk, segment_id):
        response = mailchimp_service.delete_segment(list_id=pk, segment_id=segment_id)
        return Response(response, status=response.status_code)

    @action(detail=True, methods=['post'], url_path='update-segment/(?P<segment_id>[A-Za-z0-9]*)')
    def update_segment(self, request, pk, segment_id):
        response = mailchimp_service.update_segment(list_id=pk, segment_id=segment_id, body=request.body)
        return Response(response, status=response.status_code)


class MailchimpTemplatesViewSet(GenericViewSet):

    @action(detail=False, methods=['get'], url_path='list-template')
    def list_template(self, request):
        response = mailchimp_service.list_template()
        return Response(response, status=response.status_code)

    @action(detail=False, methods=['post'], url_path='add-template')
    def add_template(self, request):
        response = mailchimp_service.add_template(body=request.body)
        return Response(response, status=response.status_code)

    @action(detail=True, methods=['get'], url_path='get_template_info')
    def get_template_info(self, request, pk):
        response = mailchimp_service.get_template_info(template_id=pk)
        return Response(response, status=response.status_code)

    @action(detail=True, methods=['post'], url_path='delete-template')
    def delete_template(self, request, pk):
        response = mailchimp_service.delete_template(template_id=pk)
        return Response(response, status=response.status_code)

    @action(detail=True, methods=['post'], url_path='update-template')
    def update_template(self, request, pk):
        response = mailchimp_service.update_template(template_id=pk, body=request.body)
        return Response(response, status=response.status_code)

    @action(detail=False, methods=['get'], url_path='list-template-folder')
    def list_template_folder(self, request):
        response = mailchimp_service.list_template_folder()
        return Response(response, status=response.status_code)

    @action(detail=False, methods=['post'], url_path='add-template-folder')
    def add_template_folder(self, request):
        response = mailchimp_service.add_template_folder(body=request.body)
        return Response(response, status=response.status_code)

    @action(detail=False, methods=['get'], url_path='get-template-folder')
    def get_template_folder(self, request, pk):
        response = mailchimp_service.get_template_folder(folder_id=pk)
        return Response(response, status=response.status_code)

    @action(detail=True, methods=['post'], url_path='delete-template-folder')
    def delete_template_folder(self, request, pk):
        response = mailchimp_service.delete_template_folder(folder_id=pk)
        return Response(response, status=response.status_code)

    @action(detail=True, methods=['post'], url_path='update-template-folder')
    def update_template_folder(self, request, pk):
        response = mailchimp_service.update_template_folder(folder_id=pk, body=request.body)
        return Response(response, status=response.status_code)
    