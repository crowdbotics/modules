import requests


class OpenAIBase:
    def __init__(self, base_url, openai_api_key):
        self.OPENAI_BASE_URL = base_url
        self.OPENAI_API_KEY = openai_api_key

    def get_header(self):
        headers = {
            'Authorization': f'Bearer {self.OPENAI_API_KEY}',
        }
        return headers

    def _api_call(self, request_type, url, headers=None, payload=None, data=None, params=None, files=None):

        try:
            response = requests.request(request_type, url, headers=headers, json=payload, data=data, params=params,
                                        files=files)
            response.raise_for_status()
            return {"data": response.json(), "status_code": response.status_code}
        except requests.exceptions.RequestException as e:
            if e.response.status_code == 404:
                return {"data": {"message": "Resource not found"}, "status_code": e.response.status_code}
            return {"data": e.response.json(), "status_code": e.response.status_code}


class OpenAIService(OpenAIBase):

    def list_models(self):
        try:
            url = f'{self.OPENAI_BASE_URL}/v1/models'
            response = self._api_call(request_type="GET", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def retrieve_model(self, model_id):
        try:
            url = f'{self.OPENAI_BASE_URL}/v1/models/{model_id}'
            response = self._api_call(request_type="GET", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def list_engine(self):
        try:
            url = f'{self.OPENAI_BASE_URL}/v1/engines'
            response = self._api_call(request_type="GET", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def retrieve_engine(self, engine_id):
        try:
            url = f'{self.OPENAI_BASE_URL}/v1/engines/{engine_id}'
            response = self._api_call(request_type="GET", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def create_chat_completion(self, payload):
        try:
            url = f'{self.OPENAI_BASE_URL}/v1/chat/completions'
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(),
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def create_completion(self, payload):
        try:
            url = f'{self.OPENAI_BASE_URL}/v1/completions'
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(),
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def create_edit(self, payload):
        try:
            url = f'{self.OPENAI_BASE_URL}/v1/edits'
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(),
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def create_image(self, payload):
        try:
            url = f'{self.OPENAI_BASE_URL}/v1/images/generations'
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(),
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def create_transcription(self, payload):
        try:
            url = f'{self.OPENAI_BASE_URL}/v1/audio/transcriptions'
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(),
                                      files={"file": payload['file']}, data={'model': payload['model']})
            return response
        except Exception as e:
            return e

    def create_translation(self, payload):
        try:
            url = f'{self.OPENAI_BASE_URL}/v1/audio/translations'
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(),
                                      files={"file": payload['file']}, data={'model': payload['model']})
            return response
        except Exception as e:
            return e