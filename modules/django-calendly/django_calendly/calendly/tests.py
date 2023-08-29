from unittest import mock

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class CalendlyViewSetTest(APITestCase):

    @mock.patch('modules.django_calendly.calendly.services.calendly.CalendlyService.create_access_token')
    def test_create_access_token(self, create_access_token_mock):
        response = {
            'access_token': '6z12xu9u_GwOuHzC8r7ACzWEnd4Xd_vIl9_eZsBLA93MKg-FL65EWUP9M0ZAadeG3PhDFNd51Mp8_xBI4VdD1g',
            'token_type': 'Bearer', 'expires_in': 7200, 'refresh_token': 'sv3d3daaa33ssyKIPw9xiP4l7UKHmZQRAnc',
            'scope': 'default', 'created_at': 1691434784,
            'owner': 'https://api.calendly.com/users/242b-478d-ae5f-asdghgdwww',
            'organization': 'https://api.calendly.com/organizations/2435f3435gg-354543vss-ss'}
        create_access_token_mock.return_value = response
        data = {
            "grant_type": "authorization_code",
            "code": "demo-code-123",
            "redirect_uri": "https://www.demo.com"
        }
        responses = self.client.post(reverse('calendly_service-create-access-token'), data, format='json')
        self.assertEqual(responses.status_code, status.HTTP_200_OK)
        create_access_token_mock.assert_called_once()

    def test_create_access_token_with_invalid_data(self):
        data = {
            "grant": "authorization_code",
            "code": "demo-code-123",
            "redirect": "https://www.demo.com"
        }
        responses = self.client.post(reverse('calendly_service-create-access-token'), data, format='json')
        self.assertEqual(responses.data['redirect_uri'], ['This field is required.'])
        self.assertEqual(responses.data['grant_type'], ['This field is required.'])
        self.assertEqual(responses.status_code, status.HTTP_400_BAD_REQUEST)

    @mock.patch('modules.django_calendly.calendly.services.calendly.CalendlyService.user_details')
    def test_get_user_details(self, user_details_mock):
        response = {'data': {'resource': {
            'avatar_url': 'https://d3v0px0pttie1i.cloudfront.net/uploads/user/avatar/23067212/a509cd46.jpg',
            'created_at': '2022-12-13T06:46:57.979661Z',
            'current_organization': 'https://api.calendly.com/organizations/abc-absbc-3nd3-ajdaasadjh-w',
            'email': 'test123@gmail.com', 'name': 'John alex',
            'scheduling_url': 'https://calendly.com/john-alex', 'slug': 'john-alex', 'timezone': 'Asia/Karachi',
            'updated_at': '2022-12-28T00:07:47.545012Z',
            'uri': 'https://api.calendly.com/users/bdge3-dgedasd-3e3-33e-hhbbb-ss'}}, 'status_code': 200}
        user_details_mock.return_value = response
        responses = self.client.get(reverse('calendly_service-user-details', kwargs={"params": "me"}))
        self.assertEqual(responses.status_code, status.HTTP_200_OK)
        self.assertEqual(response['data']['resource']['email'], responses.data['resource']['email'])
        self.assertEqual(response['data']['resource']['avatar_url'], responses.data['resource']['avatar_url'])
        user_details_mock.assert_called_once()
        user_details_mock.assert_called_once_with(params="me")

    @mock.patch('modules.django_calendly.calendly.services.calendly.CalendlyService.user_details')
    def test_get_user_details_with_user_id(self, user_details_mock):
        response = {'data': {'resource': {
            'avatar_url': 'https://d3v0px0pttie1i.cloudfront.net/uploads/user/avatar/23067212/a509cd46.jpg',
            'created_at': '2022-12-13T06:46:57.979661Z',
            'current_organization': 'https://api.calendly.com/organizations/abc-absbc-3nd3-ajdaasadjh-w',
            'email': 'test123@gmail.com', 'name': 'John alex',
            'scheduling_url': 'https://calendly.com/john-alex', 'slug': 'john-alex', 'timezone': 'Asia/Karachi',
            'updated_at': '2022-12-28T00:07:47.545012Z',
            'uri': 'https://api.calendly.com/users/bdge3-dgedasd-3e3-33e-hhbbb-ss'}}, 'status_code': 200}
        user_details_mock.return_value = response
        user_id = "bdge3-dgedasd-3e3-33e-hhbbb-ss"
        responses = self.client.get(reverse('calendly_service-user-details', kwargs={"params": user_id}))
        self.assertEqual(responses.status_code, status.HTTP_200_OK)
        self.assertEqual(response['data']['resource']['email'], responses.data['resource']['email'])
        self.assertEqual(response['data']['resource']['avatar_url'], responses.data['resource']['avatar_url'])
        user_details_mock.assert_called_once()
        user_details_mock.assert_called_once_with(params="bdge3-dgedasd-3e3-33e-hhbbb-ss")

    @mock.patch('modules.django_calendly.calendly.services.calendly.CalendlyService.user_details')
    def test_get_user_details_with_invalid_user_id(self, user_details_mock):
        response = {'data': {"message": "Resource not found"}, 'status_code': 404}
        user_details_mock.return_value = response
        user_id = "3e1c14de-01c9-4ea8-faf2b858b580"
        responses = self.client.get(reverse('calendly_service-user-details', kwargs={"params": user_id}))
        self.assertEqual(responses.status_code, status.HTTP_404_NOT_FOUND)
        user_details_mock.assert_called_once()
        user_details_mock.assert_called_once_with(params="3e1c14de-01c9-4ea8-faf2b858b580")

    @mock.patch('modules.django_calendly.calendly.services.calendly.CalendlyService.event_types')
    def test_get_event_types_with_organization(self, event_types_mock):
        response = {'data': {'collection': [
            {'active': False, 'admin_managed': False, 'booking_method': 'instant', 'color': '#8247f5',
             'created_at': '2022-12-13T08:46:28.253950Z', 'custom_questions': [
                {'answer_choices': [], 'enabled': True, 'include_other': False,
                 'name': 'Please share anything that will help prepare for our meeting.', 'position': 0,
                 'required': False, 'type': 'text'}], 'deleted_at': None, 'description_html': None,
             'description_plain': None, 'duration': 30, 'internal_note': None, 'kind': 'solo',
             'kind_description': 'One-on-One', 'name': '30 Minute Meeting', 'pooling_type': None,
             'profile': {'name': 'demo 123',
                         'owner': 'https://api.calendly.com/users/75743257-9734-4110-b0ec-336ccfc6c66f',
                         'type': 'User'}, 'scheduling_url': 'https://calendly.com/demomodule-123/30min',
             'secret': False, 'slug': '30min', 'type': 'StandardEventType', 'updated_at': '2022-12-15T07:01:25.735100Z',
             'uri': 'https://api.calendly.com/event_types/58e353c1-09de-4d52-b854-6d36d711e3f9'},
            {'active': True, 'admin_managed': False, 'booking_method': 'instant', 'color': '#17e885',
             'created_at': '2022-12-13T06:49:03.726668Z', 'custom_questions': [
                {'answer_choices': [], 'enabled': True, 'include_other': False,
                 'name': 'Please share anything that will help prepare for our meeting.', 'position': 0,
                 'required': False, 'type': 'text'}], 'deleted_at': None,
             'description_html': '<p>The meeting will be held in 30 minutes. Everyone be there on time.</p>',
             'description_plain': 'The meeting will be held in 30 minutes. Everyone be there on time.', 'duration': 30,
             'internal_note': None, 'kind': 'solo', 'kind_description': 'One-on-One', 'name': 'Personal Meeting',
             'pooling_type': None, 'profile': {'name': 'John alex',
                                               'owner': 'https://api.calendly.com/users/3e1c14de-01c9-4ea8-a87b-'
                                                        'faf2b858b580',
                                               'type': 'User'},
             'scheduling_url': 'https://calendly.com/john-alex/30min', 'secret': False, 'slug': '30min',
             'type': 'StandardEventType', 'updated_at': '2022-12-16T15:07:24.142672Z',
             'uri': 'https://api.calendly.com/event_types/8hs9ssa-ss777saaa-sssaaa8s'}],
            'pagination': {'count': 4, 'next_page': None, 'next_page_token': None,
                           'previous_page': None, 'previous_page_token': None}}, 'status_code': 200}
        event_types_mock.return_value = response
        query_params = {'organization': ['https://api.calendly.com/organizations/abc-absbc-3nd3-ajdaasadjh-w'],
                        'active': ['true'], 'count': ['10']}
        responses = self.client.get(reverse('calendly_service-event-types'), query_params)
        self.assertEqual(responses.status_code, status.HTTP_200_OK)
        self.assertEqual(responses.data, response['data'])
        event_types_mock.assert_called_once()
        event_types_mock.assert_called_once_with(query_params=query_params)

    @mock.patch('modules.django_calendly.calendly.services.calendly.CalendlyService.event_types')
    def test_get_event_types_with_user(self, event_types_mock):
        response = {'data': {'collection': [
            {'active': True, 'admin_managed': False, 'booking_method': 'instant', 'color': '#17e885',
             'created_at': '2022-12-13T06:49:03.726668Z', 'custom_questions': [
                {'answer_choices': [], 'enabled': True, 'include_other': False,
                 'name': 'Please share anything that will help prepare for our meeting.', 'position': 0,
                 'required': False, 'type': 'text'}], 'deleted_at': None,
             'description_html': '<p>The meeting will be held in 30 minutes. Everyone be there on time.</p>',
             'description_plain': 'The meeting will be held in 30 minutes. Everyone be there on time.', 'duration': 30,
             'internal_note': None, 'kind': 'solo', 'kind_description': 'One-on-One', 'name': 'Personal Meeting',
             'pooling_type': None, 'profile': {'name': 'John alex',
                                               'owner': 'https://api.calendly.com/users/3e1c14de-01c9-4ea8-a87b-'
                                                        'faf2b858b580',
                                               'type': 'User'},
             'scheduling_url': 'https://calendly.com/john-alex/30min', 'secret': False, 'slug': '30min',
             'type': 'StandardEventType', 'updated_at': '2022-12-16T15:07:24.142672Z',
             'uri': 'https://api.calendly.com/event_types/8hs9ssa-ss777saaa-sssaaa8s'}],
            'pagination': {'count': 4, 'next_page': None, 'next_page_token': None,
                           'previous_page': None, 'previous_page_token': None}}, 'status_code': 200}
        event_types_mock.return_value = response
        query_params = {'user': ['https://api.calendly.com/users/abc-absbc-3nd3-ajdaasadjh-w'],
                        'active': ['true'], 'count': ['10']}
        responses = self.client.get(reverse('calendly_service-event-types'), query_params)
        self.assertEqual(responses.status_code, status.HTTP_200_OK)
        self.assertEqual(responses.data, response['data'])
        event_types_mock.assert_called_once()
        event_types_mock.assert_called_once_with(query_params=query_params)

    @mock.patch('modules.django_calendly.calendly.services.calendly.CalendlyService.event_types')
    def test_get_event_types_with_wrong_params(self, event_types_mock):
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}
        event_types_mock.return_value = response
        query_params = {'organization': ['https://api.calendly.com/organizations/abc-absbc-3nd3-ajdaasadjh-w'],
                        'active': ['true'], 'count': ['10']}
        responses = self.client.get(reverse('calendly_service-event-types'), query_params)
        self.assertEqual(responses.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(responses.data, response['data'])
        event_types_mock.assert_called_once()
        event_types_mock.assert_called_once_with(query_params=query_params)

    @mock.patch('modules.django_calendly.calendly.services.calendly.CalendlyService.single_event_types')
    def test_get_single_event_type(self, single_event_types_mock):
        response = {'data': {
            'resource': {'active': False, 'admin_managed': False, 'booking_method': 'instant', 'color': '#e55cff',
                         'created_at': '2022-12-13T09:05:36.970823Z', 'custom_questions': [
                    {'answer_choices': [], 'enabled': True, 'include_other': False,
                     'name': 'Please share anything that will help prepare for our meeting.', 'position': 0,
                     'required': False, 'type': 'text'}], 'deleted_at': None, 'description_html': '<p><br></p>',
                         'description_plain': '', 'duration': 30, 'internal_note': None, 'kind': 'group',
                         'kind_description': 'Group', 'name': 'Demo Collective Event', 'pooling_type': None,
                         'profile': {'name': 'John alex',
                                     'owner': 'https://api.calendly.com/users/bdge3-dgedasd-3e3-33e-hhbbb-ss',
                                     'type': 'User'},
                         'scheduling_url': 'https://calendly.com/john-alex/demo-collective-event', 'secret': False,
                         'slug': 'demo-collective-event', 'type': 'StandardEventType',
                         'updated_at': '2022-12-16T15:07:24.142672Z',
                         'uri': 'https://api.calendly.com/event_types/bdge3-dgedasd-3e3-33e'}},
            'status_code': 200}
        single_event_types_mock.return_value = response
        uuid = 'bdge3-dgedasd-3e3-33e'
        responses = self.client.get(reverse('calendly_service-single-event-types', kwargs={"uuid": uuid}))
        self.assertEqual(responses.status_code, status.HTTP_200_OK)
        self.assertEqual(responses.data, response['data'])
        single_event_types_mock.assert_called_once()
        single_event_types_mock.assert_called_once_with(uuid='bdge3-dgedasd-3e3-33e')

    @mock.patch('modules.django_calendly.calendly.services.calendly.CalendlyService.single_event_types')
    def test_get_single_event_type_with_wrong_uuid(self, single_event_types_mock):
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}
        single_event_types_mock.return_value = response
        uuid = 'bdge3-dgedasd-3e3-33e'
        responses = self.client.get(reverse('calendly_service-single-event-types', kwargs={"uuid": uuid}))
        self.assertEqual(responses.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(responses.data, response['data'])
        single_event_types_mock.assert_called_once()
        single_event_types_mock.assert_called_once_with(uuid='bdge3-dgedasd-3e3-33e')

    @mock.patch('modules.django_calendly.calendly.services.calendly.CalendlyService.event_type_available_times')
    def test_get_event_type_available_times(self, event_type_available_times_mock):
        response = {'data': {
            "collection": [
                {
                    "status": "available",
                    "invitees_remaining": 1,
                    "start_time": "2020-01-03T15:00:00.000000Z",
                    "scheduling_url": "https://calendly.com/acmesales/discovery-call/2020-01-03T15:00:00Z?"
                                      "month=2020-01&date=2020-01-03"
                }
            ]
        },
            'status_code': 200}
        event_type_available_times_mock.return_value = response
        query_params = {
            "start_time": ['2020-01-02T20:00:00.000000Z'],
            "event_type": ['https://api.calendly.com/event_types/bdge3-dgedasd-3e3-33e'],
            "end_time": ['2020-01-07T24:00:00.000000Z']
        }
        responses = self.client.get(reverse('calendly_service-event-type-available-times'), query_params)
        self.assertEqual(responses.data, response['data'])
        self.assertEqual(responses.status_code, status.HTTP_200_OK)
        event_type_available_times_mock.assert_called_once()
        event_type_available_times_mock.assert_called_with(query_params=query_params)

    @mock.patch(
        'modules.django_calendly.calendly.services.calendly.CalendlyService.user_availability_schedules_list')
    def test_get_user_availability_schedules_list(self, user_availability_schedules_list_mock):
        response = {'data': {'collection': [{'default': True, 'name': 'Working hours',
                                             'rules': [
                                                 {'type': 'wday', 'wday': 'friday',
                                                  'intervals': [{'from': '09:00', 'to': '17:00'}]},
                                                 {'type': 'wday', 'wday': 'saturday', 'intervals': []}],
                                             'timezone': 'Asia/Karachi',
                                             'uri': 'https://api.calendly.com/user_availability_schedules/2d647721-'
                                                    '4482-4424-a1f3-41a9cabcce26',
                                             'user': 'https://api.calendly.com/users/3e1c14de-01c9-4ea8-a87b-'
                                                     'faf2b858b580'}]},
                    'status_code': 200}
        user_availability_schedules_list_mock.return_value = response
        query_params = {'user': ['https://api.calendly.com/users/bdge3-dgedasd-3e3-33e-hhbbb-ss'],
                        'event_type': ['https://api.calendly.com/event_types/bdge3-dgedasd-3e3-33e'],
                        'end_time': ['2020-01-07T24:00:00.000000Z']}
        responses = self.client.get(reverse('calendly_service-user-availability-schedules-list'), query_params)
        self.assertEqual(responses.status_code, status.HTTP_200_OK)
        self.assertEqual(responses.data, response['data'])
        user_availability_schedules_list_mock.assert_called_once()
        user_availability_schedules_list_mock.assert_called_once_with(query_params=query_params)

    @mock.patch(
        'modules.django_calendly.calendly.services.calendly.CalendlyService.user_availability_schedules_list')
    def test_user_availability_schedules_list_with_wrong_user_id(self, user_availability_schedules_list_mock):
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}
        user_availability_schedules_list_mock.return_value = response
        query_params = {'user': ['https://api.calendly.com/users/bdge3-dgedasd-3e3-33e-hhbbb-ss']}
        responses = self.client.get(reverse('calendly_service-user-availability-schedules-list'), query_params)
        self.assertEqual(responses.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(responses.data, response['data'])
        user_availability_schedules_list_mock.assert_called_once()
        user_availability_schedules_list_mock.assert_called_once_with(query_params=query_params)

    @mock.patch(
        'modules.django_calendly.calendly.services.calendly.CalendlyService.user_availability_schedules_list')
    def test_user_availability_schedules_list_without_user_id(self, user_availability_schedules_list_mock):
        response = {'data': {'details': [{'message': 'invalid', 'parameter': 'user'}],
                             'message': 'The supplied parameters are invalid.', 'title': 'Invalid Argument'},
                    'status_code': 400}
        user_availability_schedules_list_mock.return_value = response
        responses = self.client.get(reverse('calendly_service-user-availability-schedules-list'))
        self.assertEqual(responses.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(responses.data, response['data'])
        user_availability_schedules_list_mock.assert_called_once()
        user_availability_schedules_list_mock.assert_called_once_with(query_params={})

    @mock.patch('modules.django_calendly.calendly.services.calendly.CalendlyService.remove_invitees')
    def test_remove_invitees(self, remove_invitees_mock):
        response = {
            "data": {
                "message": "Item deleted successfully."
            },
            "status_code": 204
        }
        remove_invitees_mock.return_value = response
        data = {
            "emails": [
                "test@example.com"
            ]
        }
        responses = self.client.post(reverse('calendly_service-remove-invitees'), data=data, format='json')
        self.assertEqual(responses.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(responses.data, response['data'])
        self.assertEqual(responses.data['message'], response['data']['message'])
        remove_invitees_mock.assert_called_once()
        remove_invitees_mock.assert_called_once_with(payload=data)

    @mock.patch('modules.django_calendly.calendly.services.calendly.CalendlyService.remove_invitees')
    def test_remove_invitees_with_wrong_email(self, remove_invitees_mock):
        response = {
            "data": {
                "message": "Resource not found"
            },
            "status_code": 404
        }
        remove_invitees_mock.return_value = response
        data = {
            "emails": [
                "test@example.com"
            ]
        }
        responses = self.client.post(reverse('calendly_service-remove-invitees'), data=data, format='json')
        self.assertEqual(responses.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(responses.data, response['data'])
        self.assertEqual(responses.data['message'], response['data']['message'])
        remove_invitees_mock.assert_called_once()
        remove_invitees_mock.assert_called_once_with(payload=data)

    def test_remove_invitees_with_invalid_email(self):
        data = {
            "emails": [
                "testexample.com"
            ]
        }
        response = self.client.post(reverse('calendly_service-remove-invitees'), data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @mock.patch('modules.django_calendly.calendly.services.calendly.CalendlyService.remove_invitees')
    def test_remove_invitees_with_non_upgrade_account_email(self, remove_invitees_mock):
        response = {
            'data': {
                'title': 'Permission Denied',
                'message': 'Please upgrade your Calendly account to Enterprise.'
            },
            'status_code': 403
        }
        remove_invitees_mock.return_value = response
        data = {
            "emails": [
                "test@example.com"
            ]
        }
        responses = self.client.post(reverse('calendly_service-remove-invitees'), data=data, format='json')
        self.assertEqual(responses.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(responses.data, response['data'])
        self.assertEqual(responses.data['message'], response['data']['message'])
        self.assertEqual(responses.data['title'], response['data']['title'])
        remove_invitees_mock.assert_called_once()
        remove_invitees_mock.assert_called_once_with(payload=data)

    @mock.patch('modules.django_calendly.calendly.services.calendly.CalendlyService.organization_'
                'invitations_list')
    def test_get_organization_invitations_list(self, organization_invitations_list_mock):
        response = {
            'data': {
                'collection': [{
                    'created_at': '2022-12-13T08:45:07.549779Z',
                    'email': 'demomodule.123@gmail.com',
                    'last_sent_at': '2022-12-13T08:45:07.617744Z',
                    'organization': 'https://api.calendly.com/organizations/abc-absbc-3nd3-ajdaasadjh-w',
                    'status': 'accepted', 'updated_at': '2022-12-13T08:46:04.723714Z',
                    'uri': 'https://api.calendly.com/organizations/abc-absbc-3nd3-ajdaasadjh-w/invitations/'
                           '8hs9ssa-ss777saaa-sssaaa8s',
                    'user': 'https://api.calendly.com/users/75743257-9734-4110-b0ec-336ccfc6c66f'}],
                'pagination': {'count': 3, 'next_page': None, 'next_page_token': None,
                               'previous_page': None, 'previous_page_token': None}}, 'status_code': 200}
        organization_invitations_list_mock.return_value = response
        uuid = 'abc-absbc-3nd3-ajdaasadjh-w'
        responses = self.client.get(reverse('calendly_service-organization-invitations-list', kwargs={"uuid": uuid}))
        self.assertEqual(responses.status_code, status.HTTP_200_OK)
        self.assertEqual(responses.data, response['data'])
        self.assertEqual(response['data']['collection'][0]['organization'],
                         responses.data['collection'][0]['organization'])
        self.assertEqual(response['data']['pagination'], responses.data['pagination'])
        self.assertEqual(responses.data['pagination']['next_page'], response['data']['pagination']['next_page'])
        organization_invitations_list_mock.assert_called_once()
        organization_invitations_list_mock.assert_called_once_with(uuid='abc-absbc-3nd3-ajdaasadjh-w',
                                                                   query_params={})

    @mock.patch('modules.django_calendly.calendly.services.calendly.CalendlyService.organization_'
                'invitations_list')
    def test_get_organization_invitations_list_with_wrong_uuid(self, organization_invitations_list_mock):
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}
        organization_invitations_list_mock.return_value = response
        uuid = 'abc-absbc-3nd3-ajdaasadjh-w'
        responses = self.client.get(reverse('calendly_service-organization-invitations-list', kwargs={"uuid": uuid}))
        self.assertEqual(responses.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(responses.data, response['data'])
        self.assertEqual(responses.data['message'], response['data']['message'])
        organization_invitations_list_mock.assert_called_once()
        organization_invitations_list_mock.assert_called_once_with(uuid='abc-absbc-3nd3-ajdaasadjh-w',
                                                                   query_params={})

    @mock.patch('modules.django_calendly.calendly.services.calendly.CalendlyService.scheduled_events_list')
    def test_get_scheduled_events_list(self, organization_invitations_list_mock):
        response = {'data': {'collection': [
            {'calendar_event': {'external_id': '5ko90pgih0i93mn1ft43n9omlo', 'kind': 'google'},
             'cancellation': {'canceler_type': 'host', 'canceled_by': 'John alex', 'reason': ''},
             'created_at': '2022-12-13T15:17:03.451984Z', 'end_time': '2022-12-14T07:00:00.000000Z', 'event_guests': [],
             'event_memberships': [{'user': 'https://api.calendly.com/users/bdge3-dgedasd-3e3-33e-hhbbb-ss'}],
             'event_type': 'https://api.calendly.com/event_types/bdge3-dgedasd-3e3-33e',
             'invitees_counter': {'active': 0, 'limit': 100, 'total': 1},
             'location': {'location': 'New york, united states', 'type': 'physical'}, 'name': 'Demo Collective Event',
             'start_time': '2022-12-14T06:30:00.000000Z', 'status': 'canceled',
             'updated_at': '2022-12-13T22:36:42.323150Z',
             'uri': 'https://api.calendly.com/scheduled_events/ca78db62-4c0b-4c17-963a-e2c505b89086'}],
            'pagination': {'count': 16, 'next_page': None, 'next_page_token': None,
                           'previous_page': None, 'previous_page_token': None}}, 'status_code': 200}
        organization_invitations_list_mock.return_value = response
        query_params = {'organization': ['https://api.calendly.com/organizations/abc-absbc-3nd3-ajdaasadjh-w']}
        responses = self.client.get(reverse('calendly_service-scheduled-events-list'), query_params)
        self.assertEqual(responses.status_code, status.HTTP_200_OK)
        self.assertEqual(responses.data, response['data'])
        self.assertEqual(responses.data['collection'][00]['calendar_event']['kind'],
                         response['data']['collection'][00]['calendar_event']['kind'])
        self.assertEqual(responses.data['pagination']['next_page'], response['data']['pagination']['next_page'])
        organization_invitations_list_mock.assert_called_once()
        organization_invitations_list_mock.assert_called_once_with(query_params=query_params)

    @mock.patch('modules.django_calendly.calendly.services.calendly.CalendlyService.scheduled_events_list')
    def test_scheduled_events_list_with_wrong_params(self, organization_invitations_list_mock):
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}
        organization_invitations_list_mock.return_value = response
        query_params = {'organization': ['https://api.calendly.com/organizations/abc-absbc-3nd3-ajdaasadjh-w']}
        responses = self.client.get(reverse('calendly_service-scheduled-events-list'), query_params)
        self.assertEqual(responses.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(responses.data, response['data'])
        self.assertEqual(responses.data['message'], response['data']['message'])
        organization_invitations_list_mock.assert_called_once()
        organization_invitations_list_mock.assert_called_once_with(query_params=query_params)

    @mock.patch('modules.django_calendly.calendly.services.calendly.CalendlyService.single_user_availability'
                '_schedules')
    def test_get_single_user_availability_schedules(self, single_user_availability_schedules_mock):
        response = {'data': {'resource': {'default': True, 'name': 'Working hours',
                                          'rules': [
                                              {'type': 'wday', 'wday': 'thursday',
                                               'intervals': [{'from': '09:00', 'to': '17:00'}]},
                                              {'type': 'wday', 'wday': 'friday',
                                               'intervals': [{'from': '09:00', 'to': '17:00'}]},
                                              {'type': 'wday', 'wday': 'saturday', 'intervals': []}],
                                          'timezone': 'Asia/Karachi',
                                          'uri': 'https://api.calendly.com/user_availability_schedules/2d647721-4482'
                                                 '-4424-a1f3-41a9cabcce26',
                                          'user': 'https://api.calendly.com/users/bdge3-dgedasd-3e3-33e-hhbbb-ss'}},
                    'status_code': 200}

        single_user_availability_schedules_mock.return_value = response
        uuid = '2d647721-4482-4424-a1f3-41a9cabcce26'
        responses = self.client.get(
            reverse('calendly_service-single-user-availability-schedules', kwargs={"uuid": uuid}))
        self.assertEqual(responses.status_code, status.HTTP_200_OK)
        self.assertEqual(responses.data, response['data'])
        self.assertEqual(responses.data['resource']['name'], response['data']['resource']['name'])
        self.assertEqual(responses.data['resource']['rules'], response['data']['resource']['rules'])
        self.assertEqual(responses.data['resource']['timezone'], response['data']['resource']['timezone'])
        self.assertEqual(responses.data['resource']['uri'], response['data']['resource']['uri'])
        single_user_availability_schedules_mock.assert_called_once()
        single_user_availability_schedules_mock.assert_called_once_with(uuid='2d647721-4482-4424-a1f3-41a9cabcce26')

    @mock.patch('modules.django_calendly.calendly.services.calendly.CalendlyService.single_user_'
                'availability_schedules')
    def test_get_single_user_availability_schedules_with_wrong_uuid(self, single_user_availability_schedules_mock):
        """
        Test single user availability schedules with invalid uuid and check the response
        """
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}
        single_user_availability_schedules_mock.return_value = response
        uuid = '2d647721-4482-4424-a1f3-41a9cabcce26'
        responses = self.client.get(
            reverse('calendly_service-single-user-availability-schedules', kwargs={"uuid": uuid}))
        self.assertEqual(responses.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(responses.data, response['data'])
        self.assertEqual(responses.data['message'], response['data']['message'])
        single_user_availability_schedules_mock.assert_called_once()
        single_user_availability_schedules_mock.assert_called_once_with(uuid='2d647721-4482-4424-a1f3-41a9cabcce26')

    @mock.patch('modules.django_calendly.calendly.services.calendly.CalendlyService.invite_user_organizations')
    def test_invite_user_organizations(self, invite_user_organizations_mock):
        response = {'data': {
            'resource': {'created_at': '2023-01-12T14:38:04.696507Z', 'email': 'saad.abi@crowdbotics.com',
                         'last_sent_at': '2023-01-12T14:38:04.754166Z',
                         'organization': 'https://api.calendly.com/organizations/382103e900d5-48335900-hg35sf',
                         'status': 'pending', 'updated_at': '2023-01-12T14:38:04.754625Z',
                         'uri': 'https://api.calendly.com/organizations/382103e900d5-48335900-hg35sf/'
                                'invitations/382103e900d5-hg35sf-48335900'}}, 'status_code': 201}
        invite_user_organizations_mock.return_value = response
        uuid = '382103e900d5-48335900-hg35sf'
        data = {
            "email": "test123@gmail.com"
        }
        responses = self.client.post(reverse('calendly_service-invite-user-organizations', kwargs={"uuid": uuid}),
                                     data=data,
                                     format='json')
        self.assertEqual(responses.status_code, status.HTTP_201_CREATED)
        self.assertEqual(responses.data, response['data'])
        self.assertEqual(responses.data['resource']['email'], response['data']['resource']['email'])
        self.assertEqual(responses.data['resource']['organization'], response['data']['resource']['organization'])
        invite_user_organizations_mock.assert_called_once()
        invite_user_organizations_mock.assert_called_once_with(uuid='382103e900d5-48335900-hg35sf', payload=data)

    @mock.patch('modules.django_calendly.calendly.services.calendly.CalendlyService.invite_user_'
                'organizations')
    def test_invite_user_organizations_with_wrong_uuid(self, invite_user_organizations_mock):
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}
        invite_user_organizations_mock.return_value = response
        uuid = '382103e900d5-48335900-hg35sf'
        data = {
            "email": "test123@gmail.com"
        }
        responses = self.client.post(reverse('calendly_service-invite-user-organizations', kwargs={"uuid": uuid}),
                                     data=data,
                                     format='json')
        self.assertEqual(responses.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(responses.data, response['data'])
        self.assertEqual(responses.data['message'], response['data']['message'])
        invite_user_organizations_mock.assert_called_once()
        invite_user_organizations_mock.assert_called_once_with(uuid='382103e900d5-48335900-hg35sf', payload=data)

    def test_invite_user_organizations_with_wrong_data(self):
        uuid = '382103e900d5-48335900-hg35sf'
        data = {
            "email": "demomodule.123gmail.com"
        }
        responses = self.client.post(reverse('calendly_service-invite-user-organizations', kwargs={"uuid": uuid}),
                                     data=data,
                                     format='json')
        self.assertEqual(responses.status_code, status.HTTP_400_BAD_REQUEST)

    @mock.patch('modules.django_calendly.calendly.services.calendly.CalendlyService.revoke_user_'
                'organization_invitation')
    def test_revoke_user_organization_invitation(self, revoke_user_organization_invitation_mock):
        response = {'data': {'message': 'Item deleted successfully.'}, 'status_code': 204}
        revoke_user_organization_invitation_mock.return_value = response
        org_uuid = "382103e900d5-48335900-hg35sf"
        uuid = "382103e900d5-hg35sf-48335900"
        responses = self.client.delete(reverse('calendly_service-revoke-user-organization-invitation',
                                               kwargs={"uuid": uuid, "org_uuid": org_uuid}))
        self.assertEqual(responses.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(responses.data, response['data'])
        self.assertEqual(responses.data['message'], response['data']['message'])
        revoke_user_organization_invitation_mock.assert_called_once()
        revoke_user_organization_invitation_mock.assert_called_once_with(org_uuid='382103e900d5-48335900-hg35sf',
                                                                         uuid='382103e900d5-hg35sf-48335900')

    @mock.patch('modules.django_calendly.calendly.services.calendly.CalendlyService.revoke_user_organization_'
                'invitation')
    def test_revoke_user_organization_invitation_with_invalid_uuid(self, revoke_user_organization_invitation_mock):
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}
        revoke_user_organization_invitation_mock.return_value = response
        org_uuid = "382103e900d5-48335900-hg35sf"
        uuid = "382103e900d5-hg35sf-48335900"
        responses = self.client.delete(reverse('calendly_service-revoke-user-organization-invitation',
                                               kwargs={"uuid": uuid, "org_uuid": org_uuid}))
        self.assertEqual(responses.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(responses.data, response['data'])
        self.assertEqual(responses.data['message'], response['data']['message'])
        revoke_user_organization_invitation_mock.assert_called_once()
        revoke_user_organization_invitation_mock.assert_called_once_with(org_uuid='382103e900d5-48335900-hg35sf',
                                                                         uuid='382103e900d5-hg35sf-48335900')

    @mock.patch('modules.django_calendly.calendly.services.calendly.CalendlyService.single_organization_'
                'invitation')
    def test_single_organization_invitation(self, single_organization_invitation_mock):
        response = {'data': {'resource': {'created_at': '2023-01-12T14:18:03.743223Z', 'email': 'john@example.com',
                                          'last_sent_at': '2023-01-12T14:18:03.817437Z',
                                          'organization': 'https://api.calendly.com/organizations/48335900-a45e-47a5'
                                                          '-bfcc-382103e900d5',
                                          'status': 'pending', 'updated_at': '2023-01-12T14:18:03.818187Z',
                                          'uri': 'https://api.calendly.com/organizations/48335900-a45e-47a5-bfcc'
                                                 '-382103e900d5/invitations/c7197e99-32f1-4679-9ca5-80b0ba41ef89'}},
                    'status_code': 200}
        single_organization_invitation_mock.return_value = response
        org_uuid = "382103e900d5-48335900-hg35sf"
        uuid = "382103e900d5-hg35sf-48335900"
        responses = self.client.get(
            reverse('calendly_service-single-organization-invitation', kwargs={"uuid": uuid, "org_uuid": org_uuid}))
        self.assertEqual(responses.status_code, status.HTTP_200_OK)
        self.assertEqual(responses.data, response['data'])
        self.assertEqual(responses.data['resource']['email'], response['data']['resource']['email'])
        self.assertEqual(responses.data['resource']['last_sent_at'], response['data']['resource']['last_sent_at'])
        self.assertEqual(responses.data['resource']['organization'], response['data']['resource']['organization'])
        single_organization_invitation_mock.assert_called_once()
        single_organization_invitation_mock.assert_called_once_with(org_uuid='382103e900d5-48335900-hg35sf',
                                                                    uuid='382103e900d5-hg35sf-48335900')

    @mock.patch(
        'modules.django_calendly.calendly.services.calendly.CalendlyService.single_organization_invitation')
    def test_single_organization_invitation_with_wrong_uuid(self, single_organization_invitation_mock):
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}
        single_organization_invitation_mock.return_value = response
        org_uuid = "382103e900d5-48335900-hg35sf"
        uuid = "382103e900d5-hg35sf-48335900"
        responses = self.client.get(
            reverse('calendly_service-single-organization-invitation', kwargs={"uuid": uuid, "org_uuid": org_uuid}))
        self.assertEqual(responses.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(responses.data, response['data'])
        self.assertEqual(responses.data['message'], response['data']['message'])
        single_organization_invitation_mock.assert_called_once()
        single_organization_invitation_mock.assert_called_once_with(org_uuid='382103e900d5-48335900-hg35sf',
                                                                    uuid='382103e900d5-hg35sf-48335900')

    @mock.patch('modules.django_calendly.calendly.services.calendly.CalendlyService.organization_membership')
    def test_organization_membership(self, organization_membership_mock):
        response = {'data': {
            "resource": {
                "uri": "https://api.calendly.com/organization_memberships/AAAAAAAAAAAAAAAA",
                "role": "admin",
                "user": {
                    "uri": "https://api.calendly.com/users/AAAAAAAAAAAAAAAA",
                    "name": "John Doe",
                    "slug": "acmesales",
                    "email": "test@example.com",
                    "scheduling_url": "https://calendly.com/acmesales",
                    "timezone": "America/New York",
                    "avatar_url": "https://01234567890.cloudfront.net/uploads/user/avatar/0123456/a1b2c3d4.png",
                    "created_at": "2019-01-02T03:04:05.678123Z",
                    "updated_at": "2019-08-07T06:05:04.321123Z"
                },
                "organization": "https://api.calendly.com/organizations/AAAAAAAAAAAAAAAA",
                "updated_at": "2019-08-07T06:05:04.321123Z",
                "created_at": "2019-01-02T03:04:05.678123Z"
            }
        }, 'status_code': 200}
        organization_membership_mock.return_value = response
        uuid = 'bdge3-dgedasd-3e3-33e-hhbbb-ss'
        responses = self.client.get(reverse('calendly_service-organization-membership', kwargs={"uuid": uuid}))
        self.assertEqual(responses.status_code, status.HTTP_200_OK)
        self.assertEqual(responses.data['resource']['user'], response['data']['resource']['user'])
        self.assertEqual(responses.data['resource']['organization'], response['data']['resource']['organization'])
        organization_membership_mock.assert_called_once()
        organization_membership_mock.assert_called_once_with(uuid='bdge3-dgedasd-3e3-33e-hhbbb-ss')

    @mock.patch(
        'modules.django_calendly.calendly.services.calendly.CalendlyService.organization_memberships_list')
    def test_organization_memberships_list(self, organization_memberships_list_mock):
        response = {'data': {
            "collection": [
                {
                    "created_at": "2023-01-12T13:56:47.079767Z",
                    "organization": "https://api.calendly.com/organizations/382103e900d5-48335900-hg35sf",
                    "role": "owner",
                    "updated_at": "2023-01-12T13:56:47.079767Z",
                    "uri": "https://api.calendly.com/organization_memberships/47fe2e25-11bc-4c2d-9538-962762d31418",
                    "user": {
                        "avatar_url": 'null',
                        "created_at": "2023-01-12T13:56:47.038529Z",
                        "email": "demomodule.123@gmail.com",
                        "name": "demo 123",
                        "scheduling_url": "https://calendly.com/demomodule-123",
                        "slug": "demomodule-123",
                        "timezone": "Asia/Karachi",
                        "updated_at": "2023-01-12T13:57:30.163935Z",
                        "uri": "https://api.calendly.com/users/4a7bf33a-242b-478d-ae5f-10bbd271be33"
                    }
                }
            ],
            "pagination": {
                "count": 1,
                "next_page": 'null',
                "next_page_token": 'null',
                "previous_page": 'null',
                "previous_page_token": 'null'
            }
        }, "status_code": 200}
        organization_memberships_list_mock.return_value = response
        query_params = {'organization': ['https://api.calendly.com/organizations/382103e900d5-48335900-hg35sf']}
        responses = self.client.get(reverse('calendly_service-organization-memberships-list'), query_params)
        self.assertEqual(responses.status_code, status.HTTP_200_OK)
        self.assertEqual(responses.data, response['data'])
        self.assertEqual(responses.data['collection'][0]['organization'],
                         response['data']['collection'][0]['organization'])
        self.assertEqual(responses.data['collection'][0]['role'], response['data']['collection'][0]['role'])
        self.assertEqual(responses.data['pagination']['next_page'], response['data']['pagination']['next_page'])
        organization_memberships_list_mock.assert_called_once()
        organization_memberships_list_mock.assert_called_once_with(query_params=query_params)

    @mock.patch(
        'modules.django_calendly.calendly.services.calendly.CalendlyService.organization_memberships_list')
    def test_organization_memberships_list_with_wrong_organization_uuid(self, organization_memberships_list_mock):
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}
        organization_memberships_list_mock.return_value = response
        query_params = {'organization': ['https://api.calendly.com/organizations/382103e900d5-48335900-hg35sf']}
        responses = self.client.get(reverse('calendly_service-organization-memberships-list'), query_params)
        self.assertEqual(responses.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(responses.data, response['data'])
        self.assertEqual(responses.data['message'], response['data']['message'])
        organization_memberships_list_mock.assert_called_once()
        organization_memberships_list_mock.assert_called_once_with(query_params=query_params)

    @mock.patch(
        'modules.django_calendly.calendly.services.calendly.CalendlyService.remove_user_organization_membership')
    def test_remove_user_organization_membership(self, remove_user_organization_membership_mock):
        response = {'data': {'message': 'Item deleted successfully.'}, 'status_code': 204}
        remove_user_organization_membership_mock.return_value = response
        uuid = '47fe2e25-11bc-4c2d-9538-962762d31418'
        responses = self.client.delete(
            reverse('calendly_service-remove-user-organization-membership', kwargs={"uuid": uuid}))
        self.assertEqual(responses.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(responses.data, response['data'])
        self.assertEqual(responses.data['message'], response['data']['message'])
        remove_user_organization_membership_mock.assert_called_once()
        remove_user_organization_membership_mock.assert_called_once_with(uuid='47fe2e25-11bc-4c2d-9538-962762d31418')

    @mock.patch(
        'modules.django_calendly.calendly.services.calendly.CalendlyService.remove_user_organization_membership')
    def test_remove_user_organization_membership_with_invalid_uuid(self, remove_user_organization_membership_mock):
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}
        remove_user_organization_membership_mock.return_value = response
        uuid = '47fe2e25-11bc-4c2d-9538-962762d31418'
        responses = self.client.delete(
            reverse('calendly_service-remove-user-organization-membership', kwargs={"uuid": uuid}))
        self.assertEqual(responses.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(responses.data, response['data'])
        self.assertEqual(responses.data['message'], response['data']['message'])
        remove_user_organization_membership_mock.assert_called_once()
        remove_user_organization_membership_mock.assert_called_once_with(uuid='47fe2e25-11bc-4c2d-9538-962762d31418')

    @mock.patch(
        'modules.django_calendly.calendly.services.calendly.CalendlyService.scheduled_event_invitees')
    def test_scheduled_event_invitees(self, scheduled_event_invitees_mock):
        response = {'data': {'collection': [
            {'cancel_url': 'https://calendly.com/cancellations/7dbb53ac-7ye3aaa-sssaaa8s-5ggts5ssa77',
             'created_at': '2023-01-12T16:10:55.264711Z', 'email': 'demomodule.123@gmail.com',
             'event': 'https://api.calendly.com/scheduled_events/8hs9ssa-ss777saaa-sssaaa8s-5ggts5ssa77',
             'first_name': None, 'last_name': None, 'name': 'Tomorrow events 2', 'new_invitee': None, 'no_show': None,
             'old_invitee': None, 'payment': None, 'questions_and_answers': [], 'reconfirmation': None,
             'reschedule_url': 'https://calendly.com/reschedulings/7dbb53ac-7ye3aaa-sssaaa8s-5ggts5ssa77',
             'rescheduled': False, 'routing_form_submission': None, 'status': 'active', 'text_reminder_number': None,
             'timezone': 'Asia/Karachi',
             'tracking': {'utm_campaign': None, 'utm_source': None, 'utm_medium': None, 'utm_content': None,
                          'utm_term': None, 'salesforce_uuid': None}, 'updated_at': '2023-01-12T16:10:55.264711Z',
             'uri': 'https://api.calendly.com/scheduled_events/8hs9ssa-ss777saaa-sssaaa8s-5ggts5ssa77/invitees/7dbb53ac'
                    '-7ye3aaa-sssaaa8s-5ggts5ssa77'}],
            'pagination': {'count': 1, 'next_page': None, 'next_page_token': None,
                           'previous_page': None, 'previous_page_token': None}}, 'status_code': 200}
        scheduled_event_invitees_mock.return_value = response
        uuid = '8hs9ssa-ss777saaa-sssaaa8s-5ggts5ssa77'
        responses = self.client.get(reverse('calendly_service-scheduled-event-invitees', kwargs={"uuid": uuid}))
        self.assertEqual(responses.status_code, status.HTTP_200_OK)
        self.assertEqual(responses.data, response['data'])
        self.assertEqual(responses.data['collection'][0]['email'], response['data']['collection'][0]['email'])
        self.assertEqual(responses.data['collection'][0]['old_invitee'],
                         response['data']['collection'][0]['old_invitee'])
        self.assertEqual(responses.data['collection'][0]['reschedule_url'],
                         response['data']['collection'][0]['reschedule_url'])
        scheduled_event_invitees_mock.assert_called_once()
        scheduled_event_invitees_mock.assert_called_once_with(uuid='8hs9ssa-ss777saaa-sssaaa8s-5ggts5ssa77',
                                                              query_params={})

    @mock.patch(
        'modules.django_calendly.calendly.services.calendly.CalendlyService.scheduled_event_invitees')
    def test_scheduled_event_invitees_with_invalid_uuid(self, scheduled_event_invitees_mock):
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}
        scheduled_event_invitees_mock.return_value = response
        uuid = '8hs9ssa-ss777saaa-sssaaa8s-5ggts5ssa77'
        responses = self.client.get(reverse('calendly_service-scheduled-event-invitees', kwargs={"uuid": uuid}))
        self.assertEqual(responses.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(responses.data, response['data'])
        self.assertEqual(responses.data['message'], response['data']['message'])
        scheduled_event_invitees_mock.assert_called_once()
        scheduled_event_invitees_mock.assert_called_once_with(uuid='8hs9ssa-ss777saaa-sssaaa8s-5ggts5ssa77',
                                                              query_params={})

    @mock.patch('modules.django_calendly.calendly.services.calendly.CalendlyService.single_scheduled_event')
    def test_single_scheduled_event(self, single_scheduled_event_mock):
        response = {'data': {
            "resource": {
                "calendar_event": {
                    "external_id": "1r82jjm36k5ilo3tduri5l4mgc",
                    "kind": "google"
                },
                "created_at": "2023-01-12T16:10:55.252028Z",
                "end_time": "2023-01-26T07:30:00.000000Z",
                "event_guests": [],
                "event_memberships": [
                    {
                        "user": "https://api.calendly.com/users/4a7bf33a-242b-478d-ae5f-10bbd271be33"
                    }
                ],
                "event_type": "https://api.calendly.com/event_types/941cc520-6a65-4045-9d8a-001997ce0b78",
                "invitees_counter": {
                    "active": 1,
                    "limit": 1,
                    "total": 1
                },
                "location": {
                    "location": 'null',
                    "type": "custom"
                },
                "name": "30 Minute Meeting",
                "start_time": "2023-01-26T07:00:00.000000Z",
                "status": "active",
                "updated_at": "2023-01-12T16:10:56.094052Z",
                "uri": "https://api.calendly.com/scheduled_events/8hs9ssa-ss777saaa-sssaaa8s-5ggts5ssa77"
            }
        }}
        single_scheduled_event_mock.return_value = response
        uuid = '8hs9ssa-ss777saaa-sssaaa8s-5ggts5ssa77'
        responses = self.client.get(reverse('calendly_service-single-scheduled-event', kwargs={"uuid": uuid}))
        self.assertEqual(responses.status_code, status.HTTP_200_OK)
        self.assertEqual(responses.data, response['data'])
        self.assertEqual(responses.data['resource']['end_time'], response['data']['resource']['end_time'])
        self.assertEqual(responses.data['resource']['event_guests'], response['data']['resource']['event_guests'])
        single_scheduled_event_mock.assert_called_once()
        single_scheduled_event_mock.assert_called_once_with(uuid='8hs9ssa-ss777saaa-sssaaa8s-5ggts5ssa77')

    @mock.patch('modules.django_calendly.calendly.services.calendly.CalendlyService.single_scheduled_event')
    def test_single_scheduled_event_with_invalid_uuid(self, single_scheduled_event_mock):
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}
        single_scheduled_event_mock.return_value = response
        uuid = '8hs9ssa-ss777saaa-sssaaa8s-5ggts5ssa77'
        responses = self.client.get(reverse('calendly_service-single-scheduled-event', kwargs={"uuid": uuid}))
        self.assertEqual(responses.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(responses.data, response['data'])
        self.assertEqual(responses.data['message'], response['data']['message'])
        single_scheduled_event_mock.assert_called_once()
        single_scheduled_event_mock.assert_called_once_with(uuid='8hs9ssa-ss777saaa-sssaaa8s-5ggts5ssa77')

    @mock.patch('modules.django_calendly.calendly.services.calendly.CalendlyService.user_busy_times')
    def test_user_busy_times(self, user_busy_times_mock):
        response = {'data': {'collection': []}, 'status_code': 200}
        user_busy_times_mock.return_value = response
        query_params = {'start_time': ['2023-01-26T20:00:00.000000Z'],
                        'user': ['https://api.calendly.com/users/4a7bf33a-242b-478d-ae5f-10bbd271be33'],
                        'end_time': ['2023-01-26T24:00:00.000000Z']}
        responses = self.client.get(reverse('calendly_service-user-busy-times'), query_params)
        self.assertEqual(responses.status_code, status.HTTP_200_OK)
        self.assertEqual(responses.data, response['data'])
        self.assertEqual(responses.data['collection'], response['data']['collection'])
        user_busy_times_mock.assert_called_once()
        user_busy_times_mock.assert_called_once_with(query_params=query_params)

    @mock.patch('modules.django_calendly.calendly.services.calendly.CalendlyService.user_busy_times')
    def test_user_busy_times_with_wrong_params(self, user_busy_times_mock):
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}
        user_busy_times_mock.return_value = response
        query_params = {'start_time': ['2023-01-26T20:00:00.000000Z'],
                        'user': ['https://api.calendly.com/users/4a7bf33a-242b-478d-ae5f-10bbd271be33'],
                        'end_time': ['2023-01-26T24:00:00.000000Z']}
        responses = self.client.get(reverse('calendly_service-user-busy-times'), query_params)
        self.assertEqual(responses.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(responses.data, response['data'])
        self.assertEqual(responses.data['message'], response['data']['message'])
        user_busy_times_mock.assert_called_once()
        user_busy_times_mock.assert_called_once_with(query_params=query_params)

    @mock.patch('modules.django_calendly.calendly.services.calendly.CalendlyService.cancel_scheduled_event')
    def test_cancel_scheduled_event(self, cancel_scheduled_event_mock):
        response = {'data': {'resource': {'canceled_by': 'demo 123', 'canceler_type': 'host', 'reason': None}},
                    'status_code': 201}
        cancel_scheduled_event_mock.return_value = response
        uuid = 'c1a24978-f568-4df4-abb5-28cdbc0f4667'
        responses = self.client.post(reverse('calendly_service-cancel-scheduled-event', kwargs={"uuid": uuid}))
        self.assertEqual(responses.status_code, status.HTTP_201_CREATED)
        self.assertEqual(responses.data, response['data'])
        cancel_scheduled_event_mock.assert_called_once()
        cancel_scheduled_event_mock.assert_called_once_with(uuid='c1a24978-f568-4df4-abb5-28cdbc0f4667',
                                                            payload={'reason': None})

    @mock.patch('modules.django_calendly.calendly.services.calendly.CalendlyService.cancel_scheduled_event')
    def test_cancel_scheduled_event_with_not_exist_uuid(self, cancel_scheduled_event_mock):
        response = {'data': {'title': 'Permission Denied', 'message': 'You are not allowed to cancel this event'},
                    'status_code': 403}
        cancel_scheduled_event_mock.return_value = response
        uuid = 'c1a24978-f568-4df4-abb5-28cdbc0f4667'
        responses = self.client.post(reverse('calendly_service-cancel-scheduled-event', kwargs={"uuid": uuid}))
        self.assertEqual(responses.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(responses.data, response['data'])
        self.assertEqual(responses.data['message'], response['data']['message'])
        self.assertEqual(responses.data['title'], response['data']['title'])
        cancel_scheduled_event_mock.assert_called_once()
        cancel_scheduled_event_mock.assert_called_once_with(uuid='c1a24978-f568-4df4-abb5-28cdbc0f4667',
                                                            payload={'reason': None})

    @mock.patch('modules.django_calendly.calendly.services.calendly.CalendlyService.cancel_scheduled_event')
    def test_cancel_scheduled_event_with_invalid_uuid(self, cancel_scheduled_event_mock):
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}
        cancel_scheduled_event_mock.return_value = response
        uuid = 'c1a24978-f568-4df4-abb5-28cdbc0f4667'
        responses = self.client.post(reverse('calendly_service-cancel-scheduled-event', kwargs={"uuid": uuid}))
        self.assertEqual(responses.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(responses.data, response['data'])
        self.assertEqual(responses.data['message'], response['data']['message'])
        cancel_scheduled_event_mock.assert_called_once()
        cancel_scheduled_event_mock.assert_called_once_with(uuid='c1a24978-f568-4df4-abb5-28cdbc0f4667',
                                                            payload={"reason": None})

    @mock.patch('modules.django_calendly.calendly.services.calendly.CalendlyService.create_invitee_no_show')
    def test_create_invitee_no_show(self, create_invitee_no_show_mock):
        response = {'data': {
            "resource": {
                "uri": "https://api.calendly.com/invitee_no_shows/7ye3aaa-sssaaa8s-5ggts5ssa77",
                "invitee": "https://api.calendly.com/scheduled_events/GBGBDCAADAEDCRZ2/invitees/7c1dbe46-bd84-42e2"
                           "-9b97-05e2fb379bfe",
                "created_at": "2019-01-02T03:04:05.678123Z"
            }
        },
            'status_code': 200}
        create_invitee_no_show_mock.return_value = response
        data = {
            "invitee": "https://api.calendly.com/scheduled_events/GBGBDCAADAEDCRZ2/invitees/7c1dbe46-bd84-42e2-9b97"
                       "-05e2fb379bfe"
        }
        responses = self.client.post(reverse('calendly_service-create-invitee-no-show'), data=data, format='json')
        self.assertEqual(responses.status_code, status.HTTP_200_OK)
        self.assertEqual(responses.data, response['data'])
        self.assertEqual(responses.data['resource']['uri'], response['data']['resource']['uri'])
        self.assertEqual(responses.data['resource']['invitee'], response['data']['resource']['invitee'])
        create_invitee_no_show_mock.assert_called_once()
        create_invitee_no_show_mock.assert_called_once_with(payload=data)

    def test_create_invitee_no_show_with_invalid_data(self):
        data = {
            "invitee": "scheduled_events/GBGBDCAADAEDCRZ2/invitees/7c1dbe46-bd84-42e2-9b97"
                       "-05e2fb379bfe"
        }
        responses = self.client.post(reverse('calendly_service-create-invitee-no-show'), data=data, format='json')
        self.assertEqual(responses.status_code, status.HTTP_400_BAD_REQUEST)

    @mock.patch('modules.django_calendly.calendly.services.calendly.CalendlyService.create_invitee_no_show')
    def test_create_invitee_no_show_with_invalid_invitee_link(self, create_invitee_no_show_mock):
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}
        create_invitee_no_show_mock.return_value = response
        data = {
            "invitee": "https://api.calendly.com/scheduled_events/GBGBDCAADAEDCRZ2/invitees/7c1dbe46-bd84-42e2-9b97"
                       "-05e2fb379bfe"
        }
        responses = self.client.post(reverse('calendly_service-create-invitee-no-show'), data=data, format='json')
        self.assertEqual(responses.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(responses.data, response['data'])
        self.assertEqual(responses.data['message'], response['data']['message'])
        create_invitee_no_show_mock.assert_called_once()
        create_invitee_no_show_mock.assert_called_once_with(payload=data)

    @mock.patch('modules.django_calendly.calendly.services.calendly.CalendlyService.single_invitee_no_show')
    def test_single_invitee_no_show(self, single_invitee_no_show_mock):
        response = {'data': {
            "resource": {
                "uri": "https://api.calendly.com/invitee_no_shows/7ye3aaa-sssaaa8s-5ggts5ssa77",
                "invitee": "https://api.calendly.com/scheduled_events/GBGBDCAADAEDCRZ2/invitees/7c1dbe46-bd84-42e2"
                           "-9b97-05e2fb379bfe",
                "created_at": "2019-01-02T03:04:05.678123Z"
            }
        }, 'status_code': 200}
        single_invitee_no_show_mock.return_value = response
        uuid = '7dbb53ac-7ye3aaa-sssaaa8s-5ggts5ssa77'
        responses = self.client.get(reverse('calendly_service-single-invitee-no-show', kwargs={"uuid": uuid}))
        self.assertEqual(responses.status_code, status.HTTP_200_OK)
        self.assertEqual(responses.data, response['data'])
        self.assertEqual(responses.data['resource']['uri'], response['data']['resource']['uri'])
        self.assertEqual(responses.data['resource']['invitee'], response['data']['resource']['invitee'])
        single_invitee_no_show_mock.assert_called_once()
        single_invitee_no_show_mock.assert_called_once_with(uuid='7dbb53ac-7ye3aaa-sssaaa8s-5ggts5ssa77')

    @mock.patch('modules.django_calendly.calendly.services.calendly.CalendlyService.single_invitee_no_show')
    def test_single_invitee_no_show_with_invalid_uuid(self, single_invitee_no_show_mock):
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}
        single_invitee_no_show_mock.return_value = response
        uuid = '7dbb53ac-7ye3aaa-sssaaa8s-5ggts5ssa77'
        responses = self.client.get(reverse('calendly_service-single-invitee-no-show', kwargs={"uuid": uuid}))
        self.assertEqual(responses.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(responses.data, response['data'])
        self.assertEqual(responses.data['message'], response['data']['message'])
        single_invitee_no_show_mock.assert_called_once()
        single_invitee_no_show_mock.assert_called_once_with(uuid='7dbb53ac-7ye3aaa-sssaaa8s-5ggts5ssa77')

    @mock.patch('modules.django_calendly.calendly.services.calendly.CalendlyService.remove_invitee_no_show')
    def test_remove_invitee_no_show(self, remove_invitee_no_show_mock):
        response = {
            "data": {
                "message": "Item deleted successfully."
            },
            "status_code": 204
        }
        remove_invitee_no_show_mock.return_value = response
        uuid = 'bdge3-dgedasd-3e3-33e-hhbbb-ss'
        responses = self.client.delete(reverse('calendly_service-remove-invitee-no-show', kwargs={"uuid": uuid}))
        self.assertEqual(responses.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(responses.data, response['data'])
        self.assertEqual(responses.data['message'], response['data']['message'])
        remove_invitee_no_show_mock.assert_called_once()
        remove_invitee_no_show_mock.assert_called_once_with(uuid='bdge3-dgedasd-3e3-33e-hhbbb-ss')

    @mock.patch('modules.django_calendly.calendly.services.calendly.CalendlyService.remove_invitee_no_show')
    def test_remove_invitee_no_show_with_invalid_uuid(self, remove_invitee_no_show_mock):
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}
        remove_invitee_no_show_mock.return_value = response
        uuid = 'bdge3-dgedasd-3e3-33e-hhbbb-ss'
        responses = self.client.delete(reverse('calendly_service-remove-invitee-no-show', kwargs={"uuid": uuid}))
        self.assertEqual(responses.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(responses.data, response['data'])
        self.assertEqual(responses.data['message'], response['data']['message'])
        remove_invitee_no_show_mock.assert_called_once()
        remove_invitee_no_show_mock.assert_called_once_with(uuid='bdge3-dgedasd-3e3-33e-hhbbb-ss')

    @mock.patch(
        'modules.django_calendly.calendly.services.calendly.CalendlyService.create_webhook_subscription')
    def test_create_webhook_subscription(self, create_webhook_subscription_mock):
        response = {
            "data": {
                "resource": {
                    "uri": "https://api.calendly.com/webhook_subscriptions/AAAAAAAAAAAAAAAA",
                    "callback_url": "https://blah.foo/bar",
                    "created_at": "2019-08-24T14:15:22.123456Z",
                    "updated_at": "2019-08-24T14:15:22.123456Z",
                    "retry_started_at": "2019-08-24T14:15:22.123456Z",
                    "state": "active",
                    "events": [
                        "invitee.created"
                    ],
                    "scope": "user",
                    "organization": "https://api.calendly.com/organizations/AAAAAAAAAAAAAAAA",
                    "user": "https://api.calendly.com/users/AAAAAAAAAAAAAAAA",
                    "creator": "https://api.calendly.com/users/AAAAAAAAAAAAAAAA"
                }
            },
            "status_code": 201
        }
        create_webhook_subscription_mock.return_value = response
        data = {
            "url": "https://blah.foo/bar",
            "events": [
                "invitee.created",
                "invitee.canceled"
            ],
            "organization": "https://api.calendly.com/organizations/AAAAAAAAAAAAAAAA",
            "user": "https://api.calendly.com/users/BBBBBBBBBBBBBBBB",
            "scope": "user",
            "signing_key": "5mEzn9C-I28UtwOjZJtFoob0sAAFZ95GbZkqj4y3i0I"
        }
        responses = self.client.post(reverse('calendly_service-create-webhook-subscription'), data=data, format='json')
        self.assertEqual(responses.status_code, status.HTTP_201_CREATED)
        self.assertEqual(responses.data, response['data'])
        self.assertEqual(responses.data['resource']['uri'], response['data']['resource']['uri'])
        create_webhook_subscription_mock.assert_called_once()
        create_webhook_subscription_mock.assert_called_once_with(payload=data)

    @mock.patch(
        'modules.django_calendly.calendly.services.calendly.CalendlyService.create_webhook_subscription')
    def test_create_webhook_subscription_with_duplicate_data(self, create_webhook_subscription_mock):
        response = {'data': {'title': 'Already Exists', 'message': 'Hook with this url already exists'},
                    'status_code': 409}
        create_webhook_subscription_mock.return_value = response
        data = {
            "url": "https://blah.foo/bar",
            "events": [
                "invitee.created",
                "invitee.canceled"
            ],
            "organization": "https://api.calendly.com/organizations/AAAAAAAAAAAAAAAA",
            "user": "https://api.calendly.com/users/BBBBBBBBBBBBBBBB",
            "scope": "user",
            "signing_key": "5mEzn9C-I28UtwOjZJtFoob0sAAFZ95GbZkqj4y3i0I"
        }
        responses = self.client.post(reverse('calendly_service-create-webhook-subscription'), data=data, format='json')
        self.assertEqual(responses.status_code, status.HTTP_409_CONFLICT)
        self.assertEqual(responses.data, response['data'])
        self.assertEqual(responses.data['message'], response['data']['message'])
        self.assertEqual(responses.data['title'], response['data']['title'])
        create_webhook_subscription_mock.assert_called_once()
        create_webhook_subscription_mock.assert_called_once_with(payload=data)

    def test_create_webhook_subscription_with_invalid_data(self):
        data = {
            "events": [
                "invitee.created",
                "invitee.canceled"
            ],
            "organization": "https://api.calendly.com/organizations/382103e900d5-48335900-hg35sf",
            "scope": "organization"
        }
        responses = self.client.post(reverse('calendly_service-create-webhook-subscription'), data=data, format='json')
        self.assertEqual(responses.status_code, status.HTTP_400_BAD_REQUEST)

    @mock.patch('modules.django_calendly.calendly.services.calendly.CalendlyService.webhook_subscription_list')
    def test_webhook_subscription_list(self, webhook_subscription_list_mock):
        response = {'data': {'collection': [
            {'callback_url': 'https://c21c-39-53-74-22.in.ngrok.io/modules/calendly/webhook-url/',
             'created_at': '2023-01-12T17:38:11.973696Z',
             'creator': 'https://api.calendly.com/users/4a7bf33a-242b-478d-ae5f-10bbd271be33',
             'events': ['invitee.created', 'invitee.canceled'],
             'organization': 'https://api.calendly.com/organizations/382103e900d5-48335900-hg35sf',
             'retry_started_at': None, 'scope': 'organization', 'state': 'active',
             'updated_at': '2023-01-12T17:38:11.973696Z',
             'uri': 'https://api.calendly.com/webhook_subscriptions/e99982f9-719d-41e4-8544-8c837353c24f',
             'user': None}], 'pagination': {'count': 1, 'next_page': None, 'next_page_token': None,
                                            'previous_page': None, 'previous_page_token': None}}, 'status_code': 200}
        webhook_subscription_list_mock.return_value = response
        query_params = {'organization': ['https://api.calendly.com/organizations/382103e900d5-48335900-hg35sf'],
                        'scope': ['organization']}
        responses = self.client.get(reverse('calendly_service-webhook-subscription-list'), query_params)
        self.assertEqual(responses.status_code, status.HTTP_200_OK)
        self.assertEqual(responses.data, response['data'])
        self.assertEqual(responses.data['collection'][0]['events'][0], response['data']['collection'][0]['events'][0])
        self.assertEqual(responses.data['collection'][0]['creator'], response['data']['collection'][0]['creator'])
        webhook_subscription_list_mock.assert_called_once()
        webhook_subscription_list_mock.assert_called_once_with(query_params=query_params)

    @mock.patch('modules.django_calendly.calendly.services.calendly.CalendlyService.webhook_subscription_list')
    def test_webhook_subscription_list_without_params(self, webhook_subscription_list_mock):
        response = {'data': {'details': [{'message': 'must be one of: organization, user', 'parameter': 'scope'},
                                         {'message': 'invalid', 'parameter': 'organization'}],
                             'message': 'The supplied parameters are invalid.', 'title': 'Invalid Argument'},
                    'status_code': 400}
        webhook_subscription_list_mock.return_value = response
        responses = self.client.get(reverse('calendly_service-webhook-subscription-list'))
        self.assertEqual(responses.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(responses.data, response['data'])
        self.assertEqual(responses.data['message'], response['data']['message'])
        webhook_subscription_list_mock.assert_called_once()
        webhook_subscription_list_mock.assert_called_once_with(query_params={})

    @mock.patch('modules.django_calendly.calendly.services.calendly.CalendlyService.webhook_subscription_list')
    def test_webhook_subscription_list_with_wrong_params(self, webhook_subscription_list_mock):
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}
        webhook_subscription_list_mock.return_value = response
        query_params = {'organization': ['https://api.calendly.com/organizations/382103e900d5-48335900-hg35sf'],
                        'scope': ['organization']}
        responses = self.client.get(reverse('calendly_service-webhook-subscription-list'), query_params)
        self.assertEqual(responses.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(responses.data, response['data'])
        self.assertEqual(responses.data['message'], response['data']['message'])
        webhook_subscription_list_mock.assert_called_once()
        webhook_subscription_list_mock.assert_called_once_with(query_params=query_params)

    @mock.patch(
        'modules.django_calendly.calendly.services.calendly.CalendlyService.single_webhook_subscription')
    def test_single_webhook_subscription(self, single_webhook_subscription_mock):
        response = {'data': {
            "resource": {
                "uri": "https://api.calendly.com/webhook_subscriptions/AAAAAAAAAAAAAAAA",
                "callback_url": "https://blah.foo/bar",
                "created_at": "2019-08-24T14:15:22.123456Z",
                "updated_at": "2019-08-24T14:15:22.123456Z",
                "retry_started_at": "2019-08-24T14:15:22.123456Z",
                "state": "active",
                "events": [
                    "invitee.created"
                ],
                "scope": "user",
                "organization": "https://api.calendly.com/organizations/AAAAAAAAAAAAAAAA",
                "user": "https://api.calendly.com/users/AAAAAAAAAAAAAAAA",
                "creator": "https://api.calendly.com/users/AAAAAAAAAAAAAAAA"
            }
        }, 'status_code': 200}
        single_webhook_subscription_mock.return_value = response
        uuid = 'e99982f9-719d-41e4-8544-8c837353c24f'
        responses = self.client.get(
            reverse('calendly_service-single-webhook-subscription', kwargs={"webhook_uuid": uuid}))
        self.assertEqual(responses.status_code, status.HTTP_200_OK)
        self.assertEqual(responses.data, response['data'])
        self.assertEqual(responses.data['resource']['callback_url'], response['data']['resource']['callback_url'])
        self.assertEqual(responses.data['resource']['retry_started_at'],
                         response['data']['resource']['retry_started_at'])
        single_webhook_subscription_mock.assert_called_once()
        single_webhook_subscription_mock.assert_called_once_with(uuid='e99982f9-719d-41e4-8544-8c837353c24f')

    @mock.patch(
        'modules.django_calendly.calendly.services.calendly.CalendlyService.single_webhook_subscription')
    def test_single_webhook_subscription_with_wrong_uuid(self, single_webhook_subscription_mock):
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}
        single_webhook_subscription_mock.return_value = response
        uuid = 'e99982f9-719d-41e4-8544-8c837353c24f'
        responses = self.client.get(
            reverse('calendly_service-single-webhook-subscription', kwargs={"webhook_uuid": uuid}))
        self.assertEqual(responses.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(responses.data, response['data'])
        self.assertEqual(responses.data['message'], response['data']['message'])
        single_webhook_subscription_mock.assert_called_once()
        single_webhook_subscription_mock.assert_called_once_with(uuid='e99982f9-719d-41e4-8544-8c837353c24f')

    @mock.patch(
        'modules.django_calendly.calendly.services.calendly.CalendlyService.remove_webhook_subscription')
    def test_remove_webhook_subscription(self, remove_webhook_subscription_mock):
        response = {
            "data": {
                "message": "Item deleted successfully."
            },
            "status_code": 204
        }
        remove_webhook_subscription_mock.return_value = response
        uuid = 'bdge3-dgedasd-3e3-33e-hhbbb-ss'
        responses = self.client.delete(
            reverse('calendly_service-remove-webhook-subscription', kwargs={"webhook_uuid": uuid}))
        self.assertEqual(responses.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(responses.data, response['data'])
        self.assertEqual(responses.data['message'], response['data']['message'])
        remove_webhook_subscription_mock.assert_called_once()
        remove_webhook_subscription_mock.assert_called_once_with(uuid='bdge3-dgedasd-3e3-33e-hhbbb-ss')

    @mock.patch(
        'modules.django_calendly.calendly.services.calendly.CalendlyService.remove_webhook_subscription')
    def test_remove_webhook_subscription_with_invalid_uuid(self, remove_webhook_subscription_mock):
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}
        remove_webhook_subscription_mock.return_value = response
        uuid = 'bdge3-dgedasd-3e3-33e-hhbbb-ss'
        responses = self.client.delete(
            reverse('calendly_service-remove-webhook-subscription', kwargs={"webhook_uuid": uuid}))
        self.assertEqual(responses.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(responses.data, response['data'])
        self.assertEqual(responses.data['message'], response['data']['message'])
        remove_webhook_subscription_mock.assert_called_once()
        remove_webhook_subscription_mock.assert_called_once_with(uuid='bdge3-dgedasd-3e3-33e-hhbbb-ss')

    @mock.patch('modules.django_calendly.calendly.services.calendly.CalendlyService.webhook')
    def test_webhook(self, test_webhook_mock):
        response = {'data': {
            "message": "User has scheduled, rescheduled or cancelled an event."
        },
            'status_code': 200}
        test_webhook_mock.return_value = response
        response = self.client.post(reverse("calendly_service-webhook"))
        self.assertEqual(response.data['data']['message'], 'User has scheduled, rescheduled or cancelled an event.')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        test_webhook_mock.assert_called_once()
