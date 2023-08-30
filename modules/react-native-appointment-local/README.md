# Appointment local

Appointment local module will enable new appointments to be created and saved locally on a database.

Features included:
- Create appointment - User can create an appointment
- Delete appointment - User can delete an appointment
- View list of appointments - user can view list of appointments
- Search an appointment - User can search appointments

## Features

- [ ] This module includes environment variables.
- [ ] This module requires manual configurations.
- [x] This module can be configured with module options.
- [ ] This module requires manual Android setup.
- [ ] This module requires manual iOS setup.



## Module Options

### Global Configs

Update the options/options.js file with your app's backend url. For example, if your app is called `my-app` and has a url of `https://my-app.botics.co`, your options.js file should look like this:

```
export const globalOptions = {
    ...
  url: "https://my-app.botics.co",
   ...
}
```

## API Details

All the api calling methods reside in `store/index.js` file.

* **createAppointment**
`createAppointment` method takes an object containing details about the appointment. Creates new appointment against the provided data.

* **getAllAppointments**
`getAppointment` method returns all the appointment created for the user.

* **deleteAppointment**
`deleteAppointment` Takes the `id` of the appointment and removes it deletes it form the calendar.

## Module Specifications

Here is the [Module Specification Document](https://docs.google.com/document/d/1oOjHadHw4fUA9JxfIykAqEhAeokcCRqgDkcQjyUkUJk/edit?usp=sharing), which provides more information about the module's features.

## Postman Collection for Module APi Endpoints

Here is a collection of all the api endpoints for the module. [Appointment Local Postman Collection](https://drive.google.com/file/d/19x0jpCL-JeAa-eFYrKuc5gRavu662-w-/view?usp=share_link)
