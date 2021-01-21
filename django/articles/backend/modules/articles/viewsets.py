from rest_framework import authentication, permissions
from .models import Article
from .serializers import ArticleSerializer
from rest_framework import viewsets


class ArticleViewSet(viewsets.ModelViewSet):
    serializer_class = ArticleSerializer
    permission_classes = [permissions.AllowAny]
    authentication_classes = (
        authentication.SessionAuthentication,
        authentication.TokenAuthentication,
    )
    queryset = Article.objects.all()
