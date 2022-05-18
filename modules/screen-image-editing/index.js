import React from "react";
import { Text, StyleSheet, View, TouchableHighlight, Image } from "react-native";

const ImageEditing = (params) => {
  return (
    <View style={styles.container}>
      <View>
        <Text>Image editing</Text>
        <View style={styles.imageContainer}>
          <Image source={require("./assets/edit.png")} />
        </View>
        <View style={styles.tabView}>
          <View style={styles.crop}>
            <Text>Crop</Text>
          </View>
          <View style={styles.tabElements}>
            <Text>Filters</Text>
          </View>
          <View style={styles.tabElements}>
            <Text>Edit</Text>
          </View>
          <View style={styles.tabElements}>
            <Text>Shadows</Text>
          </View>
        </View>
        <View style={styles.screenSize}>
          <View style={styles.screenImage}>
            <Image source={require("./assets/Rectangle.png")}/>
            <Text>1.1</Text>
          </View>
          <View style={styles.screenImage}>
            <Image source={require("./assets/Rectangle(1).png")}/>
            <Text>2.3</Text>
          </View>
          <View style={styles.screenImage}>
            <Image source={require("./assets/Rectangle(2).png")}/>
            <Text>3.2</Text>
          </View>
          <View style={styles.screenImage}>
            <Image source={require("./assets/Rectangle(3).png")}/>
            <Text>3.4</Text>
          </View>
          <View style={styles.screenImage}>
            <Image source={require("./assets/Rectangle(4).png")}/>
            <Text>4.3</Text>
          </View>
          <View style={styles.screenImage}>
            <Image source={require("./assets/Rectangle(5).png")}/>
            <Text>4.5</Text>
          </View>
        </View>

      </View>
      <View style={styles.btn}>
        <Button>Apply</Button>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between"
  },
  imageContainer: {
    height: "60%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FCF1D6",
    marginTop: 30,
    borderRadius: 10
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
    justifyContent: "space-between",
    paddingHorizontal: 10
  },
  screenImage: {
    justifyContent: "flex-end",
    alignItems: "center"
  },
  btn: {
    paddingHorizontal: "10%"
  }
});

export default ImageEditing;

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
