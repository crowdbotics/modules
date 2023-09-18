import django
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver

from .models import Settings, UserAppSetting

User = get_user_model()

user_app_setting_signal = django.dispatch.Signal()


@receiver(post_save, sender=User)
def create_user_settings(sender, instance, created, **kwargs):
    """
    On user sign-up signal will be called and all app settings will be assigned to user.
    """
    if created:
        settings = Settings.objects.all().values('id', 'default_choice')
        user_setting_data = []
        for setting in settings:
            if setting['default_choice']:
                user_setting = UserAppSetting.objects.create(user=instance, setting_id=setting['id'])
                user_setting.current_choices.add(setting['default_choice'])
                user_setting.save()


@receiver(post_delete, sender=Settings)
def delete_user_settings(sender, instance, *args, **kwargs):
    """
    App owner can delete the setting.
    on deletion signal will be called and setting will be deleted for all users.
    """
    if instance:
        UserAppSetting.objects.filter(setting=instance).delete()


@receiver(user_app_setting_signal)
def user_app_setting_update(current, previous, **kwargs):
    """
    App owner can add new/Update settings.
    New setting will be assigned to all users automatically.
    """
    if not previous and current.default_choice and not current.settings.default_choice:
        setting_users = User.objects.all()
        for user in setting_users:
            user_setting = UserAppSetting.objects.create(user_id=user.id, setting_id=current.settings.id)
            user_setting.current_choices.clear()
            user_setting.current_choices.add(current.id)
            user_setting.save()
    if previous and current.default_choice:
        user_setting = UserAppSetting.objects.filter(setting_id=previous.settings.id)
        for setting in user_setting:
            setting.current_choices.clear()
            setting.current_choices.add(current.id)
            setting.save()
