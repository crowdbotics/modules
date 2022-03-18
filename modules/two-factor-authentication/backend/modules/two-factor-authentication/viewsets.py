from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from demo.settings import SENDGRID_API_KEY, ACCOUNT_SID, AUTH_TOKEN
from .models import PhoneNumber, Verify
from .serializers import PhoneNumberSerializer, VerifySerializer
import os
from twilio.rest import Client
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import random


def generate_opt():
    otp = random.randint(111111, 999999)
    return otp


class PhoneNumberViewset(ModelViewSet):
    queryset = PhoneNumber.objects.all()
    serializer_class = PhoneNumberSerializer

    @action(methods=['post'], detail=False)
    def send_otp(self, request):
        phone = request.data.get('phone_number')
        email = request.data.get('email')
        otp_code = generate_opt()
        if phone and phone != '':
            try:
                account_sid = ACCOUNT_SID
                auth_token = AUTH_TOKEN
                client = Client(account_sid, auth_token)
                registered_phone_num = PhoneNumber.objects.get(phone_number=phone)
                if registered_phone_num:
                    message = client.messages.create(
                        body="Your private code is {} don't share with anyone".format(otp_code),
                        from_='+17575304751',
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
                registered_email = PhoneNumber.objects.get(email=email)
                if registered_email:
                    message = Mail(
                        from_email='saad.abid@crowdbotics.com',
                        to_emails=email,
                        subject='Sending with Twilio SendGrid is Fun',
                        html_content='<strong>"Your OTP code is {}. Do not share with anyone"</strong>'.format(otp_code))
                    if Verify.objects.filter(email=registered_email).exists():
                        t = Verify.objects.get(email=registered_email)
                        t.code = otp_code
                        t.save()
                    else:
                        Verify.objects.create(email=registered_email.email, code=otp_code)
                    try:
                        sg = SendGridAPIClient(SENDGRID_API_KEY)
                        response = sg.send(message)
                        print(response.status_code)
                        print(response.body)
                        print(response.headers)
                    except Exception as e:
                        print(e.body)
                    return Response({'message': "Verification code has been sent to your Email Address", 'status': status.HTTP_200_OK}, status=status.HTTP_200_OK)
            except:
                return Response({'message': "Your Email is not registered", 'status': status.HTTP_404_NOT_FOUND}, status=status.HTTP_404_NOT_FOUND)


class VerifyViewSet(ModelViewSet):
    queryset = Verify.objects.all()
    serializer_class = VerifySerializer
    http_method_names = ['delete']

    def destroy(self, request, *args, **kwargs):
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



