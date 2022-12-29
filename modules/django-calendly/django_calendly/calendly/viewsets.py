import os

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .services.CalendlyServices import CalendlyService


class CalendlyViewSet(viewsets.GenericViewSet):
    calendly_service = CalendlyService(
        base_url=os.getenv('CALENDLY_BASE_URL', ""),
        access_token=os.getenv('CALENDLY_ACCESS_TOKEN', ""),
    )

    @action(detail=False, methods=['get'], url_path='user/details')
    def user_details(self, request):
        response = self.calendly_service.user_details()
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='event/types')
    def event_types(self, request):
        """
        To get all events'
        :query_params str(uri) organization:  Url specified to organization whose events are meant to be returned
        :query_params bool active: param represents if the organization is active or not
        :query_params num count:  count is the number of items will be returned
        :return: Returns all Event Types associated with a specified  organization/user.
        """
        response = self.calendly_service.event_types(
            organization=request.query_params.get('organization'),
            active=request.query_params.get('active'),
            count=request.query_params.get('count')
        )
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['get'], url_path='single/event/types')
    def single_event_types(self, request, pk):
        """
        To retrieve an event
        :path_param str uuid:  The uuid of the event_type whose detail will be returned.
        :return: Returns information about a specified Event Type.
        """
        response = self.calendly_service.single_event_types(uuid=pk)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='event/type/available-times')
    def event_type_available_times(self, request):
        """
        To get all events available times'
        :query_params str start_time: Start time of the requested availability range
        :query_params str end_time: End time of the requested availability range.
        :query_params str(uri) event_type: The uri associated with the event type.
        :return: Returns a list of available times for an event type within a specified date range.
        """
        response = self.calendly_service.event_type_available_times(
            start_time=request.query_params.get('start_time'),
            event_type=request.query_params.get('event_type'),
            end_time=request.query_params.get('end_time')
        )
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='user/busy-times')
    def user_busy_times(self, request):
        """
        To get user busy times'
        :query_params str start_time: Start time of the requested user busy range
        :query_params str end_time: End time of the requested user busy range
        :query_params str(uri) user: The uri associated with the user
        :return: Returns an ascending list of user internal and external scheduled events within a specified date range.
        """
        response = self.calendly_service.user_busy_times(
            start_time=request.query_params.get('start_time'),
            event_type=request.query_params.get('event_type'),
            end_time=request.query_params.get('end_time'))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='user/availability-schedules')
    def user_availability_schedules(self, request):
        """
        To get user availability times'
        :path_param str(uri) user: The uri associated with the user
        :return: Returns the availability schedules of the given user.
        """
        response = self.calendly_service.user_availability_schedules(user=request.query_params.get('user'), )
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['get'], url_path='user/single/availability-schedules')
    def single_user_availability_schedules(self, request, pk):
        """
        To get a single user availability times'
        :query_params str uuid:  UUID of the availability schedule.
        :return: This will return the details of the availability schedule of the given UUID.
        """
        response = self.calendly_service.single_user_availability_schedules(uuid=pk)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='remove/invitees')
    def remove_invitees(self, request):
        """
        To remove an invitee data
        :param array email: Array of emails of invitees going to be deleted
        :return:  Removes invitee data from all previously booked events in your organization and returns deleted
        invitee details.
        """
        response = self.calendly_service.remove_invitees(request.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['get'], url_path='organization/invitations/list')
    def organization_invitations_list(self, request, pk):
        """
        To get organization invitation list
        :path_param str uuid: The organization's unique identifier.
        :return: Returns a list of Organization Invitations that were sent to the organization's members.
        """
        response = self.calendly_service.organization_invitations_list(uuid=pk)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['post'], url_path='organization/invite')
    def invite_user_organizations(self, request, pk):
        """
        To get organization invitation list
        :path_param str uuid: The organization's unique identifier
        :param str email: Email of the user being invited
        :return: Returns a list of Organization Invitations that were sent to the organization's members
        """
        response = self.calendly_service.invite_user_organizations(
            uuid=pk,
            data=request.data
        )
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['delete'], url_path='organization/revoke/invitation')
    def revoke_user_organization_invitation(self, request):
        """
        To revoke user organization invitation
        :query_params str org_uuid: The organization's unique identifier
        :query_params str uuid: The organization invitation's unique identifier.
        :return: Revokes an Organization Invitation to an organization. Returns no content.
        """
        response = self.calendly_service.revoke_user_organization_invitation(
            uuid=request.query_params.get('uuid'),
            org_uuid=request.query_params.get('org_uuid'),
        )
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='organization/single/invitation')
    def single_organization_invitation(self, request):
        """
        To get  organization invitation
        :query_params str org_uuid: The organization's unique identifier
        :query_params str uuid: The organization invitation's unique identifier.
        :return: Returns an Organization Invitation that was sent to the organization's members.
        """
        response = self.calendly_service.single_organization_invitation(
            uuid=request.query_params.get('uuid'),
            org_uuid=request.query_params.get('org_uuid'))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['get'], url_path='organization/membership')
    def organization_membership(self, request, pk):
        """
        To get  organization membership
        :path_param str uuid: The organization's unique identifier
        :return: Returns information about a user's Organization Membership.
        """
        response = self.calendly_service.organization_membership(uuid=pk)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='organization/membership/list')
    def organization_membership_list(self, request):
        """
        To get  organization membership list
        :query_params str(uri) organization: The uri specified to the organization
        :return: Returns Organization Memberships for all users belonging to an organization.
        """
        response = self.calendly_service.organization_membership_list(
            organization=request.query_params.get('organization')
        )
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['delete'], url_path='organization/remove/membership')
    def remove_user_organization_membership(self, request, pk):
        """
        To remove a user from organization membership
        :path_param str uuid: The organization membership's unique identifier.
        :return:  Removes a user from an organization.
        """
        response = self.calendly_service.remove_user_organization_membership(uuid=pk)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['get'], url_path='invitee/list/event-schedule')
    def list_schedule_event_invitee(self, request, pk):
        """
        To get a list of schedule event invitee
        :path_param str uuid: The scheduled event's unique identifier.
        :return: Returns a list of Invitees for an event.
        """
        response = self.calendly_service.list_schedule_event_invitee(uuid=pk)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='scheduled/event/list')
    def scheduled_events_list(self, request):
        """
        To get a list of scheduled events
        :query_params str(uri) organization: The uri specified to the organization.
        :return: Return events that are scheduled with the organization associated with this URI.
        """
        response = self.calendly_service.scheduled_events_list(
            organization=request.query_params.get('organization')
        )
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['get'], url_path='schedule/event/single')
    def single_event_schedule(self, request, pk):
        """
        To get a schedule event
        :path_param str uuid: The scheduled event's unique identifier.
        :return: Returns information about a specified Event.
        """
        response = self.calendly_service.single_event_schedule(uuid=pk)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['post'], url_path='schedule/event/cancel')
    def cancel_schedule_event(self, request, pk):
        """
        To cancel schedule event
        :path_param str uuid: The scheduled event's unique identifier
        :return: Cancels specified event and returns cancelled event's information.
        """
        response = self.calendly_service.cancel_schedule_event(uuid=pk)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='create/invitee-no-show')
    def create_invitee_no_show(self, request):
        """
        To create an invitee no show
        :param str(uri) invitee: The scheduled event's uri specified to the invitee.
        :return: Marks an Invitee as a No Show and returns the details of that invitee.
        """
        response = self.calendly_service.create_invitee_no_show(request.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['get'], url_path='single/invitee-no-show')
    def single_invitee_no_show(self, request, pk):
        """
        To get an invitee no show
        :path_param str uuid: Unique identifier for the associated Invitee that was marked as no-show.
        :return: Returns information about a specified Invitee No Show.
        """
        response = self.calendly_service.single_invitee_no_show(uuid=pk)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['delete'], url_path='remove/invitee-no-show')
    def remove_invitee_no_show(self, request, pk):
        """
        To remove an invitee no show
        :path_param str uuid: Unique identifier) for the associated Invitee that was marked as no-show.
        :return: Undoes marking an Invitee as a No Show. Returns information about that Invitee.
        """
        response = self.calendly_service.remove_invitee_no_show(uuid=pk)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='create/webhook/subscription')
    def create_webhook_subscription(self, request):
        """
        To create webhook subscription
        :param str(uri) url: The URL where you want to receive POST requests for events you are subscribed to
        :param array events: List of user events to subscribe to
        :param str(uri) organization: The unique reference to the organization that the webhook will be tied to
        :param str scope: Indicates if the webhook subscription scope will be "organization" or "user".
        :return: Creates a Webhook Subscription for an Organization or User. Returns subscribed webhook information.
        """
        response = self.calendly_service.create_webhook_subscription(request.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='webhook/subscription/list')
    def webhook_subscription_list(self, request):
        """
        To get webhook subscription list
        :query_params str(uri) organization: The unique reference to the organization that results should be filtered by
         organization
        :query_params str scope: Filter the list by 'organization' or 'user'.
        :return:  Returns a list of Webhook Subscriptions for a specified Organization or User.
        """
        response = self.calendly_service.webhook_subscription_list(
            organization=request.query_params.get('organization'),
            scope=request.query_params.get('scope')
        )
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['get'], url_path='single/webhook/subscription')
    def single_webhook_subscription(self, request, pk):
        """
        To get a webhook subscription
        :path_param str webhook_uuid: unique identifier for the subscribed webhook.
        :return: Returns details about specified Webhook Subscription.
        """
        response = self.calendly_service.single_webhook_subscription(uuid=pk)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=True, methods=['delete'], url_path='remove/webhook/subscription')
    def remove_webhook_subscription(self, request, pk):
        """
        To remove a webhook subscription
        :path_param str webhook_uuid: unique identifier for the subscribed webhook.
        :return: Deletes a Webhook Subscription.
        """
        response = self.calendly_service.remove_webhook_subscription(uuid=pk)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='webhook')
    def webhook(self, request):
        """
        This url will be used while creating a webhook. The function will be called every time user schedules, cancel or
         reschedule an event.
        """
        response = self.calendly_service.webhook()
        return Response(data=response, status=status.HTTP_200_OK)
