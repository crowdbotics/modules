import requests
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

CALENDLY_URL = 'https://api.calendly.com/'


class CalendlyAPIView(APIView):

    def get_payload(self):
        return {}

    def get_params(self):
        return {}

    def get_url(self):
        return ""

    def get(self, request, *args, **kwargs):
        try:
            headers = {
                "Authorization": request.META.get('HTTP_AUTHORIZATION')
            }
            response = requests.get(self.get_url(), params=self.get_params(), headers=headers)
            response.raise_for_status()
            load = response.json()
            return Response(load, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, *args, **kwargs):
        try:
            headers = {
                "Authorization": request.META.get('HTTP_AUTHORIZATION')
            }
            response = requests.post(self.get_url(), json=self.get_payload(), params=self.get_params(),
                                     headers=headers)
            response.raise_for_status()
            load = response.json()
            return Response(load, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        try:
            headers = {
                "Authorization": request.META.get('HTTP_AUTHORIZATION')
            }
            response = requests.delete(self.get_url(), json=self.get_payload(), params=self.get_params(),
                                       headers=headers)
            response.raise_for_status()
            return Response(response, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"error": e.args}, status=status.HTTP_400_BAD_REQUEST)


class CreateUserIdView(CalendlyAPIView):

    def get_url(self):
        return f"{CALENDLY_URL}/users/me"


class ListUserEventsView(CalendlyAPIView):

    def get_url(self):
        return f"{CALENDLY_URL}event_types"

    def get_params(self):
        """
        :param str(uri) organization:  Url specified to organization who's events are meant to be returned.
        :param bool active: param represents if the organization is active or not.
        :param num count:  count is the number of items will be returned.
        :return: Returns all Event Types associated with a specified  organization/user.

        """
        return self.request.data


class UserEventView(CalendlyAPIView):

    def get_url(self):
        """
        :param str uuid:  The uuid of the event_type who's detail will be returned.
        :return: Returns information about a specified Event Type.
        """
        return f"{CALENDLY_URL}event_types/{self.request.data.get('uuid')}"


class ListEventsAvailableTimesView(CalendlyAPIView):

    def get_url(self):
        return f"{CALENDLY_URL}event_type_available_times"

    def get_params(self):
        """
        :param str start_time: Start time of the requested availability range.
        :param str end_time: End time of the requested availability range.
        :param str(uri) event_type: The uri associated with the event type.
        :return: Returns a list of available times for an event type within a specified date range.
        """
        return self.request.data


class UserBusyTime(CalendlyAPIView):

    def get_url(self):
        return f"{CALENDLY_URL}user_busy_times"

    def get_params(self):
        """
        :param str start_time: Start time of the requested user busy range.
        :param str end_time: End time of the requested user busy range.
        :param str(uri) user: The uri associated with the user.
        :return: Returns an ascending list of user internal and external scheduled events within a specified date range.
        """
        return self.request.data


class UserAvailabilitySchedules(CalendlyAPIView):

    def get_url(self):
        return f"{CALENDLY_URL}user_availability_schedules"

    def get_params(self):
        """
        :param str(uri) user: The uri associated with the user.
        :return: Returns the availability schedules of the given user.
        """
        return self.request.data


class UserAvailabilitySchedule(CalendlyAPIView):

    def get_url(self):
        """
        :param str uuid:  UUID of the availability schedule.
        :return: This will return the details of the availability schedule of the given UUID.
        """
        return f"{CALENDLY_URL}user_availability_schedules/{self.request.data.get('uuid')}"


class DeleteInviteeData(CalendlyAPIView):

    def get_url(self):
        return f"{CALENDLY_URL}data_compliance/deletion/invitees"

    def get_payload(self):
        """
        :param array email: Array of emails of invitees going to be deleted.
        :return:  Removes invitee data from all previously booked events in your organization and returns deleted invitee details.
        """
        return self.request.data.get("email")


class ListOrganizationInvitation(CalendlyAPIView):

    def get_url(self):
        """
        :param str uuid: The organization's unique identifier.
        :return: Returns a list of Organization Invitations that were sent to the organization's members.
        """
        return f"{CALENDLY_URL}organizations/{self.request.data.get('uuid')}/invitations"


class InviteUserToOrganizations(CalendlyAPIView):

    def get_url(self):
        """
         :param str uuid: The organization's unique identifier.
         :param str email:  The email of the user being invited.
         :return: Sends invite to the user and returns the details invitation details sent tp the user.
        """
        return f"{CALENDLY_URL}organizations/{self.request.data.get('uuid')}/invitations"

    def get_payload(self):
        return self.request.data


class RevokeUserOrganizationInvitation(CalendlyAPIView):

    def get_url(self):
        """
         :param str org_uuid: The organization's unique identifier.
         :param str uuid: The organization invitation's unique identifier.
         :return: Revokes an Organization Invitation to an organization. Returns no content.
        """
        return f"{CALENDLY_URL}organizations/{self.request.data.get('org_uuid')}/invitations/{self.request.data.get('uuid')}"


class GetOrganizationInvitation(CalendlyAPIView):

    def get_url(self):
        """
         :param str org_uuid: The organization's unique identifier.
         :param str uuid: The organization invitation's unique identifier.
         :return: Returns an Organization Invitation that was sent to the organization's members.
        """
        return f"{CALENDLY_URL}organizations/{self.request.data.get('org_uuid')}/invitations/{self.request.data.get('uuid')}"


class GetOrganizationMembership(CalendlyAPIView):

    def get_url(self):
        """
         :param str uuid: The organization's unique identifier.
         :return: Returns information about a user's Organization Membership.
        """
        return f"{CALENDLY_URL}organization_memberships/{self.request.data.get('uuid')}"


class ListOrganizationMembership(CalendlyAPIView):
    def get_url(self):
        return f"{CALENDLY_URL}organization_memberships"

    def get_params(self):
        """
        :param str(uri) organization: The uri specified to the organization.
        :return: Returns Organization Memberships for all users belonging to an organization.
        """
        return self.request.data


class RemoveUserFromOrganization(CalendlyAPIView):

    def get_url(self):
        """
        :param str uuid: The organization membership's unique identifier.
        :return:  Removes a user from an organization.
        """
        return f"{CALENDLY_URL}organization_memberships/{self.request.data.get('uuid')}"


class ListScheduleEventInvitee(CalendlyAPIView):

    def get_url(self):
        """
        :param str uuid: The scheduled event's unique identifier.
        :return: Returns a list of Invitees for an event.
        """
        return f"{CALENDLY_URL}scheduled_events/{self.request.data.get('uuid')}/invitees"


class ListScheduleEvent(CalendlyAPIView):

    def get_url(self):
        return f"{CALENDLY_URL}scheduled_events"

    def get_params(self):
        """
        :param str(uri) organization: The uri specified to the organization.
        :return: Return events that are scheduled with the organization associated with this URI.
        """
        return self.request.data


class GetScheduleEvent(CalendlyAPIView):

    def get_url(self):
        """
        :param str uuid: The scheduled event's unique identifier.
        :return: Returns information about a specified Event.
        """
        return f"{CALENDLY_URL}scheduled_events/{self.request.data.get('uuid')}"


class CreateInviteeNoShow(CalendlyAPIView):

    def get_url(self):
        return f"{CALENDLY_URL}invitee_no_shows"

    def get_payload(self):
        """
        :param str(uri) invitee: The scheduled event's uri specified to the invitee.
        :return: Marks an Invitee as a No Show and returns the details of that invitee.
        """
        return self.request.data


class GetInviteeNoShow(CalendlyAPIView):

    def get_url(self):
        """
        :param str uuid: Unique identifier) for the associated Invitee that was marked as no-show.
        :return: Returns information about a specified Invitee No Show.
        """
        return f"{CALENDLY_URL}invitee_no_shows/{self.request.data.get('uuid')}"


class DeleteInviteeNoShow(CalendlyAPIView):

    def get_url(self):
        """
        :param str uuid: Unique identifier) for the associated Invitee that was marked as no-show.
        :return: Undoes marking an Invitee as a No Show. Returns information about that Invitee.
        """
        return f"{CALENDLY_URL}invitee_no_shows/{self.request.data.get('uuid')}"


class CancelScheduleEvent(CalendlyAPIView):

    def get_url(self):
        """
        :param str uuid: The scheduled event's unique identifier.
        :param str reason: Reason for canceling the event.
        :return: Cancels specified event and returns cancelled event's information.
        """
        return f"{CALENDLY_URL}scheduled_events/{self.request.data.get('uuid')}/cancellation"

    def get_payload(self):
        return self.request.data


class CreateWebhookSubscription(CalendlyAPIView):

    def get_url(self):
        return f"{CALENDLY_URL}webhook_subscriptions"

    def get_payload(self):
        """
        :param str(uri) url: The URL where you want to receive POST requests for events you are subscribed to.
        :param array events: List of user events to subscribe to.
        :param str(uri) organization: The unique reference to the organization that the webhook will be tied to.
        :param str scope: Indicates if the webhook subscription scope will be "organization" or "user".
        :return: Creates a Webhook Subscription for an Organization or User. Returns subscribed webhook information.
        """
        return self.request.data


class ListWebhookSubscriptions(CalendlyAPIView):

    def get_url(self):
        return f"{CALENDLY_URL}webhook_subscriptions"

    def get_params(self):
        """
        :param str(uri) organization: The unique reference to the organization that results should be filtered by organization.
        :param str scope: Filter the list by 'organization' or 'user'.
        :return:  Returns a list of Webhook Subscriptions for a specified Organization or User.
        """
        return self.request.data


class GetWebhookSubscriptions(CalendlyAPIView):

    def get_url(self):
        """
        :param str webhook_uuid: unique identifier for the subscribed webhook.
        :return: Returns details about specified Webhook Subscription.
        """
        return f"{CALENDLY_URL}webhook_subscriptions/{self.request.data.get('webhook_uuid')}"


class DeleteWebhookSubscriptions(CalendlyAPIView):

    def get_url(self):
        """
        :param str webhook_uuid: unique identifier for the subscribed webhook.
        :return: Deletes a Webhook Subscription.
        """
        return f"{CALENDLY_URL}webhook_subscriptions/{self.request.data.get('webhook_uuid')}"


class WebhookUrl(APIView):

    def post(self, request, *args, **kwargs):
        """
        This url will be used while creating a webhook. The function will be called every time user schedules, cancel or reschedule an event.
        """
        print("User has scheduled, rescheduled or cancelled an event.")
        working = {"message": 'User has scheduled, rescheduled or cancelled an event.'}
        return Response(working)
