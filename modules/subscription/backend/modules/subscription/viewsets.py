from rest_framework.response import Response
from rest_framework import authentication, permissions, status
from rest_framework.views import APIView
import stripe

from modules.subscription.models import SubscriptionPlan
from modules.subscription.serializers import SubscriptionPlanSerializer
from modules.subscription.services.StripeSubscriptionService import StripeSubscriptionService


class SubscriptionPlanView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        """
        Returns all the active subscription plans.
        :param request: Object containing user data.  
        """
        plans = SubscriptionPlan.objects.filter(is_active=True)
        response = SubscriptionPlanSerializer(plans, many=True, context={'user': request.user})
        return Response({
            'success': True,
            'result': response.data,
        }, status=status.HTTP_200_OK)


class BuySubscriptionPlanView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        """
        Updates the existing subscription if there is one. Creates a new subscription otherwise.
        
        :param request: Object containing user data. 
        """
        user = request.user
        stripe_profile = user.stripe_profile
        if not stripe_profile.stripe_cus_id:
            customer = stripe.Customer.create(email=user.email)
            stripe_cus_id = customer['id']
            stripe_profile.stripe_cus_id = stripe_cus_id
            stripe_profile.save()
        else:
            stripe_cus_id = stripe_profile.stripe_cus_id
        price_tier = request.data.get('price_tier')
        plan = SubscriptionPlan.objects.get(price_id=price_tier)
        already_has_a_plan = StripeSubscriptionService.already_has_a_plan(user)
        if already_has_a_plan.subscription_id:
            # update subscription
            result = StripeSubscriptionService.update_subscription(already_has_a_plan.subscription_id, plan.price_id)
        else:
            result = StripeSubscriptionService.create_subscription(stripe_cus_id, plan.price_id)
        response = result
        return Response(response, status=status.HTTP_200_OK)


class CancelSubscriptionPlanView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        """
        Cancels an existing subscription.

        :param request: Object containing existing user data. 
        """
        user = request.user
        already_has_a_plan = StripeSubscriptionService.already_has_a_plan(user)
        deletedSubscription = StripeSubscriptionService.cancel_subscription(already_has_a_plan.subscription_id)
        already_has_a_plan.tier = None
        already_has_a_plan.subscription_id = ""
        already_has_a_plan.is_active = False
        already_has_a_plan.save()
        return Response("", status=status.HTTP_200_OK)

class StripeWebhookView(APIView):

    def post(self, request, *args, **kwargs):
        """
        Handles EVENTS created by the stripe.
        :param request: Event details by stripe
        """
        payload = request.body
        sig_header = request.META['HTTP_STRIPE_SIGNATURE']
        try:
            event = StripeSubscriptionService.get_event_from_webhook(payload, sig_header)
            # TODO: Handle EVENTS and make user super or change subscription type
            StripeSubscriptionService.handle_webhook_events(event)
        except ValueError as e:
            # Invalid payload
            return Response(e.args, status=status.HTTP_400_BAD_REQUEST)

        return Response("", status=status.HTTP_200_OK)