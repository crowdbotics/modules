## Django Two Factor Authentication backend configuration and information

## Module description

Django Two Factor Authentication module which will implement a two-factor authentication flow, which will prompt for username/email and password and then a time-based generated code. User is granted access to a application only after successfully presenting evidence to an authentication.

The Features of this module are following:

- User can enable 2FA service with email, phone number and google authenticator.
- User can disable 2FA service.
- Send the user a unique token via SMS text message, normally a 5-10 digit code.
- Send token via email.
- Verify unique code sent to the user via SMS or Email.

#### Requirements

To enable 2FA functionality, follow these steps:

- Ensure your user API supports both email and phone number signup.
- Modify your user model to include a "phone_number" field, which is necessary for the two-factor authentication module.
- Utilize the Django PhoneNumberField in your user model to store the phone number securely.

## Features

- [x] This module includes migrations.
- [x] This module includes environment variables.
- [x] This module requires manual configurations.
- [ ] This module can be configured with module options.

## Environment variables

```.py
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

## 3rd party setup

Twilio and Sendgrid accounts need to be setup:

`Twillio account`

- Login in to [twillio](https://www.twilio.com/login) site.
- On the twillio dashboard you will find your `Account SID` and `Auth Token`, save them for letter use.

![Twillio](https://user-images.githubusercontent.com/76822297/227456078-ddba88d4-e9bf-4207-af06-94fe34d895fd.png)

`Sendgrid Account`

- Login in to [SendGrid](https://signup.sendgrid.com/) site.
- Create a new sender by clicking `Create New Sender` Button.
- Enter all the sender details and save.
- In the left side-bar, under `Email API` select `Integration Guide`.
- Choose `SMTP Relay` as your setup method.
- Enter the name of your secret key and enter `Create` button.
- Copy the following things for later use:

    ```
    SendGrid API Key: SG.xxxxxxxxxxxxxxxxxxxxxxxxxx
    Server:	smtp.sendgrid.net
    Ports: 25, 587	(for unencrypted/TLS connections) 465	(for SSL connections)
    Username:	apikey
    Password: SG.xxxxxxxxxxxxxxxxxxxxxx
    ```

![SendgridKEys](https://user-images.githubusercontent.com/76822297/227455983-9d1e7191-52ee-4c52-8052-c4bf68a64f38.png)

## Dependencies

[Twilio](https://github.com/twilio/twilio-python/blob/main/README.md)\
[Sendgrid](https://github.com/sendgrid/sendgrid-python/blob/main/README.md)\
[PYOTP](https://github.com/jpf/pyotp/blob/master/README.markdown)\
[Freezegun](https://github.com/spulec/freezegun/blob/master/README.rst)

Dependencies used:

[twilio](https://pypi.org/project/twilio/)\
[sendgrid](https://pypi.org/project/sendgrid/)\
[pyotp](https://pypi.org/project/pyotp/)\
[freezegun](https://pypi.org/project/freezegun/)

## API details

| Api Name                                                                          |                          Param                          | Description                                                                                                  |
|-----------------------------------------------------------------------------------|:-------------------------------------------------------:|--------------------------------------------------------------------------------------------------------------|
| `/modules/two-factor-authentication/send/otp` <br /> method: `POST`               |          object <br />`{ "method": "email" }`           | Takes an object containing method email, phone_number or google_authenticator                                |
| `/modules/two-factor-authentication/verify/otp` <br /> method: `POST`             |    object <br /> `{ "method": "email", "code": ""}`     | Takes object containing method and code                                                                      |
| `/modules/two-factor-authentication/google/authenticator/qr` <br /> method: `GET` |                            -                            | Google Authenticator will return the QR code link which you can use to register on Google Authenticator App. |
| `/modules/two-factor-authentication/enable/2fa` <br /> method: `POST`             | object <br /> `{ "method": "email" or "phone_number" }` | Enable Two factor authentication and send email, sms or get link to your given method.                       |
| `/modules/two-factor-authentication/enable/2fa` <br /> method: `DELETE`           |                            -                            | Use to disable Two Factor authentication.                                                                    |
| `/modules/two-factor-authentication/verify/otp/enable ` <br /> method: `POST`     |    object <br /> `{ "method": "email", "code": ""}`     | Takes object containing method and code and verify which users has enable 2FA.                               |
| `/modules/two-factor-authentication/enable/2fa ` <br /> method: `GET`             |                            -                            | Return details about user have 2FA is enabled or disabled.                                                   |

