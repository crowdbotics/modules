from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication, SessionAuthentication

from .models import Post, PostMedia, ReportPost, FollowRequest, PostComment, LikeComment, UpvotePost, DownvotePost, Chat
from .serializers import (
    ChatSerializer,
    DownvotePostSerializer,
    FollowRequestSerializer,
    LikeCommentSerializer,
    PostSerializer,
    PostCommentSerializer,
    PostMediaSerializer,
    ReportPostSerializer,
    UpvotePostSerializer,PostDetailSerializer
)

class MyFeedView(APIView):
    authentication_classes = (
        SessionAuthentication,
        TokenAuthentication,
    )

    def get(self, request):
        posts = Post.objects.all()
        serializer = PostDetailSerializer(posts, many=True)
        return Response(serializer.data)

