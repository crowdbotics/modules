from django.conf import settings
from django.db import models


class Follow(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='user_following')
    follow = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='user_followers')

    class Meta:
        unique_together = ('user', 'follow')


class Post(models.Model):
    "Generated Model"
    user = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        related_name="post_user",
    )
    caption = models.CharField(
        max_length=256,
    )
    description = models.TextField()
    created_at = models.DateTimeField(
        auto_now_add=True,
    )


class PostMedia(models.Model):
    "Generated Model"
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        related_name="postmedia_post",
    )
    image = models.ImageField(
        upload_to="post_media",
        blank=True,
    )
    video = models.FileField(
        upload_to="post_media",
        blank=True,
    )
    background = models.CharField(
        max_length=256,
        blank=True,
        null=True,
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
    )

from django.db.models.signals import post_save
from django.dispatch import receiver
@receiver(post_save, sender=PostMedia, dispatch_uid="post_media_post_save")
def get_bg(sender, instance, **kwargs):
    from PIL import Image
    im = Image.open(instance.image)
    from collections import defaultdict
    by_color = defaultdict(int)
    for pixel in im.getdata():
        by_color[pixel] += 1

    instance.background = by_color.__len__()
    instance.save()


class ReportPost(models.Model):
    "Generated Model"
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        related_name="reportpost_post",
    )
    reported_by = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        related_name="reportpost_reported_by",
    )
    reason = models.TextField()
    created_at = models.DateTimeField(
        auto_now_add=True,
    )


class FollowRequest(models.Model):
    "Generated Model"
    generated_by = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        related_name="followrequest_generated_by",
    )
    generated_for = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        related_name="followrequest_generated_for",
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
    )


class PostComment(models.Model):
    "Generated Model"
    user = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        related_name="postcomment_user",
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
    )
    comment = models.CharField(
        max_length=512,
    )
    image = models.ImageField(
        upload_to="post_media",
        blank=True,
    )
    ref_comment = models.ForeignKey(
        'PostComment',
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name="postcomment_ref_comment",
    )
    post = models.ForeignKey(
        Post,
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name="postcomment_post",
    ) 

    def as_dict(self, logged_user=None):
        """
        Returns a dictionary representation of the model.
        """
        return {
            'id': self.id,
            'created_at': self.created_at,
            'comment': self.comment,
            'image': self.image.url if self.image else None,
            'ref_comment': self.ref_comment.id if self.ref_comment else None,
            'post': self.post.id if self.post else None,
            'likes': self.likecomment_comment.count(),
            'liked': True if logged_user and logged_user.id and logged_user.likecomment_liked_by.filter(comment=self).exists() else False,
            'user': {
                'id': self.user.id,
                'username': self.user.username,
                'name': self.user.name,
                'email': self.user.email,
            },
            "is_owner": True if logged_user and logged_user.id and logged_user.id == self.user.id else False,
        }


class LikeComment(models.Model):
    "Generated Model"
    liked_by = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        related_name="likecomment_liked_by",
    )
    comment = models.ForeignKey(
        PostComment,
        on_delete=models.CASCADE,
        related_name="likecomment_comment",
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
    )


class UpvotePost(models.Model):
    "Generated Model"
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        related_name="upvotepost_post",
    )
    upvote_by = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        related_name="upvotepost_upvote_by",
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
    )


class DownvotePost(models.Model):
    "Generated Model"
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        related_name="downvotepost_post",
    )
    downvote_by = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        related_name="downvotepost_downvote_by",
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
    )


class Chat(models.Model):
    "Generated Model"
    chat_id = models.CharField(
        max_length=256,
    )
    users = models.ManyToManyField(
        "users.User",
        related_name="chat_users",
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
    )