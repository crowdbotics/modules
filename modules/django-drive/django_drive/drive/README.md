## Crowdbotics Google Drive Component - Backend

This module contains all needed resources to get the Google Drive component for React
Native mobile client.

## Features
1. get drive files
2. Create drive folder
3. Upload drive files
4. Share drive files



## Required Dependencies/Packages

* **google-api-python-client**
`google-api-python-client` The Google API Client Library for Python is designed for Python client-application developers. It offers simple, flexible access to many Google APIs.

* **google-auth-httplib2**
`google-auth-httplib2` This library simplifies using Google's various server-to-server authentication mechanisms to access Google APIs.

* **google-auth-oauthlib**
`google-auth-oauthlib` Google authentication library for Python. This library provides the ability to authenticate to Google APIs using various methods. It also provides integration with several HTTP libraries.

Install the packages by running the command:
```console
pip install google-api-python-client google-auth-httplib2 google-auth-oauthlib
```

### How to obtain the credential file 
1. On [Google Cloud Console](https://console.cloud.google.com/) choose your project or start new one.
2. In the navigation menu choose `APIs & Services` enable new APIs and then look up `Calendar API`, enable the API.
3. Under `APIs & Services >> Credentials`, select `Create Credentials` and click on `service account`, fill in the desired name, and continue. Set role as owner(or other desired)(owner gives full access you you might want to switch to something less powerful). Click `Done`.
4. This will redirect you to the credentials page. Under the `Service accounts` click on the desired account(this will redirect you to the IAM & Admin panel) Under the tab `Keys` click `ADD KEY` and select json, this will download a json file to your computer.

5. Add that file into project directory and set the file path to `CREDENTIAL_FILE_PATH` variable in `.env` file.


### Installation
Install the Google client library for Python:

```py
pip install google-api-python-client google-auth-httplib2 google-auth-oauthlib
```

Run the following commands to get started:

```
python manage.py migrate
python manage.py runserver
```

### Authenticate Requests 
While making every request pass the google access_token in headers with the `Authorization` tag.

## Api Table
List of api's endpoints with params needed for these apis.

| Api Name                             |                         Params                         | Description     |
| -------------------------------------|:------------------------------------------------------:|-----------------|
| `/modules/drive/service/file/list/` | query_params `{page_token, page_size(int), query}`| `page_size` refers to the maximum number of files to return per page and `page_token` for continuing a previous list request on the next page. This should be set to the value of 'nextPageToken' from the previous response. Pass the query param `query` as `mimeType!='application/vnd.google-apps.folder'` if you want to get only files.  Pass the query param `query` as `mimeType='application/vnd.google-apps.folder'` if you want to get only folders. To get a specific file or folder pass the query param `query` as `name='file_name_with_extension'`.|
| `/modules/drive/service/upload/file/` | `file, parent_folder_id`  | Takes a file with `content-type: multipart/form-data`,and folder_id as `parent_folder_id` where file will be uploaded. |
| `/modules/drive/service/create/folder/` | `{folder_name}` | Takes object containing the `folder_name` who is going to be created. |
| `/modules/drive/service/share/file/` | `{file_id, role, user_type, emails}` | Takes an object containing `file_id` for the file beign shared with users, `role` The role granted for the permissions. Supported values for role are `[writer, commenter, reader]`.  `user_type` The type of the grantee. Valid values are: `[user, group, domain, anyone]`. `emails` The email addresses of the user or group to with file is being shared.|



### Example Object for File Sharing object
Here is the payload needed to share a file or folder with users

```javascript
{
   file_id: "File/Folder id going to be shared with user",
   role: "writer",                                         // role can be: reader(only reade permissions) or writer(reade and write permissions)
   user_type: "user",                                      // type of the user: user, anyone
   emails: ["john123@gmail.com", "john.snow@gmail.com"]    // email address of the users sharing file with only if the "user_type=user"
}
```

## Module Specifications
Here is the [Module Specification Document](https://docs.google.com/document/d/1NFZVf_KH2s4cWcYsVeL1wQRYfOmP243EvWL-2LLQO9Y/edit?usp=sharing), which provides more information about the module's actual intentions.

## Postman Collection for Module APi Endpoints
Here is a collection of all the api endpoints for the module.
[Django Drive Postman Collection](https://drive.google.com/file/d/1AMrp-LMT3jI-h4Gozbmz9yQYXyj5R-10/view?usp=share_link)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
