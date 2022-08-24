import random
from django.conf import settings
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.translation import ugettext_lazy as _

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


@receiver(post_save, sender=PostMedia)
def get_bg(sender, instance, **kwargs):
    from PIL import Image
    if not getattr(instance, 'background', False):
        width, height = 150,150
        image = Image.open(instance.image)
        image = image.resize((width, height),resample = 0)
        #Get colors from image object
        pixels = image.getcolors(width * height)
        #Sort them by count number(first element of tuple)
        sorted_pixels = sorted(pixels, key=lambda t: t[0])
        #Get the most frequent color
        dominant_color = sorted_pixels[-1][1]
        # return dominant_color
        r = lambda: random.randint(0,255)
        # instance.background = '#80%02X%02X%02X' % (r(),r(),r())
        instance.background = 'rgb'+str(dominant_color)
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


class UserProfile(models.Model):
    """
    This model represents the Profile extension of the User model.
    """
    # GENDER_CHOICES = (
    #     ('male', 'Male'),
    #     ('female', 'Female'),
    #     ('other', 'Other'),
    # )

    user = models.OneToOneField("users.User", on_delete=models.CASCADE, related_name="profile_info")
    profile_image = models.ImageField(
        _("Profile Photo"),
        upload_to="profile_photos",
        blank=True,
        null=True,
    )
    cover_image = models.ImageField(
        _("Cover Photo"),
        upload_to="cover_photos",
        blank=True,
        null=True,
    )
    bio = models.TextField(
        _("Bio"),
        blank=True,
        null=True,
    )
    birth_date = models.DateField(
        _("Birth Date"),
        blank=True,
        null=True,
    )
    country = models.CharField(
        _("Country"),
        blank=True,
        null=True,
        max_length=255,
    )
    city = models.CharField(
        _("City"),
        blank=True,
        null=True,
        max_length=255,
    )
    phone_number = models.CharField(
        _("Phone Number"),
        blank=True,
        null=True,
        max_length=255,
    )
    interests = models.ManyToManyField(
        "Interest",
        blank=True,
        related_name="user_interests",
    )
    skills = models.ManyToManyField(
        "Skill",
        blank=True,
        related_name="user_skills",
    )
    gender = models.CharField(
        max_length=128,
        null=True,
        blank=True
    )
    age = models.IntegerField(
        null=True,
        blank=True,
    )

    def __str__(self):
        return self.user.username


class ProfileConfig(models.Model):
    """
    This model represents the Profile configuration of the User model.
    """
    GENDER_INTEREST_CHOICES = (
        ('male', 'Male'),
        ('female', 'Female'),
        ('both', 'both'),
    )

    user = models.OneToOneField("users.User", on_delete=models.CASCADE, related_name="profile_configs")
    show_me_on_search = models.BooleanField(
        _("Show me on search"),
        default=True,
    )
    show_profile_image = models.BooleanField(
        _("Show Profile Image"),
        default=True,
    )
    show_cover_image = models.BooleanField(
        _("Show Cover Image"),
        default=True,
    )
    show_country = models.BooleanField(
        _("Show Country"),
        default=True,
    )
    show_city = models.BooleanField(
        _("Show City"),
        default=True,
    )
    show_phone_number = models.BooleanField(
        _("Show Phone Number"),
        default=True,
    )
    show_interests = models.BooleanField(
        _("Show Interests"),
        default=True,
    )
    show_skills = models.BooleanField(
        _("Show Skills"),
        default=True,
    )
    radius_of_interest = models.IntegerField(
        _("Radius of Interest"),
        default=100,
        help_text=_("The radius of interest in kilometers"),
    )
    interest_gender = models.CharField(
        choices=GENDER_INTEREST_CHOICES,
        max_length=128,
        null=True,
        blank=True
    )

    def __str__(self):
        return self.user.username


class Interest(models.Model):
    """
    This model represents the Interest instance.
    """

    name = models.CharField(_("Name of Interest"), max_length=255)

    def __str__(self):
        return self.name


class Skill(models.Model):
    """
    This model represents the Skill instance
    """

    name = models.CharField(_("Name of Skill"), max_length=255)

    def __str__(self):
        return self.name


class likeProfile(models.Model):
    "Generated Model"
    user = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        related_name="liked_user",
    )
    liked_by = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        related_name="liked_by_user",
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
    )


class MatchRequest(models.Model):
    """
    This model represents the Match Request instance
    """

    user = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        related_name="match_request_user",
    )
    match_request_for = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        related_name="match_requested_for_user",
    )
    is_accepted = models.BooleanField(
        _("Is Accepted"),
        default=False,
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
    )


class Match(models.Model):
    """
    This model represents the Match instance
    """

    user = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        related_name="match_user",
    )
    match_with = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        related_name="match_with_user",
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
    )

class MatchDenied(models.Model):
    """
    This model represents the MatchDenied instance
    """

    user = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        related_name="match_denied_user",
    )
    match_denied_with = models.ForeignKey(
        "users.User",
        on_delete=models.CASCADE,
        related_name="match_denied_with_user",
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
    )


