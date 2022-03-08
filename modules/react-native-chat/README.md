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
By clicking the "Create group" button new groups can be created using group name.
### Add members
New members can be added from contact list in the existing group.
### Remove members
Members from the group can be removed from chat details.
### Leave group
In chat details you can leave channel.
### Create direct chat
One-to-one chat can be created by clicking the "New chat" button. In this way, a personal conversation can be started with any member of the contact list.
### Chat
Clicking on conversation list chat can be started with any of selected member. This allows real-time communication.  
### Send image
Send image in chat by clicking on "+" icon. Max image size must be less than 5mb.
### Send video
Send video in chat by clicking on "+" icon. Max video size must be less than 5mb.
### Change chat Icon
In chat details you can change chat icon by clicking on "edit" button.
### Block user
In chat details you can block user
### History
All previous text, images and videos history is available in one to one and group chat.
### Search channels
Search functionality is available to find the desired channel from the list of available channels by using the channel name in the search bar.
### Last seen
Last time active status of every contact member in conversation list is available below his/her name.


If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import Chat from "@modules/chat";

const { title, navigator } = Chat;
```