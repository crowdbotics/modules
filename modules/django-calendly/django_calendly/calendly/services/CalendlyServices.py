import requests


class CalendlyBase:
    def __init__(self, base_url, access_token):
        self.CALENDLY_BASE_URL = base_url
        self.access_token = access_token

    def get_header(self):
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {self.access_token}',
        }
        return headers

    def _api_call(self, request_type, url, headers=None, payload=None, params=None):
        try:
            response = requests.request(request_type, url, headers=headers, json=payload, params=params)
            response.raise_for_status()
            if response.status_code == 204:
                return {"data": {"message": "Item deleted successfully."}, "status_code": response.status_code}
            return {"data": response.json(), "status_code": response.status_code}
        except requests.exceptions.RequestException as e:
            if e.response.status_code == 404:
                return {"data": {"message": "Resource not found"}, "status_code": e.response.status_code}
            return {"data": e.response.json(), "status_code": e.response.status_code}


class CalendlyService(CalendlyBase):

    def user_details(self, params):
        try:
            url = f'{self.CALENDLY_BASE_URL}/users/{params}'
            response = self._api_call(request_type="GET", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def event_types(self, query_params):
        try:
            url = f'{self.CALENDLY_BASE_URL}/event_types'
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(), params=query_params)
            return response
        except Exception as e:
            return e

    def single_event_types(self, uuid):
        try:
            url = f'{self.CALENDLY_BASE_URL}/event_types/{uuid}'
            response = self._api_call(request_type="GET", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def event_type_available_times(self, query_params):
        try:
            url = f'{self.CALENDLY_BASE_URL}/event_type_available_times'
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(), params=query_params)
            return response
        except Exception as e:
            return e

    def user_busy_times(self, query_params):
        try:
            url = f'{self.CALENDLY_BASE_URL}/user_busy_times'
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(), params=query_params)
            return response
        except Exception as e:
            return e

    def user_availability_schedules_list(self, query_params):
        try:
            url = f'{self.CALENDLY_BASE_URL}/user_availability_schedules'
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(), params=query_params)
            return response
        except Exception as e:
            return e

    def single_user_availability_schedules(self, uuid):
        try:
            url = f'{self.CALENDLY_BASE_URL}/user_availability_schedules/{uuid}'
            response = self._api_call(request_type="GET", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def remove_invitees(self, payload):
        try:
            url = f'{self.CALENDLY_BASE_URL}/data_compliance/deletion/invitees'
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(), payload=payload)
            return response
        except Exception as e:
            return e

    def organization_invitations_list(self, uuid, query_params):
        try:
            url = f'{self.CALENDLY_BASE_URL}/organizations/{uuid}/invitations'
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(), params=query_params)
            return response
        except Exception as e:
            return e

    def invite_user_organizations(self, uuid, payload):
        try:
            url = f'{self.CALENDLY_BASE_URL}/organizations/{uuid}/invitations'
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(), payload=payload)
            return response
        except Exception as e:
            return e

    def revoke_user_organization_invitation(self, org_uuid, uuid):
        try:
            url = f"{self.CALENDLY_BASE_URL}/organizations/{org_uuid}/invitations/{uuid}"
            response = self._api_call(request_type="DELETE", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def single_organization_invitation(self, org_uuid, uuid):
        try:
            url = f"{self.CALENDLY_BASE_URL}/organizations/{org_uuid}/invitations/{uuid}"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def organization_membership(self, uuid):
        try:
            url = f"{self.CALENDLY_BASE_URL}/organizations_memberships/{uuid}"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def organization_memberships_list(self, query_params):
        try:
            url = f"{self.CALENDLY_BASE_URL}/organizations_memberships"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(), params=query_params)
            return response
        except Exception as e:
            return e

    def remove_user_organization_membership(self, uuid):
        try:
            url = f"{self.CALENDLY_BASE_URL}/organizations_memberships/{uuid}"
            response = self._api_call(request_type="DELETE", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def scheduled_event_invitees(self, uuid, query_params):
        try:
            url = f"{self.CALENDLY_BASE_URL}/scheduled_events/{uuid}/invitees"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(), params=query_params)
            return response
        except Exception as e:
            return e

    def scheduled_events_list(self, query_params):
        try:
            url = f"{self.CALENDLY_BASE_URL}/scheduled_events"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(), params=query_params)
            return response
        except Exception as e:
            return e

    def single_scheduled_event(self, uuid):
        try:
            url = f"{self.CALENDLY_BASE_URL}/scheduled_events{uuid}"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def cancel_scheduled_event(self, uuid, payload):
        try:
            url = f"{self.CALENDLY_BASE_URL}/scheduled_events/{uuid}/cancellation"
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(), payload=payload)
            return response
        except Exception as e:
            return e

    def create_invitee_no_show(self, payload):
        try:
            url = f"{self.CALENDLY_BASE_URL}/invitee_no_shows"
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(), payload=payload)
            return response
        except Exception as e:
            return e

    def single_invitee_no_show(self, uuid):
        try:
            url = f"{self.CALENDLY_BASE_URL}/invitee_no_shows/{uuid}"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def remove_invitee_no_show(self, uuid):
        try:
            url = f"{self.CALENDLY_BASE_URL}/invitee_no_shows/{uuid}"
            response = self._api_call(request_type="DELETE", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def create_webhook_subscription(self, payload):
        try:
            url = f"{self.CALENDLY_BASE_URL}/webhook_subscriptions"
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(), payload=payload)
            return response
        except Exception as e:
            return e

    def webhook_subscription_list(self, query_params):
        try:
            url = f"{self.CALENDLY_BASE_URL}/webhook_subscriptions"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(), params=query_params)
            return response
        except Exception as e:
            return e

    def single_webhook_subscription(self, uuid):
        try:
            url = f"{self.CALENDLY_BASE_URL}/webhook_subscriptions{uuid}"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def remove_webhook_subscription(self, uuid):
        try:
            url = f"{self.CALENDLY_BASE_URL}/webhook_subscriptions{uuid}"
            response = self._api_call(request_type="DELETE", url=url, headers=self.get_header())
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
