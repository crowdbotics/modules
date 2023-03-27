# Signature
In this module users have the ability to upload their signatures created from frontend to database.

## Scope Features
This module support the frontend digital signature feature which store on the backend.

## Setup Installation
For makemigrations:
```
python manage.py makemigrations
```
 Run the following commands to get started:

```
python manage.py migrate
python manage.py migrate
```

## Api Table
List of api's endpoints with params needed for these apis.

| Api Name                       | Param        | Description                                                    |
| ------------------------------ |:------------:|:---------------------------------------------------------------|
| `/modules/signature/upload_signature/` | object `{image: 'base64(string)'}` | Takes object containing image property whose value is an image converted in base64 string.|

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)