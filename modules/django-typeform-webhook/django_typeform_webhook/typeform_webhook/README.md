# Typeform Webhook

## Migration
```
python manage.py makemigrations
python manage.py migrate

```
 
Start the server by running the following command :
```
python manage.py runserver
```

## Api Table
List of api's endpoints with params needed for these apis.

| Api Name                       | Param        | Description                                                    |
| ------------------------------ |:------------:|:---------------------------------------------------------------|
| `/modules/typeform-webhook/form-answer/${id}` | `form_id` | Takes id of the form submitted by users and returns the list of answers against that form.|