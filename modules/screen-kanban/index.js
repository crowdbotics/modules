import React from "react";
import { Image, Text, StyleSheet, View } from "react-native";

const KanbanScreen = () => {
  return (
    <View style={styles.container}>
      <Image resizeMode="contain" style={styles.headerImage} source={require("./assets/header.png")} />
      <Text style={styles.text}>Projects</Text>
      <View style={styles.tabView}>
        <View style={styles.selectedTab}>
          <Text>Done</Text>
        </View>
        <View style={styles.tabItem}>
          <Text>To do</Text>
        </View>
      </View>
      <View>
        <FileCard />
        <FileCard />
        <FileCard />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#FFF",
    height: "100%"
  },
  headerImage: {
    width: "100%",
    height: 200
  },
  text: {
    color: "#1E2022",
    fontSize: 14,
    fontWeight: "900"
  },
  tabView: {
    width: "60%",
    height: 48,
    backgroundColor: "#F1F1F1",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 6,
    marginVertical: 20
  },
  selectedTab: {
    borderRadius: 10,
    backgroundColor: "#fff",
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "gray",
    elevation: 10
  },
  tabItem: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    borderRadius: 10
  }
});

export default KanbanScreen;

const FileCard = () => {
  return (
    <View style={fileStyles.container}>
      <View style={fileStyles.innerContainer}>
        <View style={fileStyles.img}>
          <Image source={require("./assets/edit.png")}/>
        </View>
        <View style={fileStyles.textContainer}>
          <Text>Project</Text>
          <Text>18 June 2022, 10:30 AM</Text>
        </View>
        <View style={fileStyles.actionContainer}>
          <Image style={fileStyles.action} source={require("./assets/checkbox.png")}/>
        </View>
      </View>
    </View>
  );
};
const fileStyles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: "#FFF",
    shadowColor: "gray",
    elevation: 8,
    marginVertical: 5
  },
  innerContainer: {
    borderRadius: 10,
    flexDirection: "row",
    padding: 10
  },
  img: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FCF1D6",
    height: 80,
    width: 80,
    borderRadius: 10
  },
  actionContainer: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center"
  },
  action: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40
  },
  textContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20
  }
});
