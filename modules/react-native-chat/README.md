# Chat

## Documentation

Based on pubnub https://www.pubnub.com/

https://www.npmjs.com/package/pubnub-react

```
yarn add pubnub-react
```
### Configurations Keys
```
PUBNUB_PUB = "...”
PUBNUB_SUB = "..."
ENDPOINT = "..."
FILESTACK_KEY = "..."
```

## Initialize Pubnub
```
const client = new Pubnub({
  subscribeKey: options.PUBNUB_SUB,
  publishKey: options.PUBNUB_PUB,
  uuid
});
```
## Features

### Create group
Create new group by clicking on "Create group" button
### Add members
Select group members from the list of contacts
### Remove members
In chat details you can remove group members
### Leave group
In chat details you can leave channel
### Create direct chat
Create one to one chat by clicking on "New chat" button
### Chat
Start chat by clicking on conversation list
### Send image
Send image in chat by clicking on "+" icon. Max image size must be less than 5mb.
### Send video
Send video in chat by clicking on "+" icon. Max video size must be less than 5mb.
### Change chat Icon
In chat details you can change chat icon by clicking on "edit" button.
### Block user
In chat details you can block user
### History
### Search channels
### Last seen

If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import Chat from "@modules/chat";

const { title, navigator } = Chat;
```