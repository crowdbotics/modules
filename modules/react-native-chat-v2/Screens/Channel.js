import React, { useLayoutEffect, useEffect, useState } from 'react';
import { user, useStore } from '../Store/store';
// @ts-ignore
import { Actions, GiftedChat } from 'react-native-gifted-chat';
// @ts-ignore
import { usePubNub } from 'pubnub-react';
import { cloneArray, sortArray } from '../utils';
// @ts-ignore
import { launchImageLibrary } from 'react-native-image-picker';

export default ({ route, navigation }) => {
  const pubnub = usePubNub();
  const { state } = useStore();
  const { item } = route.params;
  const [messages, setMessages] = useState(state.messages[item.id] || [])
  const channel = state.channels[route.params.item.id];

  useEffect(() => {
    setMessages(state.messages[item.id] || [])
  }, [state.messages[item.id]])

  useEffect(() => {
    pubnub.setState({
      state: {
        last_seen: new Date().getTime()
      },
      channels: [item.id],
    });

  })

  useLayoutEffect(() => {
    navigation.setOptions({
      title: channel.name
    });
  }, [navigation, channel]);

  const pickImage = () => {
    launchImageLibrary().then(res => {
      if (res?.didCancel)
        return

      const tmpMessages = cloneArray(messages)
      tmpMessages.push({ image: res.assets[0].uri, pending: true, user: user })
      setMessages(tmpMessages)
      pubnub.sendFile({
        channel: item.id,
        file: {
          uri: res.assets[0].uri,
          name: res.assets[0].fileName,
          mimeType: res.assets[0].type,
        },
      });
    })
  };
  const onSend = (message) => {
    const tmpMessages = cloneArray(messages)
    tmpMessages.push({ text: message[0].text, pending: true, user: user })
    setMessages(tmpMessages)
    pubnub.publish({ channel: item.id, message: message[0] }, (status, response) => {
      console.log(status);
      console.log(response);
    });
  };
  return <GiftedChat isLoadingEarlier={true} messages={sortArray(messages)} renderUsernameOnMessage={true} onSend={onSend} renderActions={() => <Actions onPressActionButton={pickImage} />} user={user} />;
};
