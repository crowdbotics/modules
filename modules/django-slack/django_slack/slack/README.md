## Django Slack backend configuration and information

## Module description

By using this module, users will be able to deliver reminders, teammates, upload files and send messages in channels and
DMs through slack bot.

The following are the scope features of this module:

- Slack Authentication Access Token
- Get users list
- Send message
- Upload files
- Create channels
- Get specific channel id
- Get specific channel history
- Invite user to channel
- Archive channel

## Features

- [ ] This module includes migrations.
- [x] This module includes environment variables.
- [x] This module requires manual configurations.
- [ ] This module can be configured with module options.

## Environment variables

```dotenv
SLACK_BOT_TOKEN=""
```

## 3rd party setup

Create `Slack API` developer account setup:

- To get the slack token user have to visit the [Slack API](https://api.slack.com/apps/).
- click on `Create New App` and scroll down to section.
- "Add feature and functionality" then select `bot` then select `review scopes to add` then scroll down to scopes
  section
- Add `chat:write, files:write` after adding the scopes scroll up to `OAuth Tokens for Your Workspace` section
- Install bot to workspace then copy the `Bot User OAuth Token` and paste the token in env file then get token from env
  to settings file
- Assign it to the variable the name of the variable should be `SLACK_BOT_TOKEN`.
  ![screenshot-nimbusweb me-2023 03 24-15_14_46](https://user-images.githubusercontent.com/120275623/227494434-9983e205-dab8-44b1-845c-947ad69f923c.png)

## Dependencies

[Slack-SDK](https://github.com/slackapi/python-slack-sdk/blob/main/README.md)

Dependencies used:

- [slack-sdk==3.19.5](https://pypi.org/project/slack-sdk/)

## API details

| Api Name                                                       |                                 Param                                  | Description                                                                                        |
|----------------------------------------------------------------|:----------------------------------------------------------------------:|:---------------------------------------------------------------------------------------------------|
| `/modules/slack/service/send-message/` `POST`                  |          body_params `{"message" : "", "channel_name" : ""}`           | Takes files, message, channel name and send the message with file to respective channel.           |
| `/modules/slack/service/upload-file/`  `POST`                  |                form-data `file, message, channel_name`                 | Takes message and channel name and send the message to respective channel.                         |
| `/modules/slack/service/create-channel/`  `POST`               |                  body_params `{"channel_name" : ""}`                   | Takes channel name and create new channel                                                          |
| `/modules/slack/service/invite-user-to-channel/`  `POST`       | body_params `{"channel_id" : "", "channel_name" : "", "emails": [""]}` | Takes user id and channel name and added respective user to that channel                           |
| `/modules/slack/service/{channel_name}/get-channel-id/` `GET`  |                       path_params `company_name`                       | Takes channel name and return channel id                                                           |
| `/modules/slack/service/{channel_id}/channel_history/`  `GET`  |       path_params `channel_id` query_param `next_cursor, limit`        | Takes channel id and limit and return conversation and channel history                             |
| `/modules/slack/service/{channel_id}/archive_channel/`  `POST` |                        path_params `channel_id`                        | Takes channel id and archive that channel                                                          |
| `/modules/slack/service/get_users/`  `GET`                     |                                  None                                  | This method returns a list of all users in the workspace. This includes deleted/deactivated users. |                                                                           |

## Slack Endpoints Postman Collection:

Here is a collection of all the api endpoints for the Slack module.
[Slack-APIs Postman Collection](https://drive.google.com/file/d/1L5Y9Z56f57Ubocz_hI78GFIGK981tABp/view?usp=share_link)

## Module Specifications

Here is
the [Module Specification Document](https://docs.google.com/document/d/1n0yk8fjT1D-Xs05vUUE5K5Y_O9dGS-q6vCxb6srvfoo/edit?usp=sharing),
which provides more information about the module's actual intentions.

