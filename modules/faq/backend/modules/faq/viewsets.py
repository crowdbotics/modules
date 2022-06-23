from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAdminUser
from .serializers import FaqSerializer
from .models import Faq
from rest_framework.filters import SearchFilter
from .pagination import CustomPageNumberPagination

class FaqViewSet(ModelViewSet):

    serializer_class = FaqSerializer
    queryset = Faq.objects.filter(is_active=True)
    pagination_class = CustomPageNumberPagination
    filter_backends = [SearchFilter, ]
    search_fields = ['$question']

    def get_permissions(self):
        if self.action == 'create' or self.action == 'update':
            self.permission_classes = [IsAdminUser]
        return [permission() for permission in self.permission_classes]
