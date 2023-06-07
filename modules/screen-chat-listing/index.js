import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  FlatList,
  Image,
  Pressable
} from "react-native";

const ChatListingScreen = params => {
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setMessages([
      {
        id: 1,
        name: "Cody Fisher",
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        profileImage: require("./assets/profile.png"),
        unread: 1,
        isOnline: true,
        lastTime: "15 min"
      },
      {
        id: 2,
        name: "Jenny Wilson",
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        profileImage: require("./assets/profile.png"),
        unread: 2,
        isOnline: true,
        lastTime: "1 hour"
      },
      {
        id: 3,
        name: "Johnny Watson",
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        profileImage: require("./assets/profile.png"),
        unread: 0,
        isOnline: true,
        lastTime: "2 hours"
      },
      {
        id: 4,
        name: "Ralph Williams",
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        profileImage: require("./assets/profile.png"),
        unread: 0,
        isOnline: false,
        lastTime: "3 hours"
      },
      {
        id: 5,
        name: "Guy Hawkins",
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        profileImage: require("./assets/profile.png"),
        unread: 0,
        isOnline: false,
        lastTime: "Mon"
      },
      {
        id: 6,
        name: "Morris Henery",
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        profileImage: require("./assets/profile.png"),
        unread: 0,
        isOnline: false,
        lastTime: "Tue"
      },
      {
        id: 7,
        name: "Irma Flores",
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        profileImage: require("./assets/profile.png"),
        unread: 0,
        isOnline: false,
        lastTime: "Wed"
      }
    ]);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Search</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setUsername(text)}
            value={username}
            placeholder="Search Username"
            placeholderTextColor="#9B9B9B"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Image
            source={require("./assets/searchIcon.png")}
            style={styles.searchIcon}
          />
        </View>
      </View>
      <TabView tabTitles={["Select all", "Delete selected"]} selected={0} />
      <FlatList
        data={messages}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <ChatListingItem message={item} />}
      />
      <View style={styles.newBtn}>
        <Pressable>
          <Image source={require("./assets/plusIcon.png")} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start"
  },
  header: {
    padding: 20,
    // flex: 1,
    height: 100
  },
  inputContainer: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 5
  },
  inputText: {
    fontSize: 16,
    marginLeft: 20,
    color: "#111112"
  },
  input: {
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 10,
    padding: 10,
    paddingLeft: 20,
    marginVertical: 10,
    width: "100%",
    height: 50
  },
  searchIcon: {
    position: "absolute",
    right: 30,
    top: 35
  },
  newBtn: {
    position: "absolute",
    backgroundColor: "black",
    bottom: 30,
    right: 30,
    padding: 20,
    borderRadius: 50,
    elevation: 10,
    shadowColor: "grey"
  }
});
export default ChatListingScreen;

const ChatListingItem = ({ message }) => {
  return (
    <View style={chatListingItemStyles.chatListingItem}>
      <Image
        source={message.profileImage}
        style={chatListingItemStyles.profileImage}
      />
      {(message.isOnline && (
        <Image
          source={require("./assets/onlineIcon.png")}
          style={chatListingItemStyles.activityDot}
        />
      )) ||
        null}
      <View style={chatListingItemStyles.chatListingItemInfo}>
        <Text style={chatListingItemStyles.username}>{message.name}</Text>
        <Text style={chatListingItemStyles.message}>{message.message}</Text>
      </View>
      <View style={chatListingItemStyles.chatListingItemTime}>
        <Text style={chatListingItemStyles.time}>{message.lastTime}</Text>
        {(message.unread > 0 && (
          <View style={chatListingItemStyles.unread}>
            <Text
              style={{
                color: "#fff"
              }}>
              {message.unread}
            </Text>
          </View>
        )) ||
          null}
      </View>
    </View>
  );
};

const chatListingItemStyles = StyleSheet.create({
  chatListingItem: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#e6e6e6",
    borderBottomWidth: 1,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
    height: 100
  },
  profileImage: {
    width: 70,
    height: 70
  },
  activityDot: {
    position: "absolute",
    left: 65,
    bottom: 20
  },
  chatListingItemInfo: {
    flex: 1,
    marginHorizontal: 15
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111112"
  },
  message: {
    fontSize: 14,
    color: "grey"
  },
  chatListingItemTime: {
    alignItems: "center",
    justifyContent: "space-between",
    height: 60
  },
  time: {
    fontSize: 14,
    color: "grey",
    fontWeight: "bold"
  },
  unread: {
    fontSize: 14,
    backgroundColor: "black",
    width: 30,
    height: 30,
    color: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9
  }
});

const TabView = ({ tabTitles, selected }) => {
  return (
    <View style={tabViewStyles.paletteContainer}>
      {tabTitles.map((title, index) => (
        <View
          style={
            index === selected
              ? tabViewStyles.selected
              : tabViewStyles.unSelected
          }
          key={index}>
          <Text>{title}</Text>
        </View>
      ))}
    </View>
  );
};

const tabViewStyles = StyleSheet.create({
  paletteContainer: {
    width: "70%",
    height: 48,
    backgroundColor: "#F1F1F1",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 6,
    marginVertical: 10,
    marginHorizontal: 20
  },
  selected: {
    borderRadius: 10,
    flex: 1,
    backgroundColor: "#fff",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "gray",
    elevation: 10
  },
  unSelected: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    borderRadius: 10
  }
});
