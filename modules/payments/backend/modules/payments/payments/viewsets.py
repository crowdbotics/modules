import os

import stripe
from rest_framework import authentication, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import StripeSetting
from .serializers import StripeSettingSerializer
from .services.StripeService import StripeService


class PaymentSheetView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        """
        Creates paymentIntent and Ephemeral key for the customer. If no customer exists, first creates one.
        Deduct and send the application fee to the Stripe connect account for 'Stripe Setting' users.
        body_params: "cents"
        """
        try:
            user = self.request.user
            stripe_profile = user.stripe_profile
            if not stripe_profile.stripe_cus_id:
                customer = stripe.Customer.create(email=user.email)
                stripe_cus_id = customer['id']
                stripe_profile.stripe_cus_id = stripe_cus_id
                stripe_profile.save()
            else:
                stripe_cus_id = stripe_profile.stripe_cus_id

            cents = request.data.get('cents', 100)
            try:
                query = StripeSetting.objects.get(user=user)
                serializer = StripeSettingSerializer(query)
                if serializer.data['is_wallet_connect']:
                    response = StripeService.create_payment_intent_sheet(stripe_cus_id, cents,
                                                                         serializer.data['application_fee'],
                                                                         os.getenv("CONNECTED_STRIPE_ACCOUNT_ID"))
                else:
                    response = StripeService.create_payment_intent_sheet(stripe_cus_id, cents)
            except:
                response = StripeService.create_payment_intent_sheet(stripe_cus_id, cents)

            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


class GetStripePaymentsView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        """
        Returns array of PaymentIntents history for a stripe customer.
        """
        try:
            user = self.request.user
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
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


class GetPaymentMethodsView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        """
        Returns a list of PaymentMethods attached to the customer's StripeAccount.
        """
        try:
            user = self.request.user
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
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)

