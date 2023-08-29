import React, { useLayoutEffect, useEffect, useState } from "react";
import { user, useStore } from "../Store";

import { GiftedChat, InputToolbar } from "react-native-gifted-chat";

import { usePubNub } from "pubnub-react";
import { cloneArray, getUrl, loadHistory, sendMessage, sortArray } from "../utils";

import { launchImageLibrary } from "react-native-image-picker";
import { StyleSheet, Image, View, Text } from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger
} from "react-native-popup-menu";

import Video from "react-native-video";

import EmojiSelector from "react-native-emoji-selector";

const Chat = ({ route, navigation }) => {
  const pubnub = usePubNub();
  const { state, dispatch } = useStore();
  const { item } = route.params;
  const [messages, setMessages] = useState(state.messages[item.id] || []);
  const channel = state.channels[route.params.item.id];
  const [actionSheet, setActionSheet] = useState(false);
  const [textInput, setTextInput] = useState(null);

  useEffect(() => {
    pubnub.fetchMessages(
      {
        channels: [item.id]
      },
      (_, response) => {
        if (response) {
          const messages = response.channels[item.id].map((obj) => obj.message);
          state.messages[item.id] = loadHistory(messages);
          dispatch({ messages: state.messages });
        }
      }
    );
  }, [item.id]);

  useEffect(() => {
    setMessages(state.messages[item.id] || []);
  }, [state.messages[item.id]]);

  useEffect(() => {
    pubnub.setState({
      state: {
        last_seen: new Date().getTime()
      },
      channels: [item.id]
    });
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: channel?.name
    });
  }, [navigation, channel]);

  const pickImage = () => {
    launchImageLibrary({ mediaType: "photo" }).then((res) => {
      if (res?.didCancel) {
        return;
      }

      if (res.assets[0].fileSize > 4900000) {
        alert("File size must be less then 5mb.");
        return;
      }
      const tmpMessages = cloneArray(messages);
      tmpMessages.push({ image: res.assets[0].uri, pending: true, user: user });
      setMessages(tmpMessages);
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
          mimeType: res.assets[0].type
        }
      });
    });
  };

  const pickVideo = () => {
    launchImageLibrary({ mediaType: "video" }).then((res) => {
      if (res?.didCancel) {
        return;
      }

      if (res.assets[0].fileSize > 4900000) {
        alert("File size must be less then 5mb.");
        return;
      }

      getUrl(res.assets[0].uri, res.assets[0].fileName).then((uri) => {
        const tmpMessages = cloneArray(messages);
        tmpMessages.push({ video: uri, pending: true, user: user });
        setMessages(tmpMessages);
        pubnub.sendFile(
          {
            channel: item.id,
            message: {
              createdAt: new Date(),
              user: user,
              type: "video"
            },
            file: {
              uri: res.assets[0].uri,
              name: res.assets[0].fileName,
              mimeType: res.assets[0].type
            }
          },
          (status, response) => {
            console.log(status);
            console.log(response);
          }
        );
      });
    });
  };

  const pickEmoji = () => {
    setActionSheet(true);
  };

  const actions = () => {
    return (
      <Menu>
        <MenuTrigger customStyles={{ triggerWrapper: styles.triggerWrapper }}>
          <Text style={styles.PlusContainer}>+</Text>
        </MenuTrigger>
        <MenuOptions optionsContainerStyle={styles.OptionContainer}>
          <MenuOption onSelect={pickEmoji} text="Emoji" />
          <View style={styles.border} />
          <MenuOption onSelect={() => pickImage()} text="Image" />
          <View style={styles.border} />
          <MenuOption onSelect={() => pickVideo()} text="Video" />
        </MenuOptions>
      </Menu>
    );
  };

  const onSend = (message) => {
    setActionSheet(false);
    const tmpMessages = cloneArray(messages);
    tmpMessages.push({ text: message[0].text, pending: true, user: user });
    setMessages(tmpMessages);
    setTextInput(null);
    sendMessage(pubnub, item.id, message[0]).then(res => console.log(res));
  };

  const renderMessageVideo = (props) => {
    const { currentMessage } = props;
    let result = "";
    try {
      result = pubnub.getFileUrl({
        channel: item.id,
        id: currentMessage._id,
        name:
          "name" in currentMessage ? currentMessage.name : currentMessage.video
      });
    } catch (error) {
      result = currentMessage.video;
    }

    return (
      <View style={styles.P5}>
        <Video
          resizeMode="contain"
          source={{ uri: result }}
          style={styles.VideoContainer}
        />
      </View>
    );
  };

  const renderMessageImage = (props) => {
    const { currentMessage } = props;
    let result = "";
    try {
      result = pubnub.getFileUrl({
        channel: item.id,
        id: currentMessage._id,
        name:
          "name" in currentMessage ? currentMessage.name : currentMessage.image
      });
    } catch (error) {
      result = currentMessage.image;
    }
    return (
      <View style={styles.P5}>
        <Image
          style={styles.ImageContainer}
          resizeMode="cover"
          source={{
            uri: result
          }}
        />
      </View>
    );
  };

  const onEmojiSelected = (emoji) => {
    setTextInput(emoji);
  };

  return (
    <>
      <GiftedChat
        text={textInput}
        onInputTextChanged={(text) => setTextInput(text)}
        listViewProps={styles.Container}
        isLoadingEarlier={true}
        renderMessageImage={renderMessageImage}
        renderMessageVideo={renderMessageVideo}
        messages={sortArray(messages)}
        renderUsernameOnMessage={true}
        onSend={onSend}
        renderInputToolbar={(props) => {
          return (
            <InputToolbar {...props} textInputStyle={styles.inputToolbar} />
          );
        }}
        renderActions={() => actions()}
        user={user}
      />
      {actionSheet && (
        <EmojiSelector onEmojiSelected={(emoji) => onEmojiSelected(emoji)} />
      )}
    </>
  );
};
const styles = StyleSheet.create({
  Container: {
    backgroundColor: "white"
  },
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
  },
  inputToolbar: {
    color: "#000"
  },
  PlusContainer: {
    fontSize: 25,
    marginTop: -4,
    color: "gray"
  },
  OptionContainer: {
    marginTop: -40,
    marginLeft: 5
  },
  border: {
    borderBottomColor: "lightgray",
    borderBottomWidth: 1
  },
  P5: {
    padding: 5
  },
  VideoContainer: {
    width: 200,
    height: 120
  },
  ImageContainer: {
    width: 200,
    height: 120
  }
});
export default Chat;
