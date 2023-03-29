# Django QRCode
Django QrCode module is a backend support for the React Native Qrcode module which will generate a QR code at the backend, and integrate QR code scanning at the frontend. The module has ability to scan Qrcode at the frontend from the provided string.


## Features
1. Ability togenerate Qrcode at backend

## Required Packages/Dependencies
* **qrcode**
`qrcode` python package that generates qrcode as png images.
Install using the following command:

```console
pip install qrcode
```
***Note***: Keep the packages/dependencies in `Pipfile`. So that when backend is deployed our module requirements are complete.


## Setup
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


### Module Specifications
Here is the [Module Specification Document](https://docs.google.com/document/d/1gAIZIbwjafGHy-jzjMHVckhzud-kS-DswQ0UT4Zk9JM/edit?usp=sharing), which provides more information about the module's actual intentions.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)