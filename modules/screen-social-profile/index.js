import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableHighlight
} from "react-native";

const SocialProfile = () => {
  const pressed = () => {
    console.log("pressed");
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.head}>
          <View style={styles.headerContainer}>
            <ProfileImage />
            <Text style={styles.headerText}>Username</Text>
          </View>
          <View style={styles.followingSection}>
            <View style={styles.textarea}>
              <Text>4513</Text>
              <Text style={styles.followingText}>Followers</Text>
            </View>
            <View style={styles.textarea}>
              <Text>2154</Text>
              <Text style={styles.followingText}>Following</Text>
            </View>
          </View>
          <View style={styles.tabView}>
            <View style={styles.follow}>
              <Text>Follow</Text>
            </View>
            <View style={styles.messages}>
              <Text>Messages</Text>
            </View>
          </View>
          <View style={styles.images}>
            <Image source={require("./assets/img2.png")} style={styles.img} />
            <Image source={require("./assets/img.png")} style={styles.img} />
            <Image source={require("./assets/video.png")} style={styles.img} />
          </View>
        </View>

        <View style={styles.pt30}>
          <View style={styles.galleryRow}>
            <View style={[styles.smallPost]}>
              <Post onPress={pressed} backgroundColor="#FCF1D6" />
            </View>
            <View style={[styles.smallPost]}>
              <Post onPress={pressed} backgroundColor="#D9DADD" />
            </View>
            <View style={[styles.smallPost]}>
              <Post onPress={pressed} backgroundColor="#C4C4C4" />
            </View>
          </View>
        </View>

        <View style={styles.pt10}>
          <View style={styles.galleryRow}>
            <View style={styles.columnRow}>
              <View style={styles.smallPostcolumn}>
                <Post backgroundColor="#D9DADD" />
              </View>
              <View style={styles.smallPostcolumn}>
                <Post backgroundColor="#FCF1D6" />
              </View>
            </View>
            <View style={styles.largePost}>
              <Post backgroundColor="#C4C4C4" />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: "#fff"
  },
  headingTxt: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 12,
    padding: 10,
    height: "100%",
    backgroundColor: "white"
  },
  head: {
    paddingHorizontal: 20
  },
  followingSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 30
  },
  headerContainer: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    alignItems: "center"
  },
  headerText: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: "bold"
  },
  tabView: {
    width: "80%",
    height: 48,
    backgroundColor: "#F1F1F1",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 30,
    paddingVertical: 6
  },
  follow: {
    borderRadius: 10,
    backgroundColor: "#fff",
    width: "45%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  messages: {
    width: "45%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F1F1"
  },

  images: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "10%",
    marginTop: 20
  },
  img: {
    width: 20,
    height: 15
  },
  textarea: {
    display: "flex",
    alignItems: "center"
  },
  followingText: {
    fontSize: 14,
    color: "#C4C4C4"
  },
  pt30: {
    paddingTop: 30
  },
  pt10: {
    paddingTop: 5
  },
  galleryRow: {
    display: "flex",
    flexDirection: "row"
  },
  smallPost: {
    height: 120,
    width: "33%",
    paddingHorizontal: 3
  },
  columnRow: {
    width: "33%"
  },
  smallPostcolumn: {
    height: 120,
    width: "100%",
    padding: 3
  },
  largePost: {
    height: 240,
    width: "67%",
    padding: 3
  },
  bgcGray: {
    backgroundColor: "#D9DADD"
  },
  bgcDarkGray: {
    backgroundColor: "#C4C4C4"
  },
  bgcYellow: {
    backgroundColor: "#FCF1D6"
  }
});

const Post = (props) => {
  return (
    <TouchableHighlight
      onPress={props.onPress}
      style={[
        postStyles.galleryPost,
        { backgroundColor: props.backgroundColor }
      ]}
      underlayColor="#DDDDDD"
    >
      <Image
        style={postStyles.editIcon}
        source={require("./assets/edit.png")}
      />
    </TouchableHighlight>
  );
};

const postStyles = StyleSheet.create({
  galleryPost: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5
  },
  editIcon: {
    height: 35,
    width: 35
  }
});

const ProfileImage = (props) => {
  return (
    <TouchableHighlight onPress={props.onPress} underlayColor="#DDDDDD">
      <View style={imageStyles.container}>
        <Image
          style={imageStyles.image}
          resizeMode="contain"
          source={require("./assets/edit.png")}
        />
      </View>
    </TouchableHighlight>
  );
};

const imageStyles = StyleSheet.create({
  container: {
    backgroundColor: "lightgray",
    height: 70,
    width: 70,
    borderRadius: 35,
    display: "flex",
    alignItems: "center"
  },
  image: {
    width: 20,
    marginTop: 4
  }
});

export default SocialProfile;
