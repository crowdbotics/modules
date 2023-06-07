import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
  TextInput
} from "react-native";

const OnboardingAddCertificateScreen = (params) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require(// @ts-ignore
            "./assets/back.png")}
          style={styles.back}
        />
        <Text style={styles.heading}>Add Certificates</Text>
        <Image
          source={require(// @ts-ignore
            "./assets/image.png")}
          style={styles.image}
        />
      </View>
      <Text style={styles.subHeading}>Educational Certificates</Text>
      <Text style={styles.mr10}>Certificate Name</Text>
      <View style={[styles.textInput, { marginBottom: 10 }]}>
        <Input placeholder="Enter" />
      </View>
      <Text style={styles.mr10}>Issuing organization</Text>
      <View style={[styles.textInput, { marginBottom: 10 }]}>
        <Input placeholder="Enter" />
      </View>
      <Text style={styles.mr10}>Issue date</Text>
      <View style={[styles.textInput, { marginBottom: 10 }]}>
        <Input placeholder="Enter" />
      </View>

      <View style={styles.checkboxContainer}>
        <Image
          source={require(// @ts-ignore
            "./assets/checkbox.png")}
          style={styles.checkbox}
        />
        <Text style={styles.label}>This certificate doesn&apos;t expire</Text>
      </View>

      <Text style={styles.mr10}>Upload certificate</Text>
      <View style={styles.chooseContainer}>
        <Text>Choose certificate</Text>
        <Image
          source={require(// @ts-ignore
            "./assets/upload.png")}
          style={styles.chooseImg}
        />
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
  image: { width: 21, height: 21, resizeMode: "contain", marginRight: -15 },
  subHeading: {
    fontSize: 16,
    fontWeight: "400",
    marginLeft: 13,
    marginBottom: 20
  },
  mr10: {
    marginLeft: 25,
    marginBottom: 10
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#C4C4C4",
    marginBottom: 10,
    marginHorizontal: 7,
    paddingHorizontal: 10
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    marginLeft: 30
  },
  checkbox: {
    alignSelf: "center",
    width: 18,
    height: 18,
    resizeMode: "contain"
  },
  label: {
    marginLeft: 15
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
    marginHorizontal: 5
  },
  chooseImg: { width: 18, height: 20, resizeMode: "contain" },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    top: 15
  }
});

const Input = (props) => {
  return (
    <View style={InputStyles.container}>
      <TextInput
        style={InputStyles.input}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={(num) => props.setValue(num)}
        placeholderTextColor="#000"
        multiline={props.multiline}
        numberOfLines={props.multiline ? 10 : null}
        editable={props.editable !== false}
      />
    </View>
  );
};

const InputStyles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 10
  },
  input: {
    backgroundColor: "#fff",
    height: 49,
    color: "#000",
    fontSize: 14
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

export default OnboardingAddCertificateScreen;
