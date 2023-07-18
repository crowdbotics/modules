from typing import Dict

import pyotp
from django.conf import settings
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from twilio.rest import Client

from modules.django_two_factor_authentication.two_factor_authentication.models import TwoFactorAuth
from modules.django_two_factor_authentication.two_factor_authentication.utils import get_time_diff


class TwoFactorAuthenticationService:
    @staticmethod
    def send_otp(user, method) -> Dict:
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
            return {"message": message, "status": HTTP_200_OK}
        except Exception as e:
            return {"error": e.args, "status": HTTP_400_BAD_REQUEST}

    @staticmethod
    def google_authenticator(user) -> Dict:
        try:
            link = pyotp.TOTP(settings.TOTP_SECRET).provisioning_uri(name=user.email, issuer_name="2FA")
            return {"link": link, 'status': HTTP_200_OK}
        except Exception as e:
            return {"error": e.args, "status": HTTP_400_BAD_REQUEST}

    @staticmethod
    def otp_verification(user, otp, method) -> Dict:
        if method == TwoFactorAuth.GOOGLE_AUTHENTICATOR:
            totp_code = pyotp.TOTP(settings.TOTP_SECRET).now()
            if totp_code == str(otp):
                return {"message": "Verified", "status": HTTP_200_OK}
            else:
                return {"error": ["Code expired"], "status": HTTP_400_BAD_REQUEST}
        else:
            try:
                result = TwoFactorAuth.objects.get(user=user, code=otp)
            except TwoFactorAuth.DoesNotExist:
                return {"error": ["Code could not found."], "status": HTTP_400_BAD_REQUEST}
            result.delete()
            if get_time_diff(result.created_at) <= settings.OTP_EXPIRATION_TIME:
                return {"message": "Verified", "status": HTTP_200_OK}
            return {"error": ["Code expired"], "status": HTTP_400_BAD_REQUEST}
