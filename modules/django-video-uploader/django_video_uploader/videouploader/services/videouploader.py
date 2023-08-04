import os

import requests


class VideoUploaderBase:
    def __init__(self):
        self.VIDEO_UPLOADER_BASE_URL = os.getenv('VIDEO_UPLOADER_BASE_URL')
        self.ACCESS_TOKEN = os.getenv('VIDEO_UPLOADER_ACCESS_TOKEN')
        if self.VIDEO_UPLOADER_BASE_URL is None and self.ACCESS_TOKEN is None:
            raise ValueError("You should setup both `VIDEO_UPLOADER_BASE_URL` and `ACCESS_TOKEN` in env vars")
        self.headers = self.get_header()

    def get_header(self):
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {self.ACCESS_TOKEN}',
            "Accept": "application/vnd.vimeo.*+json;version=3.4",
        }
        return headers

    def _api_call(self, request_type, url_action, headers=None, payload=None, params=None):

        try:
            response = requests.request(request_type, f"{self.VIDEO_UPLOADER_BASE_URL}{url_action}", headers=headers,
                                        json=payload, params=params)
            response.raise_for_status()

            if request_type == 'PUT' and response.status_code == 204:
                return {"data": {"message": "Item updated successfully."}, "status_code": response.status_code}

            if request_type == 'DELETE' and response.status_code == 204:
                return {"data": {"message": "Item deleted successfully."}, "status_code": response.status_code}
            return {"data": response.json(), "status_code": response.status_code}
        except requests.exceptions.RequestException as e:
            if e.response.status_code == 404:
                return {"data": {"message": "Resource not found"}, "status_code": e.response.status_code}
            return {"data": e.response.json(), "status_code": e.response.status_code}


class VideoUploaderService(VideoUploaderBase):

    def create_access_token(self, token, payload):
        try:
            header = {
                "Authorization": f'basic {token}',
                'Content-Type': 'application/json',
                "Accept": "application/vnd.vimeo.*+json;version=3.4",
            }
            response = self._api_call(request_type="POST", url_action="/oauth/authorize/client", headers=header,
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def create_channel(self, payload):
        try:
            response = self._api_call(request_type="POST", url_action="/channels", headers=self.headers,
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def delete_channel(self, channel_id, query_params):
        try:
            response = self._api_call(request_type="DELETE", url_action=f"/channels/{channel_id}", headers=self.headers,
                                      params=query_params)
            return response
        except Exception as e:
            return e

    def update_channel(self, channel_id, payload, query_params):
        try:
            url = f'{self.VIDEO_UPLOADER_BASE_URL}/channels/{channel_id}'
            response = self._api_call(request_type="PATCH", url_action=f"/channels/{channel_id}", headers=self.headers,
                                      payload=payload,
                                      params=query_params)
            return response
        except Exception as e:
            return e

    def channel_list(self, query_params):
        try:
            response = self._api_call(request_type="GET", url_action="/channels", headers=self.headers,
                                      params=query_params)
            return response
        except Exception as e:
            return e

    def specific_channel(self, channel_id, query_params):
        try:
            response = self._api_call(request_type="GET", url_action=f"/channels/{channel_id}", headers=self.headers,
                                      params=query_params)
            return response
        except Exception as e:
            return e

    def create_group(self, payload):
        try:
            response = self._api_call(request_type="POST", url_action="/groups", headers=self.headers, payload=payload)
            return response
        except Exception as e:
            return e

    def delete_group(self, group_id, query_params):
        try:
            response = self._api_call(request_type="DELETE", url_action=f"/groups/{group_id}", headers=self.headers,
                                      params=query_params)
            return response
        except Exception as e:
            return e

    def groups_list(self, query_params):
        try:
            response = self._api_call(request_type="GET", url_action="/groups", headers=self.headers,
                                      params=query_params)
            return response
        except Exception as e:
            return e

    def specific_group(self, group_id, query_params):
        try:
            response = self._api_call(request_type="GET", url_action=f"/groups/{group_id}", headers=self.headers,
                                      params=query_params)
            return response
        except Exception as e:
            return e

    def add_user_to_group(self, user_id, group_id, query_params):
        try:
            response = self._api_call(request_type="PUT", url_action=f"/users/{user_id}/groups/{group_id}",
                                      headers=self.headers, params=query_params)
            return response
        except Exception as e:
            return e

    def add_video_to_group(self, group_id, video_id, query_params):
        try:
            response = self._api_call(request_type="PUT", url_action=f"/groups/{group_id}/videos/{video_id}",
                                      headers=self.headers, params=query_params)
            return response
        except Exception as e:
            return e

    def create_showcase(self, user_id, payload, query_params):
        try:
            response = self._api_call(request_type="POST", url_action=f"/users/{user_id}/albums", headers=self.headers,
                                      payload=payload,
                                      params=query_params)
            return response
        except Exception as e:
            return e

    def delete_showcase(self, user_id, album_id, query_params):
        try:
            response = self._api_call(request_type="DELETE", url_action=f"/users/{user_id}/albums/{album_id}",
                                      headers=self.headers, params=query_params)
            return response
        except Exception as e:
            return e

    def update_showcase(self, user_id, album_id, payload, query_params):
        try:
            response = self._api_call(request_type="PATCH", url_action=f"/users/{user_id}/albums/{album_id}",
                                      headers=self.headers, payload=payload, params=query_params)
            return response
        except Exception as e:
            return e

    def showcase_list(self, user_id, query_params):
        try:
            response = self._api_call(request_type="GET", url_action=f"/users/{user_id}/albums", headers=self.headers,
                                      params=query_params)
            return response
        except Exception as e:
            return e

    def specific_showcase(self, user_id, album_id, query_params):
        try:
            response = self._api_call(request_type="GET", url_action=f"/users/{user_id}/albums/{album_id}",
                                      headers=self.headers, params=query_params)
            return response
        except Exception as e:
            return e

    def add_video_to_showcase(self, user_id, album_id, video_id, query_params):
        try:
            response = self._api_call(request_type="PUT",
                                      url_action=f"/users/{user_id}/albums/{album_id}/videos/{video_id}",
                                      headers=self.headers, params=query_params)
            return response
        except Exception as e:
            return e

    def create_folder(self, user_id, payload, query_params):
        try:
            response = self._api_call(request_type="POST", url_action=f"/users/{user_id}/projects",
                                      headers=self.headers, payload=payload,
                                      params=query_params)
            return response
        except Exception as e:
            return e

    def delete_folder(self, user_id, project_id, query_params):
        try:
            response = self._api_call(request_type="DELETE", url_action=f"/users/{user_id}/projects/{project_id}",
                                      headers=self.headers, params=query_params)
            return response
        except Exception as e:
            return e

    def update_folder(self, user_id, project_id, payload, query_params):
        try:
            response = self._api_call(request_type="PATCH", url_action=f"/users/{user_id}/projects/{project_id}",
                                      headers=self.headers, payload=payload,
                                      params=query_params)
            return response
        except Exception as e:
            return e

    def folder_list(self, user_id, query_params):
        try:
            response = self._api_call(request_type="GET", url_action=f"/users/{user_id}/projects", headers=self.headers,
                                      params=query_params)
            return response
        except Exception as e:
            return e

    def specific_folder(self, user_id, project_id, query_params):
        try:
            response = self._api_call(request_type="GET", url_action=f"/users/{user_id}/projects/{project_id}",
                                      headers=self.headers, params=query_params)
            return response
        except Exception as e:
            return e

    def add_video_to_folder(self, user_id, project_id, video_id, query_params):
        try:
            response = self._api_call(request_type="PUT",
                                      url_action=f"/users/{user_id}/projects/{project_id}/videos/{video_id}",
                                      headers=self.headers, params=query_params)
            return response
        except Exception as e:
            return e

    def delete_video(self, video_id, query_params):
        try:
            response = self._api_call(request_type="DELETE", url_action=f"/videos/{video_id}", headers=self.headers,
                                      params=query_params)
            return response
        except Exception as e:
            return e

    def specific_video(self, video_id, query_params):
        try:
            response = self._api_call(request_type="GET", url_action=f"/videos/{video_id}", headers=self.headers,
                                      params=query_params)
            return response
        except Exception as e:
            return e

    def create_video(self, payload):
        try:
            response = self._api_call(request_type="POST", url_action=f"/me/videos", headers=self.headers,
                                      payload=payload)
            return response
        except Exception as e:
            return e

    def update_video(self, video_id, payload, query_params):
        try:
            response = self._api_call(request_type="PATCH", url_action=f"/videos/{video_id}", headers=self.headers,
                                      payload=payload,
                                      params=query_params)
            return response
        except Exception as e:
            return e

    def user_video_list(self, user_id, query_params):
        try:
            response = self._api_call(request_type="GET", url_action="/users/{user_id}/videos", headers=self.headers,
                                      params=query_params)
            return response
        except Exception as e:
            return e

    def like_video(self, user_id, video_id, query_params):
        try:
            response = self._api_call(request_type="PUT", url_action=f"/users/{user_id}/likes/{video_id}",
                                      headers=self.headers, params=query_params)
            return response
        except Exception as e:
            return e

    def unlike_video(self, user_id, video_id, query_params):
        try:
            response = self._api_call(request_type="DELETE", url_action=f"/users/{user_id}/likes/{video_id}",
                                      headers=self.headers, params=query_params)
            return response
        except Exception as e:
            return e
