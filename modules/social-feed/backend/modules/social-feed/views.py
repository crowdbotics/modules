from email.mime import image
from re import T
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.pagination import PageNumberPagination
from yaml import serialize
from rest_framework.parsers import FileUploadParser
from home.api.v1.serializers import UserSerializer

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
    UpvotePostSerializer,
    PostDetailSerializer,
    ProfileSerializer,
    FollowingSerializer,
    FollowersSerializer,
)


class CreatePostView(APIView):
    authentication_classes = (TokenAuthentication, SessionAuthentication)
    parser_class = (FileUploadParser,)

    def post(self, request):
        caption = request.data.get('caption')
        user = request.user
        post = Post.objects.create(caption=caption, description=caption, user=user)
        media = request.data.get('media')
        if media:
            data = request.data.copy()
            data['post'] = post.pk
            data['image'] = data.get('media')
            p = PostMediaSerializer(data=data, partial=True)
            p.is_valid(raise_exception=True)
            p.save()
        serializer = PostSerializer(post)
        return Response(serializer.data, status=200)
        

class MyFeedView(APIView):
    authentication_classes = (
        SessionAuthentication,
        TokenAuthentication,
    )

    def get(self, request):
        posts = Post.objects.all()
        serializer = PostDetailSerializer(posts, many=True, context={'request': request})
        return Response(serializer.data)


class MyProfile(APIView):
    authentication_classes = (
        SessionAuthentication,
        TokenAuthentication,
    )

    def get(self, request):
        user = request.user
        serializer = ProfileSerializer(user)
        return Response(serializer.data)

class GetProfile(APIView):
    authentication_classes = (
        SessionAuthentication,
        TokenAuthentication,
    )

    def get(self, request, pk):
        from django.contrib.auth import get_user_model
        User = get_user_model()
        user = User.objects.get(pk=pk)
        serializer = ProfileSerializer(user)
        return Response(serializer.data)


class MyFollowersView(APIView, PageNumberPagination):
    authentication_classes = (
        SessionAuthentication,
        TokenAuthentication,
    )

    def get(self, request, format=None):
        user = request.user
        followers = [follow.user for follow in user.user_followers.all()]
        results = self.paginate_queryset(followers, request, view=self)
        serializer = FollowersSerializer(results, many=True, context={'request': request})
        return self.get_paginated_response(serializer.data)


class MyFollowingView(APIView, PageNumberPagination):
    authentication_classes = (
        SessionAuthentication,
        TokenAuthentication,
    )

    def get(self, request):
        user = request.user
        following = [follow.follow for follow in user.user_following.all()]
        results = self.paginate_queryset(following, request, view=self)
        serializer = FollowingSerializer(results, many=True, context={'request': request})
        return self.get_paginated_response(serializer.data)


class LikePostView(APIView):
    authentication_classes = (
        TokenAuthentication,
    )

    def post(self, request):
        post_id = request.data.get('post_id')
        user = request.user
        UpvotePost.objects.get_or_create(post_id=post_id, upvote_by=user)
        return Response(status=200)

class UnlikePostView(APIView):
    authentication_classes = (
        TokenAuthentication,
    )

    def post(self, request):
        post_id = request.data.get('post_id')
        user = request.user
        UpvotePost.objects.filter(post_id=post_id, upvote_by=user).delete()
        return Response(status=200)


class LikeCommentView(APIView):
    authentication_classes = (
        SessionAuthentication,
        TokenAuthentication,
    )

    def post(self, request):
        comment_id = request.data.get('comment_id')
        user = request.user
        LikeComment.objects.get_or_create(comment_id=comment_id, liked_by=user)
        return Response(status=200)

class UnlikeCommentView(APIView):
    authentication_classes = (
        TokenAuthentication,
    )

    def post(self, request):
        comment_id = request.data.get('comment_id')
        user = request.user
        LikeComment.objects.filter(comment_id=comment_id, liked_by=user).delete()
        return Response(status=200)


class ReportPostView(APIView):
    authentication_classes = (
        SessionAuthentication,
        TokenAuthentication,
    )

    def post(self, request):
        post_id = request.data.get('post_id')
        reason = request.data.get('reason')
        user = request.user
        ReportPost.objects.create(
            post_id=post_id, reported_by=user, reason=reason
        )
        return Response(status=200)


class PostCommentView(APIView):
    authentication_classes = (
        SessionAuthentication,
        TokenAuthentication,
    )

    def post(self, request):
        post_id = request.data.get('post_id')
        comment = request.data.get('comment')
        ref_comment = request.data.get('ref_comment')
        if ref_comment:
            ref = PostComment.objects.get(id=ref_comment)
            if ref.ref_comment:
                ref = ref.ref_comment
        else:
            ref = None

        user_id = request.user.id
        kwargs = {
            'post_id': post_id,
            'comment': comment,
            'user_id': user_id,
        }
        if ref :
            kwargs['ref_comment'] = ref
        PostComment.objects.create(
            **kwargs
        )
        return Response(status=200)


class DeleteCommentView(APIView):
    authentication_classes = (
        TokenAuthentication,
    )

    def post(self, request):
        comment_id = request.data.get('comment_id')
        PostComment.objects.filter(id=comment_id).delete()
        return Response(status=200)