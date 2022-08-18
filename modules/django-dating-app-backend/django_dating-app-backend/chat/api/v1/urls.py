from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import *


router = DefaultRouter()

urlpatterns = [
    path("", include(router.urls)),
    path("chat_list/", ChatListView.as_view(), name="chat_list"),
    path("chat_details/<int:pk>/", ChatDetailView.as_view(), name="chat_detail"),
    path('send_message/', SendMessageView.as_view(), name='send_message'),
]
