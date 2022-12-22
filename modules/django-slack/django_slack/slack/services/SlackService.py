from django.conf import settings

from slack_sdk.errors import SlackApiError
from slack_sdk import WebClient


class SlackService:

    def __init__(self, slack_token=None):
        if not slack_token:
            slack_token = settings.env.str("SLACK_BOT_TOKEN", "")
        self.slack_token = WebClient(token=slack_token)
        
    def send_message(self, message, channel_name):
        try:
            response = self.slack_token.chat_postMessage(text=message, channel=channel_name)
            return response
        except SlackApiError as e:
            return e.response

    def upload_file(self, file, message, channel_names):
        try:
            response = self.slack_token.files_upload(file=file, initial_comment=message, channels=channel_names)
            return response
        except SlackApiError as e:
            return e.response

    def create_channel(self, channel_name):
        try:
            response = self.slack_token.conversations_create(name=channel_name)
            return response
        except SlackApiError as e:
            return e.response

    def invite_user_to_channel(self, channel_id, user_id):
        try:
            response = self.slack_token.conversations_invite(channel=channel_id, users=user_id)
            return response
        except SlackApiError as e:
            return e.response

    def get_channel_id(self, channel_name):
        try:
            response = self.slack_token.conversations_list()
            for channel in response.data['channels']:
                if channel['name'] == channel_name:
                    return channel['id']
            return None
        except SlackApiError as e:
            return e.response