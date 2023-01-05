from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import CommentViewSet, LikeOnCommentViewSet

router = DefaultRouter()
router.register("comment", CommentViewSet, basename="comments")

urlpatterns = [
    path("", include(router.urls)),
    path("comment/like/", LikeOnCommentViewSet.as_view({'post': 'create'}), name="like")
]
