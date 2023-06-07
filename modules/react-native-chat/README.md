# Chat

Based on the [PubNub](https://www.pubnub.com/) service.

https://www.npmjs.com/package/pubnub-react

## Configurations Keys

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


## Manual Setup

1. If you want to use the module directly, or in other modules, you can do so by importing it and using the following properties.

```javascript
import Chat from "@modules/chat";

const { title, navigator } = Chat;
```

2. You can call module directly by importing navigator without going through any routing. And pass the params to the module.

```javascript
import { modules } from '@modules';
const Chat = modules[module_index].value.navigator;  //module_index : position of the module in modules folder
<Chat />
```


## Pubnub chat methods

Below is the list of  the major functions used to create the chat modules.

| Name              | Params              |  Description                                       |
| ----------------- |:-------------------:|:---------------------------------------------------|
| fetchChannels     | ` pubnub, userId ` |Takes `pubnub` instance, and `userId`. Returns a list of all channels against the user_id.|
| setChannelMembers | ` pubnub, channelId, memberId ` |Takes `pubnub` instance, `channelId` and `memberId`. Adds new user in channel whose id is passed. |
| removeChannelMembers | ` pubnub, channelId, memberId ` |Takes `pubnub` instance, `memberId` and `channelId`. Removes user from the channel whose id is passed.|
| removePubnubChannel| ` pubnub, userId, channelId ` |Takes `pubnub` instance, `userId` and `channelId`. Deletes channel from user's channels list.|
| leavePubnubChannel| ` pubnub, userId, channelId ` |Takes `pubnub` instance, `userId` and `channelId`. Removes user from channel and channel is deleted from the user's channel list.|
| createGroupChannel| ` pubnub, chatWithContactsIds, userId, customData ` |Takes `pubnub` instance, `userId` of the user who is creating channel, `chatWithContactsIds` of users going to be added in the group and `customData` for the channel being created. Creates group chat with selected users.|
| createDirectChannel|` pubnub, userId, chatWithId, customData ` |Takes `pubnub` instance, `userId` of the user who is creating channel, `chatWithId` id of the second user and `customData` for the channel being created. Creates direct chat between two users.|
| setChannelMetadata|` pubnub, channelId, data` |Takes `pubnub` instance, `channelId` of the channel whose data needs to be updated. Updates the channel according to the provided `data`.|




https://user-images.githubusercontent.com/76822297/176646195-11c59762-841f-4612-a411-16a37e152c8b.mp4

