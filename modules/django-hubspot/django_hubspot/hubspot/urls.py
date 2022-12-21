from django.urls import path
from .viewsets import CreateAccessToken

urlpatterns = [
    path('get-access-token/', CreateAccessToken.as_view()),
]