import React from "react";
import { Text, View, Image, ScrollView, StyleSheet, TouchableHighlight } from "react-native";

const pressed = () => {
  console.log("pressed");
};

const CreatePost = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={[styles.headerPost, styles.pa]}>
          <Image style={styles.crossIcon} resizeMode="contain" source={require("./assets/cross.png")} />
          <Post onPress={pressed} />
        </View>
        <View style={[styles.actionContainer, styles.pa]}>
          <Text style={styles.actionLeftText}>Choose picture/video</Text>
          <View style={styles.actionRight}>
            <Image style={styles.actionRightImage} resizeMode="contain" source={require("./assets/camera.png")} />
            <Image style={styles.actionRightImage} resizeMode="contain" source={require("./assets/gallery.png")} />
          </View>
        </View>
        <View style={styles.pt30}>
          <View style={styles.galleryRow}>
            <View style={styles.smallPost}>
              <Post />
            </View>
            <View style={styles.smallPost}>
              <Post />
            </View>
            <View style={styles.smallPost}>
              <Post />
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
    height: "100%",
    backgroundColor: "#FFF",
    paddingVertical: 10
  },
  pa: {
    padding: 10
  },
  crossIcon: {
    position: "absolute",
    zIndex: 9,
    height: 10,
    width: 10,
    margin: 20
  },
  headerPost: {
    marginVertical: 20,
    height: 300
  },
  actionContainer: {
    marginVertical: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  actionLeftText: {
    fontSize: 14,
    color: "#3B566E"
  },
  actionRight: {
    display: "flex",
    flexDirection: "row"
  },
  actionRightImage: {
    marginLeft: 10,
    height: 20,
    width: 20
  },
  pt10: {
    paddingTop: 3
  },
  galleryRow: {
    display: "flex",
    flexDirection: "row"
  },
  smallPost: {
    height: 120,
    width: "33.3%",
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

export default CreatePost;

const Post = (props) => {
  return (
    <TouchableHighlight style={postStyles.galleryPost} onPress={props.onPress} underlayColor='#DDDDDD'>
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
