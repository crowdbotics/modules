from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class BaseModel(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Comment(BaseModel):
    item_uuid = models.CharField(max_length=50)  # item_uuid: this is post id or can be a foreignkey
    comment = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    parent_comment = models.ForeignKey("self", on_delete=models.CASCADE,
                                       null=True, blank=True, related_name="replies_comments")

    def __str__(self):
        return str(self.comment)


class LikeOnComment(BaseModel):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name="likes_on_comment")
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return str(self.comment)
