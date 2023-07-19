from django.db.models import Q
from rest_framework import status
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import EnableTwoFactorAuthentication, TwoFactorAuth
from .serializers import OTPVerificationSerializer, TwoFactorAuthValidationSerializer, \
    EnableTwoFactorAuthenticationUserSerializer
from .service.TwoFactorAuthenticationService import TwoFactorAuthenticationService


class TwoFactorAuthViewSet(APIView):
    """
    TwoFactorAuthViewSet utilizes Twilio and SendGrid services to send OTPs via email
    and SMS if the user have enabled 2FA service.
    """
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        """
        Sends otp code to the given phone number or email address if the user has enabled two-factor authentication (2FA).
        Verifies wether your email or phone number is registered or not.
        :param request: Contains an object which have field "method" (email, phone_number).
        """
        try:
            data = self.request.data
            user = request.user
            validate_data = {
                "user": user.id,
                "method": data.get("method")
            }
            serializer = TwoFactorAuthValidationSerializer(data=validate_data)
            serializer.is_valid(raise_exception=True)
            try:
                if user.enable_user and user.enable_user.method == data.get('method'):
                    response = TwoFactorAuthenticationService.send_otp(user=request.user,
                                                                       method=validate_data["method"])
                    return Response(**response)
                return Response(
                    {"message": "You have not selected valid method"},
                    status=status.HTTP_400_BAD_REQUEST)
            except:
                return Response(
                    {"message": "Two factor authentication is not enabled"},
                    status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


class GoogleAuthenticatorViewSet(APIView):
    """
    GoogleAuthenticatorViewSet generates a QR code link for Google Authenticator
    and provides a verification code for OTP verification.
    """
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        """
        Google Authenticator will return the QR code link if the user has enabled two-factor authentication (2FA).
        which you can use to register on Google Authenticator App.
        """
        try:
            user = self.request.user
            if user.enable_user and user.enable_user.method == TwoFactorAuth.GOOGLE_AUTHENTICATOR:
                response = TwoFactorAuthenticationService.google_authenticator(user=user)
                return Response(**response)
            return Response(
                {"message": "You have not selected valid method"},
                status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"message": "Two factor authentication is not enabled"},
                            status=status.HTTP_400_BAD_REQUEST)


class OTPVerificationViewSet(APIView):
    """
    OTPVerificationViewSet is used to validate OTP within the specified expiration time.
    It returns a validation result indicating whether the user's code has expired or if they have not enabled 2FA.
    """
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
            try:
                if (validate_data['method'] == TwoFactorAuth.GOOGLE_AUTHENTICATOR) or (
                        user.user_two_factor and user.user_two_factor.method == validate_data['method']):
                    response = TwoFactorAuthenticationService.otp_verification(
                        user=user, otp=validate_data['code'],
                        method=validate_data['method'])
                    if kwargs.get('enable'):
                        if response.get('status') == status.HTTP_200_OK:
                            EnableTwoFactorAuthentication.objects.update_or_create(user=user, method=data.get("method"))
                    return Response(**response)
                return Response(
                    {"message": "You have not selected valid method"},
                    status=status.HTTP_400_BAD_REQUEST)
            except:
                return Response({"message": "Two factor authentication is not enabled"},
                                status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


class EnableTwoFactorAuthViewSet(APIView):
    """
    EnableTwoFactorAuthViewSet used to enable and disable 2FA services.
    """
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        The get method retrieves information about whether the user has .enabled two-factor authentication (2FA) or not
        """
        try:
            user = self.request.user
            if user.enable_user:
                return Response({"user": user.username, "method": user.enable_user.method}, status=status.HTTP_200_OK)
        except:
            return Response({"message": "Two factor authentication is not enabled"}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        """
           Enable two-factor authentication by using email or phone number.
           Sends otp code to the given phone number or email address.
           :param request: Contains an object, contains method(email, phone_number, google_authenticator) and code.
        """
        try:
            data = self.request.data
            user = self.request.user
            validate_data = {
                "user": user.id,
                "method": data.get("method")
            }
            serializer = EnableTwoFactorAuthenticationUserSerializer(data=validate_data)
            serializer.is_valid(raise_exception=True)

            if EnableTwoFactorAuthentication.objects.filter(~Q(method=validate_data['method']), user=user).exists():
                EnableTwoFactorAuthentication.objects.update(method=validate_data['method'], user=user)

            if validate_data['method'] == TwoFactorAuth.GOOGLE_AUTHENTICATOR:
                response = TwoFactorAuthenticationService.google_authenticator(
                    user=self.request.user
                )
                return Response(**response)

            response = TwoFactorAuthenticationService.send_otp(
                user=self.request.user, method=validate_data['method']
            )
            return Response(**response)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        """
           Disable two-factor authentication by user id.
           :param request: Contains a method and user authorization token.
        """
        try:
            user = self.request.user
            EnableTwoFactorAuthentication.objects.get(
                user=user.id
            ).delete()
            return Response(
                {"message": "Two Factor Authentication disable Successfully"},
                status=status.HTTP_202_ACCEPTED
            )
        except:
            return Response({"message": "Two factor authentication is not enabled"}, status=status.HTTP_400_BAD_REQUEST)
