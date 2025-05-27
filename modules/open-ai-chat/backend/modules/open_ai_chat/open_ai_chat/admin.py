from django.contrib import admin
from .models import Conversation, Message, OpenAIConfig, UserConfig


class MessageInline(admin.TabularInline):
    model = Message
    extra = 0
    readonly_fields = ('conversation', 'role', 'content', 'response','created_at', 'updated_at')
    fieldsets = (
        (None, {
            'fields': ('conversation', 'role', 'content', 'response')
        }),
        ('Dates', {
            'fields': ('created_at', 'updated_at'),
        }),
    )

class ConversationAdmin(admin.ModelAdmin):
    list_display = ('session', 'user', 'summary', 'created_at', 'updated_at')
    search_fields = ('session', 'user', 'summary', 'created_at', 'updated_at')
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at',)
    list_filter = ('session', 'user', 'summary', 'created_at', 'updated_at')
    fieldsets = (
        (None, {
            'fields': ('session', 'user', 'summary')
        }),
        ('Dates', {
            'fields': ('created_at', 'updated_at'),
        }),
    )
    inlines = [
        MessageInline,
    ]
admin.site.register(Conversation, ConversationAdmin)

class MessageAdmin(admin.ModelAdmin):
    list_display = ('conversation', 'role', 'content', 'response', 'created_at', 'updated_at')
    search_fields = ('conversation', 'role', 'content', 'response', 'created_at', 'updated_at')
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at',)
    list_filter = ('conversation', 'role', 'content', 'response', 'created_at', 'updated_at')
    fieldsets = (
        (None, {
            'fields': ('conversation', 'role', 'content', 'response')
        }),
        ('Dates', {
            'fields': ('created_at', 'updated_at'),
        }),
    )
admin.site.register(Message, MessageAdmin)


class OpenAIConfigAdmin(admin.ModelAdmin):
    list_display = ('model', 'max_tokens', 'use_context', 'context_length', 'only_questions_in_context', 'summarize_context', 'initial_context', 'is_active', 'global_config', 'created_at', 'updated_at')
    search_fields = ('model', 'max_tokens', 'use_context', 'context_length', 'only_questions_in_context', 'summarize_context', 'initial_context', 'is_active', 'global_config', 'created_at', 'updated_at')
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at',)
    list_filter = ('model', 'max_tokens', 'use_context', 'context_length', 'only_questions_in_context', 'summarize_context', 'initial_context', 'is_active', 'global_config', 'created_at', 'updated_at')
    fieldsets = (
        (None, {
            'fields': ('model', 'max_tokens', 'use_context', 'context_length', 'only_questions_in_context', 'summarize_context', 'initial_context', 'is_active', 'global_config')
        }),
        ('Dates', {
            'fields': ('created_at', 'updated_at'),
        }),
    )

admin.site.register(OpenAIConfig, OpenAIConfigAdmin)


class UserConfigAdmin(admin.ModelAdmin):
    list_display = ('user', 'config', 'created_at', 'updated_at')
    search_fields = ('user', 'config', 'created_at', 'updated_at')
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at',)
    list_filter = ('user', 'config', 'created_at', 'updated_at')
    fieldsets = (
        (None, {
            'fields': ('user', 'config')
        }),
        ('Dates', {
            'fields': ('created_at', 'updated_at'),
        }),
    )

admin.site.register(UserConfig, UserConfigAdmin)