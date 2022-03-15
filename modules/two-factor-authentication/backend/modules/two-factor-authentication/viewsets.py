from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import PhoneNumber, Verify
from .serializers import PhoneNumberSerializer, VerifySerializer
import os
from twilio.rest import Client
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
        account_sid = 'ACd6bee6c0b7e4e24f2489fd82aa110e85'
        auth_token = 'ba2ed7fc608d9b9c6b17903119b19b5f'
        client = Client(account_sid, auth_token)
        otp_code = generate_opt()
        registered_phone_num = PhoneNumber.objects.get(phone_number=phone)
        if registered_phone_num:
            # token_check = Verify.objects.get(phone_number=registered_phone_num)
            # if token_check:
            #     token_check.phone_number = None
            #     token_check.code = None
            #     token_check.save()
            message = client.messages.create(
                body="Your private code is {} don't share with anyone".format(otp_code),
                from_='+17575304751',
                to=phone,
            )

            Verify.objects.create(phone_number=registered_phone_num, code=otp_code)
            return Response("OTP has been sent to your phone number", status=status.HTTP_200_OK)
        return Response("Your phone number is not registered ", status=status.HTTP_404_NOT_FOUND)


class VerifyViewSet(ModelViewSet):
    queryset = Verify.objects.all()
    serializer_class = VerifySerializer
    http_method_names = ['delete']

    def destroy(self, request, *args, **kwargs):
        phone_num = request.data.get('phone_number')
        code = request.data.get('code')
        result = Verify.objects.get(phone_number__phone_number=phone_num, code=code)
        if result:
            result.delete()
            return Response('OK', status=status.HTTP_200_OK)
        return Response('Invalid Phone Number or OTP', status=status.HTTP_404_NOT_FOUND)


