# Appointment local
Appointment local module will enable new appointments to be created and saved locally on a database

## Features

### Create appointment
User can create an appointment

### Delete appointment
User can delete an appointment

### View list of appointments
user can view list of appointments

### Search an appointment
User can search appointments

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

* **getAllAppointments**
`getAppointment` method returns all the appointment created for the user.

* **deleteAppointment**
`deleteAppointment` Takes the `id` of the appointment and removes it deletes it form the calendar.


## Manual Setup

If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import Appointment from "@modules/appointment-local";
const { title, navigator } = Appointment;
```

2. You can call module directly by importing navigator without going through any routing. And pass the params to the module.

```javascript
import { modules } from '@modules';
const Appointment = modules[module_index].value.navigator;  //module_index : position of the module in modules folder
<Appointment  />
```

## Global Configs
### Update api url in options/options.js

Update the options/options.js file with your app's backend url. For example, if your app is called `my-app` and has a url of `https://my-app.botics.co`, your options.js file should look like this: 

```
export const globalOptions = {
    ...
  url: "https://my-app.botics.co",
   ...
}
```

## Module Specifications
Here is the [Module Specification Document](https://docs.google.com/document/d/1oOjHadHw4fUA9JxfIykAqEhAeokcCRqgDkcQjyUkUJk/edit?usp=sharing), which provides more information about the module's actual intentions.

## Postman Collection for Module APi Endpoints
Here is a collection of all the api endpoints for the module.
[Appointment Local Postman Collection](https://drive.google.com/file/d/19x0jpCL-JeAa-eFYrKuc5gRavu662-w-/view?usp=share_link)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
