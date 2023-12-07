from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .viewsets import (
    UserSessionViewset,
    SessionActivitiesViewset,
    HomeViewSets,
    UserConnectViewSet,
    UserRequestViewSet,
    AboutTeamAndBoardViewSet,
    confirm_view,
    OfferigsPageViewSet,
    MetaLinkAPIView
)

router = DefaultRouter()
router.register("user-session", UserSessionViewset, basename="user-session")
router.register("session/activity", SessionActivitiesViewset, basename="activities")
router.register("home", HomeViewSets, basename="home")
router.register("connect", UserConnectViewSet, basename="connect")
router.register("connect/accept", UserRequestViewSet, basename="connect-accept")
router.register("board-team", AboutTeamAndBoardViewSet, basename="board-team")
router.register("offerings", OfferigsPageViewSet, basename="offerings")


urlpatterns = [
    path("", include(router.urls)),
    path('confirm/', confirm_view, name='confirm_view'),
    path('meta_link/', MetaLinkAPIView.as_view(), name='meta_link')

]
