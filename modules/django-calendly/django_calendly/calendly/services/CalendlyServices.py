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


class CalendlyService(CalendlyBase):

    def user_details(self):
        try:
            url = f'{self.CALENDLY_BASE_URL}/users/me'
            response = self._api_call(request_type="GET", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def event_types(self, organization, active, count):
        try:
            url = f'{self.CALENDLY_BASE_URL}/event_types?organization={organization}&active={active}&count={count}'
            response = self._api_call(request_type="GET", url=url, headers=self.get_header())
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

    def event_type_available_times(self, start_time, event_type, end_time):
        try:
            url = f'{self.CALENDLY_BASE_URL}/event_type_available_times?start_time={start_time}&event_type=' \
                  f'{event_type}&end_time={end_time}'
            response = self._api_call(request_type="GET", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def user_busy_times(self, start_time, event_type, end_time):
        try:
            url = f'{self.CALENDLY_BASE_URL}/user_busy_times?start_time={start_time}&event_type=' \
                  f'{event_type}&end_time={end_time}'
            response = self._api_call(request_type="GET", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def user_availability_schedules(self, user):
        try:

            url = f'{self.CALENDLY_BASE_URL}/user_availability_schedules?user={user}'
            response = self._api_call(request_type="GET", url=url, headers=self.get_header())
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

    def organization_invitations_list(self, uuid):
        try:
            url = f'{self.CALENDLY_BASE_URL}/organizations/{uuid}/invitations'
            response = self._api_call(request_type="GET", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def invite_user_organizations(self, uuid, data):
        try:
            url = f'{self.CALENDLY_BASE_URL}/organizations/{uuid}/invitations'
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(), payload=data)
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

    def organization_membership_list(self, organization):
        try:
            url = f"{self.CALENDLY_BASE_URL}/organizations_memberships?organization={organization}"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header())
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

    def list_schedule_event_invitee(self, uuid):
        try:
            url = f"{self.CALENDLY_BASE_URL}/scheduled_events/{uuid}/invitees"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def scheduled_events_list(self, organization):
        try:
            url = f"{self.CALENDLY_BASE_URL}/scheduled_events?organization={organization}"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def single_event_schedule(self, uuid):
        try:
            url = f"{self.CALENDLY_BASE_URL}/scheduled_events{uuid}"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def cancel_schedule_event(self, uuid):
        try:
            url = f"{self.CALENDLY_BASE_URL}/scheduled_events/{uuid}/cancellation"
            response = self._api_call(request_type="POST", url=url, headers=self.get_header())
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

    def webhook_subscription_list(self, organization, scope):
        try:
            url = f"{self.CALENDLY_BASE_URL}/webhook_subscriptions?organization={organization}&scope={scope}"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header())
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
