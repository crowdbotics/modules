import json

import requests


class HubspotBase:
    def __init__(self, base_url, grant_type, redirect_url, client_id, client_secret, access_token):
        self.HUBSPOT_BASE_URL = base_url
        self.HUBSPOT_GRANT_TYPE = grant_type
        self.HUBSPOT_REDIRECT_URL = redirect_url
        self.HUBSPOT_CLIENT_ID = client_id
        self.HUBSPOT_CLIENT_SECRET = client_secret
        self.access_token = access_token


    def get_header(self):
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {self.access_token}',
        }
        return headers

    def _api_call(self, request_type, url, headers=None, payload=None, data=None):

        try:
            response = requests.request(request_type, url, headers=headers, json=payload, data=data)
            response.raise_for_status()
            if response.status_code == 204:
                return {"data": {"message": "Item deleted successfully."}, "status_code": response.status_code}
            return {"data": response.json(), "status_code": response.status_code}
        except requests.exceptions.RequestException as e:
            if e.response.status_code == 404:
                return {"data": {"message": "Resource not found"}, "status_code": e.response.status_code}
            return {"data": e.response.json(), "status_code": e.response.status_code}


class HubspotService(HubspotBase):

    def auth_token(self, code):
        try:
            url = f'{self.HUBSPOT_BASE_URL}/oauth/v1/token'
            payload = {
                "grant_type": self.HUBSPOT_GRANT_TYPE,
                "redirect_uri": self.HUBSPOT_REDIRECT_URL,
                "client_id": self.HUBSPOT_CLIENT_ID,
                "client_secret": self.HUBSPOT_CLIENT_SECRET,
                "code": code
            }
            response = self._api_call(request_type="POST", url=url, data=payload)
            return response
        except Exception as e:
            return e

    def deals_list(self):
        try:
            url = f'{self.HUBSPOT_BASE_URL}/crm/v4/objects/deals/'
            response = self._api_call(request_type="GET", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def create_deal(self, payload):
        try:
            url = f'{self.HUBSPOT_BASE_URL}/crm/v4/objects/deals/'
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(),
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def remove_deal(self, dealId):
        try:
            url = f'{self.HUBSPOT_BASE_URL}/crm/v4/objects/deals/{dealId}'
            response = self._api_call(request_type="DELETE", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def single_deal(self, dealId):
        try:
            url = f'{self.HUBSPOT_BASE_URL}/crm/v4/objects/deals/{dealId}'
            response = self._api_call(request_type="GET", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def ticket_list(self):
        try:
            url = f'{self.HUBSPOT_BASE_URL}/crm/v4/objects/tickets/'
            response = self._api_call(request_type="GET", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def create_ticket(self, payload):
        try:
            url = f'{self.HUBSPOT_BASE_URL}/crm/v4/objects/tickets/'
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(),
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def remove_ticket(self, ticketId):
        try:
            url = f'{self.HUBSPOT_BASE_URL}/crm/v4/objects/tickets/{ticketId}'
            response = self._api_call(request_type="DELETE", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def single_ticket(self, ticketId):
        try:
            url = f'{self.HUBSPOT_BASE_URL}/crm/v4/objects/tickets/{ticketId}'
            response = self._api_call(request_type="GET", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def create_ticket_association(self, payload):
        try:
            url = f"{self.HUBSPOT_BASE_URL}/crm/v4/objects/tickets/{payload['ticketId']}/associations/" \
                  f"{payload['toObjectType']}/{payload['toObjectId']}/"
            response = self._api_call(request_type="PUT", url=url, headers=self.get_header(),
                                      payload=payload['param'])
            return response
        except Exception as e:
            return e

    def ticket_association_list(self, params):
        try:
            url = f"{self.HUBSPOT_BASE_URL}/crm/v4/objects/tickets/{params['ticketId']}/associations/" \
                  f"{params['toObjectType']}/"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def contact_deals_association_list(self, params):
        try:
            url = f"{self.HUBSPOT_BASE_URL}/crm/v4/objects/contacts/{params['contactId']}/associations/deals"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def meeting_contact_association_list(self, params):
        try:
            url = f"{self.HUBSPOT_BASE_URL}/crm/v4/objects/meetings/{params['meetingId']}/associations/contacts/"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def create_event(self, payload):
        try:
            url = f'{self.HUBSPOT_BASE_URL}/marketing/v3/marketing-events/events/'
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(),
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def webhook(self, data):
        try:
            return data
        except Exception as e:
            return e
