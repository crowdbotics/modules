import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, Image, FlatList } from "react-native";

const VideoListingScreen = (params) => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    setVideos([
      {
        id: 1,
        title: "Brasil - Rio de Janeiro",
        description: "481 Video - Brasil - 2022",
        thumbnail: require("./assets/image1.png")
      },
      {
        id: 2,
        title: "Spain - Barcelona",
        description: "481 Video - Spain - 2022",
        thumbnail: require("./assets/image2.png")
      },
      {
        id: 3,
        title: "Italy - Rome",
        description: "481 Video - Italy - 2022",
        thumbnail: require("./assets/image3.png")
      },
      {
        id: 4,
        title: "USA - New York",
        description: "481 Video - USA - 2022",
        thumbnail: require("./assets/image4.png")
      },
      {
        id: 5,
        title: "Peru - Lima",
        description: "481 Video - Peru - 2022",
        thumbnail: require("./assets/image1.png")
      },
      {
        id: 6,
        title: "India - New Delhi",
        description: "481 Video - India - 2022",
        thumbnail: require("./assets/image2.png")
      }
    ]);
  }, []);
  return (
    <View style={styles.container}>
      <TabView tabTitles={["List View", "Grid View"]} selected={1} />
      <FlatList
        style={styles.list}
        data={videos}
        numColumns={2}
        renderItem={({ item }) => <Video video={item} />}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{
          justifyContent: "space-around"
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  headingTxt: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 2,
    marginVertical: 12
  },
  list: {
    marginTop: 30
  }
});
export default VideoListingScreen;
const TabView = ({ tabTitles, selected }) => {
  return (
    <View style={tabViewStyles.paletteContainer}>
      {tabTitles.map((title, index) => (
        <View
          style={
            index === selected
              ? tabViewStyles.selected
              : tabViewStyles.unSelected
          }
          key={index}
        >
          <Text>{title}</Text>
        </View>
      ))}
    </View>
  );
};

const tabViewStyles = StyleSheet.create({
  paletteContainer: {
    width: "70%",
    height: 48,
    backgroundColor: "#F1F1F1",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 6,
    marginVertical: 10,
    marginHorizontal: 20
  },
  selected: {
    borderRadius: 10,
    flex: 1,
    backgroundColor: "#fff",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "gray",
    elevation: 10
  },
  unSelected: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    borderRadius: 10
  }
});
const Video = ({ video }) => {
  return (
    <View style={videoStyles.container}>
      <Image source={video.thumbnail} style={videoStyles.thumbnail} />
      <View style={videoStyles.descriptionContainer}>
        <Text style={videoStyles.titleText}>{video.title}</Text>
        <Text style={videoStyles.descriptionText}>{video.description}</Text>
      </View>
    </View>
  );
};
const videoStyles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    width: 145
  },
  thumbnail: {
    height: 170,
    width: 145
  },
  descriptionContainer: {
    justifyContent: "center",
    paddingVertical: 10
  },
  titleText: {
    fontSize: 14,
    fontWeight: "bold"
  },
  descriptionText: {
    fontSize: 10,
    color: "#7C7C7C"
  }
});
