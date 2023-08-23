import json
import os

import requests


class OktaBase:
    def __init__(self):
        self.OKTA_BASE_URL = os.getenv("OKTA_BASE_URL")
        self.OKTA_API_TOKEN = os.getenv("OKTA_API_TOKEN")
        if self.OKTA_BASE_URL and self.OKTA_API_TOKEN is None:
            raise ValueError("You should setup both `OKTA_BASE_URL` and `OKTA_API_TOKEN` in env vars")
        self.headers = self.get_header()

    def get_header(self):
        return {
            "Content-Type": "application/json",
            "Authorization": f"SSWS {self.OKTA_API_TOKEN}"
        }

    def _api_call(self, request_type, url_action, payload=None, data=None, params=None):
        try:
            response = requests.request(request_type, f"{self.OKTA_BASE_URL}{url_action}", headers=self.headers,
                                        json=payload,
                                        data=data, params=params)
            data = json.loads(response.text)
            return {"data": data, "status_code": response.status_code}
        except requests.exceptions.RequestException as e:
            return {"data": e.response.json(), "status_code": e.response.status_code}


class OktaService(OktaBase):

    def create_user(self, payload):
        try:
            response = self._api_call(request_type="POST", url_action="/users", payload=payload)
            return response
        except Exception as e:
            return e

    def login_user(self, payload):
        try:
            response = self._api_call(request_type="POST", url_action="/authn", payload=payload)
            return response
        except Exception as e:
            return e

    def logout_user(self, payload):
        try:
            response = self._api_call(request_type="POST", url_action="/authn/cancel", payload=payload)
            return response
        except Exception as e:
            return e
