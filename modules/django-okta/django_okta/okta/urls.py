
from django.urls import path, include
from rest_framework import routers

from .viewsets import OktaCallbackViewSet, OktaViewSet, OktaUserViewSet, OktaCancelViewSet

router = routers.DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('login/', OktaViewSet.as_view()),
    path('create-user/', OktaUserViewSet.as_view()),
    path('logout/', OktaCancelViewSet.as_view()),
    path('okta-callback/', OktaCallbackViewSet.as_view()),

]
