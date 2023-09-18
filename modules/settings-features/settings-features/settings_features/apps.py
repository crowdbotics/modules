from django.apps import AppConfig


class SettingsFeaturesConfig(AppConfig):
    name = "modules.settings-features.settings_features"
    verbose_name = "SettingsFeatures"

    def ready(self):
        try:
            from . import signals
        except ImportError as err:
            pass
