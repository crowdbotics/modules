# Contact Us
Using this module, users can send a message or direct email.

# Configurations
SendGrid is used to send the user query to the admin. Following is the configuration

# Setup

 Run the following commands to get started:

```
python manage.py migrate
python manage.py runserver
```

## settings.py
```
SENDGRID_API_KEY = ''
TO_EMAILS = ''
```

# Get Keys And Credientials
1. Create your sendgrid account by adding the required details [https://signup.sendgrid.com]
2. After Creating the account,from your dashboard go to settings then click on api keys.
3. On the top right corner, click on Create API Key.
4. Enter your api key name and click on create&view.
5. After that your Sendgrid API key will generate. 

## Api Table
List of api's endpoints with params needed for these apis.

| Api Name                       | Param        | Description                                                    |
| ------------------------------ |:------------:|:---------------------------------------------------------------|
| `/modules/contact-us/contact_us/` | object `{ email: '', message: '', name: '' }` | Takes object containing email, message and name of the user who wants to contact.|