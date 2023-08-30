## Django Terms And Conditions backend configuration and information

## Module description

This module used to create and manages the terms and conditions for app users.

## Features

- [x] This module includes migrations.
- [ ] This module includes environment variables.
- [ ] This module requires manual configurations.
- [ ] This module can be configured with module options.

## Environment variables

No environment variables are required.

## 3rd party setup

No 3rd party setup is required.

## Dependencies

No dependencies are required.

## API details

| Api Name                                        |                             Param                              | Description                                                        |
|-------------------------------------------------|:--------------------------------------------------------------:|:-------------------------------------------------------------------|
| `/modules/terms-and-conditions/` `POST`         | body_params `{'author': 'user_foreign_key', 'body': "string"}` | This will used to create a terms and condition.                    |
| `/modules/terms-and-conditions/` `GET`          |                               -                                | This will used to return a list of terms and conditions.           |
| `/modules/terms-and-conditions/<pk>/ ` `GET`    |                       path_params `{id}`                       | This will used to return a detail of specific terms and condition. |
| `/modules/terms-and-conditions/<pk>/ ` `DELETE` |                       path_params `{id}`                       | This will used to delete a terms and condition.                    |
