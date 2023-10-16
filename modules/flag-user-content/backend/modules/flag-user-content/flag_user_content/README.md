## Flag user content Backend configuration and information

## Module description

This module will be used to flag user (report) on any type of contents.

The scope features for this module are following:

- Create the report on any contents.
- Get the reported contents list.
- Get the reason's choices list for content report.

## Features

- [x] This module includes migrations.
- [ ] This module includes environment variables.
- [ ] This module requires manual configurations.
- [ ] This module can be configured with module options.

## Environment variables

No environment variables are required.

## ## 3rd party setup

No 3rd party setup is required for this module.

## Dependencies

No dependencies are used.

## API details

| Api Name                                    |                                             Param                                              | Description                                                  |
|---------------------------------------------|:----------------------------------------------------------------------------------------------:|:-------------------------------------------------------------|
| `/modules/flag-user-content/create-report/` | object `{"model_name": "string", "reported_id": "int", "reason": "choices", "other": "text" }` | Return created reported detail with content id.              |
| `/modules/flag-user-content/reported-list/` |                                               -                                                | Return all reports to admin and user's reports to user.      |
| `/modules/flag-user-content/choice-list/`   |                                               -                                                | Return all choices of reason in order to report the content. |
