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
                return {"data": 'Deleted successfully.' if response.status_code == 200 else response.text,
                        "status_code": response.status_code}
            elif request_type == 'PATCH':
                response = requests.request(request_type, url, headers=headers, json=payload, data=data, params=params)
                return {"data": 'Updated successfully.' if response.status_code == 200 else response.text,
                        "status_code": response.status_code}

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

    def constituent_search(self, access_token, search):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/constituents/search"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token),
                                      params={"search_text": search})
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
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(access_token),
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def constituent_create_education(self, access_token, payload):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/educations"
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(access_token),
                                      payload=payload)
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
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(access_token),
                                      payload=payload)
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
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(access_token),
                                      payload=payload)
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
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(access_token),
                                      payload=payload)
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
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(access_token),
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def event_participant_details(self, access_token, participant_id):
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

    def delete_participant(self, access_token, participant_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/event/v1/participants/{participant_id}"
            response = self._api_call(request_type="DELETE", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def create_event_participants(self, access_token, event_id, payload):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/event/v1/events/{event_id}/participants"
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(access_token),
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def create_participant_for_attending_events(self, access_token, payload, event_id):
        constituents_id = None
        response = None
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/constituents/search?search_text={payload['constituent_data']['email']['address']}"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            constituents_id = response['data']['value'][0]['id']
        except:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/constituents"
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(access_token),
                                      payload=payload['constituent_data'])
            constituents_id = response['data']['id']
        finally:
            if constituents_id:
                payload['participant_data']['constituent_id'] = constituents_id
                url = f"{self.BLACKBAUD_BASE_URL}/event/v1/events/{event_id}/participants"
                response = self._api_call(request_type="POST", url=url, headers=self.get_header(access_token),
                                          payload=payload['participant_data'])
            return response

    def create_event_category(self, access_token, payload):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/event/v1/eventcategories"
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(access_token),
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def delete_event_category(self, access_token, event_category_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/event/v1/eventcategories/{event_category_id}"
            response = self._api_call(request_type="DELETE", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def create_an_event(self, access_token, payload):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/event/v1/events"
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(access_token),
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def delete_event(self, access_token, event_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/event/v1/events/{event_id}"
            response = self._api_call(request_type="DELETE", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def create_event_fee(self, access_token, event_id, payload):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/event/v1/events/{event_id}/eventfees"
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(access_token),
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def delete_event_fee(self, access_token, fee_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/event/v1/eventfees/{fee_id}"
            response = self._api_call(request_type="DELETE", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def create_gift(self, access_token, payload):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/gift/v1/gifts"
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(access_token),
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def delete_gift(self, access_token, gift_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/gift/v1/gifts/{gift_id}"
            response = self._api_call(request_type="DELETE", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def get_gift_detail(self, access_token, gift_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/gift/v1/gifts/{gift_id}"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def create_participant_donation(self, access_token, participant_id, payload):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/event/v1/participants/{participant_id}/donations"
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(access_token),
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def delete_participant_donation(self, access_token, participant_donation_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/event/v1/participantdonations/{participant_donation_id}"
            response = self._api_call(request_type="DELETE", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def create_participant_fees(self, access_token, participant_id, payload):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/event/v1/participants/{participant_id}/fees"
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(access_token),
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def delete_participant_fee(self, access_token, participant_fee_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/event/v1/participantfees/{participant_fee_id}"
            response = self._api_call(request_type="DELETE", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def create_participant_fee_payment(self, access_token, participant_id, payload):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/event/v1/participants/{participant_id}/feepayments"
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(access_token),
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def delete_participant_fee_payment(self, access_token, participant_fee_payment_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/event/v1/participantfeepayments/{participant_fee_payment_id}"
            response = self._api_call(request_type="DELETE", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def create_event_participant_option(self, access_token, event_id, payload):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/event/v1/events/{event_id}/eventparticipantoptions"
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(access_token),
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def delete_event_participant_option(self, access_token, option_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/event/v1/eventparticipantoptions/{option_id}"
            response = self._api_call(request_type="DELETE", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def create_participant_option(self, access_token, participant_id, payload):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/event/v1/participants/{participant_id}/participantoptions"
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(access_token),
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def delete_participant_option(self, access_token, option_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/event/v1/participantoptions/{option_id}"
            response = self._api_call(request_type="DELETE", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def create_participant_level(self, access_token, payload):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/event/v1/participationlevels"
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(access_token),
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def delete_participant_level(self, access_token, participation_level_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/event/v1/participationlevels/{participation_level_id}"
            response = self._api_call(request_type="DELETE", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def create_event_attachment_upload(self, access_token, payload):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/event/v1/eventattachmentupload"
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(access_token),
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def create_event_attachment(self, access_token, event_id, payload):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/event/v1/events/{event_id}/attachments"
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(access_token),
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def edit_event_participant_details(self, access_token, participant_id, payload):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/event/v1/participants/{participant_id}"
            response = self._api_call(request_type="PATCH", url=url, headers=self.get_header(access_token),
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def edit_event_participant_option(self, access_token, option_id, payload):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/event/v1/participantoptions/{option_id}"
            response = self._api_call(request_type="PATCH", url=url, headers=self.get_header(access_token),
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def edit_event_participant_level(self, access_token, participation_level_id, payload):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/event/v1/participationlevels/{participation_level_id}"
            response = self._api_call(request_type="PATCH", url=url, headers=self.get_header(access_token),
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def edit_event(self, access_token, event_id, payload):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/event/v1/events/{event_id}"
            response = self._api_call(request_type="PATCH", url=url, headers=self.get_header(access_token),
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def edit_event_category(self, access_token, event_category_id, payload):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/event/v1/eventcategories/{event_category_id}"
            response = self._api_call(request_type="PATCH", url=url, headers=self.get_header(access_token),
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def edit_event_fee(self, access_token, fee_id, payload):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/event/v1/eventfees/{fee_id}"
            response = self._api_call(request_type="PATCH", url=url, headers=self.get_header(access_token),
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def edit_participant_option(self, access_token, option_id, payload):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/event/v1/eventparticipantoptions/{option_id}"
            response = self._api_call(request_type="PATCH", url=url, headers=self.get_header(access_token),
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def constituent_titles(self, access_token):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/titles"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def constituent_suffixes(self, access_token):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/suffixes"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def create_constituent_relationships(self, access_token, payload):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/relationships"
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(access_token),
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def delete_constituent_relationships(self, access_token, relationship_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/relationships/{relationship_id}"
            response = self._api_call(request_type="DELETE", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def edit_constituent_relationships(self, access_token, relationship_id, payload):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/relationships/{relationship_id}"
            response = self._api_call(request_type="PATCH", url=url, headers=self.get_header(access_token),
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def constituent_relationships_details(self, access_token, relationship_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/constituents/relationships/{relationship_id}"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def relationships_list_in_all_constituent(self, access_token):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/relationships"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def relationships_list_in_single_constituent(self, access_token, constituent_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/constituents/{constituent_id}/relationships"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def relationship_types(self, access_token):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/relationshiptypes"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def constituent_create_rating(self, access_token, payload):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/ratings"
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(access_token),
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def delete_constituent_rating(self, access_token, rating_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/ratings/{rating_id}"
            response = self._api_call(request_type="DELETE", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def edit_constituent_rating(self, access_token, rating_id, payload):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/ratings/{rating_id}"
            response = self._api_call(request_type="PATCH", url=url, headers=self.get_header(access_token),
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def rating_categories(self, access_token):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/ratings/categories"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def rating_list_on_single_constituent(self, access_token, constituent_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/constituents/{constituent_id}/ratings"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def rating_source(self, access_token):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/ratings/sources"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def rating_values(self, access_token, category_name):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/ratings/categories/values"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token), params={"category_name": category_name})
            return response
        except Exception as e:
            return e
        
    def create_constituent_action(self, access_token, payload):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/actions"
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(access_token),
                                    payload=payload)
            return response
        except Exception as e:
            return e

    def delete_constituent_action(self, access_token, action_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/actions/{action_id}"
            response = self._api_call(request_type="DELETE", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def update_constituent_action(self, access_token, action_id, payload):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/actions/{action_id}"
            response = self._api_call(request_type="PATCH", url=url, headers=self.get_header(access_token),
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def get_constituent_action(self, access_token, action_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/actions/{action_id}"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def create_constituent_action_attachment(self, access_token, payload):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/actions/attachments"
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(access_token),
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def delete_constituent_action_attachment(self, access_token, attachment_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/actions/attachments/{attachment_id}"
            response = self._api_call(request_type="DELETE", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def patch_constituent_action_attachment(self, access_token, attachment_id, payload):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/actions/attachments/{attachment_id}"
            response = self._api_call(request_type="PATCH", url=url, headers=self.get_header(access_token),
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def get_constituent_action_attachment_list(self, access_token, action_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/actions/{action_id}/attachments"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def constituent_action_custom_fields(self, access_token, payload):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/actions/customfields"
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(access_token),
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def constituent_action_list(self, access_token):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/actions"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def constituent_action_list_in_single_constituent(self, access_token, constituent_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/constituents/{constituent_id}/actions"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def constituent_action_location(self, access_token):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/actionlocations"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def constituent_action_status_types(self, access_token):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/actionstatustypes"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def constituent_action_types(self, access_token):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/actiontypes"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def constituent_action_edit_address(self, access_token, address_id, payload):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/addresses/{address_id}"
            response = self._api_call(request_type="PATCH", url=url, headers=self.get_header(access_token),
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def constituent_edit_aliases(self, access_token, alias_id, payload):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/aliases/{alias_id}"
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(access_token),
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def alias_list_in_single_constituent(self, access_token, constituent_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/constituents/{constituent_id}/aliases"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def constituent_alias_types(self, access_token):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/aliastypes"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def constituent_attachment_tags(self, access_token):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/attachmenttags"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e
        
    def delete_constituent_action_custom(self, access_token, custom_field_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/actions/customfields/{custom_field_id}"
            response = self._api_call(request_type="DELETE", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def update_constituent_action_custom_field(self, access_token, custom_field_id, payload):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/actions/customfields/{custom_field_id}"
            response = self._api_call(request_type="PATCH", url=url, headers=self.get_header(access_token),
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def get_constituent_action_customfields_categories(self, access_token):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/actions/customfields/categories"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def get_constituent_action_customfields_categories_details(self, access_token):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/actions/customfields/categories/details"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e

    def get_constituent_action_customfields_list(self, access_token, action_id):
        try:
            url = f"{self.BLACKBAUD_BASE_URL}/constituent/v1/actions/{action_id}/customfields"
            response = self._api_call(request_type="GET", url=url, headers=self.get_header(access_token))
            return response
        except Exception as e:
            return e