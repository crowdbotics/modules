from django.contrib.auth import get_user_model
from django.db import models

from django.db.models.signals import post_save
from django.dispatch import receiver
User = get_user_model()


class Notification(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sender_notification", null=True, blank=True)
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name="send_notification", null=True, blank=True)
    title = models.CharField(max_length=200)
    message = models.TextField()
    image = models.FileField(upload_to="notification", null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.sender)


class UserNotification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_notification")
    notification = models.ForeignKey(Notification, on_delete=models.CASCADE, related_name="notification_user")
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.user)


@receiver(post_save, sender=Notification)
def send_notification(sender, instance, created, **kwargs):
    # from users.tasks import send_user_custom_notification
    from fcm_django.models import FCMDevice
    if created:
        if instance.receiver:
            devices = FCMDevice.objects.filter(user_id=instance.receiver)
        else:
            devices = FCMDevice.objects.all()

        if devices:
            devices.send_message(title=instance.title, body=instance.message, data=instance.image)

