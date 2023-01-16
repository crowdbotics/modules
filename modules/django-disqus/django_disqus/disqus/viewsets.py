from rest_framework import viewsets, status
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

    def get_queryset(self):
        queryset = self.queryset
        parent = self.request.query_params.get("parent", None)
        item_uuid = self.request.query_params.get("item_uuid", None)
        if item_uuid and parent:
            queryset = queryset.filter(item_uuid=item_uuid, parent_comment_id=parent)
        elif item_uuid:
            queryset = queryset.filter(item_uuid=item_uuid, parent_comment__isnull=True)
        return queryset


class LikeOnCommentViewSet(viewsets.ModelViewSet):
    """
        - like_on_comment: This class will create a like or remove a like on given comment from a user.And return total
         likes on that comment.
    """
    serializer_class = LikeOnCommentSerializer
    queryset = LikeOnComment.objects.all()
    authentication_classes = (SessionAuthentication, TokenAuthentication)

    def create(self, request, *args, **kwargs):
        data = {
            "comment": request.data.get("comment"),
            "user": self.request.user.id
        }
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        instance = LikeOnComment.objects.filter(comment=request.data.get("comment"), user=self.request.user.id)
        if instance:
            instance.delete()
            return Response({"message": "Like removed successfully"}, status=status.HTTP_200_OK)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
