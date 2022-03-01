import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({});

const PUBNUB_PUB = "pub-c-09dc7d68-298a-4dd5-9623-7cc67ddaa937"
const PUBNUB_SUB = "sub-c-253106be-97d7-11ec-b249-a68c05a281ab"

const timeSince = (date) => {

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

export default {
  PUBNUB_SUB,
  PUBNUB_PUB,
  timeSince,
  styles: styles
}
