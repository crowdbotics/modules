import React, { useLayoutEffect, useEffect, useState } from 'react';
import { user, useStore } from '../Store/store';
// @ts-ignore
import { Actions, GiftedChat } from 'react-native-gifted-chat';
// @ts-ignore
import { usePubNub } from 'pubnub-react';
import { cloneArray, sortArray } from '../utils';
// @ts-ignore
import { launchImageLibrary } from 'react-native-image-picker';

const Chat = ({ route, navigation }) => {
  const pubnub = usePubNub();
  const { state, dispatch } = useStore();
  const { item } = route.params;
  const [messages, setMessages] = useState(state.messages[item.id] || [])
  const channel = state.channels[route.params.item.id];
  
  useEffect(() => {
    pubnub.fetchMessages({
        channels: [item.id],
      },
      (status, response) => {
        if(response) {
          const messages = response.channels[item.id].map(obj =>  obj.message)
          state.messages[item.id] = messages
          dispatch({ messages: state.messages });
        }
      }
    );
  }, [item.id])
  

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

      if(res.assets[0].fileSize > 524000) {
        alert("File size must be less then 5mb.")
        return
      }
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
export default Chat