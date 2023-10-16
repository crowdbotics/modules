## Django Docusign backend configuration and information

## Module description

The Module used to generate and retrieve eSignature docs.

The following are the scope features for this module:

- Get Access Token
- eSignature Generation
- Retrieve eSignature doc
- Create an envelope that include documents that will be signed electronically, sender information, recipient
  information
- Status information that tracks delivery and signature progress

## Features

- [ ] This module includes migrations.
- [x] This module includes environment variables.
- [x] This module requires manual configurations.
- [ ] This module can be configured with module options.

## Environment variables

```dotenv
CLIENT_ID="Integration key of your app"
USER_ID="Your account USER_ID"
ACCOUNT_ID="API Account ID"
ACCOUNT_BASE_URL="host_url{Account Base URL}/restapi/"
OAUTH_HOST_NAME="account-d.docusign.com"
PRIVATE_KEY_FILE_PATH="./demo/private.key" -> while creating app in your Google service's developer account, go to service integration and CLICK ON [GENERATE RSA] then copy your private key and paste it in [private.key] file
EXPIRES_IN=28800
SCOPES=["signature", "impersonation"]
REDIRECT_URI="https://www.crowdbotics.com/"
```

## 3rd party setup

Create `Docusign Developer ACCOUNT`

- Create a [developer account](https://developers.docusign.com/platform/account/) on Docu-Sign
- After clicking on Create Account add the following details about the developer.
- When your account is created. From your dashboard click on your profile, then click on My Apps and Keys.
- Next, click on the Add App and Integration Key button.
- You will be asked to complete a few steps by entering the details. Once you have completed the process you will be
  directed to your Apis keys and credentials.
- Copy your client id, user id, account id, host name, redirect uri, scopes and save it for later use. Must remember
  that the session will expire after 10 to 30 minutes.
  ![screenshot-admindemo docusign com-2023 03 24-12_59_44](https://user-images.githubusercontent.com/120275623/227461456-8c872b39-5929-4a7c-84c9-ee8874d84f43.png)

## Dependencies

[Docusign-esign](https://github.com/docusign/docusign-esign-python-client/blob/master/README.md)
[AttrDict](https://github.com/bcj/AttrDict/blob/master/README.rst)

Dependencies used:

- [docusign-esign==3.19.0](https://pypi.org/project/docusign-esign/)
- [attrdict](https://pypi.org/project/attrdict/)

## API details

| Api Name                                         |                                                                                                                 Param                                                                                                                 | Description                                                                                                                                                                 |
|--------------------------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `/modules/docusign/auth/token/` `GET`            |                                              These objects will taken from settings file except private key <br/>`CLIENT_ID, USER_ID, OAUTH_HOST_NAME, private_key, EXPIRES_IN, SCOPES `                                              | Takes client id, user id, Oauth host name, private key , token expiry time and scope and return payload that contain access token, token expire time, scope and token type. |
| `/modules/docusign/envelope/create/` `POST`      | `Bearer Token` `envelope_payload=>{documents:[{documentBase64:"","documentId": 3,"fileExtension": "pdf", "name": "document"}],"emailSubject":"","recipients":{"signers":[{"email":"","name":"", "recipientId":""}]},"status":"sent"}` | Takes envelope definition payload then create envelope and return envelope id, envelope uri, status date and time, status.                                                  |
| `/modules/docusign/envelope/retrieve/` `GET`     |                                                                                               `Bearer Token` object `{envelope_id: ''}`                                                                                               | Takes envelope id and return the status and data related to envelope based on envelope id.                                                                                  |
| `/modules/docusign/envelope/download/`  `GET`    |                                                                                      `Bearer Token`, objects {envelope_id: '', document_id: ''}                                                                                       | Takes envelope id and document id return the specific document present in envelope based on document id.                                                                    |
| `/modules/docusign/envelope/retrieve-all/` `GET` |                                                    `Bearer Token` objects {folder value: ''}. Valid values are `drafts`, `awaiting_my_signature`, `completed`, `out_for_signature`                                                    | Takes Folder valid value and return all the envelopes present in that folder.                                                                                               |

## Docu-sign Endpoints Postman Collection:

Here is a collection of all the api endpoints for the Docu-sign module.

[Docu-Sign Postman Collection](https://drive.google.com/file/d/1SERBkw54zLknAmULrXjniiLUuhFH3IQE/view?usp=share_link)

