from datetime import datetime
from django.utils.timezone import utc


def get_time_diff(time_posted):
    """
    Get the otp expiration time
    """
    now = datetime.utcnow().replace(tzinfo=utc)
    timediff = now - time_posted
    return timediff.total_seconds()
