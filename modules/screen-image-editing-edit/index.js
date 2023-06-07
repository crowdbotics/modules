import React from "react";
import { Text, StyleSheet, View, TouchableHighlight, Image, ScrollView } from "react-native";

const ImageEditingEdit = (params) => {
  return (
    <ScrollView>
    <View style={styles.container}>
      <View>
        <Text>Image editing</Text>
        <View style={styles.imageContainer}>
          <Image source={require("./assets/edit.png")} />
        </View>
        <View style={styles.tabView}>
          <View style={styles.tabElements}>
            <Text>Crop</Text>
          </View>
          <View style={styles.tabElements}>
            <Text>Filters</Text>
          </View>
          <View style={styles.crop}>
            <Text>Edit</Text>
          </View>
          <View style={styles.tabElements}>
            <Text>Shadows</Text>
          </View>
        </View>
        <View style={styles.screenSize}>
          <View style={styles.progressContainer}>
            <Text style={styles.property}>Opacity</Text>
            <Image source={require("./assets/image.png")} style={styles.image} />
            <Text style={styles.property}>%12</Text>
          </View>
          <View style={styles.progressContainer}>
            <Text style={styles.property}>Brightness</Text>
            <Image source={require("./assets/image(1).png")} style={styles.image} />
            <Text style={styles.property}>%28</Text>
          </View>
          <View style={styles.progressContainer}>
            <Text style={styles.property}>Highlight</Text>
            <Image source={require("./assets/image(2).png")} style={styles.image} />
            <Text style={styles.property}>%47</Text>
          </View>
          <View style={styles.progressContainer}>
            <Text style={styles.property}>Contrast</Text>
            <Image source={require("./assets/image(3).png")} style={styles.image} />
            <Text style={styles.property}>%85</Text>
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
    padding: 20,
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
    flexDirection: "column",
    justifyContent: "space-between"
  },
  screenImage: {
    justifyContent: "flex-end",
    alignItems: "center"
  },
  btn: {
    paddingHorizontal: "10%",
    paddingVertical: "10%"
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
