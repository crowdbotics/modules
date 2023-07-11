# Contact Us
Using this module, users can send a message or direct email.

## Scope Features
The following are the key features in scope for this module. 

1. Ability to send message
2. Ability to enter the name, email, and message 
3. Ability to send direct email 

## Required SDKs and Libraries
A 3rd party integration requirements which is :
- [Sendgrid](https://pypi.org/project/sendgrid/)

Can be install by the following command: 
- pip install sendgrid

And add this package in `pipfile`
```
sendgrid="6.10.0"
```
## Keys And Credientials Setup
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

## settings.py
```
SENDGRID_API_KEY = ''
TO_EMAILS = ''
```

## Setup Installation
To install the given dependencies in `setup.py`. Go to the `modules/django_contact_us/contact_us/` and run the following command:
```
python -m pip install .
```
Start the server by running the following command :
```
python manage.py migrate
python manage.py runserver
```
## Api Table
List of api's endpoints with params needed for these apis.

| Api Name                       | Param        | Description                                                    |
| ------------------------------ |:------------:|:---------------------------------------------------------------|
| `/modules/contact-us/contact_us/` | object `{ email: '', message: '', name: '' }` | Takes object containing email, message and name of the user who wants to contact.|

## Module Specifications
Here is the [Module Specification Document](https://docs.google.com/document/d/1Qpt2bEOMZx3KbVVhpXwv-b0jKutmCv0lHMPmrBgSf_0/edit?usp=sharing), which provides more information about the module's actual intentions.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)