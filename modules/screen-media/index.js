import React from "react";
import { Text, StyleSheet, View, Image, ScrollView, TouchableHighlight } from "react-native";

const MediaScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require("./assets/back.png")} style={styles.back} />
        <Text style={styles.heading}>Media</Text>
        <Text />
      </View>
      <View style={styles.tabView}>
        <View style={[styles.tabItem, styles.selectedTab]}>
          <Text>Gallery</Text>
        </View>
        <View style={styles.tabItem}>
          <Text>Video</Text>
        </View>
      </View>
      <View style={styles.totalAmount}>
          <View style={styles.amountText}>
              <Text style={styles.photoList}>Photo List</Text>
              <Text style={styles.photoNo}>123 Photos</Text>
          </View>
          <Image source={require("./assets/upload.png")} style={styles.uploadImg} />
        </View>
      <View style={styles.wrapper}>
        <View style={styles.centerContainer1}>
          <Image source={require("./assets/edit.png")} />
        </View>
        <View style={styles.centerContainer2}>
          <Image source={require("./assets/edit.png")} />
        </View>
        <View style={styles.centerContainer3}>
          <Image source={require("./assets/edit.png")} />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button>Upload</Button>
        <Button backgroundColor="#fff" color="#000" borderWidth={1} >
          Cancel
        </Button>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 30,
    marginTop: 10,
    marginBottom: 40
  },
  back: { width: 11.25, height: 20, resizeMode: "contain", marginLeft: -20 },
  heading: { fontSize: 16, color: "#000", marginLeft: 20 },
  tabView: {
    width: "65%",
    height: 48,
    backgroundColor: "#F1F1F1",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 6,
    marginTop: 10,
    marginBottom: 30
  },
  tabItem: {
    height: "100%",
    paddingHorizontal: 8,
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
    elevation: 10
  },
  wrapper: { justifyContent: "center", alignItems: "center" },
  centerContainer1: {
    width: 346,
    height: 168,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fdf1d6",
    borderRadius: 10
  },
  centerContainer2: {
    width: 346,
    height: 168,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DADADA",
    borderRadius: 10,
    marginVertical: 20
  },
  centerContainer3: {
    width: 346,
    height: 168,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9D8D9",
    borderRadius: 10
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: 30
  },
  totalAmount: {
    paddingHorizontal: 8,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15
  },
  amountText: {
    display: "flex",
    flexDirection: "column"
  },
  photoList: {
    fontSize: 14,
    fontWeight: "500"
  },
  photoNo: {
    fontSize: 12,
    fontWeight: "400",
    color: "#7C7C7C"
  },
  uploadImg: {
    height: 14,
    width: 20,
    marginRight: 10
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
    width: 150
  },
  text: {
    fontWeight: "bold",
    fontSize: 15
  }
});
export default MediaScreen;
