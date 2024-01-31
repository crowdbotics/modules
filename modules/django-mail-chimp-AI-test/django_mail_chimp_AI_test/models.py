from django.db import models
from django.contrib.auth.models import User


class MailchimpList(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    mailchimp_list_id = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    date_created = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Subscriber(models.Model):
    mailchimp_list = models.ForeignKey(MailchimpList, on_delete=models.CASCADE)
    subscriber_email = models.EmailField()
    status = models.CharField(max_length=50)
    date_subscribed = models.DateTimeField(auto_now_add=True)
    date_unsubscribed = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.subscriber_email


class Campaign(models.Model):
    mailchimp_list = models.ForeignKey(MailchimpList, on_delete=models.CASCADE)
    campaign_id = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    subject = models.CharField(max_length=255)
    body = models.TextField()
    scheduled_send_date = models.DateTimeField()
    status = models.CharField(max_length=50)  # Draft, Scheduled, Sent

    def __str__(self):
        return self.name


class CampaignStatistics(models.Model):
    campaign = models.OneToOneField(Campaign, on_delete=models.CASCADE)
    opened = models.IntegerField(default=0)
    clicked = models.IntegerField(default=0)
    unsubscribed = models.IntegerField(default=0)
    bounce = models.IntegerField(default=0)

    def __str__(self):
        return f'{self.campaign.name} Statistics'


class Automation(models.Model):
    name = models.CharField(max_length=255)
    mailchimp_list = models.ForeignKey(MailchimpList, on_delete=models.CASCADE)
    workflow_id = models.CharField(max_length=255)
    status = models.CharField(max_length=50)  # Active, Paused

    def __str__(self):
        return self.name
