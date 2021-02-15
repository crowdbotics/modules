import requests
from requests import Response
from os.path import join

from .constants import (
    API_ROOT,
    NOTIFICATIONS_PATH,
    NOTIFICATION_PATH,
    NOTIFICATION_HISTORY_PATH,
    DEVICES_PATH,
    DEVICE_PATH,
    EDIT_TAGS_PATH,
    NEW_SESSION_PATH,
    NEW_PURCHASE_PATH,
    CSV_EXPORT_PATH,
    SEGMENTS_PATH,
    SEGMENT_PATH,
    VIEW_OUTCOMES_PATH,
    APPS_PATH,
    APP_PATH,
)


class Client:
    def __init__(
        self,
        app_id: str,
        rest_api_key: str,
        user_auth_key: str = "",
        api_root: str = API_ROOT,
    ):
        self.app_id = app_id
        self.rest_api_key = rest_api_key
        self.user_auth_key = user_auth_key
        self.api_root = api_root

    @staticmethod
    def _header(auth_key: str) -> Dict:
        return {
            "content-type": "application/json; charset=utf-8",
            "authorization": f"Basic {auth_key}",
        }

    def _path(self, path: str, **kwargs) -> str:
        return join(self.api_root, path.format(**kwargs))

    def create_notification(self, body: Dict) -> Response:
        """
        Sends notifications to your users
        https://documentation.onesignal.com/reference/create-notification
        :param body: Notification parameters (Segments, Filters, User ID).
        :return: Response
        """
        header = _header(self.rest_api_key)
        path = self._path(NOTIFICATIONS_PATH)
        payload = {"app_id": self.app_id, **body}
        return requests.post(path, headers=header, data=payload)

    def cancel_notification(self, id: int) -> Response:
        """
        Stop a scheduled or currently outgoing notification
        https://documentation.onesignal.com/reference/cancel-notification
        :param id: Notification id
        :return: Response
        """
        header = _header(self.rest_api_key)
        path = self._path(NOTIFICATION_PATH, id=id)
        payload = {"app_id": self.app_id}
        return requests.delete(path, headers=header, params=payload)

    def view_apps(self) -> Response:
        """
        View the details of all of your current OneSignal apps
        https://documentation.onesignal.com/reference/view-apps-apps
        :return: Response
        """
        header = _header(self.user_auth_key)
        path = self._path(APPS_PATH)
        return requests.get(path, headers=header)

    def view_app(self, app_id: int) -> Response:
        """
        View the details of a single OneSignal app
        https://documentation.onesignal.com/reference/view-an-app
        :param app_id: App id
        :return: Response
        """
        header = _header(self.user_auth_key)
        path = self._path(APP_PATH, app_id=id)
        return requests.get(path, headers=header)

    def create_app(self, body: Dict) -> Response:
        """
        Creates a new OneSignal app
        https://documentation.onesignal.com/reference/create-an-app
        :param body: App parameters
        :return: Response
        """
        header = _header(self.user_auth_key)
        path = self._path(APPS_PATH)
        payload = body
        return requests.post(path, headers=header, data=payload)
