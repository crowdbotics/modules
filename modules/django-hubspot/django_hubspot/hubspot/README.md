## Crowdbotics HubSpot Component - Backend

This module contains all needed resources to get the HubSpot component for React
Native mobile client.

## Features
1. List companies and add new companies
2. Add contacts and get the list of the contacts
3. Add/remove deals
4. Get the list of the deals
5. Create and delete line_items
6. Get the list of available line_items
7. Get the owners to list
8. Create/Remove a product or group of products
9. Get the list of the available products
10. Get the list of emails with associations and without associations
11. Create/remove emails with associations and without associations
12. Get the list of meetings and tasks
13. Create/remove meetings and tasks
14. Get the list of Notes
15. Create/remove Notes
16. Receive Webhook data about the triggered events


## HubSpot Setup
In order to configure the module, the first thing you should do is to create an app on Hubspot. Here's the steps detailing that process:

1. SignIn to the [HubSpot](https://www.hubspot.com/).
2. Create a [developer account](https://developers.hubspot.com/) on HubSpot.
3. You will be asked to complete a few steps by entering your details.
4. Once the account is created you will be redirected to the app creation page.
5. Add the App Name and Description and click the `Auth` tab.
6. Copy the `Client ID` and `Client Secret` and `Install URL (OAuth)`, save them for later use.
7. Add the redirect url and select all the related scopes for your app.
8. Click `Save changes` button to create your app.

![hubspot](https://user-images.githubusercontent.com/76822297/227908790-6b9cfd19-7bb9-41f1-a98e-91e106fca2f4.png)

## Creating Webhook Subscription
The Webhooks API allows you to subscribe to events happening in a HubSpot account with your integration installed. Rather than making an API call when an event happens in a connected account, HubSpot can send an HTTP request to an endpoint you configure.
Create a webhook for your app by following these steps:

1. Login to your [developer account](https://developers.hubspot.com/).
2. Click on `Webhook` tab on the left sidebar of the page. Add the webhook url as `Target Url` for your webhook. 
HubSpot will send a JSON payload to this URL with details about events when they trigger.
3. Create subscription by clicking  `Create subscription` button on top-right corner of the page. 

![webhook](https://user-images.githubusercontent.com/76822297/227908883-60404885-2c84-4aa4-a789-8130cbc0e7c0.png)


## Installation
1. In `.env` file add the following things:

```py
HUBSPOT_BASE_URL='https://api.hubapi.com/'
HUBSPOT_GRANT_TYPE="authorization_code",
HUBSPOT_REDIRECT_URL= 'your_redirect_url', 
HUBSPOT_CLIENT_ID='your_app_client_id',
HUBSPOT_CLIENT_SECRET='your_app_client_secret',
```

2. Run the following commands to get started:

```
python manage.py migrate
python manage.py runserver
```

## Api Table
List of api's endpoints with params needed for these apis.

| Api Name                                                                               |                                                                    Params                                                                    | Description                                                                                                                            |
|----------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------:|----------------------------------------------------------------------------------------------------------------------------------------|
| `/modules/hubspot/service/access/token/`                                               |                                                             body_params `{code}`                                                             | This will return an object containing the `refresh_token` and `access_token`. All api calls will be made using this `access_token`.    |
| `/modules/hubspot/service/deals/list/`                                                 | query_params(optional)`{limit(int32), after(string), properties(array), propertiesWithHistory(array), associations(array), archived(bool)}`  | The deals endpoint retrieves all deal data from HubSpot.                                                                               |
| `/modules/hubspot/service/deals/create/`                                               |                         body_params `{amount, closedate, dealname, hubspot_owner_id, pipeline, dealstage, content}`                          | Create a deal with the given properties and return a copy of the object, including the ID                                              |
| `/modules/hubspot/service/{id}/deals/remove/`                                          |                                                              path_params `{id}`                                                              | Takes object containing `id` of the deal going to be deleted. Moves an Object identified by `id` to the recycling bin.                 |
| `/modules/hubspot/service/{id}/deals/single/`                                          |                                                              path_params `{id}`                                                              | Takes object containing `id` of the deal going to be retrieved.                                                                        |
| `/modules/hubspot/service/tickets/create/`                                             |                              body_params`{amount, closedate, dealname, hubspot_owner_id, pipeline, dealstage}`                               | Create a ticket with the given properties and return a copy of the object, including the ID                                            |
| `/modules/hubspot/service/tickets/list/`                                               | query_params(optional) `{limit(int32), after(string), properties(array), propertiesWithHistory(array), associations(array), archived(bool)}` | The tickets endpoint retrieves all tickets data from HubSpot.                                                                          |
| `/modules/hubspot/service/{id}/tickets/single/`                                        |                                                              path_params `{id}`                                                              | Takes object containing `id` of the ticket going to be retrieved.                                                                      |
| `/modules/hubspot/service/{id}/tickets/remove/`                                        |                                                              path_params `{id}`                                                              | Takes object containing `id` of the ticket going to be deleted. Moves an Object identified by `id` to the recycling bin.               |
| `modules/hubspot/service/{id}/ticket/associations/{toObjectType}/{toObjectId}/create/` |                  path_params `{ticketId, toObjectType, toObjectId}` body_params `{associationCategory, associationTypeId}`                   | Associate a ticket with others CRM objects.                                                                                            |
| `/modules/hubspot/service/{id}/ticket/associations/{toObjectType}/list/`               |                                                    path_params `{ticketId, toObjectType}`                                                    | Retrieve a ticket associated with other CRM objects.                                                                                   |
| `/modules/hubspot/service/{id}/contact/deals/list/`                                    |                               path_params `{contactId}` query_params(optional) `{limit(int32), after(string)}`                               | Retrieve a contact associated with deals.                                                                                              |
| `/modules/hubspot/service/{id}/meeting/contacts/list/`                                 |                              path_params `{meetingId}`  query_params(optional) `{limit(int32), after(string)}`                               | Retrieve a meeting associated with contacts.                                                                                           |
| `/modules/hubspot/service/webhook/`                                                    |                                                                      -                                                                       | This url will be used wile creating the webhook for the app. see [Webhook Subscription](#creating-webhook-subscription) details above. |
| `/modules/hubspot/service/events/create/`                                              |                                body_params `{eventName, eventOrganizer, externalAccountId, externalEventId}`                                 | To create an event                                                                                                                     |

### Create Event Payload
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

## Module Specifications
Here is the [Module Specification Document](https://docs.google.com/document/d/1JSVmoi1enRshXPicdLd5ONom1FAydQOqWuc6M-MUiak/edit?usp=sharing), which provides more information about the module's actual intentions.

## Postman Collection for Module APi Endpoints
Here is a collection of all the api endpoints for the module.
[HubSpot Postman Collection](https://drive.google.com/file/d/1nEhSDEP1dX7CkH_o4C7NBZDcPrhwGli5/view?usp=share_link)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
