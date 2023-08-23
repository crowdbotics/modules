## Crowdbotics S3 File Uploader Component - Backend

This module contains all needed resources to get the S3 File Uploader component for React
Native mobile client.



### Installation
1. Add in `.env` file:

```py
AWS_STORAGE_REGION= 'region specified for the user'
AWS_ACCESS_KEY_ID= 'Access key for the user'
AWS_SECRET_ACCESS_KEY= 'Secret key for the user'
PATH_TO_SAVE_FILE= 'path of the directory/folder where file will be downloaded'
```
2. Install the boto3 AWS SDK for Python:

```py
pip install boto3
```

Run the following commands to get started:

```
python manage.py migrate
python manage.py runserver
```


## Api Table
List of api's endpoints with params needed for these apis.

|                        Api Name                         |                        Params                         | Description                                                                                                                              |
|:-------------------------------------------------------:|:-----------------------------------------------------:|------------------------------------------------------------------------------------------------------------------------------------------|
|    `/modules/s3-file-uploader/service/bucket/list/`     |                           -                           | Retrieve the list of existing buckets specified to the account.                                                                          |
|   `/modules/s3-file-uploader/service/bucket/create/`    |                      `{bucket}`                       | Takes a object with `bucket` name to be created on aws.                                                                                  |
|   `/modules/s3-file-uploader/service/bucket/remove/`    |                 `{bucket, owner_id}`                  | Takes object containing the `bucket` name of the bucket and `owner_id` of the bucket owner.                                              |
|    `/modules/s3-file-uploader/service/file/upload/`     |                   `{file, bucket, user_id}`                    | Takes an object containing `file` to upload and `bucket` where the file will be uploaded. `user_id` specified to the user who is uploading the file. Uploads file to the bucket. |
|   `/modules/s3-file-uploader/service/file/download/`    |           query_params `file_name, bucket`            | Downloads file from the bucket and saves it at `PATH_TO_SAVE_FILE` specified in the `.env` file.                                         |
|    `/modules/s3-file-uploader/service/file/remove/`     |                 `{file_name, bucket, user_id}`                 | Takes an object containing `bucket` where the file exist and `file_name` to be deleted. `user_id` specified to the user who is deleting the file. Deletes the s3 object from the specified bucket. |
| `/modules/s3-file-uploader/service/file/presigned/url/` | query_params `file_name, bucket, expiration(seconds)` | Generates link for the `file_name` with the time limit specified through `expiration` time.  Presigned URLs is to grant a user temporary access to an S3 object.                                            |
