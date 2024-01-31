import requests

class MailchimpClient:
    def __init__(self, api_key, server):
        self.api_key = api_key
        self.server = server
        self.base_url = f"https://{server}.api.mailchimp.com/3.0/"

    def get_lists(self):
        response = requests.get(
            f"{self.base_url}lists",
            auth=("apikey", self.api_key)
        )
        return response.json()

    def create_campaign(self, list_id, from_email, subject, content):
        data = {
            "type": "regular",
            "recipients": {"list_id": list_id},
            "settings": {
                "subject_line": subject,
                "from_name": "My Company",
                "reply_to": from_email,
                "template_id": 100
            }
        }
        response = requests.post(
            f"{self.base_url}campaigns",
            auth=("apikey", self.api_key),
            json=data
        )
        campaign_id = response.json()['id']

        content_data = {"html": content}
        requests.put(
            f"{self.base_url}campaigns/{campaign_id}/content",
            auth=("apikey", self.api_key),
            json=content_data
        )

        return campaign_id