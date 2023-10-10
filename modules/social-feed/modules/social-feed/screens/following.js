import React, { useEffect, useState, useContext } from "react";
import { Text, View, TextInput, Image, ScrollView, Alert } from "react-native";
import { OptionsContext } from "@options";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getFollowing, unFollowUser } from "../store";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { getAlphabets } from "../utils";

/**
 * Component to display a list of following users.
 */
const FollowingList = () => {
  const dispatch = useDispatch();
  const [followingUsers, setFollowing] = useState([]);
  const [allFollowing, setAllFollowing] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { styles } = useContext(OptionsContext);

  // Fetch following users when the component mounts
  useEffect(() => {
    dispatch(getFollowing())
      .then(unwrapResult)
      .then((response) => {
        setFollowing(response?.results);
        setAllFollowing(response?.results);
      })
      .catch((error) => __DEV__ && console.log(error));
  }, []);

  // Filter users based on searchQuery
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
      <View style={styles.followingContainer}>
        <View style={styles.followingSearchBar}>
          <Text style={styles.followingSearchText}>Search</Text>
          <View style={styles.followingSearchView}>
            <View style={{ width: "90%" }}>
              <Input placeholder="Enter" setValue={setSearchQuery} />
            </View>
            <Image source={require("../assets/search.png")} />
          </View>
        </View>
        <View>
          <Text style={styles.followingSubheading}>
            {followingUsers.length} Following
          </Text>
        </View>
        {getAlphabets()?.map((alpha) => (
          <>
            {followingUsers.filter(
              (following) => following.name.charAt(0).toUpperCase() === alpha
            ).length > 0 && (
              <View style={styles.frequentAlphabets}>
                <Text style={styles.frequentLetters}>{alpha}</Text>
              </View>
            )}
            <View>
              {followingUsers
                .filter(
                  (following) =>
                    following.name.charAt(0).toUpperCase() === alpha
                )
                .map((following, index) => {
                  return (
                    <Follower
                      id={following.id}
                      name={following.name}
                      bgcolor={following.bgcolor}
                      following={followingUsers}
                      setFollowing={setFollowing}
                      key={index}
                    />
                  );
                })}
            </View>
          </>
        ))}
      </View>
    </ScrollView>
  );
};

export default FollowingList;

/**
 * Follower component displays user information and allows unfollowing.
 * @param {Object} props - The component's properties.
 * @param {number} props.id - The unique identifier of the user.
 * @param {string} props.name - The name of the user.
 * @param {Array} props.following - An array of users being followed.
 * @param {Function} props.setFollowing - Function to update the list of followed users.
 */
const Follower = (props) => {
  const { styles } = useContext(OptionsContext);
  const { id, name, following, setFollowing } = props;
  const dispatch = useDispatch();
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
    <View style={styles.followingUser}>
      <View style={styles.followingUserMain}>
        <View
          style={[
            styles.followingUserImage,
            { backgroundColor: props.bgcolor }
          ]}
        >
          <Image source={require("../assets/edit.png")} />
        </View>
        <Text>{name}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          onUnFollow();
        }}
      >
        <Text>Unfollow</Text>
      </TouchableOpacity>
    </View>
  );
};

/**
 * A reusable input component.
 *
 * @param {object} props - Component props.
 * @param {string} props.placeholder - Placeholder text for the input.
 * @param {string} props.value - The value of the input.
 * @param {function} props.setValue - A function to set the input value.
 */
const Input = (props) => {
  const { styles } = useContext(OptionsContext);
  return (
    <View>
      <TextInput
        style={styles.followingSearchInput}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={(num) => props.setValue(num)}
        placeholderTextColor="#ddd"
        editable={props.editable !== false}
      />
      {props.errorText
        ? (
        <Text style={styles.followingError}>{props.errorText}</Text>
          )
        : null}
    </View>
  );
};
