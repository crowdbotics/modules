import pyotp
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from django.conf import settings
from .models import TwoFactorAuth, Verify
from .serializers import PhoneNumberSerializer, VerifySerializer
import os
from twilio.rest import Client
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import random


def generate_opt():
    otp = random.randint(111111, 999999)
    """
    generate_opt generates otp code between 111111 to 999999.
    """
    return otp


class PhoneNumberViewset(ModelViewSet):
    queryset = TwoFactorAuth.objects.all()
    serializer_class = PhoneNumberSerializer

    @action(methods=['post'], detail=False)
    def send_otp(self, request):
        """
        send_otp Sends otp code to the given phone number or email address. Verifies wether your email or phone number is registered or not.
        :param request: Contains an object named 'data' which has email and phone number on which otp will be sent.
        """
        phone = request.data.get('phone_number')
        email = request.data.get('email')
        otp_code = generate_opt()
        if phone and phone != '':
            try:
                account_sid = settings.ACCOUNT_SID
                auth_token = settings.AUTH_TOKEN
                client = Client(account_sid, auth_token)
                registered_phone_num = TwoFactorAuth.objects.get(phone_number=phone)
                if registered_phone_num:
                    message = client.messages.create(
                        body="Your private code is {} don't share with anyone".format(otp_code),
                        from_=settings.PHONE,
                        to=phone,
                    )
                    if Verify.objects.filter(phone_number=registered_phone_num).exists():
                        t = Verify.objects.get(phone_number=registered_phone_num)
                        t.code = otp_code
                        t.save()
                    else:
                        Verify.objects.create(phone_number=registered_phone_num, code=otp_code)
                    return Response({'message': "Verification code has been sent to your phone number", 'status': status.HTTP_200_OK}, status=status.HTTP_200_OK)

            except:
                return Response({'message': "Your phone number is not registered", 'status': status.HTTP_404_NOT_FOUND}, status=status.HTTP_404_NOT_FOUND)

        elif email and email != '':
            try:
                registered_email = TwoFactorAuth.objects.get(email=email)
                if registered_email:
                    message = Mail(
                        from_email=settings.EMAIL,
                        to_emails=email,
                        subject='Crowdbotics 2FA code',
                        html_content='<strong>"Your OTP code is {}. Do not share with anyone"</strong>'.format(otp_code))
                    if Verify.objects.filter(email=registered_email).exists():
                        t = Verify.objects.get(email=registered_email)
                        t.code = otp_code
                        t.save()
                    else:
                        Verify.objects.create(email=registered_email.email, code=otp_code)
                    try:
                        sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
                        response = sg.send(message)
                    except Exception as e:
                        print(e)
                    return Response({'message': "Verification code has been sent to your Email Address", 'status': status.HTTP_200_OK}, status=status.HTTP_200_OK)
            except:
                return Response({'message': "Your Email is not registered", 'status': status.HTTP_404_NOT_FOUND}, status=status.HTTP_404_NOT_FOUND)


class VerifyViewSet(ModelViewSet):
    queryset = Verify.objects.all()
    serializer_class = VerifySerializer
    http_method_names = ['delete']

    def destroy(self, request, *args, **kwargs):
        """
        destroy verifies the otp and phone number or email match the opt code sent to the phone number or email. Deletes record after verifying.
        :param request: Contains an object named 'data' which has otp, email and phone number on which otp code was sent.
        """
        phone_num = request.data.get('phone_number')
        email = request.data.get('email')
        code = request.data.get('code')
        if phone_num:
            try:
                result = Verify.objects.get(phone_number__phone_number=phone_num, code=code)
                if result:
                    result.delete()
                    return Response({'message': 'Verified', 'status': status.HTTP_200_OK}, status=status.HTTP_200_OK)
                else:
                    return Response({'message': 'Invalid verification code', 'status': status.HTTP_404_NOT_FOUND}, status=status.HTTP_404_NOT_FOUND)
            except:
                return Response({'message': 'Something went wrong.', 'status': status.HTTP_404_NOT_FOUND}, status=status.HTTP_404_NOT_FOUND)

        elif email:
            try:
                result = Verify.objects.get(email=email, code=code)
                if result:
                    result.delete()
                    return Response({'message': 'Verified', 'status': status.HTTP_200_OK}, status=status.HTTP_200_OK)
                else:
                    return Response({'message': 'Invalid verification code', 'status': status.HTTP_404_NOT_FOUND}, status=status.HTTP_404_NOT_FOUND)
            except:
                return Response({'message': 'Something went wrong.', 'status': status.HTTP_404_NOT_FOUND}, status=status.HTTP_404_NOT_FOUND)


class Google_AUTH(APIView):
    def get(self, request):
        userId = request.GET.get('id', None)
        if userId:
            try:
                user = TwoFactorAuth.objects.get(pk=userId)
                secret = user.secret
                name = user.email
                link = pyotp.TOTP(secret).provisioning_uri(name=name, issuer_name='2FA')
                return Response({
                    'secret': secret,
                    'name': name,
                    'link': link,
                    'status': status.HTTP_200_OK
                }, status=status.HTTP_200_OK)
            except:
                return Response({'message': 'Enter a Valid user id.', 'status': status.HTTP_404_NOT_FOUND}, status=status.HTTP_404_NOT_FOUND)

        else:
            return Response({'message': 'User Does not exist.', 'status': status.HTTP_404_NOT_FOUND},
                            status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        otp = request.data['otp']
        userId = request.data['id']
        user = TwoFactorAuth.objects.get(pk=userId)
        secret = user.secret
        verification_code = pyotp.TOTP(secret).now()
        if verification_code == otp:
            return Response({
                'message': 'Verified',
                'status': status.HTTP_200_OK
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'message': 'Not Verified',
                'status': status.HTTP_400_BAD_REQUEST
            }, status=status.HTTP_400_BAD_REQUEST)