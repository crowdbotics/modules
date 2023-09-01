import React, { useEffect, useState, useContext } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { GlobalOptionsContext } from "@options";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getFollowing, unFollowUser } from "../store";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const FollowingList = () => {
  const dispatch = useDispatch();
  const [followingUsers, setFollowing] = useState([]);
  const [allFollowing, setAllFollowing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const gOptions = useContext(GlobalOptionsContext);
  const BASE_URL = gOptions.url;

  // useEffect(() => {
  //   getFollowing(BASE_URL, setLoading).then((data) => {
  //     console.log("---------sss", data)
  //     setFollowing(data?.results);
  //     setAllFollowing(data?.results);
  //   })
  // }, [loading]);

  useEffect(() => {
    dispatch(getFollowing())
      .then(unwrapResult)
      .then((response) => {
        setFollowing(response?.results);
        setAllFollowing(response?.results);
        console.log("response---Following", response);
      })
      .catch((error) => __DEV__ && console.log(error));
  }, []);

  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const alphabets = alpha.map((x) => String.fromCharCode(x));

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFollowing(
        allFollowing.filter((follower) =>
          follower.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFollowing(allFollowing);
    }
  }, [searchQuery]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <Text style={styles.searchText}>Search</Text>
          <View style={styles.followingSearchView}>
            <View style={{ width: "90%" }}>
              <Input placeholder="Enter" setValue={setSearchQuery} />
            </View>
            <Image source={require("../assets/search.png")} />
          </View>
        </View>
        <View>
          <Text style={styles.text}>{followingUsers.length} Following</Text>
        </View>
        {alphabets.map((alpha) => {
          return (
            <>
              {followingUsers.filter(
                (following) => following.name.charAt(0).toUpperCase() === alpha
              ).length > 0 && (
                <View style={styles.frequently}>
                  <Text style={styles.frequentlyText}>{alpha}</Text>
                </View>
              )}
              <View>
                {followingUsers
                  .filter(
                    (following) =>
                      following.name.charAt(0).toUpperCase() === alpha
                  )
                  .map((following) => {
                    return (
                      <Follower
                        id={following.id}
                        setLoading={setLoading}
                        name={following.name}
                        bgcolor={following.bgcolor}
                        following={followingUsers}
                        setFollowing={setFollowing}
                      />
                    );
                  })}
              </View>
            </>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  followingSearchView: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#C4C4C4",
    flexDirection: "row",
    alignItems: "center",
  },
  searchBar: {
    padding: 20,
  },
  searchText: {
    marginLeft: 10,
    marginBottom: 10,
  },
  text: {
    marginLeft: 30,
    marginBottom: 10,
  },
  frequently: {
    height: 50,
    width: "100%",
    backgroundColor: "#DADADA",
    flexDirection: "column",
    justifyContent: "center",
  },
  frequentlyText: {
    marginLeft: 30,
    color: "#8F8D86",
  },
});

export default FollowingList;

const Follower = (props) => {
  const { id, name, setLoading, following, setFollowing } = props;
  const dispatch = useDispatch()
  const onUnFollow = () => {
    dispatch(unFollowUser(id))
      .then(unwrapResult)
      .then(() => {
        Alert.alert("Success", "User unfollowed");
        setFollowing(following.filter((user) => user.id !== id));
      })
      .catch((error) => __DEV__ && console.log(error));
  };
  return (
    <View style={FollowerStyles.follower}>
      <View style={FollowerStyles.main}>
        <View
          style={[FollowerStyles.image, { backgroundColor: props.bgcolor }]}
        >
          <Image source={require("../assets/edit.png")} />
        </View>
        <Text>{name}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          // unFollowUser(id, setLoading);
          onUnFollow();
        }}
      >
        <Text>Unfollow</Text>
      </TouchableOpacity>
    </View>
  );
};
const FollowerStyles = StyleSheet.create({
  follower: {
    marginHorizontal: 20,

    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0,0,0,0.5)",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    justifyContent: "space-between",
  },
  main: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
    marginRight: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

const Input = (props) => {
  return (
    <View>
      <TextInput
        style={textStyles.input}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={(num) => props.setValue(num)}
        placeholderTextColor="#ddd"
        editable={props.editable !== false}
      />
      {props.errorText ? (
        <Text style={textStyles.error}>{props.errorText}</Text>
      ) : null}
    </View>
  );
};

const textStyles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    height: 53,
    color: "#000",
    borderRadius: 10,
    fontSize: 14,
    paddingHorizontal: 10,
  },
  error: {
    fontSize: 13,
    color: "#FA060D",
    paddingTop: 8,
  },
});
