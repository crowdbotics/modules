from django.urls import path

from .viewsets import ListEventsView, UserEventView, CreateUserIdView

urlpatterns = [
    path('get-user-detail/', CreateUserIdView.as_view()),
    path('list-user-events/', ListEventsView.as_view()),
    path('get-specific-events/', UserEventView.as_view()),
]
