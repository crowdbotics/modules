## Django Privacy Policy backend configuration and information

## Module description

This module used to create and manages the privacy policy for app users.

## Features

- [x] This module includes migrations.
- [ ] This module includes environment variables.
- [ ] This module requires manual configurations.
- [ ] This module can be configured with module options.

## Environment variables

No environment variables are required.

## 3rd party setup

No 3rd party setup is required.

## Dependencies

No dependencies are required.

## API details

| Api Name                                  |                             Param                              | Description                                                   |
|-------------------------------------------|:--------------------------------------------------------------:|:--------------------------------------------------------------|
| `/modules/privacy-policy/` `POST`         | body_params `{'author': 'user_foreign_key', 'body': "string"}` | This will used to create a privacy policy.                    |
| `/modules/privacy-policy/` `GET`          |                               -                                | This will used to return a list of privacy policies.          |
| `/modules/privacy-policy/<pk>/ ` `GET`    |               path_params `{privacy_policy_id}`                | This will used to return a detail of specific privacy policy. |
| `/modules/privacy-policy/<pk>/ ` `DELETE` |               path_params `{privacy_policy_id}`                | This will used to delete a privacy policy.                    |
