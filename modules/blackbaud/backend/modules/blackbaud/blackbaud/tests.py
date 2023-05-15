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
