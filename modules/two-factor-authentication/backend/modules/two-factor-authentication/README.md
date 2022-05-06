# Two Factor Authentication

Before starting the server run:

```sh
python manage.py migrate
```

### Requirements

To send SMS you will need to set twilio 'ACCOUNT_SID', 'AUTH_TOKEN' and 'from_' in settings.py
```
pip install twilio
```
To send Email you will need to set sendgrid 'SENDGRID_API_KEY', 'EMAIL_HOST', 'EMAIL_HOST_USER' and 'from_email' in settings.py
```
pip install sendgrid
```

### Configurations Keys
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


