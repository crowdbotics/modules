from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .viewsets import *
from .views import *

router = DefaultRouter()
router.register("post", PostViewSet)
router.register("postmedia", PostMediaViewSet)
router.register("reportpost", ReportPostViewSet)
router.register("followrequest", FollowRequestViewSet)
router.register("postcomment", PostCommentViewSet)
router.register("likecomment", LikeCommentViewSet)
router.register("upvotepost", UpvotePostViewSet)
router.register("downvotepost", DownvotePostViewSet)
router.register("chat", ChatViewSet)
urlpatterns = [
    path("", include(router.urls)),
    path("create-post/", CreatePostView.as_view()),
    path("my-feed/", MyFeedView.as_view()),
    path("my-profile/", MyProfile.as_view()),
    path("profile/<int:pk>/", GetProfile.as_view()),
    path("my-followers/", MyFollowersView.as_view()),
    path("my-following/", MyFollowingView.as_view()),
    path("follow/<int:pk>/", FollowView.as_view()),
    path("unfollow/<int:pk>/", UnFollowView.as_view()),
    path("like-post/", LikePostView.as_view()),
    path("unlike-post/", UnlikePostView.as_view()),
    path("like-comment/", LikeCommentView.as_view()),
    path("unlike-comment/", UnlikeCommentView.as_view()),
    path("report-post/", ReportPostView.as_view()),
    path("post-comment/", PostCommentView.as_view()),
    path("delete-comment/", DeleteCommentView.as_view()),
]

