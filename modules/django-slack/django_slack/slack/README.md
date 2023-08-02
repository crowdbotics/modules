# Slack

By using this module, users will be able to deliver reminders, teammates, upload files and send messages in channels and
DMs through slack bot.

## Scope Features

The following are the critical features in scope of this module.

1. Slack Authentication Access Token
2. Get users list
3. Send message
4. Upload files
5. Create channels
6. Get specific channel id
7. Get specific channel history
8. Invite user to channel
9. Archive channel

## Required SDKs and Libraries

To implement the module, the following assets shall be required:

- [slack-sdk](https://pypi.org/project/slack-sdk/)

Can be install by the follwing command:

- pip install slack-sdk

And add this packages in `pipfile`

```
slack-sdk="3.20.2"
```

## Keys And Credientials Setup

Get the Slack APi keys and credientials by the following steps:

1. To get the slack token user have to visit the "https://api.slack.com/apps/"
2. Create new app and scroll down to section
3. "Add feature and functionality" then select "bot" then select "review scopes to add" then scroll down to scopes
   section
4. Add "chat:write, files:write" after adding the scopes scroll up to "OAuth Tokens for Your Workspace" section
5. Install bot to workspace then copy the "Bot User OAuth Token" and paste the token in env file then get token from env
   to settings file
6. Assign it to the variable the name of the variable should be "SLACK_BOT_TOKEN"
   ![screenshot-nimbusweb me-2023 03 24-15_14_46](https://user-images.githubusercontent.com/120275623/227494434-9983e205-dab8-44b1-845c-947ad69f923c.png)

## Environment variables

```
SLACK_BOT_TOKEN = ""
```

## Setup Installation

To install the given dependencies in `setup.py`. Go to the `modules/django-slack/slack/` and run the following command:

```
python -m pip install .
```

Run the following commands to get started:

```
python manage.py migrate
python manage.py runserver
```

## Api Table

List of api's endpoints with params needed for these apis.

| Api Name                                        |                              Param                              | Description                                                                                        |
|-------------------------------------------------|:---------------------------------------------------------------:|:---------------------------------------------------------------------------------------------------|
| `/slack/service/send-message/`                  |          body `{"message" : "", "channel_name" : ""}`           | Takes files, message, channel name and send the message with file to respective channel.           |
| `/slack/service/upload-file/`                   |             form-data `file, message, channel_name`             | Takes message and channel name and send the message to respective channel.                         |
| `/slack/service/create-channel/`                |                  body `{"channel_name" : ""}`                   | Takes channel name and create new channel                                                          |
| `/slack/service/invite-user-to-channel/`        | body `{"channel_id" : "", "channel_name" : "", "emails": [""]}` | Takes user id and channel name and added respective user to that channel                           |
| `/slack/service/{channel_name}/get-channel-id/` |                       url `company_name`                        | Takes channel name and return channel id                                                           |
| `/slack/service/{channel_id}/channel_history/`  |        url `channel_id` query_param `next_cursor, limit`        | Takes channel id and limit and return conversation and channel history                             |
| `/slack/service/{channel_id}/archive_channel/`  |                        url `channel_id`                         | Takes channel id and archive that channel                                                          |
| `/slack/service/get_users/`                     |                              None                               | This method returns a list of all users in the workspace. This includes deleted/deactivated users. |                                                                           |

## Slack Endpoints Postman Collection:

Here is a collection of all the api endpoints for the Slack module.
[Slack-Apis Postman Collection](https://drive.google.com/file/d/1L5Y9Z56f57Ubocz_hI78GFIGK981tABp/view?usp=share_link)

## Module Specifications

Here is
the [Module Specification Document](https://docs.google.com/document/d/1n0yk8fjT1D-Xs05vUUE5K5Y_O9dGS-q6vCxb6srvfoo/edit?usp=sharing),
which provides more information about the module's actual intentions.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
