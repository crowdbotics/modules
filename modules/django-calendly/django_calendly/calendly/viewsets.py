from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
import requests
import json

CALENDLY_URL = 'https://api.calendly.com/'


class CalendlyAPIView(APIView):

    def get_post_data(self):
        return {}

    def get_data(self):
        return {}

    def get_url(self):
        return ""

    def get(self, request, *args, **kwargs):
        try:
            headers = {
                "Authorization": request.META.get('HTTP_AUTHORIZATION')
            }
            req = requests.get(self.get_url(), params=self.get_data(), headers=headers)
            load = json.loads(req.text)
            return Response(load, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, *args, **kwargs):
        try:
            headers = {
                "Authorization": request.META.get('HTTP_AUTHORIZATION')
            }
            req = requests.post(self.get_url(), json=self.get_post_data(), params=self.get_data(),
                                headers=headers)
            load = json.loads(req.text)
            return Response(load, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        try:
            headers = {
                "Authorization": request.META.get('HTTP_AUTHORIZATION')
            }
            req = requests.delete(self.get_url(), json=self.get_post_data(), params=self.get_data(), headers=headers)
            return Response(req, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


class CreateUserIdView(CalendlyAPIView):

    def get_url(self):
        return f"{CALENDLY_URL}/users/me"


class ListUserEventsView(CalendlyAPIView):

    def get_url(self):
        return f"{CALENDLY_URL}event_types"

    def get_data(self):
        return self.request.data


class UserEventView(CalendlyAPIView):

    def get_url(self):
        return f"{CALENDLY_URL}event_types/{self.request.data.get('uuid')}"


class ListEventsAvailableTimesView(CalendlyAPIView):

    def get_url(self):
        return f"{CALENDLY_URL}event_type_available_times"

    def get_data(self):
        return self.request.data


class UserBusyTime(CalendlyAPIView):

    def get_url(self):
        return f"{CALENDLY_URL}user_busy_times"

    def get_data(self):
        return self.request.data


class UserAvailabilitySchedules(CalendlyAPIView):

    def get_url(self):
        return f"{CALENDLY_URL}user_availability_schedules"

    def get_data(self):
        return self.request.data


class UserAvailabilitySchedule(CalendlyAPIView):

    def get_url(self):
        return f"{CALENDLY_URL}user_availability_schedules/{self.request.data.get('uuid')}"


class DeleteInviteeData(CalendlyAPIView):

    def get_url(self):
        return f"{CALENDLY_URL}data_compliance/deletion/invitees"

    def get_post_data(self):
        return self.request.data.get("email")


class ListOrganizationInvitation(CalendlyAPIView):

    def get_url(self):
        return f"{CALENDLY_URL}organizations/{self.request.data.get('uuid')}/invitations"


class InviteUserToOrganizations(CalendlyAPIView):

    def get_url(self):
        return f"{CALENDLY_URL}organizations/{self.request.data.get('uuid')}/invitations"

    def get_post_data(self):
        return self.request.data


class RevokeUserOrganizationInvitation(CalendlyAPIView):

    def get_url(self):
        return f"{CALENDLY_URL}organizations/{self.request.data.get('org_uuid')}/invitations/{self.request.data.get('uuid')}"


class GetOrganizationInvitation(CalendlyAPIView):

    def get_url(self):
        return f"{CALENDLY_URL}organizations/{self.request.data.get('org_uuid')}/invitations/{self.request.data.get('uuid')}"


class GetOrganizationMembership(CalendlyAPIView):

    def get_url(self):
        return f"{CALENDLY_URL}organization_memberships/{self.request.data.get('uuid')}"


class ListOrganizationMembership(CalendlyAPIView):
    def get_url(self):
        return f"{CALENDLY_URL}organization_memberships"

    def get_data(self):
        return self.request.data


class RemoveUserFromOrganization(CalendlyAPIView):

    def get_url(self):
        return f"{CALENDLY_URL}organization_memberships/{self.request.data.get('uuid')}"


class ListScheduleEventInvitee(CalendlyAPIView):

    def get_url(self):
        return f"{CALENDLY_URL}scheduled_events/{self.request.data.get('uuid')}/invitees"


class ListScheduleEvent(CalendlyAPIView):

    def get_url(self):
        return f"{CALENDLY_URL}scheduled_events"

    def get_data(self):
        return self.request.data


class GetScheduleEvent(CalendlyAPIView):

    def get_url(self):
        return f"{CALENDLY_URL}scheduled_events/{self.request.data.get('uuid')}"


class CreateInviteeNoShow(CalendlyAPIView):

    def get_url(self):
        return f"{CALENDLY_URL}invitee_no_shows"

    def get_post_data(self):
        return self.request.data


class GetInviteeNoShow(CalendlyAPIView):

    def get_url(self):
        return f"{CALENDLY_URL}invitee_no_shows/{self.request.data.get('uuid')}"


class DeleteInviteeNoShow(CalendlyAPIView):

    def get_url(self):
        return f"{CALENDLY_URL}invitee_no_shows/{self.request.data.get('uuid')}"


class CancelScheduleEvent(CalendlyAPIView):

    def get_url(self):
        return f"{CALENDLY_URL}scheduled_events/{self.request.data.get('uuid')}/cancellation"

    def get_post_data(self):
        return self.request.data


class CreateWebhookSubscription(CalendlyAPIView):

    def get_url(self):
        return f"{CALENDLY_URL}webhook_subscriptions"

    def get_post_data(self):
        return self.request.data


class ListWebhookSubscriptions(CalendlyAPIView):

    def get_url(self):
        return f"{CALENDLY_URL}webhook_subscriptions"

    def get_data(self):
        return self.request.data


class GetWebhookSubscriptions(CalendlyAPIView):

    def get_url(self):
        return f"{CALENDLY_URL}webhook_subscriptions/{self.request.data.get('webhook_uuid')}"


class DeleteWebhookSubscriptions(CalendlyAPIView):

    def get_url(self):
        return f"{CALENDLY_URL}webhook_subscriptions/{self.request.data.get('webhook_uuid')}"


class WebhookUrl(APIView):

    def post(self, request, *args, **kwargs):
        print("User has scheduled, rescheduled or cancelled an event.")
        working = {"message": 'User has scheduled, rescheduled or cancelled an event.'}
        return Response(working)