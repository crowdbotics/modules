## Django import export csv backend configuration and information

## Module description

This module contains application and library for importing and exporting data with included admin integration.

The following are the critical features in scope for this module.

- Ability to import files from admin panel.
- Ability to export files from admin panel.

## Features

- [ ] This module includes migrations.
- [x] This module includes environment variables.
- [x] This module requires manual configurations.
- [ ] This module can be configured with module options.

## Environment variables
Add following in your project's settings file.

```settings.py
INSTALLED_APPS = (
    'import_export',
)
```

Please import the following into your App's admin file and register the admin model with it.

```admin.py
from modules.django_import_export_csv.import_export_csv.admin import ImportExportAdmin
```

## 3rd party setup

No third-party account creation needed.

## Dependencies

[Django Import Export](https://github.com/django-import-export/django-import-export/blob/main/README.rst)

Dependencies used:

[django-import-export](https://pypi.org/project/django-import-export/)

## API details

No api details.