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
SENDGRID_API_KEY = env.str("SENDGRID_API_KEY", "")
ACCOUNT_SID = env.str("ACCOUNT_SID", "")
AUTH_TOKEN = env.str("AUTH_TOKEN", "")
TOTP_SECRET = env.str("TOTP_SECRET", "3232323232323232")
OTP_EXPIRATION_TIME = env.str("OTP_EXPIRATION_TIME", 60)
EMAIL_SUBJECT = env.str("EMAIL_SUBJECT", "Crowdbotics 2FA code")

EMAIL_HOST = env.str("EMAIL_HOST", "")
EMAIL_HOST_USER = env.str("EMAIL_HOST_USER", "")
EMAIL_HOST_PASSWORD = SENDGRID_API_KEY
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL=env.str("EMAIL", "")
PHONE=env.str("PHONE", "")
```

## Api Table
List of api's endpoints with params needed for these apis.

| Api Name                           | Param        | Description                                                    |
| ------------------------------------------------------------|:------------:|-----------------------------------|
| `/two-factor-authentication/send-otp/` <br /> method: `POST`| object <br />`{ "method": "email" }`  | Takes an object containing method email, phone_number or google_authenticator|
| `/two-factor-authentication/verify-otp/` <br /> method: `POST`|  object <br /> `{ "method": "email", "code": ""}`  |Takes object containing method and code|




