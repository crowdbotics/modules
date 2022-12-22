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

| Api Name              |                    Param                     | Description                                                                              |
|-----------------------|:--------------------------------------------:|:-----------------------------------------------------------------------------------------|
| `message/attachment/` |    form-data `file, message, channel_name`     | Takes files, message, channel name and send the message with file to respective channel. |
| `message/`            | body `{"message" : "", "channel_name" : ""}` | Takes                                                                                    |
