from django.urls import path
from .viewsets import AuthGrant, CreateEnvelop

urlpatterns = [
    path('auth-grant/', AuthGrant.as_view()),
    path('create-envelop/', CreateEnvelop.as_view()),

]