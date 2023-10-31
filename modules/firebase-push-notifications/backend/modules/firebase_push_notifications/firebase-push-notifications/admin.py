from django.contrib import admin

from .forms import CustomAdminNotificationForm
from .models import Notification, UserNotification, CustomAdminNotification


class NotificationAdmin(admin.ModelAdmin):
    list_display = ["id", "sender", "receiver", "title", "message"]


class UserNotificationAdmin(admin.ModelAdmin):
    list_display = ["id", "user", "notification"]


class CustomNotificationAdmin(admin.ModelAdmin):
    action_form = CustomAdminNotificationForm
    actions = ['custom_notification']
    list_display = ["user", "active"]
    list_display_links = None

    def has_add_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

    def changelist_view(self, request, extra_context=None):
        extra_context = {'title': 'Select Users to send Custom Notification.'}
        return super(CustomNotificationAdmin, self).changelist_view(request, extra_context=extra_context)

    def custom_notification(self, request, queryset):
        from firebase_admin.messaging import (
            Message,
            Notification,
            APNSConfig,
            APNSPayload,
            Aps,
        )
        for fcm_device in queryset:
            if fcm_device:
                message = Message(
                    notification=Notification(
                        title=request.POST["title"], body=request.POST["message"]
                    )
                )
                if fcm_device.type == "ios":
                    message.apns = APNSConfig(
                        payload=APNSPayload(aps=Aps(sound="default"))
                    )
                fcm_device.send_message(message)

    custom_notification.short_description = "Send Custom Notification"

    class Media:
        css = {
            'all': ('admin/css/custom-notification-admin.css',)
        }


admin.site.register(CustomAdminNotification, CustomNotificationAdmin)
admin.site.register(Notification, NotificationAdmin)
admin.site.register(UserNotification, UserNotificationAdmin)
