# Django Camera

Django Camera module is a backend module for the React Native Camera Module. This module stores images in the database and retrieves images from the database for a specific user.

## Features

1. Store/upload images in the database for a specific user.
2. Retrieve images from the database for a specific user.


## Features

- [x] This module includes migrations.
- [ ] This module includes environment variables.
- [ ] This module requires manual configurations.
- [ ] This module can be configured with module options.

## API details

List of api's endpoints with params needed for these apis.

| Api Name                       | Param        | Description                                                    |
| ------------------------------ |:------------:|:---------------------------------------------------------------|
| `/modules/camera/photos/user/` | -No Params-  | Returns array of the images uploaded by the user. |
| `/modules/camera/upload_image/`|  object `{name, uri, type, data}`  |Gets object of image containing name, type uri and data about the image.             |


### Module Specifications

Here is the [Module Specification Document](https://docs.google.com/document/d/197btS3Arq50GvivzCuCwOOp299E6i10O67jMBt3ZfoI/edit), which provides more information about the module's features.
