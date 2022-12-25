from django.urls import path
from .viewsets import (GetDriveFilesViewSet, UploadDriveFileViewSet, CreateDriveFolderViewSet, ShareFileViewSet)

urlpatterns = [
    path('files/', GetDriveFilesViewSet.as_view()),
    path('upload/file/', UploadDriveFileViewSet.as_view()),
    path('create/folder/', CreateDriveFolderViewSet.as_view()),
    path('share/file/', ShareFileViewSet.as_view()),
]
