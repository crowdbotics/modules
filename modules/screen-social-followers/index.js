import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Image,
  ScrollView
} from "react-native";

const SocialFollowersScreen = (params) => {
  const [value, setValue] = useState("");
  const [frequentlyContacted, setFrequentlyContacted] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [numFollowers, setNumFollowers] = useState(0);
  useEffect(() => {
    setFrequentlyContacted([
      {
        name: "Cody Fisher",
        image: require("./assets/profile.png"),
        follow: false
      },
      {
        name: "Johnny watson",
        image: require("./assets/profile.png"),
        follow: true
      },
      {
        name: "Jenny Wilson",
        image: require("./assets/profile.png"),
        follow: true
      }
    ]);
    setFollowers([
      {
        name: "Alpha Edwards",
        image: require("./assets/profile.png")
      },
      {
        name: "Anthony Hawks",
        image: require("./assets/profile.png")
      },
      {
        name: "And Henry",
        image: require("./assets/profile.png")
      },
      {
        name: "Alpha Edwards",
        image: require("./assets/profile.png")
      }
    ]);
    setNumFollowers(4513);
  }, []);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <Text style={styles.searchText}>Search</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={textStyles.input}
              placeholder="Enter"
              value={value}
              onChangeText={(text) => setValue(text)}
              placeholderTextColor="#ddd"
            />
            <Image
              source={require("./assets/search.png")}
              style={styles.searchIcon}
            />
          </View>
        </View>
        <Text style={styles.numFollowers}>{numFollowers} Followers</Text>
        <View style={styles.separator}>
          <Text style={styles.separatorText}>Frequently</Text>
        </View>
        <View>
          {frequentlyContacted.map((follower, index) => (
            <Follower
              key={index}
              name={follower.name}
              image={follower.image}
              follow={follower.follow}
            />
          ))}
        </View>
        <View style={styles.separator}>
          <Text style={styles.separatorText}>A</Text>
        </View>
        <View>
          {followers.map((follower, index) => (
            <Follower key={index} name={follower.name} image={follower.image} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  searchBar: {
    padding: 20
  },
  searchText: {
    marginLeft: 10,
    marginBottom: 10
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#C4C4C4",
    flexDirection: "row",
    alignItems: "center"
  },
  searchIcon: {
    position: "absolute",
    right: 20
  },
  text: {
    marginLeft: 30,
    marginBottom: 10
  },
  numFollowers: {
    marginLeft: 30,
    marginBottom: 10,
    fontSize: 14
  },
  separator: {
    height: 50,
    width: "100%",
    backgroundColor: "#DADADA",
    flexDirection: "column",
    justifyContent: "center"
  },
  separatorText: {
    marginLeft: 30,
    color: "#8F8D86"
  }
});
export default SocialFollowersScreen;

const Follower = (props) => {
  return (
    <View style={FollowerStyles.follower}>
      <View style={FollowerStyles.main}>
        <View style={FollowerStyles.image}>
          <Image
            style={FollowerStyles.image}
            source={require("./assets/profile.png")}
          />
        </View>
        <Text>{props.name}</Text>
      </View>
      {props.follow && <Text>Follow</Text>}
    </View>
  );
};

const FollowerStyles = StyleSheet.create({
  follower: {
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e6e6e6",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    justifyContent: "space-between"
  },
  main: {
    flexDirection: "row",
    alignItems: "center"
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});
const textStyles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    height: 53,
    color: "#000",
    borderRadius: 10,
    fontSize: 14,
    paddingHorizontal: 10
  },
  error: {
    fontSize: 13,
    color: "#FA060D",
    paddingTop: 8
  }
});
