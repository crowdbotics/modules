import base64
import os

import requests


class CalendlyBase:
    def __init__(self):
        self.CALENDLY_BASE_URL = os.getenv('CALENDLY_BASE_URL')
        self.ACCESS_TOKEN = os.getenv('CALENDLY_ACCESS_TOKEN', "")
        self.CALENDLY_CLIENT_ID = os.getenv('CALENDLY_CLIENT_ID')
        self.CALENDLY_CLIENT_SECRET = os.getenv('CALENDLY_CLIENT_SECRET')
        if self.CALENDLY_BASE_URL is None or self.CALENDLY_CLIENT_ID is None or self.CALENDLY_CLIENT_SECRET is None:
            raise ValueError(
                "You should setup `CALENDLY_BASE_URL`, `CALENDLY_CLIENT_ID`, and `CALENDLY_CLIENT_SECRET` in env vars")
        self.headers = self.get_header()

    def get_header(self):
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {self.ACCESS_TOKEN}',
        }
        return headers

    def _api_call(self, request_type, url_action, headers=None, payload=None, params=None):
        try:
            response = requests.request(request_type, f"{self.CALENDLY_BASE_URL}{url_action}", headers=headers,
                                        json=payload, params=params)
            response.raise_for_status()
            if response.status_code == 204:
                return {"data": {"message": "Item deleted successfully."}, "status_code": response.status_code}
            return {"data": response.json(), "status_code": response.status_code}
        except requests.exceptions.RequestException as e:
            if e.response.status_code == 404:
                return {"data": {"message": "Resource not found"}, "status_code": e.response.status_code}
            return {"data": e.response.json(), "status_code": e.response.status_code}

    # @staticmethod
    def convert_into_base64(self):
        token = self.CALENDLY_CLIENT_ID + ':' + self.CALENDLY_CLIENT_SECRET
        byte_token = base64.b64encode(bytes(token, 'utf-8'))
        return byte_token.decode('utf-8')

    def token_api_call(self, payload=None):
        try:
            header = {
                'Content-Type': 'application/x-www-form-urlencoded',
                "Authorization": f'Basic {self.convert_into_base64()}',
            }
            response = requests.post(url="https://auth.calendly.com/oauth/token", headers=header,
                                     data=payload)
            response.raise_for_status()
            return {"data": response.json(), "status_code": response.status_code}
        except requests.exceptions.RequestException as e:
            return {"data": e.response.json(), "status_code": e.response.status_code}


class CalendlyService(CalendlyBase):

    def create_access_token(self, payload):
        try:
            response = self.token_api_call(payload=payload)
            return response
        except Exception as e:
            return e

    def user_details(self, params):
        try:
            response = self._api_call(request_type="GET", url_action=f"/users/{params}", headers=self.headers)
            return response
        except Exception as e:
            return e

    def event_types(self, query_params):
        try:
            response = self._api_call(request_type="GET", url_action="/event_types", headers=self.headers,
                                      params=query_params)
            return response
        except Exception as e:
            return e

    def single_event_types(self, uuid):
        try:
            response = self._api_call(request_type="GET", url_action=f"/event_types/{uuid}", headers=self.headers)
            return response
        except Exception as e:
            return e

    def event_type_available_times(self, query_params):
        try:
            response = self._api_call(request_type="GET", url_action="/event_type_available_times",
                                      headers=self.headers, params=query_params)
            return response
        except Exception as e:
            return e

    def user_busy_times(self, query_params):
        try:
            response = self._api_call(request_type="GET", url_action="/user_busy_times", headers=self.headers,
                                      params=query_params)
            return response
        except Exception as e:
            return e

    def user_availability_schedules_list(self, query_params):
        try:
            response = self._api_call(request_type="GET", url_action="/user_availability_schedules",
                                      headers=self.headers, params=query_params)
            return response
        except Exception as e:
            return e

    def single_user_availability_schedules(self, uuid):
        try:
            response = self._api_call(request_type="GET", url_action=f"/user_availability_schedules/{uuid}",
                                      headers=self.headers)
            return response
        except Exception as e:
            return e

    def remove_invitees(self, payload):
        try:
            response = self._api_call(request_type="POST", url_action="/data_compliance/deletion/invitees",
                                      headers=self.headers, payload=payload)
            return response
        except Exception as e:
            return e

    def organization_invitations_list(self, uuid, query_params):
        try:
            response = self._api_call(request_type="GET", url_action=f"/organizations/{uuid}/invitations",
                                      headers=self.headers, params=query_params)
            return response
        except Exception as e:
            return e

    def invite_user_organizations(self, uuid, payload):
        try:
            response = self._api_call(request_type="POST", url_action=f"/organizations/{uuid}/invitations",
                                      headers=self.headers, payload=payload)
            return response
        except Exception as e:
            return e

    def revoke_user_organization_invitation(self, org_uuid, uuid):
        try:
            response = self._api_call(request_type="DELETE", url_action=f"/organizations/{org_uuid}/invitations/{uuid}",
                                      headers=self.headers)
            return response
        except Exception as e:
            return e

    def single_organization_invitation(self, org_uuid, uuid):
        try:
            response = self._api_call(request_type="GET", url_action=f"/organizations/{org_uuid}/invitations/{uuid}",
                                      headers=self.headers)
            return response
        except Exception as e:
            return e

    def organization_membership(self, uuid):
        try:
            url = f"{self.CALENDLY_BASE_URL}/organizations_memberships/{uuid}"
            response = self._api_call(request_type="GET", url_action=f"/organizations_memberships/{uuid}",
                                      headers=self.headers)
            return response
        except Exception as e:
            return e

    def organization_memberships_list(self, query_params):
        try:
            response = self._api_call(request_type="GET", url_action="/organizations_memberships", headers=self.headers,
                                      params=query_params)
            return response
        except Exception as e:
            return e

    def remove_user_organization_membership(self, uuid):
        try:
            response = self._api_call(request_type="DELETE", url_action=f"/organizations_memberships/{uuid}",
                                      headers=self.headers)
            return response
        except Exception as e:
            return e

    def scheduled_event_invitees(self, uuid, query_params):
        try:
            response = self._api_call(request_type="GET", url_action=f"/scheduled_events/{uuid}/invitees",
                                      headers=self.headers, params=query_params)
            return response
        except Exception as e:
            return e

    def scheduled_events_list(self, query_params):
        try:
            response = self._api_call(request_type="GET", url_action="/scheduled_events", headers=self.headers,
                                      params=query_params)
            return response
        except Exception as e:
            return e

    def single_scheduled_event(self, uuid):
        try:
            response = self._api_call(request_type="GET", url_action=f"/scheduled_events{uuid}", headers=self.headers)
            return response
        except Exception as e:
            return e

    def cancel_scheduled_event(self, uuid, payload):
        try:
            response = self._api_call(request_type="POST", url_action=f"/scheduled_events/{uuid}/cancellation",
                                      headers=self.headers, payload=payload)
            return response
        except Exception as e:
            return e

    def create_invitee_no_show(self, payload):
        try:
            response = self._api_call(request_type="POST", url_action="/invitee_no_shows", headers=self.headers,
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def single_invitee_no_show(self, uuid):
        try:
            response = self._api_call(request_type="GET", url_action=f"/invitee_no_shows/{uuid}", headers=self.headers)
            return response
        except Exception as e:
            return e

    def remove_invitee_no_show(self, uuid):
        try:
            response = self._api_call(request_type="DELETE", url_action=f"/invitee_no_shows/{uuid}",
                                      headers=self.headers)
            return response
        except Exception as e:
            return e

    def create_webhook_subscription(self, payload):
        try:
            response = self._api_call(request_type="POST", url_action="/webhook_subscriptions", headers=self.headers,
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def webhook_subscription_list(self, query_params):
        try:
            response = self._api_call(request_type="GET", url_action="/webhook_subscriptions", headers=self.headers,
                                      params=query_params)
            return response
        except Exception as e:
            return e

    def single_webhook_subscription(self, uuid):
        try:
            response = self._api_call(request_type="GET", url_action=f"/webhook_subscriptions{uuid}",
                                      headers=self.headers)
            return response
        except Exception as e:
            return e

    def remove_webhook_subscription(self, uuid):
        try:
            response = self._api_call(request_type="DELETE", url_action=f"/webhook_subscriptions{uuid}",
                                      headers=self.headers)
            return response
        except Exception as e:
            return e

    def webhook(self):
        try:
            print("User has scheduled, rescheduled or cancelled an event.")
            response = {"message": 'User has scheduled, rescheduled or cancelled an event.'}
            return response
        except Exception as e:
            return e
