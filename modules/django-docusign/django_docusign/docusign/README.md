# Docusign

Module to generate and retrieve eSignature docs.

- Get Access Token
- eSignature Generation
- Retrieve eSignature doc
- Create an envelope that include documents that will be signed electronically, sender information, recipient information
- Status information that tracks delivery and signature progress

# Environment variables

```
CLIENT_ID = ""
USER_ID = ""
ACCOUNT_ID = ""
HOST = "host_url/restapi/"
OAUTH_HOST_NAME = "account-d.docusign.com"
PRIVATE_KEY_FILE_PATH = "./demo/private.key"
EXPIRES_IN = 28800
SCOPES = ["signature", "impersonation"]
REDIRECT_URI = "https://www.crowdbotics.com/"
```

## Api Table
List of api's endpoints with params needed for these apis.

| Api Name                 |                                                                    Param                                                                    | Description                                                                                                                                                                 |
|--------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `auth/token/`            | These objects will taken from settings file except private key <br/>`CLIENT_ID, USER_ID, OAUTH_HOST_NAME, private_key, EXPIRES_IN, SCOPES ` | Takes client id, user id, Oauth host name, private key , token expiry time and scope and return payload that contain access token, token expire time, scope and token type. |
| `envelope/create/`       |                                                      `Bearer Token` `envelope payload`                                                      | Takes envelope definition payload then create envelope and return envelope id, envelope uri, status date and time, status.                                                  |
| `envelope/retrieve/`     |                                                  `Bearer Token` object `{envelope_id: ''}`                                                  | Takes envelope id and return the status and data related to envelope based on envelope id.                                                                                  |
| `envelope/download/`     |                                         `Bearer Token`, objects {envelope_id: '', document_id: ''}                                          | Takes envelope id and document id return the specific document present in envelope based on document id.                                                                    |
| `envelope/retrieve-all/` |       `Bearer Token` objects {folder value: ''}. Valid values are `drafts`, `awaiting_my_signature`, `completed`, `out_for_signature`       | Takes Folder valid value and return all the envelopes present in that folder.                                                                                               |
