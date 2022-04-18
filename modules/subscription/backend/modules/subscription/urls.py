from django.urls import re_path, path, include
from rest_framework.routers import DefaultRouter

from .viewsets import CancelSubscriptionPlanView, SubscriptionPlanView, BuySubscriptionPlanView, StripeWebhookView

router = DefaultRouter()

urlpatterns = [
    re_path(r'get_subscription_plans/?', SubscriptionPlanView.as_view()),
    re_path(r'buy_subscription_plan/?', BuySubscriptionPlanView.as_view()),
    re_path(r'cancel_subscription_plan/?', CancelSubscriptionPlanView.as_view()),
    re_path(r'stripe_webhook/?', StripeWebhookView.as_view()),
    path("", include(router.urls)),
]