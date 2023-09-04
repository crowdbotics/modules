## Django Signature backend configuration and information

## Module description

Module have the ability to upload their signatures created from frontend to database.

Features included:

- It supports the frontend digital signature feature which store on the backend.

## Features

- [x] This module includes migrations.
- [ ] This module includes environment variables.
- [ ] This module requires manual configurations.
- [ ] This module can be configured with module options.

## Environment variables

No environment variables are required.

## 3rd party setup

No 3rd party setup is required for this module.

## Dependencies

No dependencies are required.

## API details

| Api Name                                       |                 Param                  | Description                                                                                |
|------------------------------------------------|:--------------------------------------:|:-------------------------------------------------------------------------------------------|
| `/modules/signature/upload_signature/` `POST`  | body_param `{image: 'base64(string)'}` | Takes object containing image property whose value is an image converted in base64 string. |
| `/modules/signature/signature/{id}/` `GET`     |            path_param `id`             | Takes uploaded signature id and return specific signature image details.                   |
