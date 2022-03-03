import { ChannelType } from "./Store/store";

export const cloneArray = (data) => {
  return JSON.parse(JSON.stringify(data))
}

export const fetchChannels = (pubnub, channelGroup) => {
  return new Promise(async (resolve) => {
    const res = await pubnub.channelGroups.listChannels({ channelGroup });
    const channels = res.channels.reduce((acc, channel) => ({ [channel]: { id: '', name: '', updated: '', custom: { type: ChannelType.Group } }, ...acc }), {});
    if (res.channels.length) {
      const metadata = await pubnub.objects.getAllChannelMetadata({
        filter: res.channels.map(channel => `id == "${channel}"`).join('||'),
        include: { customFields: true }
      });
      metadata.data.forEach(({ id, name, updated, custom }) => {
        channels[id] = { id, name, updated, custom: { ...channels[id]?.custom, ...custom } };
      });
      resolve(channels);
    } else {
      resolve(channels);
    }
  })
};

export const timeSince = (date) => {
  // @ts-ignore
  var seconds = Math.floor((new Date() - date) / 1000);
  var interval = seconds / 31536000;
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
}

export const sortArray = (arr) => {
  return arr.sort((a, b) => {
    let keyA = new Date(a.createdAt)
    let keyB = new Date(b.createdAt)
    // Compare the 2 dates
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  }).reverse();
}