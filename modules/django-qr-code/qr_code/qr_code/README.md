# QRCode

Following dependency is used to generate Qr at the backend 
```
pip install qrcode
```
Start the server by running the following command :

```
python manage.py runserver
```

## Api Table
List of api's endpoints with params needed for these apis.

| Api Name                       | Param        | Description                                                    |
| ------------------------------ |:------------:|:---------------------------------------------------------------|
| `/modules/qr-code/qrcode/` | object `{text: 'string'}` | Takes object containing text property inside it, and returns image converted in base64 against that text. |