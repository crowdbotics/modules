from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .viewsets import WordpressPostsViewSet, WordpressAuthViewSet, WordpressUsersViewSet, WordpressSitesViewSet, \
    WordpressCommentsViewSet, WordpressTaxonomyViewSet, WordpressFollowViewSet, WordpressFreshlyPressedViewSet, \
    WordpressReaderViewSet, WordpressStatsViewSet, WordpressMenuViewSet, WordpressInsightsViewSet

router = DefaultRouter()
router.register("auth", WordpressAuthViewSet, basename="wordpress_auth")
router.register("posts", WordpressPostsViewSet, basename="wordpress_posts")
router.register("users", WordpressUsersViewSet, basename="wordpress_users")
router.register("sites", WordpressSitesViewSet, basename="wordpress_sites")
router.register("comments", WordpressCommentsViewSet, basename="wordpress_comments")
router.register("taxonomy", WordpressTaxonomyViewSet, basename="wordpress_taxonomy")
router.register("follow", WordpressFollowViewSet, basename="wordpress_follow")
router.register("freshly-pressed", WordpressFreshlyPressedViewSet, basename="wordpress_freshly_pressed")
router.register("reader", WordpressReaderViewSet, basename="wordpress_reader")
router.register("stats", WordpressStatsViewSet, basename="wordpress_stats")
router.register("menu", WordpressMenuViewSet, basename="wordpress_menu")
router.register("insights", WordpressInsightsViewSet, basename="wordpress_insights")


urlpatterns = [
    path("", include(router.urls)),
]
