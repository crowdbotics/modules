
### Add these lines in settings.py to register renderers and middleware

```
REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': (
        'modules.core.JSONRenderer.ApiRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ),
}
```

```
MIDDLEWARE = [
    'modules.core.ApiMiddleware.ApiResponse',
]
```