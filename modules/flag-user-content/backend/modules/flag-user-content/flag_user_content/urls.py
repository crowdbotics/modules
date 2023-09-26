from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import CreateReportView, GetReportView, ChoicesView

router = DefaultRouter()

urlpatterns = [
    path("", include(router.urls)),
    path("create-report/", CreateReportView.as_view(), name='create-report'),
    path("reported-list/", GetReportView.as_view(), name='reported_list'),
    path("choice-list/", ChoicesView.as_view(), name='choice-list'),
]
