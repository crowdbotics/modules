
import RNFS from "react-native-fs";

export const cloneArray = (data) => {
  return JSON.parse(JSON.stringify(data));
};

export const fetchChannels = (pubnub, userId) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    const channels = {};
    const metadata = await pubnub.objects.getAllChannelMetadata({
      filter: `id LIKE "*${userId}*"`,
      include: { customFields: true }
    });
    metadata.data.forEach(({ id, name, updated, custom }) => {
      channels[id] = {
        id,
        name,
        updated,
        custom: { ...channels[id]?.custom, ...custom }
      };
    });
    resolve(channels);
  });
};

export const timeSince = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
};

export const removeDuplication = (arr) => {
  return arr.filter((v, i, a) => a.findIndex(v2 => (v2._id === v._id)) === i);
};

export const sortArray = (arr) => {
  const newData = removeDuplication(arr);
  return newData
    .sort((a, b) => {
      const keyA = new Date(a.createdAt);
      const keyB = new Date(b.createdAt);
      // Compare the 2 dates
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    })
    .reverse();
};

export function getByValue(arr, value) {
  const result = arr.find(function (o) {
    return o.id === value;
  });
  return result;
}

export const getUrl = async (uri, fileName) => {
  const destPath = `${RNFS.TemporaryDirectoryPath}/${fileName}`;
  await RNFS.copyFile(uri, destPath);
  await RNFS.stat(destPath);
  return destPath;
};

export const loadHistory = (data) => {
  return data.map((obj) => {
    if ("file" in obj) {
      const message = {
        _id: obj.file.id,
        [obj.message.type]: obj.file.name,
        createdAt: obj.message.createdAt,
        user: obj.message.user
      };
      return message;
    } else {
      return obj;
    }
  });
};

export const listener = (state, dispatch) => ({
  message: payload => {
    // channel, subscription, timetoken, message, publisher
    const channelMessages = state.messages[payload.channel] || [];
    state.messages[payload.channel] = [...channelMessages, payload.message];
    dispatch({ messages: state.messages });
  },
  file: envelop => {
    const channelMessages = state.messages[envelop.channel] || [];
    state.messages[envelop.channel] = [...channelMessages, {
      _id: envelop.file.id,
      name: envelop.file.name,
      [envelop.message.type]: envelop.file.url,
      createdAt: new Date((envelop.timetoken / 10000000) * 1000),
      user: state.user
    }];
    dispatch({ messages: state.messages });
  },
  presence: event => {
    // action, channel, occupancy, state
    if (event.channel in state.channels) {
      state.channels[event.channel].last_seen = event?.state?.last_seen;
      dispatch({ channels: state.channels });
    }
  },
  signal: signal => {
  },
  objects: objectEvent => {
  },
  messageAction: messageAction => {
  },
  status: status => {
    dispatch({ status });
  }
});

export const makeChannelsList = (list) => {
  const channels = Object.entries(list).map(([id, rest]) => ({
    id,
    ...rest
  }));
  const DATA = [
    {
      title: "Channels",
      data: channels
        .filter((item) => {
          return item.custom.type === 1;
        })
        .map((obj) => ({ ...obj }))
    },
    {
      title: "Direct Chats",
      data: channels
        .filter((item) => {
          return item.custom.type === 0;
        })
        .map((obj) => ({ ...obj }))
    }
  ];
  return DATA;
};

export const createDirectChannel = (pubnub, userId, chatWithId, customData) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const channel = `${userId}-${chatWithId}`;
    await pubnub.objects.setChannelMetadata({
      channel,
      data: customData
    });
    await pubnub.objects.setChannelMembers({
      channel,
      uuids: [{ id: userId }, { id: `${chatWithId}` }]
    });
    await pubnub.channelGroups.addChannels({
      channels: [channel],
      channelGroup: userId
    });
    resolve({ channel: channel });
  });
};

export const createGroupChannel = async (pubnub, chatWithContactsIds, userId, customData) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const channel = chatWithContactsIds.filter((obj) => { return obj.isSelected; }).map((user) => user._id).join("-");
    await pubnub.objects.setChannelMetadata({
      channel,
      data: customData
    });
    await pubnub.objects.setChannelMembers({
      channel,
      uuids: chatWithContactsIds.filter((obj) => { return obj.isSelected; }).map((user) => user._id)
    });
    await pubnub.channelGroups.addChannels({
      channels: [channel],
      channelGroup: userId
    });
    resolve({ channel: channel });
  });
};

export const setChannelMetadata = (pubnub, channelId, data) => {
  return pubnub.objects.setChannelMetadata({
    channel: channelId,
    data: data
  });
};

export const removePubnubChannel = (pubnub, userId, channelId) => {
  return Promise.all([
    pubnub.objects.removeChannelMetadata({ channel: channelId }),
    pubnub.channelGroups.removeChannels({
      channelGroup: userId,
      channels: [channelId]
    })
  ]);
};

export const leavePubnubChannel = (pubnub, userId, channelId) => {
  return Promise.all([
    pubnub.objects.removeChannelMembers({
      channel: channelId,
      uuids: [userId]
    }),
    pubnub.channelGroups.removeChannels({
      channelGroup: userId,
      channels: [channelId]
    }),
    pubnub.objects.removeChannelMetadata({
      channel: channelId
    })
  ]);
};

export const sendMessage = (pubnub, channelId, message) => {
  return new Promise((resolve, reject) => {
    pubnub.publish({ channel: channelId, message: message },
      (status, response) => {
        resolve({ status, response });
      }
    );
  });
};

export const setChannelMembers = (pubnub, channelId, memberId) => {
  return pubnub.objects.setChannelMembers({
    channel: channelId,
    uuids: [memberId]
  });
};

export const removeChannelMembers = (pubnub, channelId, memberId) => {
  return pubnub.objects.removeChannelMembers({
    channel: channelId,
    uuids: [memberId]
  });
};
