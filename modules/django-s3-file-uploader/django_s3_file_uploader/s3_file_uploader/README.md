##  S3 File Uploader

This module contains all needed resources to get the S3 File Uploader component for React
Native mobile client.

Features included:
1. Create an amazon s3 bucket
2. Display list of amazon s3 buckets
3. Upload a file in an amazon s3 bucket
4. Download a file from an amazon s3 bucket
5. Delete a file from the s3 bucket
6. Generate a Presigned URL for the s3 object/file
7. Save uploaded file data in database


## Features

- [x] This module includes migrations.
- [x] This module includes environment variables.
- [x] This module requires manual configurations.
- [ ] This module can be configured with module options.

## Environment variables

1. Add in `.env` file:

```py
AWS_STORAGE_REGION= 'region specified for the user'
AWS_ACCESS_KEY_ID= 'Access key for the user'
AWS_SECRET_ACCESS_KEY= 'Secret key for the user'
PATH_TO_SAVE_FILE= 'path of the directory/folder where file will be downloaded'
```

## 3rd Party setup

1. Create a developer account on [AWS Management Console](https://aws.amazon.com/console/). Click on Create a new AWS account.
2. You will be asked to complete a few steps by entering your details. Once you have completed the process you will be directed to your dashboard.
3. On the navigation menu, choose Users.
4. Choose your IAM user name (not the check box).
5. Open the Security credentials tab, and then choose to Create access key.
6. To see the new access key, choose Show. Your credentials resemble the following:
7. Access key ID: AKIAIOSFODNN7EXAMPLE
8. Secret access key: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
9. To download the key pair, choose the Download .csv file. Store the .csv file with keys in a secure location.

## Dependencies

Link to the READMEs of the packages that you used in this module.

Dependencies used:
- [boto](https://pypi.org/project/boto3/)


## API Details

List of the API endpoints with params needed for these apis.

|                                              Api Name                                               |                        Params                         | Description                                                                                                                                                                                        |
|:---------------------------------------------------------------------------------------------------:|:-----------------------------------------------------:|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|                          `/modules/s3-file-uploader/service/bucket/list/`                           |                           -                           | Retrieve the list of existing buckets specified to the account.                                                                                                                                    |
|                         `/modules/s3-file-uploader/service/bucket/create/`                          |                      `{bucket}`                       | Takes a object with `bucket` name to be created on aws.                                                                                                                                            |
|         `/modules/s3-file-uploader/service/owners/{owner_id}/buckets/{bucket_name}/remove/`         |                 `{bucket, owner_id}`                  | Takes object containing the `bucket` name of the bucket and `owner_id` of the bucket owner.                                                                                                        |
|                          `/modules/s3-file-uploader/service/file/upload/`                           |               `{file, bucket, user_id}`               | Takes an object containing `file` to upload and `bucket` where the file will be uploaded. `user_id` specified to the user who is uploading the file. Uploads file to the bucket.                   |
|        `modules/s3-file-uploader/service/buckets/{bucket_name}/files/{file_name}/download/`         |           query_params `file_name, bucket`            | Downloads file from the bucket and saves it at `PATH_TO_SAVE_FILE` specified in the `.env` file.                                                                                                   |
| `/modules/s3-file-uploader/service/users/{user_id}/buckets/{bucket_name}/files/{file_name}/remove/` |            `{file_name, bucket, user_id}`             | Takes an object containing `bucket` where the file exist and `file_name` to be deleted. `user_id` specified to the user who is deleting the file. Deletes the s3 object from the specified bucket. |
|                       `/modules/s3-file-uploader/service/file/presigned/url/`                       | query_params `file_name, bucket, expiration(seconds)` | Generates link for the `file_name` with the time limit specified through `expiration` time.  Presigned URLs is to grant a user temporary access to an S3 object.                                   |

## Module Specifications

Here is the [Module Specification Document](https://docs.google.com/document/d/1bTHuEI7DLKFCFjbCfRJzChKnN7J6JyClD54hnYo8NgQ/edit?usp=sharing), which provides more information about the module's actual features.

## Postman Collection for the API Endpoints

Here is a collection of all the api endpoints for the module.
[S3 File Uploader Postman Collection](https://drive.google.com/file/d/1cXBpjix-Ffx6qyHGliDMhSOY4Ai8F6bw/view?usp=share_link)
