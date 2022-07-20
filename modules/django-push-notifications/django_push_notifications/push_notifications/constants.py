# Requests config
JSON_HEADER = {"Content-Type": "application/json; charset=utf-8"}


def get_header(auth_key: str = None) -> Dict:
    header = JSON_HEADER
    if auth_key:
        header["Authorization"] = f"Basic {auth_key}"
    return header


# Endpoints
API_ROOT = "https://onesignal.com/api/v1"
NOTIFICATIONS_PATH = "/notifications"
NOTIFICATION_PATH = "/notifications/{id}"
NOTIFICATION_HISTORY_PATH = "/notifications/{id}/history"
DEVICES_PATH = "/players"
DEVICE_PATH = "/players/{id}"
EDIT_TAGS_PATH = "/apps/{app_id}/users/{user_id}"
NEW_SESSION_PATH = "/players/{id}/on_session"
NEW_PURCHASE_PATH = "/players/{id}/on_purchase"
CSV_EXPORT_PATH = "/players/csv_export"
SEGMENTS_PATH = "/apps/{app_id}/segments"
SEGMENT_PATH = "/apps/{app_id}/segments/{segment_id}"
VIEW_OUTCOMES_PATH = "/apps/{app_id}/outcomes"
APPS_PATH = "/apps"
APP_PATH = "/apps/{app_id}"
