# FCM Module (Backend Support)
Using FCM module, you can notify a client app that new email or other data is available to sync. You can send notification messages to drive user re-engagement.

## Features
User is able to increase Message Visibility
User is able to store the notifications on the database
User is able to trigger notifications from the admin panel
User is able to push alerts to remind users


## Required Dependencies/Packages
***fcm_django and firebase-admin***
The fcm_django Send push notifications to mobile devices & browsers through FCM in Django.
The Firebase Admin Python SDK enables server-side to integrate Firebase into their services and applications.
Install the packages by using the following commands:
```console
pip install fcm_django
pip install firebase-admin
```
***Note***: Keep the packages/dependencies in `Pipfile`. So that when backend is deployed our module requirements are complete.


## Project Settings

1. Add following in your project's settings.py file.

```

FCM_DJANGO_SETTINGS = {"FCM_SERVER_KEY": env.str("FCM_SERVER_KEY", "Your FCM Server Key")}

```

2. In settings.py file, add

```
THIRD_PARTY_APPS = [
...
'fcm_django',
...
]
```

3. Add following at the end in your project's settings.py file.

```
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
}
```

## Environment Variables

```.env
"FCM_SERVER_KEY"
"FCM_SERVICE_FILE_PATH" (Navigate to your Firebase project settings in the Firebase Console, then proceed to the Service Account section and click on 'Generate a new private key')
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
