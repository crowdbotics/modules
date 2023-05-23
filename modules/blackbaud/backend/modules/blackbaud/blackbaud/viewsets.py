import os
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .services.BlackbaudService import BlackbaudService
from .serializers import CreateConstituentsSerializers, CreateConstituentsAttachmentsSerializers, \
    CreateConstituentsCodeSerializers, CreateConstituentsCustomFieldsSerializers, \
    CreateConstituentsCustomFieldsCollectionSerializers, CreateConstituentDocumentSerializers, \
    CreateConstituentEducationSerializers, CreateConstituentEducationCustomFieldSerializers, \
    CreateConstituentAddressSerializers, CreateConstituentAliasesSerializers, \
    CreateConstituentAliasesCollectionSerializers


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
        "create_constituent_alias_collection": CreateConstituentAliasesCollectionSerializers
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

    @action(detail=False, methods=['delete'], url_path='constituents/delete_attachment/(?P<attachment_id>\d+)')
    def delete_constituent_attachment(self, request, *args, **kwargs):
        """
            To delete constituent attachment \n
            :headers: "Authorization: Bearer (token)" \n
            :path_params: "attachment_id" \n
            :return: Returns delete constituent attachment id.
        """
        response = self.blackbaud_service.delete_constituent_attachment(request.META.get("HTTP_AUTHORIZATION"),
                                                                        kwargs.get("attachment_id", None))
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
        response = self.blackbaud_service.event_participant(request.META.get("HTTP_AUTHORIZATION"),
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
        To get the Event participant Donation \n
        :headers: "Authorization: Bearer (token)" \n
        :path_params: "participant_id" \n
        :return: Returns the donations for a participant.
        """
        response = self.blackbaud_service.event_participant_fee_payments(request.META.get("HTTP_AUTHORIZATION"),
                                                                         kwargs.get('participant_id', None)
                                                                         )
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='event/(?P<participant_id>\d+)/get_event_participant_fees')
    def get_event_participant_fees(self, request, **kwargs):
        """
        To get the Event participant Donation \n
        :headers: "Authorization: Bearer (token)" \n
        :path_params: "participant_id" \n
        :return: Returns the donations for a participant.
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

    @action(detail=False, methods=['delete'], url_path='event/delete_event_participant/(?P<participant_id>\d+)')
    def delete_event_participant(self, request, *args, **kwargs):
        """
        To delete the Event Participant \n
        :headers: "Authorization: Bearer (token)" \n
        :path_params: "participant_id" \n
        :return: Deletes a participant.
        """
        response = self.blackbaud_service.delete_event_participant(request.META.get("HTTP_AUTHORIZATION"),
                                                                   kwargs.get("participant_id", None))
        return Response(data=response.get("data"), status=response.get("status_code"))


    @action(detail=False, methods=['get'], url_path='constituent_search_with_email')
    def constituent_search_with_email(self, request, *args, **kwargs):
        """
        """
        response = self.blackbaud_service.constituent_search_with_email(request.META.get("HTTP_AUTHORIZATION"),
                                                                        kwargs.get('q', None))
        return Response(data=response.get("data"), status=response.get("status_code"))