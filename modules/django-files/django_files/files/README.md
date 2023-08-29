## Django Files backend configuration and information

## Module description

This module contains all needed resources to get the Files component for React Native mobile client.

- This module uses file storage. You should enable S3 support
  in your Crowdbotics app in order to get it working properly.
- If file is submitted in base64, a special header must be used
  in order to preserve the extension: "data:[filename.ext];base64,"
  (i.e. "data:my_diapos.ppt;base64,{BASE64_ENCODED-CONTENT}")

The following are the critical features in scope for this module.

- Ability to upload the file.
- Ability to get the uploaded file.
- Ability to update the uploaded file.
- Ability to delete the uploaded file.

## Features

- [x] This module includes migrations.
- [ ] This module includes environment variables.
- [ ] This module requires manual configurations.
- [ ] This module can be configured with module options.

## Environment variables

No Environment variables needed.

## 3rd party setup

No third-party account creation needed.

## Dependencies

No Dependencies used.

## API details

API Endpoints and Required Parameters List.

| Api Name                                 |                   Param                    | Description                                                  |
|------------------------------------------|:------------------------------------------:|:-------------------------------------------------------------|
| `/modules/files/uploads/` `{POST}`       | form-data `file, user, title, description` | Takes file, user, title and description of the file.         |
| `/modules/files/uploads/{id}/` `{PUT}`   | form-data `file, user, title, description` | Takes file, user, title and description and update the file. |
| `/modules/files/uploads/{id}/` `{GET}`   |      `path_params: uploaded_file_id`       | Takes file id and return a specific file details.            |
| `/modules/files/uploads/{id}` `{DELETE}` |      `path_params: uploaded_file_id`       | Delete the file.                                             |

