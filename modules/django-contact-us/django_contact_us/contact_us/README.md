# Contact Us

# Configurations
SendGrid is used to send the user query to the admin. Following is the configuration
## settings.py
```
SENDGRID_API_KEY = ''
TO_EMAILS = ''
```


## Api Table
List of api's endpoints with params needed for these apis.

| Api Name                       | Param        | Description                                                    |
| ------------------------------ |:------------:|:---------------------------------------------------------------|
| `/modules/contact-us/contact_us/` | object `{ email: '', message: '', name: '' }` | Takes object containing email, message and name of the user who wants to contact.|