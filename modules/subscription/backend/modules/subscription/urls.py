from django.urls import re_path, path, include
from rest_framework.routers import DefaultRouter

from .viewsets import ManageSubscriptionsView, SubscriptionPlanView, BuySubscriptionPlanView

router = DefaultRouter()

urlpatterns = [
    re_path(r'manage_subscriptions/?', ManageSubscriptionsView.as_view()),
    re_path(r'get_subscription_plans/?', SubscriptionPlanView.as_view()),
    re_path(r'buy_subscription_plan/?', BuySubscriptionPlanView.as_view()),
    path("", include(router.urls)),
]