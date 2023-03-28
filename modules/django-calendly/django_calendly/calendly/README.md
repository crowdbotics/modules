## Crowdbotics Calendly Component - Backend

This module contains all needed resources to get the Calendly component for React
Native mobile client.

 This module is built using [Calendly API v2](https://developer.calendly.com/api-docs), users will be able to retrieve events, sync scheduled meetings, and manage users on [Calendly Dashboard](https://calendly.com/event_types/user/me).
 Automatically receive Calendly data with webhook subscriptions anytime invitees schedule, cancel, or reschedule a meeting.

## Features
1. Get the list of all scheduled events
2. Cancel a scheduled event
3. Get the list of event invitees
4. Get the list of event types
5. Invite a user to the organization
6. List of all the organization invitations
7. Revoke a user’s organization invitation
8. Get a list of user availability schedules
9. Create a Webhook Subscription for an Organization or User.
10. Get a single or list of Webhooks Subscriptions for a specified Organization or User


## Calendly Personal Token
Calendly personal token is a [Bearer Token](https://cloud.google.com/docs/authentication/token-types#:~:text=Bearer%20tokens%20are%20a%20general,JWTs%20are%20all%20bearer%20tokens). The Calendly API v2 uses personal access tokens to authenticate requests. It is necessary to get a personal access tokens to make successful requests to calendly.

1. Log in to [Calendly](https://calendly.com/login). 
2. Click on `Integration` tab on top-right corner of the page.
3. Select `API and Webhooks` in `All integrations` section.
4. Click on `Generate New Token` to get your personal token.


## Environment Variables
Update `.env` file with:

```
CALENDLY_BASE_URL= Calendly base url
CALENDLY_ACCESS_TOKEN= Your calendly personal token
```
## Installation
Run the following commands to get started:

```
python manage.py migrate
python manage.py runserver
```


## Api Table
List of api's endpoints with params needed for these apis.

| Api Name                                                                      |                                                     Params                                                      | Description                                                                                                                                                                                                                                           |
|-------------------------------------------------------------------------------|:---------------------------------------------------------------------------------------------------------------:|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `/modules/calendly/service/user/details/<params>/`                            |                                            path_params `user_id/me`                                             | User unique identifier, or the constant "me" to reference the caller. Returns information about a specified User if you pass "user_id" in path_params. Returns basic information about your user account if you pass the constant "me" in path_params |
| `/modules/calendly/service/event/types/ `                                     |                         query_params`organization/use, active, count, page_token, sort`                         | Either organization or user are required query params when using this endpoint. Returns all Event Types associated with a specified organization/user.                                                                                                |
| `/modules/calendly/service/single/event/types/<uuid>/ `                       |                                               path_params `uuid`                                                | The uuid of the event_type whose detail will be returned. Returns information about a specified Event Type.                                                                                                                                           |
| `/modules/calendly/service/event/type/available-times/ `                      |                                 query_params `start_time, end_time, event_type`                                 | Returns a list of available times for an event type within a specified date range.                                                                                                                                                                    |
| `/modules/calendly/service/user/busy-times/`                                  |                                    query_params `start_time, end_time, user`                                    | Returns an ascending list of user internal and external scheduled events within a specified date range.                                                                                                                                               |
| `/modules/calendly/service/user-availability-schedules/`                      |                                               query_params `user`                                               | Returns the availability schedules of the given user.                                                                                                                                                                                                 |
| `/modules/calendly/service/user-availability-schedules/<uuid>/`               |                                               path_params `uuid`                                                | UUID of the availability schedule. This will return the details of the availability schedule of the given UUID.                                                                                                                                       |
| `/modules/calendly/service/remove/invitees/ `                                 |                                            body_param array `emails`                                            | Array of emails of invitees going to be deleted. Removes invitee data from all previously booked events in your organization and returns deleted invitee details.                                                                                     |
| `/modules/calendly/service/organizations/<uuid>/invitations/list/ `           |                  path_params `uuid`     query_params `count, email, page_token, sort, status`                   | The organization's unique identifier. Returns a list of Organization Invitations that were sent to the organization's members.                                                                                                                        |
| `/modules/calendly/service/organizations/<uuid>/invitations/`                 |                                     path_params `uuid` body_params `email`                                      | he organization's unique identifier.  Email of the user being invited. Returns a list of Organization Invitations that were sent to the organization's members.                                                                                       |
| `/modules/calendly/service/organization/<org_uuid>/revoke/invitation/<uuid>/` |                                          path_params `org_uuid, uuid`                                           | The organization's unique identifier. The organization invitation's unique identifier. Revokes an Organization Invitation to an organization. Returns no content.                                                                                     |
| `/modules/calendly/service/organization/<org_uuid>/invitation/<uuid>/ `       |                                          path_params `org_uuid, uuid`                                           | Returns an Organization Invitation that was sent to the organization's members.                                                                                                                                                                       |
| `/modules/calendly/service/organization/membership/<uuid>/ `                  |                                               path_params `uuid`                                                | The organization's unique identifier. Returns information about a user's Organization Membership.                                                                                                                                                     |
| `/modules/calendly/service/organization/memberships/list/`                    |                           query_params `organization, email, user, count, pge_token`                            | Returns Organization Memberships for all users belonging to an organization.                                                                                                                                                                          |
| `/modules/calendly/service/organization/membership/<uuid>/delete/`            |                                               path_params `uuid`                                                | The organization membership's unique identifier. Removes a user from an organization.                                                                                                                                                                 |
| `/modules/calendly/service/scheduled/events/<uuid>/invitees/`                 |                path_params `uuid`  query_params `count, page_token, sort, status, invitee_email`                | The scheduled event's unique identifier. Returns a list of Invitees for an event.                                                                                                                                                                     |
| `/modules/calendly/service/scheduled/events/list/`                            | query_params `organization/user, count, page_token, sort, status, max_start_time, min_start_ime, invitee_email` | The uri specified to the organization/user. Pass organization parameter to return events for that organization (requires admin/owner privilege). Pass user parameter to return events for a specific User. Returns a list of Events.                  |
| `/modules/calendly/service/scheduled/events/<uuid>`                           |                                               path_params `uuid`                                                | The scheduled event's unique identifier. Returns information about a specified scheduled Event.                                                                                                                                                       |
| `/modules/calendly/service/scheduled/events/<uuid>/cancellation/`             |                                path_params `uuid` body_params(optional) `reason`                                | Cancels specified event and returns cancelled event's information.                                                                                                                                                                                    |
| `/modules/calendly/service/invitee-no-show/`                                  |                                           body_params `invitee(uri)`                                            | The scheduled event's uri specified to the invitee. Marks an Invitee as a No Show and returns the details of that invitee.                                                                                                                            |
| `/modules/calendly/service/invitee-no-show/<uuid>/`                           |                                               path_params `uuid`                                                | Unique identifier for the associated Invitee that was marked as no-show. Returns information about a specified Invitee No Show.                                                                                                                       |
| `/modules/calendly/service/invitee-no-show/<uuid>/delete/`                    |                                               path_params `uuid`                                                | Unique identifier for the associated Invitee that was marked as no-show. Undoes marking an Invitee as a No Show.Return No content.                                                                                                                    |
| `/modules/calendly/service/webhook/subscription/`                             |                    body_params `url, events(array), organization, user, scope, signing_key`                     | The URL where you want to receive POST requests for events you are subscribed to. Creates a Webhook Subscription for an Organization or User. Returns subscribed webhook information.                                                                 |
| `/modules/calendly/service/webhook/subscriptions/list/ `                      |             query_params `organization(required), scope(required), user, count, page_token, sort `              | The unique reference to the organization that results should be filtered by organization. Returns a list of Webhook Subscriptions for a specified Organization or User.                                                                               |
| `/modules/calendly/service/webhook/subscription/<webhook_uuid>/`              |                                           path_params `webhook_uuid`                                            | unique identifier for the subscribed webhook. Get a specified Webhook Subscription.                                                                                                                                                                   |
| `/modules/calendly/service/webhook/subscription/<webhook_uuid>/delete/ `      |                                           path_params `webhook_uuid`                                            | unique identifier for the subscribed webhook. Deletes a Webhook Subscription. Returns No content.                                                                                                                                                     |
| `/modules/calendly/service/webhook/`                                          |                                                        -                                                        | This url will be used while creating a webhook. The function will be called every time user schedules, cancel or reschedule an event.                                                                                                                 |

### Subscription Object
webhooks with the v2 API, can be used to receive real-time Calendly meeting data at a specified URL, when an event is scheduled or canceled. 
The organization subscription scope triggers the webhook for all subscribed events within the organization.

 ```java
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

## Module Specifications
Here is the [Module Specification Document](https://docs.google.com/document/d/1LY9VQ7Pj6Riheg64OKDBM3j2IVaOdWE5_o8cnAFsC5I/edit?usp=sharing), which provides more information about the module's actual intentions.

### Postman Collection for Module APi Endpoints
Here is a collection of all the api endpoints for the module.
[Calendly Postman Collection](https://drive.google.com/file/d/1MAxP1Q9oztMpOc2Xg3P-lOKVOcmNI3Y_/view?usp=share_link)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)