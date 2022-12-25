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
pip install --upgrade google-api-python-client google-auth-httplib2 google-auth-oauthlib
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

| Api Name                             | Params |Description                 |
| -------------------------------------|:------------:|-------------------|
| `/modules/drive/files/` | - | Returns list of the files and folder from user's Google Drive.|
| `/modules/drive/upload/file/` | `file, parents` | Takes a file with `content-type: multipart/form-data`,and folder_id as `parents` where file will be uploaded.|
| `/modules/drive/create/folder/` | `{folder_name}` | Takes object containing the `folder_name` who is going to be created.|
| `/modules/drive/share/file/` | [share_payload](#share-file-payload-object) | see details [here](#share-file-payload-object)|



### Share file Payload Object
Here is the payload needed to share a file or folder with some specific user

```
{
   "file_id": "File id going to be shared with user",
   "request_body": {
        "role": "writer",                               // role can be: writer or reader
        "type": "user",                                 // type of the user: user, anyone
        "emailAddress": "demomodule.123@gmail.com"      // email address of the user sharing file with only if the `type: "user"
   }
}
```
