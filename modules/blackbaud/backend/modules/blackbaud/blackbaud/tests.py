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
        invalid_event_id = 23
        url = reverse('blackbaud-get-event-details', kwargs={'event_id': invalid_event_id})
        Response = self.client.get(url)
        self.assertEqual(Response.status_code, status.HTTP_404_NOT_FOUND)
        event_details_mock.assert_called_once()

    @mock.patch('modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.event_participants_list')
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

    @mock.patch('modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.event_participants_list')
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
        invalid_event_id = 282
        Response = self.client.get(
            reverse('blackbaud-get-event-participants-list', kwargs={'event_id': invalid_event_id}))
        self.assertEqual(Response.status_code, status.HTTP_404_NOT_FOUND)
        event_participants_list_mock.assert_called_once()

    @mock.patch('modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.consent_channels')
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

    @mock.patch('modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.constituents_list')
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

    @mock.patch('modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.constituent_details_by_id')
    def test_get_constituent_details(self, get_constituent_details_mock):
        response = {'data': {'id': '618879', 'address': {'id': '844072', 'address_lines': '1600 Amphitheatre Pkwy',
                                                         'city': 'Mountain View', 'constituent_id': '618879',
                                                         'country': 'United States', 'do_not_mail': False,
                                                         'formatted_address': '1600 Amphitheatre Pkwy\r\nMountain View,   94043',
                                                         'inactive': False, 'postal_code': '94043', 'preferred': True,
                                                         'type': 'Home'}, 'age': 1,
                             'birthdate': {'d': 1, 'm': 4, 'y': 2022}, 'date_added': '2022-05-05T02:37:19.31-05:00',
                             'date_modified': '2023-04-01T00:03:29.986-04:00', 'deceased': False,
                             'email': {'id': '46845', 'address': 'abc@t.com', 'constituent_id': '618879',
                                       'do_not_email': False, 'inactive': False, 'primary': True, 'type': 'Email'},
                             'first': '__First name [SD]', 'fundraiser_status': 'None', 'gender': 'Unknown',
                             'gives_anonymously': False, 'inactive': False, 'last': ' Last name ',
                             'lookup_id': '58258156554', 'middle': 'Middle name',
                             'name': '__First name [SD] M.  Last name ', 'type': 'Individual', 'is_memorial': False,
                             'is_solicitor': False, 'no_valid_address': False, 'receipt_type': 'One receipt per gift',
                             'requests_no_email': False, 'import_id': '00001-593-0000618879', 'is_constituent': True},
                    'status_code': 200}
        get_constituent_details_mock.return_value = response
        constituent_id = 618879
        Response = self.client.get(
            reverse('blackbaud-get-constituent-details', kwargs={'constituent_id': constituent_id}))
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        get_constituent_details_mock.assert_called_once()

    @mock.patch('modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.constituent_details_by_id')
    def test_get_constituent_details_with_invalid_constituent_id(self, get_constituent_details_mock):
        response = {'data': [{'error_args': [], 'error_code': 404, 'error_name': 'RequestNotFulfilled',
                              'message': 'The requested operation could not be fulfilled',
                              'raw_message': 'The requested operation could not be fulfilled'}], 'status_code': 404}
        get_constituent_details_mock.return_value = response
        invalid_constituent_id = 61879
        Response = self.client.get(
            reverse('blackbaud-get-constituent-details', kwargs={'constituent_id': invalid_constituent_id}))
        self.assertEqual(Response.status_code, status.HTTP_404_NOT_FOUND)
        get_constituent_details_mock.assert_called_once()

    @mock.patch('modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.constituent_appeal_list')
    def test_get_constituent_appeal_list(self, get_constituent_appeal_list_mock):
        response = {'data': [{
            "count": 4,
            "value": [
                {
                    "id": "739",
                    "appeal": {
                        "id": "3",
                        "description": "Year End Appeal"
                    },
                    "constituent_id": "280",
                    "date": "2009-12-11T05:00:00Z"
                },
                {
                    "id": "740",
                    "appeal": {
                        "id": "20",
                        "category": {
                            "id": "1341",
                            "description": "Annual",
                            "inactive": False
                        },
                        "description": "Annual Mailing"
                    },
                    "constituent_id": "280",
                    "date": "2009-08-01T04:00:00Z"
                },
                {
                    "id": "741",
                    "appeal": {
                        "id": "26",
                        "category": {
                            "id": "1343",
                            "description": "Direct Mail",
                            "inactive": False
                        },
                        "description": "Direct Mailing"
                    },
                    "constituent_id": "280",
                    "date": "2009-05-15T04:00:00Z"
                },
                {
                    "id": "694",
                    "appeal": {
                        "id": "7",
                        "category": {
                            "id": "1347",
                            "description": "Event",
                            "inactive": False
                        },
                        "description": "Open House Letter"
                    },
                    "constituent_id": "280",
                    "package": {
                        "id": "4",
                        "description": "Electronic Invitation to the Open House"
                    }
                }
            ]
        }], 'status_code': 200}
        get_constituent_appeal_list_mock.return_value = response
        constituent_id = 619057
        Response = self.client.get(
            reverse('blackbaud-get-constituent-appeal-list', kwargs={'constituent_id': constituent_id}))
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        get_constituent_appeal_list_mock.assert_called_once()

    @mock.patch('modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.constituent_appeal_list')
    def test_get_constituent_appeal_list_with_invalid_constituent_id(self, get_constituent_appeal_list_mock):
        response = {'data': [{'error_args': [], 'error_code': 404, 'error_name': 'RequestNotFulfilled',
                              'message': 'The requested operation could not be fulfilled',
                              'raw_message': 'The requested operation could not be fulfilled'}], 'status_code': 404}
        get_constituent_appeal_list_mock.return_value = response
        invalid_constituent_id = 9057
        Response = self.client.get(
            reverse('blackbaud-get-constituent-appeal-list', kwargs={'constituent_id': invalid_constituent_id}))
        self.assertEqual(Response.status_code, status.HTTP_404_NOT_FOUND)
        get_constituent_appeal_list_mock.assert_called_once()

    @mock.patch('modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.constituent_attachment_list')
    def test_get_constituent_attachment_list(self, get_constituent_attachment_list_mock):
        response = {'data': [{
            "count": 4,
            "value": [
                {
                    "id": "099ACA1B-F0BE-44D7-80C3-54961EF8D728",
                    "date": "2015-01-25T04:00:00Z",
                    "name": "News article",
                    "parent_id": "280",
                    "tags": [
                        "info",
                        "news"
                    ],
                    "type": "Link",
                    "url": "http://www.example.com/articles/12451/story.html"
                },
                {
                    "id": "FA3E8358-5681-4C54-AEA9-63532B219339",
                    "date": "2016-11-12T04:00:00Z",
                    "name": "Wealth info",
                    "parent_id": "280",
                    "type": "Link",
                    "url": "http://www.example.com/analysis/rhern1.docx"
                },
                {
                    "id": "3E7C785F-8AA3-4FC2-B329-D5A3CE30D054",
                    "content_type": "image/jpeg",
                    "date": "2012-03-15T04:00:00Z",
                    "file_id": "3E7C785F-8AA3-4FC2-B329-D5A3CE30D054",
                    "file_name": "SaveTheWhales_GroupPhoto.jpg",
                    "file_size": 2225436,
                    "name": "Constituent Event Picture",
                    "parent_id": "280",
                    "thumbnail_id": "4DF6B36A-3058-4FA9-ACA5-4BCD08E67ACF",
                    "thumbnail_url": "http://prodsarnxdocmn002blkbrdo.blob.core.windows.net/blackbauddocumentsvc/tenants/a486g1de-73f5-4a81-a4b1-ff353509fbde/documents/4DF6B36A-3058-4FA9-ACA5-4BCD08E67ACF/SaveTheWhales_GroupPhoto.jpg?sv=2014-03-17&sr=b&sig=HI0UTKNjiCVB6AtGHBVuCdhgnETbRPYegwb7%2FQyjI%2FU%3D&se=2015-10-15T18%3A25%3A30Z&sp=r",
                    "type": "Physical",
                    "url": "http://prodsarnxdocmn002blkbrdo.blob.core.windows.net/blackbauddocumentsvc/tenants/a486g1de-73f5-4a81-a4b1-ff353509fbde/documents/3E7C785F-8AA3-4FC2-B329-D5A3CE30D054/SaveTheWhales_GroupPhoto_thumbnail.jpg?sv=2014-03-17&sr=b&sig=HI0UTKNjiCVB6AtGHBVuCdhgnETbRPYegwb7%2FQyjI%2FU%3D&se=2015-10-15T18%3A25%3A30Z&sp=r"
                },
                {
                    "id": "5CD2DA8D-8EF0-498C-9E67-F6C99848C26D",
                    "content_type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    "date": "2015-08-30T04:00:00Z",
                    "file_id": "5CD2DA8D-8EF0-498C-9E67-F6C99848C26D",
                    "file_name": "Hernandez_WealthData.doc",
                    "file_size": 54378,
                    "name": "Constituent Wealth Data",
                    "parent_id": "280",
                    "type": "Physical",
                    "url": "http://prodsarnxdocmn002blkbrdo.blob.core.windows.net/blackbauddocumentsvc/tenants/a486g1de-73f5-4a81-a4b1-ff353509fbde/documents/5CD2DA8D-8EF0-498C-9E67-F6C99848C26D/Hernandez_WealthData.doc?sv=2014-02-14&sr=b&sig=HI0UTKNjiCVB6AtGHBVuCdhgnETbRPYegwb7%2FQyjI%2FU%3D&se=2015-10-15T18%3A25%3A30Z&sp=r"
                }
            ]
        }], 'status_code': 200}
        get_constituent_attachment_list_mock.return_value = response
        constituent_id = 618879
        Response = self.client.get(
            reverse('blackbaud-get-constituent-attachment-list', kwargs={'constituent_id': constituent_id}))
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        get_constituent_attachment_list_mock.assert_called_once()

    @mock.patch('modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.constituent_attachment_list')
    def test_get_constituent_attachment_list_with_invalid_constituent_id(self, get_constituent_attachment_list_mock):
        response = {'data': [{'error_args': [], 'error_code': 404, 'error_name': 'RequestNotFulfilled',
                              'message': 'The requested operation could not be fulfilled',
                              'raw_message': 'The requested operation could not be fulfilled'}], 'status_code': 404}
        get_constituent_attachment_list_mock.return_value = response
        invalid_constituent_id = 879
        Response = self.client.get(
            reverse('blackbaud-get-constituent-attachment-list', kwargs={'constituent_id': invalid_constituent_id}))
        self.assertEqual(Response.status_code, status.HTTP_404_NOT_FOUND)
        get_constituent_attachment_list_mock.assert_called_once()

    @mock.patch('modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.constituent_code_details')
    def test_get_constituent_code_details(self, get_constituent_code_details_mock):
        response = {
            'data': {
                'constituent_id': '194',
                'description': 'Friend',
                'id': '12',
                'sequence': 1,
                'start': {
                    'y': 2001
                }
            },
            'status_code': 200}
        get_constituent_code_details_mock.return_value = response
        constituent_code_id = 12
        Response = self.client.get(
            reverse('blackbaud-get-constituent-code-details', kwargs={'constituent_code_id': constituent_code_id}))
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        get_constituent_code_details_mock.assert_called_once()

    @mock.patch('modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.constituent_code_details')
    def test_get_constituent_code_details_with_invalid_constituent_code_id(self, get_constituent_code_details_mock):
        response = {
            'data': [
                {
                    'error_args': [],
                    'error_code': 404,
                    'error_name': 'RequestNotFulfilled',
                    'message': 'The requested operation could not be fulfilled',
                    'raw_message': 'The requested operation could not be fulfilled'
                }
            ],
            'status_code': 404
        }
        get_constituent_code_details_mock.return_value = response
        invalid_constituent_code_id = 1
        Response = self.client.get(
            reverse('blackbaud-get-constituent-code-details',
                    kwargs={'constituent_code_id': invalid_constituent_code_id}))
        self.assertEqual(Response.status_code, status.HTTP_404_NOT_FOUND)
        get_constituent_code_details_mock.assert_called_once()

    @mock.patch('modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.constituent_code_list')
    def test_get_constituent_code_list(self, get_constituent_code_list_mock):
        response = {'data': {'count': 2236,
                             'next_link': 'https://api.sky.blackbaud.com/constituent/v1/constituents/constituentcodes?offset=500',
                             'value': [{'id': '21285', 'constituent_id': '596782',
                                        'date_added': '2022-06-13T08:39:58.648-04:00',
                                        'date_modified': '2022-06-13T08:39:58.648-04:00', 'description': 'Donor',
                                        'inactive': False, 'start': {'d': 13, 'm': 6, 'y': 2022}, 'sequence': 1},
                                       {'id': '21286', 'constituent_id': '596783',
                                        'date_added': '2022-06-13T09:08:20.716-04:00',
                                        'date_modified': '2022-06-13T09:08:20.716-04:00', 'description': 'Donor',
                                        'inactive': False, 'start': {'d': 13, 'm': 6, 'y': 2022}, 'sequence': 1},
                                       {'id': '21287', 'constituent_id': '595386',
                                        'date_added': '2022-06-13T10:19:32.964-04:00',
                                        'date_modified': '2022-06-13T10:19:32.964-04:00', 'description': 'Donor',
                                        'inactive': False, 'start': {'d': 13, 'm': 6, 'y': 2022}, 'sequence': 1}]},
                    'status_code': 200}
        get_constituent_code_list_mock.return_value = response
        Response = self.client.get(
            reverse('blackbaud-get-constituent-code-list'))
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        get_constituent_code_list_mock.assert_called_once()

    @mock.patch(
        'modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.constituent_code_list_in_constituent')
    def test_get_constituent_code_list_in_constituent(self, get_constituent_code_list_in_constituent_mock):
        response = {'data': {'count': 2, 'value': [
            {'id': '12', 'constituent_id': '194', 'date_added': '2020-01-31T13:00:06.146-05:00',
             'date_modified': '2020-01-31T13:30:52.2-05:00', 'description': 'Friend', 'inactive': False,
             'start': {'y': 2001}, 'sequence': 1},
            {'id': '11', 'constituent_id': '194', 'date_added': '2020-01-31T13:00:06.146-05:00',
             'date_modified': '2020-01-31T13:30:52.2-05:00', 'description': 'Past Parent', 'end': {'y': 2003},
             'inactive': True, 'start': {'y': 1999}, 'sequence': 2}]}, 'status_code': 200}
        get_constituent_code_list_in_constituent_mock.return_value = response
        constituent_id = 194
        Response = self.client.get(
            reverse('blackbaud-get-constituent-code-list-in-constituent',
                    kwargs={'constituent_id': constituent_id}))
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        get_constituent_code_list_in_constituent_mock.assert_called_once()

    @mock.patch(
        'modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.constituent_code_list_in_constituent')
    def test_get_constituent_code_list_in_constituent_with_invalid_constituent_id(self,
                                                                                  get_constituent_code_list_in_constituent_mock):
        response = {'data': [{'error_args': [], 'error_code': 404, 'error_name': 'RequestNotFulfilled',
                              'message': 'The requested operation could not be fulfilled',
                              'raw_message': 'The requested operation could not be fulfilled'}], 'status_code': 404}
        get_constituent_code_list_in_constituent_mock.return_value = response
        invalid_constituent_id = 14
        Response = self.client.get(
            reverse('blackbaud-get-constituent-code-list-in-constituent',
                    kwargs={'constituent_id': invalid_constituent_id}))
        self.assertEqual(Response.status_code, status.HTTP_404_NOT_FOUND)
        get_constituent_code_list_in_constituent_mock.assert_called_once()

    @mock.patch(
        'modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.constituent_custom_field_categories')
    def test_get_constituent_custom_field_categories(self, get_constituent_custom_field_categories_mock):
        response = {'data': {'count': 17,
                             'value': ['GoldenAnniversary', 'BirthDate', '# of Family Members', 'Anniversary',
                                       'Availability', 'Business Hours', 'Closing Codes', 'Committees',
                                       'Dietary Preference', 'Inactive', 'Interests', 'Organization Type', 'Origin',
                                       'Retirement Date', 'Special Mailing Types', 'Staff Manager', 'Number of Pets']},
                    'status_code': 200}
        get_constituent_custom_field_categories_mock.return_value = response
        Response = self.client.get(reverse('blackbaud-get-constituent-custom-field-categories'))
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        get_constituent_custom_field_categories_mock.assert_called_once()

    @mock.patch(
        'modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.constituent_custom_field_categories_details')
    def test_get_constituent_custom_field_categories_details(self,
                                                             get_constituent_custom_field_categories_details_mock):
        response = {'data': {'count': 17, 'value': [
            {'name': 'GoldenAnniversary', 'type': 'FuzzyDate', 'code_table_id': '', 'one_per_record': False},
            {'name': 'BirthDate', 'type': 'FuzzyDate', 'code_table_id': '', 'one_per_record': False},
            {'name': '# of Family Members', 'type': 'Number', 'code_table_id': '', 'one_per_record': True},
            {'name': 'Anniversary', 'type': 'Date', 'code_table_id': '', 'one_per_record': False},
            {'name': 'Availability', 'type': 'CodeTableEntry', 'code_table_id': '1008', 'one_per_record': True},
            {'name': 'Business Hours', 'type': 'Text', 'code_table_id': '', 'one_per_record': False},
            {'name': 'Closing Codes', 'type': 'CodeTableEntry', 'code_table_id': '2', 'one_per_record': False},
            {'name': 'Committees', 'type': 'CodeTableEntry', 'code_table_id': '1021', 'one_per_record': False},
            {'name': 'Dietary Preference', 'type': 'CodeTableEntry', 'code_table_id': '1003', 'one_per_record': True},
            {'name': 'Inactive', 'type': 'CodeTableEntry', 'code_table_id': '1028', 'one_per_record': False},
            {'name': 'Interests', 'type': 'CodeTableEntry', 'code_table_id': '1023', 'one_per_record': False},
            {'name': 'Organization Type', 'type': 'CodeTableEntry', 'code_table_id': '1024', 'one_per_record': False},
            {'name': 'Origin', 'type': 'CodeTableEntry', 'code_table_id': '1002', 'one_per_record': True},
            {'name': 'Retirement Date', 'type': 'Date', 'code_table_id': '', 'one_per_record': False},
            {'name': 'Special Mailing Types', 'type': 'CodeTableEntry', 'code_table_id': '1025',
             'one_per_record': False},
            {'name': 'Staff Manager', 'type': 'ConstituentId', 'code_table_id': '', 'one_per_record': True},
            {'name': 'Number of Pets', 'type': 'Number', 'code_table_id': '', 'one_per_record': False}]},
                    'status_code': 200}
        get_constituent_custom_field_categories_details_mock.return_value = response
        Response = self.client.get(reverse('blackbaud-get-constituent-custom-field-categories-details'))
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        get_constituent_custom_field_categories_details_mock.assert_called_once()

    @mock.patch(
        'modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.constituent_custom_field_categories_values')
    def test_get_constituent_custom_field_categories_values(self, get_constituent_custom_field_categories_values_mock):
        response = {'data': {'count': 1, 'value': ['No summer months']}, 'status_code': 200}
        get_constituent_custom_field_categories_values_mock.return_value = response
        data = {
            "category_name": "Availability"
        }
        Response = self.client.get(reverse("blackbaud-get-constituent-custom-field-categories-values"), data)
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        get_constituent_custom_field_categories_values_mock.assert_called_once()

    @mock.patch('modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.constituent_custom_field_list')
    def test_get_constituent_custom_field_list(self, get_constituent_custom_field_list_mock):
        response = {'data': {'count': 914,
                             'next_link': 'https://api.sky.blackbaud.com/constituent/v1/constituents/customfields?offset=500',
                             'value': [{'id': '1', 'category': 'Business Hours', 'comment': 'Weekdays only',
                                        'date_added': '2020-01-31T13:00:06.146-05:00',
                                        'date_modified': '2020-01-31T13:30:52.2-05:00', 'parent_id': '281',
                                        'type': 'Text', 'value': '8 a.m. - 5 p.m.'},
                                       {'id': '2', 'category': 'Organization Type',
                                        'date_added': '2020-01-31T13:00:06.146-05:00',
                                        'date_modified': '2020-01-31T13:30:52.2-05:00', 'parent_id': '281',
                                        'type': 'CodeTableEntry', 'value': 'Public'},
                                       {'id': '3', 'category': 'Business Hours', 'comment': 'Customer Service Center',
                                        'date_added': '2020-01-31T13:00:06.146-05:00',
                                        'date_modified': '2020-01-31T13:30:52.2-05:00', 'parent_id': '300',
                                        'type': 'Text', 'value': '7 a.m. - 8 p.m.'}]}, 'status_code': 200}
        get_constituent_custom_field_list_mock.return_value = response
        Response = self.client.get(reverse('blackbaud-get-constituent-custom-field-list'))
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        get_constituent_custom_field_list_mock.assert_called_once()

    @mock.patch(
        'modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.constituent_custom_field_list_in_single_constituent')
    def test_get_constituent_custom_field_list_in_single_constituent(self,
                                                                     get_constituent_custom_field_list_in_single_constituent_mock):
        response = {'data': {'count': 0, 'value': []}, 'status_code': 200}
        get_constituent_custom_field_list_in_single_constituent_mock.return_value = response
        constituent_id = 618879
        Response = self.client.get(reverse('blackbaud-get-constituent-custom-field-list-in-single-constituent',
                                           kwargs={'constituent_id': constituent_id}))
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        get_constituent_custom_field_list_in_single_constituent_mock.assert_called_once()

    @mock.patch(
        'modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.constituent_custom_field_list_in_single_constituent')
    def test_get_constituent_custom_field_list_in_single_constituent_with_invalid_constituent_id(self,
                                                                                                 get_constituent_custom_field_list_in_single_constituent_mock):
        response = {'data': [{'error_args': [], 'error_code': 404, 'error_name': 'RequestNotFulfilled',
                              'message': 'The requested operation could not be fulfilled',
                              'raw_message': 'The requested operation could not be fulfilled'}], 'status_code': 404}
        get_constituent_custom_field_list_in_single_constituent_mock.return_value = response
        invalid_constituent_id = 483
        Response = self.client.get(reverse('blackbaud-get-constituent-custom-field-list-in-single-constituent',
                                           kwargs={'constituent_id': invalid_constituent_id}))
        self.assertEqual(Response.status_code, status.HTTP_404_NOT_FOUND)
        get_constituent_custom_field_list_in_single_constituent_mock.assert_called_once()

    @mock.patch('modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.constituent_countries')
    def test_get_constituent_countries(self, get_constituent_countries_mock):
        response = {'data': {'count': 14, 'value': [{'id': '543', 'abbreviation': 'AUS', 'name': 'Australia'},
                                                    {'id': '542', 'abbreviation': 'CAN', 'name': 'Canada'},
                                                    {'id': '1704', 'abbreviation': 'GER', 'name': 'Germany'},
                                                    {'id': '1709', 'abbreviation': 'ITA', 'name': 'Italy'},
                                                    {'id': '1174', 'abbreviation': 'JAP', 'name': 'Japan'},
                                                    {'id': '1717', 'abbreviation': 'LUX', 'name': 'Luxembourg'},
                                                    {'id': '1708', 'abbreviation': 'MEX', 'name': 'Mexico'},
                                                    {'id': '544', 'abbreviation': 'NZL', 'name': 'New Zealand'},
                                                    {'id': '1705', 'abbreviation': 'RUS', 'name': 'Russia'},
                                                    {'id': '1706', 'abbreviation': 'RSA', 'name': 'South Africa'},
                                                    {'id': '1707', 'abbreviation': 'CHE', 'name': 'Switzerland'},
                                                    {'id': '5987', 'abbreviation': 'TIM', 'name': 'Tims Country'},
                                                    {'id': '541', 'abbreviation': 'GBR', 'name': 'United Kingdom'},
                                                    {'id': '540', 'abbreviation': 'USA', 'name': 'United States'}]},
                    'status_code': 200}
        get_constituent_countries_mock.return_value = response
        Response = self.client.get(reverse('blackbaud-get-constituent-countries'))
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        get_constituent_countries_mock.assert_called_once()

    @mock.patch(
        'modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.constituent_currencyconfiguration')
    def test_get_constituent_currencyconfiguration(self, get_constituent_currencyconfiguration_mock):
        response = {'data': {'country_name': 'United States', 'currency_code': 'USD', 'currency_symbol': '$',
                             'iso_alpha_2_code': 'US'}, 'status_code': 200}
        get_constituent_currencyconfiguration_mock.return_value = response
        Response = self.client.get(reverse('blackbaud-get-constituent-currencyconfiguration'))
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        get_constituent_currencyconfiguration_mock.assert_called_once()

    @mock.patch(
        'modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.constituents_address_list')
    def test_get_constituents_address_list(self, get_constituents_address_list_mock):
        response = {
            'data': {'count': 61330, 'next_link': 'https://api.sky.blackbaud.com/constituent/v1/addresses?offset=500',
                     'value': [{'id': '184', 'address_lines': '248 Twin Lane\r\nBuilding #3299', 'city': 'Birmingham',
                                'constituent_id': '185', 'country': 'United States', 'county': 'Bailey',
                                'date_added': '1999-05-20T14:52:54-05:00',
                                'date_modified': '2023-01-08T00:09:10.068-05:00', 'do_not_mail': False,
                                'formatted_address': '248 Twin Lane\r\nBuilding #3299\r\nBirmingham, AL  35220',
                                'inactive': False, 'postal_code': '35220', 'preferred': False,
                                'start': '1994-06-18T00:00:00', 'state': 'AL', 'type': 'Home'}]}, 'status_code': 200}
        get_constituents_address_list_mock.return_value = response
        Response = self.client.get(reverse('blackbaud-get-constituents-address-list'))
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        get_constituents_address_list_mock.assert_called_once()

    @mock.patch(
        'modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.constituents_education_list')
    def test_get_constituents_education_list(self, get_constituents_education_list_mock):
        response = {
            'data': {'count': 689, 'next_link': 'https://api.sky.blackbaud.com/constituent/v1/educations?offset=500',
                     'value': [{'id': '1', 'campus': 'Birmingham', 'class_of': '1997', 'constituent_id': '185',
                                'date_added': '1999-06-17T09:33:26-04:00', 'date_entered': {'d': 2, 'm': 8, 'y': 1994},
                                'date_graduated': {'d': 1, 'm': 1, 'y': 1997},
                                'date_modified': '2004-10-13T15:29:16.6-04:00', 'degree': 'BS', 'gpa': 2.6,
                                'majors': ['Business'], 'school': 'University of Alabama', 'status': 'Graduated',
                                'type': 'Four Year College'}, ]}, 'status_code': 200}
        get_constituents_education_list_mock.return_value = response
        Response = self.client.get(reverse('blackbaud-get-constituents-education-list'))
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        get_constituents_education_list_mock.assert_called_once()

    @mock.patch(
        'modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.constituent_get_education_record')
    def test_get_constituent_education_record(self, get_constituent_education_record_mock):
        response = {
            'data': {'count': 689,
                     'next_link': 'https://api.sky.blackbaud.com/constituent/v1/constituents/educations?offset=500',
                     'value': [{'id': '1', 'campus': 'Birmingham', 'class_of': '1997', 'constituent_id': '185',
                                'date_added': '1999-06-17T09:33:26-04:00', 'date_entered': {'d': 2, 'm': 8, 'y': 1994},
                                'date_graduated': {'d': 1, 'm': 1, 'y': 1997},
                                'date_modified': '2004-10-13T15:29:16.6-04:00', 'degree': 'BS', 'gpa': 2.6,
                                'majors': ['Business'], 'school': 'University of Alabama', 'status': 'Graduated',
                                'type': 'Four Year College'}, ]}, 'status_code': 200}
        education_id = 600
        get_constituent_education_record_mock.return_value = response
        Response = self.client.get(
            reverse('blackbaud-get-constituent-education-record', kwargs={'education_id': education_id}))
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        get_constituent_education_record_mock.assert_called_once()

    @mock.patch(
        'modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.constituent_get_education_custom_field_categories')
    def test_get_education_custom_field_categories(self, get_education_custom_field_categories_mock):
        response = {
            'data': {'count': 4,
                     'next_link': 'https://api.sky.blackbaud.com/constituent/v1/educations/customfields/categories/details?offset=500',
                     'value': [{
                         "name": "Leadership Positions",
                         "type": "Text",
                         "one_per_record": "false"
                     },
                         {
                             "name": "Athletics",
                             "type": "CodeTableEntry",
                             "code_table_id": "1001",
                             "one_per_record": "false"
                         },
                         {
                             "name": "Alumni Sponsor",
                             "type": "ConstituentId",
                             "one_per_record": "true"
                         },
                         {
                             "name": "Date graduated",
                             "type": "Date",
                             "one_per_record": "false"
                         }, ]}, 'status_code': 200}
        get_education_custom_field_categories_mock.return_value = response
        Response = self.client.get(
            reverse('blackbaud-get-education-custom-field-categories'))
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        get_education_custom_field_categories_mock.assert_called_once()

    @mock.patch(
        'modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.constituent_get_custom_field_list_in_education')
    def test_get_constituent_custom_field_list_in_education(self, get_constituent_custom_field_list_in_education_mock):
        education_id = 600
        response = {
            'data': {'count': 689,
                     'next_link': f'https://api.sky.blackbaud.com//constituent/v1/educations/{education_id}/customfields?offset=500',
                     'value': [{'id': '1', 'campus': 'Birmingham', 'class_of': '1997', 'constituent_id': '185',
                                'date_added': '1999-06-17T09:33:26-04:00', 'date_entered': {'d': 2, 'm': 8, 'y': 1994},
                                'date_graduated': {'d': 1, 'm': 1, 'y': 1997},
                                'date_modified': '2004-10-13T15:29:16.6-04:00', 'degree': 'BS', 'gpa': 2.6,
                                'majors': ['Business'], 'school': 'University of Alabama', 'status': 'Graduated',
                                'type': 'Four Year College'}, ]}, 'status_code': 200}
        get_constituent_custom_field_list_in_education_mock.return_value = response
        Response = self.client.get(
            reverse('blackbaud-get-constituent-custom-field-list-in-education', kwargs={'education_id': education_id}))
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        get_constituent_custom_field_list_in_education_mock.assert_called_once()

    @mock.patch(
        'modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.constituent_get_education_degrees')
    def test_get_constituent_education_degrees(self, get_constituent_education_degrees_mock):
        response = {
            'data': {'count': 11,
                     'next_link': 'https://api.sky.blackbaud.com/constituent/v1/educations/degrees?offset=500',
                     "value": [
                         "AA",
                         "AB",
                         "AS",
                         "BA",
                         "BFA",
                         "BS",
                         "Duke",
                         "JD",
                         "MBA",
                         "MD",
                         "MPA"
                     ]}, 'status_code': 200}
        get_constituent_education_degrees_mock.return_value = response
        Response = self.client.get(
            reverse('blackbaud-get-constituent-education-degrees'))
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertEqual(Response.data, response['data'])
        get_constituent_education_degrees_mock.assert_called_once()

    @mock.patch(
        'modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.constituent_get_single_education_list')
    def test_get_education_list_in_constituent(self, get_education_list_in_constituent_mock):
        constituent_id = 200
        response = {
            'data': {'count': 360,
                     'next_link': f'https://api.sky.blackbaud.com/constituent/v1/constituents/{constituent_id}/educations?offset=500',
                     'value': [{
                         "id": "12",
                         "campus": "Greenville",
                         "class_of": "2009",
                         "constituent_id": "280",
                         "date_entered": {
                             "m": 8,
                             "y": 2004
                         },
                         "date_graduated": {
                             "d": 3,
                             "m": 6,
                             "y": 2009
                         },
                         "degree": "MD",
                         "gpa": 3.8,
                         "known_name": "Robby",
                         "majors": [
                             "Computer Science"
                         ],
                         "minors": [
                             "History"
                         ],
                         "primary": "true",
                         "school": "University of South Carolina",
                         "social_organization": "Order of Omega",
                         "status": "Graduated",
                         "type": "Four Year College"
                     }, ]}, 'status_code': 200}
        get_education_list_in_constituent_mock.return_value = response
        Response = self.client.get(
            reverse('blackbaud-get-education-list-in-constituent', kwargs={'constituent_id': constituent_id}))
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertEqual(Response.data, response['data'])
        get_education_list_in_constituent_mock.assert_called_once()

    @mock.patch(
        'modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.constituent_get_education_schools')
    def test_get_constituent_education_schools(self, get_constituent_education_schools_mock):
        response = {
            'data': {'count': 15,
                     "value": [
                         "Bates College",
                         "Berry College",
                         "Boston College",
                         "Boston University",
                         "Bowdoin College",
                         "California Inst. of Technology",
                         "Cambridge",
                         "Carleton College",
                         "Case Western Reserve",
                         "Center Preparatory School",
                         "Clemson",
                         "Clemson University",
                         "College of Charleston",
                         "County Day School",
                         "Dakota State"
                     ]}, 'status_code': 200}
        get_constituent_education_schools_mock.return_value = response
        Response = self.client.get(
            reverse('blackbaud-get-constituent-education-schools'))
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertEqual(Response.data, response['data'])
        get_constituent_education_schools_mock.assert_called_once()

    @mock.patch(
        'modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.constituent_get_education_statuses')
    def test_get_constituent_education_statuses(self, get_constituent_education_statuses_mock):
        response = {
            'data': {'count': 8,
                     "value": [
                         "Current Student",
                         "Dismissed",
                         "Graduated",
                         "Internship Program",
                         "Leave",
                         "Probation",
                         "Registered",
                         "Transferred Out"
                     ]}, 'status_code': 200}
        get_constituent_education_statuses_mock.return_value = response
        Response = self.client.get(
            reverse('blackbaud-get-constituent-education-statuses'))
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertEqual(Response.data, response['data'])
        get_constituent_education_statuses_mock.assert_called_once()

    @mock.patch(
        'modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.constituent_get_education_subjects')
    def test_get_constituent_education_subjects(self, get_constituent_education_subjects_mock):
        response = {
            'data': {"count": 16,
                     "value": [
                         "Accounting",
                         "Art",
                         "Biology",
                         "Business",
                         "Chemistry",
                         "Computer Science",
                         "Criminal Justice",
                         "Diet and Nutrition",
                         "Drama",
                         "Elementary Education",
                         "Engineering",
                         "English Literature",
                         "Finance",
                         "History",
                         "International Business",
                         "Jewish Studies",
                         "Law"
                     ]}, 'status_code': 200}
        get_constituent_education_subjects_mock.return_value = response
        Response = self.client.get(
            reverse('blackbaud-get-constituent-education-subjects'))
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertEqual(Response.data, response['data'])
        get_constituent_education_subjects_mock.assert_called_once()

    @mock.patch(
        'modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.constituent_get_education_types')
    def test_get_constituent_education_types(self, get_constituent_education_types_mock):
        response = {
            'data': {"count": 8,
                     "value": [
                         "Community College",
                         "Excellent",
                         "Four Year College",
                         "Graduate School",
                         "High School",
                         "Junior College",
                         "K-12",
                         "K-5"
                     ]}, 'status_code': 200}
        get_constituent_education_types_mock.return_value = response
        Response = self.client.get(
            reverse('blackbaud-get-constituent-education-types'))
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertEqual(Response.data, response['data'])
        get_constituent_education_types_mock.assert_called_once()

    @mock.patch(
        'modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.constituents_get_address_details')
    def test_get_constituent_address_details(self, get_constituent_address_details_mock):
        response = {
            'data': {
                "id": "757",
                "address_lines": "410 17th Street",
                "city": "Denver",
                "constituent_id": "280",
                "country": "United States",
                "county": "Denver",
                "do_not_mail": "false",
                "end": "2025-03-26T00:00:00Z",
                "formatted_address": "410 17th Street\r\nDenver, CO  80202-4402",
                "inactive": "false",
                "postal_code": "80202-4402",
                "preferred": "true",
                "seasonal_end": {
                    "d": 26,
                    "m": 8
                },
                "seasonal_start": {
                    "d": 12,
                    "m": 6
                },
                "start": "2003-03-26T00:00:00Z",
                "state": "CO",
                "type": "Home"

            }, 'status_code': 200}
        address_id = 300
        get_constituent_address_details_mock.return_value = response
        Response = self.client.get(
            reverse('blackbaud-get-constituent-address-details', kwargs={"address_id": address_id}))
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertEqual(Response.data, response['data'])
        get_constituent_address_details_mock.assert_called_once()

    @mock.patch(
        'modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.constituents_get_address_list')
    def test_get_address_list_in_constituents(self, get_address_list_in_constituents_mock):
        constituent_id = 3
        response = {
            'data': {
                "count": 30,
                'next_link': f'https://api.sky.blackbaud.com/constituent/v1/constituents/{constituent_id}/addresses?offset=10',
                "value": [
                    {
                        "id": "757",
                        "address_lines": "410 17th Street",
                        "city": "Denver",
                        "constituent_id": "280",
                        "country": "United States",
                        "county": "Denver",
                        "do_not_mail": "false",
                        "end": "2025-03-26T00:00:00Z",
                        "formatted_address": "410 17th Street\r\nDenver, CO  80202-4402",
                        "inactive": "false",
                        "postal_code": "80202-4402",
                        "preferred": "true",
                        "seasonal_end": {
                            "d": 26,
                            "m": 8
                        },
                        "seasonal_start": {
                            "d": 12,
                            "m": 6
                        },
                        "start": "2003-03-26T00:00:00Z",
                        "state": "CO",
                        "type": "Home"
                    },
                    {
                        "id": "411",
                        "address_lines": "102 Liberty Avenue",
                        "city": "Chicago",
                        "constituent_id": "280",
                        "country": "United States",
                        "do_not_mail": "false",
                        "formatted_address": "102 Liberty Avenue\r\nChicago, IL  60610",
                        "inactive": "false",
                        "postal_code": "60610",
                        "preferred": "false",
                        "start": "1994-03-26T00:00:00Z",
                        "state": "IL",
                        "type": "Business"
                    },
                ]}, 'status_code': 200}
        get_address_list_in_constituents_mock.return_value = response
        Response = self.client.get(
            reverse('blackbaud-get-address-list-in-constituents', kwargs={"constituent_id": constituent_id}))
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertEqual(Response.data, response['data'])
        get_address_list_in_constituents_mock.assert_called_once()

    @mock.patch(
        'modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.constituents_get_address_types')
    def test_get_address_type_in_constituents(self, get_address_type_in_constituents_mock):
        response = {
            'data': {"count": 17,
                     "value": [
                         "Billing",
                         "Business",
                         "Employment History",
                         "Former Address",
                         "Home",
                         "Invalid",
                         "Relationship",
                         "Rental Property",
                         "Retreat",
                         "School Residence",
                         "Shipping",
                         "Spouse Business",
                         "Summer Home",
                         "Time Share",
                         "Vacation Home",
                         "Winter Home",
                         "Work"
                     ]}, 'status_code': 200}
        get_address_type_in_constituents_mock.return_value = response
        Response = self.client.get(
            reverse('blackbaud-get-address-type-in-constituents'))
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertEqual(Response.data, response['data'])
        get_address_type_in_constituents_mock.assert_called_once()

    @mock.patch(
        'modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.event_participant')
    def test_get_event_participant(self, get_event_participant_mock):
        response = {
            'data': {
                "id": "2",
                "constituent_id": "34",
                "event_id": "5",
                "date_added": "2017-09-15T13:00:00Z",
                "date_modified": "2017-09-15T13:00:00Z",
                "host_id": "181",
                "rsvp_status": "Attending",
                "attended": "false",
                "invitation_status": "Invited",
                "rsvp_date": {
                    "d": 1,
                    "m": 1,
                    "y": 2020
                },
                "invitation_date": {
                    "d": 1,
                    "m": 1,
                    "y": 2020
                },
                "participation_level": {
                    "id": "1493",
                    "name": "Coordinator",
                    "is_inactive": "false"
                },
                "summary_note": "Major donor who invites a lot of people."
            }, 'status_code': 200}
        participant_id = 123
        get_event_participant_mock.return_value = response
        Response = self.client.get(
            reverse('blackbaud-get-event-participant', kwargs={"participant_id": participant_id}))
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertEqual(Response.data, response['data'])
        get_event_participant_mock.assert_called_once()

    @mock.patch(
        'modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.event_attachment')
    def test_get_event_attachment(self, get_event_attachment_mock):
        response = {
            'data': {
                "id": "8d6df4c4-d9ab-45d4-9369-46aa5748a235",
                "parent_id": "123",
                "file_size": 24576,
                "file_url": "http://prodsarnxdocmn002blkbrdo.blob.core.windows.net/blackbauddocumentsvc/tenants/a486g1de-73f5-4a81-a4b1-ff353509fbde/documents/5B094C8B-5961-4E7F-B1FE-F13ECFC6F82E/ActionEvent_Snapshot.jpg?sv=2015-05-17&sr=b&sig=HI0UTKNjiCVB6AtGHBVuCdhgnETbRPYegwb7%2FQyjI%2FU%3D&se=2015-10-15T18%3A25%3A30Z&sp=r",
                "content_type": "image/jpeg",
                "thumbnail_uri": "http://prodsarnxdocmn002blkbrdo.blob.core.windows.net/blackbauddocumentsvc/tenants/a486g1de-73f5-4a81-a4b1-ff353509fbde/documents/4DF6B36A-3058-4FA9-ACA5-4BCD08E67ACF/ActionEvent_Snapshot_thumbnail.jpg?sv=2015-05-17&sr=b&sig=HI0UTKNjiCVB6AtGHBVuCdhgnETbRPYegwb7%2FQyjI%2FU%3D&se=2015-10-15T18%3A25%3A30Z&sp=r",
                "tags": [
                    "Document"
                ],
                "date": "2022-06-29T19:30:00.6557223Z",
                "name": "Tax_Receipt",
                "file_id": "8d6df4c4-d9ab-45d4-9369-46aa5748a235",
                "file_name": "tax_receipt.jpg",
                "type": "Physical",
                "thumbnail_id": "08baedaf-b384-4ab2-abc0-3a72a79d3a7a"
            }, 'status_code': 200}
        data = {
            "event_id": "123",
            "attachment_id": "8d6df4c4-d9ab-45d4-9369-46aa5748a235"
        }
        get_event_attachment_mock.return_value = response
        Response = self.client.get(
            reverse('blackbaud-get-event-attachment'), data)
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertEqual(Response.data, response['data'])
        get_event_attachment_mock.assert_called_once()

    @mock.patch(
        'modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.event_attachment_tags')
    def test_get_event_attachment_tags(self, get_event_attachment_tags_mock):
        response = {
            'data': {
                "count": 7,
                "value": [
                    "Certificate",
                    "Document",
                    "Logo",
                    "PDF",
                    "Photo",
                    "Slideshow",
                    "Spreadsheet"
                ]
            }, 'status_code': 200}

        get_event_attachment_tags_mock.return_value = response
        Response = self.client.get(
            reverse('blackbaud-get-event-attachment-tags'))
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertEqual(Response.data, response['data'])
        get_event_attachment_tags_mock.assert_called_once()

    @mock.patch(
        'modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.event_attachment_list')
    def test_get_event_attachment_list(self, get_event_attachment_list_mock):
        response = {
            'data': {
                "count": 2,
                "value": [
                    {
                        "id": "8d6df4c4-d9ab-45d4-9369-46aa5748a235",
                        "parent_id": "123",
                        "file_size": 24576,
                        "file_url": "http://prodsarnxdocmn002blkbrdo.blob.core.windows.net/blackbauddocumentsvc/tenants/a486g1de-73f5-4a81-a4b1-ff353509fbde/documents/5B094C8B-5961-4E7F-B1FE-F13ECFC6F82E/ActionEvent_Snapshot.jpg?sv=2015-05-17&sr=b&sig=HI0UTKNjiCVB6AtGHBVuCdhgnETbRPYegwb7%2FQyjI%2FU%3D&se=2015-10-15T18%3A25%3A30Z&sp=r",
                        "content_type": "image/jpeg",
                        "thumbnail_uri": "http://prodsarnxdocmn002blkbrdo.blob.core.windows.net/blackbauddocumentsvc/tenants/a486g1de-73f5-4a81-a4b1-ff353509fbde/documents/4DF6B36A-3058-4FA9-ACA5-4BCD08E67ACF/ActionEvent_Snapshot_thumbnail.jpg?sv=2015-05-17&sr=b&sig=HI0UTKNjiCVB6AtGHBVuCdhgnETbRPYegwb7%2FQyjI%2FU%3D&se=2015-10-15T18%3A25%3A30Z&sp=r",
                        "tags": [
                            "Document"
                        ],
                        "date": "2022-06-29T19:30:00.6557223Z",
                        "name": "Tax_Receipt",
                        "file_id": "8d6df4c4-d9ab-45d4-9369-46aa5748a235",
                        "file_name": "tax_receipt.jpg",
                        "type": "Physical",
                        "thumbnail_id": "08baedaf-b384-4ab2-abc0-3a72a79d3a7a"
                    },
                    {
                        "id": "08864163-6e96-4316-9a12-73aaee187055",
                        "parent_id": "123",
                        "tags": [
                            "Photo"
                        ],
                        "date": "2022-06-29T19:30:00.6557223Z",
                        "name": "Logo",
                        "url": "https://www.example.com/logo.jpg",
                        "type": "Link"
                    }
                ]
            }, 'status_code': 200}

        event_id = '123'
        data = {
            "attachment_tag": "Document"
        }

        get_event_attachment_list_mock.return_value = response
        Response = self.client.get(
            reverse('blackbaud-get-event-attachment-list', kwargs={"event_id": event_id}), data)
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertEqual(Response.data, response['data'])
        get_event_attachment_list_mock.assert_called_once()

    @mock.patch(
        'modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.event_categories')
    def test_get_event_categories(self, get_event_categories_mock):
        response = {
            'data': {
                "count": 12,
                "value": [
                    {
                        "id": "1293",
                        "name": "Annual Fundraiser",
                        "inactive": "false"
                    },
                    {
                        "id": "1179",
                        "name": "Golf Tournament",
                        "inactive": "false"
                    },
                    {
                        "id": "2906",
                        "name": "Social",
                        "inactive": "false"
                    }
                ]
            }, 'status_code': 200}

        get_event_categories_mock.return_value = response
        Response = self.client.get(
            reverse('blackbaud-get-event-categories'))
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertEqual(Response.data, response['data'])
        get_event_categories_mock.assert_called_once()

    @mock.patch(
        'modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.event_fees')
    def test_get_event_fees(self, get_event_fees_mock):
        response = {
            'data': {
                "count": 2,
                "value": [
                    {
                        "id": "1",
                        "name": "Individual",
                        "event_id": "14",
                        "cost": 15.0,
                        "contribution_amount": 10.0,
                        "number_sold": 10
                    },
                    {
                        "id": "2",
                        "name": "Couple",
                        "event_id": "14",
                        "cost": 20.0,
                        "contribution_amount": 4.99,
                        "number_sold": 10
                    }
                ]
            }, 'status_code': 200}

        event_id = '123'

        get_event_fees_mock.return_value = response
        Response = self.client.get(
            reverse('blackbaud-get-event-fees', kwargs={'event_id': event_id}))
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertEqual(Response.data, response['data'])
        get_event_fees_mock.assert_called_once()

    @mock.patch(
        'modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.event_participant_options')
    def test_get_event_participant_options(self, get_event_participant_options_mock):
        response = {
            'data': {
                "count": 3,
                "value": [
                    {
                        "id": "f351b298-f5aa-4386-b13f-364622fbdbdd",
                        "name": "List option",
                        "input_type": "List",
                        "multi_select": "false",
                        "list_options": [
                            {
                                "id": "23b71438-4b0b-476b-935a-68e61b3aa015",
                                "name": "Small",
                                "sequence": 0
                            },
                            {
                                "id": "00cf35e7-128e-429b-a6bb-a8e5254f3c7b",
                                "name": "Medium",
                                "sequence": 1
                            },
                            {
                                "id": "1c58e1dd-6ac6-42a6-9820-1ce594941341",
                                "name": "Large",
                                "sequence": 2
                            }
                        ],
                        "added_by_user": "be042830-9ab3-4781-97d0-13298ba0d3c8",
                        "updated_by_user": "be042830-9ab3-4781-97d0-13298ba0d3c8",
                        "date_added": "2020-01-15T09:37:33.732Z",
                        "date_updated": "2020-01-15T09:37:33.732Z",
                        "version": 1
                    }
                ]
            }, 'status_code': 200}

        event_id = '123'

        get_event_participant_options_mock.return_value = response
        Response = self.client.get(
            reverse('blackbaud-get-event-participant-options', kwargs={'event_id': event_id}))
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertEqual(Response.data, response['data'])
        get_event_participant_options_mock.assert_called_once()

    @mock.patch(
        'modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.event_participant_donations')
    def test_get_event_participant_donation(self, get_event_participant_donation_mock):
        response = {
            'data': {
                "count": 2,
                "value": [
                    {
                        "id": "196",
                        "gift_id": "290"
                    },
                    {
                        "id": "323",
                        "gift_id": "146"
                    }
                ]
            }, 'status_code': 200}

        participant_id = '123'

        get_event_participant_donation_mock.return_value = response
        Response = self.client.get(
            reverse('blackbaud-get-event-participant-donation', kwargs={'participant_id': participant_id}))
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertEqual(Response.data, response['data'])
        get_event_participant_donation_mock.assert_called_once()

    @mock.patch(
        'modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.event_participant_fee_payments')
    def test_get_event_participant_fee_payments(self, get_event_participant_fee_payments_mock):
        response = {
            'data': {
                "count": 12,
                "value": [
                    {
                        "id": "196",
                        "participant_id": "109",
                        "gift_id": "290",
                        "applied_amount": 26.0
                    },
                    {
                        "id": "323",
                        "participant_id": "109",
                        "gift_id": "146",
                        "applied_amount": 10.0
                    }
                ]
            }, 'status_code': 200}

        participant_id = '123'

        get_event_participant_fee_payments_mock.return_value = response
        Response = self.client.get(
            reverse('blackbaud-get-event-participant-fee-payments', kwargs={'participant_id': participant_id}))
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertEqual(Response.data, response['data'])
        get_event_participant_fee_payments_mock.assert_called_once()

    @mock.patch(
        'modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.event_participant_fees')
    def test_get_event_participant_fees(self, get_event_participant_fees_mock):
        response = {
            'data': {
                "count": 12,
                "value": [
                    {
                        "id": "196",
                        "participant_id": "109",
                        "quantity": 1,
                        "fee_amount": 30.99,
                        "tax_receiptable_amount": 25.0,
                        "date": {
                            "d": 1,
                            "m": 1,
                            "y": 2020
                        },
                        "event_fee": {
                            "id": "17",
                            "name": "Individual",
                            "event_id": "9",
                            "cost": 30.99,
                            "contribution_amount": 25.0,
                            "number_sold": 5
                        }
                    },
                ]
            }, 'status_code': 200}

        participant_id = '123'

        get_event_participant_fees_mock.return_value = response
        Response = self.client.get(
            reverse('blackbaud-get-event-participant-fees', kwargs={'participant_id': participant_id}))
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertEqual(Response.data, response['data'])
        get_event_participant_fees_mock.assert_called_once()

    @mock.patch(
        'modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.participant_options')
    def test_get_participant_options(self, get_participant_options_mock):
        response = {
            'data': {
                "count": 2,
                "value": [
                    {
                        "id": "aa52b48c-4784-4a0f-907b-987454826fd6",
                        "participant_id": "2",
                        "event_id": "1",
                        "event_participant_option_id": "da6c3536-8ba4-42af-9496-f6dabede5a1a",
                        "option_value": "Chicken dinner",
                        "added_by_user": "be042830-9ab3-4781-97d0-13298ba0d3c8",
                        "updated_by_user": "be042830-9ab3-4781-97d0-13298ba0d3c8",
                        "date_added": "2020-01-21T04:12:54.421Z",
                        "date_updated": "2020-01-21T04:12:54.421Z"
                    },
                ]
            }, 'status_code': 200}

        participant_id = '123'

        get_participant_options_mock.return_value = response
        Response = self.client.get(
            reverse('blackbaud-get-participant-options', kwargs={'participant_id': participant_id}))
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertEqual(Response.data, response['data'])
        get_participant_options_mock.assert_called_once()

    @mock.patch(
        'modules.blackbaud.blackbaud.services.BlackbaudService.BlackbaudService.participant_levels')
    def test_get_participant_levels(self, get_participant_levels_mock):
        response = {
            'data': {
                "count": 4,
                "value": [
                    {
                        "id": "1772",
                        "name": "Attendee",
                        "is_inactive": "false"
                    },
                    {
                        "id": "301",
                        "name": "Captain",
                        "is_inactive": "false"
                    },
                    {
                        "id": "1493",
                        "name": "Coordinator",
                        "is_inactive": "false"
                    },
                    {
                        "id": "2010",
                        "name": "Corporate Sponsor",
                        "is_inactive": "false"
                    }
                ]
            }, 'status_code': 200}

        get_participant_levels_mock.return_value = response
        Response = self.client.get(
            reverse('blackbaud-get-participant-levels'))
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertEqual(Response.data, response['data'])
        get_participant_levels_mock.assert_called_once()