import os

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .serializers import RemoveInviteesSerializer, InviteUserOrganizationsSerializer, CancelScheduleEventSerializer, \
    CreateInviteeNoShowSerializer, CreateWebhookSubscriptionSerializer
from .services.CalendlyServices import CalendlyService


class CalendlyViewSet(viewsets.GenericViewSet):
    calendly_service = CalendlyService(
        base_url=os.getenv('CALENDLY_BASE_URL', ""),
        access_token=os.getenv('CALENDLY_ACCESS_TOKEN', ""),
    )

    allowed_serializer = {"remove_invitees": RemoveInviteesSerializer,
                          "invite_user_organizations": InviteUserOrganizationsSerializer,
                          "cancel_scheduled_event": CancelScheduleEventSerializer,
                          "create_invitee_no_show": CreateInviteeNoShowSerializer,
                          "create_webhook_subscription": CreateWebhookSubscriptionSerializer
                          }

    def get_serializer_class(self):
        return self.allowed_serializer.get(self.action)

    @action(detail=False, methods=['get'], url_path='user/details/(?P<params>[A-Za-z0-9-]*)')
    def user_details(self, request, params):
        """
         To get a user_details\n
         path_params user_id/me: User unique identifier, or the constant "me" to reference the caller \n
         :return: Returns information about a specified User if you pass "user_id" in path_params.\n
         :return: Returns basic information about your user account if you pass the constant "me" in path_params.\n
        """
        response = self.calendly_service.user_details(params=params)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='event/types')
    def event_types(self, request):
        """
        To get all event types\n
        :query_params str(uri) organization/user(required): organization/user specified to organization/user whose events are
         meant to be returned\n
         Either organization or user are required query params when using this endpoint.\n
        :query_params bool active(optional): Return only active event types if true, only inactive if false, or all event types
         if this parameter is omitted.\n
        :query_params num count(optional):  The number of rows to return\n
        :query_params str page_token(optional): The token to pass to get the next or previous portion of the collection\n
        :query_params str sort(optional): Order results by the specified field and direction. Accepts comma-separated
         list of {field}:{direction} values. Supported fields are: name. Sort direction is specified as: asc, desc.\n
        :return: Returns all Event Types associated with a specified  organization/user.
        """
        response = self.calendly_service.event_types(query_params=request.query_params)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='single/event/types/(?P<uuid>[A-Za-z0-9-]*)')
    def single_event_types(self, request, uuid):
        """
        To retrieve an event type\n
        :path_param str uuid:  The uuid of the event_type whose detail will be returned.\n
        :return: Returns information about a specified Event Type.
        """
        response = self.calendly_service.single_event_types(uuid=uuid)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='event/type/available-times')
    def event_type_available_times(self, request):
        """
        To get all events types available times\n
        :query_params str start_time(optional): Start time of the requested availability range\n
        :query_params str(uri) event_type(optional): The uri associated with the event type.\n
        :query_params str end_time(optional): End time of the requested availability range.\n
        :return: Returns a list of available times for an event type within a specified date range.
        """
        response = self.calendly_service.event_type_available_times(query_params=request.query_params)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='user/busy-times')
    def user_busy_times(self, request):
        """
        To get user busy times\n
        :query_params str start_time(required): Start time of the requested user busy range\n
        :query_params str end_time(required): End time of the requested user busy range\n
        :query_params str(uri) user(required): The uri associated with the user\n
        :return: Returns an ascending list of user internal and external scheduled events within a specified date range.
        """
        response = self.calendly_service.user_busy_times(query_params=request.query_params)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='user-availability-schedules')
    def user_availability_schedules_list(self, request):
        """
        To get user availability times list\n
        :query_param str(uri) user(required): The uri associated with the user\n
        :return: Returns the availability schedules of the given user.
        """
        response = self.calendly_service.user_availability_schedules_list(query_params=request.query_params)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='user-availability-schedules/(?P<uuid>[A-Za-z0-9-]*)')
    def single_user_availability_schedules(self, request, uuid):
        """
        To get a single user availability times\n
        :path_params str uuid:  UUID of the availability schedule.\n
        :return: This will return the details of the availability schedule of the given UUID.
        """
        response = self.calendly_service.single_user_availability_schedules(uuid=uuid)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='remove/invitees')
    def remove_invitees(self, request):
        """
        To remove  invitees data\n
        :body_param array emails: Array of emails of invitees going to be deleted\n
        :return:  Removes invitee data from all previously booked events in your organization and returns deleted
        invitee details.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.calendly_service.remove_invitees(payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='organizations/(?P<uuid>[A-Za-z0-9-]*)/invitations/list')
    def organization_invitations_list(self, request, uuid):
        """
        To get organization invitation list\n
        :path_param str uuid: The organization's unique identifier.\n
        :query_param num count(optional): The number of rows to return.\n
        :query_param str email(optional): Indicates if the results should be filtered by email address.\n
        :query_param str page_token(optional): The token to pass to get the next or previous portion of the collection.\n
        :query_params str sort(optional): Order results by the field name and direction specified
         (ascending or descending). Returns multiple sets of results in a comma-separated list.\n
        :query_params str status(optional): Indicates if the results should be filtered by status ("pending",
         "accepted", or "declined")\n
        :return: Returns a list of Organization Invitations that were sent to the organization's members.
        """
        response = self.calendly_service.organization_invitations_list(uuid=uuid, query_params=request.query_params)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='organizations/(?P<uuid>[A-Za-z0-9-]*)/invitations')
    def invite_user_organizations(self, request, uuid):
        """
        To Invites a user to an organization.\n
        :path_param str uuid: The organization's unique identifier\n
        :body_param str email: Email of the user being invited\n
        :return: Returns a list of Organization Invitations that were sent to the organization's members
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.calendly_service.invite_user_organizations(uuid=uuid, payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['delete'], url_path='organization/(?P<org_uuid>[A-Za-z0-9-]*)/revoke/invitation/('
                                                       '?P<uuid>[A-Za-z0-9-]*)')
    def revoke_user_organization_invitation(self, request, uuid, org_uuid):
        """
        To revoke user organization invitation\n
        :path_params str org_uuid: The organization's unique identifier\n
        :path_params str uuid: The organization invitation's unique identifier.\n
        :return: Revokes an Organization Invitation to an organization. Returns no content.
        """
        response = self.calendly_service.revoke_user_organization_invitation(uuid=uuid, org_uuid=org_uuid)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='organization/(?P<org_uuid>[A-Za-z0-9-]*)/invitation/('
                                                    '?P<uuid>[A-Za-z0-9-]*)')
    def single_organization_invitation(self, request, org_uuid, uuid):
        """
        To get an organization invitation\n
        :path_params str org_uuid: The organization's unique identifier\n
        :path_params str uuid: The organization invitation's unique identifier.\n
        :return: Returns an Organization Invitation that was sent to the organization's members.
        """
        response = self.calendly_service.single_organization_invitation(org_uuid=org_uuid, uuid=uuid)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='organization/membership/(?P<uuid>[A-Za-z0-9-]*)')
    def organization_membership(self, request, uuid):
        """
        To get  organization membership\n
        :path_param str uuid: The organization's unique identifier\n
        :return: Returns information about a user's Organization Membership.
        """
        response = self.calendly_service.organization_membership(uuid=uuid)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='organization/memberships/list')
    def organization_memberships_list(self, request):
        """
        To get organization membership list\n
        :query_params num count(optional): The number of rows to return\n
        :query_params str email(optional): Indicates if the results should be filtered by email address\n
        :query_params str(uri) organization(optional): Indicates if the results should be filtered by organization\n
        :query_params str page_token(optional): The token to pass to get the next or previous portion of the collection\n
        :query_params str(uri) user(optional): Indicates if the results should be filtered by organization\n
        :return: Returns Organization Memberships for all users belonging to an organization.
        """
        response = self.calendly_service.organization_memberships_list(query_params=request.query_params)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['delete'], url_path='organization/membership/(?P<uuid>[A-Za-z0-9-]*)/delete')
    def remove_user_organization_membership(self, request, uuid):
        """
        To remove a user from organization membership\n
        :path_param str uuid: The organization membership's unique identifier.\n
        :return:  Removes a user from an organization.
        """
        response = self.calendly_service.remove_user_organization_membership(uuid=uuid)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='scheduled/events/(?P<uuid>[A-Za-z0-9-]*)/invitees')
    def scheduled_event_invitees(self, request, uuid):
        """
        To get a list of scheduled event invitees\n
        :path_param str uuid: The scheduled event's unique identifier\n
        :query_params int count(optional): The number of rows to return,\n
        :query_params str invitee_email(optional): Indicates if the results should be filtered by email address\n
        :query_params str page_token(optional): The token to pass to get the next or previous portion of the
         collection\n
        :query_params str sort(optional): Order results by the created_at field and direction specified:
        ascending ("asc") or descending ("desc")\n
        :query_params str status(optional): Indicates if the invitee "canceled" or still "active"\n
        :return: Returns a list of Invitees for an event.
        """
        response = self.calendly_service.scheduled_event_invitees(uuid=uuid, query_params=request.query_params)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='scheduled/events/list')
    def scheduled_events_list(self, request):
        """
        To get a list of scheduled events \n
        :query_params str(uri) organization/user: The uri specified to the organization/user. \n
        :Pass organization parameter to return events for that organization (requires admin/owner privilege)\n
        :Pass user parameter to return events for a specific User\n
        :query_params int count(optional): The number of rows to return,\n
        :query_params str invitee_email(optional): Return events that are scheduled with the invitee associated with
         this email address\n
        :query_params str max_start_time(optional): Include events with start times prior to this time
         (sample time format: "2020-01-02T03:04:05.678123Z"). This time should use the UTC timezone.\n
        :query_params str min_start_time(optional): Include events with start times prior to this time
         (sample time format: "2020-01-02T03:04:05.678123Z"). This time should use the UTC timezone.\n
        :query_params str page_token(optional): The token to pass to get the next or previous portion of the
         collection\n
        :query_params str sort(optional): Order results by the specified field and direction. Accepts comma-separated
         list of {field}:{direction} values. Supported fields are: start_time. Sort direction is specified as:
          asc, desc.\n
        :query_params str status(optional): Whether the scheduled event is active or canceled\n
        :return: Returns a list of Events.
        """
        response = self.calendly_service.scheduled_events_list(query_params=request.query_params)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='scheduled/events/(?P<uuid>[A-Za-z0-9-]*)')
    def single_scheduled_event(self, request, uuid):
        """
        To get a scheduled event\n
        :path_param str uuid: The scheduled event's unique identifier.\n
        :return: Returns information about a specified scheduled Event.\n
        """
        response = self.calendly_service.single_scheduled_event(uuid=uuid)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='scheduled/events/(?P<uuid>[A-Za-z0-9-]*)/cancellation')
    def cancel_scheduled_event(self, request, uuid):
        """
        To cancel scheduled event\n
        :path_param str uuid: The scheduled event's unique identifier\n
        :body_params str reason(optional): Optional cancellation reason.\n
        :return: Cancels specified event and returns cancelled event's information.\n
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.calendly_service.cancel_scheduled_event(uuid=uuid, payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='invitee-no-show')
    def create_invitee_no_show(self, request):
        """
        To create an invitee no show\n
        :body_param str(uri) invitee: The scheduled event's uri specified to the invitee.\n
        :return: Marks an Invitee as a No Show and returns the details of that invitee.\n
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.calendly_service.create_invitee_no_show(payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='invitee-no-show/(?P<uuid>[A-Za-z0-9-]*)')
    def single_invitee_no_show(self, request, uuid):
        """
        To get an invitee no show\n
        :path_param str uuid: Unique identifier for the associated Invitee that was marked as no-show.\n
        :return: Returns information about a specified Invitee No Show.\n
        """
        response = self.calendly_service.single_invitee_no_show(uuid=uuid)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['delete'], url_path='invitee-no-show/(?P<uuid>[A-Za-z0-9-]*)/delete')
    def remove_invitee_no_show(self, request, uuid):
        """
        To remove an invitee no show\n
        :path_param str uuid: Unique identifier for the associated Invitee that was marked as no-show.\n
        :return: Undoes marking an Invitee as a No Show.Return No content.\n
        """
        response = self.calendly_service.remove_invitee_no_show(uuid=uuid)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='webhook/subscription')
    def create_webhook_subscription(self, request):
        """
        To create webhook subscription\n
        :body_param str(uri) url: The URL where you want to receive POST requests for events you are subscribed to.\n
        :body_param array events: List of user events to subscribe to.\n
        :body_param str(uri) organization: The unique reference to the organization that the webhook will be tied to.\n
        :body_param str(uri) user(optional): The unique reference to the user that the webhook will be tied to.\n
        :body_param str scope: Indicate if the webhook subscription scope will be "organization" or "user".\n
        :body_param str signing_key: Optional secret key shared between your application and Calendly.\n
        :return: Creates a Webhook Subscription for an Organization or User. Returns subscribed webhook information.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.calendly_service.create_webhook_subscription(payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='webhook/subscriptions/list')
    def webhook_subscription_list(self, request):
        """
        To get webhook subscription list\n
        :query_params str(uri) organization(required): The unique reference to the organization that results should be
         filtered by organization\n
        :query_params str scope(required): Filter the list by 'organization' or 'user'.\n
        :query_params int count(optional): The number of rows to return.\n
        :query_params str page_token(optional): The token to pass to get the next or previous portion of the collection.\n
        :query_params str sort(optional): Order results by the specified field and direction. Accepts comma-separated
         list of {field}:{direction} values. Supported fields are: created_at. Sort direction is specified as:
         asc, desc..\n
        :query_params str(uri) user(optional): Indicates if the results should be filtered by user. This parameter is
        only required if the scope parameter is set to user.\n
        :return:  Returns a list of Webhook Subscriptions for a specified Organization or User.
        """
        response = self.calendly_service.webhook_subscription_list(query_params=request.query_params)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='webhook/subscription/(?P<webhook_uuid>[A-Za-z0-9-]*)')
    def single_webhook_subscription(self, request, webhook_uuid):
        """
        To get a webhook subscription\n
        :path_param str webhook_uuid: unique identifier for the subscribed webhook.\n
        :return: Get a specified Webhook Subscription.\n
        """
        response = self.calendly_service.single_webhook_subscription(uuid=webhook_uuid)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['delete'], url_path='webhook/subscription/(?P<webhook_uuid>[A-Za-z0-9-]*)/delete')
    def remove_webhook_subscription(self, request, webhook_uuid):
        """
        To remove a webhook subscription\n
        :path_param str webhook_uuid: unique identifier for the subscribed webhook.\n
        :return: Deletes a Webhook Subscription.Returns No content,\n
        """
        response = self.calendly_service.remove_webhook_subscription(uuid=webhook_uuid)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='webhook')
    def webhook(self, request):
        """
        This url will be used while creating a webhook. The function will be called every time user schedules, cancel or
         reschedule an event.
        """
        response = self.calendly_service.webhook()
        return Response(data=response, status=status.HTTP_200_OK)
