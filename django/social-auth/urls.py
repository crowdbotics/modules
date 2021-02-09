from django.urls import path, include
from .views import FacebookConnect, GoogleConnect

urlpatterns = [
    path('facebook/connect/', FacebookConnect.as_view(), name='social_facebook_connect'),
    path('google/connect/', GoogleConnect.as_view(), name='social_google_connect'),
]
