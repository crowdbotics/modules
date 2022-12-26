## Crowdbotics Google Drive Component - Backend

This module contains all needed resources to get the Google Drive component for React
Native mobile client.

### Settings
In your settings.py add the parent folder id where your files will be uploaded.

```
PARENT_FOLDER : ""
```
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
While making every frequest pass the access token in headers with the `Autherization` tag.

## Api Table
List of api's endpoints with params needed for these apis.

| Api Name                             |                         Params                         | Description     |
| -------------------------------------|:------------------------------------------------------:|-----------------|
| `/modules/drive/files/` |    `{pageToken, PageSize(int), file_name}` optional    | Takes an object containing the `pageSize` which means the url will return the results according to pageSize and `pageToken` is the next page token. To get a specific file or folder pass name of that file/foder as `file_name`, it will return a signle file/folder. Else returns list of the files and folder from user's Google Drive. |
| `/modules/drive/file/upload/` | `file, parents`  | Takes a file with `content-type: multipart/form-data`,and folder_id as `parents` where file will be uploaded. |
| `/modules/drive/folder/create/` | `{folder_name}` | Takes object containing the `folder_name` who is going to be created. |
| `/modules/drive/file/share/` | `{file_id, role, user_type, emails}` | Takes an object containing `file_id` for the file beign shared with users, `role` The role granted for the permissions. Supported values for role are `[writer, commenter, reader]`.  `user_type` The type of the grantee. Valid values are: `[user, group, domain, anyone]`. `emails` The email addresses of the user or group to with file is being shared.|



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
