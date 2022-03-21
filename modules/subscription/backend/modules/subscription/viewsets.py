import json

from django.core.exceptions import ValidationError
from django.views.generic import TemplateView
from rest_framework.response import Response
from rest_framework import authentication, permissions, status
from rest_framework.views import APIView
import stripe

from modules.subscription.models import SubscriptionPlan
from modules.subscription.serializers import SubscriptionPlanSerializer
from modules.subscription.services.StripeSubscriptionService import StripeSubscriptionService


class ManageSubscriptionsView(TemplateView):
    template_name = "subscription/index.html"

    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super().get_context_data(**kwargs)
        # Add in a QuerySet of all the books
        # context['products'] = StripeSubscriptionService.get_products_with_detail()
        context['get_portal_session'] = StripeSubscriptionService.get_portal_session("cus_KY067C6rxtCxb7")
        # context['create_subscription'] = StripeSubscriptionService.create_subscription("cus_KY067C6rxtCxb7", "price_1Kceg0DWvyLYvYlE2I8SRkPe")
        return context


class SubscriptionPlanView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        plans = SubscriptionPlan.objects.filter(is_active=True)
        response = SubscriptionPlanSerializer(plans, many=True, context={'user': request.user})
        print(response.data)
        return Response({
            'success': True,
            'result': response.data,
        }, status=status.HTTP_200_OK)


class BuySubscriptionPlanView(APIView):
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
        price_tier = request.data.get('price_tier')
        plan = SubscriptionPlan.objects.get(price_id=price_tier)
        already_has_a_plan = StripeSubscriptionService.already_has_a_plan(user)
        print("StripeSubscriptionService")
        if already_has_a_plan.subscription_id:
            # update subscription
            print("StripeSubscriptionService3")
            result = StripeSubscriptionService.update_subscription(already_has_a_plan.subscription_id, plan.price_id)
        else:
            print("StripeSubscriptionService2")
            result = StripeSubscriptionService.create_subscription(stripe_cus_id, plan.price_id)
        response = result
        return Response(response, status=status.HTTP_200_OK)


class CancelSubscriptionPlanView(APIView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
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