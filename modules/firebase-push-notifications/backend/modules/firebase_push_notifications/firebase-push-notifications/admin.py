from django.contrib import admin
from .models import Notification, UserNotification


class NotificationAdmin(admin.ModelAdmin):
    list_display = ["id", "sender", "receiver", "title", "message"]


class UserNotificationAdmin(admin.ModelAdmin):
    list_display = ["id", "user", "notification"]


admin.site.register(Notification, NotificationAdmin)
admin.site.register(UserNotification, UserNotificationAdmin)
