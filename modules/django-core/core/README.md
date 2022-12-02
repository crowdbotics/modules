
### Add these lines in settings.py to register renderers and middleware

```
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