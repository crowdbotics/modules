from django.urls import path
from .viewsets import (GetDriveFilesViewSet, UploadDriveFileViewSet, CreateDriveFolderViewSet, ShareFileViewSet)

urlpatterns = [
    path('files/', GetDriveFilesViewSet.as_view()),
    path('file/upload/', UploadDriveFileViewSet.as_view()),
    path('file/share/', ShareFileViewSet.as_view()),
    path('folder/create/', CreateDriveFolderViewSet.as_view()),
]
