import requests
import json


class BlackbaudBase:
    def __init__(self, base_url, grant_type, redirect_url, client_id, client_secret, api_subscription_key):
        self.BLACKBAUD_BASE_URL = base_url
        self.BLACKBAUD_GRANT_TYPE = grant_type
        self.BLACKBAUD_REDIRECT_URL = redirect_url
        self.BLACKBAUD_CLIENT_ID = client_id
        self.BLACKBAUD_CLIENT_SECRET = client_secret
        self.API_SUBSCRIPTION_KEY = api_subscription_key

    def get_header(self, access_token):
        headers = {
            "Authorization": f"{access_token}",
            "Bb-Api-Subscription-Key": self.API_SUBSCRIPTION_KEY
        }
        return headers

    def _get_access_token_api_call(self, request_type, url, headers=None, payload=None, data=None):
        try:
            response = requests.request(request_type, url, headers=headers, json=payload, data=data,
                                        auth=(self.BLACKBAUD_CLIENT_ID, self.BLACKBAUD_CLIENT_SECRET))
            response.raise_for_status()
            return {"data": response.json(), "status_code": response.status_code}
        except requests.exceptions.RequestException as e:
            return {"data": e.response.json(), "status_code": e.response.status_code}

    def _api_call(self, request_type, url, headers=None, payload=None, data=None, params=None):
        try:
            response = requests.request(request_type, url, headers=headers, json=payload, data=data, params=params)
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
            response = self._get_access_token_api_call(request_type="POST", url=url, data=payload)
            return response
        except Exception as e:
            return e

    def event_list(self, access_token):
        try:
            url = f'{self.BLACKBAUD_BASE_URL}/event/v1/eventlist'
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def event_details(self, access_token, event_id):
        try:
            url = f'{self.BLACKBAUD_BASE_URL}/event/v1/events/{event_id}'
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def event_participants_list(self, access_token, event_id):
        try:
            url = f'{self.BLACKBAUD_BASE_URL}/event/v1/events/{event_id}/participants'
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def consent_channels(self, access_token):
        try:
            url = f'{self.BLACKBAUD_BASE_URL}/commpref/v1/consent/channels'
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def constituents_list(self, access_token):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/constituents"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def create_constituents(self, access_token, payload):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/constituents"
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(access_token),
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def convert_non_constituent_to_constituent(self, access_token, non_constituent_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/constituents/convert/{non_constituent_id}"
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def constituent_details_by_id(self, access_token, constituent_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/constituents/{constituent_id}"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def constituent_appeal_list(self, access_token, constituent_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/constituents/{constituent_id}/appeals"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def create_constituent_attachment(self, access_token, payload):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/constituents/attachments"
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(access_token),
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def delete_constituent_attachment(self, access_token, attachment_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/constituents/attachments/{attachment_id}"
            response = self._api_call(request_type="DELETE", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def constituent_attachment_list(self, access_token, constituent_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/constituents/{constituent_id}/attachments"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def constituent_code(self, access_token, payload):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/constituentcodes"
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(access_token),
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def delete_constituent_code(self, access_token, constituent_code_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/constituentcodes/{constituent_code_id}"
            response = self._api_call(request_type="DELETE", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def constituent_code_details(self, access_token, constituent_code_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/constituents/constituentcodes/{constituent_code_id}"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def constituent_code_list(self, access_token):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/constituents/constituentcodes"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def constituent_code_list_in_constituent(self, access_token, constituent_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/constituents/{constituent_id}/constituentcodes"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def constituent_custom_fields(self, access_token, payload):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/constituents/customfields"
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(access_token),
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def constituent_custom_field_categories(self, access_token):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/constituents/customfields/categories"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def constituent_custom_field_categories_details(self, access_token):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/constituents/customfields/categories/details"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def constituent_custom_field_categories_values(self, access_token, category_name):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/constituents/customfields/categories/values"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token),
                                      params={"category_name": category_name})
            return response
        except Exception as e:
            return e

    def constituent_custom_field_collection(self, access_token, constituent_id, payload):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/constituents/{constituent_id}/customfieldcollection"
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(access_token),
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def constituent_custom_field_list(self, access_token):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/constituents/customfields"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def constituent_custom_field_list_in_single_constituent(self, access_token, constituent_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/constituents/{constituent_id}/customfields"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def constituent_countries(self, access_token):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/countries"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def constituent_currencyconfiguration(self, access_token):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/currencyconfiguration"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def constituents_address_list(self, access_token):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/addresses"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def constituents_education_list(self, access_token):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/educations"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e