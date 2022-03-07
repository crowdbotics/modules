import React, { useLayoutEffect, useEffect, useState } from 'react';
import { user, useStore } from '../Store/store';
// @ts-ignore
import { GiftedChat } from 'react-native-gifted-chat';
// @ts-ignore
import { usePubNub } from 'pubnub-react';
import { cloneArray, getUrl, loadHistory, sortArray } from '../utils';
// @ts-ignore
import { launchImageLibrary } from 'react-native-image-picker';
import { StyleSheet, Image } from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import { View, Text } from 'react-native';
import Video from 'react-native-video';
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
        if (response) {
          const messages = response.channels[item.id].map(obj => obj.message)
          state.messages[item.id] = loadHistory(messages)
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
      title: channel?.name
    });
  }, [navigation, channel]);

  const pickImage = () => {
    launchImageLibrary({ mediaType: "photo" }).then(res => {
      if (res?.didCancel)
        return

      if (res.assets[0].fileSize > 4900000) {
        alert("File size must be less then 5mb.")
        return
      }
      const tmpMessages = cloneArray(messages)
      tmpMessages.push({ image: res.assets[0].uri, pending: true, user: user })
      setMessages(tmpMessages)
      pubnub.sendFile({
        channel: item.id,
        message: {
          createdAt: new Date(),
          user: user,
          type: "image"
        },
        file: {
          uri: res.assets[0].uri,
          name: res.assets[0].fileName,
          mimeType: res.assets[0].type,
        },
      });
    })
  };

  const pickVideo = () => {
    launchImageLibrary({ mediaType: "video" }).then(res => {
      if (res?.didCancel)
        return


      if (res.assets[0].fileSize > 4900000) {
        alert("File size must be less then 5mb.")
        return
      }

      getUrl(res.assets[0].uri, res.assets[0].fileName).then(uri => {
        const tmpMessages = cloneArray(messages)
        tmpMessages.push({ video: uri, pending: true, user: user })
        setMessages(tmpMessages)
        pubnub.sendFile({
          channel: item.id,
          message: {
            createdAt: new Date(),
            user: user,
            type: "video"
          },
          file: {
            uri: res.assets[0].uri,
            name: res.assets[0].fileName,
            mimeType: res.assets[0].type,
          }
        }, (status, response) => {
          console.log(status);
          console.log(response);
        });
      })

    })
  };

  const actions = () => {
    return (
      <Menu>
        <MenuTrigger customStyles={{ triggerWrapper: styles.triggerWrapper }}>
          <Text style={{ fontSize: 25, marginTop: -4, color: "gray" }}>+</Text>
        </MenuTrigger>
        <MenuOptions optionsContainerStyle={{ marginTop: -40, marginLeft: 5 }}>
          <MenuOption onSelect={() => pickImage()} text='Image' />
          <View style={{ borderBottomColor: "lightgray", borderBottomWidth: 1 }} />
          <MenuOption onSelect={() => pickVideo()} text='Video' />
        </MenuOptions>
      </Menu>
    )
  }

  const onSend = (message) => {
    const tmpMessages = cloneArray(messages)
    tmpMessages.push({ text: message[0].text, pending: true, user: user })
    setMessages(tmpMessages)
    pubnub.publish({ channel: item.id, message: message[0] }, (status, response) => {
      console.log(status);
      console.log(response);
    });
  };

  const renderMessageVideo = (props) => {
    const { currentMessage } = props;
    let result = ""
    try {
      result = pubnub.getFileUrl({ channel: item.id, id: currentMessage._id, name: ("name" in currentMessage) ? currentMessage.name : currentMessage.video });
    } catch (error) {
      result = currentMessage.video
    }

    return (
      <View style={{ padding: 5 }}>
        <Video resizeMode="contain" source={{ uri: result }} style={{ width: 200, height: 120 }} />
      </View>
    );
  }

  const renderMessageImage = (props) => {
    const { currentMessage } = props;
    let result = ""
    try {
      result = pubnub.getFileUrl({ channel: item.id, id: currentMessage._id, name: ("name" in currentMessage) ? currentMessage.name : currentMessage.image });
    } catch (error) {
      result = currentMessage.image
    }
    return (
      <View style={{ padding: 5 }}>
        <Image
          style={{ width: 200, height: 120 }}
          resizeMode="cover"
          source={{
            uri: result
          }}
        />
      </View>
    );
  }
  return <GiftedChat isLoadingEarlier={true} renderMessageImage={renderMessageImage} renderMessageVideo={renderMessageVideo} messages={sortArray(messages)} renderUsernameOnMessage={true} onSend={onSend} renderActions={() => actions()} user={user} />;
};
const styles = StyleSheet.create({
  triggerWrapper: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    width: 30,
    height: 30,
    marginLeft: 5,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 15

  }
})
export default Chat