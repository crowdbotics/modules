import React from "react";
import { Text, StyleSheet, View, Image } from "react-native";

const UpvoteDownvote = (params) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userIcon}>
          <Image
            source={require("./assets/edit.png")}
            style={styles.img}
          />
        </View>
        <Text>Username</Text>
      </View>
      <View style={styles.main}>
        <Image
          source={require("./assets/edit.png")}
        />
      </View>
      <View style={styles.likesContainer}>
        <View style={styles.iconContainer}>
          <Image
            source={require("./assets/like.png")}
            style={styles.likeIcon}
          />
          <Text>2545</Text>
        </View>
        <View style={styles.iconContainer}>
          <Text>1546</Text>
          <Image
            source={require("./assets/unlike.png")}
            style={styles.likeIcon}
          />
        </View>
      </View>
      <Text style={styles.text}>Mauris ultrices ut mauris ut elementum nunc. Quisque eu vulputate nunc. Sed odio lectus.</Text>
      <View style={styles.footer}>
        <View style={styles.footerContainer}>
          <Image
            source={require("./assets/like.png")}
            style={styles.img2}
          />
        </View>
        <View style={styles.footerContainer}>
          <Image
            source={require("./assets/unlike.png")}
            style={styles.img2}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    flexDirection: "row",
    alignItems: "center"
  },
  userIcon: {
    height: 34,
    width: 34,
    borderRadius: 17,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    marginRight: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  img: {
    height: 20,
    width: 20
  },
  main: {
    height: "60%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FCF1D6",
    borderRadius: 10,
    marginVertical: 10
  },
  likesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  likeIcon: {
    height: 16,
    width: 16,
    marginHorizontal: 10
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    marginVertical: 15,
    color: "#6F8BA4",
    paddingHorizontal: 5,
    lineHeight: 20
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15
  },
  img2: {
    height: 24,
    width: 24
  },
  footerContainer: {
    height: 46,
    width: 46,
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    marginHorizontal: 10
  }
});

export default UpvoteDownvote;
