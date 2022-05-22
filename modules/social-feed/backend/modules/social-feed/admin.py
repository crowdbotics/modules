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
)

admin.site.register(Post)
admin.site.register(PostMedia)
admin.site.register(ReportPost)
admin.site.register(FollowRequest)
admin.site.register(PostComment)
admin.site.register(LikeComment)
admin.site.register(UpvotePost)
admin.site.register(DownvotePost)
admin.site.register(Chat)
