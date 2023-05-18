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
            if request_type == 'DELETE':
                response = requests.request(request_type, url, headers=headers, json=payload, data=data, params=params)
                return {"data": 'Deleted successfully.', "status_code": response.status_code}
             
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

    def constituents_education_list(self, access_token):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/educations"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def constituent_create_document(self, access_token, payload):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/documents"
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(access_token), payload=payload)
            return response
        except Exception as e:
            return e

    def constituent_create_education(self, access_token, payload):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/educations"
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(access_token), payload=payload)
            return response
        except Exception as e:
            return e

    def constituent_delete_education(self, access_token, education_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/educations/{education_id}"
            response = self._api_call(request_type="DELETE", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def constituent_get_education_record(self, access_token, education_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/constituents/educations/{education_id}"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def constituent_create_education_custom_field(self, access_token, payload):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/educations/customfields"
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(access_token), payload=payload)
            return response
        except Exception as e:
            return e

    def constituent_delete_education_custom_field(self, access_token, custom_field_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/educations/customfields/{custom_field_id}"
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def constituent_get_education_custom_field_categories(self, access_token):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/educations/customfields/categories/details"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def constituent_get_custom_field_list_in_education(self, access_token, education_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/educations/{education_id}/customfields"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def constituent_get_education_degrees(self, access_token):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/educations/degrees"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def constituent_get_single_education_list(self, access_token, constituent_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/constituents/{constituent_id}/educations"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def constituent_get_education_schools(self, access_token):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/educations/schools"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def constituent_get_education_statuses(self, access_token):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/educations/statuses"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def constituent_get_education_subjects(self, access_token):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/educations/subjects"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def constituent_get_education_types(self, access_token):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/educations/types"
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

    def constituents_create_address(self, access_token, payload):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/addresses"
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(access_token), payload=payload)
            return response
        except Exception as e:
            return e

    def constituents_get_address_details(self, access_token, address_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/constituents/addresses/{address_id}"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def constituents_delete_address_details(self, access_token, address_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/addresses/{address_id}"
            response = self._api_call(request_type="DELETE", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def constituents_get_address_list(self, access_token, constituent_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/constituents/{constituent_id}/addresses"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def constituents_get_address_types(self, access_token):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/addresstypes"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def constituents_create_aliases(self, access_token, payload):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/aliases"
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(access_token), payload=payload)
            return response
        except Exception as e:
            return e

    def constituents_delete_alias(self, access_token, alias_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/aliases/{alias_id}"
            response = self._api_call(request_type="DELETE", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def constituents_create_alias_collection(self, access_token, constituent_id, payload):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/constituents/{constituent_id}/aliascollection"
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(access_token), payload=payload)
            return response
        except Exception as e:
            return e
        
    
    def event_participant(self, access_token, participant_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/event/v1/participants/{participant_id}"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def event_attachment(self, access_token, event_id, attachment_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/event/v1/events/{event_id}/attachments/{attachment_id}"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def event_attachment_tags(self, access_token):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/event/v1/eventattachmenttags"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def event_attachment_list(self, access_token, event_id, attachment_tag=None):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/event/v1/events/{event_id}/attachments"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token),
                                      params={"attachment_tag": attachment_tag})
            return response
        except Exception as e:
            return e

    def event_categories(self, access_token, include_inactive=None):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/event/v1/eventcategories"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token),
                                      params={"include_inactive": include_inactive})
            return response
        except Exception as e:
            return e

    def event_fees(self, access_token, event_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/event/v1/events/{event_id}/eventfees"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def event_participant_options(self, access_token, event_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/event/v1/events/{event_id}/eventparticipantoptions"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def event_participant_donations(self, access_token, participant_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/event/v1/participants/{participant_id}/donations"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def event_participant_fee_payments(self, access_token, participant_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/event/v1/participants/{participant_id}/feepayments"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def event_participant_fees(self, access_token, participant_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/event/v1/participants/{participant_id}/fees"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def participant_options(self, access_token, participant_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/event/v1/participants/{participant_id}/participantoptions"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def participant_levels(self, access_token, include_inactive=None):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/event/v1/participationlevels"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token),
                                      params={"include_inactive": include_inactive})
            return response
        except Exception as e:
            return e

    def delete_event_participant(self, access_token, participant_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/event/v1/participants/{participant_id}"
            response = self._api_call(request_type="DELETE", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e
