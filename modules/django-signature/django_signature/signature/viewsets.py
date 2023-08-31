from .models import Signature
from .serializers import SignatureSerializer, SignatureUploadSerializer
from rest_framework import viewsets
from rest_framework.parsers import FileUploadParser
from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response
import base64
from django.core.files.base import ContentFile


class SignatureViewSet(viewsets.ModelViewSet):
    queryset = Signature.objects.all()
    serializer_class = SignatureSerializer
    http_method_names = ["get"]


class SignatureUploadView(APIView):
    parser_class = (FileUploadParser,)

    def post(self, request, *args, **kwargs):
        """
        Upload image to the location created in the models.py by fileName method.
        :param request: Contains object named data which has image 64base converted image to be uploaded.
        """
        try:
            image = request.data["image"]
            format, imgstr = image.split(";base64,")
            ext = format.split("/")[-1]
            data = ContentFile(base64.b64decode(imgstr), name="temp." + ext)
            Signature.objects.create(image=data)
            return Response(
                {"message": "Image uploaded successfully."},
                status=status.HTTP_201_CREATED,
            )
        except Exception as e:
            return Response(e.args[0], status=status.HTTP_400_BAD_REQUEST)
