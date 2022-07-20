from .models import Image
from .serializers import ImageSerializer, ImageUploadSerializer
from rest_framework import viewsets
from rest_framework.parsers import FileUploadParser
from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response

class ImageViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing accounts.
    """
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    http_method_names = ["get"]


class ImageUploadView(APIView):
	parser_class = (FileUploadParser,)
	
	def post(self, request, *args, **kwargs):
		image_serializer = ImageUploadSerializer(data=request.data, partial=True)
		try:
			if image_serializer.is_valid(raise_exception=True):
				image_serializer.save()
				return Response(image_serializer.data, status=status.HTTP_201_CREATED)
			else:
				return Response(image_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
		except Exception as e:
			return Response(e.args[0], status=status.HTTP_400_BAD_REQUEST)
