# Two Factor Authentication

Before starting the server run:

```sh
python manage.py migrate
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

from_email='...'
from_='...'
```