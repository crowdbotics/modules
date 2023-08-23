# FCM Module (Backend Support)
Using FCM module, you can notify a client app that new email or other data is available to sync. You can send notification messages to drive user re-engagement.

## Features
User is able to increase Message Visibility
User is able to store the notifications on the database
User is able to trigger notifications from the admin panel
User is able to push alerts to remind users


## Required Dependencies/Packages
***django-push-notifications***
The django-push-notifications REST API allows you Send push notifications to mobile devices through GCM, APNS or WNS and to WebPush (Chrome, Firefox and Opera) in Django.
. Install it by running the command:
```console
pip install django-push-notifications
```
***fcm_django***
fcm_django Send push notifications to mobile devices & browsers through FCM in Django.
Install the package using this command:
```console
pip install fcm_django
```
***Note***: Keep the packages/dependencies in `Pipfile`. So that when backend is deployed our module requirements are complete.


## Project Settings

1. Add following in your project's settings.py file.

```py

FCM_DJANGO_SETTINGS = {"FCM_SERVER_KEY": env.str("FCM_SERVER_KEY", "Your FCM Server Key")}

```

2. In settings.py file, add

```py
THIRD_PARTY_APPS = [
...
'fcm_django',
'push_notifications',
...
]
```

3. Add following at the end in your project's settings.py file.

```py
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
}
```

## Installations
1. Make migrations

```console
python manage.py makemigrations
```
2. Run migrations

```console
python manage.py migrate
```
3. Run the server

```console
python manage.py runserver
```


## Api Table
List of api's endpoints with params needed for these apis.

| Api Name                       | Param        | Description                                                    |
| ------------------------------ |:------------:|:---------------------------------------------------------------|
| `/modules/firebase-push-notifications/notification/`| -No Params-  | Returns notification list. |
| `/modules/firebase-push-notifications/device/apns/`|  object `{name: "", registration_id: "", type, device_id: "", user}`  |Adds a new ios device against the provided details.|
| `/modules/firebase-push-notifications/device/fcm/`|  object `{name: "", registration_id: "", type, device_id: ""}`  |Adds a new android device against the provided details.|

## Module Specifications
Here is the [Module Specification Document](https://docs.google.com/document/d/1DI90lngd8ZnKauMngxZQZHaUDNY_2ZKS0IVT91K0XcE/edit?usp=sharing), which provides more information about the module's actual intentions.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)