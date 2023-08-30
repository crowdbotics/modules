from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .viewsets import MailchimpAudienceViewSet, MailchimpTemplatesViewSet, MailchimpCampaignViewSet, MailchimpReportsViewSet


router = DefaultRouter()
router.register("audience", MailchimpAudienceViewSet, basename="mailchimp_audience")
router.register("templates", MailchimpTemplatesViewSet, basename="mailchimp_templates")
router.register("campaigns", MailchimpCampaignViewSet, basename="mailchimp_campaigns")
router.register("campaign-reports", MailchimpReportsViewSet, basename="mailchimp_campaign_reports")

urlpatterns = [
    path("", include(router.urls)),
]
