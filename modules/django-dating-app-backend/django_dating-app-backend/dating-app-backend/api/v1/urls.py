from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    ProfileView,
    ProfileDetailsView,
    AllProfilesView,
    GetMatchesView,
    ProfileSetupView
)

from .post_views import (
    CreatePostView,
    MyFeedView,
    LikePostView,
    UnlikePostView,
    UnlikeCommentView,
    PostCommentView,
    LikeCommentView,
    DeleteCommentView,
    ReportPostView,
    MatchRequestView,
    UnMatchRequestView,
)

router = DefaultRouter()

urlpatterns = [
    path("", include(router.urls)),
    path("my-profile", ProfileView.as_view(), name="my-profile"),
    path("profile-details", ProfileDetailsView.as_view(), name="profile-details"),
    path("all-profiles", AllProfilesView.as_view(), name="all-profiles"),
    path("get-matches/", GetMatchesView.as_view()),
    path("create-post/", CreatePostView.as_view()),
    path("my-feed/", MyFeedView.as_view()),
    path("like-post/", LikePostView.as_view()),
    path("unlike-post/", UnlikePostView.as_view()),
    path("like-comment/", LikeCommentView.as_view()),
    path("unlike-comment/", UnlikeCommentView.as_view()),
    path("report-post/", ReportPostView.as_view()),
    path("post-comment/", PostCommentView.as_view()),
    path("delete-comment/", DeleteCommentView.as_view()),
    path("match-request/", MatchRequestView.as_view()),
    path("un-match-request/", UnMatchRequestView.as_view()),
    path("setup-profile/", ProfileSetupView.as_view()),
]
