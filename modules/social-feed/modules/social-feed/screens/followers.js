import React, { useState, useEffect, useContext } from "react";
import { Text, View, TextInput, Image, ScrollView, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { OptionsContext } from "@options";
import { useDispatch } from "react-redux";
import { getFollowers, followUser } from "../store";
import { unwrapResult } from "@reduxjs/toolkit";
import { getAlphabets, toggleFollowById } from "../utils";

const FollowersList = () => {
  const dispatch = useDispatch();

  const [followers, setFollowers] = useState([]);
  const [searchedFollowers, setSearchedFollowers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { styles } = useContext(OptionsContext);

  // Fetch followers on from backend
  useEffect(() => {
    dispatch(getFollowers())
      .then(unwrapResult)
      .then((response) => {
        setFollowers(response?.results);
        setSearchedFollowers(response?.results);
      })
      .catch((error) => __DEV__ && console.log(error));
  }, []);

  // Filter followers based on search query
  useEffect(() => {
    if (searchQuery.length > 0) {
      setFollowers(
        searchedFollowers.filter((follower) =>
          follower.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFollowers(searchedFollowers);
    }
  }, [searchQuery]);

  return (
    <ScrollView>
      <View style={styles.followersContainer}>
        <View style={styles.searchBar}>
          <Text style={styles.searchText}>Search</Text>
          <View style={styles.searchView}>
            <View style={{ width: "90%" }}>
              <Input placeholder="Enter" setValue={setSearchQuery} />
            </View>
            <Image source={require("../assets/search.png")} />
          </View>
        </View>
        <View>
          <Text style={styles.followersAmount}>
            {followers?.length} Followers
          </Text>
        </View>
        {getAlphabets()?.map((alpha) => (
          <>
            {followers?.filter(
              (follower) => follower?.name?.charAt(0).toUpperCase() === alpha
            ).length > 0 && (
              <View style={styles.frequently}>
                <Text style={styles.frequentlyText}>{alpha}</Text>
              </View>
            )}
            <View>
              {followers
                ?.filter(
                  (follower) =>
                    follower?.name?.charAt(0)?.toUpperCase() === alpha
                )
                .map((follower, index) => {
                  return (
                    <Follower
                      id={follower.id}
                      name={follower.name}
                      bgcolor={follower.bgcolor}
                      follow={follower.follow}
                      setFollowers={setFollowers}
                      followers={followers}
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

export default FollowersList;

/**
 * A component to display a follower and allow following.
 *
 * @param {object} props - Component props.
 * @param {number} props.id - The ID of the follower.
 * @param {string} props.name - The name of the follower.
 * @param {boolean} props.follow - Indicates whether the user is followed.
 * @param {function} props.setFollowers - A function to update the followers list.
 * @param {array} props.followers - The list of followers.
 */
const Follower = (props) => {
  const { id, name, follow, setFollowers, followers } = props;
  const dispatch = useDispatch();
  const { styles } = useContext(OptionsContext);

  const onFollowBack = () => {
    dispatch(followUser(id))
      .then(unwrapResult)
      .then(() => {
        Alert.alert("Success", "Follow request sent!");
        setFollowers(toggleFollowById(followers, id));
      })
      .catch((error) => __DEV__ && console.log(error));
  };

  return (
    <View style={styles.follower}>
      <View style={styles.followerMainView}>
        <View
          style={[styles.followerImageView, { backgroundColor: props.bgcolor }]}
        >
          <Image source={require("../assets/edit.png")} />
        </View>
        <Text>{name}</Text>
      </View>
      {!follow && (
        <TouchableOpacity onPress={onFollowBack}>
          <Text>Follow Back</Text>
        </TouchableOpacity>
      )}
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
  const { placeholder, value, setValue, editable, errorText } = props;
  const { styles } = useContext(OptionsContext);

  return (
    <View>
      <TextInput
        style={styles.followerSearchInput}
        placeholder={placeholder}
        value={value}
        onChangeText={(num) => setValue(num)}
        placeholderTextColor="#ddd"
        editable={editable !== false}
      />
      {errorText
        ? (
        <Text style={styles.searchFollowerEnd}>{errorText}</Text>
          )
        : null}
    </View>
  );
};
