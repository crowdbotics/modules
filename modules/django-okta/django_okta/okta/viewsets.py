from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from modules.django_okta.okta.models import Okta
from modules.django_okta.okta.serializers import (
    CreateOktaUserSerializer,
    OktaUserLoginSerializer,
    OktaUserLogoutSerializer,
    OktaCallBackSerializer,
)
from modules.django_okta.okta.services.okta import OktaService
from .custom_decorator import verification_required


class OktaViewSet(viewsets.GenericViewSet):
    allowed_serializer = {
        "create_user_okta": CreateOktaUserSerializer,
        "login_user_okta": OktaUserLoginSerializer,
        "logout_user_okta": OktaUserLogoutSerializer,
        "okta_callback_url": OktaCallBackSerializer,
    }
    okta_services = OktaService()

    def get_serializer_class(self):
        return self.allowed_serializer.get(self.action)

    @action(detail=False, methods=["post"], url_path="create_user")
    def create_user_okta(self, request):
        """
        Create an okta user
        :body_params: "profile", "credentials"
        :return: Return okta user with details.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.okta_services.create_user(payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=["post"], url_path="login")
    def login_user_okta(self, request):
        """
        For login the okta user
        :body_params: "username", "password"
        :return: Return "stateToken", "expireAt" and embedded details.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.okta_services.login_user(payload=serializer.data)
        if response["status_code"] == 200:
            payload = {
                "oktaID": response["data"]["_embedded"]["user"]["id"],
                "stateToken": response["data"]["stateToken"],
                "expiresAt": response["data"]["expiresAt"],
            }
            try:
                Okta.objects.get(oktaID=payload["oktaID"])
            except Okta.DoesNotExist:
                Okta.objects.create(**payload)
            else:
                Okta.objects.filter(oktaID=payload["oktaID"]).update(**payload)
            return Response(
                data=response.get("data"), status=response.get("status_code")
            )
        return Response(
            data={"error": response["data"]["errorSummary"]},
            status=response["status_code"],
        )

    @action(detail=False, methods=["post"], url_path="logout")
    @verification_required
    def logout_user_okta(self, request):
        """
        For logout the okta user
        :body_params: "stateToken"
        :return: Return an embedded dict.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        Okta.objects.filter(stateToken=serializer.data["stateToken"]).delete()
        response = self.okta_services.logout_user(payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=["post"], url_path="callback_url")
    def okta_callback_url(self, request):
        """
        For just return a callback url
        :body_params: "SAMLResponse"
        :return: Return a SAMLResponse.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(
            {"SAMLResponse": serializer.data["SAMLResponse"]}, status=status.HTTP_200_OK
        )
