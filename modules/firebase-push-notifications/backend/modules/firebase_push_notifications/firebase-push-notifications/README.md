# FCM Module
Using FCM module, you can notify a client app that new email or other data is available to sync. You can send notification messages to drive user re-engagement.

## Project Settings

1. Add following in your project's settings.py file.

```console

FCM_DJANGO_SETTINGS = {"FCM_SERVER_KEY": env.str("FCM_SERVER_KEY", "Your FCM Server Key")}

```

2. In settings.py file, add

```console
THIRD_PARTY_APPS = [
...
'fcm_django',
...
]
```

## Dependencies

-  FCM
```console
pip install fcm_django==0.3.4
python manage.py migrate
python manage.py runserver 192.168.1.11:8000
```

## Api Table
List of api's endpoints with params needed for these apis.

| Api Name                       | Param        | Description                                                    |
| ------------------------------ |:------------:|:---------------------------------------------------------------|
| `/modules/firebase-push-notifications/notification/`| -No Params-  | Returns notification list. |
| `/modules/firebase-push-notifications/user_fcm_device_add/`|  object `{name: "", registration_id: "", type, device_id: ""}`  |Adds a new device against the provided details.|
