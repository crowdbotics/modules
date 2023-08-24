## Django Contact-us backend configuration and information

## Module description

Using this module, users can send a message or direct email. The following are the key features in scope for this
module.

- Ability to send message
- Ability to enter the name, email, and message
- Ability to send direct email

## Features

- [ ] This module includes migrations.
- [x] This module includes environment variables.
- [ ] This module requires manual configurations.
- [ ] This module can be configured with module options.

## ## Environment variables
```dotenv
SENDGRID_API_KEY='<API_KEY>'
TO_EMAILS='<Sendgrid_Email>'
```


## ## 3rd party setup

Follow these steps to create an account on `Sendgrid`:

- Login in to [SendGrid](https://signup.sendgrid.com/) site.
- Create a new sender by clicking `Create New Sender` Button.
- Enter all the sender details and save.
- Select `Integration Guide` under `Email API` in the left sidebar.
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

The dependencies are following:

- [Sendgrid](https://pypi.org/project/sendgrid/)

## API details

API Endpoints and Required Parameters List.

| Api Name                          |                     Param                     | Description                                                                       |
|-----------------------------------|:---------------------------------------------:|:----------------------------------------------------------------------------------|
| `/modules/contact-us/contact_us/` | object `{ email: '', message: '', name: '' }` | Takes object containing email, message and name of the user who wants to contact. |