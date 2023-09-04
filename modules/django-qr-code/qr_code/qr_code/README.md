## Django QR Code backend configuration and information

This module is used to generate a QR code at the backend. It has ability to scan Qrcode at the frontend from the provided string.

Features included:

- Ability to generate Qrcode at backend

## Features

- [ ] This module includes migrations.
- [ ] This module includes environment variables.
- [x] This module requires manual configurations.
- [ ] This module can be configured with module options.

## Environment variables

No environment variables are required.

## 3rd party setup

No 3rd party setup is required for this module.

## Dependencies

[QR-Code](https://github.com/lincolnloop/python-qrcode/blob/main/README.rst)

Dependencies used:

- [qrcode](https://pypi.org/project/qrcode/)

## API details

| Api Name                           |           Param           | Description                                                                                               |
|------------------------------------|:-------------------------:|:----------------------------------------------------------------------------------------------------------|
| `/modules/qr-code/qrcode/`  `POST` | object `{text: 'string'}` | Takes object containing text property inside it, and returns image converted in base64 against that text. |
