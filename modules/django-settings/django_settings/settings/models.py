from django.contrib.auth import get_user_model
from django.db import models, transaction

from django_extensions.db.fields import AutoSlugField

User = get_user_model()


class Settings(models.Model):
    TYPES = [
        ("BOOLEAN", "Boolean"),
        ("DECIMAL", "Decimal"),
        ("INTEGER", "Integer"),
        ("CHOICE", "Choice"),
        ("MULTI_SELECT", "Multi Select"),
    ]
    title = models.CharField(max_length=256)
    slug = AutoSlugField(populate_from=['title', 'type', 'id'], unique=True)
    type = models.CharField(choices=TYPES, max_length=256)
    default_choice = models.ForeignKey("StateChoices", on_delete=models.CASCADE, null=True, blank=True, editable=False,
                                       related_name='settings_default_state')

    def __str__(self):
        return str(self.title)

    class Meta:
        verbose_name_plural = 'App Settings'


class StateChoices(models.Model):
    choice = models.CharField(max_length=256)
    default_choice = models.BooleanField(default=False)
    settings = models.ForeignKey(Settings, on_delete=models.CASCADE, related_name='choice_settings')

    def __str__(self):
        return f"{self.settings.title} - {self.choice}"

    class Meta:
        verbose_name_plural = 'Settings Choices'

    @transaction.atomic()
    def save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
        """
        Save method override to set the default or updated choice of settings.
        """
        prev_obj = None
        if not self.settings.default_choice:
            self.default_choice = True
        if self.pk:
            prev_obj = StateChoices.objects.get(pk=self.pk)
        super().save(
            force_insert=force_insert, force_update=force_update, using=using, update_fields=update_fields)
        if self.default_choice:
            self.settings.default_choice = self
            self.settings.save()
            StateChoices.objects.filter(settings=self.settings).exclude(pk=self.pk).update(
                default_choice=False)
        from . import signals
        signals.user_app_setting_signal.send_robust(sender="StateChoices", current=self, previous=prev_obj)


class UserAppSetting(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='setting_user')
    setting = models.ForeignKey(Settings, on_delete=models.CASCADE,
                                related_name='user_app_setting')
    current_choices = models.ManyToManyField(StateChoices)

    def __str__(self):
        return f"{self.user.name} - {self.setting.title}"

    class Meta:
        verbose_name_plural = 'User Settings'
        unique_together = (("user", "setting"),)
