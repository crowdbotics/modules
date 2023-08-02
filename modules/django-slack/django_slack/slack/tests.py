from unittest import mock

from PIL import Image
from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from six import BytesIO

from .serializers import MessageSerializer, FileSerializer, ChannelSerializer, InviteUserToChannelSerializer


class DotDict(dict):
    """dot.notation access to dictionary attributes"""
    __getattr__ = dict.get
    __setattr__ = dict.__setitem__
    __delattr__ = dict.__delitem__


class SlackTestCases(APITestCase):
    @mock.patch('modules.django_slack.slack.services.SlackService.SlackService.send_message')
    def test_send_message(self, send_message_mock):
        responses = {"data": {'ok': True, 'channel': 'C04N6465UV6', 'ts': '1675243746.528969',
                              'message': {'bot_id': 'B04G7HC8DUM', 'type': 'message', 'text': 'hi hello',
                                          'user': 'U04GP509WRF', 'ts': '1675243746.528969', 'app_id': 'A04GCUHSBU4',
                                          'blocks': [{'type': 'rich_text', 'block_id': 'nv3TE', 'elements': [
                                              {'type': 'rich_text_section',
                                               'elements': [{'type': 'text', 'text': 'hi hello'}]}]}],
                                          'team': 'T04FVU3NCEB',
                                          'bot_profile': {'id': 'B04G7HC8DUM', 'app_id': 'A04GCUHSBU4',
                                                          'name': 'test-app', 'icons': {
                                                  'image_72': 'https://a.slack-edge.com/80588/img/plugins/app/service_72.png'},
                                                          'deleted': False, 'updated': 1671695019,
                                                          'team_id': 'T04FVU3NCEB'}}}}
        dict_response = DotDict(responses)
        send_message_mock.return_value = dict_response
        url = reverse('slack_service-send-message')
        data = {
            "message": "hi hello",
            "channel_name": "test_channel"
        }
        serializer = MessageSerializer(data=data)
        response = self.client.post(url, data=data, format='json')
        self.assertEqual(serializer.is_valid(), True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['channel'], responses['data']['channel'])
        send_message_mock.assert_called_once()

    @mock.patch('modules.django_slack.slack.services.SlackService.SlackService.upload_file')
    def test_upload_file(self, upload_file_mock):
        responses = {'data': {'ok': True, 'file': {'id': 'F04N7C0SRNC', 'created': 1675249623, 'timestamp': 1675249623,
                                                   'name': 'Uploaded file', 'title': 'Uploaded file',
                                                   'mimetype': 'application/pdf', 'filetype': 'pdf',
                                                   'pretty_type': 'PDF', 'user': 'U04GM5Z6ZU6',
                                                   'user_team': 'T04GD6S7GRM', 'editable': False, 'size': 13264,
                                                   'mode': 'hosted', 'is_external': False, 'external_type': '',
                                                   'is_public': True, 'public_url_shared': False,
                                                   'display_as_bot': False, 'username': '',
                                                   'url_private': 'https://files.slack.com/files-pri/T04GD6S7GRM-F04N7C0SRNC/uploaded_file',
                                                   'url_private_download': 'https://files.slack.com/files-pri/T04GD6S7GRM-F04N7C0SRNC/download/uploaded_file',
                                                   'thumb_pdf': 'https://files.slack.com/files-tmb/T04GD6S7GRM-F04N7C0SRNC-bcb0231d34/uploaded_file_thumb_pdf.png',
                                                   'thumb_pdf_w': 909, 'thumb_pdf_h': 1286,
                                                   'permalink': 'https://demoworkspace-muv4542.slack.com/files/U04GM5Z6ZU6/F04N7C0SRNC/uploaded_file',
                                                   'permalink_public': 'https://slack-files.com/T04GD6S7GRM-F04N7C0SRNC-11b96dccba',
                                                   'shares': {'public': {
                                                       'C04N6BW0GAU': [
                                                           {'reply_users': [], 'reply_users_count': 0, 'reply_count': 0,
                                                            'ts': '1675249623.451619',
                                                            'channel_name': 'new-tests-channel',
                                                            'team_id': 'T04GD6S7GRM',
                                                            'share_user_id': 'U04GM5Z6ZU6'}]}},
                                                   'channels': ['C04N6BW0GAU'], 'groups': [],
                                                   'ims': [], 'has_more_shares': False, 'has_rich_preview': False,
                                                   'file_access': 'visible'}}}
        dict_response = DotDict(responses)
        upload_file_mock.return_value = dict_response
        url = reverse('slack_service-upload-file')
        image = BytesIO()
        Image.new('RGB', (100, 100)).save(image, 'JPEG')
        image.seek(0)
        image_1 = SimpleUploadedFile('cnic_image.png', image.getvalue())
        data = {
            "file": image_1,
            "message": "my new image",
            "channel_name": "new-tests-channel"
        }
        serializer = FileSerializer(data=data)
        response = self.client.post(url, data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(serializer.is_valid(), True)
        self.assertEqual(response.data['file']['id'], responses['data']['file']['id'])
        upload_file_mock.assert_called_once()

    @mock.patch('modules.django_slack.slack.services.SlackService.SlackService.create_channel_with_users')
    def test_create_channel(self, create_channel_with_users_mock):
        responses = {'ok': False, 'error': 'not_paid'}
        dict_response = DotDict(responses)
        create_channel_with_users_mock.return_value = dict_response
        url = reverse('slack_service-create-channel')
        data = {
            "channel_name": "new-tests-channels",
            "emails": "demo24gmail.com"
        }
        serializer = ChannelSerializer(data=data)
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(serializer.is_valid(), True)
        create_channel_with_users_mock.assert_called_once()

    @mock.patch('modules.django_slack.slack.services.SlackService.SlackService.invite_user_to_channel')
    def test_invite_user_to_channel(self, invite_user_to_channel_mock):
        responses = {'ok': False, 'error': 'not_paid'}
        dict_response = DotDict(responses)
        invite_user_to_channel_mock.return_value = dict_response
        url = reverse('slack_service-invite-user-to-channel')
        data = {
            "channel_id": "C04MWCB0VEV",
            "channel_name": "new-tests-channels",
            "emails": "demo24gmail.com"
        }
        serializer = InviteUserToChannelSerializer(data=data)
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(serializer.is_valid(), True)
        invite_user_to_channel_mock.assert_called_once()

    @mock.patch('modules.django_slack.slack.services.SlackService.SlackService.get_channel_id')
    def test_get_channel_id(self, get_channel_id_mock):
        responses = "C04MWCB0VEV", 200
        get_channel_id_mock.return_value = responses
        url = reverse('slack_service-get-channel-id', kwargs={'pk': 'new-tests-channels'})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['channel_id'], responses[0])
        get_channel_id_mock.assert_called_once()

    @mock.patch('modules.django_slack.slack.services.SlackService.SlackService.get_channel_history')
    def test_get_channel_history(self, get_channel_history_mock):
        responses = {'data': {'ok': True, 'messages': [{'type': 'message', 'text': 'asdsa', 'files': [
            {'id': 'F04N7C0SRNC', 'created': 1675249623, 'timestamp': 1675249623, 'name': 'Uploaded file',
             'title': 'Uploaded file', 'mimetype': 'application/pdf', 'filetype': 'pdf', 'pretty_type': 'PDF',
             'user': 'U04GM5Z6ZU6', 'user_team': 'T04GD6S7GRM', 'editable': False, 'size': 13264, 'mode': 'hosted',
             'url_private': 'https://files.slack.com/files-pri/T04GD6S7GRM-F04N7C0SRNC/uploaded_file',
             'url_private_download': 'https://files.slack.com/files-pri/T04GD6S7GRM-F04N7C0SRNC/download/uploaded_file',
             'thumb_pdf': 'https://files.slack.com/files-tmb/T04GD6S7GRM-F04N7C0SRNC-bcb0231d34/uploaded_file_thumb_pdf.png',
             'permalink': 'https://demoworkspace-muv4542.slack.com/files/U04GM5Z6ZU6/F04N7C0SRNC/uploaded_file',
             'has_rich_preview': False, 'file_access': 'visible', 'media_progress': None}], 'upload': True,
                                                        'user': 'U04GM5Z6ZU6', 'display_as_bot': False,
                                                        'ts': '1675249623.451619', 'blocks': [
                {'type': 'rich_text', 'block_id': 'iF6A',
                 'elements': [{'type': 'rich_text_section', 'elements': [{'type': 'text', 'text': 'asdsa'}]}]}]},
                                                       {'bot_id': 'B04GTL78GTV', 'type': 'message',
                                                        'text': 'Hi i m Bot', 'user': 'U04GM5Z6ZU6',
                                                        'ts': '1675241802.539529', 'app_id': 'A04GD6Y3MRV', 'blocks': [
                                                           {'type': 'rich_text', 'block_id': 'QtJUq', 'elements': [
                                                               {'type': 'rich_text_section', 'elements': [
                                                                   {'type': 'text', 'text': 'Hi i m Bot'}]}]}],
                                                        'team': 'T04GD6S7GRM',
                                                        'bot_profile': {'id': 'B04GTL78GTV', 'deleted': False,
                                                                        'name': 'Demo App', 'updated': 1672211264,
                                                                        'app_id': 'A04GD6Y3MRV', 'icons': {
                                                                'image_72': 'https://a.slack-edge.com/80588/img/plugins/app/service_72.png'},
                                                                        'team_id': 'T04GD6S7GRM'}},
                                                       {'type': 'message', 'subtype': 'channel_join',
                                                        'ts': '1675237953.286959', 'user': 'U04GM5Z6ZU6',
                                                        'text': '<@U04GM5Z6ZU6> has joined the channel'}],
                              'has_more': False, 'pin_count': 0, 'channel_actions_ts': None,
                              'channel_actions_count': 0}}
        dict_response = DotDict(responses)
        get_channel_history_mock.return_value = dict_response
        url = reverse('slack_service-get-channel-history', kwargs={'pk': 'C04N6BW0GAU'})
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['messages'][0]['files'][0]['id'],
                         responses['data']['messages'][0]['files'][0]['id'])
        get_channel_history_mock.assert_called_once()

    @mock.patch('modules.django_slack.slack.services.SlackService.SlackService.archive_channel')
    def test_archive_channel(self, archive_channel_mock):
        responses = {'ok': True}
        dict_response = DotDict(responses)
        archive_channel_mock.return_value = dict_response
        url = reverse('slack_service-archive-channel', kwargs={'pk': 'C04N6BW0GAU'})
        response = self.client.post(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        archive_channel_mock.assert_called_once()

    @mock.patch('modules.django_slack.slack.services.SlackService.SlackService.get_users_list')
    def test_get_users_list(self, get_users_list_mock):
        responses = {'ok': True, 'members': [
            {'id': 'USLACKBOT', 'team_id': 'T04GD6S7GRM', 'name': 'slackbot', 'deleted': False, 'color': '757575',
             'real_name': 'Slackbot', 'tz': 'America/Los_Angeles', 'tz_label': 'Pacific Standard Time',
             'tz_offset': -28800, 'profile': {'title': '', 'phone': '', 'skype': '', 'real_name': 'Slackbot',
                                              'real_name_normalized': 'Slackbot', 'display_name': 'Slackbot',
                                              'display_name_normalized': 'Slackbot', 'fields': {}, 'status_text': '',
                                              'status_expiration': 0, 'avatar_hash': 'sv41d8cd98f0',
                                              'always_active': True, 'first_name': 'slackbot', 'last_name': '',
                                              'image_512': 'https://a.slack-edge.com/80588/img/slackbot_512.png',
                                              'status_text_canonical': '', 'team': 'T04GD6S7GRM'}, 'is_admin': False,
             'who_can_share_contact_card': 'EVERYONE'},
        ], 'cache_ts': 1675254818,
                     'response_metadata': {'next_cursor': ''}}
        dict_response = DotDict(responses)
        get_users_list_mock.return_value = dict_response
        url = reverse('slack_service-get-users')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        get_users_list_mock.assert_called_once()
