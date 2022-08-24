from django.contrib import admin

from .models import ChatMessage
# Register your models here.

class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ('sender', 'receiver', 'text', 'created_at', 'updated_at')
    list_filter = ('created_at',)
    search_fields = ('sender', 'receiver', 'text')
    ordering = ('-created_at',)
    date_hierarchy = 'created_at'
    list_per_page = 25
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        (None, {
            'fields': ('sender', 'receiver', 'text', 'image')
        }),
        ('Date Information', {
            'fields': ('created_at', 'updated_at')
        }),
    )

admin.site.register(ChatMessage, ChatMessageAdmin)