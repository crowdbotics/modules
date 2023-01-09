from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .viewsets import MailchimpAudienceViewSet, MailchimpTemplatesViewSet


router = DefaultRouter()
router.register("audience", MailchimpAudienceViewSet, basename="mailchimp_audience")
router.register("templates", MailchimpTemplatesViewSet, basename="mailchimp_templates")

urlpatterns = [
    path("", include(router.urls)),
]
