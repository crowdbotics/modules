import React, { useContext, useState, useEffect } from "react";
import { View, Image, Text, FlatList } from "react-native";
import { OptionsContext } from "@options";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { getMyFeed, likePost, unLikePost } from "../store";
import { useIsFocused } from "@react-navigation/native";

const SocialFeedScreen = (props) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { navigation } = props;
  const [callbackVariable, setCallbackVariable] = useState(false);
  const { styles } = useContext(OptionsContext);

  // Get feed from store.
  const { entities } = useSelector((state) => state.Social.getMyFeed);

  // Fetch feed data from backend
  const fetchFeed = () => {
    dispatch(getMyFeed());
  };

  useEffect(() => {
    if (isFocused) {
      fetchFeed();
    }
  }, [callbackVariable, isFocused]);

  const renderItem = ({ item }) => (
    <PostComponent
      post={item}
      navigationObject={navigation}
      setCallbackVariable={setCallbackVariable}
    />
  );

  return (
    <View style={{ marginTop: 60 }}>
      <View style={styles.feedContainer}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {/* search bar */}
          <View style={styles.feedSearchBar}>
            <TextInput style={styles.feedSearchInput} placeholder="Search" />
            <Image
              source={require("../assets/search.png")}
              style={styles.searchIcon}
            />
          </View>
          {/* end search bar */}
          <TouchableOpacity
            style={styles.createPostHeader}
            onPress={() => {
              navigation.navigate("Create Post");
            }}
          >
            <Image
              source={require("../assets/plus.png")}
              style={styles.headerImage}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={entities}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onRefresh={fetchFeed}
          refreshing={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default SocialFeedScreen;

/**
 * PostComponent displays a single post and handles post-related actions.
 * @param {Object} props - The component's properties.
 * @param {Object} props.post - The post data to display.
 * @param {Object} props.navigationObject - React Navigation navigation object.
 * @param {Function} props.setCallbackVariable - Function to set callbackVariable state.
 */
const PostComponent = ({ post, navigationObject, setCallbackVariable }) => {
  const { styles } = useContext(OptionsContext);
  const dispatch = useDispatch();
  const { id, caption, upvotes, media, user, liked } = post;

  const likeCurrentPost = () => {
    setCallbackVariable(true);
    dispatch(likePost(id)).then(() => {
      setCallbackVariable(false);
    });
  };

  const unLikeCurrentPost = () => {
    setCallbackVariable(true);
    dispatch(unLikePost(id)).then(() => {
      setCallbackVariable(false);
    });
  };
  return (
    <TouchableOpacity
      style={{ margin: 10 }}
      onPress={() => {
        navigationObject.navigate("PostDetailsScreen", { id: id });
      }}
    >
      <TouchableOpacity
        style={styles.usernameContainer}
        onPress={() => {
          navigationObject.navigate("SocialProfileScreen", { id: user?.id });
        }}
      >
        <View style={styles.userImageContainer}>
          <Image
            source={
              user?.image ? { uri: user.image } : require("../assets/user.png")
            }
            style={styles.userImage}
          />
        </View>
        <Text style={styles.userText}>{user?.name}</Text>
      </TouchableOpacity>
      <View
        style={[
          styles.userPostImage,
          {
            backgroundColor: media?.[0]?.background
              ? "rgb" + media?.[0]?.background
              : "#acacac"
          }
        ]}
      >
        <Image
          source={{ uri: media?.[0]?.image }}
          style={styles.postImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.postcontainer}>
        <View style={styles.leftContainer}>
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={() => {
              liked ? unLikeCurrentPost(id) : likeCurrentPost(id);
            }}
          >
            <Image
              source={
                liked
                  ? require("../assets/unlike.png")
                  : require("../assets/like.png")
              }
              style={styles.imageIcons}
            />
            <Text style={styles.mh10}>{upvotes}</Text>
          </TouchableOpacity>
          <Image
            source={require("../assets/comment.png")}
            style={styles.imageIcons}
          />
          <Text style={styles.mh10}>{post?.comments_count}</Text>
        </View>
        <Image
          source={require("../assets/group.png")}
          style={[styles.imageIcons, styles.mr10]}
        />
      </View>
      <Text style={styles.postText}>{caption}</Text>
    </TouchableOpacity>
  );
};
