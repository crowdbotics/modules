# Two Factor Authentication
Module will implement a two-factor authentication flow.

## Installations

1. To send SMS and Email install python packages specified in `setup.py`. Move into `modules/django_two_factor_authentication` and run following command: 

```py
python -m pip install .
```

2. Make migrations
```
python manage.py makemigrations
```

3. Run migrations
```
python manage.py migrate
```

4. Run the server
```
python manage.py runserver
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
| `/modules/two-factor-authentication/send/otp` <br /> method: `POST`| object <br />`{ "method": "email" }`  | Takes an object containing method email, phone_number or google_authenticator|
| `/modules/two-factor-authentication/verify/otp` <br /> method: `POST`|  object <br /> `{ "method": "email", "code": ""}`  | Takes object containing method and code|
| `/modules/two-factor-authentication/google/authenticator/qr` <br /> method: `GET`| - | Google Authenticator will return the QR code link which you can use to register on Google Authenticator App.|




