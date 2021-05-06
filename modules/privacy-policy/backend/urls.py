from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import PrivacyPolicyViewSet

# the router here is configured such that domain.com/privacy 
# will return the privacy policy doc. This requires you to set
# a /privacy route in your main urls.py (not the privacy urls.py), which can be found in the same
# folder as your settings.py. In that folder you want something like `
#
# urlpatterns = [
#     path("", include("home.urls")),
#     path("accounts/", include("allauth.urls")),
#     path("privacy/", include("privacy.urls")), <--note this line in the main project's urls.py

router = DefaultRouter()
router.register("", PrivacyPolicyViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
