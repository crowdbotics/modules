# Docusign
The Module used to generate and retrieve eSignature docs.


## Scope Features
The following are the critical features in scope for this module.
- Get Access Token
- eSignature Generation
- Retrieve eSignature doc
- Create an envelope that include documents that will be signed electronically, sender information, recipient information
- Status information that tracks delivery and signature progress

## Required SDKs and Libraries
A 3rd party integration requirements which is:
- [docu-esign](https://pypi.org/project/docusign-esign/)

Can be install by following command:
- pip install docusign-esign

And add the package in `pipfile`
```
docusign="3.21.0"
```
This SDK is provided as open source, which enables you to customize its functionality to suit your particular use case.

## Setup Installation
To install the given dependencies in `setup.py`. Go to the `modules/django-docusign/docusign/` and run the following command:
```
python -m pip install .
```
Run Migrations
```
python manage.py migrate
```

Start the server by running the following command :
```
python manage.py runserver
```

## Environment variables

```
CLIENT_ID = "Integration key of your app" 
USER_ID = "Your account USER_ID"
ACCOUNT_ID = "API Account ID"
HOST = "host_url{Account Base URL}/restapi/"
OAUTH_HOST_NAME = "account-d.docusign.com"
PRIVATE_KEY_FILE_PATH = "./demo/private.key" -> while creating app in your Google service's developer account, go to service integration and CLICK ON [GENERATE RSA] then copy your private key and paste it in [private.key] file
EXPIRES_IN = 28800
SCOPES = ["signature", "impersonation"]
REDIRECT_URI = "https://www.crowdbotics.com/"
```

## Keys And Credientals Setup
You can get environment variable keys which can used to hit the APIs
1. Create a [developer account](https://developers.docusign.com/platform/account/) on Docu-Sign
2. After clicking on Create Account add the following details about the developer.
3. When your account is created. From your dashboard click on your profile, then click on My Apps and Keys.
4. Next, click on the Add App and Integration Key button.
5. You will be asked to complete a few steps by entering the details. Once you have completed the process you will be directed to your Apis keys and credentials.
6. Copy your client id, user id, account id, host name, redirect uri, scopes  and save it for later use. Must remember that the session will expire after 10 to 30 minutes.
![screenshot-admindemo docusign com-2023 03 24-12_59_44](https://user-images.githubusercontent.com/120275623/227461456-8c872b39-5929-4a7c-84c9-ee8874d84f43.png)

.


## Api Table
List of api's endpoints with params needed for these apis.

| Api Name                 |                                                                                                                 Param                                                                                                                 | Description                                                                                                                                                                 |
|--------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `auth/token/`            |                                              These objects will taken from settings file except private key <br/>`CLIENT_ID, USER_ID, OAUTH_HOST_NAME, private_key, EXPIRES_IN, SCOPES `                                              | Takes client id, user id, Oauth host name, private key , token expiry time and scope and return payload that contain access token, token expire time, scope and token type. |
| `envelope/create/`       | `Bearer Token` `envelope_payload=>{documents:[{documentBase64:"","documentId": 3,"fileExtension": "pdf", "name": "document"}],"emailSubject":"","recipients":{"signers":[{"email":"","name":"", "recipientId":""}]},"status":"sent"}` | Takes envelope definition payload then create envelope and return envelope id, envelope uri, status date and time, status.                                                  |
| `envelope/retrieve/`     |                                                                                               `Bearer Token` object `{envelope_id: ''}`                                                                                               | Takes envelope id and return the status and data related to envelope based on envelope id.                                                                                  |
| `envelope/download/`     |                                                                                      `Bearer Token`, objects {envelope_id: '', document_id: ''}                                                                                       | Takes envelope id and document id return the specific document present in envelope based on document id.                                                                    |
| `envelope/retrieve-all/` |                                                    `Bearer Token` objects {folder value: ''}. Valid values are `drafts`, `awaiting_my_signature`, `completed`, `out_for_signature`                                                    | Takes Folder valid value and return all the envelopes present in that folder.                                                                                               |

## Docu-sign Endpoints Postman Collection:
Here is a collection of all the api endpoints for the Docu-sign module.

[Docu-Sign Postman Collection](https://drive.google.com/file/d/1SERBkw54zLknAmULrXjniiLUuhFH3IQE/view?usp=share_link)

## Module Specifications
Here is the [Module Specification Document](https://docs.google.com/document/d/1cEJ1_80JOmDBxI__Qf70Rkz0lWv3yUA6pyXVvHrJb0M/edit?usp=sharing), which provides more information about the module's actual intentions.
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.
## License
[MIT](https://choosealicense.com/licenses/mit/)
