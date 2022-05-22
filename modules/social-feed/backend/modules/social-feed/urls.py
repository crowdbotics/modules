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
    path("my-feed/", MyFeedView.as_view()),
]