// @ts-ignore
import RNFS from 'react-native-fs';

export const cloneArray = (data) => {
  return JSON.parse(JSON.stringify(data))
}

export const fetchChannels = (pubnub, channelGroup) => {
  return new Promise(async (resolve) => {
    let channels = {}
    const metadata = await pubnub.objects.getAllChannelMetadata({
      filter: `id LIKE "*${channelGroup}*"`,
      include: { customFields: true }
    });
    metadata.data.forEach(({ id, name, updated, custom }) => {
      channels[id] = { id, name, updated, custom: { ...channels[id]?.custom, ...custom } };
    });
    resolve(channels);
    
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

export function getByValue(arr, value) {
  var result = arr.find(function(o){return o.id == value;} );
  return result
}

export const getUrl = async (uri, fileName) => {
  const destPath = `${RNFS.TemporaryDirectoryPath}/${fileName}`;
  await RNFS.copyFile(uri, destPath);
  await RNFS.stat(destPath);
  return destPath;
}

export const loadHistory = (data) => {
  return data.map(obj => {
    if("file" in obj) {
      let message = {
        _id: obj.file.id,
        [obj.message.type]: obj.file.name,
        createdAt: obj.message.createdAt,
        user: obj.message.user
      }
      return message
    } else {
      return obj
    }
  })
}