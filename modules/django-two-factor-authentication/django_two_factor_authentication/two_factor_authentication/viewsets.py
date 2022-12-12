from datetime import datetime

import pyotp
from django.utils.timezone import utc
from rest_framework import status
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from django.conf import settings
from .models import TwoFactorAuth
from .serializers import TwoFactorAuthSerializer, OTPVerificationSerializer
from twilio.rest import Client
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


def get_time_diff(time_posted):
    now = datetime.utcnow().replace(tzinfo=utc)
    timediff = now - time_posted
    return timediff.total_seconds()


class TwoFactorAuthViewSet(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        """
        Sends otp code to the given phone number or email address. Verifies wether your email or phone number is registered or not.
        :param request: Contains an object which have field "method" (email, phone_number).
        """
        try:
            data = request.data
            user = request.user
            otp_code = pyotp.TOTP(settings.TOTP_SECRET).now()
            validate_data = {
                "user": user.id,
                "code": otp_code,
                "method": data.get("method")
            }
            try:
                tmp_user = TwoFactorAuth.objects.filter(user=validate_data["user"])
                if tmp_user.exists():
                    tmp_user.delete()
            except Exception as e:
                return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)

            auth_serializer = TwoFactorAuthSerializer(data=validate_data)
            if auth_serializer.is_valid():
                if validate_data["method"] == "email":
                    message = Mail(
                        from_email=settings.EMAIL,
                        to_emails=user.email,
                        subject=settings.EMAIL_SUBJECT,
                        html_content="Your OTP code is {}. Don't share with anyone.".format(
                            validate_data["code"])
                    )
                    auth_serializer.save()
                    sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
                    sg.send(message)
                    return Response({"message": "Verification code has been sent to your Email Address"},
                                    status=status.HTTP_200_OK)
                elif validate_data["method"] == "phone_number":
                    account_sid = settings.ACCOUNT_SID
                    auth_token = settings.AUTH_TOKEN
                    client = Client(account_sid, auth_token)
                    client.messages.create(
                        from_=settings.PHONE,
                        to=user.phone_number,
                        body="Your OTP code is {}. Don't share with anyone.".format(validate_data["code"])
                    )
                    return Response({"message": "Verification code has been sent to your Phone number"},
                                    status=status.HTTP_200_OK)
            else:
                return Response(auth_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


class GoogleAuthenticatorViewSet(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        """
        Google Authenticator will return the QR code link which you can you to register on Google Authenticator App.
        """
        try:
            user = request.user
            name = user.email
            link = pyotp.TOTP(settings.TOTP_SECRET).provisioning_uri(name=name, issuer_name="2FA")
            return Response({
                "link": link,
            }, status=status.HTTP_200_OK)
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
            data = request.data
            user = request.user
            validate_data = {
                "code": data.get("code"),
                "method": data.get("method")
            }
            verification_serializer = OTPVerificationSerializer(data=validate_data)
            if verification_serializer.is_valid():
                if validate_data["method"] == "google_authenticator":
                    totp_code = pyotp.TOTP(settings.TOTP_SECRET).now()
                    if totp_code == validate_data["code"]:
                        return Response({"message": "Verified"}, status=status.HTTP_200_OK)
                    else:
                        return Response({"error": ["Not Verified"]}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    result = TwoFactorAuth.objects.get(user=user, code=validate_data["code"])
                    if result:
                        result.delete()
                        if get_time_diff(result.created_at) <= settings.OTP_EXPIRATION_TIME:
                            return Response({"message": "Verified"}, status=status.HTTP_200_OK)
                        else:
                            return Response({"error": ["Code expired"]}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response(verification_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


