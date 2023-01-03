import requests


class WordpressBase:
    def __init__(self, base_url, client_id, client_secrets, redirect_url, wordpress_domain):
        self.WORDPRESS_BASE_URL = base_url
        self.WORDPRESS_CLIENT_ID = client_id
        self.WORDPRESS_CLIENT_SECRETS = client_secrets
        self.WORDPRESS_REDIRECT_URL = redirect_url
        self.WORDPRESS_DOMAIN = wordpress_domain

    def get_auth_token(self, wordpress_code):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/oauth2/token"

            payload = {
                "client_id": self.WORDPRESS_CLIENT_ID,
                "client_secret": self.WORDPRESS_CLIENT_SECRETS,
                "redirect_uri": self.WORDPRESS_REDIRECT_URL,
                "code": wordpress_code,
                "grant_type": 'authorization_code',
            }

            response = requests.post(url=url, data=payload)
            if response.status_code == 200:
                return response.json()
            return None
        except Exception as e:
            return e.args

    def _api_call(self, request_type, url, access_token=None, payload=None, params=None):
        try:
            headers = {"Authorization": f"Bearer {access_token}"}
            response = requests.request(request_type, url, headers=headers, data=payload)
            response.raise_for_status()
            if response.status_code == 204:
                return {"data": response, "status_code": response.status_code, "success": True}
            return {"data": response.json(), "status_code": response.status_code, "success": True}

        except requests.exceptions.RequestException as e:
            return {"data": e.response.json(), "status_code": e.response.status_code}


class WordpressService(WordpressBase):

    def create_post(self, access_token, request_body):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/posts/new"
            response = self._api_call(request_type='POST', url=url,
                                      access_token=access_token,
                                      payload=request_body
                                      )
            return response
        except Exception as e:
            return e

    def get_single_post(self, access_token, post_id):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/posts/{post_id}"
            response = self._api_call(request_type='GET', url=url,
                                      access_token=access_token,
                                      )
            return response
        except Exception as e:
            return e

    def edit_post(self, access_token, request_body, post_id):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/posts/{post_id}"
            response = self._api_call(request_type='POST', url=url,
                                      access_token=access_token,
                                      payload=request_body
                                      )
            return response
        except Exception as e:
            return e

    def get_multiple_posts(self, access_token, params=None):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/posts/{post_id}"
            response = self._api_call(request_type='GET', url=url,
                                      access_token=access_token,
                                      params=params
                                      )
            return response
        except Exception as e:
            return e

    def delete_single_post(self, access_token, post_id, request_body=None):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/posts/{post_id}/delete"
            response = self._api_call(request_type='POST', url=url,
                                      access_token=access_token,
                                      payload=request_body
                                      )
            return response
        except Exception as e:
            return e

    def restore_post(self, access_token, post_id, request_body=None):
        try:
            url = f"{self.WORDPRESS_BASE_URL}/rest/v1.1/sites/{self.WORDPRESS_DOMAIN}/posts/{post_id}/restore"
            response = self._api_call(request_type='POST', url=url,
                                      access_token=access_token,
                                      payload=request_body
                                      )
            return response
        except Exception as e:
            return e

        