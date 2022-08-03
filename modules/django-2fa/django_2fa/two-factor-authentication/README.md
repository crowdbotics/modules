# Two Factor Authentication

Before starting the server run:

```sh
python manage.py migrate
```

## Requirements

To send SMS you will need to set twilio 'ACCOUNT_SID', 'AUTH_TOKEN' and 'from_' in settings.py
```
pip install twilio
```
To send Email you will need to set sendgrid 'SENDGRID_API_KEY', 'EMAIL_HOST', 'EMAIL_HOST_USER' and 'from_email' in settings.py
```
pip install sendgrid
```

## Configurations Keys
settings.py
```
SENDGRID_API_KEY = '...'
ACCOUNT_SID = '...'
AUTH_TOKEN = '...'

EMAIL_HOST = '...'
EMAIL_HOST_USER = '...'
EMAIL_HOST_PASSWORD = SENDGRID_API_KEY
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL='...'
PHONE='...'
```

## Api Table
List of api's endpoints with params needed for these apis.

| Api Name                           | Param        | Description                                                    |
| ------------------------------------------------------------|:------------:|-----------------------------------|
| `two-factor-authentication/twofactorauth/send_otp/` <br /> method: `POST`| object <br />`{email: ''} or {phone_number: ''}`  | Takes an object containing email or phone number to send the OTP code.|
| `two-factor-authentication/twofactorauth/send_otp/` <br /> method: `DELETE`|  object <br /> `{code: "", email or phone_number: ""}`  |Takes object containing otp code that was sent and email or phone number on to the code was sent. |
| `/two-factor-authentication/2fa?id=${id}` <br /> method: `GET`|  user_id |Takes user id and returns object containing secret, name and link. |
| `/two-factor-authentication/2fa` <br /> method: `POST`| object <br />`{id: '', otp: ''}` |Takes object containing user id and otp code that was sent. Returns response Ok in case of successful hit.|
| `/two-factor-authentication/twofactorauth/${id}/` <br /> method: `PATCH`| object <br />`{id: '', method: ''}` |Takes object containing user id and 2fa method. Method can be email, sms or 2fa. Sets two-factor-authentication method for the user against the provided id.|
| `/two-factor-authentication/twofactorauth/${id}/` <br /> method: `GET`| id |Takes user id and returns an object containing user details.|

