from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.parsers import FileUploadParser
from django.contrib.auth import get_user_model

User =  get_user_model()

from ...models import Post, ReportPost, PostComment, LikeComment, UpvotePost, DownvotePost, MatchRequest, Match, MatchDenied
from .serializers import (
    DownvotePostSerializer,
    LikeCommentSerializer,
    PostSerializer,
    PostCommentSerializer,
    PostMediaSerializer,
    ReportPostSerializer,
    UpvotePostSerializer,
    PostDetailSerializer,
    ProfileSerializer,
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
        serializer = ProfileSerializer(user, context={'request': request})
        return Response(serializer.data)


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

class MatchRequestView(APIView):
    authentication_classes = (
        TokenAuthentication,
    )

    def post(self, request):
        user = request.user
        match_for = request.data.get('match_for')
        # if the other use has alreadt sent a match request then
        # maybe send a notification for the match acceptance 
        MatchRequest.objects.get_or_create(
            user=user,
            match_request_for_id=match_for,
        )
        already_match = MatchRequest.objects.filter(
            user_id=match_for,
            match_request_for=user,
        ).count()
        # if the user
        if already_match:
           Match.objects.get_or_create(
            user=user,
            match_with_id=match_for,
           )
        from pyfcm import FCMNotification
        push_service = FCMNotification(api_key="<api-key>")

        # Send a notification to user for the match request
        # Push notification (Firebase Cloud Messaging)
        # https://rnfirebase.io/messaging/usage

        # send the notification to a token

        # app is installed on the device
        # it generates a token (FCM Token)
        # API: we have to send the token to the server (to be associated to profile)

        return Response(status=200)


class UnMatchRequestView(APIView):
    authentication_classes = (
        TokenAuthentication,
    )

    def post(self, request):
        user = request.user
        match_denied_with = request.data.get('match_denied_with')
        MatchRequest.objects.filter(
            user=user,
            match_request_for_id=match_denied_with,
        ).delete()

        MatchDenied.objects.get_or_create(
            user=user,
            match_denied_with_id=match_denied_with,
        )
        return Response(status=200)