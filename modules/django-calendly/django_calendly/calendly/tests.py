from rest_framework.test import APITestCase
from rest_framework import status
from unittest import mock


class CalendlyViewSetTest(APITestCase):

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.user_details')
    def test_user_details(self, user_details_mock):
        """
            Test Get the user details and check the response
        """
        response = {'data': {'resource': {
            'avatar_url': 'https://d3v0px0pttie1i.cloudfront.net/uploads/user/avatar/23067212/a509cd46.jpg',
            'created_at': '2022-12-13T06:46:57.979661Z',
            'current_organization': 'https://api.calendly.com/organizations/9a2db856-b354-4c0d-96f7-79b7dc45e3d9',
            'email': 'saad.abid@crowdbotics.com', 'name': 'Saad Bin Abid',
            'scheduling_url': 'https://calendly.com/saad-abid', 'slug': 'saad-abid', 'timezone': 'Asia/Karachi',
            'updated_at': '2022-12-28T00:07:47.545012Z',
            'uri': 'https://api.calendly.com/users/3e1c14de-01c9-4ea8-a87b-faf2b858b580'}}, 'status_code': 200}
        user_details_mock.return_value = response
        Response = self.client.get('/modules/calendly/service/user/details/')
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertEqual(response['data']['resource']['email'], Response.data['resource']['email'])
        self.assertEqual(response['data']['resource']['avatar_url'], Response.data['resource']['avatar_url'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.event_types')
    def test_event_types(self, event_types_mock):
        """
        Test Get the event types and check the response
        """
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
            {'active': False, 'admin_managed': False, 'booking_method': 'instant', 'color': '#e55cff',
             'created_at': '2022-12-13T09:05:36.970823Z', 'custom_questions': [
                {'answer_choices': [], 'enabled': True, 'include_other': False,
                 'name': 'Please share anything that will help prepare for our meeting.', 'position': 0,
                 'required': False, 'type': 'text'}], 'deleted_at': None, 'description_html': '<p><br></p>',
             'description_plain': '', 'duration': 30, 'internal_note': None, 'kind': 'group',
             'kind_description': 'Group', 'name': 'Demo Collective Event', 'pooling_type': None,
             'profile': {'name': 'Saad Bin Abid',
                         'owner': 'https://api.calendly.com/users/3e1c14de-01c9-4ea8-a87b-faf2b858b580',
                         'type': 'User'}, 'scheduling_url': 'https://calendly.com/saad-abid/demo-collective-event',
             'secret': False, 'slug': 'demo-collective-event', 'type': 'StandardEventType',
             'updated_at': '2022-12-16T15:07:24.142672Z',
             'uri': 'https://api.calendly.com/event_types/b7da2e5c-62a9-4c2a-a1bb-69bc21514780'},
            {'active': True, 'admin_managed': False, 'booking_method': 'instant', 'color': '#8247f5',
             'created_at': '2022-12-15T07:01:25.658248Z', 'custom_questions': [
                {'answer_choices': [], 'enabled': True, 'include_other': False,
                 'name': 'Please share anything that will help prepare for our meeting.', 'position': 0,
                 'required': False, 'type': 'text'}], 'deleted_at': None, 'description_html': '<p>events</p>',
             'description_plain': 'events', 'duration': 30, 'internal_note': None, 'kind': 'solo',
             'kind_description': 'One-on-One', 'name': 'my event', 'pooling_type': None, 'profile': {'name': 'demo 123',
                                                                                                     'owner': 'https://api.calendly.com/users/75743257-9734-4110-b0ec-336ccfc6c66f',
                                                                                                     'type': 'User'},
             'scheduling_url': 'https://calendly.com/demomodule-123/my-event', 'secret': False, 'slug': 'my-event',
             'type': 'StandardEventType', 'updated_at': '2022-12-15T07:01:49.385838Z',
             'uri': 'https://api.calendly.com/event_types/f9638431-6122-466f-abcd-8dafda082a01'},
            {'active': True, 'admin_managed': False, 'booking_method': 'instant', 'color': '#17e885',
             'created_at': '2022-12-13T06:49:03.726668Z', 'custom_questions': [
                {'answer_choices': [], 'enabled': True, 'include_other': False,
                 'name': 'Please share anything that will help prepare for our meeting.', 'position': 0,
                 'required': False, 'type': 'text'}], 'deleted_at': None,
             'description_html': '<p>The meeting will be held in 30 minutes. Everyone be there on time.</p>',
             'description_plain': 'The meeting will be held in 30 minutes. Everyone be there on time.', 'duration': 30,
             'internal_note': None, 'kind': 'solo', 'kind_description': 'One-on-One', 'name': 'Personal Meeting',
             'pooling_type': None, 'profile': {'name': 'Saad Bin Abid',
                                               'owner': 'https://api.calendly.com/users/3e1c14de-01c9-4ea8-a87b-faf2b858b580',
                                               'type': 'User'},
             'scheduling_url': 'https://calendly.com/saad-abid/30min', 'secret': False, 'slug': '30min',
             'type': 'StandardEventType', 'updated_at': '2022-12-16T15:07:24.142672Z',
             'uri': 'https://api.calendly.com/event_types/9fa001e1-de93-410e-9b90-9a977d61fdc8'}],
            'pagination': {'count': 4, 'next_page': None, 'next_page_token': None,
                           'previous_page': None, 'previous_page_token': None}}, 'status_code': 200}
        event_types_mock.return_value = response
        Response = self.client.get(
            '/modules/calendly/service/event/types/',
            {'organization': 'https://api.calendly.com/organizations/9a2db856-b354-4c0d-96f7-79b7dc45e3d9',
             'active': 'true', 'count': '10'})
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertEqual(Response.data, response['data'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.event_types')
    def test_event_types_with_wrong_params(self, event_types_mock):
        """
        Test Get the event types with wrong query params use in url and check the response
        """
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}
        event_types_mock.return_value = response
        Response = self.client.get(
            '/modules/calendly/service/event/types/',
            {'organization': 'https://api.calendly.com/organizations/9a2db856-b35dc45e3d9', 'active': 'tue',
             'count': '1'})
        self.assertEqual(Response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Response.data, response['data'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.single_event_types')
    def test_single_event_type(self, single_event_types_mock):
        """
        Test Get the single event type and check the response
        """
        response = {'data': {
            'resource': {'active': False, 'admin_managed': False, 'booking_method': 'instant', 'color': '#e55cff',
                         'created_at': '2022-12-13T09:05:36.970823Z', 'custom_questions': [
                    {'answer_choices': [], 'enabled': True, 'include_other': False,
                     'name': 'Please share anything that will help prepare for our meeting.', 'position': 0,
                     'required': False, 'type': 'text'}], 'deleted_at': None, 'description_html': '<p><br></p>',
                         'description_plain': '', 'duration': 30, 'internal_note': None, 'kind': 'group',
                         'kind_description': 'Group', 'name': 'Demo Collective Event', 'pooling_type': None,
                         'profile': {'name': 'Saad Bin Abid',
                                     'owner': 'https://api.calendly.com/users/3e1c14de-01c9-4ea8-a87b-faf2b858b580',
                                     'type': 'User'},
                         'scheduling_url': 'https://calendly.com/saad-abid/demo-collective-event', 'secret': False,
                         'slug': 'demo-collective-event', 'type': 'StandardEventType',
                         'updated_at': '2022-12-16T15:07:24.142672Z',
                         'uri': 'https://api.calendly.com/event_types/b7da2e5c-62a9-4c2a-a1bb-69bc21514780'}},
            'status_code': 200}
        single_event_types_mock.return_value = response
        Response = self.client.get(
            '/modules/calendly/service/b7da2e5c-62a9-4c2a-a1bb-69bc21514780/single/event/types/')
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertEqual(Response.data, response['data'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.single_event_types')
    def test_single_event_type_with_wrong_uuid(self, single_event_types_mock):
        """
        Test single event type with wrong uuid in url and check the response
        """
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}
        single_event_types_mock.return_value = response
        Response = self.client.get(
            '/modules/calendly/service/b7da2e5c-69-4c2a-a1bb-69bc21514780/single/event/types/')
        self.assertEqual(Response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Response.data, response['data'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.user_availability_schedules')
    def test_user_availability_schedules(self, user_availability_schedules_mock):
        """
        Test user availability schedules with all query params in the url and check the response
        """
        response = {'data': {'collection': [{'default': True, 'name': 'Working hours',
                                             'rules': [{'type': 'wday', 'wday': 'sunday', 'intervals': []},
                                                       {'type': 'wday', 'wday': 'monday',
                                                        'intervals': [{'from': '09:00', 'to': '17:00'}]},
                                                       {'type': 'wday', 'wday': 'tuesday',
                                                        'intervals': [{'from': '09:00', 'to': '17:00'}]},
                                                       {'type': 'wday', 'wday': 'wednesday',
                                                        'intervals': [{'from': '09:00', 'to': '17:00'}]},
                                                       {'type': 'wday', 'wday': 'thursday',
                                                        'intervals': [{'from': '09:00', 'to': '17:00'}]},
                                                       {'type': 'wday', 'wday': 'friday',
                                                        'intervals': [{'from': '09:00', 'to': '17:00'}]},
                                                       {'type': 'wday', 'wday': 'saturday', 'intervals': []}],
                                             'timezone': 'Asia/Karachi',
                                             'uri': 'https://api.calendly.com/user_availability_schedules/2d647721-4482-4424-a1f3-41a9cabcce26',
                                             'user': 'https://api.calendly.com/users/3e1c14de-01c9-4ea8-a87b-faf2b858b580'}]},
                    'status_code': 200}
        user_availability_schedules_mock.return_value = response
        Response = self.client.get(
            '/modules/calendly/service/user/availability-schedules/',
            {'user': 'https://api.calendly.com/users/3e1c14de-01c9-4ea8-a87b-faf2b858b580',
             'event_type': 'https://api.calendly.com/event_types/b7da2e5c-62a9-4c2a-a1bb-69bc21514780',
             'end_time': '2020-01-07T24:00:00.000000Z'})
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertEqual(Response.data, response['data'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.user_availability_schedules')
    def test_user_availability_schedules_without_event_type_and_end_time_params(self, user_availability_schedules_mock):
        """
        Test user availability schedules without event type and end time  query params in the url and check the response
        """
        response = {'data': {'collection': [{'default': True, 'name': 'Working hours',
                                             'rules': [{'type': 'wday', 'wday': 'sunday', 'intervals': []},
                                                       {'type': 'wday', 'wday': 'monday',
                                                        'intervals': [{'from': '09:00', 'to': '17:00'}]},
                                                       {'type': 'wday', 'wday': 'tuesday',
                                                        'intervals': [{'from': '09:00', 'to': '17:00'}]},
                                                       {'type': 'wday', 'wday': 'wednesday',
                                                        'intervals': [{'from': '09:00', 'to': '17:00'}]},
                                                       {'type': 'wday', 'wday': 'thursday',
                                                        'intervals': [{'from': '09:00', 'to': '17:00'}]},
                                                       {'type': 'wday', 'wday': 'friday',
                                                        'intervals': [{'from': '09:00', 'to': '17:00'}]},
                                                       {'type': 'wday', 'wday': 'saturday', 'intervals': []}],
                                             'timezone': 'Asia/Karachi',
                                             'uri': 'https://api.calendly.com/user_availability_schedules/2d647721-4482-4424-a1f3-41a9cabcce26',
                                             'user': 'https://api.calendly.com/users/3e1c14de-01c9-4ea8-a87b-faf2b858b580'}]},
                    'status_code': 200}
        user_availability_schedules_mock.return_value = response
        Response = self.client.get(
            '/modules/calendly/service/user/availability-schedules/',
            {'user': 'https://api.calendly.com/users/3e1c14de-01c9-4ea8-a87b-faf2b858b580'})
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertEqual(Response.data, response['data'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.user_availability_schedules')
    def test_user_availability_schedules_with_wrong_user_id(self, user_availability_schedules_mock):
        """
        Test user availability schedules with wrong user id in the url  and check the response
        """
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}
        user_availability_schedules_mock.return_value = response
        Response = self.client.get(
            '/modules/calendly/service/user/availability-schedules/',
            {'user': 'https://api.calendly.com/users/3e1c14de-01c9-4ea8-a87b-'})
        self.assertEqual(Response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Response.data, response['data'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.user_availability_schedules')
    def test_user_availability_schedules_without_user_id(self, user_availability_schedules_mock):
        """
        Test user availability schedules without user id in the url  and check the response
        """
        response = {'data': {'details': [{'message': 'invalid', 'parameter': 'user'}],
                             'message': 'The supplied parameters are invalid.', 'title': 'Invalid Argument'},
                    'status_code': 400}
        user_availability_schedules_mock.return_value = response
        Response = self.client.get(
            '/modules/calendly/service/user/availability-schedules/'
        )
        self.assertEqual(Response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Response.data, response['data'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.remove_invitees')
    def test_remove_invitees(self, remove_invitees_mock):
        """
        Test remove invitees with valid email  and check the response
        """
        response = {
            "data": {
                "message": "Item deleted successfully."
            },
            "status_code": 204
        }
        remove_invitees_mock.return_value = response
        data = {
            'email': 'saad.abid@crowdbotics.com'
        }
        Response = self.client.post(
            '/modules/calendly/service/remove/invitees/', data=data
        )
        self.assertEqual(Response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Response.data, response['data'])
        self.assertEqual(Response.data['message'], response['data']['message'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.remove_invitees')
    def test_remove_invitees_with_wrong_email(self, remove_invitees_mock):
        """
        Test remove invitees with invalid email  and check the response
        """
        response = {
            "data": {
                "message": "Resource not found"
            },
            "status_code": 404
        }
        remove_invitees_mock.return_value = response
        data = {
            'email': 'saad.abid@rwdbotics.com'
        }
        Response = self.client.post(
            '/modules/calendly/service/remove/invitees/', data=data
        )
        self.assertEqual(Response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Response.data, response['data'])
        self.assertEqual(Response.data['message'], response['data']['message'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.remove_invitees')
    def test_remove_invitees_with_non_upgrade_account_email(self, remove_invitees_mock):
        """
        Test remove invitees with non-upgrade account  email  and check the response
        """
        response = {
            'data': {
                'title': 'Permission Denied',
                'message': 'Please upgrade your Calendly account to Enterprise.'
            },
            'status_code': 403
        }
        remove_invitees_mock.return_value = response
        data = {
            'email': 'saad.abid@rwdbotics.com'
        }
        Response = self.client.post(
            '/modules/calendly/service/remove/invitees/', data=data
        )
        self.assertEqual(Response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(Response.data, response['data'])
        self.assertEqual(Response.data['message'], response['data']['message'])
        self.assertEqual(Response.data['title'], response['data']['title'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.organization_invitations_list')
    def test_organization_invitations_list(self, organization_invitations_list_mock):
        """
        Test organization invitation list and check the response
        """
        response = {
            'data': {
                'collection': [{
                    'created_at': '2022-12-13T08:45:07.549779Z',
                    'email': 'demomodule.123@gmail.com',
                    'last_sent_at': '2022-12-13T08:45:07.617744Z',
                    'organization': 'https://api.calendly.com/organizations/9a2db856-b354-4c0d-96f7-79b7dc45e3d9',
                    'status': 'accepted', 'updated_at': '2022-12-13T08:46:04.723714Z',
                    'uri': 'https://api.calendly.com/organizations/9a2db856-b354-4c0d-96f7-79b7dc45e3d9/invitations/99c6b069-51e7-43f6-809a-2315a0dd4071',
                    'user': 'https://api.calendly.com/users/75743257-9734-4110-b0ec-336ccfc6c66f'},
                    {'created_at': '2022-12-16T13:30:17.233437Z', 'email': 'demomodule.123@gmail.com',
                     'last_sent_at': '2022-12-16T13:30:17.385537Z',
                     'organization': 'https://api.calendly.com/organizations/9a2db856-b354-4c0d-96f7-79b7dc45e3d9',
                     'status': 'accepted', 'updated_at': '2022-12-16T13:31:28.794230Z',
                     'uri': 'https://api.calendly.com/organizations/9a2db856-b354-4c0d-96f7-79b7dc45e3d9/invitations/aa9aa5df-42fb-4d06-9bbc-cd039053185f',
                     'user': 'https://api.calendly.com/users/75743257-9734-4110-b0ec-336ccfc6c66f'},
                    {'created_at': '2022-12-19T13:07:15.294228Z', 'email': 'vapim7230@fanneat.com',
                     'last_sent_at': '2022-12-26T13:07:19.043045Z',
                     'organization': 'https://api.calendly.com/organizations/9a2db856-b354-4c0d-96f7-79b7dc45e3d9',
                     'status': 'pending', 'updated_at': '2022-12-19T13:07:15.357268Z',
                     'uri': 'https://api.calendly.com/organizations/9a2db856-b354-4c0d-96f7-79b7dc45e3d9/invitations/46db9156-359a-48fd-96f4-f09aefdf8c13'}],
                'pagination': {'count': 3, 'next_page': None, 'next_page_token': None,
                               'previous_page': None, 'previous_page_token': None}}, 'status_code': 200}
        organization_invitations_list_mock.return_value = response
        id = '9a2db856-b354-4c0d-96f7-79b7dc45e3d9'
        Response = self.client.get(
            f'/modules/calendly/service/{id}/organization/invitations/list/'
        )
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertEqual(Response.data, response['data'])
        self.assertEqual(response['data']['collection'][0]['organization'],
                         Response.data['collection'][0]['organization'])
        self.assertEqual(response['data']['pagination'], Response.data['pagination'])
        self.assertEqual(Response.data['pagination']['next_page'], response['data']['pagination']['next_page'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.organization_invitations_list')
    def test_organization_invitations_list_with_wrong_uudid(self, organization_invitations_list_mock):
        """
        Test organization invitation list with invalid uuid in urland check the response
        """
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}
        organization_invitations_list_mock.return_value = response
        id = '9a2db856-b354-4c0d-96f7-79b7dc5e3d9'
        Response = self.client.get(
            f'/modules/calendly/service/{id}/organization/invitations/list/'
        )
        self.assertEqual(Response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Response.data, response['data'])
        self.assertEqual(Response.data['message'], response['data']['message'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.scheduled_events_list')
    def test_scheduled_events_list(self, organization_invitations_list_mock):
        """
        Test scheduled events lists  and check the response
        """
        response = {'data': {'collection': [
            {'calendar_event': {'external_id': '5ko90pgih0i93mn1ft43n9omlo', 'kind': 'google'},
             'cancellation': {'canceler_type': 'host', 'canceled_by': 'Saad Bin Abid', 'reason': ''},
             'created_at': '2022-12-13T15:17:03.451984Z', 'end_time': '2022-12-14T07:00:00.000000Z', 'event_guests': [],
             'event_memberships': [{'user': 'https://api.calendly.com/users/3e1c14de-01c9-4ea8-a87b-faf2b858b580'}],
             'event_type': 'https://api.calendly.com/event_types/b7da2e5c-62a9-4c2a-a1bb-69bc21514780',
             'invitees_counter': {'active': 0, 'limit': 100, 'total': 1},
             'location': {'location': 'New york, united states', 'type': 'physical'}, 'name': 'Demo Collective Event',
             'start_time': '2022-12-14T06:30:00.000000Z', 'status': 'canceled',
             'updated_at': '2022-12-13T22:36:42.323150Z',
             'uri': 'https://api.calendly.com/scheduled_events/ca78db62-4c0b-4c17-963a-e2c505b89086'},
            {'calendar_event': {'external_id': 'n3pdu19i41vo5um37j36o4s3og', 'kind': 'google'},
             'cancellation': {'canceler_type': 'host', 'canceled_by': 'Saad Bin Abid', 'reason': ''},
             'created_at': '2022-12-15T07:03:12.552940Z', 'end_time': '2022-12-16T10:30:00.000000Z', 'event_guests': [],
             'event_memberships': [{'user': 'https://api.calendly.com/users/75743257-9734-4110-b0ec-336ccfc6c66f'}],
             'event_type': 'https://api.calendly.com/event_types/f9638431-6122-466f-abcd-8dafda082a01',
             'invitees_counter': {'active': 0, 'limit': 1, 'total': 1},
             'location': {'location': 'bwp', 'type': 'custom'}, 'name': 'my event',
             'start_time': '2022-12-16T10:00:00.000000Z', 'status': 'canceled',
             'updated_at': '2022-12-15T11:12:33.237315Z',
             'uri': 'https://api.calendly.com/scheduled_events/c1a24978-f568-4df4-abb5-28cdbc0f4667'},
            {'calendar_event': {'external_id': 'vi9t3gjuasn9k45m5dkobe98n0', 'kind': 'google'},
             'created_at': '2022-12-15T07:04:21.763694Z', 'end_time': '2022-12-16T05:30:00.000000Z', 'event_guests': [],
             'event_memberships': [{'user': 'https://api.calendly.com/users/3e1c14de-01c9-4ea8-a87b-faf2b858b580'}],
             'event_type': 'https://api.calendly.com/event_types/81944b44-c443-44e3-a82c-b659d48734b6',
             'invitees_counter': {'active': 1, 'limit': 100, 'total': 1},
             'location': {'location': 'bwp', 'type': 'custom'}, 'name': 'saad schedules',
             'start_time': '2022-12-16T05:00:00.000000Z', 'status': 'active',
             'updated_at': '2022-12-15T07:04:22.392832Z',
             'uri': 'https://api.calendly.com/scheduled_events/07d9da9c-8b28-4802-b94c-cc004491af98'},
            {'calendar_event': {'external_id': '3dscia8r27rmcvu72ek0t1r108', 'kind': 'google'},
             'cancellation': {'canceler_type': 'host', 'canceled_by': 'Saad Bin Abid', 'reason': ''},
             'created_at': '2022-12-16T08:09:26.959309Z', 'end_time': '2022-12-22T06:30:00.000000Z', 'event_guests': [],
             'event_memberships': [{'user': 'https://api.calendly.com/users/3e1c14de-01c9-4ea8-a87b-faf2b858b580'}],
             'event_type': 'https://api.calendly.com/event_types/c7585710-0565-43e6-a9de-d625a21ef718',
             'invitees_counter': {'active': 0, 'limit': 1, 'total': 1},
             'location': {'location': 'nwp', 'type': 'custom'}, 'name': 'custom',
             'start_time': '2022-12-22T06:00:00.000000Z', 'status': 'canceled',
             'updated_at': '2022-12-16T09:35:11.973897Z',
             'uri': 'https://api.calendly.com/scheduled_events/ce9cb38a-4e41-49f7-a651-55b72980d5ca'},
            {'calendar_event': {'external_id': '2nliuk7bbbnmf4t2bev67cdi70', 'kind': 'google'},
             'cancellation': {'canceler_type': 'host', 'canceled_by': 'Saad Bin Abid', 'reason': None},
             'created_at': '2022-12-16T08:23:38.557928Z', 'end_time': '2022-12-29T07:00:00.000000Z', 'event_guests': [],
             'event_memberships': [{'user': 'https://api.calendly.com/users/3e1c14de-01c9-4ea8-a87b-faf2b858b580'}],
             'event_type': 'https://api.calendly.com/event_types/c7585710-0565-43e6-a9de-d625a21ef718',
             'invitees_counter': {'active': 0, 'limit': 1, 'total': 1},
             'location': {'location': 'nwp', 'type': 'custom'}, 'name': 'custom',
             'start_time': '2022-12-29T06:30:00.000000Z', 'status': 'canceled',
             'updated_at': '2022-12-16T09:37:00.311621Z',
             'uri': 'https://api.calendly.com/scheduled_events/bf9b0d5b-324e-4f9e-aa0a-5d8b2e914f2e'},
            {'calendar_event': {'external_id': '2nliuk7bbbnmf4t2bev67cdi70', 'kind': 'google'},
             'cancellation': {'canceler_type': 'host', 'canceled_by': 'Saad Bin Abid', 'reason': None},
             'created_at': '2022-12-16T09:37:00.321577Z', 'end_time': '2022-12-29T06:30:00.000000Z', 'event_guests': [],
             'event_memberships': [{'user': 'https://api.calendly.com/users/3e1c14de-01c9-4ea8-a87b-faf2b858b580'}],
             'event_type': 'https://api.calendly.com/event_types/c7585710-0565-43e6-a9de-d625a21ef718',
             'invitees_counter': {'active': 0, 'limit': 1, 'total': 1},
             'location': {'location': 'nwp', 'type': 'custom'}, 'name': 'custom',
             'start_time': '2022-12-29T06:00:00.000000Z', 'status': 'canceled',
             'updated_at': '2022-12-16T10:34:05.450099Z',
             'uri': 'https://api.calendly.com/scheduled_events/7e2b77f9-5ceb-431d-8514-3a23818e0d85'},
            {'calendar_event': {'external_id': '2nliuk7bbbnmf4t2bev67cdi70', 'kind': 'google'},
             'cancellation': {'canceler_type': 'host', 'canceled_by': 'Saad Bin Abid', 'reason': ''},
             'created_at': '2022-12-16T10:34:05.456937Z', 'end_time': '2022-12-28T10:30:00.000000Z', 'event_guests': [],
             'event_memberships': [{'user': 'https://api.calendly.com/users/3e1c14de-01c9-4ea8-a87b-faf2b858b580'}],
             'event_type': 'https://api.calendly.com/event_types/c7585710-0565-43e6-a9de-d625a21ef718',
             'invitees_counter': {'active': 0, 'limit': 1, 'total': 1},
             'location': {'location': 'nwp', 'type': 'custom'}, 'name': 'custom',
             'start_time': '2022-12-28T10:00:00.000000Z', 'status': 'canceled',
             'updated_at': '2022-12-16T10:34:39.153888Z',
             'uri': 'https://api.calendly.com/scheduled_events/82961e2a-55c0-4a62-b513-7e7c82364bec'},
            {'calendar_event': {'external_id': '0c3jij1etnpf6lu4h6bhndap1g', 'kind': 'google'},
             'cancellation': {'canceler_type': 'host', 'canceled_by': 'Saad Bin Abid', 'reason': 'i want to cancel'},
             'created_at': '2022-12-16T11:28:01.002091Z', 'end_time': '2022-12-28T05:00:00.000000Z', 'event_guests': [],
             'event_memberships': [{'user': 'https://api.calendly.com/users/3e1c14de-01c9-4ea8-a87b-faf2b858b580'}],
             'event_type': 'https://api.calendly.com/event_types/9fa001e1-de93-410e-9b90-9a977d61fdc8',
             'invitees_counter': {'active': 0, 'limit': 1, 'total': 1},
             'location': {'location': 'bwp, punjab, lahore, pakistan', 'type': 'physical'}, 'name': 'Personal Meeting',
             'start_time': '2022-12-28T04:30:00.000000Z', 'status': 'canceled',
             'updated_at': '2022-12-16T11:29:30.207091Z',
             'uri': 'https://api.calendly.com/scheduled_events/5848bb8e-274c-4871-add5-819624622224'},
            {'calendar_event': {'external_id': 'lv9mausuv46gu9k5tnnierjk7o', 'kind': 'google'},
             'cancellation': {'canceler_type': 'host', 'canceled_by': 'Saad Bin Abid', 'reason': None},
             'created_at': '2022-12-16T12:04:51.473937Z', 'end_time': '2022-12-28T05:00:00.000000Z', 'event_guests': [],
             'event_memberships': [{'user': 'https://api.calendly.com/users/3e1c14de-01c9-4ea8-a87b-faf2b858b580'}],
             'event_type': 'https://api.calendly.com/event_types/9fa001e1-de93-410e-9b90-9a977d61fdc8',
             'invitees_counter': {'active': 0, 'limit': 1, 'total': 1},
             'location': {'location': 'bwp, punjab, lahore, pakistan', 'type': 'physical'}, 'name': 'Personal Meeting',
             'start_time': '2022-12-28T04:30:00.000000Z', 'status': 'canceled',
             'updated_at': '2022-12-16T12:13:41.435368Z',
             'uri': 'https://api.calendly.com/scheduled_events/669465f0-1426-425d-b9a4-cf0ef23b6b62'},
            {'calendar_event': {'external_id': 'lv9mausuv46gu9k5tnnierjk7o', 'kind': 'google'},
             'cancellation': {'canceler_type': 'host', 'canceled_by': 'Saad Bin Abid', 'reason': ''},
             'created_at': '2022-12-16T12:13:41.443389Z', 'end_time': '2022-12-23T06:00:00.000000Z', 'event_guests': [],
             'event_memberships': [{'user': 'https://api.calendly.com/users/3e1c14de-01c9-4ea8-a87b-faf2b858b580'}],
             'event_type': 'https://api.calendly.com/event_types/9fa001e1-de93-410e-9b90-9a977d61fdc8',
             'invitees_counter': {'active': 0, 'limit': 1, 'total': 1},
             'location': {'location': 'bwp, punjab, lahore, pakistan', 'type': 'physical'}, 'name': 'Personal Meeting',
             'start_time': '2022-12-23T05:30:00.000000Z', 'status': 'canceled',
             'updated_at': '2022-12-16T12:14:06.902607Z',
             'uri': 'https://api.calendly.com/scheduled_events/9b1c1c05-0c2b-4ac2-a96a-696172cf5735'},
            {'calendar_event': {'external_id': '4oudjlj0nsfmb81d1mo13v5oig', 'kind': 'google'},
             'cancellation': {'canceler_type': 'host', 'canceled_by': 'Saad Bin Abid', 'reason': None},
             'created_at': '2022-12-16T12:15:12.951889Z', 'end_time': '2022-12-29T06:30:00.000000Z', 'event_guests': [],
             'event_memberships': [{'user': 'https://api.calendly.com/users/3e1c14de-01c9-4ea8-a87b-faf2b858b580'}],
             'event_type': 'https://api.calendly.com/event_types/9fa001e1-de93-410e-9b90-9a977d61fdc8',
             'invitees_counter': {'active': 0, 'limit': 1, 'total': 1},
             'location': {'location': 'bwp, punjab, lahore, pakistan', 'type': 'physical'}, 'name': 'Personal Meeting',
             'start_time': '2022-12-29T06:00:00.000000Z', 'status': 'canceled',
             'updated_at': '2022-12-16T12:16:36.056416Z',
             'uri': 'https://api.calendly.com/scheduled_events/524c2b73-8e4f-4523-a15f-0393826a5bce'},
            {'calendar_event': {'external_id': '4oudjlj0nsfmb81d1mo13v5oig', 'kind': 'google'},
             'cancellation': {'canceler_type': 'host', 'canceled_by': 'Saad Bin Abid', 'reason': ''},
             'created_at': '2022-12-16T12:16:36.065771Z', 'end_time': '2022-12-29T06:00:00.000000Z', 'event_guests': [],
             'event_memberships': [{'user': 'https://api.calendly.com/users/3e1c14de-01c9-4ea8-a87b-faf2b858b580'}],
             'event_type': 'https://api.calendly.com/event_types/9fa001e1-de93-410e-9b90-9a977d61fdc8',
             'invitees_counter': {'active': 0, 'limit': 1, 'total': 1},
             'location': {'location': 'bwp, punjab, lahore, pakistan', 'type': 'physical'}, 'name': 'Personal Meeting',
             'start_time': '2022-12-29T05:30:00.000000Z', 'status': 'canceled',
             'updated_at': '2022-12-16T12:16:46.207557Z',
             'uri': 'https://api.calendly.com/scheduled_events/6f2b50d6-9a0d-44b4-b32a-d5302717c121'},
            {'calendar_event': {'external_id': '1v3st071amonu821k0v3hlt9q0', 'kind': 'google'},
             'cancellation': {'canceler_type': 'host', 'canceled_by': 'Saad Bin Abid',
                              'reason': 'I am rescheduling the meeting for some personal reasons.'},
             'created_at': '2022-12-16T12:17:12.285617Z', 'end_time': '2022-12-22T07:00:00.000000Z', 'event_guests': [],
             'event_memberships': [{'user': 'https://api.calendly.com/users/3e1c14de-01c9-4ea8-a87b-faf2b858b580'}],
             'event_type': 'https://api.calendly.com/event_types/9fa001e1-de93-410e-9b90-9a977d61fdc8',
             'invitees_counter': {'active': 0, 'limit': 1, 'total': 1},
             'location': {'location': 'bwp, punjab, lahore, pakistan', 'type': 'physical'}, 'name': 'Personal Meeting',
             'start_time': '2022-12-22T06:30:00.000000Z', 'status': 'canceled',
             'updated_at': '2022-12-16T15:02:01.807894Z',
             'uri': 'https://api.calendly.com/scheduled_events/e6448922-cac9-4a22-b4cf-83d20849ee51'},
            {'calendar_event': {'external_id': 'v5q0h43loe7cm69rvc5eiue4f4', 'kind': 'google'},
             'cancellation': {'canceler_type': 'host', 'canceled_by': 'Saad Bin Abid', 'reason': ''},
             'created_at': '2022-12-16T12:24:40.161545Z', 'end_time': '2022-12-30T07:00:00.000000Z', 'event_guests': [],
             'event_memberships': [{'user': 'https://api.calendly.com/users/3e1c14de-01c9-4ea8-a87b-faf2b858b580'}],
             'event_type': 'https://api.calendly.com/event_types/c7585710-0565-43e6-a9de-d625a21ef718',
             'invitees_counter': {'active': 0, 'limit': 1, 'total': 1},
             'location': {'location': 'nwp', 'type': 'custom'}, 'name': 'custom',
             'start_time': '2022-12-30T06:30:00.000000Z', 'status': 'canceled',
             'updated_at': '2022-12-16T12:26:14.104694Z',
             'uri': 'https://api.calendly.com/scheduled_events/f6433492-c98d-4489-9b6a-2b4a245e714d'},
            {'calendar_event': {'external_id': '1v3st071amonu821k0v3hlt9q0', 'kind': 'google'},
             'created_at': '2022-12-16T15:02:01.821077Z', 'end_time': '2022-12-30T05:30:00.000000Z', 'event_guests': [],
             'event_memberships': [{'user': 'https://api.calendly.com/users/3e1c14de-01c9-4ea8-a87b-faf2b858b580'}],
             'event_type': 'https://api.calendly.com/event_types/9fa001e1-de93-410e-9b90-9a977d61fdc8',
             'invitees_counter': {'active': 1, 'limit': 1, 'total': 1},
             'location': {'location': 'bwp, punjab, lahore, pakistan', 'type': 'physical'}, 'name': 'Personal Meeting',
             'start_time': '2022-12-30T05:00:00.000000Z', 'status': 'active',
             'updated_at': '2022-12-16T15:02:02.585602Z',
             'uri': 'https://api.calendly.com/scheduled_events/5176d074-4fda-4dac-9e95-ae7d35e7d7ef'},
            {'calendar_event': {'external_id': 'svtdjmhr3j4ip1a8o2um080tmk', 'kind': 'google'},
             'created_at': '2023-01-11T17:11:18.439737Z', 'end_time': '2023-01-18T06:00:00.000000Z', 'event_guests': [],
             'event_memberships': [{'user': 'https://api.calendly.com/users/3e1c14de-01c9-4ea8-a87b-faf2b858b580'}],
             'event_type': 'https://api.calendly.com/event_types/9fa001e1-de93-410e-9b90-9a977d61fdc8',
             'invitees_counter': {'active': 1, 'limit': 1, 'total': 1},
             'location': {'location': 'bwp, punjab, lahore, pakistan', 'type': 'physical'}, 'name': 'Personal Meeting',
             'start_time': '2023-01-18T05:30:00.000000Z', 'status': 'active',
             'updated_at': '2023-01-11T17:11:19.194895Z',
             'uri': 'https://api.calendly.com/scheduled_events/662e6561-ba9f-42e9-bdae-ecf75353f623'}],
            'pagination': {'count': 16, 'next_page': None, 'next_page_token': None,
                           'previous_page': None, 'previous_page_token': None}}, 'status_code': 200}
        organization_invitations_list_mock.return_value = response
        Response = self.client.get(
            '/modules/calendly/service/scheduled/event/list/',
            {'organization': 'https://api.calendly.com/organizations/9a2db856-b354-4c0d-96f7-79b7dc45e3d9'}
        )
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertEqual(Response.data, response['data'])
        self.assertEqual(Response.data['collection'][00]['calendar_event']['kind'],
                         response['data']['collection'][00]['calendar_event']['kind'])
        self.assertEqual(Response.data['pagination']['next_page'], response['data']['pagination']['next_page'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.scheduled_events_list')
    def test_scheduled_events_list_with_wrong_params(self, organization_invitations_list_mock):
        """
        Test scheduled events list with wrong params  and check the response
        """
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}

        organization_invitations_list_mock.return_value = response
        Response = self.client.get(
            '/modules/calendly/service/scheduled/event/list/',
            {'organization': 'https://api.calendly.com/organizations/9a2db856-b354-4c0d-96f7-79b7dc45e3d9'}
        )
        self.assertEqual(Response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Response.data, response['data'])
        self.assertEqual(Response.data['message'], response['data']['message'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.single_user_availability_schedules')
    def test_single_user_availability_schedules(self, single_user_availability_schedules_mock):
        """
        Test single user availability schedules and check the response
        """
        response = {'data': {'resource': {'default': True, 'name': 'Working hours',
                                          'rules': [{'type': 'wday', 'wday': 'sunday', 'intervals': []},
                                                    {'type': 'wday', 'wday': 'monday',
                                                     'intervals': [{'from': '09:00', 'to': '17:00'}]},
                                                    {'type': 'wday', 'wday': 'tuesday',
                                                     'intervals': [{'from': '09:00', 'to': '17:00'}]},
                                                    {'type': 'wday', 'wday': 'wednesday',
                                                     'intervals': [{'from': '09:00', 'to': '17:00'}]},
                                                    {'type': 'wday', 'wday': 'thursday',
                                                     'intervals': [{'from': '09:00', 'to': '17:00'}]},
                                                    {'type': 'wday', 'wday': 'friday',
                                                     'intervals': [{'from': '09:00', 'to': '17:00'}]},
                                                    {'type': 'wday', 'wday': 'saturday', 'intervals': []}],
                                          'timezone': 'Asia/Karachi',
                                          'uri': 'https://api.calendly.com/user_availability_schedules/2d647721-4482-4424-a1f3-41a9cabcce26',
                                          'user': 'https://api.calendly.com/users/3e1c14de-01c9-4ea8-a87b-faf2b858b580'}},
                    'status_code': 200}

        single_user_availability_schedules_mock.return_value = response
        uuid = '2d647721-4482-4424-a1f3-41a9cabcce26'
        Response = self.client.get(
            f'/modules/calendly/service/{uuid}/user/single/availability-schedules/'
        )
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertEqual(Response.data, response['data'])
        self.assertEqual(Response.data['resource']['name'], response['data']['resource']['name'])
        self.assertEqual(Response.data['resource']['rules'], response['data']['resource']['rules'])
        self.assertEqual(Response.data['resource']['timezone'], response['data']['resource']['timezone'])
        self.assertEqual(Response.data['resource']['uri'], response['data']['resource']['uri'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.single_user_availability_schedules')
    def test_single_user_availability_schedules_with_wrong_uuid(self, single_user_availability_schedules_mock):
        """
        Test single user availability schedules with invalid uuid and check the response
        """
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}
        single_user_availability_schedules_mock.return_value = response
        uuid = '2d647721-4482-4424-a13-41a9cabcce26'
        Response = self.client.get(
            f'/modules/calendly/service/{uuid}/user/single/availability-schedules/'
        )
        self.assertEqual(Response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Response.data, response['data'])
        self.assertEqual(Response.data['message'], response['data']['message'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.invite_user_organizations')
    def test_invite_user_organizations(self, invite_user_organizations_mock):
        """
        Test invite user organizations  and check the response
        """
        response = {'data': {
            'resource': {'created_at': '2023-01-12T14:38:04.696507Z', 'email': 'saad.abi@crowdbotics.com',
                         'last_sent_at': '2023-01-12T14:38:04.754166Z',
                         'organization': 'https://api.calendly.com/organizations/48335900-a45e-47a5-bfcc-382103e900d5',
                         'status': 'pending', 'updated_at': '2023-01-12T14:38:04.754625Z',
                         'uri': 'https://api.calendly.com/organizations/48335900-a45e-47a5-bfcc-382103e900d5/invitations/fe80a0ee-bbac-46ac-a3e0-2307f586a3e3'}},
            'status_code': 201}
        invite_user_organizations_mock.return_value = response
        uuid = '48335900-a45e-47a5-bfcc-382103e900d5'
        Response = self.client.post(
            f'/modules/calendly/service/{uuid}/organization/invite/'
        )
        self.assertEqual(Response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Response.data, response['data'])
        self.assertEqual(Response.data['resource']['email'], response['data']['resource']['email'])
        self.assertEqual(Response.data['resource']['organization'], response['data']['resource']['organization'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.invite_user_organizations')
    def test_invite_user_organizations_with_wrong_uuid(self, invite_user_organizations_mock):
        """
        Test invite user organizations with wrong uuid and check the response
        """
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}
        invite_user_organizations_mock.return_value = response
        uuid = '48335900-a45e-47a5-bfcc-382103e900d5'
        Response = self.client.post(
            f'/modules/calendly/service/{uuid}/organization/invite/'
        )
        self.assertEqual(Response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Response.data, response['data'])
        self.assertEqual(Response.data['message'], response['data']['message'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.revoke_user_organization_invitation')
    def test_revoke_user_organization_invitation(self, revoke_user_organization_invitation_mock):
        """
        Test revoke user organization invitation  and check the response
        """
        response = {'data': {'message': 'Item deleted successfully.'}, 'status_code': 204}
        revoke_user_organization_invitation_mock.return_value = response
        Response = self.client.delete(
            '/modules/calendly/service/organization/revoke/invitation/',
            {'uuid': 'fe80a0ee-bbac-46ac-a3e0-2307f586a3e3', 'org_uuid': '48335900-a45e-47a5-bfcc-382103e900d5'}
        )
        self.assertEqual(Response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Response.data, response['data'])
        self.assertEqual(Response.data['message'], response['data']['message'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.revoke_user_organization_invitation')
    def test_revoke_user_organization_invitation_with_invalid_uuid(self, revoke_user_organization_invitation_mock):
        """
        Test revoke user organization invitation with invalid uuid and check the response
        """
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}
        revoke_user_organization_invitation_mock.return_value = response
        Response = self.client.delete(
            '/modules/calendly/service/organization/revoke/invitation/',
            {'uuid': 'fe80a0ee-bbac-46ac-a3e0-2307f586a3e3', 'org_uuid': '48335900-a45e-47a5-bfcc-382103e900d5'}
        )
        self.assertEqual(Response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Response.data, response['data'])
        self.assertEqual(Response.data['message'], response['data']['message'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.single_organization_invitation')
    def test_single_organization_invitation(self, single_organization_invitation_mock):
        """
        Test single organization invitation and check the response
        """
        response = {'data': {'resource': {'created_at': '2023-01-12T14:18:03.743223Z', 'email': 'john@example.com',
                                          'last_sent_at': '2023-01-12T14:18:03.817437Z',
                                          'organization': 'https://api.calendly.com/organizations/48335900-a45e-47a5-bfcc-382103e900d5',
                                          'status': 'pending', 'updated_at': '2023-01-12T14:18:03.818187Z',
                                          'uri': 'https://api.calendly.com/organizations/48335900-a45e-47a5-bfcc-382103e900d5/invitations/c7197e99-32f1-4679-9ca5-80b0ba41ef89'}},
                    'status_code': 200}
        single_organization_invitation_mock.return_value = response
        Response = self.client.get(
            '/modules/calendly/service/organization/single/invitation/',
            {'uuid': 'c7197e99-32f1-4679-9ca5-80b0ba41ef89', 'org_uuid': '48335900-a45e-47a5-bfcc-382103e900d5'}
        )
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertEqual(Response.data, response['data'])
        self.assertEqual(Response.data['resource']['email'], response['data']['resource']['email'])
        self.assertEqual(Response.data['resource']['last_sent_at'], response['data']['resource']['last_sent_at'])
        self.assertEqual(Response.data['resource']['organization'], response['data']['resource']['organization'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.single_organization_invitation')
    def test_single_organization_invitation_with_wrong_uuid(self, single_organization_invitation_mock):
        """
        Test  single organization invitation with wrong uuid and check the response
        """
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}
        single_organization_invitation_mock.return_value = response
        Response = self.client.get(
            '/modules/calendly/service/organization/single/invitation/',
            {'uuid': 'c7197e99-32f1-4679-9ca5-80b0ba41ef89', 'org_uuid': '48335900-a45e-47a5-bfcc-382103e900d5'}
        )
        self.assertEqual(Response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Response.data, response['data'])
        self.assertEqual(Response.data['message'], response['data']['message'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.organization_membership_list')
    def test_organization_membership_list(self, organization_membership_list_mock):
        """
        Test organization membership list  and check the response
        """
        response = {'data': {
            "collection": [
                {
                    "created_at": "2023-01-12T13:56:47.079767Z",
                    "organization": "https://api.calendly.com/organizations/48335900-a45e-47a5-bfcc-382103e900d5",
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
        }}

        organization_membership_list_mock.return_value = response
        Response = self.client.get(
            '/modules/calendly/service/organization/membership/list/',
            {'organization': 'https://api.calendly.com/organizations/48335900-a45e-47a5-bfcc-382103e900d5'}
        )
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertEqual(Response.data, response['data'])
        self.assertEqual(Response.data['collection'][0]['organization'],
                         response['data']['collection'][0]['organization'])
        self.assertEqual(Response.data['collection'][0]['role'], response['data']['collection'][0]['role'])
        self.assertEqual(Response.data['pagination']['next_page'], response['data']['pagination']['next_page'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.organization_membership_list')
    def test_organization_membership_list_with_wrong_organization_uuid(self, organization_membership_list_mock):
        """
        Test organization membership list with wrong organization uuid and check the response
        """
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}
        organization_membership_list_mock.return_value = response
        Response = self.client.get(
            '/modules/calendly/service/organization/membership/list/',
            {'organization': 'https://api.calendly.com/organizations/48335900-a45e-47a5-bfcc-382103e900d5'}
        )
        self.assertEqual(Response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Response.data, response['data'])
        self.assertEqual(Response.data['message'], response['data']['message'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.remove_user_organization_membership')
    def test_remove_user_organization_membership(self, remove_user_organization_membership_mock):
        """
        Test remove user organization membership and check the response
        """
        response = {'data': {'message': 'Item deleted successfully.'}, 'status_code': 204}
        remove_user_organization_membership_mock.return_value = response
        uuid = '47fe2e25-11bc-4c2d-9538-962762d31418'
        Response = self.client.delete(
            f'/modules/calendly/service/{uuid}/organization/remove/membership/'
        )
        self.assertEqual(Response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Response.data, response['data'])
        self.assertEqual(Response.data['message'], response['data']['message'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.remove_user_organization_membership')
    def test_remove_user_organization_membership_with_invalid_uuid(self, remove_user_organization_membership_mock):
        """
        Test remove user organization membership with invalid uuid and check the response
        """
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}
        remove_user_organization_membership_mock.return_value = response
        uuid = '47fe2e25-11bc-4c2d-9538-962762d31418'
        Response = self.client.delete(
            f'/modules/calendly/service/{uuid}/organization/remove/membership/'
        )
        self.assertEqual(Response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Response.data, response['data'])
        self.assertEqual(Response.data['message'], response['data']['message'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.list_schedule_event_invitee')
    def test_list_schedule_event_invitee(self, list_schedule_event_invitee_mock):
        """
        Test list schedule even invitee and check the response
        """
        response = {'data': {'collection': [
            {'cancel_url': 'https://calendly.com/cancellations/7dbb53ac-b164-4c0c-9bfe-5dc93c9365db',
             'created_at': '2023-01-12T16:10:55.264711Z', 'email': 'demomodule.123@gmail.com',
             'event': 'https://api.calendly.com/scheduled_events/8878b00c-b30d-45c5-85ea-531d02cfe2a8',
             'first_name': None, 'last_name': None, 'name': 'Tomorrow events 2', 'new_invitee': None, 'no_show': None,
             'old_invitee': None, 'payment': None, 'questions_and_answers': [], 'reconfirmation': None,
             'reschedule_url': 'https://calendly.com/reschedulings/7dbb53ac-b164-4c0c-9bfe-5dc93c9365db',
             'rescheduled': False, 'routing_form_submission': None, 'status': 'active', 'text_reminder_number': None,
             'timezone': 'Asia/Karachi',
             'tracking': {'utm_campaign': None, 'utm_source': None, 'utm_medium': None, 'utm_content': None,
                          'utm_term': None, 'salesforce_uuid': None}, 'updated_at': '2023-01-12T16:10:55.264711Z',
             'uri': 'https://api.calendly.com/scheduled_events/8878b00c-b30d-45c5-85ea-531d02cfe2a8/invitees/7dbb53ac-b164-4c0c-9bfe-5dc93c9365db'}],
            'pagination': {'count': 1, 'next_page': None, 'next_page_token': None,
                           'previous_page': None, 'previous_page_token': None}}, 'status_code': 200}
        list_schedule_event_invitee_mock.return_value = response
        uuid = '8878b00c-b30d-45c5-85ea-531d02cfe2a8'
        Response = self.client.get(
            f'/modules/calendly/service/{uuid}/invitee/list/event-schedule/'
        )
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertEqual(Response.data, response['data'])
        self.assertEqual(Response.data['collection'][0]['email'], response['data']['collection'][0]['email'])
        self.assertEqual(Response.data['collection'][0]['old_invitee'],
                         response['data']['collection'][0]['old_invitee'])
        self.assertEqual(Response.data['collection'][0]['reschedule_url'],
                         response['data']['collection'][0]['reschedule_url'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.list_schedule_event_invitee')
    def test_list_schedule_event_invitee_with_invalid_uuid(self, list_schedule_event_invitee_mock):
        """
        Test list schedule even invitee with invalid uuid and check the response
        """
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}
        list_schedule_event_invitee_mock.return_value = response
        uuid = '8878b00c-b30d-45c5-85ea-531d02cfe2a8'
        Response = self.client.get(
            f'/modules/calendly/service/{uuid}/invitee/list/event-schedule/'
        )
        self.assertEqual(Response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Response.data, response['data'])
        self.assertEqual(Response.data['message'], response['data']['message'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.single_event_schedule')
    def test_single_event_schedule(self, single_event_schedule_mock):
        """
        Test single event schedule and check the response
        """
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
                "uri": "https://api.calendly.com/scheduled_events/8878b00c-b30d-45c5-85ea-531d02cfe2a8"
            }
        }}
        single_event_schedule_mock.return_value = response
        uuid = '8878b00c-b30d-45c5-85ea-531d02cfe2a8'
        Response = self.client.get(
            f'/modules/calendly/service/{uuid}/schedule/event/single/'
        )
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertEqual(Response.data, response['data'])
        self.assertEqual(Response.data['resource']['end_time'], response['data']['resource']['end_time'])
        self.assertEqual(Response.data['resource']['event_guests'], response['data']['resource']['event_guests'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.single_event_schedule')
    def test_single_event_schedule_with_invalid_uuid(self, single_event_schedule_mock):
        """
        Test single event schedule with invalid uuid and check the response
        """
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}
        single_event_schedule_mock.return_value = response
        uuid = '8878b00c-b30d-45c5-85ea-531d02cfe2a8'
        Response = self.client.get(
            f'/modules/calendly/service/{uuid}/schedule/event/single/'
        )
        self.assertEqual(Response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Response.data, response['data'])
        self.assertEqual(Response.data['message'], response['data']['message'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.user_busy_times')
    def test_user_busy_times(self, user_busy_times_mock):
        """
        Test user busy time  and check the response
        """
        response = {'data': {'collection': []}, 'status_code': 200}
        user_busy_times_mock.return_value = response
        Response = self.client.get(
            f'/modules/calendly/service/user/busy-times/', {'start_time': '2023-01-26T20:00:00.000000Z',
                                                            'user': 'https://api.calendly.com/users/4a7bf33a-242b-478d-ae5f-10bbd271be33',
                                                            'end_time': '2023-01-26T24:00:00.000000Z'}
        )
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertEqual(Response.data, response['data'])
        self.assertEqual(Response.data['collection'], response['data']['collection'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.user_busy_times')
    def test_user_busy_times_with_wrong_params(self, user_busy_times_mock):
        """
        Test user busy time with wrong params in url and check the response
        """
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}
        user_busy_times_mock.return_value = response
        Response = self.client.get(
            f'/modules/calendly/service/user/busy-times/', {'start_time': '2023-01-26T20:00:00.000000Z',
                                                            'user': 'https://api.calendly.com/users/4a7bf33a-242b-478d-ae5f-10bbd271be33',
                                                            'end_time': '2023-01-26T24:00:00.000000Z'}
        )
        self.assertEqual(Response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Response.data, response['data'])
        self.assertEqual(Response.data['message'], response['data']['message'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.cancel_schedule_event')
    def test_cancel_schedule_event(self, cancel_schedule_event_mock):
        """
        Test cancel schedule event and check the response
        """
        response = {'data': {'resource': {'canceled_by': 'demo 123', 'canceler_type': 'host', 'reason': None}},
                    'status_code': 201}

        cancel_schedule_event_mock.return_value = response
        uuid = 'c1a24978-f568-4df4-abb5-28cdbc0f4667'
        Response = self.client.post(
            f'/modules/calendly/service/{uuid}/schedule/event/cancel/'
        )
        self.assertEqual(Response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Response.data, response['data'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.cancel_schedule_event')
    def test_cancel_schedule_event_with_not_exist_uuid(self, cancel_schedule_event_mock):
        """
        Test cancel schedule event  with not exist uuid and check the response
        """
        response = {'data': {'title': 'Permission Denied', 'message': 'You are not allowed to cancel this event'},
                    'status_code': 403}
        cancel_schedule_event_mock.return_value = response
        uuid = 'c1a24978-f568-4df4-abb5-28cdbc0f4667'
        Response = self.client.post(
            f'/modules/calendly/service/{uuid}/schedule/event/cancel/'
        )
        self.assertEqual(Response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(Response.data, response['data'])
        self.assertEqual(Response.data['message'], response['data']['message'])
        self.assertEqual(Response.data['title'], response['data']['title'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.cancel_schedule_event')
    def test_cancel_schedule_event_with_invalid_uuid(self, cancel_schedule_event_mock):
        """
        Test cancel schedule event with wrong uuid and check the response
        """
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}

        cancel_schedule_event_mock.return_value = response
        uuid = 'c1a24978-f568-4df4-abb5-28cdbc0f4667'
        Response = self.client.post(
            f'/modules/calendly/service/{uuid}/schedule/event/cancel/'
        )
        self.assertEqual(Response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Response.data, response['data'])
        self.assertEqual(Response.data['message'], response['data']['message'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.create_invitee_no_show')
    def test_create_invitee_no_show(self, create_invitee_no_show_mock):
        """
        Test create invitee no show  and check the response
        """
        response = {'data': {
            "resource": {
                "uri": "https://api.calendly.com/invitee_no_shows/639fa667-4c1b-4b20-93b5-1b1969d67dc6",
                "invitee": "https://api.calendly.com/scheduled_events/GBGBDCAADAEDCRZ2/invitees/7c1dbe46-bd84-42e2-9b97-05e2fb379bfe",
                "created_at": "2019-01-02T03:04:05.678123Z"
            }
        },
            'status_code': 200}

        create_invitee_no_show_mock.return_value = response
        data = {
            "invitee": "https://api.calendly.com/scheduled_events/GBGBDCAADAEDCRZ2/invitees/7c1dbe46-bd84-42e2-9b97-05e2fb379bfe"
        }
        Response = self.client.post(
            '/modules/calendly/service/create/invitee-no-show/', data=data
        )
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertEqual(Response.data, response['data'])
        self.assertEqual(Response.data['resource']['uri'], response['data']['resource']['uri'])
        self.assertEqual(Response.data['resource']['invitee'], response['data']['resource']['invitee'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.create_invitee_no_show')
    def test_create_invitee_no_show_with_invalid_data(self, create_invitee_no_show_mock):
        """
        Test create invitee no show with invalid data and check the response
        """
        response = {'data': {'title': 'Invalid Argument', 'message': 'The supplied parameters are invalid.',
                             'details': [{'message': 'Event is not started yet', 'parameter': 'base'}]},
                    'status_code': 400}

        create_invitee_no_show_mock.return_value = response
        data = {
            "invitee": "https://api.calendly.com/scheduled_events/GBGBDCAADAEDCRZ2/invitees/7c1dbe46-bd84-42e2-9b97-05e2fb379bfe"
        }
        Response = self.client.post(
            '/modules/calendly/service/create/invitee-no-show/', data=data
        )
        self.assertEqual(Response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Response.data, response['data'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.create_invitee_no_show')
    def test_create_invitee_no_show_with_invalid_invitee_link(self, create_invitee_no_show_mock):
        """
        Test create invitee no show with invalid invitee link and check the response
        """
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}

        create_invitee_no_show_mock.return_value = response
        data = {
            "invitee": "https://api.calendly.com/scheduled_events/GBGBDCAADAEDCRZ2/invitees/7c1dbe46-bd84-42e2-9b97-05e2fb379bfe"
        }
        Response = self.client.post(
            '/modules/calendly/service/create/invitee-no-show/', data=data
        )
        self.assertEqual(Response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Response.data, response['data'])
        self.assertEqual(Response.data['message'], response['data']['message'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.single_invitee_no_show')
    def test_single_invitee_no_show(self, single_invitee_no_show_mock):
        """
        Test single invitee no show  and check the response
        """
        response = {'data': {
            "resource": {
                "uri": "https://api.calendly.com/invitee_no_shows/639fa667-4c1b-4b20-93b5-1b1969d67dc6",
                "invitee": "https://api.calendly.com/scheduled_events/GBGBDCAADAEDCRZ2/invitees/7c1dbe46-bd84-42e2-9b97-05e2fb379bfe",
                "created_at": "2019-01-02T03:04:05.678123Z"
            }
        }, 'status_code': 200}

        single_invitee_no_show_mock.return_value = response
        uuid = '7dbb53ac-b164-4c0c-9bfe-5dc93c9365db'
        Response = self.client.get(
            f'/modules/calendly/service/{uuid}/single/invitee-no-show/'
        )
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertEqual(Response.data, response['data'])
        self.assertEqual(Response.data['resource']['uri'], response['data']['resource']['uri'])
        self.assertEqual(Response.data['resource']['invitee'], response['data']['resource']['invitee'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.single_invitee_no_show')
    def test_single_invitee_no_show_with_invalid_uuid(self, single_invitee_no_show_mock):
        """
        Test single invitee no show with invalid uuid  and check the response
        """
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}

        single_invitee_no_show_mock.return_value = response
        uuid = '7dbb53ac-b164-4c0c-9bfe-5dc93c9365db'
        Response = self.client.get(
            f'/modules/calendly/service/{uuid}/single/invitee-no-show/'
        )
        self.assertEqual(Response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Response.data, response['data'])
        self.assertEqual(Response.data['message'], response['data']['message'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.remove_invitee_no_show')
    def test_remove_invitee_no_show(self, remove_invitee_no_show_mock):
        """
        Test remove invitee no show  and check the response
        """
        response = {
            "data": {
                "message": "Item deleted successfully."
            },
            "status_code": 204
        }
        remove_invitee_no_show_mock.return_value = response
        uuid = '3e1c14de-01c9-4ea8-a87b-faf2b858b580'
        Response = self.client.delete(
            f'/modules/calendly/service/{uuid}/remove/invitee-no-show/'
        )
        self.assertEqual(Response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Response.data, response['data'])
        self.assertEqual(Response.data['message'], response['data']['message'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.remove_invitee_no_show')
    def test_remove_invitee_no_show_with_invalid_uuid(self, remove_invitee_no_show_mock):
        """
        Test remove invitee no show with invalid uuid and check the response
        """
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}
        remove_invitee_no_show_mock.return_value = response
        uuid = '3e1c14de-01c9-4ea8-a87b-faf2b858b580'
        Response = self.client.delete(
            f'/modules/calendly/service/{uuid}/remove/invitee-no-show/'
        )
        self.assertEqual(Response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Response.data, response['data'])
        self.assertEqual(Response.data['message'], response['data']['message'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.create_webhook_subscription')
    def test_create_webhook_subscription(self, create_webhook_subscription_mock):
        """
        Test create webhook subscription and check the response
        """
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
            "url": "https://c21c-39-53-74-22.in.ngrok.io/modules/calendly/webhook-url/",
            "events": [
                "invitee.created",
                "invitee.canceled"
            ],
            "organization": "https://api.calendly.com/organizations/48335900-a45e-47a5-bfcc-382103e900d5",
            "scope": "organization"
        }
        Response = self.client.post(
            '/modules/calendly/service/create/webhook/subscription/', data=data
        )
        self.assertEqual(Response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Response.data, response['data'])
        self.assertEqual(Response.data['resource']['uri'], response['data']['resource']['uri'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.create_webhook_subscription')
    def test_create_webhook_subscription_with_duplicate_data(self, create_webhook_subscription_mock):
        """
        Test create webhook subscription with duplicate data and check the response
        """
        response = {'data': {'title': 'Already Exists', 'message': 'Hook with this url already exists'},
                    'status_code': 409}
        create_webhook_subscription_mock.return_value = response
        data = {
            "url": "https://c21c-39-53-74-22.in.ngrok.io/modules/calendly/webhook-url/",
            "events": [
                "invitee.created",
                "invitee.canceled"
            ],
            "organization": "https://api.calendly.com/organizations/48335900-a45e-47a5-bfcc-382103e900d5",
            "scope": "organization"
        }
        Response = self.client.post(
            '/modules/calendly/service/create/webhook/subscription/', data=data
        )
        self.assertEqual(Response.status_code, status.HTTP_409_CONFLICT)
        self.assertEqual(Response.data, response['data'])
        self.assertEqual(Response.data['message'], response['data']['message'])
        self.assertEqual(Response.data['title'], response['data']['title'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.create_webhook_subscription')
    def test_create_webhook_subscription_with_invalid_data(self, create_webhook_subscription_mock):
        """
        Test create webhook subscription with invalid data  and check the response
        """
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}
        create_webhook_subscription_mock.return_value = response
        data = {
            "url": "https://c21c-39-53-74-22.in.ngrok.io/modules/calendly/webhook-url/",
            "events": [
                "invitee.created",
                "invitee.canceled"
            ],
            "organization": "https://api.calendly.com/organizations/48335900-a45e-47a5-bfcc-382103e900d5",
            "scope": "organization"
        }
        Response = self.client.post(
            '/modules/calendly/service/create/webhook/subscription/', data=data
        )
        self.assertEqual(Response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Response.data, response['data'])
        self.assertEqual(Response.data['message'], response['data']['message'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.webhook_subscription_list')
    def test_webhook_subscription_list(self, webhook_subscription_list_mock):
        """
        Test webhook subscription list  and check the response
        """
        response = {'data': {'collection': [
            {'callback_url': 'https://c21c-39-53-74-22.in.ngrok.io/modules/calendly/webhook-url/',
             'created_at': '2023-01-12T17:38:11.973696Z',
             'creator': 'https://api.calendly.com/users/4a7bf33a-242b-478d-ae5f-10bbd271be33',
             'events': ['invitee.created', 'invitee.canceled'],
             'organization': 'https://api.calendly.com/organizations/48335900-a45e-47a5-bfcc-382103e900d5',
             'retry_started_at': None, 'scope': 'organization', 'state': 'active',
             'updated_at': '2023-01-12T17:38:11.973696Z',
             'uri': 'https://api.calendly.com/webhook_subscriptions/e99982f9-719d-41e4-8544-8c837353c24f',
             'user': None}], 'pagination': {'count': 1, 'next_page': None, 'next_page_token': None,
                                            'previous_page': None, 'previous_page_token': None}}, 'status_code': 200}
        webhook_subscription_list_mock.return_value = response

        Response = self.client.get(
            '/modules/calendly/service/webhook/subscription/list/',
            {'organization': 'https://api.calendly.com/organizations/48335900-a45e-47a5-bfcc-382103e900d5',
             'scope': 'organization'}
        )
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertEqual(Response.data, response['data'])
        self.assertEqual(Response.data['collection'][0]['events'][0], response['data']['collection'][0]['events'][0])
        self.assertEqual(Response.data['collection'][0]['creator'], response['data']['collection'][0]['creator'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.webhook_subscription_list')
    def test_webhook_subscription_list_without_params(self, webhook_subscription_list_mock):
        """
        Test webhook subscription list without params  and check the response
        """
        response = {'data': {'details': [{'message': 'must be one of: organization, user', 'parameter': 'scope'},
                                         {'message': 'invalid', 'parameter': 'organization'}],
                             'message': 'The supplied parameters are invalid.', 'title': 'Invalid Argument'},
                    'status_code': 400}
        webhook_subscription_list_mock.return_value = response

        Response = self.client.get(
            '/modules/calendly/service/webhook/subscription/list/'
        )
        self.assertEqual(Response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Response.data, response['data'])
        self.assertEqual(Response.data['message'], response['data']['message'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.webhook_subscription_list')
    def test_webhook_subscription_list_with_wrong_params(self, webhook_subscription_list_mock):
        """
        Test webhook subscription list  with wrong params  and check the response
        """
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}
        webhook_subscription_list_mock.return_value = response

        Response = self.client.get(
            '/modules/calendly/service/webhook/subscription/list/',
            {'organization': 'https://api.calendly.com/organizations/48335900-a45e-47a5-bfcc-382103e900d5',
             'scope': 'organization'}
        )
        self.assertEqual(Response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Response.data, response['data'])
        self.assertEqual(Response.data['message'], response['data']['message'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.single_webhook_subscription')
    def test_single_webhook_subscription(self, single_webhook_subscription_mock):
        """
        Test single webhook subscription and check the response
        """
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
        Response = self.client.get(
            f'/modules/calendly/service/{uuid}/single/webhook/subscription/'
        )
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertEqual(Response.data, response['data'])
        self.assertEqual(Response.data['resource']['callback_url'], response['data']['resource']['callback_url'])
        self.assertEqual(Response.data['resource']['retry_started_at'], response['data']['resource']['retry_started_at'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.single_webhook_subscription')
    def test_single_webhook_subscription_with_wrong_uuid(self, single_webhook_subscription_mock):
        """
        Test single webhook subscription with wrong uuid and check the response
        """
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}
        single_webhook_subscription_mock.return_value = response
        uuid = 'e99982f9-719d-41e4-8544-8c837353c24f'
        Response = self.client.get(
            f'/modules/calendly/service/{uuid}/single/webhook/subscription/'
        )
        self.assertEqual(Response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Response.data, response['data'])
        self.assertEqual(Response.data['message'], response['data']['message'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.remove_webhook_subscription')
    def test_remove_webhook_subscription(self, remove_webhook_subscription_mock):
        """
        Test remove webhook subscription  and check the response
        """
        response = {
            "data": {
                "message": "Item deleted successfully."
            },
            "status_code": 204
        }
        remove_webhook_subscription_mock.return_value = response
        uuid = '3e1c14de-01c9-4ea8-a87b-faf2b858b580'
        Response = self.client.delete(
            f'/modules/calendly/service/{uuid}/remove/webhook/subscription/'
        )
        self.assertEqual(Response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Response.data, response['data'])
        self.assertEqual(Response.data['message'], response['data']['message'])

    @mock.patch('modules.django_calendly.calendly.viewsets.CalendlyService.remove_webhook_subscription')
    def test_remove_webhook_subscription_with_invalid_uuid(self, remove_webhook_subscription_mock):
        """
        Test remove webhook subscription with invalid uuid and check the response
        """
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}
        remove_webhook_subscription_mock.return_value = response
        uuid = '3e1c14de-01c9-4ea8-a87b-faf2b858b580'
        Response = self.client.delete(
            f'/modules/calendly/service/{uuid}/remove/webhook/subscription/'
        )
        self.assertEqual(Response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Response.data, response['data'])
        self.assertEqual(Response.data['message'], response['data']['message'])
