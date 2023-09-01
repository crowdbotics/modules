# Google Appointment backend configuration and information

## Module description

Google Appointment component for React
Native mobile client. The module will enable new appointments to be created and synced with Google calendar.
User will be able to create, delete, and sync appointments/events from the Google Calendar.

- Ability to add appointment
- Ability deletes an appointment
- Ability to retrieve a single appointment
- Ability to sync Appointments with Google Calendar
- Ability to list the appointment attendees and organizer

## Features

- [x] This module includes migrations.
- [x] This module includes environment variables.
- [x] This module requires manual configurations.
- [ ] This module can be configured with module options.

## Environment variables

```dotenv
CREDENTIAL_FILE_PATH="<path/to/file>"
```

## 3rd party setup

1. In [Google Cloud Console](https://console.cloud.google.com/) choose your project or start new one.

2. In the navigation menu choose `APIs & Services` enable new APIs and then look up `calendar API`, enable the API

3. Under `APIs & Services >> Credentials`, select `Create Credentials` and click on `service account`, fill in the
   desired name, and continue. Set role as owner(or other desired)(owner gives full access you might want to switch to
   something less powerful). Click `Done`
   This will redirect you to the credentials page. Under the `Service accounts` click on the desired account(this will
   redirect you to the IAM & Admin panel).
4. Under the tab `Keys` click `ADD KEY` and select json, this will download a json file to your computer.
5. Add that file into project directory and set the file path to `CREDENTIAL_FILE_PATH` variable in .env
6. If configuring through `access_token` then add a custom header `Google-Drive-Authorization` to use the Google Drive.

![service_account](https://user-images.githubusercontent.com/76822297/227890333-1767d60a-696e-40f4-b33e-7ef480593902.png)

## Dependencies

[Google API Client](https://github.com/googleapis/google-api-python-client/blob/main/README.md)\
[httplib2 Google Auth](https://github.com/googleapis/google-auth-library-python-httplib2/blob/main/README.rst)\
[oauthlib Google Auth](https://github.com/googleapis/google-auth-library-python-oauthlib/blob/main/README.rst)

Dependencies used:

- [google-api-python-client](https://pypi.org/project/google-api-python-client/)
- [google-auth-httplib2](https://pypi.org/project/google-auth-httplib2/)
- [google-auth-oauthlib](https://pypi.org/project/google-auth-oauthlib/)

## API details

| Api Name                                                      |                                                    Params                                                     | Description                                                                                              |
|---------------------------------------------------------------|:-------------------------------------------------------------------------------------------------------------:|----------------------------------------------------------------------------------------------------------|
| `/modules/appointment/service/appointment/list/`              | query_params(optional) `{max_results, order_by, time_max, time_min, page_token, single_events, show_deleted}` | Returns a list of the events created of the calendar according to the specified queries if are provided. |
| `/modules/appointment/service/appointment/create/`            |                                         [Event Object](#event-object)                                         | Creates a new appointment on the calendar and returns an object containing the created event detail.     |
| `/modules/appointment/service/{event_id}/appointment/single/` |                                                       -                                                       | Retrieves a single event from the calendar.                                                              |
| `/modules/appointment/service/{event_id}/appointment/remove/` |                                                       -                                                       | Deletes a single event form the calendar.                                                                |
| `/modules/appointment/service/appointment/sync/`              |                                                       -                                                       | Sync event form the calendar.                                                                            |
| `/modules/appointment/service/appointment/synced/list/ `      |                                                       -                                                       | Returns a list of Synced event of the calendar.                                                          |

## Event Object

Object containing the list of parameters for creating a new event on the calendar.

```javascript
{
    summary: "",                     // Title for the appointment/event
        description: "",           // Description or detail of the event
        location: "",                 // Location where event will be held
        start:{                            // Starting time of the event
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

The [Module Specification Document](https://docs.google.com/document/d/1hZZU-EBnMTdZaUoG0onDHnq3pB4l6ULDK8BKkUV9Pi8/edit?usp=sharing),
which provides more information about the module's actual intentions.

## Postman Collection

Here is a collection of all the api endpoints for the module.
[Django Google Appointment Postman Collection](https://drive.google.com/file/d/1o9ZyKMFsn_a_IPjIO2dVRBovP_7wJxa-/view?usp=share_link)