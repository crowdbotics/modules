# Crowdbotics Google Appointment Component - Backend
This module contains all needed resources to get the Google Appointment component for React
Native mobile client. The module will enable new appointments to be created and synced with Google calendar. User will be able to create, delete, and sync appointments/events from the Google Calendar.

## Features
1. Ability to add appointment
2. Ability deletes an appointment
3. Ability to retrieve a single appointment
4. Ability to sync Appointments with Google Calendar
5. Ability to list the appointment attendees and organizer



## Required Dependencies/Packages

* **google-api-python-client**
`google-api-python-client` The Google API Client Library for Python is designed for Python client-application developers. It offers simple, flexible access to many Google APIs.

* **google-auth-httplib2**
`google-auth-httplib2` This library simplifies using Google's various server-to-server authentication mechanisms to access Google APIs.

* **google-auth-oauthlib**
`google-auth-oauthlib` Google authentication library for Python. This library provides the ability to authenticate to Google APIs using various methods. It also provides integration with several HTTP libraries.

Install the packages by running the command:
```console
pip install google-api-python-client google-auth-httplib2 google-auth-oauthlib
```

## How to get Credentials file  
1. In [Google Cloud Console](https://console.cloud.google.com/) choose your project or start new one.

2. In the navigation menu choose "APIs & Services" enable new APIs and then look up "calendar API", enable the API

3. Under "APIs & Services">"Credentials", select "Create Credentials" and click on "service account", fill in the desired name, and continue. Set role as owner(or other desired)(owner gives full access you you might want to switch to something less powerful). Click "Done"
This will redirect you to the credentials page. Under the "Service accounts" click on the desired account(this will redirect you to the IAM & Admin panel).
4. Under the tab "Keys" click "ADD KEY" and select json, this will download a json file to your computer.

5. Add that file into project directory and set the file path to "CREDENTIAL_FILE_PATH" variable in .env 

![service_account](https://user-images.githubusercontent.com/76822297/227890333-1767d60a-696e-40f4-b33e-7ef480593902.png)


## Installation
1. In `.env` file add the credentials file:

```py
CREDENTIALS_FILE_PATH = 'path to your credentials file'
```

2. Install the Google client libraries for Python:

```py
pip install google-api-python-client google-auth-httplib2 google-auth-oauthlib
```

3. Run the following commands to get started:
```
python manage.py migrate
python manage.py runserver
```

## Api Table
List of api's endpoints with params needed for these apis.
| Api Name                             |                         Params                         | Description     |
| -------------------------------------|:------------------------------------------------------:|-----------------|
| `/modules/appointment/service/appointment/list/` | query_params(optional) `{max_results, order_by, time_max, time_min, page_token, single_events, show_deleted}` | Returns a list of the events created of the calendar according to the specified queries if are provided. |
| `/modules/appointment/service/appointment/create/` | [Create Event Object](#create-event-object) | Creates a new appointment on the calendar and returns an object containing the created event detail.|
| `/modules/appointment/service/{event_id}/appointment/single/` | - | Retrieves a single event from the calendar.|
| `/modules/appointment/service/{event_id}/appointment/remove/` | - | Deletes a single event form the calendar.|
| `/modules/appointment/service/appointment/sync/` | - | Sync event form the calendar.|
| `/modules/appointment/service/appointment/synced/list/ ` | - | Returns a list of Synced event of the calendar.|


## Create Event Object
Object containing the list of parameters for creating a new event on the calendar.

```javascript
{
      summary: "",                     // Title for the appointment/event
      description: "",           // Description or detail of the event
      location: "",                 // Location where event will be held
      start: {                            // Starting time of the event
        dateTime: ""
      },
      end: {                              // Ending time of the event
        dateTime: ""
      },
      attendees: [                        // List of emails of the people going to attend the event
       {email: "lpage@example.com"},
       {email: "sbrin@example.com"},
      ],
      conferenceData: {                   // The conference-related information, such as details of a Google Meet conference.
        createRequest: {                  // To create new conference details use the createRequest field. To persist your changes,
          conferenceSolutionKey: {        // remember to set the conferenceDataVersion request parameter to 1.
            type: "hangoutsMeet"
          },
          requestId: "any_random_id"
        }
      }
    }
```

## Module Specifications
Here is the [Module Specification Document](https://docs.google.com/document/d/1hZZU-EBnMTdZaUoG0onDHnq3pB4l6ULDK8BKkUV9Pi8/edit?usp=sharing), which provides more information about the module's actual intentions.

## Postman Collection for Module APi Endpoints
Here is a collection of all the api endpoints for the module.
[Django Google Appointment Postman Collection](https://drive.google.com/file/d/1o9ZyKMFsn_a_IPjIO2dVRBovP_7wJxa-/view?usp=share_link)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)