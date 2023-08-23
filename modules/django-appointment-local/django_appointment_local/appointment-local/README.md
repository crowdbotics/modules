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
| `/modules/appointment-local/appointment/` ` POST ` | object    ` {title: "", description: "", selected_date: "",   time_slot: "", duration: "", location: ""} `|Takes object containing title, description, selected_date, time_slot, duration, location and creates a new appointment. |
| `/modules/appointment-local/appointment/${id}/` ` DELETE `| id |Takes appointment id and deletes the appointment against that id. |