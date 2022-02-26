from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions, status
from rest_framework.viewsets import ViewSet
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt

import stripe

from .models import AppleIAPProduct
from .services.ApplePaymentService import ApplePaymentService
from .services.StripeService import StripeService
from .serializers import appleIAPSerializer
from .services.StripeService import StripeService


class PaymentSheetView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        stripe_profile = user.stripe_profile
        if not stripe_profile.stripe_cus_id:
            customer = stripe.Customer.create(email=user.email)
            stripe_cus_id = customer['id']
            stripe_profile.stripe_cus_id = stripe_cus_id
            stripe_profile.save()
        else:
            stripe_cus_id = stripe_profile.stripe_cus_id
        cents = request.data.get('cents', 100)
        response = StripeService.create_payment_intent_sheet(stripe_cus_id, cents)
        return Response(response, status=status.HTTP_200_OK)


class GetStripePaymentsView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        stripe_profile = user.stripe_profile
        if not stripe_profile.stripe_cus_id:
            stripe_cus_id = None
        else:
            stripe_cus_id = stripe_profile.stripe_cus_id
        history = StripeService.get_payments_history(stripe_cus_id)
        response = {
            "success": True,
            "data": history
        }
        return Response(response, status=status.HTTP_200_OK)


class GetPaymentMethodsView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        stripe_profile = user.stripe_profile
        if not stripe_profile.stripe_cus_id:
            stripe_cus_id = None
        else:
            stripe_cus_id = stripe_profile.stripe_cus_id
        history = StripeService.get_payments_methods(stripe_cus_id)
        response = {
            "success": True,
            "data": history
        }
        return Response(response, status=status.HTTP_200_OK)

class AppleIAProductsView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        products = AppleIAPProduct.objects.filter(is_active=True)
        response = {
            "success": True,
            "data": [obj.as_dict() for obj in products]
        }
        return Response(response, status=status.HTTP_200_OK)


class AppleIAPayment(ViewSet):
    serializer_class = appleIAPSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    @csrf_exempt
    def create(self, request):
        data_copy = request.data.copy()
        data_copy['user'] = request.user
        serializer = self.serializer_class(
            data=data_copy, context={"request": request}
        )
        data = None
        if serializer.is_valid(raise_exception=True):
            verify_receipt, success = ApplePaymentService.verify_apple_receipt(request.data)
            print('verify_receipt', verify_receipt)
            if success:
                data = "success"
            else:
                data = "fail"
        return Response({
            'success': True,
            'result': data,
        }, status=status.HTTP_200_OK)
