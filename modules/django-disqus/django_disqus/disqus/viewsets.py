import copy

from rest_framework import viewsets, status
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.parsers import JSONParser
from rest_framework.response import Response

from .models import Comment, LikeOnComment
from .pagination import Pagination
from .serializers import CommentSerializer, LikeOnCommentSerializer


class CommentViewSet(viewsets.ModelViewSet):
    """
        - comment_list: This class without any parameters return all comment.
        Filter results according to the provided parent_comment.
        - single_comment: The class method gets a comment.
        - create_comment: This class creates a new comment with its attributes
        - update_comment: This class update an existing comment with new attributes
    """
    serializer_class = CommentSerializer
    queryset = Comment.objects.all().order_by('id')
    parser_classes = [JSONParser]
    pagination_class = Pagination
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
        - like_on_comment: This class will create a like or remove a like on given comment from a user
        And return total likes on that comment.
    """
    serializer_class = LikeOnCommentSerializer
    queryset = LikeOnComment.objects.all().order_by('id')
    parser_classes = [JSONParser]
    pagination_class = Pagination
    authentication_classes = (SessionAuthentication, TokenAuthentication)

    def create(self, request, *args, **kwargs):
        data = copy.deepcopy(request.data)
        data["user"] = self.request.user.id
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        if instance := self.queryset.filter(comment=serializer.validated_data["comment"], user=self.request.user):
            instance.delete()
            return Response({"message": "Unlike successfully"}, status=status.HTTP_200_OK)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
