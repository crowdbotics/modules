# FCM Module
Using FCM module, you can notify a client app that new email or other data is available to sync. You can send notification messages to drive user re-engagement.

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
## Dependencies

-  FCM
```py
pip install fcm_django==0.3.4 django-push-notifications==2.0.0
python manage.py migrate
python manage.py runserver 192.168.1.11:8000
```

## Api Table
List of api's endpoints with params needed for these apis.

| Api Name                       | Param        | Description                                                    |
| ------------------------------ |:------------:|:---------------------------------------------------------------|
| `/modules/firebase-push-notifications/notification/`| -No Params-  | Returns notification list. |
| `/modules/firebase-push-notifications/device/apns/`|  object `{name: "", registration_id: "", type, device_id: "", user}`  |Adds a new ios device against the provided details.|
| `/modules/firebase-push-notifications/device/fcm/`|  object `{name: "", registration_id: "", type, device_id: ""}`  |Adds a new android device against the provided details.|

