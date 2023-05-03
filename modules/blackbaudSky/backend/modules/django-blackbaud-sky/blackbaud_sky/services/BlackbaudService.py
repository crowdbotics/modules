import requests
import json


class BlackbaudBase:
    def __init__(self, base_url, grant_type, redirect_url, client_id, client_secret, access_token, Bb_Api_Subscription_Key):
        self.BLACKBAUD_BASE_URL = base_url
        self.BLACKBAUD_GRANT_TYPE = grant_type
        self.BLACKBAUD_REDIRECT_URL = redirect_url
        self.BLACKBAUD_CLIENT_ID = client_id
        self.BLACKBAUD_CLIENT_SECRET = client_secret
        self.BLACKBAUD_ACCESS_TOKEN = access_token
        self.BB_API_SUBSCRIPTION_KEY = Bb_Api_Subscription_Key

    def get_header(self, token):
        headers = {
            "Authorization": f"{token}",
            "Bb-Api-Subscription-Key": self.BB_API_SUBSCRIPTION_KEY
        }
        return headers
    
    def _get_token_api_call(self, request_type, url, headers=None, payload=None, data=None):
        try:
            response = requests.request(request_type, url, headers=headers, json=payload, data=data,
                                        auth=(self.BLACKBAUD_CLIENT_ID, self.BLACKBAUD_CLIENT_SECRET))
            response.raise_for_status()
            return {"data": response.json(), "status_code": response.status_code}
        except requests.exceptions.RequestException as e:
            return {"data": e.response.json(), "status_code": e.response.status_code}
        
    def _api_call(self, request_type, url, headers=None, payload=None, data=None):
        try:
            response = requests.request(request_type, url, headers=headers, json=payload, data=data)
            data = json.loads(response.text)
            return {"data": data, "status_code": response.status_code}
        except requests.exceptions.RequestException as e:
            return {"data": e.response.json(), "status_code": e.response.status_code}
        
        
class BlackbaudService(BlackbaudBase):

    def auth_token(self, code):
        try:
            url = 'https://oauth2.sky.blackbaud.com/token'
            payload = {
                "grant_type": self.BLACKBAUD_GRANT_TYPE,
                "redirect_uri": self.BLACKBAUD_REDIRECT_URL,
                "code": code
            }
            response = self._get_token_api_call(request_type="POST", url=url, data=payload)
            return response
        except Exception as e:
            return e
        
    def event_list(self, token):
        try:
            url = f'{self.BLACKBAUD_BASE_URL}/event/v1/eventlist'
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(token))
            return response
        except Exception as e:
            return e
        
    def consent_channels(self, token):
        try:
            url = f'{self.BLACKBAUD_BASE_URL}/commpref/v1/consent/channels'
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(token))
            return response
        except Exception as e:
            return e
        
    def constituents_list(self, token):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/constituents"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(token))
            return response
        except Exception as e:
            return e