from django.urls import include, path
from rest_framework import routers

from . import viewsets

router = routers.DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('webhook/', viewsets.FormDefinitionView.as_view()),
    path('form-answer/<form_id>/', viewsets.FormDefinitionDetailView.as_view())
]
