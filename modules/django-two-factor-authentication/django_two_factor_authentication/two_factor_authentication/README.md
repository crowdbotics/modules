# Django Two Factor Authentication
Django Two Factor Authentication module is a backend support for React Native 2FA Module, which will implement a two-factor authentication flow, which will prompt for username/email and password and then a time-based generated code. User is granted access to a application only after successfully presenting evidence to an authentication.

## Features
1. Send the user a unique token via SMS text message, normally a 5-10 digit code.
2. Send token via email.
3. Verify unique code sent to the user via SMS or Email.


## Required Dependencies/Packages
* **twilio**

The Twilio REST API allows you to query and manage meta-data about your account, phone numbers, usage, and access tokens. It makes it easy to send and receive SMS and MMS messages as well as query meta-data about text messages.
Install it by running the command:
```console
pip install twilio
```

* **sendgrid**

SendGrid delivers your transactional and marketing emails through the world's largest cloud-based email delivery platform.
Install the package using this command:
```console
pip install sendgrid
```
***Note***: Keep the packages/dependencies in `Pipfile`. So that when backend is deployed our module requirements are complete.

## Module Credentials/Keys
We need to setup twillio ans sendgrid accounts to get the required creds to make module work.

### Setting up Twillio account
1. Login in to [twillio](https://www.twilio.com/login) site.
2. On the twillio dashboard you will find your `Account SID` and `Auth Token`, save them for letter use.

![Twillio](https://user-images.githubusercontent.com/76822297/227456078-ddba88d4-e9bf-4207-af06-94fe34d895fd.png)


### Setting up Sendgrid account
1. Login in to [SendGrid](https://signup.sendgrid.com/) site.
2. Create a new sender by clicking `Create New Sender` Button.
3. Enter all the sender details and save.
4. In the left side-bar, under `Email API` select `Integration Guide`.
5. Choose `SMTP Relay` as your setup method.
6. Enter the name of your secret key and enter `Create` button.
7. Copy the following things for later use:

    ```
    SendGrid API Key: SG.xxxxxxxxxxxxxxxxxxxxxxxxxx
    Server:	smtp.sendgrid.net
    Ports: 25, 587	(for unencrypted/TLS connections) 465	(for SSL connections)
    Username:	apikey
    Password: SG.xxxxxxxxxxxxxxxxxxxxxx
    ```
 ![SendgridKEys](https://user-images.githubusercontent.com/76822297/227455983-9d1e7191-52ee-4c52-8052-c4bf68a64f38.png)



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



### Module Specifications
Here is the [Module Specification Document](https://docs.google.com/document/d/1b0jb2yn19mH8lJ7vD-YiCDS4M0PUvt4Lnw3kc12D1pM/edit?usp=sharing), which provides more information about the module's actual intentions.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
