## Profile Module backend configuration and information

## Module description

This module allows the user to view, delete and edit its own profile information.

The following are the scope features for this module:

- Ability to create the profile with details.
- Ability to get the specific profile.
- Ability to update the profile.
- Ability to delete the profile.

## Features

- [x] This module includes migrations.
- [ ] This module includes environment variables.
- [x] This module requires manual configurations.
- [ ] This module can be configured with module options.

## Environment variables

No environment variables are required.

## 3rd party setup

No 3rd party setup is required for this module.

## Dependencies

[Django Countries](https://github.com/SmileyChris/django-countries/blob/main/README.rst)\
[Asgiref](https://github.com/django/asgiref/blob/main/README.rst)\
[Django Phone number Field](https://github.com/stefanfoulis/django-phonenumber-field/blob/main/README.rst)\
[Django Phonenumbers](https://github.com/daviddrysdale/python-phonenumbers/blob/dev/README.md)

Dependencies used:

- [django-countries==7.5](https://pypi.org/project/django-countries/)
- [asgiref==3.6.0](https://pypi.org/project/asgiref/)
- [django-phonenumber-field==4.0.0](https://pypi.org/project/django-phonenumber-field/)
- [django-phonenumbers](https://pypi.org/project/django-phonenumbers/)

## API details

| Api Name                                      |                                                                   Param                                                                    | Description                                                           |
|-----------------------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------:|-----------------------------------------------------------------------|
| `module/profile/user-profile/`  `GET`         |                                                                    None                                                                    | Get list of all the user profiles.                                    |
| `module/profile/user-profile/`   `POST`       |         body_params `first_name ,last_name ,phone, country, city, state, profile_image, address, zip_code,gender, birthday, age `          | Update user if user profile is already exist else create user profile |
| `module/profile/user-profile/{id}`  `PATCH`   | body_params `first_name ,last_name ,phone, country, city, state, profile_image, address, zip_code,gender, birthday, age `, path_param `id` | Update Single Field of Profile Table                                  |
| `module/profile/user-profile/{id}`   `GET`    |                                                              path_param `id`                                                               | Get Specific user profile based on user id                            |
| `module/profile/user-profile/{id}`   `DELETE` |                                                              path_param `id`                                                               | Delete user profile.                                                  |
