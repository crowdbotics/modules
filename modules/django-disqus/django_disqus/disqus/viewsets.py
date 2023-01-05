from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from .models import Comment, LikeOnComment
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from .serializers import CommentSerializer, LikeOnCommentSerializer
from rest_framework.response import Response


class CommentViewSet(viewsets.ModelViewSet):
    """
        - comment_list: This class without any parameters return all comment. Filter
        results according to the provided parent_comment.
        - single_comment: The class method gets a comment.
        - create_comment: This class creates a new comment with its attributes
        - update_comment: This class update an existing comment with new attributes
    """
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    http_method_names = ["get", "put", "patch", "post", "option"]

    def get_queryset(self):
        queryset = self.queryset
        parent = self.request.query_params.get("parent", None)
        if parent:
            queryset = queryset.filter(parent_comment_id=parent)
        else:
            queryset = queryset.filter(parent_comment__isnull=True).prefetch_related("replies_comments")
        return queryset


class LikeOnCommentViewSet(viewsets.ModelViewSet):
    """
        - like_on_comment: This class will create a like or remove a like on given comment from a user.And return total
         likes on that comment.
    """
    serializer_class = LikeOnCommentSerializer
    queryset = LikeOnComment.objects.all()
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = [IsAuthenticated]

    http_method_names = ["post", "option"]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = LikeOnComment.objects.filter(comment=request.data.get("comment"), user=request.data.get("user"))
        if instance:
            instance.delete()
            remaining_comment = LikeOnComment.objects.filter(
                comment_id=request.data.get("comment")
            )
            comment_on_bid = remaining_comment.count()
            return Response({"comment_on_bid": comment_on_bid}, status=status.HTTP_201_CREATED)
        already_comment = LikeOnComment.objects.filter(
            comment_id=request.data.get("comment")
        )
        comment_on_bid = already_comment.count()
        already_comment_user = already_comment.filter(user_id=self.request.user)
        if already_comment_user:
            return Response({"comment_on_bid": comment_on_bid}, status=status.HTTP_201_CREATED)
        self.perform_create(serializer)
        return Response({"comment_on_bid": comment_on_bid + 1}, status=status.HTTP_201_CREATED)