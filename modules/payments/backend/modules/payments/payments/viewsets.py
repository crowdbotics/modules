from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions, status
from django.contrib.auth.models import User
import stripe
from .services.StripeService import StripeService


class PaymentSheetView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        stripe_profile = user.stripe_profile
        if not stripe_profile.stripe_cus_id:
            customer = stripe.Customer.create(email=user.email)
            stripe_cus_id = customer["id"]
            stripe_profile.stripe_cus_id = stripe_cus_id
            stripe_profile.save()
        else:
            stripe_cus_id = stripe_profile.stripe_cus_id
        cents = request.data.get("cents", 100)
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
        response = {"success": True, "data": history}
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
        response = {"success": True, "data": history}
        return Response(response, status=status.HTTP_200_OK)
