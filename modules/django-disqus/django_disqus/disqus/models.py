from math import floor
from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone

User = get_user_model()


class BaseModel(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Comment(BaseModel):
    item_uuid = models.CharField(max_length=200)
    comment = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    parent_comment = models.ForeignKey("self", on_delete=models.CASCADE,
                                       null=True, blank=True, related_name="replies_comments")

    def __str__(self):
        return str(self.item_uuid)

    def get_count_on_comment(self):
        return self.likes_on_comment.count()

    @property
    def times_ago(self):
        delta = timezone.now() - self.created
        day = delta.days
        msg = 'days' if day > 1 else 'day'
        total_second = delta.seconds
        result = f"{delta.days} {msg}" if delta.days > 0 else f"{floor(total_second / 3600)} hours ago" \
            if day >= 0 and floor(total_second / 3600) > 0 else f"{floor(total_second / 60)} minutes ago" \
            if day >= 0 and floor(total_second / 60) != 0 else f"{floor(total_second)} seconds ago" \
            if day >= 0 and floor(total_second) != 0 else "Closed"
        return result


class LikeOnComment(BaseModel):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name="likes_on_comment")
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return str(self.comment)
