import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Image
} from "react-native";

const ArchiveContent = (params) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData([
      {
        id: 1,
        archiveDate: "7 MAR",
        imageSrc: require("./assets/crowdbotics.png")
      },
      {
        id: 2,
        archiveDate: "10 APR",
        imageSrc: require("./assets/crowdbotics.png")
      },
      {
        id: 3,
        archiveDate: "13 MAY",
        imageSrc: require("./assets/crowdbotics.png")
      },
      {
        id: 4,
        archiveDate: "16 JUN",
        imageSrc: require("./assets/crowdbotics.png")
      },
      {
        id: 5,
        archiveDate: "5 JAN",
        imageSrc: require("./assets/crowdbotics.png")
      },
      {
        id: 6,
        archiveDate: "18 JUL",
        imageSrc: require("./assets/crowdbotics.png")
      },
      {
        id: 7,
        archiveDate: "21 AUG",
        imageSrc: require("./assets/crowdbotics.png")
      },
      {
        id: 8,
        archiveDate: "24 SEP",
        imageSrc: require("./assets/crowdbotics.png")
      },
      {
        id: 9,
        archiveDate: "27 OCT",
        imageSrc: require("./assets/crowdbotics.png")
      },
      {
        id: 10,
        archiveDate: "30 NOV",
        imageSrc: require("./assets/crowdbotics.png")
      },
      {
        id: 11,
        archiveDate: "1 DEC",
        imageSrc: require("./assets/crowdbotics.png")
      },
      {
        id: 12,
        archiveDate: "4 JAN",
        imageSrc: require("./assets/crowdbotics.png")
      },
      {
        id: 13,
        archiveDate: "30 NOV",
        imageSrc: require("./assets/crowdbotics.png")
      },
      {
        id: 14,
        archiveDate: "1 DEC",
        imageSrc: require("./assets/crowdbotics.png")
      },
      {
        id: 15,
        archiveDate: "4 JAN",
        imageSrc: require("./assets/crowdbotics.png")
      },
      {
        id: 16,
        archiveDate: "30 NOV",
        imageSrc: require("./assets/crowdbotics.png")
      },
      {
        id: 17,
        archiveDate: "1 DEC",
        imageSrc: require("./assets/crowdbotics.png")
      },
      {
        id: 18,
        archiveDate: "4 JAN",
        imageSrc: require("./assets/crowdbotics.png")
      }
    ]);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.list}
        data={data}
        numColumns={3}
        renderItem={({ item }) => <Post post={item} />}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{
          justifyContent: "space-between"
        }}
      />
    </SafeAreaView>
  );
};

const Post = ({ post }) => {
  return (
    <View style={styles.postContainer}>
      <Image source={post.imageSrc} style={styles.image} />
      <Text style={styles.archiveDate}>{post.archiveDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
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
  archiveDate: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
    fontSize: 10,
    fontWeight: "700",
    textAlign: "center",
    color: "#000"
  }
});
export default ArchiveContent;
