from django.urls import path
from .viewsets import (AccessTokenViewSet, DealsListViewSet, CreateDealViewSet, RemoveDealViewSet, SingleDealViewSet,
                       WebHookViewSet, MeetingToContactsListViewSet, ContactToDealsListViewSet)

urlpatterns = [
    path('access/token/', AccessTokenViewSet.as_view()),
    path('deals/list/', DealsListViewSet.as_view()),
    path('deals/create/', CreateDealViewSet.as_view()),
    path('deals/remove/', RemoveDealViewSet.as_view()),
    path('deals/single/', SingleDealViewSet.as_view()),
    path('contact/deals/list/', ContactToDealsListViewSet.as_view()),
    path('meeting/contacts/list/', MeetingToContactsListViewSet.as_view()),
    path('webhook/', WebHookViewSet.as_view()),
]
