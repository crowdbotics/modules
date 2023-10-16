from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import *
from .viewsets import *

router = DefaultRouter()
router.register("post", PostViewSet)
router.register("postmedia", PostMediaViewSet)
router.register("reportpost", ReportPostViewSet)
router.register("followrequest", FollowRequestViewSet)
router.register("postcomment", PostCommentViewSet)
router.register("likecomment", LikeCommentViewSet)
router.register("upvotepost", UpvotePostViewSet)
router.register("downvotepost", DownVotePostViewSet)
router.register("chat", ChatViewSet)
urlpatterns = [
    path("", include(router.urls)),
    path("create-post/", CreatePostView.as_view(), name='create-post'),
    path("my-feed/", MyFeedView.as_view(), name='my-feed'),
    path("my-profile/", MyProfile.as_view(), name='my-profile'),
    path("profile/<int:pk>/", GetProfile.as_view(), name='profile'),
    path("my-followers/", MyFollowersView.as_view(), name='my-followers'),
    path("my-following/", MyFollowingView.as_view(), name='my-following'),
    path("follow/<int:pk>/", FollowView.as_view(), name='follow'),
    path("unfollow/<int:pk>/", UnFollowView.as_view(), name='unfollow'),
    path("like-post/", LikePostView.as_view(), name='like-post'),
    path("unlike-post/", UnlikePostView.as_view(), name='unlike-post'),
    path("like-comment/", LikeCommentView.as_view(), name='like-comment'),
    path("unlike-comment/", UnlikeCommentView.as_view(), name='unlike-comment'),
    path("report-post/", ReportPostView.as_view(), name='report-post'),
    path("post-comment/", PostCommentView.as_view(), name='post-comment'),
    path("delete-comment/", DeleteCommentView.as_view(), name='delete-comment'),
]
