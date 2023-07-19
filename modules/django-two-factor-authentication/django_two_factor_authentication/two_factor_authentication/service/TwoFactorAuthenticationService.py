import pyotp
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework import status
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from twilio.rest import Client

from modules.django_two_factor_authentication.two_factor_authentication.models import TwoFactorAuth
from modules.django_two_factor_authentication.two_factor_authentication.utils import get_time_diff

User = get_user_model()


class TwoFactorAuthenticationService:
    """
    The TwoFactorAuthenticationService facilitates sending OTPs through various methods such as email, phone number, and Google Authenticator by generating a QR code link.
    Verification of the code can be performed within a specified time limit.
    """

    @staticmethod
    def send_otp(user: User, method: str) -> dict:
        """
        The send_otp method is responsible for sending a time-limited OTP to the user's selected method.
        If the user has already sent an OTP but hasn't verified it yet,
        the previous OTP will be deleted before generating and sending a new one.
        """
        try:
            otp_code = pyotp.TOTP(settings.TOTP_SECRET).now()
            TwoFactorAuth.objects.filter(user=user).delete()
            message = ""
            if method == TwoFactorAuth.EMAIL:
                message = Mail(
                    from_email=settings.EMAIL,
                    to_emails=user.email,
                    subject=settings.EMAIL_SUBJECT,
                    html_content="Your OTP code is {}. Don't share with anyone.".format(otp_code)
                )
                sg_client = SendGridAPIClient(settings.SENDGRID_API_KEY)
                sg_client.send(message)
                message = "Verification code has been sent to your Email Address"
            elif method == TwoFactorAuth.PHONE_NUMBER:
                client = Client(settings.ACCOUNT_SID, settings.AUTH_TOKEN)
                client.messages.create(
                    from_=settings.PHONE,
                    to=str(user.phone_number),
                    body="Your OTP code is {}. Don't share with anyone.".format(otp_code)
                )
                message = "Verification code has been sent to your Phone number"
            TwoFactorAuth.objects.create(user=user, method=method, code=otp_code)
            return {"data": {"message": message}, "status": status.HTTP_200_OK}
        except Exception as e:
            return {"data": {"error": e.args}, "status": status.HTTP_400_BAD_REQUEST}

    @staticmethod
    def google_authenticator(user: User) -> dict:
        """
        The google_authenticator method generates a QR code link that corresponds to a unique code.
        """
        try:
            link = pyotp.TOTP(settings.TOTP_SECRET).provisioning_uri(name=user.email, issuer_name="2FA")
            return {"data": {"link": link}, 'status': status.HTTP_200_OK}
        except Exception as e:
            return {"data": {"error": e.args}, "status": status.HTTP_400_BAD_REQUEST}

    @staticmethod
    def otp_verification(user: User, otp: str, method: str) -> dict:
        """
        The otp_verification method validates the user's selected method for OTP verification.
        If the method is valid, it generates a time-limited code.
        If the code is verified within the specified time, the verification is successful.
        Otherwise, it displays an error indicating that the code has expired.
        In case of entering an incorrect OTP, a validation error is shown, indicating that the code could not be found.
        """
        if method == TwoFactorAuth.GOOGLE_AUTHENTICATOR:
            totp_code = pyotp.TOTP(settings.TOTP_SECRET).now()
            if totp_code == str(otp):
                return {"data": {"message": "Verified"}, "status": status.HTTP_200_OK}
            return {"data": {"error": ["Code expired"]}, "status": status.HTTP_400_BAD_REQUEST}
        else:
            try:
                result = TwoFactorAuth.objects.get(user=user, code=otp)
            except TwoFactorAuth.DoesNotExist:
                return {"data": {"error": ["Invalid Code."]}, "status": status.HTTP_400_BAD_REQUEST}
            result.delete()
            if get_time_diff(result.created_at) <= settings.OTP_EXPIRATION_TIME:
                return {"data": {"message": "Verified"}, "status": status.HTTP_200_OK}
            return {"data": {"error": ["Code expired"]}, "status": status.HTTP_400_BAD_REQUEST}
