from django.contrib.auth import get_user_model
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

User = get_user_model()


class Notification(models.Model):
    sender = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="sender_notification",
        null=True,
        blank=True,
    )
    receiver = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="send_notification",
        null=True,
        blank=True,
    )
    title = models.CharField(max_length=200)
    message = models.TextField()
    image = models.ImageField(upload_to="notification/images", null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.title)


class UserNotification(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="user_notification"
    )
    notification = models.ForeignKey(
        Notification, on_delete=models.CASCADE, related_name="notification_user"
    )

    def __str__(self):
        return str(self.user)


@receiver(post_save, sender=Notification)
def send_notification(sender, instance, created, **kwargs):
    if created:
        from fcm_django.models import FCMDevice
        from firebase_admin.messaging import (
            Message,
            Notification,
            APNSConfig,
            APNSPayload,
            Aps,
        )

        if instance.receiver:
            fcm_devices = FCMDevice.objects.filter(user_id=instance.receiver)
        else:
            fcm_devices = FCMDevice.objects.all()
        image = None
        if instance.image:
            image = instance.image.url
        if fcm_devices:
            for fcm_device in fcm_devices:
                message = Message(
                    notification=Notification(
                        title=instance.title, body=instance.message, image=image
                    )
                )
                if fcm_device.type == "ios":
                    message.apns = APNSConfig(
                        payload=APNSPayload(aps=Aps(sound="default"))
                    )
                fcm_device.send_message(message)
