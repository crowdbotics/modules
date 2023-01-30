## Crowdbotics HubSpot Component - Backend

This module contains all needed resources to get the HubSpot component for React
Native mobile client.


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


## Creating Webhook Subscription
The Webhooks API allows you to subscribe to events happening in a HubSpot account with your integration installed. Rather than making an API call when an event happens in a connected account, HubSpot can send an HTTP request to an endpoint you configure.
Create a webhook for your app by following these steps:

1. Login to your [developer account](https://developers.hubspot.com/).
2. Click on `Webhook` tab on the left sidebar of the page. Add the webhook url as `Target Url` for your webhook. 
HubSpot will send a JSON payload to this URL with details about events when they trigger.
3. Create subscription by clicking  `Create subscription` button on top-right corner of the page. 


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

| Api Name                             | Params |Description                 |
| -------------------------------------|:------------:|-------------------|
| `/modules/hubspot/service/access/token/` | `token_payload` | This will return an object containing the `refresh_token` and `access_token`. All api calls will be made using this `access_token`.|
| `/modules/hubspot/service/deals/list/` | - | The deals endpoint retrieves all deal data from HubSpot.|
| `/modules/hubspot/service/deals/create/` | `{amount, closedate, dealname, hubspot_owner_id, pipeline, dealstage, content}` | Create a deal with the given properties and return a copy of the object, including the ID|
| `/modules/hubspot/service/deals/remove/` | `{id}` | Takes object containing `id` of the deal going to be deleted. Moves an Object identified by `id` to the recycling bin.|
| `/modules/hubspot/service/deals/single/` | `{id}` | Takes object containing `id` of the deal going to be retrieved.|
| `/modules/hubspot/service/tickets/create/` | `{amount, closedate, dealname, hubspot_owner_id, pipeline, dealstage}` | Create a ticket with the given properties and return a copy of the object, including the ID|
| `/modules/hubspot/service/tickets/list/` | - | The tickets endpoint retrieves all tickets data from HubSpot.|
| `/modules/hubspot/service/tickets/single/` | `{id}` | Takes object containing `id` of the ticket going to be retrieved.|
| `/modules/hubspot/service/tickets/remove/` | `{id}` | Takes object containing `id` of the ticket going to be deleted. Moves an Object identified by `id` to the recycling bin.|
| `/modules/hubspot/service/ticket/associations/create/` | `{ticketId, toObjectType, toObjectId,param[{associationCategory, associationTypeId}]}` | Associate a ticket with others CRM objects.|
| `/modules/hubspot/service/ticket/associations/list/` | `{ticketId, toObjectType}` | Reterive a ticket associated with other CRM objects.|
| `/modules/hubspot/service/contact/deals/list/` | `{contactId}` | Retrieve a contact associated with deals.|
| `/modules/hubspot/service/meeting/contacts/list/` | `{meetingId}` | Retrieve a meeting associated with contacts.|
| `/modules/hubspot/service/webhook/` | - | This url will be used wile creating the webhook for the app. see [Webhook Subscription](#creating-webhook-subscription) details above.|
