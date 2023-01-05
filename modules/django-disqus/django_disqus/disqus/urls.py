from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import CommentViewSet, LikeOnCommentViewSet


router = DefaultRouter()
router.register("comment", CommentViewSet, basename="comments")
router.register("like-on-comment", LikeOnCommentViewSet, basename="like-on-comments")

urlpatterns = [
    path("", include(router.urls)),
]
