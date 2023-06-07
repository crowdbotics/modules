# Slack

Module to send Slack messages with or without Attachments.

- Send Message with Attachment
- Send Message without Attachment 

# Environment variables

```
SLACK_BOT_TOKEN = ""
```

To get the slack token user have to visit the "https://api.slack.com/apps/" and create new app and scroll down to section 
"Add feature and functionality" then select "bot" then select "review scopes to add" then scroll down to scopes section 
and add "chat:write, files:write" after adding the scopes scroll up to "OAuth Tokens for Your Workspace" section and
install bot to workspace then copy the "Bot User OAuth Token" and paste the token in env file then get token from env to settings file 
and assign it to the variable the name of the variable should be "SLACK_BOT_TOKEN"


## Api Table
List of api's endpoints with params needed for these apis.

| Api Name                                        |                       Param                       | Description                                                                                        |
|-------------------------------------------------|:-------------------------------------------------:|:---------------------------------------------------------------------------------------------------|
| `/slack/service/send-message/`                  |      form-data `file, message, channel_name`      | Takes files, message, channel name and send the message with file to respective channel.           |
| `/slack/service/upload-file/`                   |   body `{"message" : "", "channel_name" : ""}`    | Takes message and channel name and send the message to respective channel.                         |
| `/slack/service/create-channel/`                |           body `{"channel_name" : ""}`            | Takes channel name and create new channel                                                          |
| `/slack/service/invite-user-to-channel/`        |    body `{"channel_id" : "", "user_id" : ""}`     | Takes user id and channel name and added respective user to that channel                           |
| `/slack/service/{channel_name}/get-channel-id/` |                url `company_name`                 | Takes channel name and return channel id                                                           |
| `/slack/service/{channel_id}/channel_history/`  | url `comapny_id` query_param `next_cursor, limit` | Takes channel id and limit and return conversation and channel history                             |
| `/slack/service/{channel_id}/archive_channel/`  |                 url `company_id`                  | Takes channel id and archive that channel                                                          |
| `/slack/service/get_users/`                     |                       None                        | This method returns a list of all users in the workspace. This includes deleted/deactivated users. |

                                                                                         |
