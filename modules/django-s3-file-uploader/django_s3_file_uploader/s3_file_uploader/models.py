from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=False)

    class Meta:
        abstract = True


class UploadedFile(BaseModel):
    user_id = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="upload_user"
    )
    file_name = models.CharField(max_length=100, null=True, blank=True)
    bucket = models.CharField(max_length=205)

    def __str__(self):
        return self.file_name
