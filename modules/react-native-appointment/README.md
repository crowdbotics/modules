# Appointment
Appointment is a React Native based module. This module will enable new appointments to be created and synced with Google calendar. 

## Get Project Credentials
To run this project , you need the following prerequisites:
1. Create A [Google Cloud project](https://developers.google.com/workspace/guides/create-project).
2. In the Google Cloud console, enable the Google Calendar API.
3. Get [OAuth client ID for Android](https://developers.google.com/workspace/guides/create-credentials#android).
4. Get [OAuth client ID for Web](https://developers.google.com/workspace/guides/create-credentials#web-application).
5. Get [OAuth client ID for IOS](https://developers.google.com/workspace/guides/create-credentials#ios).


## Update webClientId and androidClientId.
Replace the webClientId, iosClientId and androidClientId keys In the options file with the that you have generated ith e previous steps.

```javascript

const androidClientId = "";
const webClientId = "";
const iosClientId = ""
```

### IOS 

Add the following schemes to your info.plist

```
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleTypeRole</key>
        <string>Editor</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>***Your bundle ID***<</string>
        </array>
    </dict>
    <dict>
        <key>CFBundleTypeRole</key>
        <string>Editor</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>***Your iosClientId ID***</string>
        </array>
    </dict>
</array>
```


## Manual Setup

If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import Appointment from "@modules/appointment";
const { title, navigator } = Appointment;
```

2. You can call module directly by importing navigator without going through any routing. And pass the params to the module.

```javascript
import { modules } from '@modules';
const Appointment = modules[module_index].value.navigator;  //module_index : position of the module in modules folder
<Appointment  />
```

## Features

# Sync with google calendar
Appointments are synced with Google Calendar.
# Create appointment
User can create an appointment

# Delete appointment
User can delete an appointment

# View list of appointments
user can view list of appointments

# Seach an appointment
User can search appointments


# List all appointment attendees
List of the people who will show up/attend the meeting/event including the meeting/event organizer



https://user-images.githubusercontent.com/76822297/176897194-9d6d20f9-9379-4f63-8d43-bb289321c176.mp4

