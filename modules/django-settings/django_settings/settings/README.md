## Django Setting backend configuration and information

## Module description

The Django Setting module enables users to customize their app experience by managing various settings. Users
can easily enable or disable individual settings and select multiple settings as their defaults. App owners have the
capability to create and manage settings and states, allowing for a flexible and customizable user experience.

The Features of this module are following:

- User can get the all settings.
- User can enable or disable selected setting.

#### Requirements

To make the most of the Setting Module, simply follow these steps:

- As an app owner, you have the authority to create and manage various settings and state choices.
- Define the settings that users can customize and the available state choices associated with them.
- When a user registers within the app, they will be automatically assigned the default settings defined by the app
  owner.
- Users can then customize these settings according to their preferences.

## Features

- [x] This module includes migrations.
- [ ] This module includes environment variables.
- [x] This module requires manual configurations.
- [ ] This module can be configured with module options.

## Environment variables

No environment variables used.

## 3rd party setup

No 3rd party setup need.

## Dependencies

No dependencies used

## API details

| Api Name                                                    |                                                  Param                                                  | Description                                                                                                       |
|-------------------------------------------------------------|:-------------------------------------------------------------------------------------------------------:|-------------------------------------------------------------------------------------------------------------------|
| `/modules/settings/get_settings/` <br /> method: `GET`      |                                                    -                                                    | Returns List of all setting related to user with active setting choices.                                          |
| `/modules/settings/update_settings/` <br /> method: `PATCH` | object <br /> `{ "setting": "setting_id", "current_choices": "state choice_id from StateChoices list"}` | Given an object containing the settings to be updated and a new choice, this function returns the updated object. |
