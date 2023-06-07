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
    get_header,
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

    def _path(self, path: str, **kwargs) -> str:
        return join(self.api_root, path.format(**kwargs))

    def create_notification(self, body: Dict) -> Response:
        """
        Sends notifications to your users
        https://documentation.onesignal.com/reference/create-notification
        :param body: Notification parameters (Segments, Filters, User ID).
        :return: Response
        """
        header = get_header(self.rest_api_key)
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
        header = get_header(self.rest_api_key)
        path = self._path(NOTIFICATION_PATH, id=id)
        payload = {"app_id": self.app_id}
        return requests.delete(path, headers=header, params=payload)

    def view_apps(self) -> Response:
        """
        View the details of all of your current OneSignal apps
        https://documentation.onesignal.com/reference/view-apps-apps
        :return: Response
        """
        header = get_header(self.user_auth_key)
        path = self._path(APPS_PATH)
        return requests.get(path, headers=header)

    def view_app(self, app_id: int) -> Response:
        """
        View the details of a single OneSignal app
        https://documentation.onesignal.com/reference/view-an-app
        :param app_id: App id
        :return: Response
        """
        header = get_header(self.user_auth_key)
        path = self._path(APP_PATH, app_id=app_id)
        return requests.get(path, headers=header)

    def create_app(self, body: Dict) -> Response:
        """
        Creates a new OneSignal app
        https://documentation.onesignal.com/reference/create-an-app
        :param body: App parameters
        :return: Response
        """
        header = get_header(self.user_auth_key)
        path = self._path(APPS_PATH)
        payload = body
        return requests.post(path, headers=header, data=payload)

    def update_app(self, app_id: int, body: Dict) -> Response:
        """
        Updates the name or configuration settings of an existing OneSignal app
        https://documentation.onesignal.com/reference/update-an-app
        :param app_id: App id
        :param body: App parameters
        :return: Response
        """
        header = get_header(self.user_auth_key)
        path = self._path(APP_PATH, app_id=app_id)
        payload = body
        return requests.post(path, headers=header, data=payload)

    def view_devices(self, limit: int, offset: int) -> Response:
        """
        View the details of multiple devices in one of your OneSignal apps
        https://documentation.onesignal.com/reference/view-devices
        :param limit: How many devices to return. Max is 300. Default is 300
        :param offset: Result offset. Default is 0. Results are sorted by id;
        :return: Response
        """
        header = get_header(self.rest_api_key)
        path = self._path(DEVICES_PATH)
        payload = {"app_id": self.app_id, "limit": limit, "offset": offset}
        return requests.get(path, headers=header, params=payload)

    def view_device(self, id: int) -> Response:
        """
        View the details of an existing device in one of your OneSignal apps
        https://documentation.onesignal.com/reference/view-device
        :param id: Player's OneSignal ID
        :return: Response
        """
        path = self._path(DEVICE_PATH, id=id)
        payload = {"app_id": self.app_id}
        return requests.get(path, headers=get_header(), params=payload)

    def add_device(self, body: Dict) -> Response:
        """
        Register a new device to one of your OneSignal apps
        Warning: Don't use this.
        This API endpoint is designed to be used from our open source Mobile and
        Web Push SDKs. It is not designed for developers to use it directly,
        unless instructed to do so by OneSignal support.
        https://documentation.onesignal.com/reference/add-a-device
        :param body: Device parameters
        :return: Response
        """
        path = self._path(DEVICES_PATH)
        payload = body
        payload["app_id"] = self.app_id
        return requests.post(path, headers=get_header(), data=payload)

    def edit_device(self, id: int, body: Dict) -> Response:
        """
        Update an existing device in one of your OneSignal apps
        https://documentation.onesignal.com/reference/edit-device
        :param id: Required - The device's OneSignal ID
        :param body: Device parameters
        :return: Response
        """
        path = self._path(DEVICE_PATH, id=id)
        payload = body
        payload["app_id"] = self.app_id
        return requests.put(path, headers=get_header(), data=payload)

    def edit_tags(self, user_id: int, body: Dict) -> Response:
        """
        Update an existing device's tags in one of your OneSignal apps using the
        External User ID.
        https://documentation.onesignal.com/reference/edit-tags-with-external-user-id
        :param user_id: Required: The External User ID mapped to the device
        record in OneSignal. Must be actively set on the device to be updated.
        :param body: Tags
        :return: Response
        """
        path = self._path(EDIT_TAGS_PATH, app_id=self.app_id, user_id=user_id)
        return requests.put(path, headers=get_header(), data=body)

    def new_session(self, id: int, body: Dict) -> Response:
        """
        Update a device's session information
        https://documentation.onesignal.com/reference/new-session
        :param id: Player's OneSignal ID
        :param body: Body parameters
        """
        path = self._path(NEW_SESSION_PATH, id=id)
        return requests.post(path, headers=get_header(), data=body)

    def new_purchase(self, id: int, body: Dict) -> Response:
        """
        Track a new purchase in your app
        https://documentation.onesignal.com/reference/new-purchase
        :param id: Player's OneSignal ID
        :param body: Body parameters
        """
        path = self._path(NEW_PURCHASE_PATH, id=id)
        return requests.post(path, headers=get_header(), data=body)

    def csv_export(self, body: Dict) -> Response:
        """
        Generate a compressed CSV export of all of your current user data
        https://documentation.onesignal.com/reference/csv-export
        :param body: CSV Export parameters
        """
        header = get_header(self.rest_api_key)
        path = self._path(CSV_EXPORT_PATH)
        params = {"app_id": self.app_id}
        return requests.post(path, headers=header, params=params, data=body)

    def view_notification(self, id: int) -> Response:
        """
        View the details of a single notification and outcomes associated with it
        https://documentation.onesignal.com/reference/view-notification
        :param id: Required - Notification ID
        """
        header = get_header(self.rest_api_key)
        path = self._path(NOTIFICATION_PATH, id=id)
        params = {"app_id": self.app_id}
        return requests.get(path, headers=header, params=params)

    def view_notifications(
        self, limit: int = 50, offset: int = 0, kind: int = None
    ) -> Response:
        """
        View the details of multiple notifications
        https://documentation.onesignal.com/reference/view-notifications
        :param limit: Optional. How many notifications to return. Max is 50.
        Default is 50
        :param offset: Optional. Page offset. Default is 0. Results are sorted by
        queued_at in descending order. queued_at is a representation of the time
        that the notification was queued at.
        :param kind: Optional. Kind of notifications returned. Default (not set)
        is all notification types.
        0 - Dashboard only
        1 - API only
        3 - Automated only
        """
        header = get_header(self.rest_api_key)
        path = self._path(NOTIFICATIONS_PATH)
        params = {"app_id": self.app_id, "limit": limit, "offset": offset}
        if kind:
            params["kind"] = kind
        return requests.get(path, headers=header, params=params)

    def view_notification_history(self, notification_id: int, body: Dict) -> Response:
        """
        View the devices sent a message - OneSignal Paid Plan Required
        https://documentation.onesignal.com/reference/notification-history
        :param notification_id: The "id" of the message found in the creation
        notification POST response, View Notifications GET response, or URL
        within the Message Report.
        :param body: Body params
        """
        header = get_header(self.rest_api_key)
        path = self._path(NOTIFICATION_HISTORY_PATH, id=notification_id)
        payload = body
        payload["app_id"] = self.app_id
        return requests.post(path, headers=header, data=payload)

    def create_segments(self, body: Dict) -> Response:
        """
        Create segments visible and usable in the dashboard and API - Required:
        OneSignal Paid Plan
        https://documentation.onesignal.com/reference/create-segments
        :param body: Body params
        """
        header = get_header(self.rest_api_key)
        path = self._path(SEGMENTS_PATH, app_id=self.app_id)
        return requests.post(path, headers=header, data=body)

    def delete_segments(self, segment_id: int) -> Response:
        """
        Delete segments (not user devices) - Required: OneSignal Paid Plan
        https://documentation.onesignal.com/reference/delete-segments
        :param segment_id: The segment_id can be found in the URL of the segment
        when viewing it in the dashboard.
        """
        header = get_header(self.rest_api_key)
        path = self._path(SEGMENT_PATH, app_id=self.app_id, segment_id=segment_id)
        return requests.delete(path, headers=header)

    def view_outcomes(
        self,
        outcome_names: str,
        outcome_names_array: str = None,
        outcome_time_range: str = None,
        outcome_platforms: str = None,
        outcome_attribution: str = None,
    ) -> Response:
        """
        View the details of all the outcomes associated with your app
        https://documentation.onesignal.com/reference/view-outcomes
        :param outcome_names: Required
        Comma-separated list of names and the value (sum/count) for the returned outcome data.
        Note: Clicks only support count aggregation.

        For out-of-the-box OneSignal outcomes such as click and session duration, please use the “os” prefix with two underscores. For other outcomes, please use the name specified by the user.

        Example:os__session_duration.count,os__click.count,CustomOutcomeName.sum
        :param outcome_names_array: Optional
        If outcome names contain any commas, then please specify only one value at a time.

        Example: outcome_names[]=os__click.count&outcome_names[]=Sales, Purchase.count
        where “Sales, Purchase” is the custom outcomes with a comma in the name.
        :param outcome_time_range: Optional
        Time range for the returned data. The values can be 1h (for the last 1 hour data), 1d (for the last 1 day data), or 1mo (for the last 1 month data).

        Default is 1h if the parameter is omitted.
        :param outcome_platforms: Optional
        Platform id. Refer device's platform ids for values.

        Example:
        outcome_platform=0 for iOS
        outcome_platform=7,8 for Safari and Firefox

        Default is data from all platforms if the parameter is omitted.
        :param outcome_attribution: Optional
        Attribution type for the outcomes. The values can be direct or influenced or unattributed.

        Example: outcome_attribution=direct

        Default is total (returns direct+influenced+unattributed) if the parameter is omitted.
        """
        header = get_header(self.rest_api_key)
        params = {"outcome_names": outcome_names}
        if outcome_names_array:
            params["outcome_names_array"] = outcome_names_array
        if outcome_time_range:
            params["outcome_time_range"] = outcome_time_range
        if outcome_platforms:
            params["outcome_platforms"] = outcome_platforms
        if outcome_attribution:
            params["outcome_attribution"] = outcome_attribution
        path = self._path(VIEW_OUTCOMES_PATH, app_id=self.app_id)
        return requests.get(path, headers=header, params=params)
