from django.urls import path, include
from rest_framework import routers
from .viewsets import ConversationViewSet

router = routers.DefaultRouter()
router.register(r'chat', ConversationViewSet, basename='openai-chat')
urlpatterns = [
    path('', include(router.urls)),
]