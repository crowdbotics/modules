from django.contrib import admin
from .models import Comment, LikeOnComment

admin.site.register(Comment)
admin.site.register(LikeOnComment)

