from .models import Image
from .serializers import ImageSerializer
from rest_framework import viewsets

class ImageViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    http_method_names = ["get"]