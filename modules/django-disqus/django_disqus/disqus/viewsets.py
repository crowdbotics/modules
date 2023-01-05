from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from .models import Comment, LikeOnComment
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from .serializers import CommentSerializer, LikeOnCommentSerializer
from rest_framework.response import Response


class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    authentication_classes = (SessionAuthentication, TokenAuthentication)

    def get_queryset(self):
        queryset = self.queryset
        parent = self.request.query_params.get("parent", None)
        item = self.request.query_params.get("item", None)

        if parent:
            queryset = queryset.filter(parent_comment_id=parent)
        elif item:
            queryset = queryset.filter(item_uuid=item)
        else:
            queryset = queryset.filter(parent_comment__isnull=True).prefetch_related("replies_comments")
        return queryset


class LikeOnCommentViewSet(viewsets.ModelViewSet):
    serializer_class = LikeOnCommentSerializer
    queryset = LikeOnComment.objects.all()
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = [IsAuthenticated]

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
