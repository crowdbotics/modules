import React, { useContext, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import { OptionsContext } from "@options";
import { useDispatch } from "react-redux";
import { addComment, likeComment, unLikeComment } from "../store";

/**
 * Displays comments for a post and handles comment-related actions.
 * @param {Object} props - The component's properties.
 * @param {Array} props.comments - The comments to display.
 * @param {Function} props.setCallbackVariable - Function to set loading state.
 * @param {number} props.postId - The ID of the post.
 * @param {Object} props.navigation - React Navigation navigation object.
 */
export const Comment = ({
  comments,
  setCallbackVariable,
  postId,
  navigation
}) => {
  const [comment, setComment] = useState("");

  // Save the comment reference for reply
  const refComment = useRef(null);

  const { styles } = useContext(OptionsContext);
  const dispatch = useDispatch();

  const unLikePostComment = (id) => {
    setCallbackVariable(true);
    dispatch(unLikeComment(id)).then(() => setCallbackVariable(false));
  };

  const likePostComment = (id) => {
    setCallbackVariable(true);
    dispatch(likeComment(id)).then(() => setCallbackVariable(false));
  };

  // Submit a new comment to backend
  const submitComment = () => {
    if (comment.trim().length !== 0) {
      setCallbackVariable(true);
      dispatch(
        addComment({
          comment,
          ref_comment: refComment.current,
          post_id: postId
        })
      ).then(() => {
        setCallbackVariable(false);
        setComment("");
        refComment.current = "";
      });
    } else {
      Alert.alert("Error", "Please input some text.");
    }
  };

  return (
    <View style={styles.commentMainContainer}>
      <Text>Comments</Text>
      {comments?.map((item) => {
        return (
          <View style={styles.commentContainer} key={item.key}>
            <View style={styles.singleCommentHeader}>
              <TouchableOpacity
                style={styles.commentUserContainer}
                onPress={() => {
                  navigation.navigate("SocialProfileScreen", {
                    id: item?.user?.id
                  });
                }}
              >
                <View style={styles.commentUserImageContainer}>
                  <Image
                    source={
                      item?.user?.photo
                        ? { uri: item.user.photo }
                        : require("../assets/user.png")
                    }
                    style={styles.commentUserImage}
                  />
                </View>
                <Text style={styles.commentUserText}>{item?.user?.name}</Text>
              </TouchableOpacity>

              <View style={{ justifyContent: "flex-end" }}>
                <TouchableOpacity>
                  <Image
                    source={require("../assets/dots.png")}
                    style={{ marginTop: -20 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.commentText}>{item.comment}</Text>
            <View style={styles.postcontainer}>
              <View style={styles.leftContainer}>
                <TouchableOpacity
                  onPress={() => {
                    item.liked
                      ? unLikePostComment(item.id)
                      : likePostComment(item.id);
                  }}
                  style={styles.commentLikeButton}
                >
                  <Image
                    source={
                      item.liked
                        ? require("../assets/unlike.png")
                        : require("../assets/like.png")
                    }
                    style={styles.imageIcons}
                  />
                  <Text style={styles.mh10}>{item.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.commentReplyButton}
                  onPress={() => {
                    refComment.current = item?.id;
                    setComment("@" + item.user.name);
                  }}
                >
                  <Image
                    source={require("../assets/group.png")}
                    style={[styles.imageIcons, styles.mr10]}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.commentReplyContainer}>
              {item?.children.map((item) => {
                return (
                  <View style={styles.commentReplyContainer} key={item.key}>
                    <View style={styles.commentReplyMain}>
                      <TouchableOpacity
                        style={styles.commentReplyUserContainer}
                        onPress={() => {
                          navigation.navigate("SocialProfileScreen", {
                            id: item?.user?.id
                          });
                        }}
                      >
                        <View style={styles.commentReplyUserImageContainer}>
                          <Image
                            source={
                              item?.user?.photo
                                ? { uri: item.user.photo }
                                : require("../assets/user.png")
                            }
                            style={styles.commentReplyUserImage}
                          />
                        </View>
                        <Text style={styles.commentReplyUserText}>
                          {item?.user?.name}
                        </Text>
                      </TouchableOpacity>
                      <View style={{ justifyContent: "flex-end" }}>
                        <TouchableOpacity>
                          <Image
                            source={require("../assets/dots.png")}
                            style={{ marginTop: -20 }}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <Text style={styles.commentReplyText}>{item.comment}</Text>
                    <View style={styles.postcontainer}>
                      <View style={styles.leftContainer}>
                        <TouchableOpacity
                          onPress={() => {
                            item.liked
                              ? unLikePostComment(item.id)
                              : likePostComment(item.id);
                          }}
                          style={styles.replyLikeButton}
                        >
                          <Image
                            source={
                              item.liked
                                ? require("../assets/unlike.png")
                                : require("../assets/like.png")
                            }
                            style={styles.imageIcons}
                          />
                          <Text style={styles.mh10}>{item.likes}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{ borderWidth: 0, padding: 5 }}
                          onPress={() => {
                            refComment.current = item?.id;

                            setComment("@" + item.user.name);
                          }}
                        >
                          <Image
                            source={require("../assets/group.png")}
                            style={[styles.imageIcons, styles.mr10]}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        );
      })}
      <View style={styles.commentTextInput}>
        <TextInput
          style={[styles.replyInput, { flex: 0.8 }]}
          placeholder="Add a comment"
          onChangeText={(newText) => setComment(newText)}
          defaultValue={comment}
        />
        <TouchableOpacity
          onPress={() => {
            submitComment();
          }}
          style={[
            styles.commentSubmitButton,
            !comment && { backgroundColor: "lightgray" }
          ]}
        >
          <Image
            source={require("../assets/send.png")}
            style={styles.userImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
