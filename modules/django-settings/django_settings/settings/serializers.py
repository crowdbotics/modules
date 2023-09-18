from rest_framework import serializers

from .models import StateChoices, UserAppSetting


class UserAppSettingsSerializer(serializers.ModelSerializer):
    setting_title = serializers.CharField(source='setting.title')

    class Meta:
        model = UserAppSetting
        fields = '__all__'
        extra_kwargs = {'user': {'default': serializers.CurrentUserDefault(), "required": False}}

    def to_representation(self, instance):
        setting_data = super(UserAppSettingsSerializer, self).to_representation(instance)
        setting_data["choices"] = StateChoices.objects.filter(settings=instance.setting).values('id', 'choice',
                                                                                                'default_choice')
        return setting_data
