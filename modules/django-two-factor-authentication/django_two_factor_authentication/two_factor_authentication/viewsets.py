from rest_framework import status
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import EnableTwoFactorAuthentication
from .serializers import OTPVerificationSerializer, TwoFactorAuthValidationSerializer, \
    EnableTwoFactorAuthenticationUserSerializer
from .service.TwoFactorAuthenticationService import TwoFactorAuthenticationService


class TwoFactorAuthViewSet(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        """
        Sends otp code to the given phone number or email address.
        Verifies wether your email or phone number is registered or not.
        :param request: Contains an object which have field "method" (email, phone_number).
        """
        try:
            data = self.request.data
            user = request.user
            EnableTwoFactorAuthentication.objects.get(user=user.id)
            validate_data = {
                "user": user.id,
                "method": data.get("method")
            }
            serializer = TwoFactorAuthValidationSerializer(data=validate_data)
            serializer.is_valid(raise_exception=True)
            response = TwoFactorAuthenticationService.send_otp(user=request.user, method=validate_data["method"])
            return Response(response, status=response.get('status'))
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


class GoogleAuthenticatorViewSet(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        """
        Google Authenticator will return the QR code link
        which you can use to register on Google Authenticator App.
        """
        try:
            user = self.request.user
            EnableTwoFactorAuthentication.objects.get(user=user.id)
            response = TwoFactorAuthenticationService.google_authenticator(user=user)
            return Response(response)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


class OTPVerificationViewSet(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        """
        Verifies the user, otp code and expiration time. Deletes record after verifying.
        :param request: Contains an object, contains method(email, phone_number, google_authenticator) and code.
        """
        try:
            data = self.request.data
            user = request.user
            validate_data = {
                "code": data.get("code"),
                "method": data.get("method")
            }
            serializer = OTPVerificationSerializer(data=validate_data)
            serializer.is_valid(raise_exception=True)
            response = TwoFactorAuthenticationService.otp_verification(
                user=user, otp=validate_data['code'],
                method=validate_data['method'])
            if kwargs.get('is_enable'):
                if response.get('status') == status.HTTP_200_OK:
                    EnableTwoFactorAuthentication.objects.create(user=user, method=data.get("method"))
            return Response(response, status=response.get('status'))
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


class EnableTwoFactorAuthViewSet(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        """
           Enable two-factor authentication by using email or phone number.
           Sends otp code to the given phone number or email address.
           :param request: Contains an object, contains method(email, phone_number, google_authenticator) and code.
        """
        try:
            data = self.request.data
            validate_data = {
                "user": self.request.user.id,
                "method": data.get("method")
            }
            serializer = EnableTwoFactorAuthenticationUserSerializer(data=validate_data)
            serializer.is_valid(raise_exception=True)
            response = TwoFactorAuthenticationService.send_otp(
                user=self.request.user, method=validate_data['method']
            )
            return Response(response)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        """
           Disable two-factor authentication by user id.
           :param request: Contains a method and user authorization token.
        """
        try:
            user = self.request.user
            EnableTwoFactorAuthentication.objects.filter(
                user=user.id
            ).delete()
            return Response(
                {"message": "Two Factor Authentication disable Successfully"},
                status=status.HTTP_202_ACCEPTED
            )
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)
