from django.contrib import admin
from .models import (
    AboutTeamAndBoardMember,
    Activities,
    ActivitiesAttachment,
    ConnectProfile,
    Session,
    SessionAttachment,
    UserActivities,
    UserConnectRequest,
    UserSession,
)

admin.site.register(Session)
admin.site.register(UserSession)
admin.site.register(SessionAttachment)
admin.site.register(ActivitiesAttachment)
admin.site.register(Activities)
admin.site.register(UserActivities)
admin.site.register(UserConnectRequest)
admin.site.register(ConnectProfile)
admin.site.register(AboutTeamAndBoardMember)