from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from unittest import mock


class TestBlackbaudViewSet(APITestCase):

    @mock.patch('modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.auth_token')
    def test_auth_token_with_valid_code(self, auth_token_mock):
        response = {
            'data': {
                'access_token': 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjREVjZzVkxIM0FtU1JTbUZqMk04Wm5wWHU3WSIsInR5cCI6IkpXVCJ9',
                'token_type': 'Bearer',
                'expires_in': 3600,
                'refresh_token': '3acfeff905c442cfb7669fd26df4b751',
                'environment_id': 'p-vnVAbDtfu0GyMqSDmG-_qw',
                'environment_name': 'SKY Developer Cohort Environment 1',
                'legal_entity_id': 'p-gVqr_yOSkUqsEKtm-ZpJnA',
                'legal_entity_name': 'SKY Developer Cohort',
                'user_id': '95d4bbb4-2295-432f-aa77-dd4e7a5da8dc',
                'email': 'demo.123@crowdbotics.com',
                'family_name': 'modules',
                'given_name': 'demos',
                'refresh_token_expires_in': 31622399,
                'mode': 'Full'
            },
            'status_code': 200
        }
        auth_token_mock.return_value = response
        data = {
            'code': "f1c25e95cc9c4b718a8c64d1be7f1d67"
        }
        Response = self.client.post(reverse('blackbaud-get-access-token'), data=data)
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        auth_token_mock.assert_called()

    @mock.patch('modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.auth_token')
    def test_auth_token_with_invalid_code(self, auth_token_mock):
        response = {
            'data': {
                'error': 'invalid_grant',
                'error_description': 'The authorization code was not valid.'
            },
            'status_code': 400}
        auth_token_mock.return_value = response
        data = {
            'code': "f1c25e95cc9c4b718a8c6"
        }
        Response = self.client.post(reverse('blackbaud-get-access-token'), data=data)
        self.assertEqual(Response.status_code, status.HTTP_400_BAD_REQUEST)
        auth_token_mock.assert_called_once()

    @mock.patch('modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.auth_token')
    def test_auth_token_without_code(self, auth_token_mock):
        response = {
            'data': {
                'error': 'invalid_request',
                'error_description': 'The required code parameter was not provided.'
            },
            'status_code': 400}
        auth_token_mock.return_value = response
        data = {

        }
        Response = self.client.post(reverse('blackbaud-get-access-token'), data=data)
        self.assertEqual(Response.status_code, status.HTTP_400_BAD_REQUEST)
        auth_token_mock.assert_called_once()

    @mock.patch('modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.event_list')
    def test_event_list(self, event_list_mock):
        response = {
            'data': {
                'count': 1788,
                'value': [
                    {
                        'id': '32583',
                        'lookup_id': '30830',
                        'name': 'd360 test event',
                        'start_date': '2023-05-02',
                        'start_time': '17:55',
                        'end_date': '2023-05-05',
                        'end_time': '05:55',
                        'attending_count': 0,
                        'invited_count': 0,
                        'date_added': '2023-05-02T08:25:30.577-04:00',
                        'date_modified': '2023-05-02T08:25:30.65-04:00',
                        'capacity': 0,
                        'inactive': False,
                        'attended_count': 0,
                        'category': {
                            'id': '1893',
                            'name': 'Annual Fundraiser',
                            'inactive': False
                        }
                    }
                ]
            }, 'status_code': 200
        }
        event_list_mock.return_value = response
        Response = self.client.get(reverse('blackbaud-get-event-list'))
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        event_list_mock.assert_called()

    @mock.patch('modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.event_details')
    def test_event_details_with_valid_event_id(self, event_details_mock):
        response = {
            'data': {
                'id': '32582',
                'category': {
                    'id': '1893',
                    'name': 'Annual Fundraiser',
                    'inactive': False
                },
                'date_added': '2023-04-25T15:25:33.56-04:00',
                'date_modified': '2023-04-25T15:28:44.96-04:00',
                'lookup_id': '30829',
                'name': 'ClickBid Sample Fundraiser',
                'description': '',
                'start_date': '2023-04-27',
                'end_date': '2023-04-27',
                'inactive': False,
                'capacity': 400,
                'goal': 100000.0,
                'campaign_id': '84204',
                'fund_id': '141531'
            },
            'status_code': 200
        }
        event_details_mock.return_value = response

        event_id = 32582
        url = reverse('blackbaud-get-event-details', kwargs={'event_id': event_id})
        Response = self.client.get(url)
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        event_details_mock.assert_called_once()

    @mock.patch('modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.event_details')
    def test_event_details_with_invalid_event_id(self, event_details_mock):
        response = {
            'data': [
                {
                    'error_code': 404,
                    'error_name': 'ResourceNotFound',
                    'message': 'The requested resource could not be found.',
                    'raw_message': 'The requested resource could not be found.'
                }
            ],
            'status_code': 404
        }
        event_details_mock.return_value = response
        event_id = 23
        url = reverse('blackbaud-get-event-details', kwargs={'event_id': event_id})
        Response = self.client.get(url)
        self.assertEqual(Response.status_code, status.HTTP_404_NOT_FOUND)
        event_details_mock.assert_called_once()

    @mock.patch(
        'modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.event_participants_list')
    def test_event_participants_list(self, event_participants_list_mock):
        response = {
            'data': {
                'count': 1,
                'value': [
                    {
                        'id': '12698',
                        'contact_id': '618930',
                        'date_added': '2023-04-25T15:29:42.947-04:00',
                        'date_modified': '2023-04-25T15400_BAD_REQUEST:29:42.99-04:00',
                        'is_constituent': True,
                        'lookup_id': 'c484319-50449-W4g',
                        'name': 'Active Test',
                        'first_name': 'Active',
                        'last_name': 'Test',
                        'email': 'testemail_1@q-give.com',
                        'do_not_email': False,
                        'participation_level': {
                            'id': '1772',
                            'name': 'Attendee',
                            'is_inactive': False
                        },
                        'attended': False,
                        'rsvp_status': 'Attending',
                        'invitation_status': 'Invited',
                        'rsvp_date': {
                            'd': 25,
                            'm': 4,
                            'y': 2023
                        },
                        'total_registration_fees': 0.0
                    }
                ]
            },
            'status_code': 200
        }
        event_participants_list_mock.return_value = response
        event_id = 32582
        Response = self.client.get(reverse('blackbaud-get-event-participants-list', kwargs={'event_id': event_id}))
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        event_participants_list_mock.assert_called_once()

    @mock.patch(
        'modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.event_participants_list')
    def test_event_participants_list_with_invalid_event_id(self, event_participants_list_mock):
        response = {
            'data': [
                {
                    'error_code': 404,
                    'error_name': 'ResourceNotFound',
                    'message': 'The requested resource could not be found.',
                    'raw_message': 'The requested resource could not be found.'
                }
            ],
            'status_code': 404
        }
        event_participants_list_mock.return_value = response
        event_id = 282
        Response = self.client.get(reverse('blackbaud-get-event-participants-list', kwargs={'event_id': event_id}))
        self.assertEqual(Response.status_code, status.HTTP_404_NOT_FOUND)
        event_participants_list_mock.assert_called_once()

    @mock.patch(
        'modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.consent_channels')
    def test_consent_channels(self, consent_channels_mock):
        response = {'data': {'count': 8, 'value': [{'description': 'AutoPhone'}, {'description': 'DataProcessing'},
                                                   {'description': 'Email'}, {'description': 'Mail'},
                                                   {'description': 'Other'}, {'description': 'Phone'},
                                                   {'description': 'SMS'}, {'description': 'Social'}]},
                    'status_code': 200}
        consent_channels_mock.return_value = response
        Response = self.client.get(reverse('blackbaud-get-consent-channels'))
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        consent_channels_mock.assert_called_once()

    @mock.patch(
        'modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.constituents_list')
    def test_constituents_list(self, constituents_list_mock):
        response = {'data': {'count': 28329,
                             'next_link': 'https://api.sky.blackbaud.com/constituent/v1/constituents?offset=500',
                             'value': [{'id': '618879',
                                        'address': {'id': '844072', 'address_lines': '1600 Amphitheatre Pkwy',
                                                    'city': 'Mountain View', 'constituent_id': '618879',
                                                    'country': 'United States', 'do_not_mail': False,
                                                    'formatted_address': '1600 Amphitheatre Pkwy\r\nMountain View,   94043',
                                                    'inactive': False, 'postal_code': '94043', 'preferred': True,
                                                    'type': 'Home'}, 'age': 1, 'birthdate': {'d': 1, 'm': 4, 'y': 2022},
                                        'date_added': '2022-05-05T02:37:19.31-05:00',
                                        'date_modified': '2023-04-01T00:03:29.986-04:00', 'deceased': False,
                                        'email': {'id': '46845', 'address': 'abc@t.com', 'constituent_id': '618879',
                                                  'do_not_email': False, 'inactive': False, 'primary': True,
                                                  'type': 'Email'}, 'type': 'Individual'}]}, 'status_code': 200}
        constituents_list_mock.return_value = response
        Response = self.client.get(reverse('blackbaud-get-constituents-list'))
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        constituents_list_mock.assert_called_once()
