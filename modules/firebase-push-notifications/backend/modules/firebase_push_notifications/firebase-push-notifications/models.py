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
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.sender)


class UserNotification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_notification")
    notification = models.ForeignKey(Notification, on_delete=models.CASCADE, related_name="notification_user")

    def __str__(self):
        return str(self.user)


@receiver(post_save, sender=Notification)
def send_notification(sender, instance, created, **kwargs):
    # from users.tasks import send_user_custom_notification
    from push_notifications.models import APNSDevice, GCMDevice
    if created:
        if instance.receiver:
            devices = GCMDevice.objects.filter(user_id=instance.receiver)
            apns_devices = APNSDevice.objects.filter(user_id=instance.receiver)
        else:
            devices = GCMDevice.objects.all()
            apns_devices = APNSDevice.objects.all()

        if devices or apns_devices:
            try:
                devices.send_message(title=instance.title, message=instance.message)
                apns_devices.send_message(message={"body": instance.message})
                print("===============================message send")
            except Exception as e:
                print('===================', e)
