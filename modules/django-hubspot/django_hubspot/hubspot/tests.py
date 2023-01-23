from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from unittest import mock

"""
Test Cases 3rd party write with mocking the 3rd party 
So all Test cases write with mocking the Hubspot service with the valid response 
"""


class HubspotViewSetTests(APITestCase):
    """
    This test check we get access token successfully
    """

    @mock.patch('modules.django_hubspot.hubspot.services.HubspotService.HubspotService.auth_token')
    def test_service_access_token_create(self, auth_token_mock):
        response = {'data': {
            'token_type': 'bearer',
            'refresh_token': '8c6a2a1c-3ef4-4f1f-82ce-3d79e4ecbd1f',
            'access_token': 'CIGH6LTZMBIOAAGBQAAAGQIAAAA4AAEYkcOmCyC'
                            '-oqwXKPHFUjIUerglqvYIekJve41Hy_kMPjX6BsU6MAAAAEEAAAAAwAcAAAAAAAAEgAAAAAAAAAAMACCAAQAOA'
                            'OABAAAAAAAA_AcAABDwA0IU29FiR7r2GueLK9M6OcsV6CKH7i5KA25hMVIAWgA',
            'expires_in': 1800
        }}
        auth_token_mock.return_value = response
        data = {
            "code": "8c6a2a1c-3ef4-4f1f-82ce-3d79e4ecbd1f"
        }
        response = self.client.post(reverse('hubspot_service-get-token'), data=data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
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
        response = self.client.post(reverse('hubspot_service-get-token'), data=data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
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
        response = self.client.post(reverse('hubspot_service-get-token'), data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

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
        contactId = '51'
        response = self.client.get(reverse('hubspot_service-contact-deals-association-list', args=(contactId,)))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        contact_deals_association_list_mock.assert_called_once()

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
        contactId = '51'
        response = self.client.get(reverse('hubspot_service-contact-deals-association-list', args=(contactId,)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        contact_deals_association_list_mock.assert_called_once()

    @mock.patch('modules.django_hubspot.hubspot.services.HubspotService.HubspotService.create_deal_contact_association')
    def test_service_deal_associations_create(self, create_deal_contact_association_mock):
        """
        Test service deal associations create with valid data  and  check the response
        """
        response = True
        create_deal_contact_association_mock.return_value = response
        data = {
            "dealId": 1,
            "emails": ["string1@gmail.com", "string2@gmail.com", "string3@gmail.com"]
        }
        response = self.client.post(reverse('hubspot_service-create-deal-association'), data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['result'], 'success')
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
            "dealId": 1
        }
        response = self.client.post(reverse('hubspot_service-create-deal-association'), data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

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
            "amount": "1500.00",
            "closedate": "2019-12-07T16:50:06.678Z",
            "dealname": "Custom data integrations",
            "dealstage": "presentationscheduled",
            "hubspot_owner_id": "910901",
            "pipeline": "default",
            "associations": {
                "emails": ["string1@gmail.com", "string2@gmail.com", "string3@gmail.com"]
            }
        }
        response = self.client.post(reverse('hubspot_service-create-deal'), data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
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
        response = self.client.post(reverse('hubspot_service-create-deal'))
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

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
        response = self.client.get(reverse('hubspot_service-deals-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
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
        dealId = 11634132761
        response = self.client.delete(reverse('hubspot_service-remove-deal', args=(dealId,)))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        remove_deal_mock.assert_called_once()

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
        dealId = 11634132761
        response = self.client.delete(reverse('hubspot_service-remove-deal', args=(dealId,)))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        remove_deal_mock.assert_called_once()

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
        dealId = 11634132761
        response = self.client.get(reverse('hubspot_service-single-deal', args=(dealId,)))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        single_deal_mock.assert_called_once()

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
        dealId = 11634132761
        response = self.client.get(reverse('hubspot_service-single-deal', args=(dealId,)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        single_deal_mock.assert_called_once()

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
        meetingId = 29123684621
        response = self.client.get(reverse('hubspot_service-meeting-contacts-association-list', args=(meetingId,)))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        meeting_contact_association_list_mock.assert_called_once()

    @mock.patch(
        'modules.django_hubspot.hubspot.services.HubspotService.HubspotService.meeting_contact_association_list')
    def test_service_meeting_contact_list_with_wrong_meeting_id(self, meeting_contact_association_list_mock):
        """
        Test service meeting contact lis with invalid meetingId
        """
        response = {
            'data': {
                'message': 'Resource not found'
            },
            'status_code': 404
        }
        meeting_contact_association_list_mock.return_value = response
        meetingId = 29123684621
        response = self.client.get(reverse('hubspot_service-meeting-contacts-association-list', args=(meetingId,)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        meeting_contact_association_list_mock.assert_called_once()

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
        response = self.client.put(reverse('hubspot_service-create-ticket-association'), data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
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
        response = self.client.put(reverse('hubspot_service-create-ticket-association'), data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
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
        params = {
            "ticketId": "29574639194",
            "toObjectType": "deal"

        }
        response = self.client.get(reverse('hubspot_service-ticket-association-list'), params, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        ticket_association_list_mock.assert_called_once()

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
        params = {
            "ticketId": "2957463454549194",
            "toObjectType": "deal"
        }
        response = self.client.get(reverse('hubspot_service-ticket-association-list'), params, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        ticket_association_list_mock.assert_called_once()

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
        response = self.client.get(reverse('hubspot_service-ticket-association-list'), data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        ticket_association_list_mock.assert_called_once()

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
            "hs_pipeline": "0",
            "hs_pipeline_stage": "1",
            "hs_ticket_priority": "LOW",
            "hubspot_owner_id": "288254034",
            "subject": "troubleshoot report",
            "content": "I am creating new ticket"
        }
        response = self.client.post(reverse('hubspot_service-create-ticket'), data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        create_ticket_mock.assert_called_once()

    @mock.patch('modules.django_hubspot.hubspot.services.HubspotService.HubspotService.create_ticket')
    def test_ticket_create_with_wrong_data(self, create_ticket_mock):
        """
        Test ticket create and check the response with invalid data
        """
        response = {'data': {'status': 'error',
                             'message': 'Property values were not valid: [{"isValid":false,"message":"29947847357121 '
                                        'was not a valid integer (for owner ID).","error":"INVALID_INTEGER",'
                                        '"name":"hubspot_owner_id"}]',
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
        response = self.client.post(reverse('hubspot_service-create-ticket'), data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

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
        response = self.client.get(reverse('hubspot_service-ticket-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        ticket_list_mock.assert_called_once()

    @mock.patch('modules.django_hubspot.hubspot.services.HubspotService.HubspotService.remove_ticket')
    def test_tickets_remove(self, remove_ticket_mock):
        """
        Test tickets remove with valid ticketId and check the response
        """
        response = {'data': {'message': 'Item deleted successfully.'}, 'status_code': 204}
        remove_ticket_mock.return_value = response
        ticketId = 1355771473
        response = self.client.delete(reverse('hubspot_service-remove-ticket', args=(ticketId,)))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        remove_ticket_mock.assert_called_once()

    @mock.patch('modules.django_hubspot.hubspot.services.HubspotService.HubspotService.remove_ticket')
    def test_tickets_remove_with_wrong_ticketId(self, remove_ticket_mock):
        """
        Test tickets remove with invalid ticketId and check the response
        """
        response = {'data': {'message': 'Item deleted successfully.'}, 'status_code': 204}
        remove_ticket_mock.return_value = response
        ticketId = 1355771473
        response = self.client.delete(reverse('hubspot_service-remove-ticket', args=(ticketId,)))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        remove_ticket_mock.assert_called_once()

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
        ticketId = 1355771473
        response = self.client.get(reverse('hubspot_service-single-ticket', args=(ticketId,)))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        single_ticket_mock.assert_called_once()

    @mock.patch('modules.django_hubspot.hubspot.services.HubspotService.HubspotService.single_ticket')
    def test_tickets_single_retrieve_with_wrong_ticketId(self, single_ticket_mock):
        """
        Test tickets single get and check the response with invalid ticketId
        """
        response = {'data': {'message': 'Resource not found'}, 'status_code': 404}
        single_ticket_mock.return_value = response
        ticketId = 1355771473
        response = self.client.get(reverse('hubspot_service-single-ticket', args=(ticketId,)))
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        single_ticket_mock.assert_called_once()

    @mock.patch('modules.django_hubspot.hubspot.services.HubspotService.HubspotService.webhook')
    def test_service_webhook(self, webhook_mock):
        """
        Test service webhook and check the response
        """
        response = {}
        webhook_mock.return_value = response
        response = self.client.post(reverse('hubspot_service-webhook'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
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
        response = self.client.post(reverse('hubspot_service-create-event'), data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        create_event_mock.assert_called_once()

    @mock.patch('modules.django_hubspot.hubspot.services.HubspotService.HubspotService.create_event')
    def test_service_event_create_with_same_data(self, create_event_mock):
        """
        Test create event with valid same data again and check the response
        """
        response = {'data': {'status': 'error',
                             'message': 'Cannot set PropertyValueCoordinates{portalId=23699857, '
                                        'objectTypeId=ObjectTypeId{legacyObjectType=MARKETING_EVENT}, '
                                        'propertyName=hs_unique_id, '
                                        'value=1352433-23699857-ieur545356645trt-qr34ieour52trewter} on 194235157366. '
                                        '194235510142 already has that value.',
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
        response = self.client.post(reverse('hubspot_service-create-event'), data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        create_event_mock.assert_called_once()

    @mock.patch('modules.django_hubspot.hubspot.services.HubspotService.HubspotService.create_event')
    def test_service_event_create_with_missing_data(self, create_event_mock):
        """
        Test create event with invalid and missing data and check the response
        """
        response = {'data': {'status': 'error',
                             'message': 'Invalid input JSON on line 1, column 314. Some required fields were not set: '
                                        '[eventName]',
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
        response = self.client.post(reverse('hubspot_service-create-event'), data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

