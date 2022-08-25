# Signature

 Run the following commands to get started:

```
python manage.py makemigrations
python manage.py migrate
```

## Api Table
List of api's endpoints with params needed for these apis.

| Api Name                       | Param        | Description                                                    |
| ------------------------------ |:------------:|:---------------------------------------------------------------|
| `/modules/signature/upload_signature/` | object `{image: 'base64(string)'}` | Takes object containing image property whose value is an image converted in base64 string.|