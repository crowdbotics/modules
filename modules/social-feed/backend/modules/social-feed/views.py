from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.parsers import FileUploadParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Post, Follow, PostComment, LikeComment, UpvotePost
from .pagination import LargeResultsSetPagination
from .serializers import (
    PostSerializer,
    PostMediaSerializer,
    PostDetailSerializer,
    ProfileSerializer,
    FollowingSerializer,
    FollowersSerializer, UnlikeCommentsSerializer, likeCommentsSerializer, PostUnlikeSerializer,
    CommentDeleteSerializer, PostLikeSerializer,
    ReportPostSerializer, PostCommentSerializer
)

User = get_user_model()


class CreatePostView(APIView):
    authentication_classes = (TokenAuthentication, SessionAuthentication)
    parser_class = (FileUploadParser,)
    permission_classes = [IsAuthenticated]

    def post(self, request):
        """
        create_post: Creates a post
        :Authorization: user_token
        :body_params: form-data(caption, media(image-field))
        :return : Post ID and details
        """
        serializer = PostSerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        media = request.FILES.get('media')
        if media:
            post_media_data = {'post': serializer.data['id'], 'image': media}
            post_media = PostMediaSerializer(data=post_media_data, partial=True)
            post_media.is_valid(raise_exception=True)
            post_media.save()
            serializer = serializer.data
            serializer['media'] = post_media.data
        return Response(serializer.data, status=status.HTTP_200_OK)


class MyFeedView(APIView):
    authentication_classes = (
        SessionAuthentication,
        TokenAuthentication,
    )
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        list_feed: list a posts
        :Authorization: user_token
        :return : List of all posts
        """
        posts = Post.objects.all().order_by('-id')
        serializer = PostDetailSerializer(posts, many=True, context={'request': self.request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class MyProfile(APIView):
    authentication_classes = (
        SessionAuthentication,
        TokenAuthentication,
    )
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        My-profile: get a post with complete details.
        :Authorization: user_token
        :return : List of all user's posts containing it details (follower, following and owner).
        """
        user = self.request.user
        serializer = ProfileSerializer(user, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class GetProfile(APIView):
    authentication_classes = (
        SessionAuthentication,
        TokenAuthentication,
    )
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        """
        Get-profile: get a user with posts detail.
        :Authorization: user_token
        :return : User's detail with its posts.
        """
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = ProfileSerializer(user, context={'request': self.request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class MyFollowersView(APIView, LargeResultsSetPagination):
    authentication_classes = (
        SessionAuthentication,
        TokenAuthentication,
    )
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        My-followers: get user's followers detail.
        :Authorization: user_token
        :return : User's detail with its followers.
        """
        user = request.user
        followers = [follow.user for follow in user.user_followers.all()]
        results = self.paginate_queryset(followers, request, view=self)
        serializer = FollowersSerializer(results, many=True, context={'request': request})
        return self.get_paginated_response(serializer.data)


class MyFollowingView(APIView, LargeResultsSetPagination):
    authentication_classes = (
        SessionAuthentication,
        TokenAuthentication,
    )
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        My-Following: get user's following detail.
        :Authorization: user_token
        :return : User's following list detail.
        """
        user = request.user
        following = [follow.follow for follow in user.user_following.all()]
        results = self.paginate_queryset(following, request, view=self)
        serializer = FollowingSerializer(results, many=True, context={'request': request})
        return self.get_paginated_response(serializer.data)


class LikePostView(APIView):
    authentication_classes = (
        TokenAuthentication,
    )
    permission_classes = [IsAuthenticated]

    def post(self, request):
        """
        LikePostView: Like the users posts.
        :Authorization: user_token
        :body_params: "post_id"
        :return : Like the post and return 200 status code.
        """
        serializer = PostLikeSerializer(data=self.request.data)
        serializer.is_valid(raise_exception=True)
        UpvotePost.objects.get_or_create(post_id=serializer.validated_data.get('post_id').id,
                                         upvote_by=self.request.user)
        return Response(status=status.HTTP_200_OK)


class UnlikePostView(APIView):
    authentication_classes = (
        TokenAuthentication,
    )
    permission_classes = [IsAuthenticated]

    def post(self, request):
        """
        UnLikePostView: UnLike the users posts.
        :Authorization: user_token
        :body_params: "post_id"
        :return : UnLike the post and return 200 status code.
        """
        serializer = PostUnlikeSerializer(data=self.request.data)
        serializer.is_valid(raise_exception=True)
        UpvotePost.objects.get(post_id=serializer.validated_data.get('post_id').id,
                               upvote_by=self.request.user).delete()
        return Response(status=status.HTTP_200_OK)


class LikeCommentView(APIView):
    authentication_classes = (
        SessionAuthentication,
        TokenAuthentication,
    )
    permission_classes = [IsAuthenticated]

    def post(self, request):
        """
          LikeComment: Like the comment on posts.
          :Authorization: user_token
          :body_params: "comment_id"
          :return : Like the comment and return 200 status code.
          """
        serializer = likeCommentsSerializer(data=self.request.data)
        serializer.is_valid(raise_exception=True)
        LikeComment.objects.get_or_create(comment_id=serializer.validated_data.get('comment_id').id,
                                          liked_by=self.request.user)
        return Response(status=status.HTTP_200_OK)


class UnlikeCommentView(APIView):
    authentication_classes = (
        TokenAuthentication,
    )
    permission_classes = [IsAuthenticated]

    def post(self, request):
        """
        UnLikeComment: UnLike the comment on posts.
        :Authorization: user_token
        :body_params: "comment_id"
        :return : UnLike the comment and return 200 status code.
        """
        serializer = UnlikeCommentsSerializer(data=self.request.data)
        serializer.is_valid(raise_exception=True)
        LikeComment.objects.get(comment_id=serializer.validated_data.get('comment_id').id,
                                liked_by=self.request.user).delete()
        return Response(status=status.HTTP_200_OK)


class ReportPostView(APIView):
    authentication_classes = (
        SessionAuthentication,
        TokenAuthentication,
    )
    permission_classes = [IsAuthenticated]

    def post(self, request):
        """
          ReportPost: report the posts.
          :Authorization: user_token
          :body_params: "post_id", "reason"
          :return : Report the post and return 200 status code.
          """
        serializer = ReportPostSerializer(data=self.request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_200_OK)


class PostCommentView(APIView):
    authentication_classes = (
        SessionAuthentication,
        TokenAuthentication,
    )
    permission_classes = [IsAuthenticated]

    def post(self, request):
        """
        PostComment: Comment on posts.
        :Authorization: user_token
        :body_params: "post_id", "comment"
        :return : Create a comment on post and return comment_id with 200 status code.
        """
        serializer = PostCommentSerializer(data=self.request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        ref_comment = serializer.validated_data.get('ref_comment')
        ref = None
        if ref_comment:
            ref = PostComment.objects.get(id=ref_comment.id)
            if ref.ref_comment:
                ref = ref.ref_comment
        serializer.save(ref_comment=ref)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DeleteCommentView(APIView):
    authentication_classes = (
        TokenAuthentication,
    )
    permission_classes = [IsAuthenticated]

    def post(self, request):
        """
        PostComment: Comment on posts.
        :Authorization: user_token
        :body_params: "comment_id"
        :return : Delete a comment on post and return 200 status code.
        """
        serializer = CommentDeleteSerializer(data=self.request.data)
        serializer.is_valid(raise_exception=True)
        PostComment.objects.get(id=serializer.validated_data.get('comment_id').id).delete()
        return Response(status=status.HTTP_200_OK)


class FollowView(APIView):
    authentication_classes = (
        SessionAuthentication,
        TokenAuthentication,
    )
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        """
        FollowView: For following the user.
        :Authorization: user_token
        :path_params: user-id
        :return : Follow the user and return 200 status code.
        """
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        Follow.objects.get_or_create(user=self.request.user, follow=user)
        return Response(status=status.HTTP_200_OK)


class UnFollowView(APIView):
    authentication_classes = (
        SessionAuthentication,
        TokenAuthentication,
    )
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        """
        UnFollowView: For unfollow the user.
        :Authorization: user_token
        :path_params: user-id
        :return : UnFollow the user and return 200 status code.
        """
        try:
            User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        Follow.objects.filter(user=self.request.user, follow_id=pk).delete()
        return Response(status=status.HTTP_200_OK)
