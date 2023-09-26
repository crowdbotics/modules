from django.contrib import admin

from .models import *

admin.site.register(StateChoices)
admin.site.register(UserAppSetting)


@admin.register(Settings)
class SettingAdminModal(admin.ModelAdmin):
    readonly_fields = ['slug']
