from django.db import models

class MailChimpList(models.Model):
    list_id = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name