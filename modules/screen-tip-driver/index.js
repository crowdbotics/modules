import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  ImageBackground,
  TouchableHighlight
} from "react-native";

const TipDriver = () => {
  return (
    <ScrollView>
    <ImageBackground
      source={require("./assets/background.png")}
      style={styles.imageBackground}
      imageStyle={styles.imageStyle}
    >

      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Image source={require("./assets/back.png")} style={styles.back} />
          <Text/>
          <Image
            source={require("./assets/file.png")}
            style={styles.message}
          />
        </View>
      </View>
      <View style={styles.imageContainer}>
      <Image
            source={require("./assets/direction.png")}
            style={styles.direction}
          />
      </View>
      <View style={styles.detailContainer}>
        <View style={styles.centerSection}>
      <View style={styles.imgContainer2}>
          <Image source={require(

            "./assets/edit.png")} style={styles.editImg} />
        </View>
        </View>
        <Text style={styles.username}>Username</Text>
        <Text style={styles.rating}>5 Star!!!</Text>
        <Text style={styles.text}>Wanna give a tip for Username</Text>

        <View style={styles.tabView}>
        <View style={styles.tabItem}>
          <Text style={[styles.tabText, styles.selectedTab]}>$10</Text>
        </View>
        <View style={styles.tabItem}>
          <Text style={styles.tabText}>$15</Text>
        </View>
        <View style={styles.tabItem}>
          <Text style={styles.tabText}>$20</Text>
        </View>
        <View style={styles.tabItem}>
          <Text style={styles.tabText}>$25</Text>
        </View>
        <View style={styles.tabItem}>
          <Text style={styles.tabText}>$30</Text>
        </View>
      </View>
      <View style={styles.buttonBottom}>
        <Button>Confirm</Button>
        <Button backgroundColor="#fff" color="#000" borderWidth={1} >
          Pass
        </Button>
      </View>
      </View>
    </ImageBackground>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  back: { width: 11.25, height: 20, resizeMode: "contain", marginLeft: -15 },
  message: { width: 70, height: 70, resizeMode: "contain", marginRight: -30, marginBottom: -20 },
  headerContainer: { paddingHorizontal: 10, height: 140 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 30,
    marginTop: 15,
    marginBottom: 20
  },
  imageBackground: {
    width: null,
    height: null,
    flex: 1
  },
  imageStyle: { resizeMode: "stretch" },
  imageContainer: { justifyContent: "center", alignItems: "center" },
  direction: { width: 110, height: 110, resizeMode: "contain", marginLeft: 50 },
  imgContainer2: {
    height: 84,
    width: 84,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DADADA",
    borderRadius: 60
  },
  detailContainer: { backgroundColor: "#fff", paddingHorizontal: 10, paddingVertical: 20 },
  editImg: { resizeMode: "contain", height: 42, width: 42 },
  centerSection: { justifyContent: "center", alignItems: "center" },
  username: { fontSize: 22, textAlign: "center", marginTop: 5 },
  rating: { textAlign: "center", fontSize: 30, fontWeight: "bold", marginTop: 20 },
  text: { textAlign: "center", fontSize: 22, marginTop: 10, color: "#505050", marginHorizontal: 40 },
  tabView: {
    height: 48,
    backgroundColor: "#F1F1F1",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 6,
    marginVertical: 30,
    width: 254,
    alignSelf: "center"
  },
  tabItem: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
    fontWeight: "bold",
    flex: 1
  },
  selectedTab: {
    backgroundColor: "#FFF",
    shadowColor: "gray",
    elevation: 10,
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderRadius: 10
  },
  tabText: { fontSize: 12 },
  buttonBottom: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  }
});

const Button = (props) => {
  return (
    <TouchableHighlight onPress={props.onPress} underlayColor="#DDDDDD">
      <View
        style={[
          btnStyles.button,
          {
            backgroundColor: props.backgroundColor ? props.backgroundColor : "#000000",
            height: props.height ? props.height : 49,
            borderWidth: props.borderWidth ? props.borderWidth : 0,
            borderColor: props.borderColor ? props.borderColor : "#000000"
          }
        ]}
      >
        <Text style={[btnStyles.text, { color: props.color ? props.color : "#ffffff" }]}>
          {props.children}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

const btnStyles = StyleSheet.create({
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 10,
    width: 150
  },
  text: {
    fontWeight: "bold",
    fontSize: 15
  }
});
export default TipDriver;
