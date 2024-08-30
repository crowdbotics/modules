import logging
import os

import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration
from sentry_sdk.integrations.logging import LoggingIntegration

sentry_sdk.init(
    dsn=os.getenv("SENTRY_DSN_URL"),
    # Set traces_sample_rate to 1.0 to capture 100%
    # of transactions for performance monitoring.
    # Recommend adjusting this value in production.
    traces_sample_rate=os.getenv("TRACES_SAMPLE_RATE"),
    # If you use django.contrib.auth and you've set "send_default_pii=True" so,
    # user data (such as current user id, email address, username) will be attached to error events.
    send_default_pii=os.getenv("SEND_DEFAULT_PII", False),
    # if debug is (True) enabled  SDK will attempt to print out useful debugging information,
    # if something goes wrong while sending the event.
    # Not recommended to turn it on in production.
    debug=os.getenv("SENTRY_DEBUG", False),
    integrations=[
        DjangoIntegration(),
        LoggingIntegration(
            level=logging.INFO,  # Capture info and above as breadcrumbs
            event_level=logging.WARNING  # Send warnings as events
        )
    ],
)
