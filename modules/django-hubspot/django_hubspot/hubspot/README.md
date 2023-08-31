##  Django Hubspot backend configuration and information

## Module description

Hubspot API includes a full set of features for creating and managing products, line items, notes,
meetings and task, deal, contacts and companies. you can access all the capabilities at [hubspot](https://developers.hubspot.com/docs/api).

The following are the scope features for this module:

- List and add companies
- Manage contacts: add and list
- Handle deals: add, remove, and list
- Create and delete line items
- List available line items
- Access owner list
- Manage products: create, remove, and list
- List available products
- Email operations: list with and without associations, create, and remove
- Meetings and tasks: list, create, and remove
- Notes: list, create, and remove
- Receive Webhook data for triggered events

## Features

- [ ] This module includes migrations.
- [x] This module includes environment variables.
- [x] This module requires manual configurations.
- [ ] This module can be configured with module options.

## Environment variables

```dotenv
HUBSPOT_BASE_URL="https://api.hubapi.com/"
HUBSPOT_GRANT_TYPE="authorization_code",
HUBSPOT_REDIRECT_URL="your_redirect_url", 
HUBSPOT_CLIENT_ID="your_app_client_id",
HUBSPOT_CLIENT_SECRET="your_app_client_secret"
```

## 3rd party setup

`Create Hubspot Account`
Follow these steps to create a required Hubspot account:

- SignIn to the [HubSpot](https://www.hubspot.com/).
- Create a [Developer Account](https://developers.hubspot.com/) on HubSpot.
- You will be asked to complete a few steps by entering your details.
- Once the account is created you will be redirected to the app creation page.
- Add the App Name and Description and click the `Auth` tab.
- Copy the `Client ID` and `Client Secret` and `Install URL (OAuth)`, save them for later use.
- Add the redirect url and select all the related scopes for your app.
- Click `Save changes` button to create your app.

![Hubspot](https://user-images.githubusercontent.com/76822297/227908790-6b9cfd19-7bb9-41f1-a98e-91e106fca2f4.png)

`Create Webhook Subscription`
The Webhooks API allows you to subscribe to events happening in a HubSpot account with your integration installed. Rather than making an API call when an event happens in a connected account, HubSpot can send an HTTP request to an endpoint you configure.
Create a webhook for your app by following these steps:

- Login to your [Developer Account](https://developers.hubspot.com/).
- Click on `Webhook` tab on the left sidebar of the page. Add the webhook url as `Target Url` for your webhook. 
HubSpot will send a JSON payload to this URL with details about events when they trigger.
- Create subscription by clicking  `Create subscription` button on top-right corner of the page. 

![Webhook](https://user-images.githubusercontent.com/76822297/227908883-60404885-2c84-4aa4-a789-8130cbc0e7c0.png)

## Dependencies

No Dependencies used.


## API details

| Api Name                                                                                      |                                                                    Params                                                                    | Description                                                                                                                            |
|-----------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------:|----------------------------------------------------------------------------------------------------------------------------------------|
| `/modules/hubspot/service/access/token/`  `POST`                                              |                                                             body_params `{code}`                                                             | This will return an object containing the `refresh_token` and `access_token`. All api calls will be made using this `access_token`.    |
| `/modules/hubspot/service/deals/list/`  `GET`                                                 | query_params(optional)`{limit(int32), after(string), properties(array), propertiesWithHistory(array), associations(array), archived(bool)}`  | The deals endpoint retrieves all deal data from HubSpot.                                                                               |
| `/modules/hubspot/service/deals/create/`  `POST`                                              |                         body_params `{amount, closedate, dealname, hubspot_owner_id, pipeline, dealstage, content}`                          | Create a deal with the given properties and return a copy of the object, including the ID                                              |
| `/modules/hubspot/service/{id}/deals/remove/`  `DELETE`                                       |                                                              path_params `{id}`                                                              | Takes object containing `id` of the deal going to be deleted. Moves an Object identified by `id` to the recycling bin.                 |
| `/modules/hubspot/service/{id}/deals/single/`  `GET`                                          |                                                              path_params `{id}`                                                              | Takes object containing `id` of the deal going to be retrieved.                                                                        |
| `/modules/hubspot/service/tickets/create/`  `POST`                                            |                              body_params`{amount, closedate, dealname, hubspot_owner_id, pipeline, dealstage}`                               | Create a ticket with the given properties and return a copy of the object, including the ID                                            |
| `/modules/hubspot/service/tickets/list/`  `GET`                                               | query_params(optional) `{limit(int32), after(string), properties(array), propertiesWithHistory(array), associations(array), archived(bool)}` | The tickets endpoint retrieves all tickets data from HubSpot.                                                                          |
| `/modules/hubspot/service/{id}/tickets/single/` `GET`                                         |                                                              path_params `{id}`                                                              | Takes object containing `id` of the ticket going to be retrieved.                                                                      |
| `/modules/hubspot/service/{id}/tickets/remove/`  `DELETE`                                     |                                                              path_params `{id}`                                                              | Takes object containing `id` of the ticket going to be deleted. Moves an Object identified by `id` to the recycling bin.               |
| `modules/hubspot/service/{id}/ticket/associations/{toObjectType}/{toObjectId}/create/`  `PUT` |                  path_params `{ticketId, toObjectType, toObjectId}` body_params `{associationCategory, associationTypeId}`                   | Associate a ticket with others CRM objects.                                                                                            |
| `/modules/hubspot/service/{id}/ticket/associations/{toObjectType}/list/`  `GET`               |                                                    path_params `{ticketId, toObjectType}`                                                    | Retrieve a ticket associated with other CRM objects.                                                                                   |
| `/modules/hubspot/service/{id}/contact/deals/list/`  `GET`                                    |                               path_params `{contactId}` query_params(optional) `{limit(int32), after(string)}`                               | Retrieve a contact associated with deals.                                                                                              |
| `/modules/hubspot/service/{id}/meeting/contacts/list/`  `GET`                                 |                              path_params `{meetingId}`  query_params(optional) `{limit(int32), after(string)}`                               | Retrieve a meeting associated with contacts.                                                                                           |
| `/modules/hubspot/service/webhook/`  `POST`                                                   |                                                                      -                                                                       | This url will be used wile creating the webhook for the app. see [Webhook Subscription](#creating-webhook-subscription) details above. |
| `/modules/hubspot/service/events/create/` `POST`                                              |                                                       [Event Payload](#event-payload)                                                        | To create an event                                                                                                                     |

#### Event Payload
Here is the payload required to create an event on hubspot.

```javascript
{
        eventName: "Title for the evnt"
        eventType: "Describes what type of event this is. For example: WEBINAR, CONFERENCE, WORKSHOP"
        startDateTime: "Event starting time and date. For example: 2023-01-05T14:44:08.372Z"
        endDateTime: "Event ending time and date. or example: 2023-01-05T15:44:08.372Z"
        eventOrganizer: "Event Creator or organizer name"
        eventDescription: "Description for the event"
        eventUrl: "A URL in the external event application where the marketing event can be managed."
        eventCancelled: "Indicates if the event has been cancelled. Defaults to false"
        externalAccountId: "The accountId that is associated with this event in the external event application."
        externalEventId: "The id of the event in the external event application."
}
```
