from django.apps import AppConfig


class SettingsFeaturesConfig(AppConfig):
    name = "modules.django_settings.settings"
    verbose_name = "SettingsFeatures"

    def ready(self):
        try:
            from . import signals
        except ImportError as err:
            pass
