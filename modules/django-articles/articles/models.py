from django.conf import settings
from django.db import models
from options import MEDIA_UPLOAD_PATH


class Article(models.Model):
    "Generated Model"
    title = models.CharField(
        max_length=256,
    )
    body = models.TextField()
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="article_author",
    )
    image = models.ImageField(upload_to=MEDIA_UPLOAD_PATH, blank=True, null=True)
    created_at = models.DateTimeField(
        auto_now_add=True,
    )
    updated_at = models.DateTimeField(
        auto_now=True,
    )
