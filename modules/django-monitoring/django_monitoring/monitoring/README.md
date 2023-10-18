## Django Monitoring backend configuration and information

## Module description

This backend module enables automatic reporting of errors and exceptions as well as performance monitoring. The users can track and identify any errors or performance issues that occur while your application is in production.

The following are the scope features of this module:

- Ability to capture:
    - Errors
    - Uncaught Exceptions
    - Unhandled Rejections
    - As well as other types of errors, depending on the platform.
- Ability to watch error logs in Sentry/Issues dashboard. 

## Features

- [ ] This module includes migrations.
- [x] This module includes environment variables.
- [x] This module requires manual configurations.
- [ ] This module can be configured with module options.

## Environment variables

```dotenv
SENTRY_DSN_URL="Your Sentry Project DSN Url"
```
```settings.py
from modules.django_monitoring.monitoring.sentry_configurations import *
```

## 3rd party setup

For implementation of this module, the 3rd party  setup is required:

- Create a [developer account](https://sentry.io/signup/) on Sentry
- By adding your relevant information and clicking on the Create Your Account button, your account will be created.
- Choose your project framework and set up Sentry configuration to generate the DSN URL. This URL will be used in your project to receive reports of errors and exceptions, allowing you to effectively manage issues as they occur.
- Go to your project settings, then click on "Client Keys (DSN)" and copy your "SENTRY_DSN_URL" and add in your project.

![sentry_client](https://github.com/cbshoaib/modules/assets/120275623/cecc310e-6134-450e-8d68-326de3146320)

## Dependencies

[Sentry](https://github.com/getsentry/sentry-python/blob/master/README.md)

Dependencies used:

- [sentry-sdk](https://pypi.org/project/sentry-sdk/)

## API details

No API details for this module.

## Module Specifications

Here is
the [Module Specification Document](https://docs.google.com/document/d/1BpX1jfGgt3FI0REn6vYOlyg0PUSy-YCnA3mhaoD2BQU/edit?usp=sharing),
which provides more information about the module's actual intentions.
