import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Image,
  Pressable
} from "react-native";

const CaptchaScreen = (params) => {
  const [captchaImages, setCaptchaImages] = useState([]);
  useEffect(() => {
    setCaptchaImages([
      {
        id: 1,
        imageSrc: require("./assets/crowdboticsImage.png")
      },
      {
        id: 2,
        imageSrc: require("./assets/crowdboticsImage.png")
      },
      {
        id: 3,
        imageSrc: require("./assets/crowdboticsImage.png")
      },
      {
        id: 4,
        imageSrc: require("./assets/crowdboticsImage.png")
      },
      {
        id: 5,
        imageSrc: require("./assets/crowdboticsImage.png")
      },
      {
        id: 6,
        imageSrc: require("./assets/crowdboticsImage.png")
      },
      {
        id: 7,
        imageSrc: require("./assets/crowdboticsImage.png")
      },
      {
        id: 8,
        imageSrc: require("./assets/crowdboticsImage.png")
      },
      {
        id: 9,
        imageSrc: require("./assets/crowdboticsImage.png")
      }
    ]);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.fnt14, styles.black]}>
          Select all same pictures!
        </Text>
        <View style={styles.icons}>
          <Image source={require("./assets/newIcon.png")} />
          <Image source={require("./assets/audioIcon.png")} />
        </View>
      </View>
      <FlatList
        style={styles.list}
        data={captchaImages}
        numColumns={3}
        renderItem={({ item }) => <Post post={item} />}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{
          justifyContent: "space-between"
        }}
      />
      <View style={styles.btnContainer}>
        <Pressable style={styles.btn}>
          <Text style={styles.btnText}>Submit</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const Post = ({ post }) => {
  return (
    <View style={styles.postContainer}>
      <Image source={post.imageSrc} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center"
  },
  icons: {
    flexDirection: "row",
    flex: 0.4,
    justifyContent: "space-between",
    alignItems: "center" // borderColor: '#000',
    // borderWidth: 1,
  },
  list: {
    marginTop: 10,
    flex: 1,
    height: "100%"
  },
  postContainer: {
    height: 125,
    width: 125,
    borderRadius: 10,
    margin: 3
  },
  image: {
    height: 125,
    width: 125,
    borderRadius: 10
  },
  fnt14: {
    fontSize: 14
  },
  bold: {
    fontWeight: "bold"
  },
  black: {
    color: "#000"
  },
  btnContainer: {
    padding: 30,
    paddingTop: 10,
    paddingHorizontal: 40,
    justifyContent: "center",
    marginTop: 20
  },
  btn: {
    backgroundColor: "black",
    height: 50,
    width: "100%",
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  }
});
export default CaptchaScreen;
