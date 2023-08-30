## Django Core backend configuration and information

## Module description

This module used to handle custom Response and Exceptions.
Response Handling used for creating and sending HTTP responses to clients, including content and status codes.
Exception Handling manages errors during request processing, enabling developers to handle exceptions, such 
as rendering custom error or dealing with specific HTTP status codes.

## Features

- [ ] This module includes migrations.
- [ ] This module includes environment variables.
- [x] This module requires manual configurations.
- [ ] This module can be configured with module options.

## Environment variables

No environment variables are required.

#### Add these lines in `settings.py` to register renderers and middleware

```settings.py
REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': (
        'modules.core.response_renderer.CustomJSONRenderer',
    ),
}
```
```
MIDDLEWARE = [
    'modules.core.exception_handler.ApiExceptionResponse',
]

```

## 3rd party setup

No 3rd party setup is required.

## Dependencies

No dependencies are required.

## API details

No API details for this module.
