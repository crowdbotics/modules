# Okta

## Update Settings
In `settings.py` add the following:

```py
MIDDLEWARE += ['modules.django_okta.okta.custom_middleware.OktaTokenValidator']
OKTA_BASE_URL = "https://{your_Okta_domain}/api/v1"
OKTA_API_TOKEN = "Token created on Okta"
```

## Migration
Run the following command to get migrations

```console
python manage.py makemigrations
python manage.py migrate

```

Start the server by running the following command :

```console
python manage.py runserver
```

## Api Table
List of api's endpoints with params needed for these apis.

| Api Name                       | Param        | Description                                                    |
| ----------|:------------:|:---------------------------------------------------------------|
| `login/` | object `{username, password}` | Takes object containing username and password of the user.|
| `logout/` | object `{stateToken: ""}` | To logout a user, pass the state token assigned to the user.|
| `create-user/` | `user_object` | See details bellow|

### * **user_object**
User object contains the user details that is going to be added. this `user_object` will look something like this:

```javascript
{
  profile: {
    firstName: "john",
    lastName: "doe",
    email: "john6551@doe.com",
    login: "john6551@doe.com",
    mobilePhone: "555-456-5337"
  },
  credentials: {
    password : { value: "john123" }
  }
}
```