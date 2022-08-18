from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

from django.conf import settings


class ChatMessage(models.Model):
    """
    Message model
    """
    sender = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='sender')
    receiver = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='receiver')
    text = models.TextField()
    image = models.ImageField(upload_to='images/', blank=True, null=True)
    reply_to = models.ForeignKey('self', on_delete=models.CASCADE, related_name='replies', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.text

    def as_dict(self, user=None):
        obj = {
            'id': self.id,
            'sender': self.sender.id,
            'receiver': self.receiver.id,
            'text': self.text,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'updated_at': self.updated_at.strftime('%Y-%m-%d %H:%M:%S'),
        }
        if user:
            obj['is_sender'] = user.id == self.sender.id
        return obj

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Message'
        verbose_name_plural = 'Messages'


# get chatMessage signal
@receiver(post_save, sender=ChatMessage)
def chatMessage_post_save(sender, instance, created, **kwargs):
    # send signal to update chat
    if created:
        from firebase_admin import db
        ref = db.reference("matches/{}-{}/".format(instance.sender.id, instance.receiver.id))
        obj = {
            'id': instance.id,
        }
        ref.set(obj)

        
