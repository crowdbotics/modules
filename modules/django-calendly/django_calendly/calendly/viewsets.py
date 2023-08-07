from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .serializers import RemoveInviteesSerializer, InviteUserOrganizationsSerializer, CancelScheduleEventSerializer, \
    CreateInviteeNoShowSerializer, CreateWebhookSubscriptionSerializer, TokenSerializer
from .services.calendly import CalendlyService


class CalendlyViewSet(viewsets.GenericViewSet):
    allowed_serializer = {"remove_invitees": RemoveInviteesSerializer,
                          "invite_user_organizations": InviteUserOrganizationsSerializer,
                          "cancel_scheduled_event": CancelScheduleEventSerializer,
                          "create_invitee_no_show": CreateInviteeNoShowSerializer,
                          "create_webhook_subscription": CreateWebhookSubscriptionSerializer,
                          "create_access_token": TokenSerializer
                          }

    calendly_service = CalendlyService()

    def get_serializer_class(self):
        return self.allowed_serializer.get(self.action)

    @action(detail=False, methods=['post'], url_path='access/token')
    def create_access_token(self, request):
        """
        To get the access token
        env_vars: "CALENDLY_CLIENT_ID", "CALENDLY_CLIENT_SECRET" (required)
        :return: Returns access_token.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.calendly_service.create_access_token(payload=serializer.data)
        return Response(data=response.get('data'), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='user/details/(?P<params>[A-Za-z0-9-]*)')
    def user_details(self, *args, **kwargs):
        """
         To get a user_details
         path_params user_id/me: User unique identifier, or the constant "me" to reference the caller 
         :return: Returns information about a specified User if you pass "user_id" in path_params.
         :return: Returns basic information about your user account if you pass the constant "me" in path_params.
        """
        response = self.calendly_service.user_details(params=kwargs.get('params'))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='event/types')
    def event_types(self, request):
        """
        To get all event types
        :query_params str(uri) organization/user(required): organization/user specified to organization/user whose events are
         meant to be returned
         Either organization or user are required query params when using this endpoint.
        :query_params bool active(optional): Return only active event types if true, only inactive if false, or all event types
         if this parameter is omitted.
        :query_params num count(optional):  The number of rows to return
        :query_params str page_token(optional): The token to pass to get the next or previous portion of the collection
        :query_params str sort(optional): Order results by the specified field and direction. Accepts comma-separated
         list of {field}:{direction} values. Supported fields are: name. Sort direction is specified as: asc, desc.
        :return: Returns all Event Types associated with a specified  organization/user.
        """
        response = self.calendly_service.event_types(query_params=request.query_params)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='single/event/types/(?P<uuid>[A-Za-z0-9-]*)')
    def single_event_types(self, *args, **kwargs):
        """
        To retrieve an event type
        :path_param str uuid:  The uuid of the event_type whose detail will be returned.
        :return: Returns information about a specified Event Type.
        """
        response = self.calendly_service.single_event_types(uuid=kwargs.get("uuid"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='event/type/available-times')
    def event_type_available_times(self, request):
        """
        To get all events types available times
        :query_params str start_time(optional): Start time of the requested availability range
        :query_params str(uri) event_type(optional): The uri associated with the event type.
        :query_params str end_time(optional): End time of the requested availability range.
        :return: Returns a list of available times for an event type within a specified date range.
        """
        response = self.calendly_service.event_type_available_times(query_params=request.query_params)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='user/busy-times')
    def user_busy_times(self, request):
        """
        To get user busy times
        :query_params str start_time(required): Start time of the requested user busy range
        :query_params str end_time(required): End time of the requested user busy range
        :query_params str(uri) user(required): The uri associated with the user
        :return: Returns an ascending list of user internal and external scheduled events within a specified date range.
        """
        response = self.calendly_service.user_busy_times(query_params=request.query_params)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='user-availability-schedules')
    def user_availability_schedules_list(self, request):
        """
        To get user availability times list
        :query_param str(uri) user(required): The uri associated with the user
        :return: Returns the availability schedules of the given user.
        """
        response = self.calendly_service.user_availability_schedules_list(query_params=request.query_params)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='user-availability-schedules/(?P<uuid>[A-Za-z0-9-]*)')
    def single_user_availability_schedules(self, *args, **kwargs):
        """
        To get a single user availability times
        :path_params str uuid:  UUID of the availability schedule.
        :return: This will return the details of the availability schedule of the given UUID.
        """
        response = self.calendly_service.single_user_availability_schedules(uuid=kwargs.get("uuid"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='remove/invitees')
    def remove_invitees(self, request):
        """
        To remove  invitees data
        :body_param array emails: Array of emails of invitees going to be deleted
        :return:  Removes invitee data from all previously booked events in your organization and returns deleted
        invitee details.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.calendly_service.remove_invitees(payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='organizations/(?P<uuid>[A-Za-z0-9-]*)/invitations/list')
    def organization_invitations_list(self, request, *args, **kwargs):
        """
        To get organization invitation list
        :path_param str uuid: The organization's unique identifier.
        :query_param num count(optional): The number of rows to return.
        :query_param str email(optional): Indicates if the results should be filtered by email address.
        :query_param str page_token(optional): The token to pass to get the next or previous portion of the collection.
        :query_params str sort(optional): Order results by the field name and direction specified
         (ascending or descending). Returns multiple sets of results in a comma-separated list.
        :query_params str status(optional): Indicates if the results should be filtered by status ("pending",
         "accepted", or "declined")
        :return: Returns a list of Organization Invitations that were sent to the organization's members.
        """
        response = self.calendly_service.organization_invitations_list(uuid=kwargs.get("uuid"),
                                                                       query_params=request.query_params)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='organizations/(?P<uuid>[A-Za-z0-9-]*)/invitations')
    def invite_user_organizations(self, request, *args, **kwargs):
        """
        To Invites a user to an organization.
        :path_param str uuid: The organization's unique identifier
        :body_param str email: Email of the user being invited
        :return: Returns a list of Organization Invitations that were sent to the organization's members
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.calendly_service.invite_user_organizations(uuid=kwargs.get("uuid"), payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['delete'], url_path='organization/(?P<org_uuid>[A-Za-z0-9-]*)/revoke/invitation/('
                                                       '?P<uuid>[A-Za-z0-9-]*)')
    def revoke_user_organization_invitation(self, *args, **kwargs):
        """
        To revoke user organization invitation
        :path_params str org_uuid: The organization's unique identifier
        :path_params str uuid: The organization invitation's unique identifier.
        :return: Revokes an Organization Invitation to an organization. Returns no content.
        """
        response = self.calendly_service.revoke_user_organization_invitation(uuid=kwargs.get("uuid"),
                                                                             org_uuid=kwargs.get("org_uuid"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='organization/(?P<org_uuid>[A-Za-z0-9-]*)/invitation/('
                                                    '?P<uuid>[A-Za-z0-9-]*)')
    def single_organization_invitation(self, *args, **kwargs):
        """
        To get an organization invitation
        :path_params str org_uuid: The organization's unique identifier
        :path_params str uuid: The organization invitation's unique identifier.
        :return: Returns an Organization Invitation that was sent to the organization's members.
        """
        response = self.calendly_service.single_organization_invitation(org_uuid=kwargs.get("org_uuid"),
                                                                        uuid=kwargs.get("uuid"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='organization/membership/(?P<uuid>[A-Za-z0-9-]*)')
    def organization_membership(self, *args, **kwargs):
        """
        To get  organization membership
        :path_param str uuid: The organization's unique identifier
        :return: Returns information about a user's Organization Membership.
        """
        response = self.calendly_service.organization_membership(uuid=kwargs.get("uuid"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='organization/memberships/list')
    def organization_memberships_list(self, request):
        """
        To get organization membership list
        :query_params num count(optional): The number of rows to return
        :query_params str email(optional): Indicates if the results should be filtered by email address
        :query_params str(uri) organization(optional): Indicates if the results should be filtered by organization
        :query_params str page_token(optional): The token to pass to get the next or previous portion of the collection
        :query_params str(uri) user(optional): Indicates if the results should be filtered by organization
        :return: Returns Organization Memberships for all users belonging to an organization.
        """
        response = self.calendly_service.organization_memberships_list(query_params=request.query_params)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['delete'], url_path='organization/membership/(?P<uuid>[A-Za-z0-9-]*)/delete')
    def remove_user_organization_membership(self, *args, **kwargs):
        """
        To remove a user from organization membership
        :path_param str uuid: The organization membership's unique identifier.
        :return:  Removes a user from an organization.
        """
        response = self.calendly_service.remove_user_organization_membership(uuid=kwargs.get("uuid"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='scheduled/events/(?P<uuid>[A-Za-z0-9-]*)/invitees')
    def scheduled_event_invitees(self, request, *args, **kwargs):
        """
        To get a list of scheduled event invitees
        :path_param str uuid: The scheduled event's unique identifier
        :query_params int count(optional): The number of rows to return,
        :query_params str invitee_email(optional): Indicates if the results should be filtered by email address
        :query_params str page_token(optional): The token to pass to get the next or previous portion of the
         collection
        :query_params str sort(optional): Order results by the created_at field and direction specified:
        ascending ("asc") or descending ("desc")
        :query_params str status(optional): Indicates if the invitee "canceled" or still "active"
        :return: Returns a list of Invitees for an event.
        """
        response = self.calendly_service.scheduled_event_invitees(uuid=kwargs.get("uuid"),
                                                                  query_params=request.query_params)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='scheduled/events/list')
    def scheduled_events_list(self, request):
        """
        To get a list of scheduled events 
        :query_params str(uri) organization/user: The uri specified to the organization/user. 
        :Pass organization parameter to return events for that organization (requires admin/owner privilege)
        :Pass user parameter to return events for a specific User
        :query_params int count(optional): The number of rows to return,
        :query_params str invitee_email(optional): Return events that are scheduled with the invitee associated with
         this email address
        :query_params str max_start_time(optional): Include events with start times prior to this time
         (sample time format: "2020-01-02T03:04:05.678123Z"). This time should use the UTC timezone.
        :query_params str min_start_time(optional): Include events with start times prior to this time
         (sample time format: "2020-01-02T03:04:05.678123Z"). This time should use the UTC timezone.
        :query_params str page_token(optional): The token to pass to get the next or previous portion of the
         collection
        :query_params str sort(optional): Order results by the specified field and direction. Accepts comma-separated
         list of {field}:{direction} values. Supported fields are: start_time. Sort direction is specified as:
          asc, desc.
        :query_params str status(optional): Whether the scheduled event is active or canceled
        :return: Returns a list of Events.
        """
        response = self.calendly_service.scheduled_events_list(query_params=request.query_params)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='scheduled/events/(?P<uuid>[A-Za-z0-9-]*)')
    def single_scheduled_event(self, *args, **kwargs):
        """
        To get a scheduled event
        :path_param str uuid: The scheduled event's unique identifier.
        :return: Returns information about a specified scheduled Event.
        """
        response = self.calendly_service.single_scheduled_event(uuid=kwargs.get("uuid"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='scheduled/events/(?P<uuid>[A-Za-z0-9-]*)/cancellation')
    def cancel_scheduled_event(self, request, *args, **kwargs):
        """
        To cancel scheduled event
        :path_param str uuid: The scheduled event's unique identifier
        :body_params str reason(optional): Optional cancellation reason.
        :return: Cancels specified event and returns cancelled event's information.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.calendly_service.cancel_scheduled_event(uuid=kwargs.get("uuid"), payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='invitee-no-show')
    def create_invitee_no_show(self, request):
        """
        To create an invitee no show
        :body_param str(uri) invitee: The scheduled event's uri specified to the invitee.
        :return: Marks an Invitee as a No Show and returns the details of that invitee.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.calendly_service.create_invitee_no_show(payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='invitee-no-show/(?P<uuid>[A-Za-z0-9-]*)')
    def single_invitee_no_show(self, *args, **kwargs):
        """
        To get an invitee no show
        :path_param str uuid: Unique identifier for the associated Invitee that was marked as no-show.
        :return: Returns information about a specified Invitee No Show.
        """
        response = self.calendly_service.single_invitee_no_show(uuid=kwargs.get("uuid"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['delete'], url_path='invitee-no-show/(?P<uuid>[A-Za-z0-9-]*)/delete')
    def remove_invitee_no_show(self, *args, **kwargs):
        """
        To remove an invitee no show
        :path_param str uuid: Unique identifier for the associated Invitee that was marked as no-show.
        :return: Undoes marking an Invitee as a No Show.Return No content.
        """
        response = self.calendly_service.remove_invitee_no_show(uuid=kwargs.get("uuid"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='webhook/subscription')
    def create_webhook_subscription(self, request):
        """
        To create webhook subscription
        :body_param str(uri) url: The URL where you want to receive POST requests for events you are subscribed to.
        :body_param array events: List of user events to subscribe to.
        :body_param str(uri) organization: The unique reference to the organization that the webhook will be tied to.
        :body_param str(uri) user(optional): The unique reference to the user that the webhook will be tied to.
        :body_param str scope: Indicate if the webhook subscription scope will be "organization" or "user".
        :body_param str signing_key: Optional secret key shared between your application and Calendly.
        :return: Creates a Webhook Subscription for an Organization or User. Returns subscribed webhook information.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.calendly_service.create_webhook_subscription(payload=serializer.data)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='webhook/subscriptions/list')
    def webhook_subscription_list(self, request):
        """
        To get webhook subscription list
        :query_params str(uri) organization(required): The unique reference to the organization that results should be
         filtered by organization
        :query_params str scope(required): Filter the list by 'organization' or 'user'.
        :query_params int count(optional): The number of rows to return.
        :query_params str page_token(optional): The token to pass to get the next or previous portion of the collection.
        :query_params str sort(optional): Order results by the specified field and direction. Accepts comma-separated
         list of {field}:{direction} values. Supported fields are: created_at. Sort direction is specified as:
         asc, desc..
        :query_params str(uri) user(optional): Indicates if the results should be filtered by user. This parameter is
        only required if the scope parameter is set to user.
        :return:  Returns a list of Webhook Subscriptions for a specified Organization or User.
        """
        response = self.calendly_service.webhook_subscription_list(query_params=request.query_params)
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['get'], url_path='webhook/subscription/(?P<webhook_uuid>[A-Za-z0-9-]*)')
    def single_webhook_subscription(self, *args, **kwargs):
        """
        To get a webhook subscription
        :path_param str webhook_uuid: unique identifier for the subscribed webhook.
        :return: Get a specified Webhook Subscription.
        """
        response = self.calendly_service.single_webhook_subscription(uuid=kwargs.get("webhook_uuid"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['delete'], url_path='webhook/subscription/(?P<webhook_uuid>[A-Za-z0-9-]*)/delete')
    def remove_webhook_subscription(self, *args, **kwargs):
        """
        To remove a webhook subscription
        :path_param str webhook_uuid: unique identifier for the subscribed webhook.
        :return: Deletes a Webhook Subscription.Returns No content.
        """
        response = self.calendly_service.remove_webhook_subscription(uuid=kwargs.get("webhook_uuid"))
        return Response(data=response.get("data"), status=response.get("status_code"))

    @action(detail=False, methods=['post'], url_path='webhook')
    def webhook(self, request):
        """
        This url will be used while creating a webhook. The function will be called every time user schedules, cancel or
         reschedule an event.
        """
        response = self.calendly_service.webhook()
        return Response(data=response, status=status.HTTP_200_OK)
