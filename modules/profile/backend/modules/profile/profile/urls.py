from django.urls import path, include
from rest_framework import routers

from .viewsets import ProfileView

router = routers.DefaultRouter()
router.register('user-profile', ProfileView, basename='user_profile')
urlpatterns = [
    path('', include(router.urls)),
]
