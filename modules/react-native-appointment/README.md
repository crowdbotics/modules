# Appointment
Appointment is a React Native based module. This module will enable new appointments to be created and synced with Google calendar. 

## Features

### Sync with google calendar
Appointments are synced with Google Calendar.
### Create appointment
User can create an appointment

###  Delete appointment
User can delete an appointment

### View list of appointments
user can view list of appointments

### Search an appointment
User can search appointments

### List all appointment attendees
List of the people who will show up/attend the meeting/event including the meeting/event organizer

## Required Dependencies
All the required packages are given in the `package.json` file. Make sure all the dependencies are installed before using this module. 
Keep the below packages in project's package.json file.
```
    "react-native-calendar-strip": "2.2.5",
    "react-native-dropdown-picker": "5.3.0",
    "@react-navigation/native-stack": "6.5.0",
    "react-native-screens": "3.10.2",
    "react-native-calendars": "1.1282.0",
    "moment": "2.29.3"
    "react-native-pager-view": "5.4.15",
    "react-native-tab-view": "3.1.1",
    "react-native-calendar-strip": "2.2.5",
    "react-native-calendars": "1.1282.0",
    "@react-native-google-signin/google-signin": "7.2.2"
```
RUn the command to install dependencies:
  ```
  yarn install
  ```

## API Calling Methods
All the api calling methods reside in `api/index.js` file.

* **createAppointment**
`createAppointment` method takes an object containing details about the appointment. Creates new appointment against the provided data.

* **getAppointmentByDate**
`getAppointmentByDate` method takes object containing `maxResults` and `datetime`. Returns the appointment on created for the provided date.

* **getAllAppointments**
`getAllAppointments` method returns all the appointment created for the user.

* **deleteAppointment**
`deleteAppointment` Takes the `id` of the appointment and removes it deletes it form the calendar.


## Update webClientId and androidClientId.

Login in to your Google Cloud Console get and replace the webClientId, iosClientId and androidClientId keys In the options file.

```javascript

const androidClientId = "";
const webClientId = "";
const iosClientId = ""
```




## Module Configurations
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


## Module Specifications
Here is the [Module Specification Document](https://docs.google.com/document/d/1hZZU-EBnMTdZaUoG0onDHnq3pB4l6ULDK8BKkUV9Pi8/edit?usp=sharing), which provides more information about the module's actual intentions.

## Postman Collection for Module APi Endpoints
Here is a collection of all the api endpoints for the module.
[Django Google Appointment Postman Collection](https://drive.google.com/file/d/1o9ZyKMFsn_a_IPjIO2dVRBovP_7wJxa-/view?usp=share_link)


## Module Preview Video
https://user-images.githubusercontent.com/76822297/176897194-9d6d20f9-9379-4f63-8d43-bb289321c176.mp4

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)


