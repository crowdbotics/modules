import requests


class HubspotBase:
    def __init__(self, base_url, grant_type, redirect_url, client_id, client_secret, access_token):
        self.HUBSPOT_BASE_URL = base_url
        self.HUBSPOT_GRANT_TYPE = grant_type
        self.HUBSPOT_REDIRECT_URL = redirect_url
        self.HUBSPOT_CLIENT_ID = client_id
        self.HUBSPOT_CLIENT_SECRET = client_secret
        self.access_token = access_token

    
    def get_auth_token(self, code):
        try:
            url = f'{self.HUBSPOT_BASE_URL}/oauth/v1/token'
            payload = {
                "grant_type": self.HUBSPOT_GRANT_TYPE,
                "redirect_uri": self.HUBSPOT_REDIRECT_URL,
                "client_id": self.HUBSPOT_CLIENT_ID,
                "client_secret": self.HUBSPOT_CLIENT_SECRET,
                "code": code
            }

            response = requests.post(url, data=payload)
            if response.status_code == 200:
                return response.json()
            return None
        except Exception as e:
            return e.body.decode('utf8')

    def get_header(self):
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {self.access_token}',
        }
        return headers

    def _api_call(self, request_type, url, headers=None, payload=None):

        response = requests.request(request_type, url, headers=headers, data=payload)
        if 200 <= response.status_code <= 300:
            return {"data": response.json(), "status_code": response.status_code, "success": True}
        return {"data": response.content, "status_code": response.status_code, "success": False}


class HubspotService(HubspotBase):

    def deals_list(self):
        try:
            url = f'{self.HUBSPOT_BASE_URL}/crm/v4/objects/deals/'
            response = self._api_call(request_type="GET", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return {'success': False, 'Message': e.body.decode('utf8')}


        