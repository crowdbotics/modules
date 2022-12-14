from django.urls import path

from .viewsets import ListEventsView, UserEventView, CreateUserIdView, ListEventsAvailableTimesView, UserBusyTime, \
    UserAvailabilitySchedules, UserAvailabilitySchedule, DeleteInviteeData, ListOrganizationInvitation, InviteUserToOrganizations, RevokeUserOrganizationInvitation, \
    GetOrganizationInvitation, GetOrganizationMembership, RemoveUserFromOrganization, ListOrganizationMembership,ListScheduleEventInvitee, ListScheduleEvent


urlpatterns = [
    path('get-user-detail/', CreateUserIdView.as_view()),
    path('list-user-events/', ListEventsView.as_view()),
    path('get-specific-events/', UserEventView.as_view()),
    path('get-events-available-times/', ListEventsAvailableTimesView.as_view()),
    path('get-user-busy-times/', UserBusyTime.as_view()),
    path('get-user-available-schedules/', UserAvailabilitySchedules.as_view()),
    path('get-user-available-schedule/', UserAvailabilitySchedule.as_view()),
    path('delete-invitee-data/', DeleteInviteeData.as_view()),
    path('list-organization-invitations/', ListOrganizationInvitation.as_view()),
    path('invite-user-to-organization/', InviteUserToOrganizations.as_view()),
    path('revoke-user-organization-invitation/', RevokeUserOrganizationInvitation.as_view()),
    path('get-organization-invitation/', GetOrganizationInvitation.as_view()),
    path('list-organization-membership/', ListOrganizationMembership.as_view()),
    path('get-organization-membership/', GetOrganizationMembership.as_view()),
    path('remove-user-from-organization/', RemoveUserFromOrganization.as_view()),
    path('list-schedule-event-invitee/', ListScheduleEventInvitee.as_view()),
    path('list-schedule-events/', ListScheduleEvent.as_view()),

]
