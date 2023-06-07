import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  FlatList
} from "react-native";

const LeaderboardScreen = params => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    setUsers([
      {
        id: 1,
        name: "Albert Flores",
        profileImage: require("./assets/profile.png"),
        score: "15999"
      },
      {
        id: 2,
        name: "Annette Black",
        profileImage: require("./assets/profile.png"),
        score: "14565"
      },
      {
        id: 3,
        name: "Theresa Webb",
        profileImage: require("./assets/profile.png"),
        score: "13569"
      },
      {
        id: 4,
        name: "Courteny Henry",
        profileImage: require("./assets/profile.png"),
        score: "12565"
      },
      {
        id: 5,
        name: "Cody Fisher",
        profileImage: require("./assets/profile.png"),
        score: "11599"
      },
      {
        id: 6,
        name: "Dianne Russell",
        profileImage: require("./assets/profile.png"),
        score: "11599"
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
      <TabView tabTitles={["All", "Weekly", "Monthly"]} selected={0} />
      <View style={styles.frequentBar}>
        <Text style={[styles.fnt16, styles.grey]}>Player</Text>
        <Text style={[styles.fnt16, styles.grey]}>Score</Text>
      </View>
      <FlatList
        data={users}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({ item }) => <User user={item} />}
      />
    </View>
  );
};

const User = ({ user }) => {
  return (
    <View style={styles.userContainer}>
      <View style={styles.userInfo}>
        <Image source={user.profileImage} style={styles.profileImage} />
        <Text style={styles.username}>{user.name}</Text>
      </View>
      <Text style={styles.scoreText}>{user.score}</Text>
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
  frequentBar: {
    paddingHorizontal: 40,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  fnt16: {
    fontSize: 16
  },
  bold: {
    fontWeight: "bold"
  },
  grey: {
    color: "grey"
  },
  black: {
    color: "black"
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e6e6e6",
    marginHorizontal: 20,
    justifyContent: "space-between"
  },
  userInfo: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  profileImage: {
    borderRadius: 50,
    width: 70,
    height: 70,
    resizeMode: "contain"
  },
  username: {
    fontSize: 16,
    marginLeft: 20,
    color: "#111112"
  },
  scoreText: {
    fontSize: 17,
    color: "#111112",
    fontWeight: "bold"
  }
});
export default LeaderboardScreen;

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
