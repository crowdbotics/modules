from django.contrib.auth import get_user_model
from django.db import models
from django.utils import timezone

User = get_user_model()


class Session(models.Model):
    title = models.CharField(max_length=256)
    date = models.DateField(null=True)
    start_time = models.TimeField()
    session_number = models.CharField(max_length=256)
    image = models.FileField(upload_to='session', null=True)
    sort = models.IntegerField(default=0)
    description = models.TextField()

    def __str__(self):
        return str(self.date)

    class Meta:
        ordering = ['sort']


class SessionAttachment(models.Model):
    session = models.ForeignKey(Session, on_delete=models.CASCADE, related_name='session_attachment')
    title = models.CharField(max_length=256, null=True, blank=True)
    attachment = models.FileField(upload_to='session_attachment', null=True)
    sort = models.IntegerField(default=0)

    def __str__(self):
        return str(self.session)

    class Meta:
        ordering = ['sort']

class UserSession(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_session')
    session = models.ForeignKey(Session, on_delete=models.CASCADE, related_name='session_user')

    def __str__(self):
        return str(self.user)

    class Meta:
        unique_together = ('user', 'session')


class Activities(models.Model):
    title = models.CharField(max_length=256)
    date = models.DateField(null=True)
    start_time = models.TimeField(null=True)
    image = models.FileField(upload_to='event_activity', null=True)
    description = models.TextField()

    def __str__(self):
        return str(self.title)


class ActivitiesAttachment(models.Model):
    activity = models.ForeignKey(Activities, on_delete=models.CASCADE, related_name='activity_attachment')
    title = models.CharField(max_length=256, null=True, blank=True)
    attachment = models.FileField(upload_to='activity_attachment', null=True)
    sort = models.IntegerField(default=0)

    def __str__(self):
        return str(self.activity)

    class Meta:
        ordering = ['sort']


class UserActivities(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_activity')
    activity = models.ForeignKey(Activities, on_delete=models.CASCADE, related_name='activity_user')

    def __str__(self):
        return str(self.user)


class ConnectProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="connect_user")
    designation = models.CharField(max_length=250)
    image = models.FileField(upload_to='profile_image', null=True)
    company = models.CharField(max_length=250)
    website = models.CharField(max_length=250)
    description = models.TextField()
    show_profile = models.BooleanField(default=True)

    def __str__(self):
        return str(self.user)


class UserConnectRequest(models.Model):
    # STATUS_CHOICES = (
    #     ('Pending', 'Pending'),
    #     ('Accepted', 'Accepted'),
    #     ('Rejected', 'Rejected'),
    # )
    status = models.CharField(max_length=30, default='Pending')
    requester = models.ForeignKey(User, on_delete=models.CASCADE, related_name="requests_from")
    requestee = models.ForeignKey(ConnectProfile, on_delete=models.CASCADE, related_name="requests_to")
    created = models.DateTimeField(default=timezone.now)


class AboutTeamAndBoardMember(models.Model):
    # ABOUT_CHOICES = (
    #     ('Team', 'Team'),
    #     ('Board', 'Board'),
    # )
    select = models.CharField(max_length=5)
    connect_user = models.OneToOneField(ConnectProfile, on_delete=models.CASCADE, related_name='about_connect_user')
    sort = models.IntegerField(default=0)

    def __str__(self):
        return "%s - %s" % (self.select, self.connect_user)

    class Meta:
        ordering = ['sort']


class OfferigsPage(models.Model):
    title = models.CharField(max_length=256)
    slug = models.CharField(max_length=256)
    description = models.TextField()
    image = models.FileField(upload_to='page', null=True)
    sort = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.title)

    class Meta:
        ordering = ['sort']


class MetaLink(models.Model):
    title = models.CharField(max_length=256)
    slug = models.CharField(max_length=256)
    link = models.CharField(max_length=256, null=True, blank=True)
    file = models.FileField(upload_to='meta_links', null=True, blank=True)

    def __str__(self):
        return str(self.title)
