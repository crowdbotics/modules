import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { GlobalOptionsContext } from "@options";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { CommentComponent } from "./comment";

export const PostComponent = ({ postDetails, setLoading, navigation, actionSheet, baseOptions, setPostOptions }) => {
  const gOptions = useContext(GlobalOptionsContext);
  const BASE_URL = gOptions.url;
  const { media, description, upvotes, comments, commentsCount, user, id, liked, isOwner } = postDetails;
  return (
      <KeyboardAwareScrollView style={{ margin: 10 }}>

        <View style={{ flexDirection: "row", alignItems: "stretch", justifyContent: "space-between" }}>

          <TouchableOpacity style={userPostStyles.usernameContainer} onPress={() => { navigation.navigate("SocialProfileScreen", { id: user?.id }); }}>
            <View style={userPostStyles.userImageContainer}>
              <Image
                source={user?.photo ? { uri: user.photo } : require("./assets/user.png")}
                style={userPostStyles.userImage}
              />
            </View>
            <Text style={userPostStyles.userText}>{user?.name || ""}</Text>
          </TouchableOpacity>
          <View style={{ justifyContent: "space-evenly" }}>
            <TouchableOpacity onPress={() => {
              isOwner && setPostOptions([...baseOptions, "Delete Post"]);
              setTimeout(() => {
                actionSheet.current.show();
              }, 100);
            }}>
              <Image
                  source={require("./assets/dots.png")}
                  style={{ marginTop: -20 }}
                />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={[userPostStyles.userPostImage, { backgroundColor: media?.[0]?.background ? media?.[0]?.background : "#c3aaac" }]}
        >
          <Image
            source={{ uri: media?.[0]?.image }}
            style={userPostStyles.postImage}
          />
        </View>
        <Text style={userPostStyles.postText}>{description}</Text>
        <View style={userPostStyles.postcontainer}>
          <View style={userPostStyles.leftContainer}>
            <TouchableOpacity onPress={() => {}} style={{ flexDirection: "row" }} >
              <Image
                source={liked ? require("./assets/unlike.png") : require("./assets/like.png")}
                style={userPostStyles.imageIcons}
              />
              <Text style={userPostStyles.mh10}>{upvotes}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: "row" }}>
              <Image
                source={require("./assets/comment.png")}
                style={userPostStyles.imageIcons}
              />
              <Text style={userPostStyles.mh10}>{commentsCount}</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={require("./assets/group.png")}
            style={[userPostStyles.imageIcons, userPostStyles.mr10]}
          />
        </View>
        <CommentComponent comments={comments || []} setLoading={setLoading} postId={id} navigation={navigation} />
      </KeyboardAwareScrollView>
  );
};

export const userPostStyles = StyleSheet.create({
  usernameContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 10
  },
  userImageContainer: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10
  },
  userImage: {
    height: 15,
    width: 15
  },
  userText: {
    color: "#3B566E",
    marginLeft: 0
  },
  userPostImage: {
    height: 230,
    width: "100%",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },
  postImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    overflow: "hidden",
    borderRadius: 10
  },
  postcontainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10
  },
  leftContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  imageIcons: {
    height: 12,
    width: 12
  },
  mh10: {
    marginHorizontal: 10
  },
  postText: {
    display: "flex",
    justifyContent: "center",
    color: "#6F8BA4",
    marginVertical: 10
  },
  mr10: {
    marginRight: 10
  }
});
