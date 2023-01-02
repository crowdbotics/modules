## Crowdbotics Google Drive Component - Backend

This module contains all needed resources to get the Google Drive component for React
Native mobile client.


### How to obtain the credential file 
In https://console.cloud.google.com/ choose your project or start new one.

In the navigation menu choose "APIs & Services" enable new APIs and then look up "calendar API", enable the API

Under "APIs & Services">"Credentials", select "Create Credentials" and click on "service account", fill in the desired name, and continue. Set role as owner(or other desired)(owner gives full access you you might want to switch to something less powerful). Click "Done"

This will redirect you to the credentials page. Under the "Service accounts" click on the desired account(this will redirect you to the IAM & Admin panel) Under the tab "Keys" click "ADD KEY" and select json, this will download a json file to your computer.

Add that file into project directory and set the file path to "CREDENTIAL_FILE_PATH" variable in .env

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
   role: "writer",                                         // role can be: reader(only reade permisions) or writer(reade and write permisions)
   user_type: "user",                                      // type of the user: user, anyone
   emails: ["john123@gmail.com", "john.snow@gmail.com"]    // email address of the users sharing file with only if the "user_type=user"
}
```
