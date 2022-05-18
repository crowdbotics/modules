import React from "react";
import { Text, StyleSheet, View, TouchableHighlight, Image, ScrollView } from "react-native";

const ImageEditingEdit = (params) => {
  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.head}>
        <Text>Image editing</Text>
        <View style={styles.imageContainer}>
          <Image source={require("./assets/edit.png")} />
        </View>
        <View style={styles.tabView}>
          <View style={styles.tabElements}>
            <Text>Crop</Text>
          </View>
          <View style={styles.crop}>
            <Text>Filters</Text>
          </View>
          <View style={styles.tabElements}>
            <Text>Edit</Text>
          </View>
          <View style={styles.tabElements}>
            <Text>Shadows</Text>
          </View>
        </View>

      </View>
        <View style={styles.screenSize}>
          <View style={styles.screenSize}>
            <View style={[styles.filter, styles.fc1]}>
              <Text style={[styles.filterText, styles.tc1]}>Filter 1</Text>
            </View>
            <View style={[styles.filter, styles.fc2]}>
              <Text style={[styles.filterText, styles.tc2]}>Filter 2</Text>
            </View>
            <View style={[styles.filter, styles.fc3]}>
              <Text style={[styles.filterText, styles.tc3]}>Filter 3</Text>
            </View>
          </View>
        </View>
      <View style={styles.btn}>
        <Button>Apply</Button>
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    justifyContent: "space-between",
    flex: 1
  },
  imageContainer: {
    height: 250,
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FCF1D6",
    marginTop: 30,
    borderRadius: 10,
    alignSelf: "center"
  },
  head: {
    padding: 20
  },
  tabView: {
    width: "100%",
    height: 48,
    backgroundColor: "#F1F1F1",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 5,
    marginVertical: 20
  },
  crop: {
    borderRadius: 10,
    backgroundColor: "#fff",
    width: "20%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  tabElements: {
    width: "20%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    borderRadius: 10
  },
  screenSize: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  screenImage: {
    justifyContent: "flex-end",
    alignItems: "center"
  },
  btn: {
    paddingHorizontal: "10%",
    paddingTop: "10%",
    paddingBottom: 20
  },
  text: {
    color: "#77838F"
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10
  },
  property: {
    color: "#77838F",
    marginRight: 20,
    width: "20%"
  },
  image: {
    height: 14,
    width: "60%",
    marginRight: 8
  },
  filter: {
    height: 130,
    width: 130,
    justifyContent: "flex-end",
    backgroundColor: "#F9D8D9",
    marginRight: 10,
    borderRadius: 4
  },
  filterText: {
    textAlign: "center",
    width: "100%",
    paddingVertical: 5,
    backgroundColor: "rgba(87, 79, 255, 0.355196)",
    color: "#fff"
  },
  fc1: {
    backgroundColor: "#FCF1D6"
  },
  fc2: {
    backgroundColor: "#F9D8D9"
  },
  fc3: {
    backgroundColor: "#D9DADD"
  },
  tc1: {
    backgroundColor: "rgba(79, 255, 110, 0.36)"
  },
  tc2: {
    backgroundColor: "rgba(87, 79, 255, 0.355196)"
  },
  tc3: {
    backgroundColor: "rgba(255, 79, 79, 0.36)"
  }

});

export default ImageEditingEdit;

const Button = (props) => {
  return (
    <TouchableHighlight onPress={props.onPress} underlayColor='#DDDDDD'>
      <View style={[btnStyles.button, {
        backgroundColor: props.backgroundColor ? props.backgroundColor : "#000000",
        height: props.height ? props.height : 49,
        borderWidth: props.borderWidth ? props.borderWidth : 0,
        borderColor: props.borderColor ? props.borderColor : "#000000"
      }]}>
        <Text style={[btnStyles.text, { color: props.color ? props.color : "#ffffff" }]}>{props.children}</Text>
      </View>
    </TouchableHighlight>
  );
};

const btnStyles = StyleSheet.create({
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  text: {
    fontWeight: "bold",
    fontSize: 15
  }
});
