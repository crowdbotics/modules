## Google Drive backend configuration and information

## Module description

This module contains all needed resources to get the Google Drive component for React Native mobile client.

- get drive files
- Create drive folder
- Upload drive files
- Share drive files

## Features

- [ ] This module includes migrations.
- [x] This module includes environment variables.
- [ ] This module requires manual configurations.
- [ ] This module can be configured with module options.

## Environment variables
```dotenv
CREDENTIAL_FILE_PATH="<path/to/file>"
```

## 3rd party setup

1. On [Google Cloud Console](https://console.cloud.google.com/) choose your project or start new one.
2. In the navigation menu choose `APIs & Services` enable new APIs and then look up `Calendar API`, enable the API.
3. Under `APIs & Services >> Credentials`, select `Create Credentials` and click on `service account`, fill in the
   desired name, and continue. Set role as owner(or other desired)(owner gives full access you you might want to switch
   to something less powerful). Click `Done`.
4. This will redirect you to the credentials page. Under the `Service accounts` click on the desired account(this will
   redirect you to the IAM & Admin panel) Under the tab `Keys` click `ADD KEY` and select json, this will download a
   json file to your computer.

5. Add that file into project directory and set the file path to `CREDENTIAL_FILE_PATH` variable in `.env` file.
6. If configuring through `access_token` then add a custom header `Google-Drive-Authorization` to use the Google Drive.

![service_account](https://user-images.githubusercontent.com/76822297/227890333-1767d60a-696e-40f4-b33e-7ef480593902.png)

## Dependencies

[Google API Client](https://github.com/googleapis/google-api-python-client/blob/main/README.md)\
[httplib2 Google Auth](https://github.com/googleapis/google-auth-library-python-httplib2/blob/main/README.rst)\
[oauthlib Google Auth](https://github.com/googleapis/google-auth-library-python-oauthlib/blob/main/README.rst)

Dependencies used:
- [google-api-python-client](https://pypi.org/project/google-api-python-client/)
- [google-auth-httplib2](https://pypi.org/project/google-auth-httplib2/)
- [google-auth-oauthlib](https://pypi.org/project/google-auth-oauthlib/)

## API details

| Api Name                                |                       Params                       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
|-----------------------------------------|:--------------------------------------------------:|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `/modules/drive/service/file/list/`     | query_params `{page_token, page_size(int), query}` | `page_size` refers to the maximum number of files to return per page and `page_token` for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response. Pass the query param `query` as `mimeType!='application/vnd.google-apps.folder'` if you want to get only files.  Pass the query param `query` as `mimeType='application/vnd.google-apps.folder'` if you want to get only folders. To get a specific file or folder pass the query param `query` as `name='file_name_with_extension'`. |
| `/modules/drive/service/upload/file/`   |              `file, parent_folder_id`              | Takes a file with `content-type: multipart/form-data`,and folder_id as `parent_folder_id` where file will be uploaded.                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `/modules/drive/service/create/folder/` |                  `{folder_name}`                   | Takes object containing the `folder_name` who is going to be created.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `/modules/drive/service/share/file/`    |        `{file_id, role, user_type, emails}`        | Takes an object containing `file_id` for the file being shared with users, `role` The role granted for the permissions. Supported values for role are `[writer, commenter, reader]`.  `user_type` The type of the grantee. Valid values are: `[user, group, domain, anyone]`. `emails` The email addresses of the user or group to with file is being shared.                                                                                                                                                                                                       |


## Module Specifications

Here is
the [Module Specification Document](https://docs.google.com/document/d/1NFZVf_KH2s4cWcYsVeL1wQRYfOmP243EvWL-2LLQO9Y/edit?usp=sharing),
which provides more information about the module's actual intentions.

## Postman Collection

Here is a collection of all the api endpoints for the module.
[Django Drive Postman Collection](https://drive.google.com/file/d/1AMrp-LMT3jI-h4Gozbmz9yQYXyj5R-10/view?usp=share_link)

