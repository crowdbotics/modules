import * as React from "react";
import { Text, View, Image, ScrollView, StyleSheet, TouchableHighlight } from "react-native";

const pressed = () => {
  console.log("pressed");
};

const ActivityFeedScreen = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <ProfileImage />
          <Text style={styles.headerText}>Jay Mahanga</Text>
          <Text style={styles.headerSubText}>jay@gmail.com</Text>
        </View>
        <View style={styles.followingSection}>
          <View style={styles.textarea}>
            <Image style={styles.postIcon} source={require("./assets/posts.png")} />
            <Text>My post</Text>
          </View>
          <View style={styles.textarea}>
            <Image style={styles.followingIcon} source={require("./assets/following.png")} />
            <Text style={styles.followingText}>Following</Text>
          </View>
        </View>

        <View style={styles.pt30}>
          <View style={styles.galleryRow}>
            <View style={styles.smallPost}>
              <Post onPress={pressed}/>
            </View>
            <View style={styles.smallPost}>
              <Post onPress={pressed}/>
            </View>
            <View style={styles.smallPost}>
              <Post onPress={pressed}/>
            </View>
          </View>
        </View>

        <View style={styles.pt10}>
          <View style={styles.galleryRow}>
            <View style={styles.columnRow}>
              <View style={styles.smallPostcolumn}>
                <Post />
              </View>
              <View style={styles.smallPostcolumn}>
                <Post />
              </View>
            </View>
            <View style={styles.largePost}>
              <Post />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({

  container: {
    padding: 10,
    height: "100%",
    backgroundColor: "white"
  },

  followingSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20

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
  headerSubText: {
    marginTop: 5,
    fontSize: 12,
    color: "#C4C4C4"
  },
  postIcon: {
    width: 15,
    height: 15,
    marginBottom: 5,

    shadowColor: "#0000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 1.3,
    shadowRadius: 3.84

  },
  followingIcon: {
    width: 15,
    height: 15,
    marginBottom: 5
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
  }
});

export default ActivityFeedScreen;

const Post = (props) => {
  return (
    <TouchableHighlight onPress={props.onPress} style={postStyles.galleryPost} underlayColor='#DDDDDD'>
        <Image style={postStyles.editIcon} source={require("./assets/edit.png")} />
    </TouchableHighlight>
  );
};

const postStyles = StyleSheet.create({
  galleryPost: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    backgroundColor: "#FCF1D6",
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
    <TouchableHighlight onPress={props.onPress} underlayColor='#DDDDDD'>
      <View style={imageStyles.container}>
        <Image style={imageStyles.image} resizeMode="contain" source={require("./assets/edit.png")} />
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
