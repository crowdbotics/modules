from django.db import models

# Create your models here.


class User(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=10)
    address = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Campaign(models.Model):
    name = models.CharField(max_length=255)
    subject = models.CharField(max_length=255)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class CampaignReport(models.Model):
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE)
    sent = models.IntegerField()
    delivered = models.IntegerField()
    opened = models.IntegerField()
    clicked = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class CampaignReportDaily(models.Model):
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE)
    sent = models.IntegerField()
    delivered = models.IntegerField()
    opened = models.IntegerField()
    clicked = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class CampaignReportMonthly(models.Model):
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE)
    sent = models.IntegerField()
    delivered = models.IntegerField()
    opened = models.IntegerField()
    clicked = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class CampaignReportYearly(models.Model):
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE)
    sent = models.IntegerField()
    delivered = models.IntegerField()
    opened = models.IntegerField()
    clicked = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    

