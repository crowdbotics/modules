import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { usePubNub } from "pubnub-react";

const Chat = ({ route }) => {
  // The `route` prop will be passed to us thanks to React Navigation.
  // It will contain our emoji in `route.params.emoji`.
  const userEmoji = route.params.emoji;

  // Here we obtain our PubNub instance thanks to using the provider
  const pubnub = usePubNub();

  // In next two statements we define the state needed for our chat
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  // First we need to set our PubNub UUID and subscribe to chat channel.
  // We will use `useEffect` hook for that.
  useEffect(() => {
    // We need to make sure that PubNub is defined
    if (pubnub) {
      // Set the UUID of our user to their chosen emoji
      pubnub.setUUID(userEmoji);

      // Create a listener that will push new messages to our `messages` variable
      // using the `setMessages` function.
      const listener = {
        message: envelope => {
          setMessages(msgs => [
            ...msgs,
            {
              id: envelope.message.id,
              author: envelope.publisher,
              content: envelope.message.content,
              timetoken: envelope.timetoken
            }
          ]);
        }
      };

      // Add the listener to pubnub instance and subscribe to `chat` channel.
      pubnub.addListener(listener);
      pubnub.subscribe({ channels: ["chat"] });

      // We need to return a function that will handle unsubscription on unmount
      return () => {
        pubnub.removeListener(listener);
        pubnub.unsubscribeAll();
      };
    }
  }, [pubnub]);

  // This function handles sending messages.
  const handleSubmit = () => {
    // Clear the input field.
    setInput("");

    // Create the message with random `id`.
    const message = {
      content: input,
      id: Math.random()
        .toString(16)
        .substr(2)
    };

    // Publish our message to the channel `chat`
    pubnub.publish({ channel: "chat", message });
  };

  return (
    <SafeAreaView style={styles.outerContainer}>
      <KeyboardAvoidingView
        style={styles.innerContainer}
        behavior="height"
        keyboardVerticalOffset={Platform.select({
          ios: 78,
          android: 0
        })}
      >
        <View style={styles.topContainer}>
          {messages.map(message => (
            <View key={message.timetoken} style={styles.messageContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarContent}>{message.author}</Text>
              </View>
              <View style={styles.messageContent}>
                <Text>{message.content}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.bottomContainer}>
          <TextInput
            style={styles.textInput}
            value={input}
            onChangeText={setInput}
            onSubmitEditing={handleSubmit}
            returnKeyType="send"
            enablesReturnKeyAutomatically={true}
            placeholder="Type your message here..."
          />
          <View style={styles.submitButton}>
            {input !== "" && <Button title="Send" onPress={handleSubmit} />}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    width: "100%",
    height: "100%"
  },
  innerContainer: {
    width: "100%",
    height: "100%"
  },
  topContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingHorizontal: 16
  },
  messageContainer: {
    flexDirection: "row",
    marginTop: 16,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 4
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 50,
    overflow: "hidden",
    marginRight: 16
  },
  avatarContent: {
    fontSize: 30,
    textAlign: "center",
    textAlignVertical: "center"
  },
  messageContent: {
    flex: 1
  },
  bottomContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 16
  },
  textInput: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 4,
    padding: 16,
    elevation: 2
  },
  submitButton: {
    position: "absolute",
    right: 32
  }
});

export default Chat;
