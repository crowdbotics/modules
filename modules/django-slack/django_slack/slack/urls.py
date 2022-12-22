from django.urls import path
from .viewsets import FileViewSet, MessageViewSet

urlpatterns = [
    path("message/attachment/", FileViewSet.as_view()),
    path("message/", MessageViewSet.as_view())

]
