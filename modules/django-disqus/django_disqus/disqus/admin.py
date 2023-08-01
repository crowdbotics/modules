from django.contrib import admin

from .models import Comment, LikeOnComment


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ['item_uuid', 'comment', 'user', 'parent_comment']


@admin.register(LikeOnComment)
class LikeOnCommentAdmin(admin.ModelAdmin):
    list_display = ['comment', 'user']
