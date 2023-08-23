# Appointment local

Appointment local will allow user to create and save appointments locally on a database

Features included:
1. Ability to create an appointment
2. Ability to show appointments in the calendar
3. Ability to edit and delete an appointment
4. Ability to remind the user of the appointment
5. Ability to search appointments
6. Ability to create, update, get, and delete an appointment session type
7. Ability to view appointment attendees who will show up/attend the meeting/event including the meeting/event organizer

## Features

- [x] This module includes migrations.
- [ ] This module includes environment variables.
- [ ] This module requires manual configurations.
- [ ] This module can be configured with module options.

## API Details

List of api's endpoints with params needed for these apis.

| Api Name                                                         |                                            Param                                             | Description                                                                                                                                                                              |
|------------------------------------------------------------------|:--------------------------------------------------------------------------------------------:|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `/modules/appointment-local/meetings-information/` `GET`         |                                         -No Params-                                          | Returns list of all the meeting-types.                                                                                                                                                   |
| `/modules/appointment-local/meetings-information/` `POST`        |          body_params `{service_provider, meeting_type, meeting_type_detail, fees}`           | Takes service_provider id as `service_provider`, type of meeting/appointment as `meeting_type`, detail about the appointment as `meeting_type_detail`, and appointment charges as `fees` |
| `/modules/appointment-local/meetings-information/{id}/` `GET`    |                                      path_param `{id}`                                       | Returns detail of specific meeting-types                                                                                                                                                 |
| `/modules/appointment-local/meetings-information/{id}/` `PUT`    | path_param `{id}`  body_params `{service_provider, meeting_type, meeting_type_detail, fees}` | Returns full updated detail of meeting-types                                                                                                                                             |
| `/modules/appointment-local/meetings-information/{id}/` `PATCH`  | path_param `{id}`  body_params `{service_provider, meeting_type, meeting_type_detail, fees}` | Returns patch updated detail of meeting-types                                                                                                                                            |
| `/modules/appointment-local/meetings-information/{id}/` `DELETE` |                                      path_param `{id}`                                       | Delete specific meeting-type. Returns No content.                                                                                                                                        |
| `/modules/appointment-local/appointment/` `GET`                  |                                         -No Params-                                          | Returns list of all the appointments.                                                                                                                                                    |
| `/modules/appointment-local/appointment/` `POST`                 |                    body_params [Appointment Object](#appointment-object)                     | See details                                                                                                                                                                              |
| `/modules/appointment-local/appointment/{id}/` `GET`             |                                      path_param `{id}`                                       | Returns detail of specific appointment.                                                                                                                                                  |
| `/modules/appointment-local/appointment/{id}/` `PUT`             |           path_param `{id}` body_params [Appointment Object](#appointment-object)            | Returns full updated detail of specific appointment.                                                                                                                                     |
| `/modules/appointment-local/appointment/{id}/` `PATCH`           |           path_param `{id}` body_params [Appointment Object](#appointment-object)            | Returns patch updated detail of specific appointments.                                                                                                                                   |
| `/modules/appointment-local/appointment/{id}/` `DELETE`          |                                      path_param `{id}`                                       | Delete specific appointment. Returns No content.                                                                                                                                         |
| `/modules/appointment-local/appointment_session/` `POST`         |                                      body_params `type`                                      | See details about created appointment session.                                                                                                                                           |
| `/modules/appointment-local/appointment_session/{id}/` `GET`     |                                      path_param `{id}`                                       | Returns detail of specific appointment session.                                                                                                                                          |
| `/modules/appointment-local/appointment_session/{id}/` `PUT`     |                             path_param `{id}` body_params `type`                             | Returns full updated detail of specific appointment session.                                                                                                                             |
| `/modules/appointment-local/appointment_session/{id}/` `PATCH`   |                             path_param `{id}` body_params `type`                             | Returns patch updated detail of specific appointment session.                                                                                                                            |
| `/modules/appointment-local/appointment_session/{id}/` `DELETE`  |                                      path_param `{id}`                                       | Delete specific appointment session and returns No content.                                                                                                                              |

### Appointment Object

Appointment Object consist of the SESSION_DAY details if a user is creating a meeting in morning or afternoon, evening
or night. Detail of the client details like, name, email, age, gender and notes, the appointment date, start_time,
end_time, cost for the appointment, discount on that appointment and additional fee.

Here is the example of an appointment object.

```console
{
    service_provider: 1,            // Id of the service-provider whom with appointment will be created.
    client: 3                       // Id of the User who is creating the appointment
    selected_date: '2022-10-20',    // Date on which meeting is scheduled.
    session: 1 ,                    // Id of Session for the appointment if user wants to meet service_provider in morning, afternoon or evening.
    start_time: "10:00:00"          // Time on which appointment/meeting will start.
    end_time : "11:00:00"           // Time on which appointment/meeting will end
    name: "John"                    // Name of the client whom for appointment is being created.
    email: "john@boun.com"          // email of the client
    age : 28                        // Age of the client
    address : USA                   // Address of the meeting
    gender: 'Male'                  // Gender of the client
    add_note: 'client notes'        // Notes from the client. If client has some details/notes for the service_provider can add here.
    appointment_cost: 60.00         // Cost that client has to py for the appointment
    additional_fee: 20.00           // Additional fee for appointment. If client has asked for special/extra services.
    sub_total: 80.00                // Subtotal amount for the appointment.
    discount: 10.00                 // Discount from the service_provider on this appointment.
    total: 70.00                    // The final amount a client will have to pay.
    appointment_type:[0,2]          // Id's for the type of appointment (Message, Call, Video).
}
```

## Module Specifications

Here is
the [Module Specification Document](https://docs.google.com/document/d/1oOjHadHw4fUA9JxfIykAqEhAeokcCRqgDkcQjyUkUJk/edit?usp=sharing),
which provides more information about the module's actual intentions.

## Postman Collection for Module APi Endpoints

Here is a collection of all the api endpoints for the module.
[Appointment Local Postman Collection](https://drive.google.com/file/d/19x0jpCL-JeAa-eFYrKuc5gRavu662-w-/view?usp=share_link)
