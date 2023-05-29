import os
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .services.BlackbaudService import BlackbaudService
from .serializers import *


class BlackbaudViewSet(viewsets.GenericViewSet):
    blackbaud_service = BlackbaudService(
        base_url=os.getenv('BLACKBAUD_BASE_URL', ""),
        grant_type=os.getenv('BLACKBAUD_GRANT_TYPE', "authorization_code"),
        redirect_url=os.getenv('BLACKBAUD_REDIRECT_URL', ""),
        client_id=os.getenv('BLACKBAUD_CLIENT_ID', ""),
        client_secret=os.getenv('BLACKBAUD_CLIENT_SECRET', ""),
        api_subscription_key=os.getenv('BB_API_SUBSCRIPTION_KEY', "")
    )

    allowed_serializer = {
        "create_constituents": CreateConstituentsSerializers,
        "create_constituents_attachment": CreateConstituentsAttachmentsSerializers,
        "create_constituent_code": CreateConstituentsCodeSerializers,
        "create_constituent_custom_field": CreateConstituentsCustomFieldsSerializers,
        "create_constituent_custom_collection": CreateConstituentsCustomFieldsCollectionSerializers,
        "create_document": CreateConstituentDocumentSerializers,
        "create_constituent_education": CreateConstituentEducationSerializers,
        "create_constituent_education_custom_field": CreateConstituentEducationCustomFieldSerializers,
        "create_constituents_address": CreateConstituentAddressSerializers,
        "create_constituent_aliases": CreateConstituentAliasesSerializers,
        "create_constituent_alias_collection": CreateConstituentAliasesCollectionSerializers,
        "create_participant_in_event": CreateParticipantsSerializer,
        "create_category_in_event": CreateEventCategorySerializer,
        "create_event_fee": CreateEventFeeSerializer,
        "create_an_event": CreateEventSerializer,
        "create_gift": CreateGiftSerializer,
        "create_a_participant_serializer": CreateParticipantDonationSerializer,
        "create_participant_fee": CreateParticipantFeeSerializer,
        "create_participant_fee_payment": CreateParticipantFeePaymentSerializer,
        "create_event_participant_option": CreateEventParticipantOptionSerializer,
        "create_participant_option": CreateParticipantOptionSerializer,
        "create_participant_level": CreateParticipantLevelSerializer,
        "create_an_event_attachment_upload": CreateEventAttachmentUploadSerializer,
        "create_an_event_attachment": CreateEventAttachmentSerializer,
        "edit_event_participant_detail": EditParticipantsSerializer,
        "edit_participant_option": EditParticipantOptionSerializer,
        "edit_participant_level": EditParticipantLevelSerializer,
        "edit_an_event": EditEventSerializer,
        "edit_an_event_category": EventEventCategorySerializer,
        "edit_an_event_fee": EditEventFeeSerializer,
        "edit_an_event_participant_option": EditEventParticipantOptionSerializer,
        "create_constituent_relationship": CreateConstituentRelationshipSerializers,
        "edit_constituent_relationship": EditConstituentRelationshipSerializers,
        "create_an_constituent_rating": CreateConstituentRatingSerializers,
        "edit_an_constituent_rating": EditConstituentRatingSerializers,
        "create_constituent_action": CreateConstituentActionSerializer,
        "update_constituent_action": UpdateConstituentActionSerializer,
        "create_constituent_action_attachment": CreateActionAttachmentSerializer,
        "update_constituent_action_attachment": UpdateActionAttachmentSerializer,
        "create_constituent_action_custom_field": CreateConstituentsActionCustomFieldsSerializers,
        "edit_an_constituent_address": EditConstituentAddressSerializer,
        "edit_constituent_aliases": EditConstituentAliasesSerializer,
        "update_constituent_action_custom_field":UpdateConstituentsActionCustomFieldsSerializers
    }

    def get_serializer_class(self):
        return self.allowed_serializer.get(self.action)

    @action(detail=False, methods=['post'], url_path='access/token')
    def get_access_token(self, request):
        """
        To get the access token\n
        :return: Returns access_token, refresh_token and expires_in.
        """
        response = self.blackbaud_service.auth_token(request.data.get('code'))
        data = response.get("data")
        if 'access_token' in data:
            self.blackbaud_service.access_token = data['access_token']
        return Response(data=data, status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='events/list')
    def get_event_list(self, request):
        """
        To get the Event List \n
        :headers: "Authorization: Bearer (token)" \n
        :return: Returns an event_list containing all its objects.
        """
        response = self.blackbaud_service.event_list(request.META.get("HTTP_AUTHORIZATION"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='event/details/(?P<event_id>\d+)')
    def get_event_details(self, request, **kwargs):
        """
        To get the Event Details \n
        :headers: "Authorization: Bearer (token)" \n
        :body_params: "event_id" \n
        :return: Returns an event with details containing all its objects.
        """
        response = self.blackbaud_service.event_details(request.META.get("HTTP_AUTHORIZATION"),
                                                        kwargs.get("event_id", None))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='event/participants_list/(?P<event_id>\d+)')
    def get_event_participants_list(self, request, **kwargs):
        """
        To get the Event Participants List \n
        :headers: "Authorization: Bearer (token)" \n
        :path_params: "event_id" \n
        :return: Returns an event details with including participants.
        """
        response = self.blackbaud_service.event_participants_list(request.META.get("HTTP_AUTHORIZATION"),
                                                                  kwargs.get("event_id", None))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='consent/channels')
    def get_consent_channels(self, request):
        """
       To get the Consent Channels Details \n
       :headers: "Authorization: Bearer (token)" \n
       :return: Returns consent channels details containing all its objects.
       """
        response = self.blackbaud_service.consent_channels(request.META.get("HTTP_AUTHORIZATION"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='constituents/list')
    def get_constituents_list(self, request):
        """
        To get the Constituents List \n
        :headers: "Authorization: Bearer (token)" \n
        :return: Returns an constituents list details containing all its objects.
      """
        response = self.blackbaud_service.constituents_list(request.META.get("HTTP_AUTHORIZATION"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='constituents/create_constituent')
    def create_constituents(self, request):
        """
            To create the Constituents \n
            :headers: "Authorization: Bearer (token)" \n
            :body_params: {"type": "", "email":"", "phone":""} \n
            :return: Returns an created constituents id with details.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.blackbaud_service.create_constituents(request.META.get("HTTP_AUTHORIZATION"),
                                                              payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'],
            url_path='constituents/convert_non_constituent_to_constituent/(?P<non_constituent_id>\d+)')
    def create_convert_non_constituent_to_constituent(self, request, *args, **kwargs):
        """
            To convert the non-constituent-id to constituent \n
            :headers: "Authorization: Bearer (token)" \n
            :path_params: "non_constituent_id" \n
            :return: Returns non constituents id in constituent.
        """
        response = self.blackbaud_service.convert_non_constituent_to_constituent(request.META.get("HTTP_AUTHORIZATION"),
                                                                                 kwargs.get("non_constituent_id"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='constituents/constituent_details/(?P<constituent_id>\d+)')
    def get_constituent_details(self, request, *args, **kwargs):
        """
            To get the constituent details \n
            :headers: "Authorization: Bearer (token)" \n
            :path_params: "constituent_id" \n
            :return: Returns constituent details containing its objects.
        """
        response = self.blackbaud_service.constituent_details_by_id(request.META.get("HTTP_AUTHORIZATION"),
                                                                    kwargs.get("constituent_id", None))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='constituents/constituent_appeal_list/(?P<constituent_id>\d+)')
    def get_constituent_appeal_list(self, request, *args, **kwargs):
        """
            To get the constituent appeal list \n
            :headers: "Authorization: Bearer (token)" \n
            :path_params: "constituent_id" \n
            :return: Returns constituent appeal list with details.
        """
        response = self.blackbaud_service.constituent_appeal_list(request.META.get("HTTP_AUTHORIZATION"),
                                                                  kwargs.get("constituent_id"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='constituents/create_attachment')
    def create_constituents_attachment(self, request):
        """
            To create constituent attachment \n
            :headers: "Authorization: Bearer (token)" \n
            :body_params: {"parent_id": "", "type": ""} \n
            :return: Returns constituent appeal list with details.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.blackbaud_service.create_constituent_attachment(request.META.get("HTTP_AUTHORIZATION"),
                                                                        payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['delete'], url_path='constituents/delete_attachment')
    def delete_constituent_attachment(self, request, *args, **kwargs):
        """
            To delete constituent attachment \n
            :headers: "Authorization: Bearer (token)" \n
            :query_params: "attachment_id" \n
            :return: Returns delete constituent attachment id.
        """
        response = self.blackbaud_service.delete_constituent_attachment(request.META.get("HTTP_AUTHORIZATION"),
                                                                        attachment_id=request.query_params.get(
                                                                            "attachment_id", None))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='constituents/constituent_attachment_list/(?P<constituent_id>\d+)')
    def get_constituent_attachment_list(self, request, *args, **kwargs):
        """
            To get constituent attachment list \n
            :headers: "Authorization: Bearer (token)" \n
            :path_params: "constituent_id" \n
            :return: Return an list of constituent attachment.
        """
        response = self.blackbaud_service.constituent_attachment_list(request.META.get("HTTP_AUTHORIZATION"),
                                                                      kwargs.get("constituent_id", None))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='constituents/create_constituent_code')
    def create_constituent_code(self, request):
        """
            To get constituent code \n
            :headers: "Authorization: Bearer (token)" \n
            :body_params: {"constituent_id": "", "description": ""} \n
            :return: Return detail about created constituent code.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.blackbaud_service.constituent_code(request.META.get("HTTP_AUTHORIZATION"),
                                                           payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['delete'],
            url_path='constituents/delete_constituent_code/(?P<constituent_code_id>\d+)')
    def delete_constituent_code(self, request, *args, **kwargs):
        """
            To delete constituent code \n
            :headers: "Authorization: Bearer (token)" \n
            :path_params: "constituent_code_id" \n
            :return: Return deleted constituent code id.
        """
        response = self.blackbaud_service.delete_constituent_code(request.META.get("HTTP_AUTHORIZATION"),
                                                                  kwargs.get("constituent_code_id", None))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'],
            url_path='constituents/get_constituent_code_details/(?P<constituent_code_id>\d+)')
    def get_constituent_code_details(self, request, *args, **kwargs):
        """
            To get constituent code \n
            :headers: "Authorization: Bearer (token)" \n
            :path_params: "constituent_code_id" \n
            :return: Return constituent code id with details.
        """
        response = self.blackbaud_service.constituent_code_details(request.META.get("HTTP_AUTHORIZATION"),
                                                                   kwargs.get("constituent_code_id", None))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='constituents/get_constituent_code_list')
    def get_constituent_code_list(self, request):
        """
            To get constituent code list \n
            :headers: "Authorization: Bearer (token)" \n
            :return: Return constituent code list with details.
        """
        response = self.blackbaud_service.constituent_code_list(request.META.get("HTTP_AUTHORIZATION"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'],
            url_path='constituents/get_constituent_code_list_in_constituent/(?P<constituent_id>\d+)')
    def get_constituent_code_list_in_constituent(self, request, *args, **kwargs):
        """
            To get constituent code list in constituent \n
            :headers: "Authorization: Bearer (token)" \n
            :path_params: "constituent_id" \n
            :return: Return constituent code list in constituent with details.
        """
        response = self.blackbaud_service.constituent_code_list_in_constituent(request.META.get("HTTP_AUTHORIZATION"),
                                                                               kwargs.get("constituent_id"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='constituents/create_constituent_custom_field')
    def create_constituent_custom_field(self, request):
        """
            To create constituent custom field \n
            :headers: "Authorization: Bearer (token)" \n
            :body_params: {"category": "", "comment": "", "parent_id"} \n
            :return: Return created constituent custom field id with details.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.blackbaud_service.constituent_custom_fields(request.META.get("HTTP_AUTHORIZATION"),
                                                                    payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='constituents/get_constituent_custom_field_categories')
    def get_constituent_custom_field_categories(self, request):
        """
            To get constituent custom field categories \n
            :headers: "Authorization: Bearer (token)" \n
            :return: Return details about constituent custom field categories.
        """
        response = self.blackbaud_service.constituent_custom_field_categories(request.META.get("HTTP_AUTHORIZATION"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='constituents/get_constituent_custom_field_categories_details')
    def get_constituent_custom_field_categories_details(self, request):
        """
            To get constituent custom field categories details \n
            :headers: "Authorization: Bearer (token)" \n
            :return: Return details about constituent custom field categories details.
        """
        response = self.blackbaud_service.constituent_custom_field_categories_details(
            request.META.get("HTTP_AUTHORIZATION"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='constituents/get_constituent_custom_field_categories_values')
    def get_constituent_custom_field_categories_values(self, request):
        """
            To get constituent custom field categories values \n
            :headers: "Authorization: Bearer (token)" \n
            :return: Return details about constituent custom field categories values.
        """
        response = self.blackbaud_service.constituent_custom_field_categories_values(
            request.META.get("HTTP_AUTHORIZATION"), category_name=request.query_params.get('category_name'))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'],
            url_path='constituents/create_constituent_custom_field_collection/(?P<constituent_id>\d+)')
    def create_constituent_custom_collection(self, request, *args, **kwargs):
        """
            To create constituent custom field collection \n
            :headers: "Authorization: Bearer (token)" \n
            :body_params: {"category": ""} \n
            :path_params: "constituent_id" \n
            :return: Return created constituent custom field collection with details.
        """
        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        response = self.blackbaud_service.constituent_custom_field_collection(
            request.META.get("HTTP_AUTHORIZATION"), kwargs.get("constituent_id"),
            payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='constituents/get_constituent_custom_field_list')
    def get_constituent_custom_field_list(self, request):
        """
            To get constituent custom field list \n
            :headers: "Authorization: Bearer (token)" \n
            :return: Return constituent custom field list.
        """
        response = self.blackbaud_service.constituent_custom_field_list(
            request.META.get("HTTP_AUTHORIZATION"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'],
            url_path='constituents/get_constituent_custom_field_list_in_single_constituent/(?P<constituent_id>\d+)')
    def get_constituent_custom_field_list_in_single_constituent(self, request, *args, **kwargs):
        """
            To get constituent custom field list in single constituents \n
            :headers: "Authorization: Bearer (token)" \n
            :path_params: "constituent_id" \n
            :return: Return constituent custom field list in single constituents.
        """
        response = self.blackbaud_service.constituent_custom_field_list_in_single_constituent(
            request.META.get("HTTP_AUTHORIZATION"), kwargs.get("constituent_id"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='constituents/get_countries')
    def get_constituent_countries(self, request):
        """
            To get constituent countries \n
            :headers: "Authorization: Bearer (token)" \n
            :return: Return constituent countries details.
        """
        response = self.blackbaud_service.constituent_countries(
            request.META.get("HTTP_AUTHORIZATION"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='constituents/get_currencyconfiguration')
    def get_constituent_currencyconfiguration(self, request):
        """
            To get constituent currency configuration \n
            :headers: "Authorization: Bearer (token)" \n
            :return: Return constituent currency configuration details.
        """
        response = self.blackbaud_service.constituent_currencyconfiguration(
            request.META.get("HTTP_AUTHORIZATION"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='constituents/get_education_list')
    def get_constituents_education_list(self, request):
        """
            To get constituent education list \n
            :headers: "Authorization: Bearer (token)" \n
            :return: Return constituent education list with details.
        """
        response = self.blackbaud_service.constituents_education_list(
            request.META.get("HTTP_AUTHORIZATION"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='constituents/create_document')
    def create_document(self, request):
        """
            To create document \n
            :headers: "Authorization: Bearer (token)" \n
            :body_params: {"file_name": "", "upload_thumbnail": ""} \n
            :return: Return details about created document with id.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.blackbaud_service.constituent_create_document(
            request.META.get("HTTP_AUTHORIZATION"), payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='constituents/create_education')
    def create_constituent_education(self, request):
        """
            To create constituent education \n
            :headers: "Authorization: Bearer (token)" \n
            :body_params: {"constituent_id": "", "school": "", "department": "", "degree": "", "status":"", "type":""} \n
            :return: Return details about created constituent education with id.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.blackbaud_service.constituent_create_education(
            request.META.get("HTTP_AUTHORIZATION"), payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['delete'], url_path='constituents/delete_education/(?P<education_id>\d+)')
    def delete_constituent_education(self, request, *args, **kwargs):
        """
             To delete constituent education \n
             :headers: "Authorization: Bearer (token)" \n
             :path_params: "education_id" \n
             :return: Return details about deleted constituent education with id.
         """
        response = self.blackbaud_service.constituent_delete_education(
            request.META.get("HTTP_AUTHORIZATION"), kwargs.get("education_id"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='constituents/get_education_record/(?P<education_id>\d+)')
    def get_constituent_education_record(self, request, *args, **kwargs):
        """
             To get constituent education record \n
             :headers: "Authorization: Bearer (token)" \n
             :path_params: "education_id" \n
             :return: Return details about constituent education record.
         """
        response = self.blackbaud_service.constituent_get_education_record(
            request.META.get("HTTP_AUTHORIZATION"), kwargs.get("education_id"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='constituents/create_education_custom_field')
    def create_constituent_education_custom_field(self, request):
        """
            To create constituent education custom field \n
            :headers: "Authorization: Bearer (token)" \n
            :body_params: {"category": "", "parent_id": "", "comment": ""} \n
            :return: Return details about created constituent education custom field with id.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.blackbaud_service.constituent_create_education_custom_field(
            request.META.get("HTTP_AUTHORIZATION"), payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['delete'],
            url_path='constituents/delete_education_custom_field/(?P<custom_field_id>\d+)')
    def delete_constituent_education_custom_field(self, request, *args, **kwargs):
        """
            To delete constituent education custom field \n
            :headers: "Authorization: Bearer (token)" \n
            :path_params: "custom_field_id" \n
            :return: Return details about deleted constituent education custom field with id.
        """
        response = self.blackbaud_service.constituent_delete_education_custom_field(
            request.META.get("HTTP_AUTHORIZATION"), kwargs.get("custom_field_id"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='constituents/get_education_custom_field_categories')
    def get_education_custom_field_categories(self, request):
        """
             To get constituent education custom field categories \n
             :headers: "Authorization: Bearer (token)" \n
             :return: Return details about constituent education custom field categories.
         """
        response = self.blackbaud_service.constituent_get_education_custom_field_categories(
            request.META.get("HTTP_AUTHORIZATION"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'],
            url_path='constituents/get_custom_field_list_in_education/(?P<education_id>\d+)')
    def get_constituent_custom_field_list_in_education(self, request, *args, **kwargs):
        """
            To get constituent education custom field list \n
            :headers: "Authorization: Bearer (token)" \n
            :path_params: "education_id" \n
            :return: Return details about constituent education custom field list.
        """
        response = self.blackbaud_service.constituent_get_custom_field_list_in_education(
            request.META.get("HTTP_AUTHORIZATION"), kwargs.get("education_id"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='constituents/get_education_degrees')
    def get_constituent_education_degrees(self, request):
        """
            To get constituent education degrees \n
            :headers: "Authorization: Bearer (token)" \n
            :return: Return details about constituent education degrees.
        """
        response = self.blackbaud_service.constituent_get_education_degrees(
            request.META.get("HTTP_AUTHORIZATION"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'],
            url_path='constituents/get_education_list_in_constituent/(?P<constituent_id>\d+)')
    def get_education_list_in_constituent(self, request, *args, **kwargs):
        """
            To get constituent education list in constituent \n
            :headers: "Authorization: Bearer (token)" \n
            :path_params: "constituent_id" \n
            :return: Return details about constituent education list in constituent.
        """
        response = self.blackbaud_service.constituent_get_single_education_list(
            request.META.get("HTTP_AUTHORIZATION"), kwargs.get("constituent_id"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='constituents/get_education_schools')
    def get_constituent_education_schools(self, request):
        """
            To get constituent education schools \n
            :headers: "Authorization: Bearer (token)" \n
            :return: Return details about constituent education schools.
        """
        response = self.blackbaud_service.constituent_get_education_schools(
            request.META.get("HTTP_AUTHORIZATION"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='constituents/get_education_statuses')
    def get_constituent_education_statuses(self, request):
        """
            To get constituent education statuses \n
            :headers: "Authorization: Bearer (token)" \n
            :return: Return details about constituent education statuses.
        """
        response = self.blackbaud_service.constituent_get_education_statuses(
            request.META.get("HTTP_AUTHORIZATION"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='constituents/get_education_subjects')
    def get_constituent_education_subjects(self, request):
        """
            To get constituent education subjects \n
            :headers: "Authorization: Bearer (token)" \n
            :return: Return details about constituent education subjects.
        """
        response = self.blackbaud_service.constituent_get_education_subjects(
            request.META.get("HTTP_AUTHORIZATION"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='constituents/get_education_types')
    def get_constituent_education_types(self, request):
        """
            To get constituent education types \n
            :headers: "Authorization: Bearer (token)" \n
            :return: Return details about constituent education types.
        """
        response = self.blackbaud_service.constituent_get_education_types(
            request.META.get("HTTP_AUTHORIZATION"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='constituents/get_address_list')
    def get_constituents_address_list(self, request):
        """
            To get constituent education address list \n
            :headers: "Authorization: Bearer (token)" \n
            :return: Return details about constituent education address list.
        """
        response = self.blackbaud_service.constituents_address_list(
            request.META.get("HTTP_AUTHORIZATION"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='constituents/create_address')
    def create_constituents_address(self, request):
        """
            To create constituent address \n
            :headers: "Authorization: Bearer (token)" \n
            :body_params: {"constituent_id": "", "country": "", "city": "", "type":"", "postal_code":"", "region":""} \n
            :return: Return details about created constituent address with id.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.blackbaud_service.constituents_create_address(
            request.META.get("HTTP_AUTHORIZATION"), payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='constituents/get_address_details/(?P<address_id>\d+)')
    def get_constituent_address_details(self, request, *args, **kwargs):
        """
            To get constituent address details \n
            :headers: "Authorization: Bearer (token)" \n
            :path_params: "address_id" \n
            :return: Return details about constituent address.
        """
        response = self.blackbaud_service.constituents_get_address_details(
            request.META.get("HTTP_AUTHORIZATION"), kwargs.get("address_id"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['delete'], url_path='constituents/delete_address_details/(?P<address_id>\d+)')
    def delete_constituent_address_details(self, request, *args, **kwargs):
        """
            To delete constituent address details \n
            :headers: "Authorization: Bearer (token)" \n
            :path_params: "address_id" \n
            :return: Return deleted constituent address id.
        """
        response = self.blackbaud_service.constituents_delete_address_details(
            request.META.get("HTTP_AUTHORIZATION"), kwargs.get("address_id"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'],
            url_path='constituents/get_address_list_in_constituents/(?P<constituent_id>\d+)')
    def get_address_list_in_constituents(self, request, *args, **kwargs):
        """
            To get constituent address list in constituent \n
            :headers: "Authorization: Bearer (token)" \n
            :path_params: "constituent_id" \n
            :return: Return details about constituent address list in constituent.
        """
        response = self.blackbaud_service.constituents_get_address_list(
            request.META.get("HTTP_AUTHORIZATION"), kwargs.get("constituent_id"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='constituents/get_address_types')
    def get_address_type_in_constituents(self, request):
        """
            To get constituent address type in constituent \n
            :headers: "Authorization: Bearer (token)" \n
            :return: Return details about constituent address type in constituent.
        """
        response = self.blackbaud_service.constituents_get_address_types(
            request.META.get("HTTP_AUTHORIZATION"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='constituents/create_aliases')
    def create_constituent_aliases(self, request):
        """
            To create constituent aliases \n
            :headers: "Authorization: Bearer (token)" \n
            :body_params: {"constituent_id": "", "name": "", "type":""} \n
            :return: Return details about created constituent aliases.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.blackbaud_service.constituents_create_aliases(
            request.META.get("HTTP_AUTHORIZATION"), payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['delete'], url_path='constituents/delete_aliases/(?P<alias_id>\d+)')
    def delete_constituent_aliases(self, request, *args, **kwargs):
        """
             To delete constituent aliases \n
             :headers: "Authorization: Bearer (token)" \n
             :path_params: "alias_id" \n
             :return: Return details about deleted constituent aliases.
         """
        response = self.blackbaud_service.constituents_delete_alias(
            request.META.get("HTTP_AUTHORIZATION"), kwargs.get("alias_id"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='constituents/create_alias_collection/(?P<constituent_id>\d+)')
    def create_constituent_alias_collection(self, request, *args, **kwargs):
        """
            To create constituent alias collection \n
            :headers: "Authorization: Bearer (token)" \n
            :body_params: {"name": "", "type":""} \n
            :path_params: "constituent_id" \n
            :return: Return details about created constituent alias collection.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.blackbaud_service.constituents_create_alias_collection(
            request.META.get("HTTP_AUTHORIZATION"), kwargs.get("constituent_id"), payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='event/get_participant/(?P<participant_id>\d+)')
    def get_event_participant(self, request, **kwargs):
        """
        To get the Event Participant \n
        :headers: "Authorization: Bearer (token)" \n
        :path_params: "participant_id" \n
        :return: Returns an event  participant details.
        """
        response = self.blackbaud_service.event_participant_details(request.META.get("HTTP_AUTHORIZATION"),
                                                                    kwargs.get("participant_id", None))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='event/get_event_attachment')
    def get_event_attachment(self, request, **kwargs):
        """
        To get the Event Attachment \n
        :headers: "Authorization: Bearer (token)" \n
        :query_params: {"event_id": "", ""attachment_id":""} \n
        :return: Returns an event  attachment details.
        """
        response = self.blackbaud_service.event_attachment(request.META.get("HTTP_AUTHORIZATION"),
                                                           request.query_params.get('event_id'),
                                                           request.query_params.get('attachment_id')
                                                           )
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='event/get_event_attachment_tags')
    def get_event_attachment_tags(self, request, **kwargs):
        """
        To get the Event Attachment Tags \n
        :headers: "Authorization: Bearer (token)" \n
        :return: Returns an event  attachment details.
        """
        response = self.blackbaud_service.event_attachment_tags(request.META.get("HTTP_AUTHORIZATION"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='event/(?P<event_id>\d+)/get_event_attachment_list')
    def get_event_attachment_list(self, request, **kwargs):
        """
        To get the Event Attachment List \n
        :headers: "Authorization: Bearer (token)" \n
        :path_params: "event_id" \n
        :query_params: "attachment_tag" \n
        :return: Returns a list of attachments for an event.
        """
        response = self.blackbaud_service.event_attachment_list(request.META.get("HTTP_AUTHORIZATION"),
                                                                kwargs.get("event_id", None),
                                                                request.query_params.get('attachment_tag', None)
                                                                )
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='event/get_event_categories')
    def get_event_categories(self, request, **kwargs):
        """
        To get the Event Categories List \n
        :headers: "Authorization: Bearer (token)" \n
        :query_params: "include_inactive" \n
        :return: Returns a list of active event categories.
        """
        response = self.blackbaud_service.event_categories(request.META.get("HTTP_AUTHORIZATION"),
                                                           request.query_params.get('include_inactive', None)
                                                           )
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='event/(?P<event_id>\d+)/get_event_fees')
    def get_event_fees(self, request, **kwargs):
        """
        To get the Event Fee List \n
        :headers: "Authorization: Bearer (token)" \n
        :path_params: "event_id" \n
        :return: Returns a list of fees for an event.
        """
        response = self.blackbaud_service.event_fees(request.META.get("HTTP_AUTHORIZATION"),
                                                     kwargs.get('event_id', None)
                                                     )
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='event/(?P<event_id>\d+)/get_event_participant_options')
    def get_event_participant_options(self, request, **kwargs):
        """
        To get the Event participant options \n
        :headers: "Authorization: Bearer (token)" \n
        :path_params: "event_id" \n
        :return: Returns the participant options for an event.
        """
        response = self.blackbaud_service.event_participant_options(request.META.get("HTTP_AUTHORIZATION"),
                                                                    kwargs.get('event_id', None)
                                                                    )
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='event/(?P<participant_id>\d+)/get_event_participant_donation')
    def get_event_participant_donation(self, request, **kwargs):
        """
        To get the Event participant Donation \n
        :headers: "Authorization: Bearer (token)" \n
        :path_params: "participant_id" \n
        :return: Returns the donations for a participant.
        """
        response = self.blackbaud_service.event_participant_donations(request.META.get("HTTP_AUTHORIZATION"),
                                                                      kwargs.get('participant_id', None)
                                                                      )
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='event/(?P<participant_id>\d+)/get_event_participant_fee_payments')
    def get_event_participant_fee_payments(self, request, **kwargs):
        """
        To get the Event participant fee payments \n
        :headers: "Authorization: Bearer (token)" \n
        :path_params: "participant_id" \n
        :return: Returns the fee payments for a participant.
        """
        response = self.blackbaud_service.event_participant_fee_payments(request.META.get("HTTP_AUTHORIZATION"),
                                                                         kwargs.get('participant_id', None)
                                                                         )
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='event/(?P<participant_id>\d+)/get_event_participant_fees')
    def get_event_participant_fees(self, request, **kwargs):
        """
        To get the Event participant fee \n
        :headers: "Authorization: Bearer (token)" \n
        :path_params: "participant_id" \n
        :return: Returns the fee details for a participant.
        """
        response = self.blackbaud_service.event_participant_fees(request.META.get("HTTP_AUTHORIZATION"),
                                                                 kwargs.get('participant_id', None)
                                                                 )
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='event/(?P<participant_id>\d+)/get_participant_options')
    def get_participant_options(self, request, **kwargs):
        """
        To get the Participant Options \n
        :headers: "Authorization: Bearer (token)" \n
        :path_params: "participant_id" \n
        :return: Returns the participant options for a participant.
        """
        response = self.blackbaud_service.participant_options(request.META.get("HTTP_AUTHORIZATION"),
                                                              kwargs.get('participant_id', None)
                                                              )
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='event/get_participant_levels')
    def get_participant_levels(self, request, **kwargs):
        """
        To get the Event Categories List \n
        :headers: "Authorization: Bearer (token)" \n
        :query_params: "include_inactive" \n
        :return: Returns a list of active event categories.
        """
        response = self.blackbaud_service.participant_levels(request.META.get("HTTP_AUTHORIZATION"),
                                                             request.query_params.get('include_inactive', None)
                                                             )
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['delete'], url_path='event/delete_participant/(?P<participant_id>\d+)')
    def delete_participant(self, request, *args, **kwargs):
        """
        To delete the Event Participant \n
        :headers: "Authorization: Bearer (token)" \n
        :path_params: "participant_id" \n
        :return: Deletes a participant.
        """
        response = self.blackbaud_service.delete_participant(request.META.get("HTTP_AUTHORIZATION"),
                                                             kwargs.get("participant_id", None))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='event/create_event_participant/(?P<event_id>\d+)')
    def create_participant_in_event(self, request, *args, **kwargs):
        """
        To create the Event Participant \n
        :headers: "Authorization: Bearer (token)" \n
        :path_params: "event_id" \n
        :return: Deletes a participant.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.blackbaud_service.create_event_participants(request.META.get("HTTP_AUTHORIZATION"),
                                                                    kwargs.get("event_id", None),
                                                                    payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='constituent/search')
    def constituent_search(self, request):
        """
        To get the constituent search \n
        :headers: "Authorization: Bearer (token)" \n
        :return: Return detail about searched constituents.
        """
        response = self.blackbaud_service.constituent_search(request.META.get("HTTP_AUTHORIZATION"),
                                                             search=request.query_params.get("search_text"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'],
            url_path='event/create_event_participant_for_attending_event/(?P<event_id>\d+)')
    def create_participant_for_attending_event(self, request, *args, **kwargs):
        """
        To create the Event Participant for attending event \n
        :headers: "Authorization: Bearer (token)" \n
        :path_params: "payload" \n
        :return: created the Event Participant for attending event
        """
        constituent_serializer = CreateConstituentsSerializers(data=request.data['constituent'])
        participant_serializer = CreateParticipantsSerializer(data=request.data['participant'])
        constituent_serializer.is_valid(raise_exception=True) and participant_serializer.is_valid(raise_exception=True)
        response = self.blackbaud_service.create_participant_for_attending_events(
            request.META.get("HTTP_AUTHORIZATION"),
            payload={'constituent_data': constituent_serializer.data, 'participant_data': participant_serializer.data},
            event_id=kwargs.get("event_id", None))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='event/create_event')
    def create_an_event(self, request):
        """
        To create the Event \n
        :headers: "Authorization: Bearer (token)" \n
        :body_params: "payload" \n
        :return: created id of event.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.blackbaud_service.create_an_event(request.META.get("HTTP_AUTHORIZATION"),
                                                          payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['delete'], url_path='event/delete_event/(?P<event_id>\d+)')
    def delete_an_event(self, request, *args, **kwargs):
        """
        To delete the Event Fee \n
        :headers: "Authorization: Bearer (token)" \n
        :path_params: "event_id" \n
        :return: deleted event id.
        """
        response = self.blackbaud_service.delete_event(request.META.get("HTTP_AUTHORIZATION"),
                                                       kwargs.get("event_id", None))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='event/create_event_category')
    def create_category_in_event(self, request):
        """
        To create the Event Participant \n
        :headers: "Authorization: Bearer (token)" \n
        :body_params: "name" \n
        :return: created category id of a participant.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.blackbaud_service.create_event_category(request.META.get("HTTP_AUTHORIZATION"),
                                                                payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['delete'], url_path='event/delete_event_category/(?P<event_category_id>\d+)')
    def delete_an_event_category(self, request, *args, **kwargs):
        """
        To delete the Event category \n
        :headers: "Authorization: Bearer (token)" \n
        :path_params: "event_category_id" \n
        :return: delete message.
        """
        response = self.blackbaud_service.delete_event_category(request.META.get("HTTP_AUTHORIZATION"),
                                                                kwargs.get("event_category_id", None))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='event/create_event_fee/(?P<event_id>\d+)')
    def create_event_fee(self, request, *args, **kwargs):
        """
        To delete the Event Fee \n
        :headers: "Authorization: Bearer (token)" \n
        :path_params: "event__feeid" \n
        :return: A delete message.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.blackbaud_service.create_event_fee(request.META.get("HTTP_AUTHORIZATION"),
                                                           kwargs.get("event_id", None),
                                                           payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['delete'], url_path='event/delete_event_fee/(?P<fee_id>\d+)')
    def delete_an_event_fee(self, request, *args, **kwargs):
        """
        To delete the Event category \n
        :headers: "Authorization: Bearer (token)" \n
        :path_params: "event_category_id" \n
        :return: delete message.
        """
        response = self.blackbaud_service.delete_event_fee(request.META.get("HTTP_AUTHORIZATION"),
                                                           kwargs.get("fee_id", None))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='event/create_gift')
    def create_gift(self, request, *args, **kwargs):
        """
        To create the gift soft credits  \n
        :headers: "Authorization: Bearer (token)" \n
        :body_params: "payload" \n
        :return: A created gift id.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.blackbaud_service.create_gift(request.META.get("HTTP_AUTHORIZATION"),
                                                      payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['delete'], url_path='event/delete_gift/(?P<gift_id>\d+)')
    def delete_gift(self, request, *args, **kwargs):
        """
        To delete the Gift \n
        :headers: "Authorization: Bearer (token)" \n
        :path_params: "gift_id" \n
        :return: delete gift message.
        """
        response = self.blackbaud_service.delete_gift(request.META.get("HTTP_AUTHORIZATION"),
                                                      kwargs.get("gift_id", None))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='event/get_gift_details/(?P<gift_id>\d+)')
    def get_gift_details(self, request, *args, **kwargs):
        """
        To get the Gift details \n
        :headers: "Authorization: Bearer (token)" \n
        :path_params: "gift_id" \n
        :return: Return gift details.
        """
        response = self.blackbaud_service.get_gift_detail(request.META.get("HTTP_AUTHORIZATION"),
                                                          kwargs.get("gift_id", None))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='event/create_participant_donation/(?P<participant_id>\d+)')
    def create_a_participant_donation(self, request, *args, **kwargs):
        """
        To create the participant donation  \n
        :headers: "Authorization: Bearer (token)" \n
        :body_params: "payload" \n
        :return: Return Details about participant donation
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.blackbaud_service.create_participant_donation(request.META.get("HTTP_AUTHORIZATION"),
                                                                      kwargs.get("participant_id", None),
                                                                      payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['delete'],
            url_path='event/delete_participant_donation/(?P<participant_donation_id>\d+)')
    def delete_a_participant_donation(self, request, *args, **kwargs):
        """
        To delete the participant donation  \n
        :headers: "Authorization: Bearer (token)" \n
        :body_params: "payload" \n
        :return: Return Details about deleted participant donation
        """
        response = self.blackbaud_service.delete_participant_donation(request.META.get("HTTP_AUTHORIZATION"),
                                                                      kwargs.get("participant_donation_id", None))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='event/create_participant_fee/(?P<participant_id>\d+)')
    def create_participant_fee(self, request, *args, **kwargs):
        """
        To create the participant fee  \n
        :headers: "Authorization: Bearer (token)" \n
        :body_params: "payload" \n
        :return: Return Details about participant fee
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.blackbaud_service.create_participant_fees(request.META.get("HTTP_AUTHORIZATION"),
                                                                  kwargs.get("participant_id", None),
                                                                  payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['delete'],
            url_path='event/delete_participant_fee/(?P<participant_fee_id>\d+)')
    def delete_a_participant_fee(self, request, *args, **kwargs):
        """
        To delete the participant fee  \n
        :headers: "Authorization: Bearer (token)" \n
        :path_params: "participant_fee_id" \n
        :return: Return Details about deleted participant fee id
        """
        response = self.blackbaud_service.delete_participant_fee(request.META.get("HTTP_AUTHORIZATION"),
                                                                 kwargs.get("participant_fee_id", None))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='event/create_participant_fee_payment/(?P<participant_id>\d+)')
    def create_participant_fee_payment(self, request, *args, **kwargs):
        """
        To create the participant fee payment  \n
        :headers: "Authorization: Bearer (token)" \n
        :body_params: "payload" \n
        :return: Return Details about participant fee payment
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.blackbaud_service.create_participant_fee_payment(request.META.get("HTTP_AUTHORIZATION"),
                                                                         kwargs.get("participant_id", None),
                                                                         payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['delete'],
            url_path='event/delete_participant_fee_payment/(?P<participant_fee_payment_id>\d+)')
    def delete_a_participant_fee_payment(self, request, *args, **kwargs):
        """
        To delete the participant fee  \n
        :headers: "Authorization: Bearer (token)" \n
        :path_params: "participant_fee_id" \n
        :return: Return Details about deleted participant fee payment message
        """
        response = self.blackbaud_service.delete_participant_fee_payment(request.META.get("HTTP_AUTHORIZATION"),
                                                                         kwargs.get("participant_fee_payment_id", None))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='event/create_event_participant_option/(?P<event_id>\d+)')
    def create_event_participant_option(self, request, *args, **kwargs):
        """
        To create the event participant option  \n
        :headers: "Authorization: Bearer (token)" \n
        :body_params: "payload" \n
        :return: Return Details about event participant option
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.blackbaud_service.create_event_participant_option(request.META.get("HTTP_AUTHORIZATION"),
                                                                          kwargs.get("event_id", None),
                                                                          payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['delete'],
            url_path='event/delete_event_participant_option')
    def delete_event_participant_option(self, request):
        """
        To delete the event participant option  \n
        :headers: "Authorization: Bearer (token)" \n
        :path_params: "option_id" \n
        :return: Return Details about deleted event participant option message
        """
        response = self.blackbaud_service.delete_event_participant_option(request.META.get("HTTP_AUTHORIZATION"),
                                                                          request.data.get('option_id'))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='event/create_participant_option/(?P<participant_id>\d+)')
    def create_participant_option(self, request, *args, **kwargs):
        """
        To create the participant option  \n
        :headers: "Authorization: Bearer (token)" \n
        :body_params: "payload" \n
        :return: Return Details about participant option
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.blackbaud_service.create_participant_option(request.META.get("HTTP_AUTHORIZATION"),
                                                                    kwargs.get("participant_id", None),
                                                                    payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['delete'],
            url_path='event/delete_participant_option')
    def delete_participant_option(self, request):
        """
        To delete the participant option  \n
        :headers: "Authorization: Bearer (token)" \n
        :path_params: "option_id" \n
        :return: Return Details about deleted participant option message
        """
        response = self.blackbaud_service.delete_participant_option(request.META.get("HTTP_AUTHORIZATION"),
                                                                    request.data.get('option_id'))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='event/create_participant_level')
    def create_participant_level(self, request, *args, **kwargs):
        """
        To create the participant level  \n
        :headers: "Authorization: Bearer (token)" \n
        :body_params: "payload" \n
        :return: Return Details about participant level
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.blackbaud_service.create_participant_level(request.META.get("HTTP_AUTHORIZATION"),
                                                                   payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['delete'],
            url_path='event/delete_participant_level/(?P<participation_level_id>\d+)')
    def delete_participant_level(self, request, *args, **kwargs):
        """
        To delete the participant level  \n
        :headers: "Authorization: Bearer (token)" \n
        :path_params: "option_id" \n
        :return: Return Details about deleted participant level message
        """
        response = self.blackbaud_service.delete_participant_level(request.META.get("HTTP_AUTHORIZATION"),
                                                                   kwargs.get('participation_level_id'))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='event/create_event_attachment_upload')
    def create_an_event_attachment_upload(self, request, *args, **kwargs):
        """
        To create the event attachment upload  \n
        :headers: "Authorization: Bearer (token)" \n
        :body_params: "payload" \n
        :return: Return Details about event attachment upload id
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.blackbaud_service.create_event_attachment_upload(request.META.get("HTTP_AUTHORIZATION"),
                                                                         payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='event/create_event_attachment/(?P<event_id>\d+)')
    def create_an_event_attachment(self, request, *args, **kwargs):
        """
        To create the participant attachment  \n
        :headers: "Authorization: Bearer (token)" \n
        :body_params: "payload" \n
        :return: Return Details about participant attachment
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.blackbaud_service.create_event_attachment(request.META.get("HTTP_AUTHORIZATION"),
                                                                  kwargs.get("event_id", None),
                                                                  payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['patch'], url_path='event/edit_participant_details/(?P<participant_id>\d+)')
    def edit_event_participant_detail(self, request, **kwargs):
        """
        To edit the Event Participant \n
        :headers: "Authorization: Bearer (token)" \n
        :path_params: "participant_id" \n
        :return: Returns an event participant details.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.blackbaud_service.edit_event_participant_details(request.META.get("HTTP_AUTHORIZATION"),
                                                                         kwargs.get("participant_id", None),
                                                                         payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['patch'], url_path='event/edit_participant_option')
    def edit_participant_option(self, request, *args, **kwargs):
        """
        To edit the participant option  \n
        :headers: "Authorization: Bearer (token)" \n
        :body_params: "payload" \n
        :return: Return Details about participant option
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.blackbaud_service.edit_event_participant_option(request.META.get("HTTP_AUTHORIZATION"),
                                                                        request.data.get('option_id'),
                                                                        payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['patch'], url_path='event/edit_participant_level/(?P<participation_level_id>\d+)')
    def edit_participant_level(self, request, *args, **kwargs):
        """
        To Edits the details about a participation level.  \n
        :headers: "Authorization: Bearer (token)" \n
        :body_params: "payload" \n
        :path_params: "participation_level_id" \n
        :return: Return Details about participant option
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.blackbaud_service.edit_event_participant_level(request.META.get("HTTP_AUTHORIZATION"),
                                                                       kwargs.get('participation_level_id', None),
                                                                       payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['patch'], url_path='event/edit_event/(?P<event_id>\d+)')
    def edit_an_event(self, request, *args, **kwargs):
        """
        To Edits the details about a event.  \n
        :headers: "Authorization: Bearer (token)" \n
        :body_params: "payload" \n
        :path_params: "event_id" \n
        :return: Return message about edited event
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.blackbaud_service.edit_event(request.META.get("HTTP_AUTHORIZATION"),
                                                     kwargs.get('event_id', None),
                                                     payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['patch'], url_path='event/edit_event_category/(?P<event_category_id>\d+)')
    def edit_an_event_category(self, request, *args, **kwargs):
        """
        To Edits the details about a event.  \n
        :headers: "Authorization: Bearer (token)" \n
        :body_params: "payload" \n
        :path_params: "event_id" \n
        :return: Return message about edited event
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.blackbaud_service.edit_event_category(request.META.get("HTTP_AUTHORIZATION"),
                                                              kwargs.get('event_category_id', None),
                                                              payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['patch'], url_path='event/edit_event_fee/(?P<fee_id>\d+)')
    def edit_an_event_fee(self, request, *args, **kwargs):
        """
        To Edits the event fee.  \n
        :headers: "Authorization: Bearer (token)" \n
        :body_params: "payload" \n
        :path_params: "fee_id" \n
        :return: Return message about edited event fee.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.blackbaud_service.edit_event_fee(request.META.get("HTTP_AUTHORIZATION"),
                                                         kwargs.get('fee_id', None),
                                                         payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['patch'], url_path='event/edit_event_participant_option')
    def edit_an_event_participant_option(self, request, *args, **kwargs):
        """
        To Edits the event participant option.  \n
        :headers: "Authorization: Bearer (token)" \n
        :body_params: "payload" \n
        :path_params: "option_id" \n
        :return: Return message about edited event participant option.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.blackbaud_service.edit_participant_option(request.META.get("HTTP_AUTHORIZATION"),
                                                                  request.data.get('option_id', None),
                                                                  payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='constituent/get_titles')
    def get_constituent_titles(self, request):
        """
        To get the constituent titles \n
        :headers: "Authorization: Bearer (token)" \n
        :return: Return detail about constituent titles.
        """
        response = self.blackbaud_service.constituent_titles(request.META.get("HTTP_AUTHORIZATION"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='constituent/get_suffixes')
    def get_constituent_suffixes(self, request):
        """
        To get the constituent suffixes \n
        :headers: "Authorization: Bearer (token)" \n
        :return: Return detail about constituent suffixes.
        """
        response = self.blackbaud_service.constituent_suffixes(request.META.get("HTTP_AUTHORIZATION"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='constituent/create_relationship')
    def create_constituent_relationship(self, request, *args, **kwargs):
        """
        To create the constituent relationships  \n
        :headers: "Authorization: Bearer (token)" \n
        :body_params: "payload" \n
        :return: Return Details about constituent relationship id
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.blackbaud_service.create_constituent_relationships(request.META.get("HTTP_AUTHORIZATION"),
                                                                           payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['delete'], url_path='constituent/delete_relationship/(?P<relationship_id>\d+)')
    def delete_an_constituent_relationship(self, request, *args, **kwargs):
        """
        To delete the constituent relationship \n
        :headers: "Authorization: Bearer (token)" \n
        :path_params: "relationship_id" \n
        :return: deleted message constituent relationship
        """
        response = self.blackbaud_service.delete_constituent_relationships(request.META.get("HTTP_AUTHORIZATION"),
                                                                           kwargs.get("relationship_id", None))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['patch'], url_path='constituent/edit_relationship/(?P<relationship_id>\d+)')
    def edit_constituent_relationship(self, request, *args, **kwargs):
        """
        To Edits the constituent relationship  \n
        :headers: "Authorization: Bearer (token)" \n
        :body_params: "payload" \n
        :path_params: "relationship_id" \n
        :return: Return message about edited constituent relationship.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.blackbaud_service.edit_constituent_relationships(request.META.get("HTTP_AUTHORIZATION"),
                                                                         kwargs.get('relationship_id', None),
                                                                         payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='constituent/get_relationship_details/(?P<relationship_id>\d+)')
    def get_an_constituent_relationship(self, request, *args, **kwargs):
        """
        To get the relationship details \n
        :headers: "Authorization: Bearer (token)" \n
        :path_params: "relationship_id" \n
        :return: Return detail about relationship details
        """
        response = self.blackbaud_service.constituent_relationships_details(request.META.get("HTTP_AUTHORIZATION"),
                                                                            kwargs.get("relationship_id", None))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='constituent/get_relationship_list_in_all_constituents')
    def get_relationships_list_in_all_constituent(self, request):
        """
        To get the list of relationship in all constituent \n
        :headers: "Authorization: Bearer (token)" \n
        :return: Return list about list of relationship in all constituent.
        """
        response = self.blackbaud_service.relationships_list_in_all_constituent(request.META.get("HTTP_AUTHORIZATION"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'],
            url_path='constituent/get_relationship_list_in_single_constituent/(?P<constituent_id>\d+)')
    def get_relationships_list_in_single_constituent(self, request, *args, **kwargs):
        """
        To get the list of relationship in single constituent \n
        :headers: "Authorization: Bearer (token)" \n
        :path_params: "relationship_id" \n
        :return: Return detail about list of relationship in single constituent.
        """
        response = self.blackbaud_service.relationships_list_in_single_constituent(
            request.META.get("HTTP_AUTHORIZATION"),
            kwargs.get("constituent_id", None))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='constituent/get_relationship_types')
    def get_relationship_types(self, request):
        """
        To get the list of relationship types \n
        :headers: "Authorization: Bearer (token)" \n
        :return: Return list about list of relationship types.
        """
        response = self.blackbaud_service.relationship_types(request.META.get("HTTP_AUTHORIZATION"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='constituent/create_rating')
    def create_an_constituent_rating(self, request):
        """
        To create the constituent rating  \n
        :headers: "Authorization: Bearer (token)" \n
        :body_params: "payload" \n
        :return: Return Details about constituent rating id
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.blackbaud_service.constituent_create_rating(request.META.get("HTTP_AUTHORIZATION"),
                                                                    payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['delete'], url_path='constituent/delete_rating/(?P<rating_id>\d+)')
    def delete_an_constituent_rating(self, request, *args, **kwargs):
        """
        To delete the constituent rating \n
        :headers: "Authorization: Bearer (token)" \n
        :path_params: "rating_id" \n
        :return: deleted message constituent rating
        """
        response = self.blackbaud_service.delete_constituent_relationships(request.META.get("HTTP_AUTHORIZATION"),
                                                                           kwargs.get("rating_id", None))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['patch'], url_path='constituent/update_rating/(?P<rating_id>\d+)')
    def edit_an_constituent_rating(self, request, *args, **kwargs):
        """
        To Edits the constituent rating  \n
        :headers: "Authorization: Bearer (token)" \n
        :body_params: "payload" \n
        :path_params: "relationship_id" \n
        :return: Return message about edited constituent rating.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.blackbaud_service.edit_constituent_rating(request.META.get("HTTP_AUTHORIZATION"),
                                                                  kwargs.get('rating_id', None),
                                                                  payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='constituent/get_rating_categories')
    def get_rating_categories(self, request):
        """
        To get the list of rating categories \n
        :headers: "Authorization: Bearer (token)" \n
        :return: Return list about list of rating categories.
        """
        response = self.blackbaud_service.rating_categories(request.META.get("HTTP_AUTHORIZATION"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='constituent/get_rating_values')
    def get_rating_values(self, request):
        """
        To get the list of rating values \n
        :headers: "Authorization: Bearer (token)" \n
        :return: Return list about list of rating values.
        """
        response = self.blackbaud_service.rating_values(request.META.get("HTTP_AUTHORIZATION"),
                                                        category_name=request.query_params.get('category_name'))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'],
            url_path='constituent/get_rating_list_on_single_constituent/(?P<constituent_id>\d+)')
    def get_rating_list_on_single_constituent(self, request, *args, **kwargs):
        """
        To get the list of rating categories on single constituent \n
        :headers: "Authorization: Bearer (token)" \n
        :return: Return list about list of rating categories on single constituent.
        """
        response = self.blackbaud_service.rating_list_on_single_constituent(request.META.get("HTTP_AUTHORIZATION"),
                                                                            kwargs.get("constituent_id"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='constituent/get_rating_sources')
    def get_rating_sources(self, request, *args, **kwargs):
        """
        To get the list of rating sources \n
        :headers: "Authorization: Bearer (token)" \n
        :return: Return list about list of rating sources.
        """
        response = self.blackbaud_service.rating_source(request.META.get("HTTP_AUTHORIZATION"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='constituent/create_constituent_action')
    def create_constituent_action(self, request):
        """
        To Create a constituent action \n
        :headers: "Authorization: Bearer (token)" \n
        :body_params:payload \n
        :return: created id of action.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.blackbaud_service.create_constituent_action(request.META.get("HTTP_AUTHORIZATION"),
                                                                    payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['delete'], url_path='constituent/delete_constituent_action/(?P<action_id>\d+)')
    def delete_constituent_action(self, request, *args, **kwargs):
        """
        To delete the constituent action \n
        :headers: "Authorization: Bearer (token)" \n
        :path_params: "action_id" \n
        :return: delete message.
        """
        response = self.blackbaud_service.delete_constituent_action(request.META.get("HTTP_AUTHORIZATION"),
                                                                    kwargs.get("action_id", None))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=["patch"], url_path='constituent/update_constituent_action/(?P<action_id>\d+)')
    def update_constituent_action(self, request, *args, **kwargs):
        """
        To Update a constituent action \n
        :headers: "Authorization: Bearer (token)" \n
        :path_params: "action_id" \n
        :body_params:{"category": "", "constituent_id":"", "date":"", "type":"", "status":"", "direction":""} \n
        :return: update message.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.blackbaud_service.update_constituent_action(request.META.get("HTTP_AUTHORIZATION"),
                                                                    kwargs.get("action_id", None),
                                                                    payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=["get"], url_path='constituent/get_constituent_action/(?P<action_id>\d+)')
    def get_constituent_action(self, request, *args, **kwargs):
        """
        To get a constituent action \n
        :headers: "Authorization: Bearer (token)" \n
        :path_params: "action_id" \n
        :return: specified object.
        """
        response = self.blackbaud_service.get_constituent_action(request.META.get("HTTP_AUTHORIZATION"),
                                                                 kwargs.get("action_id", None))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=["post"], url_path='constituent/create_action_attachment')
    def create_constituent_action_attachment(self, request):
        """
        To create a constituent action attachment \n
        :headers: "Authorization: Bearer (token)" \n
        :path_params: {"name":"","parent_id":"","type":"","url":""} \n
        :return: created id of action attachment.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.blackbaud_service.create_constituent_action_attachment(request.META.get("HTTP_AUTHORIZATION"),
                                                                               payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['delete'],
            url_path='constituent/delete_constituent_action_attachment')
    def delete_constituent_action_attachment(self, request):
        """
        To delete the constituent action attachment\n
        :headers: "Authorization: Bearer (token)" \n
        :body_params: "attachment_id" \n
        :return: delete message.
        """
        response = self.blackbaud_service.delete_constituent_action_attachment(request.META.get("HTTP_AUTHORIZATION"),
                                                                               attachment_id=request.query_params.get(
                                                                                   'attachment_id', None))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=["patch"],
            url_path='constituent/update_constituent_action_attachment')
    def update_constituent_action_attachment(self, request):
        """
        To update a constituent action attachment \n
        :headers: "Authorization: Bearer (token)" \n
        :body_params: "attachment_id" \n
        :path_params: {"name":"","parent_id":"","type":"","url":""} \n
        :return: update message.
        """

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.blackbaud_service.patch_constituent_action_attachment(request.META.get("HTTP_AUTHORIZATION"),
                                                                              attachment_id=request.query_params.get(
                                                                                  'attachment_id', None),
                                                                              payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=["get"], url_path='constituent/get_constituent_action/(?P<action_id>\d+)/attachments')
    def get_constituent_action(self, request, *args, **kwargs):
        """
        To get a constituent action \n
        :headers: "Authorization: Bearer (token)" \n
        :path_params: "action_id" \n
        :return: specified object.
        """
        response = self.blackbaud_service.get_constituent_action_attachment_list(request.META.get("HTTP_AUTHORIZATION"),
                                                                                 kwargs.get("action_id", None))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='constituents/create_constituent_action_custom_field')
    def create_constituent_action_custom_field(self, request):
        """
            To create constituent custom field \n
            :headers: "Authorization: Bearer (token)" \n
            :body_params: {"category": "", "comment": "", "parent_id"} \n
            :return: created id of action attachment custom field.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.blackbaud_service.constituent_action_custom_fields(request.META.get("HTTP_AUTHORIZATION"),
                                                                           payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=["get"], url_path='constituent/get_constituent_action_list')
    def get_constituent_action_list(self, request):
        """
        To get a constituent action list \n
        :headers: "Authorization: Bearer (token)" \n
        :path_params: "action_id" \n
        :return: Return action list objects with details.
        """
        response = self.blackbaud_service.constituent_action_list(request.META.get("HTTP_AUTHORIZATION"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=["get"], url_path='constituent/get_constituent_action_location')
    def get_constituent_action_location(self, request):
        """
        To get a constituent action location \n
        :headers: "Authorization: Bearer (token)" \n
        :path_params: "action_id" \n
        :return: Return action list objects with location.
        """
        response = self.blackbaud_service.constituent_action_location(request.META.get("HTTP_AUTHORIZATION"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=["get"], url_path='constituent/get_constituent_action_status_types')
    def get_constituent_action_status_types(self, request):
        """
        To get a constituent action status type \n
        :headers: "Authorization: Bearer (token)" \n
        :path_params: "action_id" \n
        :return: Return action list objects with status types.
        """
        response = self.blackbaud_service.constituent_action_status_types(request.META.get("HTTP_AUTHORIZATION"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=["get"], url_path='constituent/get_constituent_action_types')
    def get_constituent_action_types(self, request):
        """
        To get a constituent action type \n
        :headers: "Authorization: Bearer (token)" \n
        :return: Return action list objects with types.
        """
        response = self.blackbaud_service.constituent_action_types(request.META.get("HTTP_AUTHORIZATION"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['patch'], url_path='constituents/update_constituent_address/(?P<address_id>\d+)')
    def edit_an_constituent_address(self, request, *args, **kwargs):
        """
            To edit constituent address \n
            :headers: "Authorization: Bearer (token)" \n
            :body_params: payload \n
            :return: Edited id of constituent address.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.blackbaud_service.constituent_action_edit_address(request.META.get("HTTP_AUTHORIZATION"),
                                                                          kwargs.get("address_id"),
                                                                          payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))


    @action(detail=False, methods=['patch'], url_path='constituent/edit_constituent_aliases/(?P<alias_id>\d+)')
    def edit_constituent_aliases(self, request, *args, **kwargs):
        """
            To edit constituent aliases \n
            :headers: "Authorization: Bearer (token)" \n
            :body_params: payload \n
            :return: Edited message about constituent aliases.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.blackbaud_service.constituent_edit_aliases(request.META.get("HTTP_AUTHORIZATION"),
                                                                   kwargs.get('alias_id'),
                                                                   payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=["get"], url_path='constituent/get_alias_list_in_single_constituent/(?P<constituent_id>\d+)')
    def get_alias_list_in_single_constituent(self, request, *args, **kwargs):
        """
        To get a alias list in a constituent \n
        :headers: "Authorization: Bearer (token)" \n
        :return: Return alias list in a constituent.
        """
        response = self.blackbaud_service.alias_list_in_single_constituent(request.META.get("HTTP_AUTHORIZATION"),
                                                                           kwargs.get("constituent_id"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=["get"], url_path='constituent/get_alias_types')
    def get_alias_types(self, request):
        """
        To get a alias types \n
        :headers: "Authorization: Bearer (token)" \n
        :return: Return list of alias type .
        """
        response = self.blackbaud_service.constituent_alias_types(request.META.get("HTTP_AUTHORIZATION"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=["get"], url_path='constituent/get_attachment_tags')
    def get_attachment_tags(self, request):
        """
        To get a attachment tags \n
        :headers: "Authorization: Bearer (token)" \n
        :return: Return attachment tags.
        """
        response = self.blackbaud_service.constituent_attachment_tags(request.META.get("HTTP_AUTHORIZATION"))
        return Response(data=response.get("data"), status=response.get("status_code"))
    
    @action(detail=False, methods=['delete'],
            url_path='constituent/delete_constituent_action_custom_field/(?P<custom_field_id>\d+)')
    def delete_constituent_action_custom_field(self, request, *args, **kwargs):
        """
        To delete the constituent action custom field\n
        :headers: "Authorization: Bearer (token)" \n
        :body_params: "custom_field_id" \n
        :return: delete message.
        """
        response = self.blackbaud_service.delete_constituent_action_custom(request.META.get("HTTP_AUTHORIZATION"),
                                                                           kwargs.get("custom_field_id", None))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=["patch"],
            url_path='constituent/update_constituent_action_custom_field/(?P<custom_field_id>\d+)')
    def update_constituent_action_custom_field(self, request, *args, **kwargs):
        """
        To Update a constituent action custom field \n
        :headers: "Authorization: Bearer (token)" \n
        :path_params: "custom_field_id" \n
        :body_params: payload \n
        :return: update message.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.blackbaud_service.update_constituent_action_custom_field(request.META.get("HTTP_AUTHORIZATION"),
                                                                                 kwargs.get("custom_field_id", None),
                                                                                 payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=["get"],
            url_path='constituent/get_constituent_action_customfields_categories')
    def get_constituent_action_customfields_categories(self, request):
        """
        To get a constituent action custom fields categories\n
        :headers: "Authorization: Bearer (token)" \n
        :return: Details about constituent action custom fields categories.
        """
        response = self.blackbaud_service.get_constituent_action_customfields_categories(
            request.META.get("HTTP_AUTHORIZATION"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=["get"],
            url_path='constituent/get_constituent_action_customfields_categories_details')
    def get_constituent_action_customfields_categories_details(self, request):
        """
        To Update a constituent action custom fields categories \n
        :headers: "Authorization: Bearer (token)" \n
        :body_params: payload
        :return: Details of constituent action custom fields categories.
        """
        response = self.blackbaud_service.get_constituent_action_customfields_categories_details(
            request.META.get("HTTP_AUTHORIZATION"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=["get"],
            url_path='constituent/get_constituent_action_customfields_list/(?P<action_id>\d+)')
    def get_constituent_action_customfields_list(self, request, *args, **kwargs):
        """
        To Update a constituent action custom fields list \n
        :headers: "Authorization: Bearer (token)" \n
        :return: Details of constituent action custom fields list.
        """
        response = self.blackbaud_service.get_constituent_action_customfields_list(
            request.META.get("HTTP_AUTHORIZATION"), kwargs.get('action_id', None))
        return Response(data=response.get("data"), status=response.get("status_code"))