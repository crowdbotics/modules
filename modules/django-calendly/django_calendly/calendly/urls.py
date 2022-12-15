from django.urls import path

from .viewsets import ListUserEventsView, UserEventView, CreateUserIdView, ListEventsAvailableTimesView, UserBusyTime, \
    UserAvailabilitySchedules, UserAvailabilitySchedule, DeleteInviteeData, ListOrganizationInvitation, InviteUserToOrganizations, RevokeUserOrganizationInvitation, \
    GetOrganizationInvitation, GetOrganizationMembership, RemoveUserFromOrganization, ListOrganizationMembership, ListScheduleEventInvitee, ListScheduleEvent, \
    GetScheduleEvent, CreateInviteeNoShow, GetInviteeNoShow, DeleteInviteeNoShow, CancelScheduleEvent, CreateWebhookSubscription, ListWebhookSubscriptions, \
    GetWebhookSubscriptions, DeleteWebhookSubscriptions


urlpatterns = [
    path('get-user-detail/', CreateUserIdView.as_view()),
    path('list-user-events/', ListUserEventsView.as_view()),
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
    path('get-schedule-events/', GetScheduleEvent.as_view()),
    path('create-invitee-no-shows/', CreateInviteeNoShow.as_view()),
    path('get-invitee-no-shows/', GetInviteeNoShow.as_view()),
    path('delete-invitee-no-shows/', DeleteInviteeNoShow.as_view()),
    path('cancel-schedule-event/', CancelScheduleEvent.as_view()),
    path('create-webhook-subscription/', CreateWebhookSubscription.as_view()),
    path('list-webhook-subscription/', ListWebhookSubscriptions.as_view()),
    path('get-webhook-subscription/', GetWebhookSubscriptions.as_view()),
    path('delete-webhook-subscription/', DeleteWebhookSubscriptions.as_view()),
]
