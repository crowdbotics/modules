import os

from slack_sdk.errors import SlackApiError
from slack_sdk import WebClient
from django.utils.text import slugify

class SlackService:

    def __init__(self, slack_bot_token=None, slack_admin_token=None):
        self.conversation_record_limit = 100
        if not slack_bot_token:
            slack_bot_token = os.getenv("SLACK_BOT_TOKEN", "")
        if not slack_admin_token:
            slack_admin_token = os.getenv("SLACK_ADMIN_TOKEN", "")
        self.slack_bot_client = WebClient(token=slack_bot_token)
        self.slack_admin_client = WebClient(token=slack_admin_token)
        self.invite_limit = os.getenv("INVITE_LIMIT", 1)
        self.iterative_invites = os.getenv("ITERATIVE_INVITES", False)

        
    def send_message(self, message, channel_name):
        try:
            response = self.slack_bot_client.chat_postMessage(text=message, channel=channel_name)
            return response
        except SlackApiError as e:
            return e.response

    def upload_file(self, file, message, channel_names):
        try:
            response = self.slack_bot_client.files_upload(file=file, initial_comment=message, channels=channel_names)
            return response
        except SlackApiError as e:
            return e.response

    def create_channel(self, channel_name):
        try:
            channel_name_slug = slugify(channel_name)
            response = self.slack_bot_client.conversations_create(name=channel_name_slug)
            return response
        except SlackApiError as e:
            return e.response

    def create_channel_with_users(self, channel_name, emails):
        try:
            channel_name_slug = slugify(channel_name)
            conv_response = self.slack_bot_client.conversations_create(
                name=channel_name_slug
            )
            if conv_response.status_code == 200:
                channel_id = conv_response.data.get('channel', {}).get('id', None)
                if channel_id:
                    response = self.invite_user_to_channel(
                        channel_id=channel_id, 
                        emails=emails.split(',')
                    )
            return response
        except SlackApiError as e:
            return e.response


    def invite_user_to_channel(self, emails, channel_id=None, channel_name=None):
        try:
            if channel_id is None and channel_name is not None:
                channel_id, status_code = self.get_channel_id(channel_name)
                if status_code == 404:
                    return channel_id
            if self.iterative_invites:
                for email in emails:
                    response = self.slack_bot_client.conversations_inviteShared(channel=channel_id, emails=email)
            else:
                response = self.slack_bot_client.conversations_inviteShared(channel=channel_id, emails=emails[:self.invite_limit])
            return response
        except SlackApiError as e:
            return e.response

    def get_channel_id(self, channel_name):
        try:
            response = self.slack_bot_client.conversations_list()
            for channel in response.data['channels']:
                if channel['name'] == channel_name:
                    return channel['id'], response.status_code
            return None, 404
        except SlackApiError as e:
            return e.response, None

    def get_channel_history(self, channel_id, limit, cursor):
        try:
            payload = {"channel": channel_id, "limit": limit or self.conversation_record_limit}
            if cursor:
                payload["cursor"] = cursor
            response = self.slack_bot_client.conversations_history(**payload)
            return response
        except SlackApiError as e:
            return e.response

    def archive_channel(self, channel_id):
        try:
            response = self.slack_bot_client.conversations_archive(channel=channel_id)
            return response
        except SlackApiError as e:
            return e.response

    def get_users_list(self):
        try:
            response = self.slack_bot_client.users_list()
            return response
        except SlackApiError as e:
            return e.response

