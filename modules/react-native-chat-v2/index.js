import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import Pubnub from 'pubnub';
// @ts-ignore
import { PubNubProvider } from "pubnub-react";
import Navigator from './src/Navigator';
import { useStore, uuid } from './src/store';
import { StatusBar, AppState } from 'react-native';
import listener from './src/model';
import options from './options';

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
    <StatusBar translucent={true} />
    <PubNubProvider client={client}>
      <Navigator />
    </PubNubProvider>
  </>;
};
export default {
  title: 'Chat',
  navigator: App
}
