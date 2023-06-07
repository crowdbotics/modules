import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableHighlight
} from "react-native";

const OnboardingChooseIndustryScreen = (params) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require(// @ts-ignore
            "./assets/back.png")}
          style={styles.back}
        />
        <Text style={styles.heading}>Onboarding</Text>
        <Text />
      </View>
      <Text style={styles.mr10}>List of industries</Text>
      <View style={styles.chooseContainer}>
        <Text>Industry 1</Text>
        <Image source={require("./assets/next.png")} style={styles.nextImg} />
      </View>
      <Text style={styles.mr10}>Choose subindustry</Text>
      <View style={styles.chooseContainer}>
        <Text>Industry 1</Text>
        <Image source={require("./assets/next.png")} style={styles.nextImg} />
      </View>
      <Text style={styles.mr10}>List of specialty</Text>
      <View style={styles.chooseContainer}>
        <Text>Specialty 1</Text>
        <Image source={require("./assets/next.png")} style={styles.nextImg} />
      </View>

      <View style={styles.buttonContainer}>
        <Button>Next</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#FFF"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 30,
    marginTop: 15,
    marginBottom: 40
  },
  back: { width: 11.25, height: 20, resizeMode: "contain", marginLeft: -15 },
  heading: { fontSize: 16, color: "#000" },
  mr10: {
    marginLeft: 25,
    marginBottom: 10
  },
  chooseContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 55,
    borderColor: "#C4C4C4",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 20,
    marginHorizontal: 5,
    marginBottom: 20
  },
  nextImg: { width: 11, height: 20, resizeMode: "contain" },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    position: "absolute",
    bottom: 20,
    width: "100%"
  }
});

const Button = (props) => {
  return (
    <TouchableHighlight onPress={props.onPress} underlayColor="#DDDDDD">
      <View
        style={[
          btnStyles.button,
          {
            backgroundColor: props.backgroundColor
              ? props.backgroundColor
              : "#000000",
            height: props.height ? props.height : 49,
            borderWidth: props.borderWidth ? props.borderWidth : 0,
            borderColor: props.borderColor ? props.borderColor : "#000000"
          }
        ]}
      >
        <Text
          style={[
            btnStyles.text,
            { color: props.color ? props.color : "#ffffff" }
          ]}
        >
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
    width: 307
  },
  text: {
    fontWeight: "bold",
    fontSize: 15
  }
});
export default OnboardingChooseIndustryScreen;
