from django.contrib import admin
from .models import *

# Register your models here.


class NotificationAdmin(admin.ModelAdmin):
    list_display = ["id", 'sender', 'receiver', 'title', 'message']


admin.site.register(Notification, NotificationAdmin)
admin.site.register(UserNotification)