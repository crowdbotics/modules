from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .viewsets import CommentViewSet, LikeOnCommentViewSet

router = DefaultRouter()
router.register("comment", CommentViewSet, basename="comments")
router.register("comment-like", LikeOnCommentViewSet, basename="comments-like")

urlpatterns = [
    path("", include(router.urls)),
]
