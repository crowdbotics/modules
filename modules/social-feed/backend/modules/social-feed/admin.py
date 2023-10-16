from django.contrib import admin

from .models import (
    Chat,
    DownvotePost,
    FollowRequest,
    LikeComment,
    Post,
    PostComment,
    PostMedia,
    ReportPost,
    UpvotePost,
    Follow
)


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ("user", "caption", "created_at",)


@admin.register(PostMedia)
class PostMediaAdmin(admin.ModelAdmin):
    list_display = ("post", "created_at")


@admin.register(ReportPost)
class ReportPostAdmin(admin.ModelAdmin):
    list_display = ("post", "reported_by", "created_at")


@admin.register(FollowRequest)
class FollowRequestAdmin(admin.ModelAdmin):
    list_display = ("generated_by", "generated_for", "created_at")


@admin.register(Follow)
class FollowAdmin(admin.ModelAdmin):
    list_display = ("user", "follow")


@admin.register(PostComment)
class PostCommentAdmin(admin.ModelAdmin):
    list_display = ("user", "comment", "post", "created_at")


@admin.register(LikeComment)
class LikeCommentAdmin(admin.ModelAdmin):
    list_display = ("liked_by", "comment", "created_at")


@admin.register(UpvotePost)
class UpvotePostAdmin(admin.ModelAdmin):
    list_display = ("post", "upvote_by", "created_at")


@admin.register(DownvotePost)
class DownvotePostAdmin(admin.ModelAdmin):
    list_display = ("post", "downvote_by", "created_at")


@admin.register(Chat)
class ChatAdmin(admin.ModelAdmin):
    list_display = ("chat_id", "created_at")
