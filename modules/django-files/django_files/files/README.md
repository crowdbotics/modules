# Files Module - Backend

This module contains all needed resources to get the Files component for React
Native mobile client.
- This module uses file storage. You should enable S3 support
  in your Crowdbotics app in order to get it working properly.
- If file is submitted in base64, a special header must be used
  in order to preserve the extension: "data:[filename.ext];base64," 
  (i.e. "data:my_diapos.ppt;base64,{BASE64_ENCODED-CONTENT}")

## Scope Features
The following are the critical features in scope for this module.
1. Ability to upload the file.
2. Ability to get the uploaded file.
3. Ability to update the uploaded file.
4. Ability to delete the uploaded file.
## Setup
Run the following command for migrations:
```
python manage.py makemigrations
``` 
Run the following command to run migrations:
```
python manage.py migrate

```
Start the server by running the following command :
```
python manage.py runserver
```

## Api Table
List of api's endpoints with params needed for these apis.

| Api Name                                        |                       Param                       | Description                                                                                        |
|-------------------------------------------------|:-------------------------------------------------:|:---------------------------------------------------------------------------------------------------|
| `/modules/files/uploads/`                  |      form-data `file, user, title, description`      | Takes file, user, title and description of the file.           |

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)