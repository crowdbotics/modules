## Crowdbotics BLACKBAUD Module - Backend

This module provides access to data and domain-level capabilities within Blackbaud solutions, using a consistent RESTful experience and authorization mechanism. Blackbaud SKY enables your entire organization to be on one cloud software solution.


## Scope Features
The following are the key features in scope for this module.
1. Ability to authorize the code for access token.
2. Ability to retrieve the access token
3. Ability to retrieve the list of events.
4. Ability to retrieve the list of consent channels.
5. Ability to retrieve the list of constituents list.



## BLACKBAUD Setup
In order to configure the module, the first thing you should do is to create an app on Hubspot. Here's the steps detailing that process:



## Installation
1. In `.env` file add the following things:

```py
BLACKBAUD_CLIENT_ID=""
BLACKBAUD_CLIENT_SECRET=""
BLACKBAUD_REDIRECT_URL=""
BLACKBAUD_BASE_URL="https://api.sky.blackbaud.com"
BB_API_SUBSCRIPTION_KEY=""
```

2. Run the following commands to get started:

```
python manage.py migrate
python manage.py runserver
```

## Api Table
List of api's endpoints with params needed for these apis.

| Api Name                            |     Params      | Description                                                                                                                         |
| ------------------------------------|:---------------:|-------------------------------------------------------------------------------------------------------------------------------------|
| `/modules/blackbaud-sky/service/access/token/` | `token_payload` | This will return an object containing the `refresh_token` and `access_token`. All api calls will be made using this `access_token`. |
| `/modules/blackbaud-sky/service/consent/channels/` |       ``        | This will return the channels details containing all its objects.                                                                   |                                                                                                  |
| `/modules/blackbaud-sky/service/constituents/list/` |       ``        | This will return an constituents list containing all its objects.                                                                   |
| `/modules/blackbaud-sky/service/events/list/ ` |       ``        | This will return an event list containing all its objects.                                                                                                     |

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)