## Crowdbotics Calendly Component - Backend

This module contains all needed resources to get the Calendly component for React
Native mobile client.

 This module is built using [Calendly API v2](https://developer.calendly.com/api-docs), users will be able to retrieve events, sync scheduled meetings, and manage users on [Calendly Dashboard](https://calendly.com/event_types/user/me).
 Automatically receive Calendly data with webhook subscriptions anytime invitees schedule, cancel, or reschedule a meeting.


## Calendy Personal Token
Calendly personal token is a [Bearer Token](https://cloud.google.com/docs/authentication/token-types#:~:text=Bearer%20tokens%20are%20a%20general,JWTs%20are%20all%20bearer%20tokens). The Calendly API v2 uses personal access tokens to authenticate requests. It is necessary to get a personal access tokens to make successful requests to calendly.

1. Log in to [Calendly](https://calendly.com/login). 
2. Click on `Integration` tab on top-right corner of the page.
3. Select `API and Webhooks` in `All integrations` section.
4. Click on `Generate New Token` to get your personal token.


## Installation
Run the following commands to get started:

```
python manage.py migrate
python manage.py runserver
```


## Api Table
List of api's endpoints with params needed for these apis.

| Api Name                                                                                      |                        Params                        | Description                                                                                                                                                                                                                                                            |
|-----------------------------------------------------------------------------------------------|:----------------------------------------------------:|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `/modules/calendly/service/user/details/`                                                     |                          -                           | Returns basic information about your user account.                                                                                                                                                                                                                     |
| `/modules/calendly/service/{uuid}/organization/invite/`                                       |                      `{email}`                       | Returns a list of Organization Invitations that were sent to the organization's members.                                                                                                                                                                               |
| `/modules/calendly/service/scheduled/event/list/`                                             |      query_params `organization, active, count`      | organization's `uri`, `active` property represents if the organization is active or not, and `count` is the number of items will be returned.                                                                                                                          |
| `/modules/calendly/service/{event_uuid}/schedule/event/single/`                               |                          -                           | Returns detail of the specified scheduled event details.                                                                                                                                                                                                               |
| `/modules/calendly/service/event/types/`                                                      |      query_params `organization, active, count`      | Returns all Event Types associated with a specified  organization/user.                                                                                                                                                                                                |
| `/modules/calendly/service/{event_uuid}/single/event/types/`                                  |                          -                           | Returns information about a specified Event Type.                                                                                                                                                                                                                      |
| `/modules/calendly/service/event/type/available-times/ `                                      |   query_params `start_time, end_time, event_type`    | `start_time` Start time of the requested availability range, `end_time` End time of the requested availability range, `event_type` The uri associated with the event type. Returns a list of available times for an event type within a specified date range.          |
| `/modules/calendly/service/user/busy-times/`                                                  |   query_params `start_time, end_time, event_type`    | `start_time` Start time of the requested availability range, `end_time` End time of the requested availability range, `user` The uri associated with the user. Returns an ascending list of user internal and external scheduled events within a specified date range. |
| `/modules/calendly/service/user/availability-schedules/`                                      |                 query_params `user`                  | `user` The uri associated with the user. Returns the availability schedules of the given user.                                                                                                                                                                         |
| `/modules/calendly/service/{availability_schedule_uuid}/user/single/availability-schedules/ ` |                          -                           | This will return the availability schedule detail specified with the given UUID.                                                                                                                                                                                       |
| `/modules/calendly/service/remove/invitees/`                                                  | `{ emails: [ test@example.com, test2@example.com ]}` | Takes object containing array of emails. Removes invitee data from all previously booked events in your organization. **This endpoint requires an [Enterprise]('https://calendly.com/pricing') subscription on calendly.**                                             |
| `/modules/calendly/service/{organization_uuid}/organization/invitations/list/`                |                          -                           | Returns a list of Organization Invitations that were sent to the organization's members.                                                                                                                                                                               |
| `/modules/calendly/service/organization/single/invitation/`                                   |            query_params `uuid, org_uuid`             | `uuid` The organization's unique identifier and `email` The email of the user being invited. Returns invitation details.                                                                                                                                               |
| `/modules/calendly/service/organization/revoke/invitation/`                                   |            query_params `uuid, org_uuid`             | `org_uuid` The organization's unique identifier and `uuid` The organization invitation's unique identifier. Revokes an Organization Invitation to an organization. Once revoked, the invitation link that was sent to the invitee is no longer valid.                  |
| `/modules/calendly/service/organization/membership/list/`                                     |             query_params `organization`              | `organization` The uri specified to the organization. Indicates if the results should be filtered by organization. Returns Organization Memberships for all users belonging to an organization.                                                                        |
| `/modules/calendly/service/{organization_uuid}/organization/membership/`                      |                          -                           | Returns information about a user's Organization Membership                                                                                                                                                                                                             |
| `/modules/calendly/service/{membership_uuid}/organization/remove/membership/`                 |                          -                           | Removes a user from an organization.                                                                                                                                                                                                                                   |
| `/modules/calendly/service/{schedule_event_uuid}/invitee/list/event-schedule/`                |                          -                           | Returns a list of Invitees for an event.                                                                                                                                                                                                                               |
| `/modules/calendly/service/create/invitee-no-show/`                                           |                     `{invitee}`                      | Takes object containing `invitee` The scheduled event's uri specified to the invitee (e.g `https://api.calendly.com/scheduled_events/GBGBDCAADAEDCRZ2/invitees/7c1dbe46-bd84-42e2-9b97-05e2fb379bfe`). Marks an Invitee as a No Show.                                  |
| `/modules/calendly/service/{invitee_uuid}/single/invitee-no-show/`                            |                          -                           | Returns information about a specified Invitee No Show.                                                                                                                                                                                                                 |
| `/modules/calendly/service/{invitee_uuid}/remove/invitee-no-show/`                            |                          -                           | Undoes marking an Invitee as a No Show.                                                                                                                                                                                                                                |
| `/modules/calendly/service/{schedule_event_uuid}/schedule/event/cancel/`                      |                          -                           | Cancels specified event.                                                                                                                                                                                                                                               |
| `/modules/calendly/service/create/webhook/subscription/`                                      |     [subscription_object](#subscription-object)      | Creates a Webhook Subscription for an Organization or User.                                                                                                                                                                                                            |
| `/modules/calendly/service/webhook/subscription/list/`                                        |          query_params `organization, scope`          | `organization` Indicates if the results should be filtered by organization. `scope` Filter the list by organization or user. Get a list of Webhook Subscriptions for a specified Organization or User.                                                                 |
| `/modules/calendly/service/{webhook_uuid}/single/webhook/subscription/`                       |                          -                           | Gets a specified Webhook Subscription.                                                                                                                                                                                                                                 |
| `/modules/calendly/service/{webhook_uuid}/remove/webhook/subscription/ `                      |                          -                           | Deletes a Webhook Subscription.                                                                                                                                                                                                                                        |
| `/modules/calendly/service/webhook/`                                                          |                          -                           | This url will be used in  [subscription_object](#subscription-object) while creating a webhook. The endpoint will be called every time user schedules, cancel or reschedule an event. ***`This should not be a local endpoint`***.                                     |



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
