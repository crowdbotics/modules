from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class UploadFile(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="upload_user")
    file_name = models.CharField(max_length=100, null=True, blank=True)
    bucket = models.CharField(max_length=205)

    def __str__(self):
        return self.file_name

