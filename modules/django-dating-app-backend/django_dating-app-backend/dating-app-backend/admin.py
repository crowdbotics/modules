from django.contrib import admin
from django.contrib.auth import admin as auth_admin
from django.contrib.auth import get_user_model

from users.forms import UserChangeForm, UserCreationForm
from .models import UserProfile, ProfileConfig, MatchRequest, Match, MatchDenied, Post, PostMedia
User = get_user_model()


class ProfileConfigAdmin(admin.StackedInline):
    model = ProfileConfig


class ProfileInfoAdmin(admin.StackedInline):
    model = UserProfile


# @admin.register(User)
# class UserAdmin(auth_admin.UserAdmin):

#     form = UserChangeForm
#     add_form = UserCreationForm
#     fieldsets = (("User", {"fields": ("name",)}),) + auth_admin.UserAdmin.fieldsets
#     list_display = ["username", "name", "is_superuser"]
#     search_fields = ["name"]
#     inlines = [ ProfileInfoAdmin, ProfileConfigAdmin,]

admin.site.register(Match)


class MatchRequestAdmin(admin.ModelAdmin):
    list_display = ['user', 'match_request_for']

admin.site.register(MatchRequest, MatchRequestAdmin)

class MatchDeniedAdmin(admin.ModelAdmin):
    list_display = ['user', 'match_denied_with']

admin.site.register(MatchDenied, MatchDeniedAdmin)


class PostMediaAdmin(admin.TabularInline):
    model = PostMedia
    extra = 1

class PostAdmin(admin.ModelAdmin):
    inlines = [PostMediaAdmin]

admin.site.register(Post, PostAdmin)