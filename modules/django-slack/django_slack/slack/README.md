# Slack
By using this module, users will be able to deliver reminders, teammates, upload files and send messages in channels and DMs through slack bot.

# Features
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

# Setup

 Run the following commands to get started:

```
python manage.py migrate
python manage.py runserver

```

# Environment variables

```
SLACK_BOT_TOKEN = ""
```

1. To get the slack token user have to visit the "https://api.slack.com/apps/"
2. Create new app and scroll down to section 
3. "Add feature and functionality" then select "bot" then select "review scopes to add" then scroll down to scopes section 
4. Add "chat:write, files:write" after adding the scopes scroll up to "OAuth Tokens for Your Workspace" section
5. Install bot to workspace then copy the "Bot User OAuth Token" and paste the token in env file then get token from env to settings file 
6. Assign it to the variable the name of the variable should be "SLACK_BOT_TOKEN"


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
| `/slack/service/get_users/`                     |                              None                               | This method returns a list of all users in the workspace. This includes deleted/deactivated users. |

                                                                                         |
