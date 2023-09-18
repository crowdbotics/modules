from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import GetUserAppSettingsView, UpdateUserSettingsView

router = DefaultRouter()

urlpatterns = [
    path("", include(router.urls)),
    path("get_settings/", GetUserAppSettingsView.as_view(), name='get-user-settings'),
    path("update_settings/", UpdateUserSettingsView.as_view(), name='update-user-settings'),
]
