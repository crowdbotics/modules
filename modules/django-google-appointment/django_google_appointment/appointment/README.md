## Crowdbotics Google Appointment Component - Backend
This module contains all needed resources to get the Google Appointment component for React
Native mobile client.

### How to get Credentials file  
In [Google Cloud Console](https://console.cloud.google.com/) choose your project or start new one.

In the navigation menu choose "APIs & Services" enable new APIs and then look up "calendar API", enable the API

Under "APIs & Services">"Credentials", select "Create Credentials" and click on "service account", fill in the desired name, and continue. Set role as owner(or other desired)(owner gives full access you you might want to switch to something less powerful). Click "Done"

This will redirect you to the credentials page. Under the "Service accounts" click on the desired account(this will redirect you to the IAM & Admin panel) Under the tab "Keys" click "ADD KEY" and select json, this will download a json file to your computer.

Add that file into project directory and set the file path to "CREDENTIAL_FILE_PATH" variable in .env 

### Installation
1. Install the Google client libraries for Python:

```py
pip install google-api-python-client google-auth-httplib2 google-auth-oauthlib
```

2. Run the following commands to get started:
```
python manage.py migrate
python manage.py runserver
```

## Api Table
List of api's endpoints with params needed for these apis.
| Api Name                             |                         Params                         | Description     |
| -------------------------------------|:------------------------------------------------------:|-----------------|
| `/modules/appointment/service/appointment/list/` | query_params(optional) `{max_results, order_by, time_max, time_min, page_token}` | Returns a list of the events created of the calendar according to the specified queries if are provided. |
| `/modules/appointment/service/appointment/create/` | [Create Event Object](#create-event-object) | Creates a new appointment on the calendar and returns an object containing the created event detail.|
| `/modules/appointment/service/{event_id}/appointment/single/` | - | Retrieves a single event from the calendar.|
| `/modules/appointment/service/{event_id}/appointment/remove/` | - | Deletes a single event form the calendar.|


### Create Event Object
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
