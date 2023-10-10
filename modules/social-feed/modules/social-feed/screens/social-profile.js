import * as React from "react";
import { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableHighlight
} from "react-native";
import { OptionsContext } from "@options";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { followUser, getUserProfile, unFollowUser } from "../store";
import { useIsFocused } from "@react-navigation/native";

const SocialProfileScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { id } = route.params;
  const [callbackVariable, setCallbackVariable] = useState(false);
  const { styles } = useContext(OptionsContext);

  // Get user profile data from the store.
  const { entities } = useSelector((state) => state.Social.getUserProfile);

  const getPostUser = () => {
    dispatch(getUserProfile(id));
  };

  // Fetch user details from backend when screen gets focused
  useEffect(() => {
    if (isFocused) {
      getPostUser();
    }
  }, [callbackVariable, isFocused]);

  const pressed = (id) => {
    navigation.navigate("PostDetailsScreen", { id: id });
  };

  const openFollowers = () => {
    navigation.navigate("FollowersList", { id: id });
  };

  const openFollowing = () => {
    navigation.navigate("FollowingList", { id: id });
  };

  const { name, email, posts, followers, following } = entities;

  const followCurrentUser = () => {
    setCallbackVariable(true);
    dispatch(followUser(id)).then(() => setCallbackVariable(false));
  };

  const unFollowCurrentUser = () => {
    setCallbackVariable(true);
    dispatch(unFollowUser(id)).then(() => setCallbackVariable(false));
  };

  return (
    <ScrollView>
      <View style={styles.socialProfileContainer}>
        <View style={styles.socialHeaderContainer}>
          <ProfileImage />
          <Text style={styles.socialHeaderText}>{name}</Text>
          <Text style={styles.headerSubText}>{email}</Text>
        </View>
        <View style={styles.followingSection}>
          <View style={styles.textarea}>
            <Image
              style={styles.postIcon}
              source={require("../assets/posts.png")}
            />
            <Text>{posts?.length} posts</Text>
          </View>
          {entities?.is_owner && (
            <>
              <TouchableOpacity
                style={styles.textarea}
                onPress={() => {
                  openFollowers();
                }}
              >
                <Image
                  style={styles.postIcon}
                  source={require("../assets/user.png")}
                />
                <Text>{followers} Followers</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.textarea}
                onPress={() => {
                  openFollowing();
                }}
              >
                <Image
                  style={styles.followingIcon}
                  source={require("../assets/user.png")}
                />
                <Text style={styles.followingText}>{following} Following</Text>
              </TouchableOpacity>
            </>
          )}
          {!entities?.is_owner && (
            <>
              {entities?.i_follow
                ? (
                <TouchableOpacity
                  style={styles.textarea}
                  onPress={unFollowCurrentUser}
                >
                  <Image
                    style={styles.postIcon}
                    source={require("../assets/user.png")}
                  />
                  <Text>UnFollow</Text>
                </TouchableOpacity>
                  )
                : (
                <TouchableOpacity
                  style={styles.textarea}
                  onPress={followCurrentUser}
                >
                  <Image
                    style={styles.followingIcon}
                    source={require("../assets/user.png")}
                  />
                  <Text style={styles.followingText}>Follow</Text>
                </TouchableOpacity>
                  )}
            </>
          )}
        </View>

        <View style={styles.pt30}>
          <FlatList
            data={posts && posts}
            style={styles.galleryRow}
            numColumns={3}
            renderItem={({ item }) => (
              <View style={styles.postItemView}>
                <Post
                  onPress={() => {
                    pressed(item.id);
                  }}
                  data={item}
                />
              </View>
            )}
            keyExtractor={(item) => item.id}
            onRefresh={getPostUser}
            refreshing={callbackVariable}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default SocialProfileScreen;

/**
 * Post component displays a single post and handles post press actions.
 * @param {Object} props - The component's properties.
 * @param {Function} props.onPress - Function to handle the post press action.
 * @param {Object} props.data - The post data to display.
 */
const Post = (props) => {
  const { styles } = useContext(OptionsContext);
  return (
    <TouchableHighlight
      onPress={props.onPress}
      style={styles.galleryPost}
      underlayColor="#DDDDDD"
    >
      <Image
        style={styles.editIcon}
        source={
          props?.data?.media?.[0]?.image
            ? { uri: props?.data?.media?.[0]?.image }
            : require("../assets/edit.png")
        }
      />
    </TouchableHighlight>
  );
};

/**
 * ProfileImage component displays the user's profile image.
 * @param {Object} props - The component's properties.
 * @param {Function} props.onPress - Function to handle the profile image press action.
 */
const ProfileImage = (props) => {
  const { styles } = useContext(OptionsContext);
  return (
    <TouchableHighlight onPress={props.onPress} underlayColor="#DDDDDD">
      <View style={styles.profileImageContainer}>
        <Image
          style={styles.userImage}
          resizeMode="contain"
          source={require("../assets/user.png")}
        />
      </View>
    </TouchableHighlight>
  );
};
