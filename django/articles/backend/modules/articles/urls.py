from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .viewsets import ArticleViewSet

router = DefaultRouter()
router.register("article", ArticleViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
