from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from unittest import mock

"""
Test Cases 3rd party write with mocking the 3rd party 
So all Test cases write with mocking the Hubspot service with the valid response 
"""


class HubspotViewSetTest(APITestCase):
    """
    This test check we get access token successfully
    """

    @mock.patch('modules.django_hubspot.hubspot.services.HubspotService.HubspotService.auth_token')
    def test_service_access_token_create(self, auth_token_mock):
        response = {'data': {
            'token_type': 'bearer',
            'refresh_token': '8c6a2a1c-3ef4-4f1f-82ce-3d79e4ecbd1f',
            'access_token': 'CIGH6LTZMBIOAAGBQAAAGQIAAAA4AAEYkcOmCyC-oqwXKPHFUjIUerglqvYIekJve41Hy_kMPjX6BsU6MAAAAEEAAAAAwAcAAAAAAAAEgAAAAAAAAAAMACCAAQAOAOABAAAAAAAA_AcAABDwA0IU29FiR7r2GueLK9M6OcsV6CKH7i5KA25hMVIAWgA',
            'expires_in': 1800
        }}
        auth_token_mock.return_value = response
        data = {
            "code": "8c6a2a1c-3ef4-4f1f-82ce-3d79e4ecbd1f"
        }
        Response = self.client.post(reverse('hubspot_service-get-token'), data=data)
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        auth_token_mock.assert_called_once()

    @mock.patch('modules.django_hubspot.hubspot.services.HubspotService.HubspotService.auth_token')
    def test_service_access_token_create_with_wrong_code(self, auth_token_mock):
        """
        Test what the response with wrong code
        """
        response = {'data': {'status': 'BAD_AUTH_CODE', 'message': 'missing or unknown auth code',
                             'correlationId': 'bb5225de-3577-4962-ab93-8815571717b7'}, 'status_code': 400}
        auth_token_mock.return_value = response
        data = {
            "code": "61de550e-0e48-45e1-9f27-dc5281e6f59"
        }
        Response = self.client.post(reverse('hubspot_service-get-token'), data=data)
        self.assertEqual(Response.status_code, status.HTTP_400_BAD_REQUEST)
        auth_token_mock.assert_called_once()

    @mock.patch('modules.django_hubspot.hubspot.services.HubspotService.HubspotService.auth_token')
    def test_service_access_token_create_without_code(self, auth_token_mock):
        """
        Test what the response without code
        """
        response = {'data': {'status': 'BAD_AUTH_CODE', 'message': 'missing or unknown auth code',
                             'correlationId': 'bb5225de-3577-4962-ab93-8815571717b7'}, 'status_code': 400}
        auth_token_mock.return_value = response
        data = {
            "code": ""
        }
        Response = self.client.post(reverse('hubspot_service-get-token'), data=data)
        self.assertEqual(Response.status_code, status.HTTP_400_BAD_REQUEST)
        auth_token_mock.assert_called_once()

    @mock.patch('modules.django_hubspot.hubspot.services.HubspotService.HubspotService.contact_deals_association_list')
    def test_service_contact_list_retrieve(self, contact_deals_association_list_mock):
        """
        Test service contact list retrieve with valid ID
        """
        response = {
            'data':
                {'results': []
                 },
            'status_code': 200
        }
        contact_deals_association_list_mock.return_value = response

        data = {
            "contactId": '51'
        }
        Response = self.client.get(reverse('hubspot_service-contact-deals-association-list'), data)
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        contact_deals_association_list_mock.assert_called_once()
        contact_deals_association_list_mock.assert_called_once_with(data['contactId'])

    @mock.patch('modules.django_hubspot.hubspot.services.HubspotService.HubspotService.contact_deals_association_list')
    def test_service_contact_list_retrieve_with_wrong_id(self, contact_deals_association_list_mock):
        """
                Test what the response service contact list retrieve without ID
        """
        response = {
            'data': {
                'message': 'Resource not found'
            },
            'status_code': 404
        }
        contact_deals_association_list_mock.return_value = response

        data = {
            "contactId": '434390'
        }
        Response = self.client.get(reverse('hubspot_service-contact-deals-association-list'), data=data)
        self.assertEqual(Response.status_code, status.HTTP_404_NOT_FOUND)
        contact_deals_association_list_mock.assert_called_once()
        contact_deals_association_list_mock.assert_called_once_with(data['contactId'])

    @mock.patch('modules.django_hubspot.hubspot.services.HubspotService.HubspotService.contact_deals_association_list')
    def test_service_contact_list_retrieve_without_id(self, contact_deals_association_list_mock):
        """
                Test what the response service contact list retrieve with wrong I'd
        """
        response = {
            'data': {
                'message': 'Resource not found'
            },
            'status_code': 404
        }
        contact_deals_association_list_mock.return_value = response

        data = {
            "contactId": ''
        }
        Response = self.client.get(reverse('hubspot_service-contact-deals-association-list'), data=data)
        self.assertEqual(Response.status_code, status.HTTP_404_NOT_FOUND)
        contact_deals_association_list_mock.assert_called_once()
        contact_deals_association_list_mock.assert_called_once_with(data['contactId'])

    @mock.patch('modules.django_hubspot.hubspot.services.HubspotService.HubspotService.create_deal_contact_association')
    def test_service_deal_associations_create(self, create_deal_contact_association_mock):
        """
        Test service deal associations create with valid data  and  check the response
        """
        response = True
        create_deal_contact_association_mock.return_value = response
        data = {
            "emails": ["emailmaria@hubspot.com"],
            "dealId": "1"
        }
        Response = self.client.post(reverse('hubspot_service-create-deal-association'), data=data)
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertEqual(Response.data['result'], 'success')
        create_deal_contact_association_mock.assert_called_once()

    @mock.patch('modules.django_hubspot.hubspot.services.HubspotService.HubspotService.create_deal_contact_association')
    def test_service_deal_associations_create_with_wrong_email(self, create_deal_contact_association_mock):
        """
                Test service deal associations create with invalid data  and the check the response
        """
        response = False
        create_deal_contact_association_mock.return_value = response
        data = {
            "emails": ["emailmariahubspot.com"],
            "dealId": "1"
        }
        Response = self.client.post(reverse('hubspot_service-create-deal-association'), data=data)
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        self.assertEqual(Response.data['result'], 'failure')
        create_deal_contact_association_mock.assert_called_once()

    @mock.patch('modules.django_hubspot.hubspot.services.HubspotService.HubspotService.create_deal')
    def test_service_deal_create(self, create_deal_mock):
        """
        Test service deal create with valid data and check response
        """
        response = {'data': {'id': '11635495848',
                             'properties': {'createdate': '2023-01-09T18:00:03.003Z', 'days_to_close': '0',
                                            'hs_closed_amount': '0', 'hs_closed_amount_in_home_currency': '0',
                                            'hs_createdate': '2023-01-09T18:00:03.003Z',
                                            'hs_deal_stage_probability_shadow': '0', 'hs_is_closed_won': 'false',
                                            'hs_is_deal_split': 'false',
                                            'hs_lastmodifieddate': '2023-01-09T18:00:03.003Z',
                                            'hs_object_id': '11635495848', 'hs_projected_amount': '0',
                                            'hs_projected_amount_in_home_currency': '0'},
                             'createdAt': '2023-01-09T18:00:03.003Z', 'updatedAt': '2023-01-09T18:00:03.003Z',
                             'archived': False}, 'status_code': 201}
        create_deal_mock.return_value = response
        data = {
            "properties": {
                "amount": "1500.00",
                "closedate": "2023-01-05T11:06:29.345Z",
                "dealname": "Custom data integrations",
                "dealstage": "presentationscheduled",
                "hubspot_owner_id": "1352433",
                "pipeline": "default"
            },
            "associations": {
                "emails": ["emailmaria@hubspot.com"],
                "dealId": "1"
            }
        }
        Response = self.client.post(reverse('hubspot_service-create-deal'), data=data, format='json')
        self.assertEqual(Response.status_code, status.HTTP_201_CREATED)
        create_deal_mock.assert_called_once()

    @mock.patch('modules.django_hubspot.hubspot.services.HubspotService.HubspotService.create_deal')
    def test_service_deal_create_without_data(self, create_deal_mock):
        """
                Test service deal create without data and check response

        """
        response = {'data': {'id': '11636160938',
                             'properties': {'createdate': '2023-01-09T18:02:14.093Z', 'days_to_close': '0',
                                            'hs_closed_amount': '0', 'hs_closed_amount_in_home_currency': '0',
                                            'hs_createdate': '2023-01-09T18:02:14.093Z',
                                            'hs_deal_stage_probability_shadow': '0', 'hs_is_closed_won': 'false',
                                            'hs_is_deal_split': 'false',
                                            'hs_lastmodifieddate': '2023-01-09T18:02:14.093Z',
                                            'hs_object_id': '11636160938', 'hs_projected_amount': '0',
                                            'hs_projected_amount_in_home_currency': '0'},
                             'createdAt': '2023-01-09T18:02:14.093Z', 'updatedAt': '2023-01-09T18:02:14.093Z',
                             'archived': False}, 'status_code': 201}
        create_deal_mock.return_value = response
        Response = self.client.post(reverse('hubspot_service-create-deal'), format='json')
        self.assertEqual(Response.status_code, status.HTTP_201_CREATED)
        create_deal_mock.assert_called_once()

    @mock.patch('modules.django_hubspot.hubspot.services.HubspotService.HubspotService.deals_list')
    def test_service_deal_list(self, deals_list_mock):
        """
        Test service deal list and check response
        """
        response = {'data': {'results': [{'id': '11588855059', 'properties': {'amount': None, 'closedate': None,
                                                                              'createdate': '2023-01-05T11:58:08.271Z',
                                                                              'dealname': None, 'dealstage': None,
                                                                              'hs_lastmodifieddate': '2023-01-05T11:58:09.408Z',
                                                                              'hs_object_id': '11588855059',
                                                                              'pipeline': None},
                                          'createdAt': '2023-01-05T11:58:08.271Z',
                                          'updatedAt': '2023-01-05T11:58:09.408Z', 'archived': False},
                                         {'id': '11588871795', 'properties': {'amount': None, 'closedate': None,
                                                                              'createdate': '2023-01-05T11:31:54.151Z',
                                                                              'dealname': None, 'dealstage': None,
                                                                              'hs_lastmodifieddate': '2023-01-05T11:31:56.264Z',
                                                                              'hs_object_id': '11588871795',
                                                                              'pipeline': None},
                                          'createdAt': '2023-01-05T11:31:54.151Z',
                                          'updatedAt': '2023-01-05T11:31:56.264Z', 'archived': False},
                                         {'id': '11631636045', 'properties': {'amount': None, 'closedate': None,
                                                                              'createdate': '2023-01-09T08:46:32.359Z',
                                                                              'dealname': None, 'dealstage': None,
                                                                              'hs_lastmodifieddate': '2023-01-09T08:46:33.730Z',
                                                                              'hs_object_id': '11631636045',
                                                                              'pipeline': None},
                                          'createdAt': '2023-01-09T08:46:32.359Z',
                                          'updatedAt': '2023-01-09T08:46:33.730Z', 'archived': False},
                                         {'id': '11633655471', 'properties': {'amount': None, 'closedate': None,
                                                                              'createdate': '2023-01-09T14:41:57.575Z',
                                                                              'dealname': None, 'dealstage': None,
                                                                              'hs_lastmodifieddate': '2023-01-09T14:42:00.283Z',
                                                                              'hs_object_id': '11633655471',
                                                                              'pipeline': None},
                                          'createdAt': '2023-01-09T14:41:57.575Z',
                                          'updatedAt': '2023-01-09T14:42:00.283Z', 'archived': False},
                                         {'id': '11633687177', 'properties': {'amount': None, 'closedate': None,
                                                                              'createdate': '2023-01-09T14:47:27.032Z',
                                                                              'dealname': None, 'dealstage': None,
                                                                              'hs_lastmodifieddate': '2023-01-09T14:47:28.788Z',
                                                                              'hs_object_id': '11633687177',
                                                                              'pipeline': None},
                                          'createdAt': '2023-01-09T14:47:27.032Z',
                                          'updatedAt': '2023-01-09T14:47:28.788Z', 'archived': False},
                                         {'id': '11633749047', 'properties': {'amount': None, 'closedate': None,
                                                                              'createdate': '2023-01-09T14:44:58.619Z',
                                                                              'dealname': None, 'dealstage': None,
                                                                              'hs_lastmodifieddate': '2023-01-09T14:45:01.476Z',
                                                                              'hs_object_id': '11633749047',
                                                                              'pipeline': None},
                                          'createdAt': '2023-01-09T14:44:58.619Z',
                                          'updatedAt': '2023-01-09T14:45:01.476Z', 'archived': False},
                                         {'id': '11633807254', 'properties': {'amount': None, 'closedate': None,
                                                                              'createdate': '2023-01-09T14:53:45.022Z',
                                                                              'dealname': None, 'dealstage': None,
                                                                              'hs_lastmodifieddate': '2023-01-09T14:53:47.372Z',
                                                                              'hs_object_id': '11633807254',
                                                                              'pipeline': None},
                                          'createdAt': '2023-01-09T14:53:45.022Z',
                                          'updatedAt': '2023-01-09T14:53:47.372Z', 'archived': False},
                                         {'id': '11633835275', 'properties': {'amount': None, 'closedate': None,
                                                                              'createdate': '2023-01-09T15:15:07.374Z',
                                                                              'dealname': None, 'dealstage': None,
                                                                              'hs_lastmodifieddate': '2023-01-09T15:15:12.669Z',
                                                                              'hs_object_id': '11633835275',
                                                                              'pipeline': None},
                                          'createdAt': '2023-01-09T15:15:07.374Z',
                                          'updatedAt': '2023-01-09T15:15:12.669Z', 'archived': False},
                                         {'id': '11633835355', 'properties': {'amount': None, 'closedate': None,
                                                                              'createdate': '2023-01-09T15:16:35.377Z',
                                                                              'dealname': None, 'dealstage': None,
                                                                              'hs_lastmodifieddate': '2023-01-09T15:16:49.572Z',
                                                                              'hs_object_id': '11633835355',
                                                                              'pipeline': None},
                                          'createdAt': '2023-01-09T15:16:35.377Z',
                                          'updatedAt': '2023-01-09T15:16:49.572Z', 'archived': False},
                                         {'id': '11633846325', 'properties': {'amount': None, 'closedate': None,
                                                                              'createdate': '2023-01-09T15:40:03.105Z',
                                                                              'dealname': None, 'dealstage': None,
                                                                              'hs_lastmodifieddate': '2023-01-09T15:40:06.861Z',
                                                                              'hs_object_id': '11633846325',
                                                                              'pipeline': None},
                                          'createdAt': '2023-01-09T15:40:03.105Z',
                                          'updatedAt': '2023-01-09T15:40:06.861Z', 'archived': False}], 'paging': {
            'next': {'after': '11633846326',
                     'link': 'https://api.hubapi.com/crm/v4/objects/deals/?after=11633846326'}}}, 'status_code': 200}
        deals_list_mock.return_value = response
        Response = self.client.get(reverse('hubspot_service-deals-list'), format='json')
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        deals_list_mock.assert_called_once()

    @mock.patch('modules.django_hubspot.hubspot.services.HubspotService.HubspotService.remove_deal')
    def test_service_deal_remove(self, remove_deal_mock):
        """
        Test service deal remove with valid id and check the response
        """

        response = {
            'data': {
                'message': 'Item deleted successfully.'
            },
            'status_code': 204
        }
        remove_deal_mock.return_value = response
        data = {
            "dealId": "11634132761"
        }
        Response = self.client.delete(reverse('hubspot_service-remove-deal'), data, format='json')
        self.assertEqual(Response.status_code, status.HTTP_204_NO_CONTENT)
        remove_deal_mock.assert_called_once()
        remove_deal_mock.assert_called_once_with(data['dealId'])

    @mock.patch('modules.django_hubspot.hubspot.services.HubspotService.HubspotService.remove_deal')
    def test_service_deal_remove_with_wrong_id(self, remove_deal_mock):
        """
                Test service deal remove with invalid id and check the response

        """
        response = {
            'data': {
                'message': 'Item deleted successfully.'
            },
            'status_code': 204
        }
        remove_deal_mock.return_value = response
        data = {
            "dealId": "11"
        }
        Response = self.client.delete(reverse('hubspot_service-remove-deal'), data, format='json')
        self.assertEqual(Response.status_code, status.HTTP_204_NO_CONTENT)
        remove_deal_mock.assert_called_once()
        remove_deal_mock.assert_called_once_with(data['dealId'])

    @mock.patch('modules.django_hubspot.hubspot.services.HubspotService.HubspotService.single_deal')
    def test_service_deals_single_retrieve(self, single_deal_mock):
        """
        Test service deal get single retrieve with valid id and check the response
        """
        response = {
            'data': {
                'id': '11635119394',
                'properties': {
                    'amount': None,
                    'closedate': None,
                    'createdate': '2023-01-09T16:36:22.413Z',
                    'dealname': None,
                    'dealstage': None,
                    'hs_lastmodifieddate': '2023-01-09T16:36:24.593Z',
                    'hs_object_id': '11635119394',
                    'pipeline': None
                },
                'createdAt': '2023-01-09T16:36:22.413Z',
                'updatedAt': '2023-01-09T16:36:24.593Z',
                'archived': False
            },
            'status_code': 200
        }
        single_deal_mock.return_value = response
        data = {
            "dealId": "11634568517"
        }
        Response = self.client.get(reverse('hubspot_service-single-deal'), data, format='json')
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        single_deal_mock.assert_called_once()
        single_deal_mock.assert_called_once_with(data['dealId'])

    @mock.patch('modules.django_hubspot.hubspot.services.HubspotService.HubspotService.single_deal')
    def test_service_deals_single_retrieve_with_wrong_id(self, single_deal_mock):
        """
                Test service deal get single retrieve with invalid id and check the response

        """
        response = {
            'data': {
                'message': 'Resource not found'
            },
            'status_code': 404
        }
        single_deal_mock.return_value = response
        data = {
            "dealId": "11634568517"
        }
        Response = self.client.get(reverse('hubspot_service-single-deal'), data, format='json')
        self.assertEqual(Response.status_code, status.HTTP_404_NOT_FOUND)
        single_deal_mock.assert_called_once()
        single_deal_mock.assert_called_once_with(data['dealId'])

    @mock.patch(
        'modules.django_hubspot.hubspot.services.HubspotService.HubspotService.meeting_contact_association_list')
    def test_service_meeting_contact_list(self, meeting_contact_association_list_mock):
        """
        Test service meeting contact lis with valid data
        """
        response = {
            'data': {
                'results': []
            },
            'status_code': 200
        }
        meeting_contact_association_list_mock.return_value = response
        data = {
            "meetingId": "29123684621",
            "toObjectType": "contacts"
        }
        Response = self.client.get(reverse('hubspot_service-meeting-contacts-association-list'), data)
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        meeting_contact_association_list_mock.assert_called_once()
        meeting_contact_association_list_mock.assert_called_once_with(data['meetingId'])

    @mock.patch(
        'modules.django_hubspot.hubspot.services.HubspotService.HubspotService.meeting_contact_association_list')
    def test_service_meeting_contact_list_with_wrong_meeting_id(self, meeting_contact_association_list_mock):
        """
        Test service meeting contact lis with invalid meetingId
        """
        response = {
            'data': {
                'results': []
            },
            'status_code': 200
        }
        meeting_contact_association_list_mock.return_value = response
        data = {
            "meetingId": "291236845454621",
            "toObjectType": "contacts"
        }
        Response = self.client.get(reverse('hubspot_service-meeting-contacts-association-list'), data=data,
                                   format='json')
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        meeting_contact_association_list_mock.assert_called_once()
        meeting_contact_association_list_mock.assert_called_once_with(data['meetingId'])

    @mock.patch(
        'modules.django_hubspot.hubspot.services.HubspotService.HubspotService.meeting_contact_association_list')
    def test_service_meeting_contact_list_without_meeting_id(self, meeting_contact_association_list_mock):
        """
        Test service meeting contact lis without meetingId
        """
        response = {
            'data': {
                'message': 'Resource not found'
            },
            'status_code': 404
        }
        meeting_contact_association_list_mock.return_value = response
        data = {
            "meetingId": "",
            "toObjectType": "contacts"
        }
        Response = self.client.get(reverse('hubspot_service-meeting-contacts-association-list'), data=data,
                                   format='json')
        self.assertEqual(Response.status_code, status.HTTP_404_NOT_FOUND)
        meeting_contact_association_list_mock.assert_called_once()
        meeting_contact_association_list_mock.assert_called_once_with(data['meetingId'])

    @mock.patch('modules.django_hubspot.hubspot.services.HubspotService.HubspotService.create_ticket_association')
    def test_service_association_ticket_create(self, create_ticket_association):
        """
        Test service association ticket create with valid data
        """

        response = {'data': {'fromObjectTypeId': '0-5', 'fromObjectId': 1355783574, 'toObjectTypeId': '0-3',
                             'toObjectId': 11588855059, 'labels': []}, 'status_code': 201}
        create_ticket_association.return_value = response
        data = {"ticketId": "1355783574",
                "toObjectType": "deal",
                "toObjectId": "11588855059",
                "param": [
                    {
                        "associationCategory": "HUBSPOT_DEFINED",
                        "associationTypeId": "28"
                    }
                ]
                }
        Response = self.client.put(reverse('hubspot_service-create-ticket-association'), data=data, format='json')
        self.assertEqual(Response.status_code, status.HTTP_201_CREATED)
        create_ticket_association.assert_called_once()

    @mock.patch('modules.django_hubspot.hubspot.services.HubspotService.HubspotService.create_ticket_association')
    def test_service_association_ticket_create_with_wrong_data(self, create_ticket_association):
        """
        Test service association ticket create with invalid data
        """
        response = {'data': {'status': 'error', 'message': 'One or more associations are invalid',
                             'correlationId': 'cb3e5c0f-25e3-47fc-9f34-b744e9483253',
                             'context': {
                                 'INVALID_OBJECT_IDS': ['DEAL=115455488855059 is not valid']
                             },
                             'category': 'VALIDATION_ERROR'}, 'status_code': 400}
        create_ticket_association.return_value = response

        data = {"ticketId": "135573574",
                "toObjectType": "deal",
                "toObjectId": "115885545059",
                "param": [
                    {
                        "associationCategory": "HUBSPOT_DEFINED",
                        "associationTypeId": "28"
                    }
                ]
                }
        Response = self.client.put(reverse('hubspot_service-create-ticket-association'), data=data, format='json')
        self.assertEqual(Response.status_code, status.HTTP_400_BAD_REQUEST)
        create_ticket_association.assert_called_once()

    @mock.patch('modules.django_hubspot.hubspot.services.HubspotService.HubspotService.ticket_association_list')
    def test_ticket_association_list(self, ticket_association_list_mock):
        """
        Test service association ticket list with valid ticketId
        """
        response = {
            'data': {
                'results': []
            },
            'status_code': 200
        }
        ticket_association_list_mock.return_value = response
        data = {
            "ticketId": "29574639194",
            "toObjectType": "deal"

        }
        Response = self.client.get(reverse('hubspot_service-ticket-association-list'), data, format='json')
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        ticket_association_list_mock.assert_called_once()
        ticket_association_list_mock.assert_called_once_with(data['ticketId'], data['toObjectType'])

    @mock.patch('modules.django_hubspot.hubspot.services.HubspotService.HubspotService.ticket_association_list')
    def test_ticket_association_list_with_wrong_ticketId(self, ticket_association_list_mock):
        """
        Test service association ticket list with invalid ticketId
        """
        response = {
            'data': {
                'results': []
            },
            'status_code': 200
        }
        ticket_association_list_mock.return_value = response
        data = {
            "ticketId": "2957463454549194",
            "toObjectType": "deal"
        }
        Response = self.client.get(reverse('hubspot_service-ticket-association-list'), data=data, format='json')
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        ticket_association_list_mock.assert_called_once()
        ticket_association_list_mock.assert_called_once_with(data['ticketId'], data['toObjectType'])

    @mock.patch('modules.django_hubspot.hubspot.services.HubspotService.HubspotService.ticket_association_list')
    def test_ticket_association_list_without_ticketId(self, ticket_association_list_mock):
        """
        Test service association ticket list without ticketId
        """
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}
        ticket_association_list_mock.return_value = response
        data = {
            "ticketId": "",
            "toObjectType": "deal"
        }
        Response = self.client.get(reverse('hubspot_service-ticket-association-list'), data=data, format='json')
        self.assertEqual(Response.status_code, status.HTTP_404_NOT_FOUND)
        ticket_association_list_mock.assert_called_once()
        ticket_association_list_mock.assert_called_once_with(data['ticketId'], data['toObjectType'])

    @mock.patch('modules.django_hubspot.hubspot.services.HubspotService.HubspotService.create_ticket')
    def test_ticket_create(self, create_ticket_mock):
        """
        Test ticket create and check the response with valid data
        """
        response = {'data': {'id': '1362904882',
                             'properties': {'content': 'tickect description', 'createdate': '2023-01-09T18:23:04.770Z',
                                            'hs_all_owner_ids': '299457121',
                                            'hs_lastmodifieddate': '2023-01-09T18:23:04.770Z',
                                            'hs_object_id': '1362904882', 'hs_pipeline': '0', 'hs_pipeline_stage': '2',
                                            'hs_ticket_id': '1362904882', 'hs_ticket_priority': 'HIGH',
                                            'hs_user_ids_of_all_owners': '48959806',
                                            'hubspot_owner_assigneddate': '2023-01-09T18:23:04.770Z',
                                            'hubspot_owner_id': '299457121', 'subject': 'troubleshoot report'},
                             'createdAt': '2023-01-09T18:23:04.770Z', 'updatedAt': '2023-01-09T18:23:04.770Z',
                             'archived': False}, 'status_code': 201}
        create_ticket_mock.return_value = response
        data = {
            "properties": {
                "hs_pipeline": "0",
                "hs_pipeline_stage": "2",
                "hs_ticket_priority": "HIGH",
                "hubspot_owner_id": "299457121",
                "subject": "troubleshoot report",
                "content": "tickect description"
            }
        }
        Response = self.client.post(reverse('hubspot_service-create-ticket'), data=data, format='json')
        self.assertEqual(Response.status_code, status.HTTP_201_CREATED)
        create_ticket_mock.assert_called_once()

    @mock.patch('modules.django_hubspot.hubspot.services.HubspotService.HubspotService.create_ticket')
    def test_ticket_create_with_wrong_data(self, create_ticket_mock):
        """
        Test ticket create and check the response with invalid data
        """
        response = {'data': {'status': 'error',
                             'message': 'Property values were not valid: [{"isValid":false,"message":"29947847357121 was not a valid integer (for owner ID).","error":"INVALID_INTEGER","name":"hubspot_owner_id"}]',
                             'correlationId': '5392f03d-ca69-4d85-8383-4dae2ea0fa8a', 'category': 'VALIDATION_ERROR'},
                    'status_code': 400}
        create_ticket_mock.return_value = response
        data = {
            "properties": {
                "hs_pipeline": "034",
                "hs_pipeline_stage": "2",
                "hs_ticket_priority": "HIGH",
                "hubspot_owner_id": "29947843757454121",
                "subject": "troubleshoot report",
                "content": "tickect description"
            }
        }
        Response = self.client.post(reverse('hubspot_service-create-ticket'), data=data, format='json')
        self.assertEqual(Response.status_code, status.HTTP_400_BAD_REQUEST)
        create_ticket_mock.assert_called_once()

    @mock.patch('modules.django_hubspot.hubspot.services.HubspotService.HubspotService.ticket_list')
    def test_ticket_list(self, ticket_list_mock):
        """
        Test ticket list and check the response
        """
        response = {'data': {'results': [{'id': '1355783574', 'properties': {'content': 'tickect description',
                                                                             'createdate': '2023-01-05T14:15:12.347Z',
                                                                             'hs_lastmodifieddate': '2023-01-05T14:15:21.997Z',
                                                                             'hs_object_id': '1355783574',
                                                                             'hs_pipeline': '0',
                                                                             'hs_pipeline_stage': '2',
                                                                             'hs_ticket_category': None,
                                                                             'hs_ticket_priority': 'HIGH',
                                                                             'subject': 'troubleshoot report'},
                                          'createdAt': '2023-01-05T14:15:12.347Z',
                                          'updatedAt': '2023-01-05T14:15:21.997Z', 'archived': False},
                                         {'id': '1362685973', 'properties': {'content': 'tickect description',
                                                                             'createdate': '2023-01-09T17:42:42.006Z',
                                                                             'hs_lastmodifieddate': '2023-01-09T17:42:43.918Z',
                                                                             'hs_object_id': '1362685973',
                                                                             'hs_pipeline': '0',
                                                                             'hs_pipeline_stage': '2',
                                                                             'hs_ticket_category': None,
                                                                             'hs_ticket_priority': 'HIGH',
                                                                             'subject': 'troubleshoot report'},
                                          'createdAt': '2023-01-09T17:42:42.006Z',
                                          'updatedAt': '2023-01-09T17:42:43.918Z', 'archived': False},
                                         {'id': '1362685988', 'properties': {'content': 'tickect description',
                                                                             'createdate': '2023-01-09T17:42:56.945Z',
                                                                             'hs_lastmodifieddate': '2023-01-09T17:42:58.045Z',
                                                                             'hs_object_id': '1362685988',
                                                                             'hs_pipeline': '0',
                                                                             'hs_pipeline_stage': '2',
                                                                             'hs_ticket_category': None,
                                                                             'hs_ticket_priority': 'HIGH',
                                                                             'subject': 'troubleshoot report'},
                                          'createdAt': '2023-01-09T17:42:56.945Z',
                                          'updatedAt': '2023-01-09T17:42:58.045Z', 'archived': False},
                                         {'id': '1362732044', 'properties': {'content': 'tickect description',
                                                                             'createdate': '2023-01-09T17:41:10.558Z',
                                                                             'hs_lastmodifieddate': '2023-01-09T17:41:14.205Z',
                                                                             'hs_object_id': '1362732044',
                                                                             'hs_pipeline': '0',
                                                                             'hs_pipeline_stage': '2',
                                                                             'hs_ticket_category': None,
                                                                             'hs_ticket_priority': 'HIGH',
                                                                             'subject': 'troubleshoot report'},
                                          'createdAt': '2023-01-09T17:41:10.558Z',
                                          'updatedAt': '2023-01-09T17:41:14.205Z', 'archived': False},
                                         {'id': '1362748584', 'properties': {'content': 'tickect description',
                                                                             'createdate': '2023-01-09T17:42:24.567Z',
                                                                             'hs_lastmodifieddate': '2023-01-09T17:42:26.843Z',
                                                                             'hs_object_id': '1362748584',
                                                                             'hs_pipeline': '0',
                                                                             'hs_pipeline_stage': '2',
                                                                             'hs_ticket_category': None,
                                                                             'hs_ticket_priority': 'HIGH',
                                                                             'subject': 'troubleshoot report'},
                                          'createdAt': '2023-01-09T17:42:24.567Z',
                                          'updatedAt': '2023-01-09T17:42:26.843Z', 'archived': False},
                                         {'id': '1362758701', 'properties': {'content': 'tickect description',
                                                                             'createdate': '2023-01-09T17:44:15.860Z',
                                                                             'hs_lastmodifieddate': '2023-01-09T17:44:17.500Z',
                                                                             'hs_object_id': '1362758701',
                                                                             'hs_pipeline': '0',
                                                                             'hs_pipeline_stage': '2',
                                                                             'hs_ticket_category': None,
                                                                             'hs_ticket_priority': 'HIGH',
                                                                             'subject': 'troubleshoot report'},
                                          'createdAt': '2023-01-09T17:44:15.860Z',
                                          'updatedAt': '2023-01-09T17:44:17.500Z', 'archived': False},
                                         {'id': '1362786088', 'properties': {'content': 'tickect description',
                                                                             'createdate': '2023-01-09T18:07:20.543Z',
                                                                             'hs_lastmodifieddate': '2023-01-09T18:07:35.809Z',
                                                                             'hs_object_id': '1362786088',
                                                                             'hs_pipeline': '0',
                                                                             'hs_pipeline_stage': '2',
                                                                             'hs_ticket_category': None,
                                                                             'hs_ticket_priority': 'HIGH',
                                                                             'subject': 'troubleshoot report'},
                                          'createdAt': '2023-01-09T18:07:20.543Z',
                                          'updatedAt': '2023-01-09T18:07:35.809Z', 'archived': False},
                                         {'id': '1362904882', 'properties': {'content': 'tickect description',
                                                                             'createdate': '2023-01-09T18:23:04.770Z',
                                                                             'hs_lastmodifieddate': '2023-01-09T18:23:07.430Z',
                                                                             'hs_object_id': '1362904882',
                                                                             'hs_pipeline': '0',
                                                                             'hs_pipeline_stage': '2',
                                                                             'hs_ticket_category': None,
                                                                             'hs_ticket_priority': 'HIGH',
                                                                             'subject': 'troubleshoot report'},
                                          'createdAt': '2023-01-09T18:23:04.770Z',
                                          'updatedAt': '2023-01-09T18:23:07.430Z', 'archived': False},
                                         {'id': '1362920803', 'properties': {'content': 'tickect description',
                                                                             'createdate': '2023-01-09T18:17:55.343Z',
                                                                             'hs_lastmodifieddate': '2023-01-09T18:17:57.930Z',
                                                                             'hs_object_id': '1362920803',
                                                                             'hs_pipeline': '0',
                                                                             'hs_pipeline_stage': '2',
                                                                             'hs_ticket_category': None,
                                                                             'hs_ticket_priority': 'HIGH',
                                                                             'subject': 'troubleshoot report'},
                                          'createdAt': '2023-01-09T18:17:55.343Z',
                                          'updatedAt': '2023-01-09T18:17:57.930Z', 'archived': False}]},
                    'status_code': 200}
        ticket_list_mock.return_value = response
        Response = self.client.get(reverse('hubspot_service-ticket-list'))
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        ticket_list_mock.assert_called_once()

    @mock.patch('modules.django_hubspot.hubspot.services.HubspotService.HubspotService.remove_ticket')
    def test_tickets_remove(self, remove_ticket_mock):
        """
        Test tickets remove with valid ticketId and check the response
        """
        response = {'data': {'message': 'Item deleted successfully.'}, 'status_code': 204}
        remove_ticket_mock.return_value = response
        data = {
            "ticketId": "1355771473"
        }
        Response = self.client.delete(reverse('hubspot_service-remove-ticket'), data, fromat='json')
        self.assertEqual(Response.status_code, status.HTTP_204_NO_CONTENT)
        remove_ticket_mock.assert_called_once()
        remove_ticket_mock.assert_called_once_with(data['ticketId'])

    @mock.patch('modules.django_hubspot.hubspot.services.HubspotService.HubspotService.remove_ticket')
    def test_tickets_remove_with_wrong_ticketId(self, remove_ticket_mock):
        """
        Test tickets remove with invalid ticketId and check the response
        """
        response = {'data': {'message': 'Item deleted successfully.'}, 'status_code': 204}
        remove_ticket_mock.return_value = response
        data = {
            "ticketId": "1355778947841473"
        }
        Response = self.client.delete(reverse('hubspot_service-remove-ticket'), data, fromat='json')
        self.assertEqual(Response.status_code, status.HTTP_204_NO_CONTENT)
        remove_ticket_mock.assert_called_once()
        remove_ticket_mock.assert_called_once_with(data['ticketId'])

    @mock.patch('modules.django_hubspot.hubspot.services.HubspotService.HubspotService.single_ticket')
    def test_tickets_single_retrieve(self, single_ticket_mock):
        """
        Test tickets single get and check the response with valid ticketId
        """
        response = {'data': {'id': '1355783574',
                             'properties': {'content': 'tickect description', 'createdate': '2023-01-05T14:15:12.347Z',
                                            'hs_lastmodifieddate': '2023-01-05T14:15:21.997Z',
                                            'hs_object_id': '1355783574', 'hs_pipeline': '0', 'hs_pipeline_stage': '2',
                                            'hs_ticket_category': None, 'hs_ticket_priority': 'HIGH',
                                            'subject': 'troubleshoot report'}, 'createdAt': '2023-01-05T14:15:12.347Z',
                             'updatedAt': '2023-01-05T14:15:21.997Z', 'archived': False}, 'status_code': 200}
        single_ticket_mock.return_value = response
        data = {
            "ticketId": "1355783574"
        }
        Response = self.client.get(reverse('hubspot_service-single-ticket'), data, fromat='json')
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        single_ticket_mock.assert_called_once()
        single_ticket_mock.assert_called_once_with(data['ticketId'])

    @mock.patch('modules.django_hubspot.hubspot.services.HubspotService.HubspotService.single_ticket')
    def test_tickets_single_retrieve_with_wrong_ticketId(self, single_ticket_mock):
        """
        Test tickets single get and check the response with invalid ticketId
        """
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}
        single_ticket_mock.return_value = response
        data = {
            "ticketId": "1355798439483574"
        }
        Response = self.client.get(reverse('hubspot_service-single-ticket'), data, fromat='json')
        self.assertEqual(Response.status_code, status.HTTP_404_NOT_FOUND)
        single_ticket_mock.assert_called_once()
        single_ticket_mock.assert_called_once_with(data['ticketId'])

    @mock.patch('modules.django_hubspot.hubspot.services.HubspotService.HubspotService.single_ticket')
    def test_tickets_single_retrieve_without_ticketId(self, single_ticket_mock):
        """
        Test tickets single get and check the response without ticketId
        """
        response = {'data': {'results': [{'id': '1355783574', 'properties': {'content': 'tickect description',
                                                                             'createdate': '2023-01-05T14:15:12.347Z',
                                                                             'hs_lastmodifieddate': '2023-01-05T14:15:21.997Z',
                                                                             'hs_object_id': '1355783574',
                                                                             'hs_pipeline': '0',
                                                                             'hs_pipeline_stage': '2',
                                                                             'hs_ticket_category': None,
                                                                             'hs_ticket_priority': 'HIGH',
                                                                             'subject': 'troubleshoot report'},
                                          'createdAt': '2023-01-05T14:15:12.347Z',
                                          'updatedAt': '2023-01-05T14:15:21.997Z', 'archived': False},
                                         {'id': '1362685973', 'properties': {'content': 'tickect description',
                                                                             'createdate': '2023-01-09T17:42:42.006Z',
                                                                             'hs_lastmodifieddate': '2023-01-09T17:42:43.918Z',
                                                                             'hs_object_id': '1362685973',
                                                                             'hs_pipeline': '0',
                                                                             'hs_pipeline_stage': '2',
                                                                             'hs_ticket_category': None,
                                                                             'hs_ticket_priority': 'HIGH',
                                                                             'subject': 'troubleshoot report'},
                                          'createdAt': '2023-01-09T17:42:42.006Z',
                                          'updatedAt': '2023-01-09T17:42:43.918Z', 'archived': False},
                                         {'id': '1362685988', 'properties': {'content': 'tickect description',
                                                                             'createdate': '2023-01-09T17:42:56.945Z',
                                                                             'hs_lastmodifieddate': '2023-01-09T17:42:58.045Z',
                                                                             'hs_object_id': '1362685988',
                                                                             'hs_pipeline': '0',
                                                                             'hs_pipeline_stage': '2',
                                                                             'hs_ticket_category': None,
                                                                             'hs_ticket_priority': 'HIGH',
                                                                             'subject': 'troubleshoot report'},
                                          'createdAt': '2023-01-09T17:42:56.945Z',
                                          'updatedAt': '2023-01-09T17:42:58.045Z', 'archived': False},
                                         {'id': '1362732044', 'properties': {'content': 'tickect description',
                                                                             'createdate': '2023-01-09T17:41:10.558Z',
                                                                             'hs_lastmodifieddate': '2023-01-09T17:41:14.205Z',
                                                                             'hs_object_id': '1362732044',
                                                                             'hs_pipeline': '0',
                                                                             'hs_pipeline_stage': '2',
                                                                             'hs_ticket_category': None,
                                                                             'hs_ticket_priority': 'HIGH',
                                                                             'subject': 'troubleshoot report'},
                                          'createdAt': '2023-01-09T17:41:10.558Z',
                                          'updatedAt': '2023-01-09T17:41:14.205Z', 'archived': False},
                                         {'id': '1362748584', 'properties': {'content': 'tickect description',
                                                                             'createdate': '2023-01-09T17:42:24.567Z',
                                                                             'hs_lastmodifieddate': '2023-01-09T17:42:26.843Z',
                                                                             'hs_object_id': '1362748584',
                                                                             'hs_pipeline': '0',
                                                                             'hs_pipeline_stage': '2',
                                                                             'hs_ticket_category': None,
                                                                             'hs_ticket_priority': 'HIGH',
                                                                             'subject': 'troubleshoot report'},
                                          'createdAt': '2023-01-09T17:42:24.567Z',
                                          'updatedAt': '2023-01-09T17:42:26.843Z', 'archived': False},
                                         {'id': '1362758701', 'properties': {'content': 'tickect description',
                                                                             'createdate': '2023-01-09T17:44:15.860Z',
                                                                             'hs_lastmodifieddate': '2023-01-09T17:44:17.500Z',
                                                                             'hs_object_id': '1362758701',
                                                                             'hs_pipeline': '0',
                                                                             'hs_pipeline_stage': '2',
                                                                             'hs_ticket_category': None,
                                                                             'hs_ticket_priority': 'HIGH',
                                                                             'subject': 'troubleshoot report'},
                                          'createdAt': '2023-01-09T17:44:15.860Z',
                                          'updatedAt': '2023-01-09T17:44:17.500Z', 'archived': False},
                                         {'id': '1362786088', 'properties': {'content': 'tickect description',
                                                                             'createdate': '2023-01-09T18:07:20.543Z',
                                                                             'hs_lastmodifieddate': '2023-01-09T18:07:35.809Z',
                                                                             'hs_object_id': '1362786088',
                                                                             'hs_pipeline': '0',
                                                                             'hs_pipeline_stage': '2',
                                                                             'hs_ticket_category': None,
                                                                             'hs_ticket_priority': 'HIGH',
                                                                             'subject': 'troubleshoot report'},
                                          'createdAt': '2023-01-09T18:07:20.543Z',
                                          'updatedAt': '2023-01-09T18:07:35.809Z', 'archived': False},
                                         {'id': '1362895897', 'properties': {'content': 'tickect description',
                                                                             'createdate': '2023-01-09T18:32:58.895Z',
                                                                             'hs_lastmodifieddate': '2023-01-09T18:33:04.588Z',
                                                                             'hs_object_id': '1362895897',
                                                                             'hs_pipeline': '0',
                                                                             'hs_pipeline_stage': '2',
                                                                             'hs_ticket_category': None,
                                                                             'hs_ticket_priority': 'HIGH',
                                                                             'subject': 'troubleshoot report'},
                                          'createdAt': '2023-01-09T18:32:58.895Z',
                                          'updatedAt': '2023-01-09T18:33:04.588Z', 'archived': False},
                                         {'id': '1362904882', 'properties': {'content': 'tickect description',
                                                                             'createdate': '2023-01-09T18:23:04.770Z',
                                                                             'hs_lastmodifieddate': '2023-01-09T18:23:07.430Z',
                                                                             'hs_object_id': '1362904882',
                                                                             'hs_pipeline': '0',
                                                                             'hs_pipeline_stage': '2',
                                                                             'hs_ticket_category': None,
                                                                             'hs_ticket_priority': 'HIGH',
                                                                             'subject': 'troubleshoot report'},
                                          'createdAt': '2023-01-09T18:23:04.770Z',
                                          'updatedAt': '2023-01-09T18:23:07.430Z', 'archived': False},
                                         {'id': '1362920803', 'properties': {'content': 'tickect description',
                                                                             'createdate': '2023-01-09T18:17:55.343Z',
                                                                             'hs_lastmodifieddate': '2023-01-09T18:17:57.930Z',
                                                                             'hs_object_id': '1362920803',
                                                                             'hs_pipeline': '0',
                                                                             'hs_pipeline_stage': '2',
                                                                             'hs_ticket_category': None,
                                                                             'hs_ticket_priority': 'HIGH',
                                                                             'subject': 'troubleshoot report'},
                                          'createdAt': '2023-01-09T18:17:55.343Z',
                                          'updatedAt': '2023-01-09T18:17:57.930Z', 'archived': False}]},
                    'status_code': 200}
        single_ticket_mock.return_value = response
        data = {
            "ticketId": ""
        }
        Response = self.client.get(reverse('hubspot_service-single-ticket'), data, fromat='json')
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        single_ticket_mock.assert_called_once()
        single_ticket_mock.assert_called_once_with(data['ticketId'])

    @mock.patch('modules.django_hubspot.hubspot.services.HubspotService.HubspotService.webhook')
    def test_service_webhook(self, webhook_mock):
        """
        Test service webhook and check the response
        """
        response = {}
        webhook_mock.return_value = response
        Response = self.client.post(reverse('hubspot_service-webhook'))
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        webhook_mock.assert_called_once()

    @mock.patch('modules.django_hubspot.hubspot.services.HubspotService.HubspotService.create_event')
    def test_service_event_create(self, create_event_mock):
        """
        Test create event with valid data and check the response
        """
        response = {
            'data': {'eventName': 'Test check', 'eventType': 'WORKSHOP', 'startDateTime': '2023-01-12T14:44:08.372Z',
                     'endDateTime': '2023-01-12T15:44:08.372Z', 'eventOrganizer': 'John doe',
                     'eventDescription': 'Description for the event', 'eventUrl': 'https://crowdbotics.com',
                     'eventCancelled': False, 'customProperties': []}, 'status_code': 200}
        create_event_mock.return_value = response
        data = {
            "eventName": "Test check",
            "eventType": "WORKSHOP",
            "startDateTime": "2023-01-12T14:44:08.372Z",
            "endDateTime": "2023-01-12T15:44:08.372Z",
            "eventOrganizer": "John doe",
            "eventDescription": "Description for the event",
            "eventUrl": "https://crowdbotics.com",
            "eventCancelled": False,
            "externalAccountId": "ieur545356645trt",
            "externalEventId": "qr34ieour52trewter"
        }
        Response = self.client.post(reverse('hubspot_service-create-event'), data=data, format='json')
        self.assertEqual(Response.status_code, status.HTTP_200_OK)
        create_event_mock.assert_called_once()

    @mock.patch('modules.django_hubspot.hubspot.services.HubspotService.HubspotService.create_event')
    def test_service_event_create_with_same_data(self, create_event_mock):
        """
        Test create event with valid same data again and check the response
        """
        response = {'data': {'status': 'error',
                             'message': 'Cannot set PropertyValueCoordinates{portalId=23699857, objectTypeId=ObjectTypeId{legacyObjectType=MARKETING_EVENT}, propertyName=hs_unique_id, value=1352433-23699857-ieur545356645trt-qr34ieour52trewter} on 194235157366. 194235510142 already has that value.',
                             'errorType': 'UNIQUE_VALUE_CONFLICT',
                             'errorTokens': {'objectTypeId': ['0-54'], 'propertyName': ['hs_unique_id'],
                                             'portalId': ['23699857'], 'existingObjectId': ['194235510142'],
                                             'conflictingValue': [
                                                 '1352433-23699857-ieur545356645trt-qr34ieour52trewter'],
                                             'objectId': ['194235157366']},
                             'correlationId': '28dedaec-2d25-40b4-8d7e-c57bd9303663'}, 'status_code': 400}
        create_event_mock.return_value = response
        data = {
            "eventName": "Test check",
            "eventType": "WORKSHOP",
            "startDateTime": "2023-01-12T14:44:08.372Z",
            "endDateTime": "2023-01-12T15:44:08.372Z",
            "eventOrganizer": "John doe",
            "eventDescription": "Description for the event",
            "eventUrl": "https://crowdbotics.com",
            "eventCancelled": False,
            "externalAccountId": "ieur545356645trt",
            "externalEventId": "qr34ieour52trewter"
        }
        Response = self.client.post(reverse('hubspot_service-create-event'), data=data, format='json')
        self.assertEqual(Response.status_code, status.HTTP_400_BAD_REQUEST)
        create_event_mock.assert_called_once()

    @mock.patch('modules.django_hubspot.hubspot.services.HubspotService.HubspotService.create_event')
    def test_service_event_create_with_missing_data(self, create_event_mock):
        """
        Test create event with invalid and missing data and check the response
        """
        response = {'data': {'status': 'error',
                             'message': 'Invalid input JSON on line 1, column 314. Some required fields were not set: [eventName]',
                             'correlationId': '29083dac-6784-43c0-bbd6-d166a0d6392f', 'category': 'VALIDATION_ERROR'},
                    'status_code': 400}
        create_event_mock.return_value = response
        data = {

            "startDateTime": "2023-01-12T14:44:08.372Z",
            "endDateTime": "2023-01-12T15:44:08.372Z",
            "eventOrganizer": "John doe",
            "eventDescription": "Description for the event",
            "eventUrl": "https://crowdbotics.com",
            "eventCancelled": False,
            "externalAccountId": "ieur545356645trt",
            "externalEventId": "qr34ieour52trewter"
        }
        Response = self.client.post(reverse('hubspot_service-create-event'), data=data, format='json')
        self.assertEqual(Response.status_code, status.HTTP_400_BAD_REQUEST)
        create_event_mock.assert_called_once()
