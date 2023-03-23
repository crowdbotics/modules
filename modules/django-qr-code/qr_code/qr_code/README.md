# QRCode
QrCode module we will generate a QR code at the backend, and integrate QR code scanning at the frontend.
The module has ability to scan Qrcode at the frontend from the provided string.

Following dependency is used to generate Qr at the backend 
# Setup
Install the required dependency for the module.
```
pip install qrcode
```
Start the server by running the following command :

```
python manage.py migrate
python manage.py runserver
```

## Api Table
List of api's endpoints with params needed for these apis.

| Api Name                       | Param        | Description                                                    |
| ------------------------------ |:------------:|:---------------------------------------------------------------|
| `/modules/qr-code/qrcode/` | object `{text: 'string'}` | Takes object containing text property inside it, and returns image converted in base64 against that text. |