# Appointment local

Create Appointment table 

## Instructions to run project
1.Make Migration
```
python manage.py makemigrations

```
2. Migrate
```
python manage.py migrate
```
3. Run server

## Api Table
List of api's endpoints with params needed for these apis.

| Api Name                                 | Param              | Description                               |
| -----------------------------------------|:------------------:|-------------------------------------------|
| `/modules/appointment-local/appointment/` ` GET `| -No Params-| Returns list of all the appointments.|
| `/modules/appointment-local/appointment/` ` POST ` | [Appointment Object](#appointment-object) | See details below.|
| `/modules/appointment-local/appointment/${id}/` ` DELETE `| id |Takes appointment id and deletes the appointment against that id. |
| `/modules/appointment-local/meeting-info/` ` GET `|  | Returns list of all the meeting-types.|
| `/modules/appointment-local/meeting-info/` ` POST `| `{service_provider, meeting_type, meeting_type_detail, fees}` | Takes service_provider id as `service_provider`, type of meeting/appointment as `meeting_type`, detail about the appointment as `meeting_type_detail`, and appointment charges as `fees`|


### Appointment Object

Appointment Object consist of the SESSION_DAY details if a user is creating an meeting in morning or afternoon, evening or night. Detail of the client details like, name, email, age, gender and notes, the appointment date, start_time, end_time, cost for the appointment, discount on that appointment and additional fee.

Here is the an example of an appointment object.
```console
{
    service_provider: 1,            // Id of the service-provider whom with appointment will be created.
    client: 3                       // Id of the User who is creating the appointment
    selected_date: '2022-10-20',    // Date on which meeting is scheduled.
    session: 'morning',             // Session for the appointment if user wants to meet service_provider in morning, afternoon or evening.
    start_time: "10:00:00"          // Time on which appointment/meeting will start.
    end_time : "11:00:00"           // Time on which appointment/meeting will end
    name: "John"                    // Name of the client whom for appointment is being created.
    email: "john@boun.com"          // email of the client
    age : 28                        // Age of the client
    gender: 'male'                  // Gender of the client
    add_note: 'client notes'        // Notes from the client. If client has some details/notes for the service_provider can add here.
    appointment_cost: 60.00         // Cost that client has to py for the appointment
    additional_fee: 20.00           // Additional fee for appointment. If client has asked for special/extra services.
    sub_total: 80.00                // Subtotal amount for the appointment.
    discount: 10.00                 // Discount from the service_provider on this appointment.
    total: 70.00                    // The final amount a client will have to pay.
    appointment_type:[0,2]          // Id's for the type of appointment (Message, Call, Video).
}
```
