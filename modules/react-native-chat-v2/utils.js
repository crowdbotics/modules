import { ChannelType } from "./Store/store";

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