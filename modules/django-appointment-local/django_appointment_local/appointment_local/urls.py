from django.urls import path, include
from rest_framework import routers

from .viewsets import AppointmentViewSet, MeetingInformationViewSet

router = routers.DefaultRouter()
router.register('meetings-information', MeetingInformationViewSet, basename='meetings-information')
router.register('appointment', AppointmentViewSet, basename='appointment')

urlpatterns = [
    path('', include(router.urls)),
]
