import React from "react";
import { View, ScrollView, Image, Text, StyleSheet } from "react-native";

const data = [
  {
    bgColor: "#FCF1D6",
    key: 1,
    text: "Mauris ultrices ut mauris ut elementum nunc. Quisque eu vulputate nunc. Sed odio lectus."
  },
  {
    bgColor: "#FCF1D6",
    key: 2,
    text: "Mauris ultrices ut mauris ut elementum nunc. Quisque eu vulputate nunc. Sed odio lectus."
  }
];
const Post = () => {
  return (

    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Image
            source={require("./assets/plus.png")}
            style={styles.headerImage}
          />
        </View>
        {data.map((item) => <PostComponent bgColor={item.bgColor} text={item.text} key={item.key} />)}
      </View>
    </ScrollView>

  );
};

export default Post;

const styles = StyleSheet.create({
  container: { padding: 10, height: "100%", backgroundColor: "#FFF" },
  headerContainer: { display: "flex", flexDirection: "row", justifyContent: "flex-end" },
  headerImage: { height: 20, width: 20 }

});

const PostComponent = ({ bgColor, text }) => {
  return (
    <View>
      <View style={userPostStyles.usernameContainer}>
        <View style={userPostStyles.userImageContainer}>
          <Image
          source={require("./assets/tempImage.png")}
          style={userPostStyles.userImage}
          />
        </View>
        <Text style={userPostStyles.userText}>Username</Text>
      </View>
      <View style={[userPostStyles.userPostImage, { backgroundColor: bgColor }]}>
        <Image
          source={require("./assets/tempImage.png")}
          style={userPostStyles.postImage}
        />
      </View>
      <View style={userPostStyles.postcontainer}>
        <View style={userPostStyles.leftContainer}>
          <Image
            source={require("./assets/like.png")}
            style={userPostStyles.imageIcons}
          />
          <Text style={userPostStyles.mh10}>56</Text>
          <Image
            source={require("./assets/comment.png")}
            style={userPostStyles.imageIcons}
          />
          <Text style={userPostStyles.mh10}>6</Text>
        </View>
        <Image
          source={require("./assets/group.png")}
          style={[userPostStyles.imageIcons, userPostStyles.mr10]}
        />
      </View>
      <Text style={userPostStyles.postText}>{text}</Text>
    </View>
  );
};
const userPostStyles = StyleSheet.create({
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
    height: 20,
    width: 20
  },
  userText: {
    color: "#3B566E"
  },
  userPostImage: {
    height: 170,
    width: "100%",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },
  postImage: {
    height: 30,
    width: 30
  },
  postcontainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
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
