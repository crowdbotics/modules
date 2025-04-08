from django.contrib import admin

from .models import Session, UserSession, Activities, UserActivities, ConnectProfile, UserConnectRequest, \
    AboutTeamAndBoardMember, OfferigsPage, SessionAttachment, ActivitiesAttachment, MetaLink


class UserSessionAdmin(admin.TabularInline):
    model = UserSession
    extra = 0


class SessionAttachmentAdmin(admin.TabularInline):
    model = SessionAttachment
    extra = 0


class SessoinAdmin(admin.ModelAdmin):
    list_display = ['title', 'date', 'start_time', 'session_number', 'sort']
    list_filter = ['date']
    inlines = [
        SessionAttachmentAdmin,
        UserSessionAdmin,
    ]

# Register your models here.

class UserActivitiesAdmin(admin.TabularInline):
    model = UserActivities
    extra = 0


class ActivitiesAttachmentAdmin(admin.TabularInline):
    model = ActivitiesAttachment
    extra = 0


class ActivitiesAdmin(admin.ModelAdmin):
    list_display = ['title', 'start_time', 'description']
    inlines = [
        ActivitiesAttachmentAdmin,
        UserActivitiesAdmin,
    ]

class ConnectProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'designation', 'company']


class UserConnectRequestAdmin(admin.ModelAdmin):
    list_display = ['requester', 'requestee', 'status']
    list_filter = ['status']


class AboutTeamAndBoardMemberAdmin(admin.ModelAdmin):
    list_display = ['select', 'connect_user']
    list_filter = ['select']


class OfferigsPageAdmin(admin.ModelAdmin):
    list_display = ['title', 'slug', 'sort', 'is_active']


admin.site.register(Session, SessoinAdmin)
admin.site.register(Activities, ActivitiesAdmin)
admin.site.register(ConnectProfile, ConnectProfileAdmin)
admin.site.register(UserConnectRequest, UserConnectRequestAdmin)
admin.site.register(AboutTeamAndBoardMember, AboutTeamAndBoardMemberAdmin)
admin.site.register(OfferigsPage, OfferigsPageAdmin)
admin.site.register(MetaLink)