from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAdminUser
from .serializers import FaqSerializer
from .models import Faq
from rest_framework.filters import SearchFilter
from .pagination import CustomPageNumberPagination


class FaqViewSet(ModelViewSet):

    """
    This viewset performs all the CRUD operations on FAQ model
    """

    serializer_class = FaqSerializer
    queryset = Faq.objects.filter(is_active=True)
    pagination_class = CustomPageNumberPagination
    filter_backends = [
        SearchFilter,
    ]
    search_fields = ["$question"]

    def get_permissions(self):
        """
        Following Permissions are given for following operations:
           a) Create: Only Admin
           b) Update: Only Admin
           c) Delete: Only Admin
           d) Read : All users
        """

        if self.action in ("create", "update", "destroy"):
            self.permission_classes = [IsAdminUser]
        return [permission() for permission in self.permission_classes]
