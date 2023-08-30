## Django Calendly backend configuration and information

## Module description

This module is built using [Calendly API v2](https://developer.calendly.com/api-docs), users will be able to retrieve
events, sync scheduled meetings, and
manage users on [Calendly Dashboard](https://calendly.com/event_types/user/me). Automatically receive Calendly data with
webhook subscriptions anytime
invitees schedule, cancel, or reschedule a meeting.

Following are the scope features for this module:

- Get the list of all scheduled events
- Cancel a scheduled event
- Get the list of event invitees
- Get the list of event types
- Invite a user to the organization
- List of all the organization invitations
- Revoke a user’s organization invitation
- Get a list of user availability schedules
- Create a Webhook Subscription for an Organization or User.
- Get a single or list of Webhooks Subscriptions for a specified Organization or User

## Features

- [ ] This module includes migrations.
- [x] This module includes environment variables.
- [x] This module requires manual configurations.
- [ ] This module can be configured with module options.

## Environment variables

```dotenv
CALENDLY_BASE_URL="Calendly base url",
CALENDLY_ACCESS_TOKEN="Your calendly personal token",
CALENDLY_CLIENT_ID="your calendly app id", 
CALENDLY_CLIENT_SECRET="your calendly app secret"
```

## 3rd party setup

Calendly personal token is
a [Bearer Token](https://cloud.google.com/docs/authentication/token-types#:~:text=Bearer%20tokens%20are%20a%20general,JWTs%20are%20all%20bearer%20tokens).
The Calendly API v2 uses personal access tokens to authenticate requests. It is necessary to get a personal access
tokens to make successful requests to calendly.

1. Log in to [Calendly](https://calendly.com/login).
2. Click on `Integration` tab, on top-right corner of the page.
3. Select `API and Webhooks` in `All integrations` section.
4. Click on `Generate New Token` to get your personal token.

![calendly](https://user-images.githubusercontent.com/76822297/228194358-21695a02-d4fd-4b81-ae9b-7db61b695af5.png)

To access the Calendly API, obtain the 'code' by using the authorize link and then include it in the access token API
payload. The authorize link is:
(https://auth.calendly.com/oauth/authorize?client_id=your_client_id&response_type=code&redirect_uri=your_app_redirect_uri)

## Dependencies

No dependencies are used.

## API details

| Api Name                                                                       |                                                     Params                                                      | Description                                                                                                                                                                                                                                           |
|--------------------------------------------------------------------------------|:---------------------------------------------------------------------------------------------------------------:|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `/modules/calendly/user/details/<params>/`  `GET`                              |                                            path_params `user_id/me`                                             | User unique identifier, or the constant "me" to reference the caller. Returns information about a specified User if you pass "user_id" in path_params. Returns basic information about your user account if you pass the constant "me" in path_params |
| `/modules/calendly/event/types/ ` `GET`                                        |                         query_params`organization/use, active, count, page_token, sort`                         | Either organization or user are required query params when using this endpoint. Returns all Event Types associated with a specified organization/user.                                                                                                |
| `/modules/calendly/single/event/types/<uuid>/ `  `GET`                         |                                               path_params `uuid`                                                | The uuid of the event_type whose detail will be returned. Returns information about a specified Event Type.                                                                                                                                           |
| `/modules/calendly/event/type/available-times/ `   `GET`                       |                                 query_params `start_time, end_time, event_type`                                 | Returns a list of available times for an event type within a specified date range.                                                                                                                                                                    |
| `/modules/calendly/user/busy-times/`  `GET`                                    |                                    query_params `start_time, end_time, user`                                    | Returns an ascending list of user internal and external scheduled events within a specified date range.                                                                                                                                               |
| `/modules/calendly/user-availability-schedules/` `GET`                         |                                               query_params `user`                                               | Returns the availability schedules of the given user.                                                                                                                                                                                                 |
| `/modules/calendly/user-availability-schedules/<uuid>/` `GET`                  |                                               path_params `uuid`                                                | UUID of the availability schedule. This will return the details of the availability schedule of the given UUID.                                                                                                                                       |
| `/modules/calendly/remove/invitees/ `  `DELETE`                                |                                            body_param array `emails`                                            | Array of emails of invitees going to be deleted. Removes invitee data from all previously booked events in your organization and returns deleted invitee details.                                                                                     |
| `/modules/calendly/organizations/<uuid>/invitations/list/ ` `GET`              |                  path_params `uuid`     query_params `count, email, page_token, sort, status`                   | The organization's unique identifier. Returns a list of Organization Invitations that were sent to the organization's members.                                                                                                                        |
| `/modules/calendly/organizations/<uuid>/invitations/` `POST`                   |                                     path_params `uuid` body_params `email`                                      | he organization's unique identifier.  Email of the user being invited. Returns a list of Organization Invitations that were sent to the organization's members.                                                                                       |
| `/modules/calendly/organization/<org_uuid>/revoke/invitation/<uuid>/` `DELETE` |                                          path_params `org_uuid, uuid`                                           | The organization's unique identifier. The organization invitation's unique identifier. Revokes an Organization Invitation to an organization. Returns no content.                                                                                     |
| `/modules/calendly/organization/<org_uuid>/invitation/<uuid>/ ` `GET`          |                                          path_params `org_uuid, uuid`                                           | Returns an Organization Invitation that was sent to the organization's members.                                                                                                                                                                       |
| `/modules/calendly/organization/membership/<uuid>/ ` `GET`                     |                                               path_params `uuid`                                                | The organization's unique identifier. Returns information about a user's Organization Membership.                                                                                                                                                     |
| `/modules/calendly/organization/memberships/list/`  `GET`                      |                           query_params `organization, email, user, count, pge_token`                            | Returns Organization Memberships for all users belonging to an organization.                                                                                                                                                                          |
| `/modules/calendly/organization/membership/<uuid>/delete/` `DELETE`            |                                               path_params `uuid`                                                | The organization membership's unique identifier. Removes a user from an organization.                                                                                                                                                                 |
| `/modules/calendly/scheduled/events/<uuid>/invitees/` `GET`                    |                path_params `uuid`  query_params `count, page_token, sort, status, invitee_email`                | The scheduled event's unique identifier. Returns a list of Invitees for an event.                                                                                                                                                                     |
| `/modules/calendly/scheduled/events/list/` `GET`                               | query_params `organization/user, count, page_token, sort, status, max_start_time, min_start_ime, invitee_email` | The uri specified to the organization/user. Pass organization parameter to return events for that organization (requires admin/owner privilege). Pass user parameter to return events for a specific User. Returns a list of Events.                  |
| `/modules/calendly/scheduled/events/<uuid>`  `GET`                             |                                               path_params `uuid`                                                | The scheduled event's unique identifier. Returns information about a specified scheduled Event.                                                                                                                                                       |
| `/modules/calendly/scheduled/events/<uuid>/cancellation/` `POST`               |                                path_params `uuid` body_params(optional) `reason`                                | Cancels specified event and returns cancelled event's information.                                                                                                                                                                                    |
| `/modules/calendly/invitee-no-show/` `POST`                                    |                                           body_params `invitee(uri)`                                            | The scheduled event's uri specified to the invitee. Marks an Invitee as a No Show and returns the details of that invitee.                                                                                                                            |
| `/modules/calendly/invitee-no-show/<uuid>/`  `GET`                             |                                               path_params `uuid`                                                | Unique identifier for the associated Invitee that was marked as no-show. Returns information about a specified Invitee No Show.                                                                                                                       |
| `/modules/calendly/invitee-no-show/<uuid>/delete/`  `DELETE`                   |                                               path_params `uuid`                                                | Unique identifier for the associated Invitee that was marked as no-show. Undoes marking an Invitee as a No Show.Return No content.                                                                                                                    |
| `/modules/calendly/webhook/subscription/`  `POST`                              |                              [Webhook Subscription Payload](#subscription-payload)                              | The URL where you want to receive POST requests for events you are subscribed to. Creates a Webhook Subscription for an Organization or User. Returns subscribed webhook information.                                                                 |
| `/modules/calendly/webhook/subscriptions/list/ `  `GET`                        |             query_params `organization(required), scope(required), user, count, page_token, sort `              | The unique reference to the organization that results should be filtered by organization. Returns a list of Webhook Subscriptions for a specified Organization or User.                                                                               |
| `/modules/calendly/webhook/subscription/<webhook_uuid>/` `GET`                 |                                           path_params `webhook_uuid`                                            | unique identifier for the subscribed webhook. Get a specified Webhook Subscription.                                                                                                                                                                   |
| `/modules/calendly/webhook/subscription/<webhook_uuid>/delete/ ` `DELETE`      |                                           path_params `webhook_uuid`                                            | unique identifier for the subscribed webhook. Deletes a Webhook Subscription. Returns No content.                                                                                                                                                     |
| `/modules/calendly/webhook/`  `POST`                                           |                                                        -                                                        | This url will be used while creating a webhook. The function will be called every time user schedules, cancel or reschedule an event.                                                                                                                 |

#### Subscription Payload

 ```
 {
     url : 'https://{base_url}/modules/calendly/webhook-url/', //The URL where you want to receive POST requests for events you are subscribed to.
     events: [                     //List of user events to subscribe to.
    "invitee.created",
    "invitee.canceled"
    ],
    organization: 'https://api.calendly.com/organizations/AAAAAAAAAAAAAAAA' //The unique reference to the organization that the webhook will be tied to.
    scope: 'organization'          //Indicates if the webhook subscription scope will be "organization" or "user"
 }
 ```
