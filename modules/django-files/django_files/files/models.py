from django.conf import settings
from django.db import models

from modules.utils import get_options

MEDIA_UPLOAD_PATH = get_options("files", "MEDIA_UPLOAD_PATH")


class FileUpload(models.Model):
    title = models.CharField(
        max_length=256,
    )
    description = models.TextField()
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="files_uploaded",
    )
    file = models.FileField(upload_to=MEDIA_UPLOAD_PATH, blank=True, null=True)
    created_at = models.DateTimeField(
        auto_now_add=True,
    )
    updated_at = models.DateTimeField(
        auto_now=True,
    )

    @property
    def size(self):
        if self.file:
            return self.file.size

    class Meta:
        verbose_name = "File Upload"
        verbose_name_plural = "Files Uploads"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user} - {self.title} | {self.size} | {self.created_at}"
