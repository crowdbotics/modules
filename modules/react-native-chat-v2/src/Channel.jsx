import React, { useLayoutEffect } from 'react';
import { user, useStore } from './store';
// @ts-ignore
import { Actions, GiftedChat } from 'react-native-gifted-chat';
// @ts-ignore
import { usePubNub } from 'pubnub-react';

export default ({ route, navigation }) => {
  const client = usePubNub();
  const { state } = useStore();
  const { item } = route.params;
  const messages = state.messages[item.id] || [];
  const channel = state.channels[route.params.item.id];
  useLayoutEffect(() => {
    navigation.setOptions({
      title: channel.name
    });
  }, [navigation, channel]);
  const pickImage = () => {
  };
  const onSend = async (messages) => {
    client.publish({ channel: item.id, message: { text: messages[0].text } }, (status, response) => {
      console.log(status);
      console.log(response);
    });
  };
  return <GiftedChat isLoadingEarlier={true} messages={messages} renderUsernameOnMessage={true} onSend={onSend} renderActions={() => <Actions onPressActionButton={pickImage} />} user={user} />;
};
