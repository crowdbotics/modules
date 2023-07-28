# Profile Module -Backend
This module allows the user to view, delete and edit its own profile information.

## Scope Features
The following are the key features in scope for this module. 
1. Ability to create the profile with details.
2. Ability to get the specific profile.
3. Ability to update the profile.
4. Ability to delete the profile.

## Required SDKs and Libraries
A 3rd party integration requirements which is:
- [django-countries](https://pypi.org/project/django-countries/)
- [asgiref](https://pypi.org/project/asgiref/)
- [django-phonenumber-field](https://pypi.org/project/django-phonenumber-field/)
- [django-phonenumbers](https://pypi.org/project/django-phonenumbers/)

Can be installed by following command:
- pip install django-countries==7.5
- pip install asgiref==3.6.0
- pip install django-phonenumber-field==4.0.0
- pip install django-phonenumbers

And add these packages in `pipfile`
```
django-countries="7.5"
asgiref="3.6.0"
django-phonenumber-field="4.0.0"
django-phonenumbers="1.0.1"
```
These SDKs is provided as open source, which enables you to customize its functionality to suit your particular use case.


## Setup Installation
To install the given dependencies in `setup.py`. Go to the `backend/modules/profile/profile/` and run the following command:
```
python -m pip install .
```

After Installing this package user have to add "Profile" to installed Apps in settings.py file <br>

``
INSTALLED_APPS = ['Profile']
``

Before starting the server run:

```sh
python manage.py migrate
```
Start the server by running the following command :
```
python manage.py runserver
```

## Api Table
List of api's endpoints with params needed for these apis.

| Api Name                           |         Param          | Request Method | Description                                                           |
|------------------------------------|:----------------------:|----------------|:----------------------------------------------------------------------|
| `module/profile/user-profile/`     |          None          | GET            | Get all the user profiles.                                            |
| `module/profile/user-profile/`     |      request.body      | POST           | Update user if user profile is already exist else create user profile |
| `module/profile/user-profile/{id}` | request.body, url `id` | PATCH          | Update Single Field of Profile Table                                  |
| `module/profile/user-profile/{id}` |        url `id`        | GET            | Get Specific user profile based on user id                            |
| `module/profile/user-profile/{id}` |        url `id`        | DELETE         | Delete user profile.                                                  |

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.
## License
[MIT](https://choosealicense.com/licenses/mit/)
