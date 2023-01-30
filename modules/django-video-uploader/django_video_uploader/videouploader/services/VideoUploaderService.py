import requests
from rest_framework import status


class VideoUploaderBase:
    def __init__(self, base_url, access_token):
        self.VIDEO_UPLOADER_BASE_URL = base_url
        self.ACCESS_TOKEN = access_token

    def get_header(self):
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {self.ACCESS_TOKEN}',
            "Accept": "application/vnd.vimeo.*+json;version=3.4",
        }
        return headers

    def _api_call(self, request_type, url, headers=None, payload=None, data=None):

        try:
            response = requests.request(request_type, url, headers=headers, json=payload, data=data)
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
            url = f'{self.VIDEO_UPLOADER_BASE_URL}/oauth/authorize/client'
            header = {
                "Authorization": f'basic {token}',
                'Content-Type': 'application/json',
                "Accept": "application/vnd.vimeo.*+json;version=3.4",
            }
            response = self._api_call(request_type="POST", url=url, headers=header, payload=payload)
            return response
        except Exception as e:
            return e

    def create_channel(self, payload):
        try:
            url = f'{self.VIDEO_UPLOADER_BASE_URL}/channels'
            response = self._api_call(request_type="POST", url=url, payload=payload, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def delete_channel(self, channel_id):
        try:
            url = f'{self.VIDEO_UPLOADER_BASE_URL}/channels/{channel_id}'
            response = self._api_call(request_type="DELETE", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def update_channel(self, channel_id, payload):
        try:
            url = f'{self.VIDEO_UPLOADER_BASE_URL}/channels/{channel_id}'
            response = self._api_call(request_type="PATCH", url=url, data=payload, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def channel_list(self, query_params):
        try:
            url = f'{self.VIDEO_UPLOADER_BASE_URL}/channels'
            response = self._api_call(request_type="GET", url=url, data=query_params, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def specific_channel(self, channel_id):
        try:
            url = f'{self.VIDEO_UPLOADER_BASE_URL}/channels/{channel_id}'
            response = self._api_call(request_type="GET", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def create_group(self, payload):
        try:
            url = f'{self.VIDEO_UPLOADER_BASE_URL}/groups'
            response = self._api_call(request_type="POST", url=url, payload=payload, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def delete_group(self, group_id):
        try:
            url = f'{self.VIDEO_UPLOADER_BASE_URL}/groups/{group_id}'
            response = self._api_call(request_type="DELETE", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def groups_list(self, query_params):
        try:
            url = f'{self.VIDEO_UPLOADER_BASE_URL}/groups'
            response = self._api_call(request_type="GET", url=url, data=query_params, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def specific_group(self, group_id):
        try:
            url = f'{self.VIDEO_UPLOADER_BASE_URL}/groups/{group_id}'
            response = self._api_call(request_type="GET", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def add_user_to_group(self, group_id, user_id):
        try:
            url = f'{self.VIDEO_UPLOADER_BASE_URL}/users/{user_id}/groups/{group_id}'
            response = self._api_call(request_type="PUT", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def add_video_to_group(self, group_id, video_id):
        try:
            url = f'{self.VIDEO_UPLOADER_BASE_URL}/groups/{group_id}/videos/{video_id}'
            response = self._api_call(request_type="PUT", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def create_showcase(self, user_id, payload):
        try:
            url = f'{self.VIDEO_UPLOADER_BASE_URL}/users/{user_id}/albums'
            response = self._api_call(request_type="POST", url=url, payload=payload, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def delete_showcase(self, user_id, album_id):
        try:
            url = f'{self.VIDEO_UPLOADER_BASE_URL}/users/{user_id}/albums/{album_id}'
            response = self._api_call(request_type="DELETE", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def update_showcase(self, user_id, album_id, payload):
        try:
            url = f'{self.VIDEO_UPLOADER_BASE_URL}/users/{user_id}/albums/{album_id}'
            response = self._api_call(request_type="PATCH", url=url, payload=payload, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def showcase_list(self, user_id, query_params):
        try:
            url = f'{self.VIDEO_UPLOADER_BASE_URL}/users/{user_id}/albums'
            response = self._api_call(request_type="GET", url=url, data=query_params, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def specific_showcase(self, user_id, album_id):
        try:
            url = f'{self.VIDEO_UPLOADER_BASE_URL}/users/{user_id}/albums/{album_id}'
            response = self._api_call(request_type="GET", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def add_video_to_showcase(self, user_id, album_id, video_id):
        try:
            url = f'{self.VIDEO_UPLOADER_BASE_URL}/users/{user_id}/albums/{album_id}/videos/{video_id}'
            response = self._api_call(request_type="PUT", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def create_folder(self, user_id, payload):
        try:
            url = f'{self.VIDEO_UPLOADER_BASE_URL}/users/{user_id}/projects'
            response = self._api_call(request_type="POST", url=url, payload=payload, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def delete_folder(self, user_id, project_id):
        try:
            url = f'{self.VIDEO_UPLOADER_BASE_URL}/users/{user_id}/projects/{project_id}'
            response = self._api_call(request_type="DELETE", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def update_folder(self, user_id, project_id, payload):
        try:
            url = f'{self.VIDEO_UPLOADER_BASE_URL}/users/{user_id}/projects/{project_id}'
            response = self._api_call(request_type="PATCH", url=url, payload=payload, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def folder_list(self, user_id, query_params):
        try:
            url = f'{self.VIDEO_UPLOADER_BASE_URL}/users/{user_id}/projects'
            response = self._api_call(request_type="GET", url=url, data=query_params, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def specific_folder(self, user_id, project_id):
        try:
            url = f'{self.VIDEO_UPLOADER_BASE_URL}/users/{user_id}/projects/{project_id}'
            response = self._api_call(request_type="GET", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def add_video_to_folder(self, user_id, project_id, video_id):
        try:
            url = f'{self.VIDEO_UPLOADER_BASE_URL}/users/{user_id}/projects/{project_id}/videos/{video_id}'
            response = self._api_call(request_type="PUT", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def delete_video(self, video_id):
        try:
            url = f'{self.VIDEO_UPLOADER_BASE_URL}/videos/{video_id}'
            response = self._api_call(request_type="DELETE", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def specific_video(self, video_id):
        try:
            url = f'{self.VIDEO_UPLOADER_BASE_URL}/videos/{video_id}'
            response = self._api_call(request_type="GET", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def create_video(self, payload):
        try:
            url = f'{self.VIDEO_UPLOADER_BASE_URL}/me/videos'
            response = self._api_call(request_type="POST", url=url, headers=self.get_header(), payload=payload)
            return response
        except Exception as e:
            return e

    def update_video(self, video_id, payload):
        try:
            url = f'{self.VIDEO_UPLOADER_BASE_URL}/videos/{video_id}'
            response = self._api_call(request_type="PATCH", url=url, headers=self.get_header(), payload=payload)
            return response
        except Exception as e:
            return e

    def user_video_list(self, user_id):
        try:
            url = f'{self.VIDEO_UPLOADER_BASE_URL}/users/{user_id}/videos'
            response = self._api_call(request_type="GET", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def like_video(self, user_id, video_id):
        try:
            url = f'{self.VIDEO_UPLOADER_BASE_URL}/users/{user_id}/likes/{video_id}'
            response = self._api_call(request_type="PUT", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e

    def unlike_video(self, user_id, video_id):
        try:
            url = f'{self.VIDEO_UPLOADER_BASE_URL}/users/{user_id}/likes/{video_id}'
            response = self._api_call(request_type="DELETE", url=url, headers=self.get_header())
            return response
        except Exception as e:
            return e
