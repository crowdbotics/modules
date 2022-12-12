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
TIME_ZONE = 'asia/Karachi'

SENDGRID_API_KEY = '...'
ACCOUNT_SID = '...'
AUTH_TOKEN = '...'
TOTP_SECRET = '3232323232323232'
OTP_EXPIRATION_TIME = 60

EMAIL_HOST = "smtp.sendgrid.net"
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
| `/two-factor-authentication/send-otp/` <br /> method: `POST`| object <br />`{ "method": "email" }`  | Takes an object containing method email, phone_number or google_authenticator|
| `/two-factor-authentication/verify-otp/` <br /> method: `POST`|  object <br /> `{ "method": "email", "code": ""}`  |Takes object containing method and code|




