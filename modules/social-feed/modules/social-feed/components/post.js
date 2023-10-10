import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { OptionsContext } from "@options";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Comment } from "./comment";
import { useDispatch } from "react-redux";
import { likePost, unLikePost } from "../store";

/**
 * PostComponent displays a single post and handles post-related actions.
 * @param {Object} props - The component's properties.
 * @param {Object} props.postDetails - The details of the post.
 * @param {Function} props.setCallbackVariable - Function to set loading state.
 * @param {Object} props.navigation - React Navigation navigation object.
 * @param {Object} props.actionSheet - Reference to the ActionSheet component.
 * @param {Array} props.baseOptions - Base options for the ActionSheet.
 * @param {Function} props.setPostOptions - Function to set post-related options.
 */
export const PostComponent = ({
  postDetails,
  setCallbackVariable,
  navigation,
  actionSheet,
  baseOptions,
  setPostOptions
}) => {
  const dispatch = useDispatch();
  const { styles } = useContext(OptionsContext);
  const { media, description, upvotes, comments, user, id, liked } =
    postDetails;

  const likeCurrentPost = () => {
    setCallbackVariable(true);
    dispatch(likePost(id)).then(() => setCallbackVariable(false));
  };

  const unLikeCurrentPost = () => {
    setCallbackVariable(true);
    dispatch(unLikePost(id)).then(() => setCallbackVariable(false));
  };

  return (
    <KeyboardAwareScrollView style={{ margin: 10 }}>
      <View style={styles.postDetailsContainer}>
        <TouchableOpacity
          style={styles.usernameContainer}
          onPress={() => {
            navigation.navigate("SocialProfileScreen", { id: user?.id });
          }}
        >
          <View style={styles.postUserImageContainer}>
            <Image
              source={
                user?.photo
                  ? { uri: user.photo }
                  : require("../assets/user.png")
              }
              style={styles.userImageStyles}
            />
          </View>
          <Text style={styles.userNameText}>{user?.name || ""}</Text>
        </TouchableOpacity>
        <View style={{ justifyContent: "space-evenly" }}>
          <TouchableOpacity
            onPress={() => {
              // Add "Delete Post" option for the owner of the post
              postDetails?.is_owner &&
                setPostOptions([...baseOptions, "Delete Post"]);
              // Show the ActionSheet after a brief delay
              setTimeout(() => {
                actionSheet.current.show();
              }, 100);
            }}
          >
            <Image
              source={require("../assets/dots.png")}
              style={{ marginTop: -20 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* Post image */}
      <View
        style={[
          styles.userPostImage,
          {
            backgroundColor: media?.[0]?.background
              ? media?.[0]?.background
              : "#c3aaac"
          }
        ]}
      >
        <Image source={{ uri: media?.[0]?.image }} style={styles.postImage} resizeMode="contain"/>
      </View>
      {/* Post description */}
      <Text style={styles.postText}>{description}</Text>
      <View style={styles.postcontainer}>
        <View style={styles.leftContainer}>
          <TouchableOpacity
            onPress={() => {
              liked ? unLikeCurrentPost() : likeCurrentPost();
            }}
            style={{ flexDirection: "row" }}
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
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Image
              source={require("../assets/comment.png")}
              style={styles.imageIcons}
            />
            <Text style={styles.mh10}>{postDetails?.comments_count}</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={require("../assets/group.png")}
          style={[styles.imageIcons, styles.mr10]}
        />
      </View>
      <Comment
        comments={comments || []}
        setCallbackVariable={setCallbackVariable}
        postId={id}
        navigation={navigation}
      />
    </KeyboardAwareScrollView>
  );
};
