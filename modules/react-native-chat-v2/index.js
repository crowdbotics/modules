import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import Pubnub from 'pubnub';
// @ts-ignore
import { PubNubProvider } from "pubnub-react";
import Navigator from './Navigator';
import { useStore, uuid } from './Store/store';
import { AppState } from 'react-native';
import listener from './Store/model';
import options from './options';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer'])

const client = new Pubnub({
  subscribeKey: options.PUBNUB_SUB,
  publishKey: options.PUBNUB_PUB,
  uuid,
  restore: true
});

const App = () => {
  const { state, dispatch } = useStore();
  useEffect(() => {
    AppState.addEventListener('change', (nextState) => {
      if (nextState.match(/inactive|background/)) {
        client.unsubscribeAll();
      }
    });
    client.addListener(listener(state, dispatch));
    client.subscribe({
      channelGroups: [uuid],
      withPresence: true
    });
    return () => client.unsubscribeAll()
  }, []);
  return <>
    <PubNubProvider client={client}>
      <Navigator />
    </PubNubProvider>
  </>;
};
export default {
  title: 'Chat',
  navigator: App
}
