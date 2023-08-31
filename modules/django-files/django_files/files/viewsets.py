from rest_framework import authentication, permissions, viewsets

from .models import FileUpload
from .serializers import FileUploadSerializer


class FileUploadViewSet(viewsets.ModelViewSet):
    """
    Ability to upload, get, update and delete the file.
    body_params: "title","description","user" and "file"
    return: Return details about uploaded file. 
    """
    serializer_class = FileUploadSerializer
    permission_classes = [permissions.AllowAny]
    authentication_classes = (
        authentication.SessionAuthentication,
        authentication.TokenAuthentication,
    )
    queryset = FileUpload.objects.all()
