import React, { useRef, useEffect, useState } from "react";
import { TextInput, Button, List, Avatar, Card } from "react-native-paper";
import { View, ScrollView, StyleSheet, Dimensions } from "react-native";
import { useDispatch } from "react-redux";
import { getMessages, sendMessage } from "../../store/open-api/open-api.slice";
const isMobileScreen = Dimensions.get("window").width <= 600; // Adjust the threshold as needed

const FeatureName = () => {
  const [messages, setMessages] = useState([

  ]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMessages()).then((res) => {
      console.log(res);
      setMessages(res.payload?.messages);
    });
  }, []);

  const [newMessage, setNewMessage] = useState("");
  const scrollViewRef = useRef(null);
  useEffect(() => {
    // Auto-scroll to the bottom when messages change
    console.log("scrolling to end");
    scrollViewRef.current.scrollToEnd({ animated: true });
  }, []);
  const handleSend = () => {
    if (newMessage.trim() !== "") {
      const userMessage = {
        q: newMessage
      };

      const message = {
        role: "user",
        content: newMessage,
        created_at: new Date().toISOString()
      };

      setMessages([...messages, message]); // Reverse the order
      setNewMessage("");

      dispatch(sendMessage(userMessage)).then((res) => {
        const aiResponse = {
          role: "AI",
          content: res.payload?.bot,
          created_at: new Date().toISOString()
        };
        message.response = res.payload?.response;
        setMessages([...messages, message, aiResponse]);
      });
    }
  };
  useEffect(() => {
    // Auto-scroll to the bottom when messages change
    console.log("scrollViewRef", scrollViewRef);
    console.log("scrollViewRef.current", scrollViewRef.current);
    scrollViewRef.current.scrollToEnd({ animated: true });
  }, [messages]);
  return (
    <View style={styles.container}>
      {/* Chat messages */}
      <ScrollView
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContentContainer}
        ref={scrollViewRef}
        onContentSizeChange={() => {
          console.log("scrolling to endccc");
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <List.Section>
          <List.Subheader>Chat</List.Subheader>
          {messages.map((message, index) => (
            <React.Fragment key={index}>
              <List.Item
                title={message.role === "user" ? "You" : "AI"}
                titleStyle={styles.messageTitle}
                description={message.content}
                descriptionNumberOfLines={100}
                left={() => (
                  <Avatar.Icon
                    size={48}
                    icon={message.role === "user" ? "account" : "robot"}
                    style={styles.avatar}
                  />
                )}
                style={styles.messageItem}
              />
            </React.Fragment>
          ))}
        </List.Section>
      </ScrollView>

      {/* Input card for typing and sending messages */}
      <View style={[styles.inputContainer, isMobileScreen && { width: "100%" }]}>
        <Card style={styles.card}>
          <Card.Content style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <TextInput
              label="Type a message"
              value={newMessage}
              mode="outlined"
              onChangeText={(text) => setNewMessage(text)}
              style={{ flex: 1 }}
              onSubmitEditing={handleSend}
            />
            <View style={styles.buttonContainer}>
              <Button mode="outlined" onPress={handleSend} style={styles.sendButton}>
                Send
              </Button>
            </View>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#444",
    height: "100vh"
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 60, // Adjust as needed
    width: isMobileScreen ? "95%" : "80%",
    alignSelf: "center"
  },
  messagesContentContainer: {
    flexGrow: 1,
    // justifyContent: 'flex-start',
    justifyContent: "flex-end"
  },
  messageItem: {
    marginBottom: 16
  },
  avatar: {
    backgroundColor: "blue" // Customize the avatar color
  },
  messageTitle: {
    fontWeight: "bold",
    marginRight: 8
  },
  inputContainer: {
    position: "sticky",
    bottom: 0,
    padding: 16,
    width: "70%",
    alignSelf: "center"
  },
  card: {
    padding: 0,
    borderRadius: 16
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginLeft: 16
  },
  sendButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default {
  title: "FeatureName",
  navigator: FeatureName
};
