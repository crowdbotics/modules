from rest_framework.test import APITestCase
from django.urls import reverse
from unittest import mock
from rest_framework import status


class MailchimpAudienceTestCase(APITestCase):

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.get_audience_lists')
    def test_get_audience_lists(self, get_audience_lists_mock):
        responses = {'text': {'lists': [{'id': '750250e6fb', 'web_id': 5120, 'name': 'name',
                                         'contact': {'company': 'company', 'address1': 'address1', 'address2': '',
                                                     'city': 'city', 'state': 'abc', 'zip': '32443', 'country': 'US',
                                                     'phone': ''}, 'permission_reminder': 'permission_reminder',
                                         'use_archive_bar': True, 'campaign_defaults': {'from_name': 'from_name',
                                                                                        'from_email': 'Maud_Lehner27@gmail.com',
                                                                                        'subject': 'subject',
                                                                                        'language': 'language'},
                                         'notify_on_subscribe': '', 'notify_on_unsubscribe': '',
                                         'date_created': '2023-01-12T11:57:26+00:00', 'list_rating': 0,
                                         'email_type_option': True, 'subscribe_url_short': 'http://eepurl.com/ih_4ij',
                                         'subscribe_url_long': 'https://crowdbotics.us21.list-manage.com/subscribe?u=1bce3f41b7ce6d507ec899ef2&id=750250e6fb',
                                         'beamer_address': 'us21-59aeb345e6-9c2a3267c5@inbound.mailchimp.com',
                                         'visibility': 'prv', 'double_optin': False, 'has_welcome': False,
                                         'marketing_permissions': False, 'modules': [],
                                         'stats': {'member_count': 0, 'unsubscribe_count': 0, 'cleaned_count': 0,
                                                   'member_count_since_send': 0, 'unsubscribe_count_since_send': 0,
                                                   'cleaned_count_since_send': 0, 'campaign_count': 0,
                                                   'campaign_last_sent': '', 'merge_field_count': 4, 'avg_sub_rate': 0,
                                                   'avg_unsub_rate': 0, 'target_sub_rate': 0, 'open_rate': 0,
                                                   'click_rate': 0, 'last_sub_date': '', 'last_unsub_date': ''},
                                         '_links': [{'rel': 'self',
                                                     'href': 'https://us21.api.mailchimp.com/3.0/lists/750250e6fb',
                                                     'method': 'GET',
                                                     'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Response.json'},
                                                    {'rel': 'parent',
                                                     'href': 'https://us21.api.mailchimp.com/3.0/lists',
                                                     'method': 'GET',
                                                     'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/CollectionResponse.json',
                                                     'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Collection.json'},
                                                    {'rel': 'update',
                                                     'href': 'https://us21.api.mailchimp.com/3.0/lists/750250e6fb',
                                                     'method': 'PATCH',
                                                     'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Response.json',
                                                     'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/PATCH.json'},
                                                    {'rel': 'batch-sub-unsub-members',
                                                     'href': 'https://us21.api.mailchimp.com/3.0/lists/750250e6fb',
                                                     'method': 'POST',
                                                     'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/BatchPOST-Response.json',
                                                     'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/BatchPOST.json'},
                                                    {'rel': 'delete',
                                                     'href': 'https://us21.api.mailchimp.com/3.0/lists/750250e6fb',
                                                     'method': 'DELETE'}, {'rel': 'abuse-reports',
                                                                           'href': 'https://us21.api.mailchimp.com/3.0/lists/750250e6fb/abuse-reports',
                                                                           'method': 'GET',
                                                                           'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Abuse/CollectionResponse.json',
                                                                           'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Abuse/Collection.json'},
                                                    {'rel': 'activity',
                                                     'href': 'https://us21.api.mailchimp.com/3.0/lists/750250e6fb/activity',
                                                     'method': 'GET',
                                                     'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Activity/Response.json'},
                                                    {'rel': 'clients',
                                                     'href': 'https://us21.api.mailchimp.com/3.0/lists/750250e6fb/clients',
                                                     'method': 'GET',
                                                     'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Clients/Response.json'},
                                                    {'rel': 'growth-history',
                                                     'href': 'https://us21.api.mailchimp.com/3.0/lists/750250e6fb/growth-history',
                                                     'method': 'GET',
                                                     'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Growth/CollectionResponse.json',
                                                     'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Growth/Collection.json'},
                                                    {'rel': 'interest-categories',
                                                     'href': 'https://us21.api.mailchimp.com/3.0/lists/750250e6fb/interest-categories',
                                                     'method': 'GET',
                                                     'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/InterestCategories/CollectionResponse.json',
                                                     'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/InterestCategories/Collection.json'},
                                                    {'rel': 'members',
                                                     'href': 'https://us21.api.mailchimp.com/3.0/lists/750250e6fb/members',
                                                     'method': 'GET',
                                                     'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/CollectionResponse.json',
                                                     'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Members/Collection.json'},
                                                    {'rel': 'merge-fields',
                                                     'href': 'https://us21.api.mailchimp.com/3.0/lists/750250e6fb/merge-fields',
                                                     'method': 'GET',
                                                     'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/MergeFields/CollectionResponse.json',
                                                     'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/MergeFields/Collection.json'},
                                                    {'rel': 'segments',
                                                     'href': 'https://us21.api.mailchimp.com/3.0/lists/750250e6fb/segments',
                                                     'method': 'GET',
                                                     'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Segments/CollectionResponse.json',
                                                     'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Segments/Collection.json'},
                                                    {'rel': 'webhooks',
                                                     'href': 'https://us21.api.mailchimp.com/3.0/lists/750250e6fb/webhooks',
                                                     'method': 'GET',
                                                     'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Webhooks/CollectionResponse.json',
                                                     'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Webhooks/Collection.json'},
                                                    {'rel': 'signup-forms',
                                                     'href': 'https://us21.api.mailchimp.com/3.0/lists/750250e6fb/signup-forms',
                                                     'method': 'GET',
                                                     'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/SignupForms/CollectionResponse.json',
                                                     'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/SignupForms/Collection.json'},
                                                    {'rel': 'locations',
                                                     'href': 'https://us21.api.mailchimp.com/3.0/lists/750250e6fb/locations',
                                                     'method': 'GET',
                                                     'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Locations/CollectionResponse.json',
                                                     'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Locations/Collection.json'}]}],
                              'total_items': 1,
                              'constraints': {'may_create': False, 'max_instances': 1, 'current_total_instances': 1},
                              '_links': [
                                  {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/lists', 'method': 'GET',
                                   'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/CollectionResponse.json',
                                   'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Collection.json'},
                                  {'rel': 'create', 'href': 'https://us21.api.mailchimp.com/3.0/lists',
                                   'method': 'POST',
                                   'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Response.json',
                                   'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/POST.json'}]},
                     'status_code': 200}
        get_audience_lists_mock.return_value = responses
        url = reverse('mailchimp_audience-get-audience-lists')
        response = self.client.get(url)
        self.assertEqual(responses['text']['lists'], response.data['lists'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        get_audience_lists_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.add_audience_list')
    def test_add_audience_list(self, add_audience_list_mock):
        responses = {'text': {'id': 'c4559ffd73', 'web_id': 5197, 'name': 'name',
                              'contact': {'company': 'company', 'address1': 'address1', 'address2': '', 'city': 'city',
                                          'state': 'state', 'zip': '63100', 'country': 'US', 'phone': '+12343433'},
                              'permission_reminder': 'permission_reminder', 'use_archive_bar': True,
                              'campaign_defaults': {'from_name': 'from_name', 'from_email': 'Maud_Lehner27@gmail.com',
                                                    'subject': 'subject', 'language': 'language'},
                              'notify_on_subscribe': '', 'notify_on_unsubscribe': '',
                              'date_created': '2023-01-13T08:13:21+00:00', 'list_rating': 0, 'email_type_option': True,
                              'subscribe_url_short': 'http://eepurl.com/iieOOX',
                              'subscribe_url_long': 'https://crowdbotics.us21.list-manage.com/subscribe?u=1bce3f41b7ce6d507ec899ef2&id=c4559ffd73',
                              'beamer_address': 'us21-59aeb345e6-c343efa60c@inbound.mailchimp.com', 'visibility': 'prv',
                              'double_optin': False, 'has_welcome': False, 'marketing_permissions': False,
                              'modules': [], 'stats': {'member_count': 0, 'unsubscribe_count': 0, 'cleaned_count': 0,
                                                       'member_count_since_send': 0, 'unsubscribe_count_since_send': 0,
                                                       'cleaned_count_since_send': 0, 'campaign_count': 0,
                                                       'campaign_last_sent': '', 'merge_field_count': 4,
                                                       'avg_sub_rate': 0, 'avg_unsub_rate': 0, 'target_sub_rate': 0,
                                                       'open_rate': 0, 'click_rate': 0, 'last_sub_date': '',
                                                       'last_unsub_date': ''}, '_links': [
                {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Response.json'},
                {'rel': 'parent', 'href': 'https://us21.api.mailchimp.com/3.0/lists', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Collection.json'},
                {'rel': 'update', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73', 'method': 'PATCH',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Response.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/PATCH.json'},
                {'rel': 'batch-sub-unsub-members', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73',
                 'method': 'POST',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/BatchPOST-Response.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/BatchPOST.json'},
                {'rel': 'delete', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73', 'method': 'DELETE'},
                {'rel': 'abuse-reports', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73/abuse-reports',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Abuse/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Abuse/Collection.json'},
                {'rel': 'activity', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73/activity',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Activity/Response.json'},
                {'rel': 'clients', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73/clients',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Clients/Response.json'},
                {'rel': 'growth-history', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73/growth-history',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Growth/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Growth/Collection.json'},
                {'rel': 'interest-categories',
                 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73/interest-categories', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/InterestCategories/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/InterestCategories/Collection.json'},
                {'rel': 'members', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73/members',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Members/Collection.json'},
                {'rel': 'merge-fields', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73/merge-fields',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/MergeFields/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/MergeFields/Collection.json'},
                {'rel': 'segments', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73/segments',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Segments/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Segments/Collection.json'},
                {'rel': 'webhooks', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73/webhooks',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Webhooks/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Webhooks/Collection.json'},
                {'rel': 'signup-forms', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73/signup-forms',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/SignupForms/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/SignupForms/Collection.json'},
                {'rel': 'locations', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73/locations',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Locations/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Locations/Collection.json'}]},
                     'status_code': 201}
        add_audience_list_mock.return_value = responses
        data = {"name": "name", "permission_reminder": "permission_reminder", "email_type_option": "true",
                "contact": {"company": "company", "zip": "63100", "phone": "+12343433", "state": "state",
                            "address1": "address1", "city": "city", "country": "country"},
                "campaign_defaults": {"from_name": "from_name", "from_email": "Maud_Lehner27@gmail.com",
                                      "subject": "subject", "language": "language"}}
        url = reverse('mailchimp_audience-add-audience-list')
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.data['contact'], responses['text']['contact'])
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        add_audience_list_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.add_audience_list')
    def test_add_audience_list_with_invalid_data(self, add_audience_list_mock):
        responses = {
            'text': '{"type":"https://mailchimp.com/developer/marketing/docs/errors/","title":"User action not permitted","status":403,"detail":"User does not have access to the requested operation","instance":"7d947152-d564-979c-c845-3802c95caf33"}',
            'status_code': 403}
        add_audience_list_mock.return_value = responses
        data = {"name": "name", "permission_reminder": "permission_reminder", "email_type_option": "true",
                "contact": {"company": "company", "zip": "63100", "phone": "+12343433", "state": "state",
                            "address1": "address1", "city": "city", "country": "country"},
                "campaign_defaults": {"from_name": "from_name", "from_email": "Maud_Lehner27@gmail.com",
                                      "subject": "subject", "language": "language"}}
        url = reverse('mailchimp_audience-add-audience-list')
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        add_audience_list_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.delete_audience_list')
    def test_delete_audience_list(self, delete_audience_list_mock):
        responses = {'status_code': 204}
        delete_audience_list_mock.return_value = responses
        url = reverse('mailchimp_audience-delete-audience-list', kwargs={"pk": '806e0c7ae3'})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        delete_audience_list_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.delete_audience_list')
    def test_delete_audience_list_with_invalid_id(self, delete_audience_list_mock):
        responses = {
            'text': '{"type":"https://mailchimp.com/developer/marketing/docs/errors/","title":"Resource Not Found","status":404,"detail":"The requested resource could not be found.","instance":"875f6a83-801f-4fc2-356c-b6e83af10a30"}',
            'status_code': 404}
        delete_audience_list_mock.return_value = responses
        url = reverse('mailchimp_audience-delete-audience-list', kwargs={"pk": '06e0c7ae3'})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        delete_audience_list_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.get_audience_list')
    def test_get_audience_list(self, get_audience_list_mock):
        responses = {'text': {'id': 'c4559ffd73', 'web_id': 5197, 'name': 'name',
                              'contact': {'company': 'company', 'address1': 'address1', 'address2': '', 'city': 'city',
                                          'state': 'state', 'zip': '63100', 'country': 'US', 'phone': '+12343433'},
                              'permission_reminder': 'permission_reminder', 'use_archive_bar': True,
                              'campaign_defaults': {'from_name': 'from_name', 'from_email': 'Maud_Lehner27@gmail.com',
                                                    'subject': 'subject', 'language': 'language'},
                              'notify_on_subscribe': '', 'notify_on_unsubscribe': '',
                              'date_created': '2023-01-13T08:13:21+00:00', 'list_rating': 0, 'email_type_option': True,
                              'subscribe_url_short': 'http://eepurl.com/iieOOX',
                              'subscribe_url_long': 'https://crowdbotics.us21.list-manage.com/subscribe?u=1bce3f41b7ce6d507ec899ef2&id=c4559ffd73',
                              'beamer_address': 'us21-59aeb345e6-c343efa60c@inbound.mailchimp.com', 'visibility': 'prv',
                              'double_optin': False, 'has_welcome': False, 'marketing_permissions': False,
                              'modules': [], 'stats': {'member_count': 0, 'unsubscribe_count': 0, 'cleaned_count': 0,
                                                       'member_count_since_send': 0, 'unsubscribe_count_since_send': 0,
                                                       'cleaned_count_since_send': 0, 'campaign_count': 0,
                                                       'campaign_last_sent': '', 'merge_field_count': 4,
                                                       'avg_sub_rate': 0, 'avg_unsub_rate': 0, 'target_sub_rate': 0,
                                                       'open_rate': 0, 'click_rate': 0, 'last_sub_date': '',
                                                       'last_unsub_date': ''}, '_links': [
                {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Response.json'},
                {'rel': 'parent', 'href': 'https://us21.api.mailchimp.com/3.0/lists', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Collection.json'},
                {'rel': 'update', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73', 'method': 'PATCH',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Response.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/PATCH.json'},
                {'rel': 'batch-sub-unsub-members', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73',
                 'method': 'POST',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/BatchPOST-Response.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/BatchPOST.json'},
                {'rel': 'delete', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73', 'method': 'DELETE'},
                {'rel': 'abuse-reports', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73/abuse-reports',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Abuse/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Abuse/Collection.json'},
                {'rel': 'activity', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73/activity',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Activity/Response.json'},
                {'rel': 'clients', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73/clients',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Clients/Response.json'},
                {'rel': 'growth-history', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73/growth-history',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Growth/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Growth/Collection.json'},
                {'rel': 'interest-categories',
                 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73/interest-categories', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/InterestCategories/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/InterestCategories/Collection.json'},
                {'rel': 'members', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73/members',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Members/Collection.json'},
                {'rel': 'merge-fields', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73/merge-fields',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/MergeFields/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/MergeFields/Collection.json'},
                {'rel': 'segments', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73/segments',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Segments/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Segments/Collection.json'},
                {'rel': 'webhooks', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73/webhooks',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Webhooks/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Webhooks/Collection.json'},
                {'rel': 'signup-forms', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73/signup-forms',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/SignupForms/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/SignupForms/Collection.json'},
                {'rel': 'locations', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73/locations',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Locations/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Locations/Collection.json'}]},
                     'status_code': 200}
        get_audience_list_mock.return_value = responses
        url = reverse('mailchimp_audience-get-audience-list', kwargs={"pk": "c4559ffd73"})
        response = self.client.get(url)
        self.assertEqual(response.data['contact'], responses['text']['contact'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        get_audience_list_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.get_audience_list')
    def test_get_audience_list_with_invalid_id(self, get_audience_list_mock):
        responses = {
            'text': '{"type":"https://mailchimp.com/developer/marketing/docs/errors/","title":"Resource Not Found","status":404,"detail":"The requested resource could not be found.","instance":"9922738f-7ed6-3e4a-0550-21167b5d7bdb"}',
            'status_code': 404}
        get_audience_list_mock.return_value = responses
        url = reverse('mailchimp_audience-get-audience-list', kwargs={"pk": "c4559ffd73"})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        get_audience_list_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.update_audience_list')
    def test_update_audience_list(self, update_audience_list_mock):
        responses = {'text': {'id': 'c4559ffd73', 'web_id': 5197, 'name': 'my_name',
                              'contact': {'company': 'company', 'address1': 'address1', 'address2': '', 'city': 'city',
                                          'state': 'state', 'zip': '63100', 'country': 'US', 'phone': '+12343433'},
                              'permission_reminder': 'permission_reminder', 'use_archive_bar': True,
                              'campaign_defaults': {'from_name': 'from_name', 'from_email': 'Maud_Lehner27@gmail.com',
                                                    'subject': 'subject', 'language': 'language'},
                              'notify_on_subscribe': '', 'notify_on_unsubscribe': '',
                              'date_created': '2023-01-13T08:13:21+00:00', 'list_rating': 0, 'email_type_option': True,
                              'subscribe_url_short': 'http://eepurl.com/iieOOX',
                              'subscribe_url_long': 'https://crowdbotics.us21.list-manage.com/subscribe?u=1bce3f41b7ce6d507ec899ef2&id=c4559ffd73',
                              'beamer_address': 'us21-59aeb345e6-c343efa60c@inbound.mailchimp.com', 'visibility': 'prv',
                              'double_optin': False, 'has_welcome': False, 'marketing_permissions': False,
                              'modules': [], 'stats': {'member_count': 0, 'unsubscribe_count': 0, 'cleaned_count': 0,
                                                       'member_count_since_send': 0, 'unsubscribe_count_since_send': 0,
                                                       'cleaned_count_since_send': 0, 'campaign_count': 0,
                                                       'campaign_last_sent': '', 'merge_field_count': 4,
                                                       'avg_sub_rate': 0, 'avg_unsub_rate': 0, 'target_sub_rate': 0,
                                                       'open_rate': 0, 'click_rate': 0, 'last_sub_date': '',
                                                       'last_unsub_date': ''}, '_links': [
                {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Response.json'},
                {'rel': 'parent', 'href': 'https://us21.api.mailchimp.com/3.0/lists', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Collection.json'},
                {'rel': 'update', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73', 'method': 'PATCH',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Response.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/PATCH.json'},
                {'rel': 'batch-sub-unsub-members', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73',
                 'method': 'POST',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/BatchPOST-Response.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/BatchPOST.json'},
                {'rel': 'delete', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73', 'method': 'DELETE'},
                {'rel': 'abuse-reports', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73/abuse-reports',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Abuse/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Abuse/Collection.json'},
                {'rel': 'activity', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73/activity',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Activity/Response.json'},
                {'rel': 'clients', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73/clients',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Clients/Response.json'},
                {'rel': 'growth-history', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73/growth-history',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Growth/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Growth/Collection.json'},
                {'rel': 'interest-categories',
                 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73/interest-categories', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/InterestCategories/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/InterestCategories/Collection.json'},
                {'rel': 'members', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73/members',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Members/Collection.json'},
                {'rel': 'merge-fields', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73/merge-fields',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/MergeFields/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/MergeFields/Collection.json'},
                {'rel': 'segments', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73/segments',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Segments/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Segments/Collection.json'},
                {'rel': 'webhooks', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73/webhooks',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Webhooks/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Webhooks/Collection.json'},
                {'rel': 'signup-forms', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73/signup-forms',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/SignupForms/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/SignupForms/Collection.json'},
                {'rel': 'locations', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73/locations',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Locations/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Locations/Collection.json'}]},
                     'status_code': 200}
        update_audience_list_mock.return_value = responses
        data = {"name": "name", "permission_reminder": "permission_reminder", "email_type_option": "true",
                "contact": {"company": "company", "zip": "63100", "phone": "+12343433", "state": "state",
                            "address1": "address1", "city": "city", "country": "country"},
                "campaign_defaults": {"from_name": "from_name", "from_email": "Maud_Lehner27@gmail.com",
                                      "subject": "subject", "language": "language"}}
        url = reverse('mailchimp_audience-update-audience-list', kwargs={"pk": "c4559ffd73"})
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.data['contact'], responses['text']['contact'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        update_audience_list_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.update_audience_list')
    def test_update_audience_list_with_invalid_id(self, update_audience_list_mock):
        responses = {
            'text': '{"type":"https://mailchimp.com/developer/marketing/docs/errors/","title":"Resource Not Found","status":404,"detail":"The requested resource could not be found.","instance":"c4980a64-2bb7-bb4d-eed0-78d92da7132c"}',
            'status_code': 404}
        update_audience_list_mock.return_value = responses
        data = {"name": "name", "permission_reminder": "permission_reminder", "email_type_option": "true",
                "contact": {"company": "company", "zip": "63100", "phone": "+12343433", "state": "state",
                            "address1": "address1", "city": "city", "country": "country"},
                "campaign_defaults": {"from_name": "from_name", "from_email": "Maud_Lehner27@gmail.com",
                                      "subject": "subject", "language": "language"}}
        url = reverse('mailchimp_audience-update-audience-list', kwargs={"pk": "c4559ffd73"})
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        update_audience_list_mock.assert_called_once()

    @mock.patch(
        'modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.batch_subscribe_or_unsubscribe_audience')
    def test_batch_subscribe_or_unsubscribe_audience(self, batch_subscribe_or_unsubscribe_audience_mock):
        response = {'text': {'members': [], 'list_id': 'c4559ffd73', 'total_items': 0, '_links': [
            {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73/members', 'method': 'GET',
             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/CollectionResponse.json',
             'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Members/Collection.json'},
            {'rel': 'parent', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73', 'method': 'GET',
             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Response.json'},
            {'rel': 'create', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73/members', 'method': 'POST',
             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Response.json',
             'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/POST.json'}]},
                    'status_code': 200}
        batch_subscribe_or_unsubscribe_audience_mock.return_value = response
        data = {
            "members": [
                {
                    "email_address": "string@string.com",
                    "status": "string",
                    "email_type": "string",
                    "merge_fields": {
                        "additionalProp1": "string",
                        "additionalProp2": "string",
                        "additionalProp3": "string"
                    },
                    "interests": {
                        "additionalProp1": "string",
                        "additionalProp2": "string",
                        "additionalProp3": "string"
                    },
                    "language": "string",
                    "vip": 'true',
                    "location": {
                        "latitude": 0,
                        "longitude": 0
                    },
                    "ip_signup": "string",
                    "timestamp_signup": "2023-01-13T16:02:48.937Z",
                    "ip_opt": "string",
                    "timestamp_opt": "2023-01-13T16:02:48.937Z"
                }
            ]
        }
        url = reverse('mailchimp_audience-batch-subscribe-or-unsubscribe-audience', kwargs={"pk": "c4559ffd73"})
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        batch_subscribe_or_unsubscribe_audience_mock.assert_called_once()

    @mock.patch(
        'modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.batch_subscribe_or_unsubscribe_audience')
    def test_invalid_batch_subscribe_or_unsubscribe_audience(self, batch_subscribe_or_unsubscribe_audience_mock):
        response = {"status_code": 400}
        batch_subscribe_or_unsubscribe_audience_mock.return_value = response
        data = {
            "members": [
                {
                    "email_address": "string",
                    "status": "string",
                    "email_type": "string",
                    "merge_fields": {
                        "additionalProp1": "string",
                        "additionalProp2": "string",
                        "additionalProp3": "string"
                    },
                    "interests": {
                        "additionalProp1": "string",
                        "additionalProp2": "string",
                        "additionalProp3": "string"
                    },
                    "language": "string",
                    "vip": 'true',
                    "location": {
                        "latitude": 0,
                        "longitude": 0
                    },
                    "ip_signup": "string",
                    "timestamp_signup": "2023-01-13T16:02:48.937Z",
                    "ip_opt": "string",
                    "timestamp_opt": "2023-01-13T16:02:48.937Z"
                }
            ]
        }
        url = reverse('mailchimp_audience-batch-subscribe-or-unsubscribe-audience', kwargs={"pk": "c4559ffd73"})
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.list_member_info')
    def test_list_member_info(self, list_member_info_mock):
        responses = {'text': {'members': [
            {'id': 'f55ac635ca0dd9066e9ab4c91e3d00b2', 'email_address': 'Addie71@hotmail.com',
             'unique_email_id': 'd95c38710b', 'contact_id': 'b3b16bd1ed79162467935b9236a502b2', 'full_name': '',
             'web_id': 5150798, 'email_type': 'html', 'status': 'unsubscribed',
             'unsubscribe_reason': 'N/A (Unsubscribed by admin)', 'consents_to_one_to_one_messaging': True,
             'merge_fields': {'FNAME': '', 'LNAME': '', 'ADDRESS': '', 'PHONE': ''},
             'stats': {'avg_open_rate': 0, 'avg_click_rate': 0}, 'ip_signup': '', 'timestamp_signup': '',
             'ip_opt': '39.53.158.108', 'timestamp_opt': '2023-01-13T13:58:01+00:00', 'member_rating': 2,
             'last_changed': '2023-01-13T13:58:01+00:00', 'language': '', 'vip': False, 'email_client': '',
             'location': {'latitude': 28.42, 'longitude': 70.3, 'gmtoff': 5, 'dstoff': 5, 'country_code': 'PK',
                          'timezone': 'Asia/Karachi', 'region': 'PB'},
             'marketing_permissions': [{'marketing_permission_id': 'b6258fdba9', 'text': 'Email', 'enabled': False}],
             'source': 'API - Generic', 'tags_count': 0, 'tags': [], 'list_id': 'c59fae1932', '_links': [{'rel': 'self',
                                                                                                          'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/f55ac635ca0dd9066e9ab4c91e3d00b2',
                                                                                                          'method': 'GET',
                                                                                                          'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Response.json'},
                                                                                                         {
                                                                                                             'rel': 'parent',
                                                                                                             'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members',
                                                                                                             'method': 'GET',
                                                                                                             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/CollectionResponse.json',
                                                                                                             'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Members/Collection.json'},
                                                                                                         {
                                                                                                             'rel': 'update',
                                                                                                             'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/f55ac635ca0dd9066e9ab4c91e3d00b2',
                                                                                                             'method': 'PATCH',
                                                                                                             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Response.json',
                                                                                                             'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/PATCH.json'},
                                                                                                         {
                                                                                                             'rel': 'upsert',
                                                                                                             'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/f55ac635ca0dd9066e9ab4c91e3d00b2',
                                                                                                             'method': 'PUT',
                                                                                                             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Response.json',
                                                                                                             'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/PUT.json'},
                                                                                                         {
                                                                                                             'rel': 'delete',
                                                                                                             'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/f55ac635ca0dd9066e9ab4c91e3d00b2',
                                                                                                             'method': 'DELETE'},
                                                                                                         {
                                                                                                             'rel': 'activity',
                                                                                                             'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/f55ac635ca0dd9066e9ab4c91e3d00b2/activity',
                                                                                                             'method': 'GET',
                                                                                                             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Activity/Response.json'},
                                                                                                         {
                                                                                                             'rel': 'goals',
                                                                                                             'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/f55ac635ca0dd9066e9ab4c91e3d00b2/goals',
                                                                                                             'method': 'GET',
                                                                                                             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Goals/Response.json'},
                                                                                                         {
                                                                                                             'rel': 'notes',
                                                                                                             'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/f55ac635ca0dd9066e9ab4c91e3d00b2/notes',
                                                                                                             'method': 'GET',
                                                                                                             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Notes/CollectionResponse.json'},
                                                                                                         {
                                                                                                             'rel': 'events',
                                                                                                             'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/f55ac635ca0dd9066e9ab4c91e3d00b2/events',
                                                                                                             'method': 'POST',
                                                                                                             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Events/POST.json'},
                                                                                                         {
                                                                                                             'rel': 'delete_permanent',
                                                                                                             'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/f55ac635ca0dd9066e9ab4c91e3d00b2/actions/delete-permanent',
                                                                                                             'method': 'POST'}]},
            {'id': '22fd7da2126eb3d8278afa09438a45bf', 'email_address': 'Addsie71@hotmail.com',
             'unique_email_id': 'a2ff82a0be', 'contact_id': 'f54b52044f18c00817731f3672d6d865', 'full_name': '',
             'web_id': 5150893, 'email_type': 'html', 'status': 'unsubscribed',
             'unsubscribe_reason': 'N/A (Unsubscribed by admin)', 'consents_to_one_to_one_messaging': True,
             'merge_fields': {'FNAME': '', 'LNAME': '', 'ADDRESS': '', 'PHONE': ''},
             'stats': {'avg_open_rate': 0, 'avg_click_rate': 0}, 'ip_signup': '', 'timestamp_signup': '',
             'ip_opt': '39.53.158.108', 'timestamp_opt': '2023-01-13T14:01:56+00:00', 'member_rating': 2,
             'last_changed': '2023-01-13T14:01:56+00:00', 'language': '', 'vip': False, 'email_client': '',
             'location': {'latitude': 0, 'longitude': 0, 'gmtoff': 0, 'dstoff': 0, 'country_code': '', 'timezone': '',
                          'region': ''},
             'marketing_permissions': [{'marketing_permission_id': 'b6258fdba9', 'text': 'Email', 'enabled': False}],
             'source': 'API - Generic', 'tags_count': 0, 'tags': [], 'list_id': 'c59fae1932', '_links': [{'rel': 'self',
                                                                                                          'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/22fd7da2126eb3d8278afa09438a45bf',
                                                                                                          'method': 'GET',
                                                                                                          'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Response.json'},
                                                                                                         {
                                                                                                             'rel': 'parent',
                                                                                                             'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members',
                                                                                                             'method': 'GET',
                                                                                                             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/CollectionResponse.json',
                                                                                                             'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Members/Collection.json'},
                                                                                                         {
                                                                                                             'rel': 'update',
                                                                                                             'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/22fd7da2126eb3d8278afa09438a45bf',
                                                                                                             'method': 'PATCH',
                                                                                                             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Response.json',
                                                                                                             'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/PATCH.json'},
                                                                                                         {
                                                                                                             'rel': 'upsert',
                                                                                                             'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/22fd7da2126eb3d8278afa09438a45bf',
                                                                                                             'method': 'PUT',
                                                                                                             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Response.json',
                                                                                                             'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/PUT.json'},
                                                                                                         {
                                                                                                             'rel': 'delete',
                                                                                                             'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/22fd7da2126eb3d8278afa09438a45bf',
                                                                                                             'method': 'DELETE'},
                                                                                                         {
                                                                                                             'rel': 'activity',
                                                                                                             'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/22fd7da2126eb3d8278afa09438a45bf/activity',
                                                                                                             'method': 'GET',
                                                                                                             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Activity/Response.json'},
                                                                                                         {
                                                                                                             'rel': 'goals',
                                                                                                             'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/22fd7da2126eb3d8278afa09438a45bf/goals',
                                                                                                             'method': 'GET',
                                                                                                             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Goals/Response.json'},
                                                                                                         {
                                                                                                             'rel': 'notes',
                                                                                                             'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/22fd7da2126eb3d8278afa09438a45bf/notes',
                                                                                                             'method': 'GET',
                                                                                                             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Notes/CollectionResponse.json'},
                                                                                                         {
                                                                                                             'rel': 'events',
                                                                                                             'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/22fd7da2126eb3d8278afa09438a45bf/events',
                                                                                                             'method': 'POST',
                                                                                                             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Events/POST.json'},
                                                                                                         {
                                                                                                             'rel': 'delete_permanent',
                                                                                                             'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/22fd7da2126eb3d8278afa09438a45bf/actions/delete-permanent',
                                                                                                             'method': 'POST'}]},
            {'id': '6f908289d0e807cca4c4f5ab99566fce', 'email_address': 'Add71@hotmail.com',
             'unique_email_id': 'f33e96c527', 'contact_id': '69885c026dc45370fa08cfb18c4986c8', 'full_name': '',
             'web_id': 5150958, 'email_type': 'html', 'status': 'subscribed', 'consents_to_one_to_one_messaging': True,
             'merge_fields': {'FNAME': '', 'LNAME': '', 'ADDRESS': '', 'PHONE': ''},
             'stats': {'avg_open_rate': 0, 'avg_click_rate': 0}, 'ip_signup': '', 'timestamp_signup': '',
             'ip_opt': '39.53.158.108', 'timestamp_opt': '2023-01-13T14:41:46+00:00', 'member_rating': 2,
             'last_changed': '2023-01-13T14:41:46+00:00', 'language': '', 'vip': False, 'email_client': '',
             'location': {'latitude': 0, 'longitude': 0, 'gmtoff': 0, 'dstoff': 0, 'country_code': '', 'timezone': '',
                          'region': ''},
             'marketing_permissions': [{'marketing_permission_id': 'b6258fdba9', 'text': 'Email', 'enabled': False}],
             'source': 'API - Generic', 'tags_count': 1, 'tags': [{'id': 234383, 'name': 'string'}],
             'list_id': 'c59fae1932', '_links': [{'rel': 'self',
                                                  'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/6f908289d0e807cca4c4f5ab99566fce',
                                                  'method': 'GET',
                                                  'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Response.json'},
                                                 {'rel': 'parent',
                                                  'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members',
                                                  'method': 'GET',
                                                  'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/CollectionResponse.json',
                                                  'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Members/Collection.json'},
                                                 {'rel': 'update',
                                                  'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/6f908289d0e807cca4c4f5ab99566fce',
                                                  'method': 'PATCH',
                                                  'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Response.json',
                                                  'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/PATCH.json'},
                                                 {'rel': 'upsert',
                                                  'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/6f908289d0e807cca4c4f5ab99566fce',
                                                  'method': 'PUT',
                                                  'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Response.json',
                                                  'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/PUT.json'},
                                                 {'rel': 'delete',
                                                  'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/6f908289d0e807cca4c4f5ab99566fce',
                                                  'method': 'DELETE'}, {'rel': 'activity',
                                                                        'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/6f908289d0e807cca4c4f5ab99566fce/activity',
                                                                        'method': 'GET',
                                                                        'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Activity/Response.json'},
                                                 {'rel': 'goals',
                                                  'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/6f908289d0e807cca4c4f5ab99566fce/goals',
                                                  'method': 'GET',
                                                  'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Goals/Response.json'},
                                                 {'rel': 'notes',
                                                  'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/6f908289d0e807cca4c4f5ab99566fce/notes',
                                                  'method': 'GET',
                                                  'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Notes/CollectionResponse.json'},
                                                 {'rel': 'events',
                                                  'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/6f908289d0e807cca4c4f5ab99566fce/events',
                                                  'method': 'POST',
                                                  'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Events/POST.json'},
                                                 {'rel': 'delete_permanent',
                                                  'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/6f908289d0e807cca4c4f5ab99566fce/actions/delete-permanent',
                                                  'method': 'POST'}]}], 'list_id': 'c59fae1932', 'total_items': 3,
            '_links': [
                {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Members/Collection.json'},
                {'rel': 'parent', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Response.json'},
                {'rel': 'create',
                 'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members',
                 'method': 'POST',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Response.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/POST.json'}]},
            'status_code': 200}
        list_member_info_mock.return_value = responses
        url = reverse('mailchimp_audience-list-member-info', kwargs={"pk": "c4559ffd73"})
        response = self.client.get(url, format='json')
        self.assertEqual(response.data['members'][0]['email_address'], responses['text']['members'][0]['email_address'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        list_member_info_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.list_member_info')
    def test_list_member_info_with_invalid_id(self, list_member_info_mock):
        responses = {
            'text': '{"type":"https://mailchimp.com/developer/marketing/docs/errors/","title":"Resource Not Found","status":404,"detail":"The requested resource could not be found.","instance":"ac20f350-129f-f61c-4760-ec1e08a2cc1f"}',
            'status_code': 404}
        list_member_info_mock.return_value = responses
        url = reverse('mailchimp_audience-list-member-info', kwargs={"pk": "4559ffd73"})
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        list_member_info_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.add_list_member')
    def test_add_list_member(self, add_list_member_mock):
        responses = {'text': {'id': '7dd4636f8b1e04c60488e1bae443a6b6', 'email_address': 'Addsie711@hotmail.com',
                              'unique_email_id': 'bd8312eac8', 'contact_id': 'dcb2d353aec25bfcef54deaec4a7db9d',
                              'full_name': '', 'web_id': 5151589, 'email_type': 'html', 'status': 'unsubscribed',
                              'unsubscribe_reason': 'N/A (Unsubscribed by admin)',
                              'consents_to_one_to_one_messaging': True,
                              'merge_fields': {'FNAME': '', 'LNAME': '', 'ADDRESS': '', 'PHONE': ''},
                              'stats': {'avg_open_rate': 0, 'avg_click_rate': 0}, 'ip_signup': '',
                              'timestamp_signup': '', 'ip_opt': '39.53.158.108',
                              'timestamp_opt': '2023-01-13T17:21:45+00:00', 'member_rating': 2,
                              'last_changed': '2023-01-13T17:21:45+00:00', 'language': '', 'vip': False,
                              'email_client': '',
                              'location': {'latitude': 0, 'longitude': 0, 'gmtoff': 0, 'dstoff': 0, 'country_code': '',
                                           'timezone': '', 'region': ''}, 'marketing_permissions': [
                {'marketing_permission_id': 'b6258fdba9', 'text': 'Email', 'enabled': False}],
                              'source': 'API - Generic', 'tags_count': 0, 'tags': [], 'list_id': 'c59fae1932',
                              '_links': [{'rel': 'self',
                                          'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/7dd4636f8b1e04c60488e1bae443a6b6',
                                          'method': 'GET',
                                          'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Response.json'},
                                         {'rel': 'parent',
                                          'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members',
                                          'method': 'GET',
                                          'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/CollectionResponse.json',
                                          'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Members/Collection.json'},
                                         {'rel': 'update',
                                          'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/7dd4636f8b1e04c60488e1bae443a6b6',
                                          'method': 'PATCH',
                                          'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Response.json',
                                          'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/PATCH.json'},
                                         {'rel': 'upsert',
                                          'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/7dd4636f8b1e04c60488e1bae443a6b6',
                                          'method': 'PUT',
                                          'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Response.json',
                                          'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/PUT.json'},
                                         {'rel': 'delete',
                                          'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/7dd4636f8b1e04c60488e1bae443a6b6',
                                          'method': 'DELETE'}, {'rel': 'activity',
                                                                'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/7dd4636f8b1e04c60488e1bae443a6b6/activity',
                                                                'method': 'GET',
                                                                'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Activity/Response.json'},
                                         {'rel': 'goals',
                                          'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/7dd4636f8b1e04c60488e1bae443a6b6/goals',
                                          'method': 'GET',
                                          'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Goals/Response.json'},
                                         {'rel': 'notes',
                                          'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/7dd4636f8b1e04c60488e1bae443a6b6/notes',
                                          'method': 'GET',
                                          'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Notes/CollectionResponse.json'},
                                         {'rel': 'events',
                                          'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/7dd4636f8b1e04c60488e1bae443a6b6/events',
                                          'method': 'POST',
                                          'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Events/POST.json'},
                                         {'rel': 'delete_permanent',
                                          'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/7dd4636f8b1e04c60488e1bae443a6b6/actions/delete-permanent',
                                          'method': 'POST'}]}, 'status_code': 201}
        add_list_member_mock.return_value = responses
        url = reverse('mailchimp_audience-add-list-member', kwargs={"pk": "c4559ffd73"})
        data = {
            "email_address": "string@string.com",
            "status": "string",
            "email_type": "string",
            "merge_fields": {
                "additionalProp1": "string",
                "additionalProp2": "string",
                "additionalProp3": "string"
            },
            "interests": {
                "additionalProp1": "string",
                "additionalProp2": "string",
                "additionalProp3": "string"
            },
            "language": "string",
            "vip": 'true',
            "location": {
                "latitude": 0,
                "longitude": 0
            },
            "marketing_permissions": [
                {
                    "marketing_permission_id": "string",
                    "enabled": 'true'
                }
            ],
            "ip_signup": "string",
            "timestamp_signup": "2023-01-13T16:04:52.728Z",
            "ip_opt": "string",
            "timestamp_opt": "2023-01-13T16:04:52.728Z",
            "tags": [
                "string"
            ]
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.data['email_address'], responses['text']['email_address'])
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        add_list_member_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.add_list_member')
    def test_add_list_member_with_invalid_data(self, add_list_member_mock):
        responses = {'status_code': 400}
        add_list_member_mock.return_value = responses
        url = reverse('mailchimp_audience-add-list-member', kwargs={"pk": "c4559ffd73"})
        data = {
            "email_address": "stringstring.com",
            "status": "string",
            "email_type": "string",
            "merge_fields": {
                "additionalProp1": "string",
                "additionalProp2": "string",
                "additionalProp3": "string"
            },
            "interests": {
                "additionalProp1": "string",
                "additionalProp2": "string",
                "additionalProp3": "string"
            },
            "language": "string",
            "vip": 'true',
            "location": {
                "latitude": 0,
                "longitude": 0
            },
            "marketing_permissions": [
                {
                    "marketing_permission_id": "string",
                    "enabled": 'true'
                }
            ],
            "ip_signup": "string",
            "timestamp_signup": "2023-01-13T16:04:52.728Z",
            "ip_opt": "string",
            "timestamp_opt": "2023-01-13T16:04:52.728Z",
            "tags": [
                "string"
            ]
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, responses['status_code'])
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.add_list_member')
    def test_add_list_member_with_invalid_id(self, add_list_member_mock):
        responses = {
            'text': '{"type":"https://mailchimp.com/developer/marketing/docs/errors/","title":"Resource Not Found","status":404,"detail":"The requested resource could not be found.","instance":"2f3645b7-79e1-a38e-e093-cd3796befa10"}',
            'status_code': 404}
        add_list_member_mock.return_value = responses
        url = reverse('mailchimp_audience-add-list-member', kwargs={"pk": "4559ffd73"})
        data = {
            "email_address": "string@string.com",
            "status": "string",
            "email_type": "string",
            "merge_fields": {
                "additionalProp1": "string",
                "additionalProp2": "string",
                "additionalProp3": "string"
            },
            "interests": {
                "additionalProp1": "string",
                "additionalProp2": "string",
                "additionalProp3": "string"
            },
            "language": "string",
            "vip": 'true',
            "location": {
                "latitude": 0,
                "longitude": 0
            },
            "marketing_permissions": [
                {
                    "marketing_permission_id": "string",
                    "enabled": 'true'
                }
            ],
            "ip_signup": "string",
            "timestamp_signup": "2023-01-13T16:04:52.728Z",
            "ip_opt": "string",
            "timestamp_opt": "2023-01-13T16:04:52.728Z",
            "tags": [
                "string"
            ]
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        add_list_member_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.get_member_info')
    def test_get_member_info(self, get_member_info_mock):
        responses = {'text': {'id': '22fd7da2126eb3d8278afa09438a45bf', 'email_address': 'Addsie71@hotmail.com',
                              'unique_email_id': 'a2ff82a0be', 'contact_id': 'f54b52044f18c00817731f3672d6d865',
                              'full_name': '', 'web_id': 5150893, 'email_type': 'html', 'status': 'unsubscribed',
                              'unsubscribe_reason': 'N/A (Unsubscribed by admin)',
                              'consents_to_one_to_one_messaging': True,
                              'merge_fields': {'FNAME': '', 'LNAME': '', 'ADDRESS': '', 'PHONE': ''},
                              'stats': {'avg_open_rate': 0, 'avg_click_rate': 0}, 'ip_signup': '',
                              'timestamp_signup': '', 'ip_opt': '39.53.158.108',
                              'timestamp_opt': '2023-01-13T14:01:56+00:00', 'member_rating': 2,
                              'last_changed': '2023-01-13T14:01:56+00:00', 'language': '', 'vip': False,
                              'email_client': '',
                              'location': {'latitude': 0, 'longitude': 0, 'gmtoff': 0, 'dstoff': 0, 'country_code': '',
                                           'timezone': '', 'region': ''}, 'marketing_permissions': [
                {'marketing_permission_id': 'b6258fdba9', 'text': 'Email', 'enabled': False}],
                              'source': 'API - Generic', 'tags_count': 0, 'tags': [], 'list_id': 'c59fae1932',
                              '_links': [{'rel': 'self',
                                          'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/22fd7da2126eb3d8278afa09438a45bf',
                                          'method': 'GET',
                                          'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Response.json'},
                                         {'rel': 'parent',
                                          'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members',
                                          'method': 'GET',
                                          'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/CollectionResponse.json',
                                          'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Members/Collection.json'},
                                         {'rel': 'update',
                                          'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/22fd7da2126eb3d8278afa09438a45bf',
                                          'method': 'PATCH',
                                          'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Response.json',
                                          'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/PATCH.json'},
                                         {'rel': 'upsert',
                                          'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/22fd7da2126eb3d8278afa09438a45bf',
                                          'method': 'PUT',
                                          'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Response.json',
                                          'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/PUT.json'},
                                         {'rel': 'delete',
                                          'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/22fd7da2126eb3d8278afa09438a45bf',
                                          'method': 'DELETE'}, {'rel': 'activity',
                                                                'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/22fd7da2126eb3d8278afa09438a45bf/activity',
                                                                'method': 'GET',
                                                                'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Activity/Response.json'},
                                         {'rel': 'goals',
                                          'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/22fd7da2126eb3d8278afa09438a45bf/goals',
                                          'method': 'GET',
                                          'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Goals/Response.json'},
                                         {'rel': 'notes',
                                          'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/22fd7da2126eb3d8278afa09438a45bf/notes',
                                          'method': 'GET',
                                          'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Notes/CollectionResponse.json'},
                                         {'rel': 'events',
                                          'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/22fd7da2126eb3d8278afa09438a45bf/events',
                                          'method': 'POST',
                                          'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Events/POST.json'},
                                         {'rel': 'delete_permanent',
                                          'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/22fd7da2126eb3d8278afa09438a45bf/actions/delete-permanent',
                                          'method': 'POST'}]}, 'status_code': 200}
        get_member_info_mock.return_value = responses

        url = reverse('mailchimp_audience-get-member-info', kwargs={"pk": "c4559ffd73", "subscriber_hash": "string"})
        response = self.client.get(url)
        self.assertEqual(response.data['email_address'], responses['text']['email_address'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        get_member_info_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.get_member_info')
    def test_get_member_info_with_invalid_id(self, get_member_info_mock):
        responses = {
            'text': '{"type":"https://mailchimp.com/developer/marketing/docs/errors/","title":"Resource Not Found","status":404,"detail":"The requested resource could not be found.","instance":"1c69cdbc-97b0-2dbc-c30c-8fd8046bdea7"}',
            'status_code': 404}
        get_member_info_mock.return_value = responses

        url = reverse('mailchimp_audience-get-member-info', kwargs={"pk": "4559ffd73", "subscriber_hash": "string"})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        get_member_info_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.update_list_member')
    def test_update_list_member(self, update_list_member_mock):
        responses = {'text': {'id': '7dd4636f8b1e04c60488e1bae443a6b6', 'email_address': 'Addsie711@hotmail.com',
                              'unique_email_id': 'bd8312eac8', 'contact_id': 'dcb2d353aec25bfcef54deaec4a7db9d',
                              'full_name': '', 'web_id': 5151589, 'email_type': 'html', 'status': 'unsubscribed',
                              'unsubscribe_reason': 'N/A (Unsubscribed by admin)',
                              'consents_to_one_to_one_messaging': True,
                              'merge_fields': {'FNAME': '', 'LNAME': '', 'ADDRESS': '', 'PHONE': ''},
                              'stats': {'avg_open_rate': 0, 'avg_click_rate': 0}, 'ip_signup': '',
                              'timestamp_signup': '', 'ip_opt': '39.53.158.108',
                              'timestamp_opt': '2023-01-13T17:21:45+00:00', 'member_rating': 2,
                              'last_changed': '2023-01-13T17:21:45+00:00', 'language': '', 'vip': False,
                              'email_client': '',
                              'location': {'latitude': 0, 'longitude': 0, 'gmtoff': 0, 'dstoff': 0, 'country_code': '',
                                           'timezone': '', 'region': ''}, 'marketing_permissions': [
                {'marketing_permission_id': 'b6258fdba9', 'text': 'Email', 'enabled': False}],
                              'source': 'API - Generic', 'tags_count': 0, 'tags': [], 'list_id': 'c59fae1932',
                              '_links': [{'rel': 'self',
                                          'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/7dd4636f8b1e04c60488e1bae443a6b6',
                                          'method': 'GET',
                                          'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Response.json'},
                                         {'rel': 'parent',
                                          'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members',
                                          'method': 'GET',
                                          'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/CollectionResponse.json',
                                          'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Members/Collection.json'},
                                         {'rel': 'update',
                                          'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/7dd4636f8b1e04c60488e1bae443a6b6',
                                          'method': 'PATCH',
                                          'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Response.json',
                                          'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/PATCH.json'},
                                         {'rel': 'upsert',
                                          'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/7dd4636f8b1e04c60488e1bae443a6b6',
                                          'method': 'PUT',
                                          'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Response.json',
                                          'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/PUT.json'},
                                         {'rel': 'delete',
                                          'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/7dd4636f8b1e04c60488e1bae443a6b6',
                                          'method': 'DELETE'}, {'rel': 'activity',
                                                                'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/7dd4636f8b1e04c60488e1bae443a6b6/activity',
                                                                'method': 'GET',
                                                                'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Activity/Response.json'},
                                         {'rel': 'goals',
                                          'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/7dd4636f8b1e04c60488e1bae443a6b6/goals',
                                          'method': 'GET',
                                          'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Goals/Response.json'},
                                         {'rel': 'notes',
                                          'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/7dd4636f8b1e04c60488e1bae443a6b6/notes',
                                          'method': 'GET',
                                          'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Notes/CollectionResponse.json'},
                                         {'rel': 'events',
                                          'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/7dd4636f8b1e04c60488e1bae443a6b6/events',
                                          'method': 'POST',
                                          'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Events/POST.json'},
                                         {'rel': 'delete_permanent',
                                          'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/members/7dd4636f8b1e04c60488e1bae443a6b6/actions/delete-permanent',
                                          'method': 'POST'}]}, 'status_code': 200}
        update_list_member_mock.return_value = responses
        url = reverse('mailchimp_audience-update-list-member', kwargs={"pk": "c4559ffd73", "subscriber_hash": "string"})
        data = {
            "email_address": "string@string.com",
            "status": "string",
            "email_type": "string",
            "merge_fields": {
                "additionalProp1": "string",
                "additionalProp2": "string",
                "additionalProp3": "string"
            },
            "interests": {
                "additionalProp1": "string",
                "additionalProp2": "string",
                "additionalProp3": "string"
            },
            "language": "string",
            "vip": 'true',
            "location": {
                "latitude": 0,
                "longitude": 0
            },
            "marketing_permissions": [
                {
                    "marketing_permission_id": "string",
                    "enabled": 'true'
                }
            ],
            "ip_signup": "string",
            "timestamp_signup": "2023-01-13T16:04:52.728Z",
            "ip_opt": "string",
            "timestamp_opt": "2023-01-13T16:04:52.728Z",
            "tags": [
                "string"
            ]
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.data['email_address'], responses['text']['email_address'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        update_list_member_mock.assert_called_once()

    def test_update_list_member_with_invalid_data(self):
        url = reverse('mailchimp_audience-update-list-member', kwargs={"pk": "c4559ffd73", "subscriber_hash": "string"})
        data = {
            "email_address": "stringstring.com",
            "status": "string",
            "email_type": "string",
            "merge_fields": {
                "additionalProp1": "string",
                "additionalProp2": "string",
                "additionalProp3": "string"
            },
            "interests": {
                "additionalProp1": "string",
                "additionalProp2": "string",
                "additionalProp3": "string"
            },
            "language": "string",
            "vip": 'true',
            "location": {
                "latitude": 0,
                "longitude": 0
            },
            "marketing_permissions": [
                {
                    "marketing_permission_id": "string",
                    "enabled": 'true'
                }
            ],
            "ip_signup": "string",
            "timestamp_signup": "2023-01-13T16:04:52.728Z",
            "ip_opt": "string",
            "timestamp_opt": "2023-01-13T16:04:52.728Z",
            "tags": [
                "string"
            ]
        }

        email_error_message = 'Enter a valid email address.'
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['email_address'][0], email_error_message)

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.update_list_member')
    def test_update_list_member_with_invalid_id(self, update_list_member_mock):
        responses = {
            'text': '{"type":"https://mailchimp.com/developer/marketing/docs/errors/","title":"Resource Not Found","status":404,"detail":"The requested resource could not be found.","instance":"2f3645b7-79e1-a38e-e093-cd3796befa10"}',
            'status_code': 404}
        update_list_member_mock.return_value = responses
        url = reverse('mailchimp_audience-update-list-member', kwargs={"pk": "c4559ffd73", "subscriber_hash": "string"})
        data = {
            "email_address": "string@string.com",
            "status": "string",
            "email_type": "string",
            "merge_fields": {
                "additionalProp1": "string",
                "additionalProp2": "string",
                "additionalProp3": "string"
            },
            "interests": {
                "additionalProp1": "string",
                "additionalProp2": "string",
                "additionalProp3": "string"
            },
            "language": "string",
            "vip": 'true',
            "location": {
                "latitude": 0,
                "longitude": 0
            },
            "marketing_permissions": [
                {
                    "marketing_permission_id": "string",
                    "enabled": 'true'
                }
            ],
            "ip_signup": "string",
            "timestamp_signup": "2023-01-13T16:04:52.728Z",
            "ip_opt": "string",
            "timestamp_opt": "2023-01-13T16:04:52.728Z",
            "tags": [
                "string"
            ]
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        update_list_member_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.delete_list_member')
    def test_delete_list_member(self, delete_list_member_mock):
        responses = {"status_code": 204}
        delete_list_member_mock.return_value = responses
        url = reverse('mailchimp_audience-delete-list-member', kwargs={"pk": "c4559ffd73", "subscriber_hash": "string"})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        delete_list_member_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.delete_list_member')
    def test_delete_list_member_with_invalid_id(self, delete_list_member_mock):
        responses = {
            'text': '{"type":"https://mailchimp.com/developer/marketing/docs/errors/","title":"Resource Not Found","status":404,"detail":"The requested resource could not be found.","instance":"2f3645b7-79e1-a38e-e093-cd3796befa10"}',
            'status_code': 404}
        delete_list_member_mock.return_value = responses
        url = reverse('mailchimp_audience-delete-list-member', kwargs={"pk": "4559ffd73", "subscriber_hash": "string"})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        delete_list_member_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.get_list_member_tags')
    def test_get_list_member_tags(self, get_list_member_tags_mock):
        responses = {"status_code": 200}
        get_list_member_tags_mock.return_value = responses
        url = reverse('mailchimp_audience-get-list-member-tags',
                      kwargs={"pk": "c4559ffd73", "subscriber_hash": "string"})
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        get_list_member_tags_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.get_list_member_tags')
    def test_get_list_member_tags_with_invalid_id(self, get_list_member_tags_mock):
        responses = {
            'text': '{"type":"https://mailchimp.com/developer/marketing/docs/errors/","title":"Resource Not Found","status":404,"detail":"The requested resource could not be found.","instance":"5a39c64e-a3f9-6ec3-cd86-0d36d3930719"}',
            'status_code': 404}
        get_list_member_tags_mock.return_value = responses
        url = reverse('mailchimp_audience-get-list-member-tags',
                      kwargs={"pk": "c4559ffd73", "subscriber_hash": "string"})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        get_list_member_tags_mock.assert_called_once()

    @mock.patch(
        'modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.add_or_remove_member_tag')
    def test_add_or_remove_member_tag(self, add_or_remove_member_tag_mock):
        responses = {'text': {'members': [], 'list_id': 'c4559ffd73', 'total_items': 0, '_links': [
            {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73/members', 'method': 'GET',
             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/CollectionResponse.json',
             'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Members/Collection.json'},
            {'rel': 'parent', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73', 'method': 'GET',
             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Response.json'},
            {'rel': 'create', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c4559ffd73/members', 'method': 'POST',
             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/Response.json',
             'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Members/POST.json'}]},
                     'status_code': 200}
        add_or_remove_member_tag_mock.return_value = responses
        url = reverse('mailchimp_audience-add-or-remove-member-tag',
                      kwargs={"pk": "c4559ffd73", "subscriber_hash": "string"})
        data = {
            "tags": [
                {
                    "name": "string",
                    "status": "string"
                }
            ],
            "is_syncing": 'true'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        add_or_remove_member_tag_mock.assert_called_once()

    @mock.patch(
        'modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.add_or_remove_member_tag')
    def test_add_or_remove_member_tag_with_invalid_id(self, add_or_remove_member_tag_mock):
        responses = {
            'text': '{"type":"https://mailchimp.com/developer/marketing/docs/errors/","title":"Resource Not Found","status":404,"detail":"The requested resource could not be found.","instance":"6e659ef7-0a5a-a210-a815-851719bf70c1"}',
            'status_code': 404}
        add_or_remove_member_tag_mock.return_value = responses
        url = reverse('mailchimp_audience-add-or-remove-member-tag',
                      kwargs={"pk": "c4559ffd73", "subscriber_hash": "string"})
        data = {
            "tags": [
                {
                    "name": "string",
                    "status": "string"
                }
            ],
            "is_syncing": 'true'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        add_or_remove_member_tag_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.list_segments')
    def test_list_segments(self, list_segments_mock):
        responses = {'text': {'segments': [{'id': 234383, 'name': 'string', 'member_count': 1, 'type': 'static',
                                            'created_at': '2023-01-13T14:42:16+00:00',
                                            'updated_at': '2023-01-13T14:42:16+00:00', 'list_id': 'c59fae1932',
                                            '_links': [{'rel': 'self',
                                                        'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/segments/234383',
                                                        'method': 'GET',
                                                        'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Segments/Response.json'},
                                                       {'rel': 'parent',
                                                        'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/segments',
                                                        'method': 'GET',
                                                        'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Segments/CollectionResponse.json',
                                                        'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Segments/Collection.json'},
                                                       {'rel': 'delete',
                                                        'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/segments/234383',
                                                        'method': 'DELETE'}, {'rel': 'update',
                                                                              'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/segments/234383',
                                                                              'method': 'PATCH',
                                                                              'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Segments/Response.json',
                                                                              'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Segments/PATCH.json'},
                                                       {'rel': 'members',
                                                        'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/segments/234383/members',
                                                        'method': 'GET',
                                                        'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Segments/Members/Response.json'}]},
                                           {'id': 234385, 'name': 'name', 'member_count': 1, 'type': 'saved',
                                            'created_at': '2023-01-13T14:53:29+00:00',
                                            'updated_at': '2023-01-13T14:53:29+00:00',
                                            'options': {'match': 'all', 'conditions': []}, 'list_id': 'c59fae1932',
                                            '_links': [{'rel': 'self',
                                                        'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/segments/234385',
                                                        'method': 'GET',
                                                        'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Segments/Response.json'},
                                                       {'rel': 'parent',
                                                        'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/segments',
                                                        'method': 'GET',
                                                        'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Segments/CollectionResponse.json',
                                                        'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Segments/Collection.json'},
                                                       {'rel': 'delete',
                                                        'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/segments/234385',
                                                        'method': 'DELETE'}, {'rel': 'update',
                                                                              'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/segments/234385',
                                                                              'method': 'PATCH',
                                                                              'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Segments/Response.json',
                                                                              'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Segments/PATCH.json'},
                                                       {'rel': 'members',
                                                        'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/segments/234385/members',
                                                        'method': 'GET',
                                                        'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Segments/Members/Response.json'}]},
                                           {'id': 234399, 'name': 'name1', 'member_count': 1, 'type': 'static',
                                            'created_at': '2023-01-13T17:26:25+00:00',
                                            'updated_at': '2023-01-13T17:26:25+00:00', 'list_id': 'c59fae1932',
                                            '_links': [{'rel': 'self',
                                                        'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/segments/234399',
                                                        'method': 'GET',
                                                        'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Segments/Response.json'},
                                                       {'rel': 'parent',
                                                        'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/segments',
                                                        'method': 'GET',
                                                        'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Segments/CollectionResponse.json',
                                                        'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Segments/Collection.json'},
                                                       {'rel': 'delete',
                                                        'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/segments/234399',
                                                        'method': 'DELETE'}, {'rel': 'update',
                                                                              'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/segments/234399',
                                                                              'method': 'PATCH',
                                                                              'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Segments/Response.json',
                                                                              'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Segments/PATCH.json'},
                                                       {'rel': 'members',
                                                        'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/segments/234399/members',
                                                        'method': 'GET',
                                                        'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Segments/Members/Response.json'}]}],
                              'list_id': 'c59fae1932', 'total_items': 3, '_links': [
                {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/segments', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Segments/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Segments/Collection.json'},
                {'rel': 'parent', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Response.json'},
                {'rel': 'create', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/segments',
                 'method': 'POST',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Segments/Response.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Segments/POST.json'}]},
                     'status_code': 200}
        list_segments_mock.return_value = responses
        url = reverse('mailchimp_audience-list-segment', kwargs={"pk": "c4559ffd73"})
        response = self.client.get(url)
        self.assertEqual(response.data['segments'][0]['_links'], responses['text']['segments'][0]['_links'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        list_segments_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.list_segments')
    def test_list_segments_with_invalid_id(self, list_segments_mock):
        responses = {
            'text': '{"type":"https://mailchimp.com/developer/marketing/docs/errors/","title":"Resource Not Found","status":404,"detail":"The requested resource could not be found.","instance":"b387f2e5-6ee1-2027-4f1f-6fd19733f9a8"}',
            'status_code': 404}
        list_segments_mock.return_value = responses
        url = reverse('mailchimp_audience-list-segment', kwargs={"pk": "4559ffd73"})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        list_segments_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.add_segment')
    def test_add_segment(self, add_segment_mock):
        responses = {'text': {'segments': [
            {'id': 234399, 'name': 'name1', 'member_count': 1, 'type': 'static',
             'created_at': '2023-01-13T17:26:25+00:00',
             'updated_at': '2023-01-13T17:26:25+00:00', 'list_id': 'c59fae1932',
             '_links': [{'rel': 'self',
                         'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/segments/234399',
                         'method': 'GET',
                         'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Segments/Response.json'},
                        {'rel': 'parent',
                         'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/segments',
                         'method': 'GET',
                         'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Segments/CollectionResponse.json',
                         'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Segments/Collection.json'},
                        {'rel': 'delete',
                         'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/segments/234399',
                         'method': 'DELETE'}, {'rel': 'update',
                                               'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/segments/234399',
                                               'method': 'PATCH',
                                               'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Segments/Response.json',
                                               'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Segments/PATCH.json'},
                        {'rel': 'members',
                         'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/segments/234399/members',
                         'method': 'GET',
                         'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Segments/Members/Response.json'}]}],
            'list_id': 'c59fae1932', 'total_items': 3, '_links': [
                {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/segments', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Segments/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Segments/Collection.json'},
                {'rel': 'parent', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Response.json'},
                {'rel': 'create', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/segments',
                 'method': 'POST',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Segments/Response.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Segments/POST.json'}]},
            'status_code': 201}
        add_segment_mock.return_value = responses
        url = reverse('mailchimp_audience-add-segment', kwargs={"pk": "c4559ffd73"})
        data = {
            "name": "string",
            "static_segment": [
                "string"
            ],
            "options": {
                "match": "string",
                "conditions": [
                    "string"
                ]
            }
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.data['segments'][0]['_links'], responses['text']['segments'][0]['_links'])
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        add_segment_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.add_segment')
    def test_add_segment_with_invalid_data(self, add_segment_mock):
        responses = {
            'text': '{"type":"https://mailchimp.com/developer/marketing/docs/errors/","title":"Invalid Resource","status":400,"detail":"The resource submitted could not be validated. For field-specific details, see the \'errors\' array.","instance":"b033f2b2-06d5-a62b-2270-7bc05e3895a5","errors":[{"field":"options.match","message":"Data presented is not one of the accepted values: any, all."},{"field":"options.conditions.item:0","message":"Schema describes object, string found instead"}]}',
            'status_code': 400}
        add_segment_mock.return_value = responses
        url = reverse('mailchimp_audience-add-segment', kwargs={"pk": "c4559ffd73"})
        data = {
            "name": "string",
            "static_segment": [
                "string"
            ],
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.get_segment_info')
    def test_get_segment_info(self, get_segment_info_mock):
        responses = {'text': {'id': 234383, 'name': 'string', 'member_count': 1, 'type': 'static',
                              'created_at': '2023-01-13T14:42:16+00:00', 'updated_at': '2023-01-13T14:42:16+00:00',
                              'list_id': 'c59fae1932', '_links': [
                {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/segments/234383',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Segments/Response.json'},
                {'rel': 'parent', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/segments',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Segments/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Segments/Collection.json'},
                {'rel': 'delete', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/segments/234383',
                 'method': 'DELETE'},
                {'rel': 'update', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/segments/234383',
                 'method': 'PATCH',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Segments/Response.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Segments/PATCH.json'},
                {'rel': 'members',
                 'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/segments/234383/members', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Segments/Members/Response.json'}]},
                     'status_code': 200}
        get_segment_info_mock.return_value = responses
        url = reverse('mailchimp_audience-get-segment-info', kwargs={"pk": "c4559ffd73", 'segment_id': "56899y2"})
        response = self.client.get(url)
        self.assertEqual(response.data['_links'], responses['text']['_links'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        get_segment_info_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.get_segment_info')
    def test_get_segment_info_with_invalid_id(self, get_segment_info_mock):
        responses = {
            'text': '{"type":"https://mailchimp.com/developer/marketing/docs/errors/","title":"Resource Not Found","status":404,"detail":"The requested resource could not be found.","instance":"f6483558-8687-3b22-b41b-de0d7b610ea2"}',
            'status_code': 404}
        get_segment_info_mock.return_value = responses
        url = reverse('mailchimp_audience-get-segment-info', kwargs={"pk": "c4559ffd73", 'segment_id': "56899y2"})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        get_segment_info_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.delete_segment')
    def test_delete_segment(self, delete_segment_mock):
        responses = {"status_code": 204}
        delete_segment_mock.return_value = responses
        url = reverse('mailchimp_audience-delete-segment', kwargs={"pk": "c4559ffd73", 'segment_id': "56899y2"})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        delete_segment_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.delete_segment')
    def test_delete_segment_with_invalid_id(self, delete_segment_mock):
        responses = {
            'text': '{"type":"https://mailchimp.com/developer/marketing/docs/errors/","title":"Resource Not Found","status":404,"detail":"The requested resource could not be found.","instance":"f6483558-8687-3b22-b41b-de0d7b610ea2"}',
            'status_code': 404}
        delete_segment_mock.return_value = responses
        url = reverse('mailchimp_audience-delete-segment', kwargs={"pk": "c4559ffd73", 'segment_id': "56899y2"})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        delete_segment_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.update_segment')
    def test_update_segment(self, update_segment_mock):
        responses = {'text': {'segments': [
            {'id': 234399, 'name': 'name1', 'member_count': 1, 'type': 'static',
             'created_at': '2023-01-13T17:26:25+00:00',
             'updated_at': '2023-01-13T17:26:25+00:00', 'list_id': 'c59fae1932',
             '_links': [{'rel': 'self',
                         'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/segments/234399',
                         'method': 'GET',
                         'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Segments/Response.json'},
                        {'rel': 'parent',
                         'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/segments',
                         'method': 'GET',
                         'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Segments/CollectionResponse.json',
                         'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Segments/Collection.json'},
                        {'rel': 'delete',
                         'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/segments/234399',
                         'method': 'DELETE'}, {'rel': 'update',
                                               'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/segments/234399',
                                               'method': 'PATCH',
                                               'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Segments/Response.json',
                                               'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Segments/PATCH.json'},
                        {'rel': 'members',
                         'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/segments/234399/members',
                         'method': 'GET',
                         'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Segments/Members/Response.json'}]}],
            'list_id': 'c59fae1932', 'total_items': 3, '_links': [
                {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/segments', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Segments/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Lists/Segments/Collection.json'},
                {'rel': 'parent', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Response.json'},
                {'rel': 'create', 'href': 'https://us21.api.mailchimp.com/3.0/lists/c59fae1932/segments',
                 'method': 'POST',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Segments/Response.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Lists/Segments/POST.json'}]},
            'status_code': 200}
        update_segment_mock.return_value = responses
        url = reverse('mailchimp_audience-update-segment', kwargs={"pk": "c4559ffd73", 'segment_id': "56899y2"})
        data = {
            "name": "string",
            "static_segment": [
                "string"
            ],
            "options": {
                "match": "string",
                "conditions": [
                    "string"
                ]
            }
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.data['segments'][0]['_links'], responses['text']['segments'][0]['_links'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        update_segment_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.update_segment')
    def test_update_segment_with_invalid_data(self, update_segment_mock):
        responses = {
            'text': '{"type":"https://mailchimp.com/developer/marketing/docs/errors/","title":"Invalid Resource","status":400,"detail":"The resource submitted could not be validated. For field-specific details, see the \'errors\' array.","instance":"8ebbd4a9-62d7-f9d9-9177-6a08b728387b","errors":[{"field":"options.match","message":"Data presented is not one of the accepted values: any, all."},{"field":"options.conditions.item:0","message":"Schema describes object, string found instead"}]}',
            'status_code': 400}
        update_segment_mock.return_value = responses
        url = reverse('mailchimp_audience-update-segment', kwargs={"pk": "c4559ffd73", 'segment_id': "56899y2"})
        data = {
            "name": "string",
            "static_segment": [
                "string"
            ],
            "options": {
                "match": "string",
                "conditions": [
                    "string"
                ]
            }
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        update_segment_mock.assert_called_once()


class MailchimpTemplatesTestCase(APITestCase):

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.list_template')
    def test_list_template(self, list_template_mock):
        responses = {'text': {'templates': [
            {'id': 3034, 'type': 'user', 'name': 'string', 'drag_and_drop': False, 'responsive': False, 'category': '',
             'date_created': '2023-01-13T15:43:16+00:00', 'date_edited': '2023-01-13T15:43:17+00:00',
             'created_by': 'Muhammad Shoaib', 'edited_by': 'Muhammad Shoaib', 'active': True,
             'thumbnail': 'https://mcusercontent.com/1bce3f41b7ce6d507ec899ef2/template-screens/ed4be2ffd2909f60bc3343642e578f90_3034_screen.png',
             'share_url': '', 'content_type': 'html', '_links': [
                {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/templates/3034', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/Response.json'},
                {'rel': 'parent', 'href': 'https://us21.api.mailchimp.com/3.0/templates', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Templates/Collection.json'},
                {'rel': 'delete', 'href': 'https://us21.api.mailchimp.com/3.0/templates/3034', 'method': 'DELETE'},
                {'rel': 'default-content', 'href': 'https://us21.api.mailchimp.com/3.0/templates/3034/default-content',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/Default-Content/Response.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Templates/Collection.json'}]},
            {'id': 2939, 'type': 'user', 'name': 'aami', 'drag_and_drop': False, 'responsive': False, 'category': '',
             'date_created': '2023-01-11T13:03:25+00:00', 'date_edited': '2023-01-11T13:03:26+00:00',
             'created_by': 'Muhammad Shoaib', 'edited_by': 'Muhammad Shoaib', 'active': True,
             'thumbnail': 'https://mcusercontent.com/1bce3f41b7ce6d507ec899ef2/template-screens/ed4be2ffd2909f60bc3343642e578f90_2939_screen.png',
             'share_url': '', 'content_type': 'html', '_links': [
                {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/templates/2939', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/Response.json'},
                {'rel': 'parent', 'href': 'https://us21.api.mailchimp.com/3.0/templates', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Templates/Collection.json'},
                {'rel': 'delete', 'href': 'https://us21.api.mailchimp.com/3.0/templates/2939', 'method': 'DELETE'},
                {'rel': 'default-content', 'href': 'https://us21.api.mailchimp.com/3.0/templates/2939/default-content',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/Default-Content/Response.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Templates/Collection.json'}]},
            {'id': 2938, 'type': 'user', 'name': 'aami', 'drag_and_drop': False, 'responsive': False, 'category': '',
             'date_created': '2023-01-11T13:01:52+00:00', 'date_edited': '2023-01-11T13:01:52+00:00',
             'created_by': 'Muhammad Shoaib', 'edited_by': 'Muhammad Shoaib', 'active': True,
             'thumbnail': 'https://mcusercontent.com/1bce3f41b7ce6d507ec899ef2/template-screens/ed4be2ffd2909f60bc3343642e578f90_2938_screen.png',
             'share_url': '', 'content_type': 'html', '_links': [
                {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/templates/2938', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/Response.json'},
                {'rel': 'parent', 'href': 'https://us21.api.mailchimp.com/3.0/templates', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Templates/Collection.json'},
                {'rel': 'delete', 'href': 'https://us21.api.mailchimp.com/3.0/templates/2938', 'method': 'DELETE'},
                {'rel': 'default-content', 'href': 'https://us21.api.mailchimp.com/3.0/templates/2938/default-content',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/Default-Content/Response.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Templates/Collection.json'}]},
            {'id': 2937, 'type': 'user', 'name': 'aam', 'drag_and_drop': False, 'responsive': False, 'category': '',
             'date_created': '2023-01-11T13:01:30+00:00', 'date_edited': '2023-01-11T13:01:30+00:00',
             'created_by': 'Muhammad Shoaib', 'edited_by': 'Muhammad Shoaib', 'active': True,
             'thumbnail': 'https://mcusercontent.com/1bce3f41b7ce6d507ec899ef2/template-screens/ed4be2ffd2909f60bc3343642e578f90_2937_screen.png',
             'share_url': '', 'content_type': 'html', '_links': [
                {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/templates/2937', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/Response.json'},
                {'rel': 'parent', 'href': 'https://us21.api.mailchimp.com/3.0/templates', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Templates/Collection.json'},
                {'rel': 'delete', 'href': 'https://us21.api.mailchimp.com/3.0/templates/2937', 'method': 'DELETE'},
                {'rel': 'default-content', 'href': 'https://us21.api.mailchimp.com/3.0/templates/2937/default-content',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/Default-Content/Response.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Templates/Collection.json'}]},
            {'id': 2936, 'type': 'user', 'name': 'aam', 'drag_and_drop': False, 'responsive': False, 'category': '',
             'date_created': '2023-01-11T12:59:24+00:00', 'date_edited': '2023-01-11T12:59:25+00:00',
             'created_by': 'Muhammad Shoaib', 'edited_by': 'Muhammad Shoaib', 'active': True,
             'thumbnail': 'https://mcusercontent.com/1bce3f41b7ce6d507ec899ef2/template-screens/ed4be2ffd2909f60bc3343642e578f90_2936_screen.png',
             'share_url': '', 'content_type': 'html', '_links': [
                {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/templates/2936', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/Response.json'},
                {'rel': 'parent', 'href': 'https://us21.api.mailchimp.com/3.0/templates', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Templates/Collection.json'},
                {'rel': 'delete', 'href': 'https://us21.api.mailchimp.com/3.0/templates/2936', 'method': 'DELETE'},
                {'rel': 'default-content', 'href': 'https://us21.api.mailchimp.com/3.0/templates/2936/default-content',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/Default-Content/Response.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Templates/Collection.json'}]},
            {'id': 2934, 'type': 'user', 'name': 'sdh', 'drag_and_drop': False, 'responsive': False, 'category': '',
             'date_created': '2023-01-11T12:55:06+00:00', 'date_edited': '2023-01-11T12:55:06+00:00',
             'created_by': 'Muhammad Shoaib', 'edited_by': 'Muhammad Shoaib', 'active': True,
             'thumbnail': 'https://mcusercontent.com/1bce3f41b7ce6d507ec899ef2/template-screens/ed4be2ffd2909f60bc3343642e578f90_2934_screen.png',
             'share_url': '', 'content_type': 'html', '_links': [
                {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/templates/2934', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/Response.json'},
                {'rel': 'parent', 'href': 'https://us21.api.mailchimp.com/3.0/templates', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Templates/Collection.json'},
                {'rel': 'delete', 'href': 'https://us21.api.mailchimp.com/3.0/templates/2934', 'method': 'DELETE'},
                {'rel': 'default-content', 'href': 'https://us21.api.mailchimp.com/3.0/templates/2934/default-content',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/Default-Content/Response.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Templates/Collection.json'}]},
            {'id': 2923, 'type': 'user', 'name': 'abcde', 'drag_and_drop': False, 'responsive': False, 'category': '',
             'date_created': '2023-01-11T11:46:31+00:00', 'date_edited': '2023-01-11T11:46:31+00:00',
             'created_by': 'Muhammad Shoaib', 'edited_by': 'Muhammad Shoaib', 'active': True,
             'thumbnail': 'https://mcusercontent.com/1bce3f41b7ce6d507ec899ef2/template-screens/ed4be2ffd2909f60bc3343642e578f90_2923_screen.png',
             'share_url': '', 'content_type': 'html', '_links': [
                {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/templates/2923', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/Response.json'},
                {'rel': 'parent', 'href': 'https://us21.api.mailchimp.com/3.0/templates', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Templates/Collection.json'},
                {'rel': 'delete', 'href': 'https://us21.api.mailchimp.com/3.0/templates/2923', 'method': 'DELETE'},
                {'rel': 'default-content', 'href': 'https://us21.api.mailchimp.com/3.0/templates/2923/default-content',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/Default-Content/Response.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Templates/Collection.json'}]},
            {'id': 2829, 'type': 'user', 'name': 'abcd', 'drag_and_drop': False, 'responsive': False, 'category': '',
             'date_created': '2023-01-10T08:16:48+00:00', 'date_edited': '2023-01-10T08:16:48+00:00',
             'created_by': 'Muhammad Shoaib', 'edited_by': 'Muhammad Shoaib', 'active': True,
             'thumbnail': 'https://mcusercontent.com/1bce3f41b7ce6d507ec899ef2/template-screens/ed4be2ffd2909f60bc3343642e578f90_2829_screen.png',
             'share_url': '', 'content_type': 'html', '_links': [
                {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/templates/2829', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/Response.json'},
                {'rel': 'parent', 'href': 'https://us21.api.mailchimp.com/3.0/templates', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Templates/Collection.json'},
                {'rel': 'delete', 'href': 'https://us21.api.mailchimp.com/3.0/templates/2829', 'method': 'DELETE'},
                {'rel': 'default-content', 'href': 'https://us21.api.mailchimp.com/3.0/templates/2829/default-content',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/Default-Content/Response.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Templates/Collection.json'}]},
            {'id': 605, 'type': 'base', 'name': 'Product Retargeting', 'drag_and_drop': True, 'responsive': True,
             'category': '', 'date_created': '2022-06-14T21:19:09+00:00', 'date_edited': '', 'created_by': '',
             'edited_by': '', 'active': True,
             'thumbnail': 'https://cdn-images.mailchimp.com/template_screenshots/product-retargeting.png',
             'share_url': '', 'content_type': 'template', '_links': [
                {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/templates/605', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/Response.json'},
                {'rel': 'parent', 'href': 'https://us21.api.mailchimp.com/3.0/templates', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Templates/Collection.json'},
                {'rel': 'delete', 'href': 'https://us21.api.mailchimp.com/3.0/templates/605', 'method': 'DELETE'},
                {'rel': 'default-content', 'href': 'https://us21.api.mailchimp.com/3.0/templates/605/default-content',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/Default-Content/Response.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Templates/Collection.json'}]},
            {'id': 604, 'type': 'base', 'name': 'Cancellation Confirmation', 'drag_and_drop': False, 'responsive': True,
             'category': '', 'date_created': '2022-06-14T21:19:09+00:00', 'date_edited': '', 'created_by': '',
             'edited_by': '', 'active': True,
             'thumbnail': 'https://cdn-images.mailchimp.com/template_screenshots/tx-cancellation.png', 'share_url': '',
             'content_type': 'template', '_links': [
                {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/templates/604', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/Response.json'},
                {'rel': 'parent', 'href': 'https://us21.api.mailchimp.com/3.0/templates', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Templates/Collection.json'},
                {'rel': 'delete', 'href': 'https://us21.api.mailchimp.com/3.0/templates/604', 'method': 'DELETE'},
                {'rel': 'default-content', 'href': 'https://us21.api.mailchimp.com/3.0/templates/604/default-content',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/Default-Content/Response.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Templates/Collection.json'}]}],
            'total_items': 135, '_links': [
                {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/templates', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Templates/Collection.json'}]},
            'status_code': 200}
        list_template_mock.return_value = responses
        url = reverse('mailchimp_templates-list-template')
        response = self.client.get(url)
        self.assertEqual(response.data['templates'][0]['_links'], responses['text']['templates'][0]['_links'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        list_template_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.add_template')
    def test_add_template(self, add_template_mock):
        responses = {'text': {'id': 3121, 'type': 'user', 'name': 'string', 'drag_and_drop': False, 'responsive': False,
                              'category': '', 'date_created': '2023-01-16T13:17:53+00:00',
                              'date_edited': '2023-01-16T13:17:54+00:00', 'created_by': 'Muhammad Shoaib',
                              'edited_by': 'Muhammad Shoaib', 'active': True, 'folder_id': '6e575debb5',
                              'thumbnail': '', 'share_url': '', 'content_type': 'html', '_links': [
                {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/templates/3121', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/Response.json'},
                {'rel': 'parent', 'href': 'https://us21.api.mailchimp.com/3.0/templates', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Templates/Collection.json'},
                {'rel': 'delete', 'href': 'https://us21.api.mailchimp.com/3.0/templates/3121', 'method': 'DELETE'},
                {'rel': 'default-content', 'href': 'https://us21.api.mailchimp.com/3.0/templates/3121/default-content',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/Default-Content/Response.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Templates/Collection.json'}]},
                     'status_code': 201}
        add_template_mock.return_value = responses
        url = reverse('mailchimp_templates-add-template')
        data = {
            "name": "string",
            "html": "string",
            "folder_id": "string"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.data['_links'], responses['text']['_links'])
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        add_template_mock.assert_called_once()

    def test_add_template_with_empty_data(self):
        url = reverse('mailchimp_templates-add-template')
        data = {}
        name_error_message = 'This field is required.'
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['name'][0], name_error_message)

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.get_template_info')
    def test_get_template_info(self, get_template_info_mock):
        responses = {'text': {'id': 3121, 'type': 'user', 'name': 'string', 'drag_and_drop': False, 'responsive': False,
                              'category': '', 'date_created': '2023-01-16T13:17:53+00:00',
                              'date_edited': '2023-01-16T13:17:54+00:00', 'created_by': 'Muhammad Shoaib',
                              'edited_by': 'Muhammad Shoaib', 'active': True, 'folder_id': '6e575debb5',
                              'thumbnail': '', 'share_url': '', 'content_type': 'html', '_links': [
                {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/templates/3121', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/Response.json'},
                {'rel': 'parent', 'href': 'https://us21.api.mailchimp.com/3.0/templates', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Templates/Collection.json'},
                {'rel': 'delete', 'href': 'https://us21.api.mailchimp.com/3.0/templates/3121', 'method': 'DELETE'},
                {'rel': 'default-content', 'href': 'https://us21.api.mailchimp.com/3.0/templates/3121/default-content',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/Default-Content/Response.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Templates/Collection.json'}]},
                     'status_code': 200}
        get_template_info_mock.return_value = responses
        url = reverse('mailchimp_templates-get-template-info', kwargs={"pk": "3121"})
        response = self.client.get(url)
        self.assertEqual(response.data['_links'], responses['text']['_links'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        get_template_info_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.get_template_info')
    def test_get_template_info_with_invalid_id(self, get_template_info_mock):
        responses = {
            'text': '{"type":"https://mailchimp.com/developer/marketing/docs/errors/","title":"Resource Not Found","status":404,"detail":"The requested resource could not be found.","instance":"95a43092-e3fd-ad53-0e28-2cf8a2d90925"}',
            'status_code': 404}
        get_template_info_mock.return_value = responses
        url = reverse('mailchimp_templates-get-template-info', kwargs={"pk": "3121"})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        get_template_info_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.delete_template')
    def test_delete_template(self, delete_template_mock):
        responses = {'status_code': 204}
        delete_template_mock.return_value = responses
        url = reverse('mailchimp_templates-delete-template', kwargs={"pk": "3121"})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        delete_template_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.update_template')
    def test_update_template(self, update_template_mock):
        responses = {'text': {'id': 3121, 'type': 'user', 'name': 'string', 'drag_and_drop': False, 'responsive': False,
                              'category': '', 'date_created': '2023-01-16T13:17:53+00:00',
                              'date_edited': '2023-01-16T13:26:05+00:00', 'created_by': 'Muhammad Shoaib',
                              'edited_by': 'Muhammad Shoaib', 'active': True, 'folder_id': '6e575debb5',
                              'thumbnail': 'https://mcusercontent.com/1bce3f41b7ce6d507ec899ef2/template-screens/ed4be2ffd2909f60bc3343642e578f90_3121_screen.png',
                              'share_url': '', 'content_type': 'html', '_links': [
                {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/templates/3121', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/Response.json'},
                {'rel': 'parent', 'href': 'https://us21.api.mailchimp.com/3.0/templates', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Templates/Collection.json'},
                {'rel': 'delete', 'href': 'https://us21.api.mailchimp.com/3.0/templates/3121', 'method': 'DELETE'},
                {'rel': 'default-content', 'href': 'https://us21.api.mailchimp.com/3.0/templates/3121/default-content',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/Default-Content/Response.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Templates/Collection.json'}]},
                     'status_code': 200}
        update_template_mock.return_value = responses
        url = reverse('mailchimp_templates-update-template', kwargs={"pk": "4"})
        data = {
            "name": "string",
            "html": "string",
            "folder_id": "string"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.data['_links'], responses['text']['_links'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        update_template_mock.assert_called_once()

    def test_update_template_with_empty_data(self):
        url = reverse('mailchimp_templates-update-template', kwargs={"pk": "4"})
        data = {}
        name_error_message = 'This field is required.'
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['name'][0], name_error_message)

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.list_template_folder')
    def test_list_template_folder(self, list_template_folder_mock):
        responses = {'text': {'folders': [{'name': 'new_folder', 'id': '6e575debb5', 'count': 1, '_links': [
            {'rel': 'parent', 'href': 'https://us21.api.mailchimp.com/3.0/template-folders', 'method': 'GET',
             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/TemplateFolders/CollectionResponse.json',
             'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/TemplateFolders/Collection.json'},
            {'rel': 'update', 'href': 'https://us21.api.mailchimp.com/3.0/template-folders/6e575debb5',
             'method': 'PATCH',
             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/TemplateFolders/Response.json',
             'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/TemplateFolders/PATCH.json'},
            {'rel': 'delete', 'href': 'https://us21.api.mailchimp.com/3.0/template-folders/6e575debb5',
             'method': 'DELETE'},
            {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/template-folders/6e575debb5', 'method': 'GET',
             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/TemplateFolders/Response.json'},
            {'rel': 'templates', 'href': 'https://us21.api.mailchimp.com/3.0/templates?folder_id=6e575debb5',
             'method': 'GET',
             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/Response.json'}]},
                                          {'name': 'kjnkj', 'id': '5d4f45395a', 'count': 0, '_links': [{'rel': 'parent',
                                                                                                        'href': 'https://us21.api.mailchimp.com/3.0/template-folders',
                                                                                                        'method': 'GET',
                                                                                                        'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/TemplateFolders/CollectionResponse.json',
                                                                                                        'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/TemplateFolders/Collection.json'},
                                                                                                       {'rel': 'update',
                                                                                                        'href': 'https://us21.api.mailchimp.com/3.0/template-folders/5d4f45395a',
                                                                                                        'method': 'PATCH',
                                                                                                        'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/TemplateFolders/Response.json',
                                                                                                        'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/TemplateFolders/PATCH.json'},
                                                                                                       {'rel': 'delete',
                                                                                                        'href': 'https://us21.api.mailchimp.com/3.0/template-folders/5d4f45395a',
                                                                                                        'method': 'DELETE'},
                                                                                                       {'rel': 'self',
                                                                                                        'href': 'https://us21.api.mailchimp.com/3.0/template-folders/5d4f45395a',
                                                                                                        'method': 'GET',
                                                                                                        'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/TemplateFolders/Response.json'},
                                                                                                       {
                                                                                                           'rel': 'templates',
                                                                                                           'href': 'https://us21.api.mailchimp.com/3.0/templates?folder_id=5d4f45395a',
                                                                                                           'method': 'GET',
                                                                                                           'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/Response.json'}]},
                                          {'name': 'string', 'id': 'e23d86e8ce', 'count': 0, '_links': [
                                              {'rel': 'parent',
                                               'href': 'https://us21.api.mailchimp.com/3.0/template-folders',
                                               'method': 'GET',
                                               'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/TemplateFolders/CollectionResponse.json',
                                               'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/TemplateFolders/Collection.json'},
                                              {'rel': 'update',
                                               'href': 'https://us21.api.mailchimp.com/3.0/template-folders/e23d86e8ce',
                                               'method': 'PATCH',
                                               'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/TemplateFolders/Response.json',
                                               'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/TemplateFolders/PATCH.json'},
                                              {'rel': 'delete',
                                               'href': 'https://us21.api.mailchimp.com/3.0/template-folders/e23d86e8ce',
                                               'method': 'DELETE'}, {'rel': 'self',
                                                                     'href': 'https://us21.api.mailchimp.com/3.0/template-folders/e23d86e8ce',
                                                                     'method': 'GET',
                                                                     'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/TemplateFolders/Response.json'},
                                              {'rel': 'templates',
                                               'href': 'https://us21.api.mailchimp.com/3.0/templates?folder_id=e23d86e8ce',
                                               'method': 'GET',
                                               'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/Response.json'}]},
                                          {'name': 'string1', 'id': '2d3a460f8d', 'count': 0, '_links': [
                                              {'rel': 'parent',
                                               'href': 'https://us21.api.mailchimp.com/3.0/template-folders',
                                               'method': 'GET',
                                               'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/TemplateFolders/CollectionResponse.json',
                                               'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/TemplateFolders/Collection.json'},
                                              {'rel': 'update',
                                               'href': 'https://us21.api.mailchimp.com/3.0/template-folders/2d3a460f8d',
                                               'method': 'PATCH',
                                               'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/TemplateFolders/Response.json',
                                               'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/TemplateFolders/PATCH.json'},
                                              {'rel': 'delete',
                                               'href': 'https://us21.api.mailchimp.com/3.0/template-folders/2d3a460f8d',
                                               'method': 'DELETE'}, {'rel': 'self',
                                                                     'href': 'https://us21.api.mailchimp.com/3.0/template-folders/2d3a460f8d',
                                                                     'method': 'GET',
                                                                     'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/TemplateFolders/Response.json'},
                                              {'rel': 'templates',
                                               'href': 'https://us21.api.mailchimp.com/3.0/templates?folder_id=2d3a460f8d',
                                               'method': 'GET',
                                               'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/Response.json'}]}],
                              'total_items': 4, '_links': [
                {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/template-folders', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/TemplateFolders/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/TemplateFolders/Collection.json'},
                {'rel': 'create', 'href': 'https://us21.api.mailchimp.com/3.0/template-folders', 'method': 'POST',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/TemplateFolders/Response.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/TemplateFolders/POST.json'}]},
                     'status_code': 200}
        list_template_folder_mock.return_value = responses
        url = reverse('mailchimp_templates-list-template-folder')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['folders'][0]['_links'], responses['text']['folders'][0]['_links'])
        list_template_folder_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.add_template_folder')
    def test_add_template_folder(self, add_template_folder_mock):
        responses = {'text': {'name': 'string', 'id': '0d2f11cf8c', 'count': 0, '_links': [
            {'rel': 'parent', 'href': 'https://us21.api.mailchimp.com/3.0/template-folders', 'method': 'GET',
             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/TemplateFolders/CollectionResponse.json',
             'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/TemplateFolders/Collection.json'},
            {'rel': 'update', 'href': 'https://us21.api.mailchimp.com/3.0/template-folders/0d2f11cf8c',
             'method': 'PATCH',
             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/TemplateFolders/Response.json',
             'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/TemplateFolders/PATCH.json'},
            {'rel': 'delete', 'href': 'https://us21.api.mailchimp.com/3.0/template-folders/0d2f11cf8c',
             'method': 'DELETE'},
            {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/template-folders/0d2f11cf8c', 'method': 'GET',
             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/TemplateFolders/Response.json'},
            {'rel': 'templates', 'href': 'https://us21.api.mailchimp.com/3.0/templates?folder_id=0d2f11cf8c',
             'method': 'GET',
             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/Response.json'}]},
                     'status_code': 201}
        add_template_folder_mock.return_value = responses
        url = reverse('mailchimp_templates-add-template-folder')
        data = {
            "name": "string"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['_links'], responses['text']['_links'])
        add_template_folder_mock.assert_called_once()

    def test_add_template_folder_with_empty_data(self):
        url = reverse('mailchimp_templates-add-template-folder')
        data = {}
        name_error_message = 'This field is required.'
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['name'][0], name_error_message)

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.get_template_folder')
    def test_get_template_folder(self, get_template_folder_mock):
        responses = {'text': {'name': 'string', 'id': '0d2f11cf8c', 'count': 0, '_links': [
            {'rel': 'parent', 'href': 'https://us21.api.mailchimp.com/3.0/template-folders', 'method': 'GET',
             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/TemplateFolders/CollectionResponse.json',
             'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/TemplateFolders/Collection.json'},
            {'rel': 'update', 'href': 'https://us21.api.mailchimp.com/3.0/template-folders/0d2f11cf8c',
             'method': 'PATCH',
             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/TemplateFolders/Response.json',
             'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/TemplateFolders/PATCH.json'},
            {'rel': 'delete', 'href': 'https://us21.api.mailchimp.com/3.0/template-folders/0d2f11cf8c',
             'method': 'DELETE'},
            {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/template-folders/0d2f11cf8c', 'method': 'GET',
             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/TemplateFolders/Response.json'},
            {'rel': 'templates', 'href': 'https://us21.api.mailchimp.com/3.0/templates?folder_id=0d2f11cf8c',
             'method': 'GET',
             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/Response.json'}]},
                     'status_code': 200}
        get_template_folder_mock.return_value = responses
        url = reverse('mailchimp_templates-get-template-folder', kwargs={"pk": "0d2f11cf8c"})
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        get_template_folder_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.get_template_folder')
    def test_get_template_folder_with_invalid_id(self, get_template_folder_mock):
        responses = {
            'text': '{"type":"https://mailchimp.com/developer/marketing/docs/errors/","title":"Resource Not Found","status":404,"detail":"The requested resource could not be found.","instance":"95a43092-e3fd-ad53-0e28-2cf8a2d90925"}',
            'status_code': 404}
        get_template_folder_mock.return_value = responses
        url = reverse('mailchimp_templates-get-template-folder', kwargs={"pk": "0d2f11cf8c"})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        get_template_folder_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.delete_template_folder')
    def test_delete_template_folder(self, delete_template_folder_mock):
        responses = {'status_code': 204}
        delete_template_folder_mock.return_value = responses
        url = reverse('mailchimp_templates-delete-template-folder', kwargs={"pk": "0d2f11cf8c"})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        delete_template_folder_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.update_template_folder')
    def test_update_template_folder(self, update_template_folder_mock):
        responses = {'text': {'id': 3121, 'type': 'user', 'name': 'string', 'drag_and_drop': False, 'responsive': False,
                              'category': '', 'date_created': '2023-01-16T13:17:53+00:00',
                              'date_edited': '2023-01-16T13:40:47+00:00', 'created_by': 'Muhammad Shoaib',
                              'edited_by': 'Muhammad Shoaib', 'active': True, 'folder_id': '0d2f11cf8c',
                              'thumbnail': 'https://mcusercontent.com/1bce3f41b7ce6d507ec899ef2/template-screens/ed4be2ffd2909f60bc3343642e578f90_3121_screen.png',
                              'share_url': '', 'content_type': 'html', '_links': [
                {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/templates/3121', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/Response.json'},
                {'rel': 'parent', 'href': 'https://us21.api.mailchimp.com/3.0/templates', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Templates/Collection.json'},
                {'rel': 'delete', 'href': 'https://us21.api.mailchimp.com/3.0/templates/3121', 'method': 'DELETE'},
                {'rel': 'default-content', 'href': 'https://us21.api.mailchimp.com/3.0/templates/3121/default-content',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Templates/Default-Content/Response.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Templates/Collection.json'}]},
                     'status_code': 200}
        update_template_folder_mock.return_value = responses
        url = reverse('mailchimp_templates-update-template-folder', kwargs={"pk": "c4559ffd73"})
        data = {
            "name": "string"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['_links'], responses['text']['_links'])
        update_template_folder_mock.assert_called_once()

    def test_update_template_folder_with_empty_data(self):
        url = reverse('mailchimp_templates-update-template-folder', kwargs={"pk": "c4559ffd73"})
        data = {}
        name_error_message = 'This field is required.'
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['name'][0], name_error_message)


class MailchimpCampaignTestCase(APITestCase):

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.list_campaigns')
    def test_list_campaigns(self, list_campaigns_mock):
        responses = {'text': {'campaigns': [
            {'id': '2d14a7a055', 'web_id': 238700, 'type': 'regular', 'create_time': '2023-01-13T17:29:02+00:00',
             'archive_url': 'http://eepurl.com/iihz81',
             'long_archive_url': 'https://us21.campaign-archive.com/?u=1bce3f41b7ce6d507ec899ef2&id=2d14a7a055',
             'status': 'save', 'emails_sent': 0, 'send_time': '', 'content_type': 'template',
             'needs_block_refresh': False, 'resendable': False,
             'recipients': {'list_id': '', 'list_is_active': False, 'list_name': '', 'segment_text': '',
                            'recipient_count': 0},
             'settings': {'title': '', 'use_conversation': False, 'to_name': '', 'folder_id': '', 'authenticate': True,
                          'auto_footer': False, 'inline_css': False, 'auto_tweet': False, 'fb_comments': True,
                          'timewarp': False, 'template_id': 0, 'drag_and_drop': False},
             'tracking': {'opens': True, 'html_clicks': True, 'text_clicks': False, 'goal_tracking': False,
                          'ecomm360': False, 'google_analytics': '', 'clicktale': ''},
             'delivery_status': {'enabled': False}, '_links': [
                {'rel': 'parent', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Campaigns/Collection.json'},
                {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/2d14a7a055', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/Response.json'},
                {'rel': 'delete', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/2d14a7a055',
                 'method': 'DELETE'},
                {'rel': 'send', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/2d14a7a055/actions/send',
                 'method': 'POST'}, {'rel': 'cancel_send',
                                     'href': 'https://us21.api.mailchimp.com/3.0/campaigns/2d14a7a055/actions/cancel-send',
                                     'method': 'POST'},
                {'rel': 'feedback', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/2d14a7a055/feedback',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/Feedback/CollectionResponse.json'},
                {'rel': 'content', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/2d14a7a055/content',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/Content/Response.json'},
                {'rel': 'send_checklist',
                 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/2d14a7a055/send-checklist', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/Checklist/Response.json'},
                {'rel': 'pause', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/2d14a7a055/actions/pause',
                 'method': 'POST'},
                {'rel': 'resume', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/2d14a7a055/actions/resume',
                 'method': 'POST'}, {'rel': 'replicate',
                                     'href': 'https://us21.api.mailchimp.com/3.0/campaigns/2d14a7a055/actions/replicate',
                                     'method': 'POST'}, {'rel': 'create_resend',
                                                         'href': 'https://us21.api.mailchimp.com/3.0/campaigns/2d14a7a055/actions/create-resend',
                                                         'method': 'POST'}]},
            {'id': '6d9d221fb7', 'web_id': 238691, 'type': 'regular', 'create_time': '2023-01-13T16:58:43+00:00',
             'archive_url': 'http://eepurl.com/iihoRP',
             'long_archive_url': 'https://us21.campaign-archive.com/?u=1bce3f41b7ce6d507ec899ef2&id=6d9d221fb7',
             'status': 'save', 'emails_sent': 0, 'send_time': '', 'content_type': 'template',
             'needs_block_refresh': False, 'resendable': False,
             'recipients': {'list_id': '', 'list_is_active': False, 'list_name': '', 'segment_text': '',
                            'recipient_count': 0},
             'settings': {'title': '', 'use_conversation': False, 'to_name': '', 'folder_id': '', 'authenticate': True,
                          'auto_footer': False, 'inline_css': False, 'auto_tweet': False, 'fb_comments': True,
                          'timewarp': False, 'template_id': 0, 'drag_and_drop': False},
             'tracking': {'opens': True, 'html_clicks': True, 'text_clicks': False, 'goal_tracking': False,
                          'ecomm360': False, 'google_analytics': '', 'clicktale': ''},
             'delivery_status': {'enabled': False}, '_links': [
                {'rel': 'parent', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Campaigns/Collection.json'},
                {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/6d9d221fb7', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/Response.json'},
                {'rel': 'delete', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/6d9d221fb7',
                 'method': 'DELETE'},
                {'rel': 'send', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/6d9d221fb7/actions/send',
                 'method': 'POST'}, {'rel': 'cancel_send',
                                     'href': 'https://us21.api.mailchimp.com/3.0/campaigns/6d9d221fb7/actions/cancel-send',
                                     'method': 'POST'},
                {'rel': 'feedback', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/6d9d221fb7/feedback',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/Feedback/CollectionResponse.json'},
                {'rel': 'content', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/6d9d221fb7/content',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/Content/Response.json'},
                {'rel': 'send_checklist',
                 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/6d9d221fb7/send-checklist', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/Checklist/Response.json'},
                {'rel': 'pause', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/6d9d221fb7/actions/pause',
                 'method': 'POST'},
                {'rel': 'resume', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/6d9d221fb7/actions/resume',
                 'method': 'POST'}, {'rel': 'replicate',
                                     'href': 'https://us21.api.mailchimp.com/3.0/campaigns/6d9d221fb7/actions/replicate',
                                     'method': 'POST'}, {'rel': 'create_resend',
                                                         'href': 'https://us21.api.mailchimp.com/3.0/campaigns/6d9d221fb7/actions/create-resend',
                                                         'method': 'POST'}]}], 'total_items': 2, '_links': [
            {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns', 'method': 'GET',
             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/CollectionResponse.json',
             'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Campaigns/Collection.json'},
            {'rel': 'create', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns', 'method': 'POST',
             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/Response.json',
             'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/POST.json'}]},
            'status_code': 200}
        list_campaigns_mock.return_value = responses
        url = reverse('mailchimp_campaigns-list-campaigns')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        list_campaigns_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.add_campaigns')
    def test_add_campaigns(self, add_campaigns_mock):
        responses = {'text': {'id': 'ecdd32d739', 'web_id': 238702, 'type': 'regular',
                              'create_time': '2023-01-13T17:40:42+00:00', 'archive_url': 'http://eepurl.com/iihEhr',
                              'long_archive_url': 'https://us21.campaign-archive.com/?u=1bce3f41b7ce6d507ec899ef2&id=ecdd32d739',
                              'status': 'save', 'emails_sent': 0, 'send_time': '', 'content_type': 'template',
                              'needs_block_refresh': False, 'resendable': False,
                              'recipients': {'list_id': '', 'list_is_active': False, 'list_name': '',
                                             'segment_text': '', 'recipient_count': 0},
                              'settings': {'title': '', 'use_conversation': False, 'to_name': '', 'folder_id': '',
                                           'authenticate': True, 'auto_footer': False, 'inline_css': False,
                                           'auto_tweet': False, 'fb_comments': True, 'timewarp': False,
                                           'template_id': 0, 'drag_and_drop': False},
                              'tracking': {'opens': True, 'html_clicks': True, 'text_clicks': False,
                                           'goal_tracking': False, 'ecomm360': False, 'google_analytics': '',
                                           'clicktale': ''}, 'delivery_status': {'enabled': False}, '_links': [
                {'rel': 'parent', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Campaigns/Collection.json'},
                {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/Response.json'},
                {'rel': 'delete', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739',
                 'method': 'DELETE'},
                {'rel': 'send', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/actions/send',
                 'method': 'POST'}, {'rel': 'cancel_send',
                                     'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/actions/cancel-send',
                                     'method': 'POST'},
                {'rel': 'feedback', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/feedback',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/Feedback/CollectionResponse.json'},
                {'rel': 'content', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/content',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/Content/Response.json'},
                {'rel': 'send_checklist',
                 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/send-checklist', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/Checklist/Response.json'},
                {'rel': 'pause', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/actions/pause',
                 'method': 'POST'},
                {'rel': 'resume', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/actions/resume',
                 'method': 'POST'}, {'rel': 'replicate',
                                     'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/actions/replicate',
                                     'method': 'POST'}, {'rel': 'create_resend',
                                                         'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/actions/create-resend',
                                                         'method': 'POST'}]}, 'status_code': 201}
        add_campaigns_mock.return_value = responses
        url = reverse('mailchimp_campaigns-add-campaigns')
        data = {
            "type": "string",
            "rss_opts": {
                "schedule": {
                    "hours": 0,
                    "daily_send": {
                        "sunday": 'true',
                        "monday": 'true',
                        "tuesday": 'true',
                        "wednesday": 'true',
                        "thursday": 'true',
                        "friday": 'true',
                        "saturday": 'true'
                    },
                    "weekly_send_day": "string",
                    "monthly_send_date": 0
                },
                "constrain_rss_img": 'true',
                "feed_url": "string",
                "frequency": "string"
            },
            "recipients": {
                "segment_opts": {
                    "saved_segment_id": 0,
                    "match": "string",
                    "conditions": [
                        "string"
                    ],
                    "prebuilt_segment_id": "string"
                },
                "list_id": "string"
            },
            "variate_settings": {
                "wait_time": 0,
                "test_size": [
                    "string"
                ],
                "subject_lines": [
                    "string"
                ],
                "send_times": [
                    "string"
                ],
                "from_names": [
                    "string"
                ],
                "reply_to_addresses": [
                    "string"
                ],
                "winner_criteria": "string"
            },
            "settings": {
                "subject_line": "string",
                "preview_text": "string",
                "title": "string",
                "from_name": "string",
                "reply_to": "string",
                "use_conversation": 'true',
                "to_name": "string",
                "folder_id": "string",
                "authenticate": 'true',
                "auto_footer": 'true',
                "inline_css": 'true',
                "auto_tweet": 'true',
                "auto_fb_post": [
                    "string"
                ],
                "fb_comments": 'true',
                "template_id": 0
            },
            "tracking": {
                "opens": 'true',
                "html_clicks": 'true',
                "text_clicks": 'true',
                "ecomm360": 'true',
                "google_analytics": "string",
                "clicktale": "string"
            },
            "social_card": {
                "image_url": "string",
                "description": "string",
                "title": "string"
            },
            "content_type": "string"
        }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        add_campaigns_mock.assert_called_once()

    def test_add_campaigns_with_empty_data(self):
        url = reverse('mailchimp_campaigns-add-campaigns')
        data = {}
        type_error_message = 'This field is required.'
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['type'][0], type_error_message)

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.get_campaign_info')
    def test_get_campaign_info(self, get_campaign_info_mock):
        responses = {'text': {'id': '2d14a7a055', 'web_id': 238700, 'type': 'regular',
                              'create_time': '2023-01-13T17:29:02+00:00', 'archive_url': 'http://eepurl.com/iihz81',
                              'long_archive_url': 'https://us21.campaign-archive.com/?u=1bce3f41b7ce6d507ec899ef2&id=2d14a7a055',
                              'status': 'save', 'emails_sent': 0, 'send_time': '', 'content_type': 'template',
                              'needs_block_refresh': False, 'resendable': False,
                              'recipients': {'list_id': '', 'list_is_active': False, 'list_name': '',
                                             'segment_text': '', 'recipient_count': 0},
                              'settings': {'title': '', 'use_conversation': False, 'to_name': '', 'folder_id': '',
                                           'authenticate': True, 'auto_footer': False, 'inline_css': False,
                                           'auto_tweet': False, 'fb_comments': True, 'timewarp': False,
                                           'template_id': 0, 'drag_and_drop': False},
                              'tracking': {'opens': True, 'html_clicks': True, 'text_clicks': False,
                                           'goal_tracking': False, 'ecomm360': False, 'google_analytics': '',
                                           'clicktale': ''}, 'delivery_status': {'enabled': False}, '_links': [
                {'rel': 'parent', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Campaigns/Collection.json'},
                {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/2d14a7a055', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/Response.json'},
                {'rel': 'delete', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/2d14a7a055',
                 'method': 'DELETE'},
                {'rel': 'send', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/2d14a7a055/actions/send',
                 'method': 'POST'}, {'rel': 'cancel_send',
                                     'href': 'https://us21.api.mailchimp.com/3.0/campaigns/2d14a7a055/actions/cancel-send',
                                     'method': 'POST'},
                {'rel': 'feedback', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/2d14a7a055/feedback',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/Feedback/CollectionResponse.json'},
                {'rel': 'content', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/2d14a7a055/content',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/Content/Response.json'},
                {'rel': 'send_checklist',
                 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/2d14a7a055/send-checklist', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/Checklist/Response.json'},
                {'rel': 'pause', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/2d14a7a055/actions/pause',
                 'method': 'POST'},
                {'rel': 'resume', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/2d14a7a055/actions/resume',
                 'method': 'POST'}, {'rel': 'replicate',
                                     'href': 'https://us21.api.mailchimp.com/3.0/campaigns/2d14a7a055/actions/replicate',
                                     'method': 'POST'}, {'rel': 'create_resend',
                                                         'href': 'https://us21.api.mailchimp.com/3.0/campaigns/2d14a7a055/actions/create-resend',
                                                         'method': 'POST'}]}, 'status_code': 200}
        get_campaign_info_mock.return_value = responses
        url = reverse('mailchimp_campaigns-get-campaign-info', kwargs={"pk": "c4559ffd73"})
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        get_campaign_info_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.get_campaign_info')
    def test_get_campaign_info_with_invalid_id(self, get_campaign_info_mock):
        responses = {
            'text': '{"type":"https://mailchimp.com/developer/marketing/docs/errors/","title":"Resource Not Found","status":404,"detail":"The requested resource could not be found.","instance":"95a43092-e3fd-ad53-0e28-2cf8a2d90925"}',
            'status_code': 404}
        get_campaign_info_mock.return_value = responses
        url = reverse('mailchimp_campaigns-get-campaign-info', kwargs={"pk": "c4559ffd73"})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        get_campaign_info_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.delete_campaign')
    def test_delete_campaign(self, delete_campaign_mock):
        responses = {"status_code": 204}
        delete_campaign_mock.return_value = responses
        url = reverse('mailchimp_campaigns-delete-campaign', kwargs={"pk": "c4559ffd73"})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        delete_campaign_mock.assert_called_once()

    @mock.patch(
        'modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.update_campaign_settings')
    def test_update_campaign_settings(self, update_campaign_settings_mock):
        responses = {'text': {'id': 'ecdd32d739', 'web_id': 238702, 'type': 'regular',
                              'create_time': '2023-01-13T17:40:42+00:00', 'archive_url': 'http://eepurl.com/iihEhr',
                              'long_archive_url': 'https://us21.campaign-archive.com/?u=1bce3f41b7ce6d507ec899ef2&id=ecdd32d739',
                              'status': 'save', 'emails_sent': 0, 'send_time': '', 'content_type': 'template',
                              'needs_block_refresh': False, 'resendable': False,
                              'recipients': {'list_id': '', 'list_is_active': False, 'list_name': '',
                                             'segment_text': '', 'recipient_count': 0},
                              'settings': {'title': '', 'use_conversation': False, 'to_name': '', 'folder_id': '',
                                           'authenticate': True, 'auto_footer': False, 'inline_css': False,
                                           'auto_tweet': False, 'fb_comments': True, 'timewarp': False,
                                           'template_id': 0, 'drag_and_drop': False},
                              'tracking': {'opens': True, 'html_clicks': True, 'text_clicks': False,
                                           'goal_tracking': False, 'ecomm360': False, 'google_analytics': '',
                                           'clicktale': ''}, 'delivery_status': {'enabled': False}, '_links': [
                {'rel': 'parent', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Campaigns/Collection.json'},
                {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/Response.json'},
                {'rel': 'delete', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739',
                 'method': 'DELETE'},
                {'rel': 'send', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/actions/send',
                 'method': 'POST'}, {'rel': 'cancel_send',
                                     'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/actions/cancel-send',
                                     'method': 'POST'},
                {'rel': 'feedback', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/feedback',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/Feedback/CollectionResponse.json'},
                {'rel': 'content', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/content',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/Content/Response.json'},
                {'rel': 'send_checklist',
                 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/send-checklist', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/Checklist/Response.json'},
                {'rel': 'pause', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/actions/pause',
                 'method': 'POST'},
                {'rel': 'resume', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/actions/resume',
                 'method': 'POST'}, {'rel': 'replicate',
                                     'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/actions/replicate',
                                     'method': 'POST'}, {'rel': 'create_resend',
                                                         'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/actions/create-resend',
                                                         'method': 'POST'}]}, 'status_code': 201}

        update_campaign_settings_mock.return_value = responses
        url = reverse('mailchimp_campaigns-update-campaign-settings', kwargs={"pk": "c4559ffd73"})
        data = {
            "recipients": {
                "segment_opts": {
                    "saved_segment_id": 0,
                    "match": "string",
                    "conditions": [
                        "string"
                    ],
                    "prebuilt_segment_id": "string"
                },
                "list_id": "string"
            },
            "settings": {
                "subject_line": "string",
                "preview_text": "string",
                "title": "string",
                "from_name": "string",
                "reply_to": "string",
                "use_conversation": 'true',
                "to_name": "string",
                "folder_id": "string",
                "authenticate": 'true',
                "auto_footer": 'true',
                "inline_css": 'true',
                "auto_tweet": 'true',
                "auto_fb_post": [
                    "string"
                ],
                "fb_comments": 'true',
                "template_id": 0
            },
            "rss_opts": {
                "schedule": {
                    "hours": 0,
                    "daily_send": {
                        "sunday": 'true',
                        "monday": 'true',
                        "tuesday": 'true',
                        "wednesday": 'true',
                        "thursday": 'true',
                        "friday": 'true',
                        "saturday": 'true'
                    },
                    "weekly_send_day": "string",
                    "monthly_send_date": 0
                },
                "constrain_rss_img": 'true',
                "feed_url": "string",
                "frequency": "string"
            },
            "variate_settings": {
                "wait_time": 0,
                "test_size": [
                    "string"
                ],
                "subject_lines": [
                    "string"
                ],
                "send_times": [
                    "string"
                ],
                "from_names": [
                    "string"
                ],
                "reply_to_addresses": [
                    "string"
                ],
                "winner_criteria": "string"
            },
            "tracking": {
                "opens": 'true',
                "html_clicks": 'true',
                "text_clicks": 'true',
                "ecomm360": 'true',
                "google_analytics": "string",
                "clicktale": "string"
            },
            "social_card": {
                "image_url": "string",
                "description": "string",
                "title": "string"
            }
        }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        update_campaign_settings_mock.assert_called_once()

    def test_update_campaign_settings_with_empty_data(self):
        url = reverse('mailchimp_campaigns-update-campaign-settings', kwargs={"pk": "c4559ffd73"})
        data = {}
        settings_error_message = 'This field is required.'
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['settings'][0], settings_error_message)

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.cancel_campaign')
    def test_cancel_campaign(self, cancel_campaign_mock):
        responses = {'text': {'id': 'ecdd32d739', 'web_id': 238702, 'type': 'regular',
                              'create_time': '2023-01-13T17:40:42+00:00', 'archive_url': 'http://eepurl.com/iihEhr',
                              'long_archive_url': 'https://us21.campaign-archive.com/?u=1bce3f41b7ce6d507ec899ef2&id=ecdd32d739',
                              'status': 'save', 'emails_sent': 0, 'send_time': '', 'content_type': 'template',
                              'needs_block_refresh': False, 'resendable': False,
                              'recipients': {'list_id': '', 'list_is_active': False, 'list_name': '',
                                             'segment_text': '', 'recipient_count': 0},
                              'settings': {'title': '', 'use_conversation': False, 'to_name': '', 'folder_id': '',
                                           'authenticate': True, 'auto_footer': False, 'inline_css': False,
                                           'auto_tweet': False, 'fb_comments': True, 'timewarp': False,
                                           'template_id': 0, 'drag_and_drop': False},
                              'tracking': {'opens': True, 'html_clicks': True, 'text_clicks': False,
                                           'goal_tracking': False, 'ecomm360': False, 'google_analytics': '',
                                           'clicktale': ''}, 'delivery_status': {'enabled': False}, '_links': [
                {'rel': 'parent', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Campaigns/Collection.json'},
                {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/Response.json'},
                {'rel': 'delete', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739',
                 'method': 'DELETE'},
                {'rel': 'send', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/actions/send',
                 'method': 'POST'}, {'rel': 'cancel_send',
                                     'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/actions/cancel-send',
                                     'method': 'POST'},
                {'rel': 'feedback', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/feedback',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/Feedback/CollectionResponse.json'},
                {'rel': 'content', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/content',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/Content/Response.json'},
                {'rel': 'send_checklist',
                 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/send-checklist', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/Checklist/Response.json'},
                {'rel': 'pause', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/actions/pause',
                 'method': 'POST'},
                {'rel': 'resume', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/actions/resume',
                 'method': 'POST'}, {'rel': 'replicate',
                                     'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/actions/replicate',
                                     'method': 'POST'}, {'rel': 'create_resend',
                                                         'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/actions/create-resend',
                                                         'method': 'POST'}]}, 'status_code': 201}

        cancel_campaign_mock.return_value = responses
        url = reverse('mailchimp_campaigns-cancel-campaign', kwargs={"pk": "c4559ffd73"})
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        cancel_campaign_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.cancel_campaign')
    def test_cancel_campaign_with_invalid_id(self, send_campaign_mock):
        responses = {
            'text': '{"type":"https://mailchimp.com/developer/marketing/docs/errors/","title":"Resource Not Found","status":404,"detail":"The requested resource could not be found.","instance":"95a43092-e3fd-ad53-0e28-2cf8a2d90925"}',
            'status_code': 404}

        send_campaign_mock.return_value = responses
        url = reverse('mailchimp_campaigns-cancel-campaign', kwargs={"pk": "c4559ffd73"})
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        send_campaign_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.send_campaign')
    def test_send_campaign(self, send_campaign_mock):
        responses = {'text': {'id': 'ecdd32d739', 'web_id': 238702, 'type': 'regular',
                              'create_time': '2023-01-13T17:40:42+00:00', 'archive_url': 'http://eepurl.com/iihEhr',
                              'long_archive_url': 'https://us21.campaign-archive.com/?u=1bce3f41b7ce6d507ec899ef2&id=ecdd32d739',
                              'status': 'save', 'emails_sent': 0, 'send_time': '', 'content_type': 'template',
                              'needs_block_refresh': False, 'resendable': False,
                              'recipients': {'list_id': '', 'list_is_active': False, 'list_name': '',
                                             'segment_text': '', 'recipient_count': 0},
                              'settings': {'title': '', 'use_conversation': False, 'to_name': '', 'folder_id': '',
                                           'authenticate': True, 'auto_footer': False, 'inline_css': False,
                                           'auto_tweet': False, 'fb_comments': True, 'timewarp': False,
                                           'template_id': 0, 'drag_and_drop': False},
                              'tracking': {'opens': True, 'html_clicks': True, 'text_clicks': False,
                                           'goal_tracking': False, 'ecomm360': False, 'google_analytics': '',
                                           'clicktale': ''}, 'delivery_status': {'enabled': False}, '_links': [
                {'rel': 'parent', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Campaigns/Collection.json'},
                {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/Response.json'},
                {'rel': 'delete', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739',
                 'method': 'DELETE'},
                {'rel': 'send', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/actions/send',
                 'method': 'POST'}, {'rel': 'cancel_send',
                                     'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/actions/cancel-send',
                                     'method': 'POST'},
                {'rel': 'feedback', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/feedback',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/Feedback/CollectionResponse.json'},
                {'rel': 'content', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/content',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/Content/Response.json'},
                {'rel': 'send_checklist',
                 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/send-checklist', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/Checklist/Response.json'},
                {'rel': 'pause', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/actions/pause',
                 'method': 'POST'},
                {'rel': 'resume', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/actions/resume',
                 'method': 'POST'}, {'rel': 'replicate',
                                     'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/actions/replicate',
                                     'method': 'POST'}, {'rel': 'create_resend',
                                                         'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/actions/create-resend',
                                                         'method': 'POST'}]}, 'status_code': 201}

        send_campaign_mock.return_value = responses
        url = reverse('mailchimp_campaigns-send-campaign', kwargs={"pk": "c4559ffd73"})
        data = {
            "schedule_time": "2023-01-13T15:12:37.780Z",
            "batch_delivery": {
                "batch_delay": 0,
                "batch_count": 0
            },
            "timewarp": 'true'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        send_campaign_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.send_campaign')
    def test_send_campaign_with_invalid_id(self, send_campaign_mock):
        responses = {
            'text': '{"type":"https://mailchimp.com/developer/marketing/docs/errors/","title":"Resource Not Found","status":404,"detail":"The requested resource could not be found.","instance":"95a43092-e3fd-ad53-0e28-2cf8a2d90925"}',
            'status_code': 404}

        send_campaign_mock.return_value = responses
        url = reverse('mailchimp_campaigns-send-campaign', kwargs={"pk": "c4559ffd73"})
        data = {
            "schedule_time": "2023-01-13T15:12:37.780Z",
            "batch_delivery": {
                "batch_delay": 0,
                "batch_count": 0
            },
            "timewarp": 'true'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        send_campaign_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.schedule_campaign')
    def test_schedule_campaign(self, schedule_campaign_mock):
        responses = {'text': {'id': 'ecdd32d739', 'web_id': 238702, 'type': 'regular',
                              'create_time': '2023-01-13T17:40:42+00:00', 'archive_url': 'http://eepurl.com/iihEhr',
                              'long_archive_url': 'https://us21.campaign-archive.com/?u=1bce3f41b7ce6d507ec899ef2&id=ecdd32d739',
                              'status': 'save', 'emails_sent': 0, 'send_time': '', 'content_type': 'template',
                              'needs_block_refresh': False, 'resendable': False,
                              'recipients': {'list_id': '', 'list_is_active': False, 'list_name': '',
                                             'segment_text': '', 'recipient_count': 0},
                              'settings': {'title': '', 'use_conversation': False, 'to_name': '', 'folder_id': '',
                                           'authenticate': True, 'auto_footer': False, 'inline_css': False,
                                           'auto_tweet': False, 'fb_comments': True, 'timewarp': False,
                                           'template_id': 0, 'drag_and_drop': False},
                              'tracking': {'opens': True, 'html_clicks': True, 'text_clicks': False,
                                           'goal_tracking': False, 'ecomm360': False, 'google_analytics': '',
                                           'clicktale': ''}, 'delivery_status': {'enabled': False}, '_links': [
                {'rel': 'parent', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Campaigns/Collection.json'},
                {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/Response.json'},
                {'rel': 'delete', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739',
                 'method': 'DELETE'},
                {'rel': 'send', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/actions/send',
                 'method': 'POST'}, {'rel': 'cancel_send',
                                     'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/actions/cancel-send',
                                     'method': 'POST'},
                {'rel': 'feedback', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/feedback',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/Feedback/CollectionResponse.json'},
                {'rel': 'content', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/content',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/Content/Response.json'},
                {'rel': 'send_checklist',
                 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/send-checklist', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/Checklist/Response.json'},
                {'rel': 'pause', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/actions/pause',
                 'method': 'POST'},
                {'rel': 'resume', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/actions/resume',
                 'method': 'POST'}, {'rel': 'replicate',
                                     'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/actions/replicate',
                                     'method': 'POST'}, {'rel': 'create_resend',
                                                         'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/actions/create-resend',
                                                         'method': 'POST'}]}, 'status_code': 201}

        schedule_campaign_mock.return_value = responses
        url = reverse('mailchimp_campaigns-schedule-campaign', kwargs={"pk": "c4559ffd73"})
        data = {
            "schedule_time": "2023-01-13T15:21:26.667Z",
            "batch_delivery": {
                "batch_delay": 0,
                "batch_count": 0
            },
            "timewarp": 'true'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        schedule_campaign_mock.assert_called_once()

    def test_schedule_campaign_with_empty_data(self):
        url = reverse('mailchimp_campaigns-schedule-campaign', kwargs={"pk": "c4559ffd73"})
        data = {}
        schedule_time_error_message = 'This field is required.'
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['schedule_time'][0], schedule_time_error_message)

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.unschedule_campaign')
    def test_unschedule_campaign(self, unschedule_campaign_mock):
        responses = {'text': {'id': 'ecdd32d739', 'web_id': 238702, 'type': 'regular',
                              'create_time': '2023-01-13T17:40:42+00:00', 'archive_url': 'http://eepurl.com/iihEhr',
                              'long_archive_url': 'https://us21.campaign-archive.com/?u=1bce3f41b7ce6d507ec899ef2&id=ecdd32d739',
                              'status': 'save', 'emails_sent': 0, 'send_time': '', 'content_type': 'template',
                              'needs_block_refresh': False, 'resendable': False,
                              'recipients': {'list_id': '', 'list_is_active': False, 'list_name': '',
                                             'segment_text': '', 'recipient_count': 0},
                              'settings': {'title': '', 'use_conversation': False, 'to_name': '', 'folder_id': '',
                                           'authenticate': True, 'auto_footer': False, 'inline_css': False,
                                           'auto_tweet': False, 'fb_comments': True, 'timewarp': False,
                                           'template_id': 0, 'drag_and_drop': False},
                              'tracking': {'opens': True, 'html_clicks': True, 'text_clicks': False,
                                           'goal_tracking': False, 'ecomm360': False, 'google_analytics': '',
                                           'clicktale': ''}, 'delivery_status': {'enabled': False}, '_links': [
                {'rel': 'parent', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Campaigns/Collection.json'},
                {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/Response.json'},
                {'rel': 'delete', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739',
                 'method': 'DELETE'},
                {'rel': 'send', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/actions/send',
                 'method': 'POST'}, {'rel': 'cancel_send',
                                     'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/actions/cancel-send',
                                     'method': 'POST'},
                {'rel': 'feedback', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/feedback',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/Feedback/CollectionResponse.json'},
                {'rel': 'content', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/content',
                 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/Content/Response.json'},
                {'rel': 'send_checklist',
                 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/send-checklist', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/Checklist/Response.json'},
                {'rel': 'pause', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/actions/pause',
                 'method': 'POST'},
                {'rel': 'resume', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/actions/resume',
                 'method': 'POST'}, {'rel': 'replicate',
                                     'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/actions/replicate',
                                     'method': 'POST'}, {'rel': 'create_resend',
                                                         'href': 'https://us21.api.mailchimp.com/3.0/campaigns/ecdd32d739/actions/create-resend',
                                                         'method': 'POST'}]}, 'status_code': 201}

        unschedule_campaign_mock.return_value = responses
        url = reverse('mailchimp_campaigns-unschedule-campaign', kwargs={"pk": "c4559ffd73"})
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        unschedule_campaign_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.unschedule_campaign')
    def test_unschedule_campaign_with_invalid_id(self, unschedule_campaign_mock):
        responses = {
            'text': '{"type":"https://mailchimp.com/developer/marketing/docs/errors/","title":"Resource Not Found","status":404,"detail":"The requested resource could not be found.","instance":"95a43092-e3fd-ad53-0e28-2cf8a2d90925"}',
            'status_code': 404}

        unschedule_campaign_mock.return_value = responses
        url = reverse('mailchimp_campaigns-unschedule-campaign', kwargs={"pk": "c4559ffd73"})
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        unschedule_campaign_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.list_campaign_folder')
    def test_list_campaign_folder(self, list_campaign_folder_mock):
        responses = {'text': {'folders': [{'name': 'string', 'id': '7ced903626', 'count': 0, '_links': [
            {'rel': 'parent', 'href': 'https://us21.api.mailchimp.com/3.0/campaign-folders', 'method': 'GET',
             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/CampaignFolders/CollectionResponse.json',
             'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/CampaignFolders/Collection.json'},
            {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/campaign-folders/7ced903626', 'method': 'GET',
             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/CampaignFolders/Response.json'},
            {'rel': 'update', 'href': 'https://us21.api.mailchimp.com/3.0/campaign-folders/7ced903626',
             'method': 'PATCH',
             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/CampaignFolders/Response.json',
             'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/CampaignFolders/PATCH.json'},
            {'rel': 'delete', 'href': 'https://us21.api.mailchimp.com/3.0/campaign-folders/7ced903626',
             'method': 'DELETE'},
            {'rel': 'campaigns', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns?folder_id=7ced903626',
             'method': 'GET',
             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/CampaignFolders/Response.json'}]},
                                          {'name': 'string', 'id': '2af08ea984', 'count': 0, '_links': [
                                              {'rel': 'parent',
                                               'href': 'https://us21.api.mailchimp.com/3.0/campaign-folders',
                                               'method': 'GET',
                                               'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/CampaignFolders/CollectionResponse.json',
                                               'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/CampaignFolders/Collection.json'},
                                              {'rel': 'self',
                                               'href': 'https://us21.api.mailchimp.com/3.0/campaign-folders/2af08ea984',
                                               'method': 'GET',
                                               'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/CampaignFolders/Response.json'},
                                              {'rel': 'update',
                                               'href': 'https://us21.api.mailchimp.com/3.0/campaign-folders/2af08ea984',
                                               'method': 'PATCH',
                                               'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/CampaignFolders/Response.json',
                                               'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/CampaignFolders/PATCH.json'},
                                              {'rel': 'delete',
                                               'href': 'https://us21.api.mailchimp.com/3.0/campaign-folders/2af08ea984',
                                               'method': 'DELETE'}, {'rel': 'campaigns',
                                                                     'href': 'https://us21.api.mailchimp.com/3.0/campaigns?folder_id=2af08ea984',
                                                                     'method': 'GET',
                                                                     'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/CampaignFolders/Response.json'}]}],
                              'total_items': 2, '_links': [
                {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/campaign-folders', 'method': 'GET',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/CampaignFolders/CollectionResponse.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/CampaignFolders/Collection.json'},
                {'rel': 'create', 'href': 'https://us21.api.mailchimp.com/3.0/campaign-folders', 'method': 'POST',
                 'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/CampaignFolders/Response.json',
                 'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/CampaignFolders/POST.json'}]},
                     'status_code': 200}
        list_campaign_folder_mock.return_value = responses
        url = reverse('mailchimp_campaigns-list-campaign-folder')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        list_campaign_folder_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.add_campaign_folder')
    def test_add_campaign_folder(self, add_campaign_folder_mock):
        responses = {'text': {'name': 'stringd', 'id': '3303e39ff1', 'count': 0, '_links': [
            {'rel': 'parent', 'href': 'https://us21.api.mailchimp.com/3.0/campaign-folders', 'method': 'GET',
             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/CampaignFolders/CollectionResponse.json',
             'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/CampaignFolders/Collection.json'},
            {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/campaign-folders/3303e39ff1', 'method': 'GET',
             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/CampaignFolders/Response.json'},
            {'rel': 'update', 'href': 'https://us21.api.mailchimp.com/3.0/campaign-folders/3303e39ff1',
             'method': 'PATCH',
             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/CampaignFolders/Response.json',
             'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/CampaignFolders/PATCH.json'},
            {'rel': 'delete', 'href': 'https://us21.api.mailchimp.com/3.0/campaign-folders/3303e39ff1',
             'method': 'DELETE'},
            {'rel': 'campaigns', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns?folder_id=3303e39ff1',
             'method': 'GET',
             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/CampaignFolders/Response.json'}]},
                     'status_code': 201}
        add_campaign_folder_mock.return_value = responses
        url = reverse('mailchimp_campaigns-add-campaign-folder')
        data = {
            "name": "string"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        add_campaign_folder_mock.assert_called_once()

    def test_add_campaign_folder_with_empty_data(self):
        url = reverse('mailchimp_campaigns-add-campaign-folder')
        data = {}
        name_error_message = 'This field is required.'
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['name'][0], name_error_message)

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.get_campaign_folder')
    def test_get_campaign_folder(self, get_campaign_folder_mock):
        responses = {'text': {'name': 'stringd', 'id': '3303e39ff1', 'count': 0, '_links': [
            {'rel': 'parent', 'href': 'https://us21.api.mailchimp.com/3.0/campaign-folders', 'method': 'GET',
             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/CampaignFolders/CollectionResponse.json',
             'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/CampaignFolders/Collection.json'},
            {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/campaign-folders/3303e39ff1', 'method': 'GET',
             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/CampaignFolders/Response.json'},
            {'rel': 'update', 'href': 'https://us21.api.mailchimp.com/3.0/campaign-folders/3303e39ff1',
             'method': 'PATCH',
             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/CampaignFolders/Response.json',
             'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/CampaignFolders/PATCH.json'},
            {'rel': 'delete', 'href': 'https://us21.api.mailchimp.com/3.0/campaign-folders/3303e39ff1',
             'method': 'DELETE'},
            {'rel': 'campaigns', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns?folder_id=3303e39ff1',
             'method': 'GET',
             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/CampaignFolders/Response.json'}]},
                     'status_code': 200}
        get_campaign_folder_mock.return_value = responses
        url = reverse('mailchimp_campaigns-get-campaign-folder', kwargs={"pk": "c4559ffd73"})
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        get_campaign_folder_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.get_campaign_folder')
    def test_get_campaign_folder_with_invalid_folder_id(self, get_campaign_folder_mock):
        responses = {
            'text': '{"type":"https://mailchimp.com/developer/marketing/docs/errors/","title":"Resource Not Found","status":404,"detail":"The requested resource could not be found.","instance":"95a43092-e3fd-ad53-0e28-2cf8a2d90925"}',
            'status_code': 404}
        get_campaign_folder_mock.return_value = responses
        url = reverse('mailchimp_campaigns-get-campaign-folder', kwargs={"pk": "c4559ffd73"})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        get_campaign_folder_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.delete_campaign_folder')
    def test_delete_campaign_folder(self, delete_campaign_folder_mock):
        responses = {'status_code': 204}
        delete_campaign_folder_mock.return_value = responses
        url = reverse('mailchimp_campaigns-delete-campaign-folder', kwargs={"pk": "c4559ffd73"})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        delete_campaign_folder_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.update_campaign_folder')
    def test_update_campaign_folder(self, update_campaign_folder_mock):
        responses = {'text': {'name': 'stringd', 'id': '3303e39ff1', 'count': 0, '_links': [
            {'rel': 'parent', 'href': 'https://us21.api.mailchimp.com/3.0/campaign-folders', 'method': 'GET',
             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/CampaignFolders/CollectionResponse.json',
             'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/CampaignFolders/Collection.json'},
            {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/campaign-folders/3303e39ff1', 'method': 'GET',
             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/CampaignFolders/Response.json'},
            {'rel': 'update', 'href': 'https://us21.api.mailchimp.com/3.0/campaign-folders/3303e39ff1',
             'method': 'PATCH',
             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/CampaignFolders/Response.json',
             'schema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/CampaignFolders/PATCH.json'},
            {'rel': 'delete', 'href': 'https://us21.api.mailchimp.com/3.0/campaign-folders/3303e39ff1',
             'method': 'DELETE'},
            {'rel': 'campaigns', 'href': 'https://us21.api.mailchimp.com/3.0/campaigns?folder_id=3303e39ff1',
             'method': 'GET',
             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/CampaignFolders/Response.json'}]},
                     'status_code': 200}

        update_campaign_folder_mock.return_value = responses
        url = reverse('mailchimp_campaigns-update-campaign-folder', kwargs={"pk": "c4559ffd73"})
        data = {
            "name": "string"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        update_campaign_folder_mock.assert_called_once()

    def test_update_campaign_folder_with_empty_data(self):
        url = reverse('mailchimp_campaigns-update-campaign-folder', kwargs={"pk": "c4559ffd73"})
        data = {}
        name_error_message = 'This field is required.'
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['name'][0], name_error_message)


class MailchimpReportsTestCase(APITestCase):

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.list_campaign_reports')
    def test_list_campaign_report(self, list_campaign_reports_mock):
        responses = {'text': {'reports': [], 'total_items': 0, '_links': [
            {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/reports', 'method': 'GET',
             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Reports/CollectionResponse.json',
             'schema': 'https://us21.api.mailchimp.com/schema/3.0/Paths/Reports/Collection.json'}]}, 'status_code': 200}
        list_campaign_reports_mock.return_value = responses
        url = reverse('mailchimp_campaign_reports-list-campaign-report')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        list_campaign_reports_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.get_campaign_report')
    def test_get_campaign_report(self, get_campaign_report_mock):
        responses = {'status_code': 200}
        get_campaign_report_mock.return_value = responses
        url = reverse('mailchimp_campaign_reports-get-campaign-report', kwargs={"pk": "c4559ffd73"})
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        get_campaign_report_mock.assert_called_once()

    @mock.patch('modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.get_campaign_report')
    def test_get_campaign_report_with_invalid_id(self, get_campaign_report_mock):
        responses = {
            'text': '{"type":"https://mailchimp.com/developer/marketing/docs/errors/","title":"Resource Not Found","status":404,"detail":"The requested resource could not be found.","instance":"95a43092-e3fd-ad53-0e28-2cf8a2d90925"}',
            'status_code': 404}
        get_campaign_report_mock.return_value = responses
        url = reverse('mailchimp_campaign_reports-get-campaign-report', kwargs={"pk": "c4559ffd73"})
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        get_campaign_report_mock.assert_called_once()

    @mock.patch(
        'modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.get_campaign_abuse_reports')
    def test_get_campaign_abuse_reports(self, get_campaign_abuse_reports_mock):
        responses = {'text': {'abuse_reports': [], 'campaign_id': 'ecdd32d739', 'total_items': 0, '_links': [
            {'rel': 'parent', 'href': 'https://us21.api.mailchimp.com/3.0/reports/ecdd32d739', 'method': 'GET',
             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Reports/Response.json'},
            {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/reports/ecdd32d739/abuse-reports',
             'method': 'GET',
             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Reports/Abuse/CollectionResponse.json'}]},
                     'status_code': 200}
        get_campaign_abuse_reports_mock.return_value = responses
        url = reverse('mailchimp_campaign_reports-get-campaign-abuse-reports', kwargs={"pk": "ecdd32d739"})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        get_campaign_abuse_reports_mock.assert_called_once()

    @mock.patch(
        'modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.get_campaign_abuse_reports')
    def test_get_campaign_abuse_reports_with_invalid_campaign_id(self, get_campaign_abuse_reports_mock):
        responses = {
            'text': '{"type":"https://mailchimp.com/developer/marketing/docs/errors/","title":"Resource Not Found","status":404,"detail":"The requested resource could not be found.","instance":"95a43092-e3fd-ad53-0e28-2cf8a2d90925"}',
            'status_code': 404}
        get_campaign_abuse_reports_mock.return_value = responses
        url = reverse('mailchimp_campaign_reports-get-campaign-abuse-reports', kwargs={"pk": "ecdd32d739"})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        get_campaign_abuse_reports_mock.assert_called_once()

    @mock.patch(
        'modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.get_campaign_abuse_report')
    def test_get_campaign_abuse_report(self, get_campaign_abuse_report_mock):
        responses = {'status_code': 200}
        get_campaign_abuse_report_mock.return_value = responses
        url = reverse('mailchimp_campaign_reports-get-campaign-abuse-report',
                      kwargs={"pk": "c4559ffd73", "report_id": "4438843u"})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        get_campaign_abuse_report_mock.assert_called_once()

    @mock.patch(
        'modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.get_campaign_abuse_report')
    def test_get_campaign_abuse_report_with_invalid_id(self, get_campaign_abuse_report_mock):
        responses = {
            'text': '{"type":"https://mailchimp.com/developer/marketing/docs/errors/","title":"Resource Not Found","status":404,"detail":"The requested resource could not be found.","instance":"95a43092-e3fd-ad53-0e28-2cf8a2d90925"}',
            'status_code': 404}
        get_campaign_abuse_report_mock.return_value = responses
        url = reverse('mailchimp_campaign_reports-get-campaign-abuse-report',
                      kwargs={"pk": "c4559ffd73", "report_id": "4438843u"})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        get_campaign_abuse_report_mock.assert_called_once()

    @mock.patch(
        'modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.get_campaign_open_details')
    def test_get_campaign_open_details(self, get_campaign_open_details_mock):
        responses = {'text': {'members': [], 'campaign_id': 'ecdd32d739', 'total_opens': 0, 'total_items': 0,
                              '_links': [
                                  {'rel': 'parent', 'href': 'https://us21.api.mailchimp.com/3.0/reports/ecdd32d739/',
                                   'method': 'GET',
                                   'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/Response.json'},
                                  {'rel': 'self',
                                   'href': 'https://us21.api.mailchimp.com/3.0/reports/ecdd32d739/open-details',
                                   'method': 'GET',
                                   'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Reports/ClickDetails/CollectionResponse.json'}]},
                     'status_code': 200}
        get_campaign_open_details_mock.return_value = responses
        url = reverse('mailchimp_campaign_reports-get-campaign-open-details', kwargs={"pk": "ecdd32d739"})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        get_campaign_open_details_mock.assert_called_once()

    @mock.patch(
        'modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.get_campaign_open_details')
    def test_get_campaign_open_details_with_invalid_id(self, get_campaign_open_details_mock):
        responses = {
            'text': '{"type":"https://mailchimp.com/developer/marketing/docs/errors/","title":"Resource Not Found","status":404,"detail":"The requested resource could not be found.","instance":"95a43092-e3fd-ad53-0e28-2cf8a2d90925"}',
            'status_code': 404}
        get_campaign_open_details_mock.return_value = responses
        url = reverse('mailchimp_campaign_reports-get-campaign-open-details', kwargs={"pk": "ecdd32d739"})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        get_campaign_open_details_mock.assert_called_once()

    @mock.patch(
        'modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.get_campaign_click_details')
    def test_get_campaign_click_details(self, get_campaign_click_details_mock):
        responses = {'text': {'urls_clicked': [], 'campaign_id': 'ecdd32d739', 'total_items': 0, '_links': [
            {'rel': 'parent', 'href': 'https://us21.api.mailchimp.com/3.0/reports/ecdd32d739/', 'method': 'GET',
             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Campaigns/Response.json'},
            {'rel': 'self', 'href': 'https://us21.api.mailchimp.com/3.0/reports/ecdd32d739/click-details',
             'method': 'GET',
             'targetSchema': 'https://us21.api.mailchimp.com/schema/3.0/Definitions/Reports/ClickDetails/CollectionResponse.json'}]},
                     'status_code': 200}
        get_campaign_click_details_mock.return_value = responses
        url = reverse('mailchimp_campaign_reports-get-campaign-click-details', kwargs={"pk": "ecdd32d739"})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        get_campaign_click_details_mock.assert_called_once()

    @mock.patch(
        'modules.django_mailchimp.mailchimp.services.MailchimpService.MailchimpService.get_campaign_click_details')
    def test_get_campaign_click_details_with_invalid_id(self, get_campaign_click_details_mock):
        responses = {
            'text': '{"type":"https://mailchimp.com/developer/marketing/docs/errors/","title":"Resource Not Found","status":404,"detail":"The requested resource could not be found.","instance":"95a43092-e3fd-ad53-0e28-2cf8a2d90925"}',
            'status_code': 404}
        get_campaign_click_details_mock.return_value = responses
        url = reverse('mailchimp_campaign_reports-get-campaign-click-details', kwargs={"pk": "ecdd32d739"})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        get_campaign_click_details_mock.assert_called_once()