import os

from slack_sdk.errors import SlackApiError
from slack_sdk import WebClient


class SlackService:

    def __init__(self, slack_token=None):
        self.conversation_record_limit = 100
        if not slack_token:
            slack_token = os.getenv("SLACK_BOT_TOKEN", "")
        self.slack_web_client = WebClient(token=slack_token)
        
    def send_message(self, message, channel_name):
        try:
            response = self.slack_web_client.chat_postMessage(text=message, channel=channel_name)
            return response
        except SlackApiError as e:
            return e.response

    def upload_file(self, file, message, channel_names):
        try:
            response = self.slack_web_client.files_upload(file=file, initial_comment=message, channels=channel_names)
            return response
        except SlackApiError as e:
            return e.response

    def create_channel(self, channel_name):
        try:
            response = self.slack_web_client.conversations_create(name=channel_name)
            return response
        except SlackApiError as e:
            return e.response

    def invite_user_to_channel(self, channel_id, user_id):
        try:
            response = self.slack_web_client.conversations_invite(channel=channel_id, users=user_id)
            return response
        except SlackApiError as e:
            return e.response

    def get_channel_id(self, channel_name):
        try:
            response = self.slack_web_client.conversations_list()
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
            response = self.slack_web_client.conversations_history(**payload)
            return response
        except SlackApiError as e:
            return e.response

    def archive_channel(self, channel_id):
        try:
            response = self.slack_web_client.conversations_archive(channel=channel_id)
            return response
        except SlackApiError as e:
            return e.response

