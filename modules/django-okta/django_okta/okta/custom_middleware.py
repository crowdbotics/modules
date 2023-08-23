import json
from datetime import datetime as dt, timedelta
import pytz
from django.http import HttpResponse
from rest_framework import status

from modules.django_okta.okta.models import Okta

utc = pytz.UTC


class OktaTokenValidator:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        token = request.META.get('HTTP_OKTA_TOKEN', None)
        if token is None:
            return HttpResponse(
                json.dumps({"message": '"okta-token" header is missing'}),
                status=status.HTTP_400_BAD_REQUEST,
                content_type="application/json",
            )

        try:
            instance = Okta.objects.get(oktaID=token)
        except Okta.DoesNotExist:
            return HttpResponse(
                json.dumps({"message": "invalid okta-token"}),
                status=status.HTTP_400_BAD_REQUEST,
                content_type="application/json",
            )

        if instance is not None and instance.expiresAt < utc.localize(dt.now()):
            return HttpResponse(
                json.dumps({"message": "token is expired"}),
                status=status.HTTP_400_BAD_REQUEST,
                content_type="application/json",
            )

        response = self.get_response(request)
        return response
