import functools
import json

import pytz
from rest_framework import status
from rest_framework.response import Response
from datetime import datetime as dt
from modules.django_okta.okta.models import Okta

utc = pytz.UTC


def verification_required(view_func):
    @functools.wraps(view_func)
    def wrapper(request, *args, **kwargs):
        token = request.request.META.get('HTTP_OKTA_TOKEN', None)
        if token is None:
            return Response(
                {"message": '"okta-token" header is missing'},
                status=status.HTTP_400_BAD_REQUEST,
                content_type="application/json",
            )

        try:
            instance = Okta.objects.get(stateToken=token)
            if instance is not None and instance.expiresAt < utc.localize(dt.now()):
                return Response(
                    {"message": "token is expired"},
                    status=status.HTTP_400_BAD_REQUEST,
                    content_type="application/json",
                )

            return view_func(request, *args, **kwargs)
        except Okta.DoesNotExist:
            return Response(
                {"message": "invalid okta-token"},
                status=status.HTTP_400_BAD_REQUEST,
                content_type="application/json",
            )

    return wrapper
