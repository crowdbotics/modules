import React from "react";
import { Text, StyleSheet, View, TextInput, TouchableHighlight, Image } from "react-native";

const BankAccountDetailsScreen = (params) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("./assets/back.png")} style={styles.back} />
        <Text style={styles.heading}>Bank account details</Text>
        <Text />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.mr10}>Bank Name</Text>
        <Input placeholder="Enter" />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.mr10}>Account Name</Text>
        <Input placeholder="Enter" />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.mr10}>IBAN</Text>
        <Input placeholder="Enter" />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.mr10}>SWIFT</Text>
        <Input placeholder="Enter" />
      </View>
      <Button>Save</Button>

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
  inputContainer: {
    marginBottom: 10
  },
  mr10: {
    marginLeft: 25,
    marginBottom: 10
  }

});

const Input = (props) => {
  return (
    <View>
      <TextInput
        style={textStyles.input}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={(num) => props.setValue(num)}
        placeholderTextColor="#000"
        editable={props.editable !== false}
      />
      {props.errorText ? <Text style={textStyles.error}>{props.errorText}</Text> : null}
    </View>
  );
};

const textStyles = StyleSheet.create({

  input: {
    backgroundColor: "#fff",
    height: 53,
    borderColor: "#C4C4C4",
    color: "#000",
    borderRadius: 10,
    fontSize: 14,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginHorizontal: 5
  },
  error: {
    fontSize: 13,
    color: "#FA060D",
    paddingTop: 8
  }
});

const Button = (props) => {
  return (
    <TouchableHighlight onPress={props.onPress} underlayColor="#DDDDDD" style={btnStyles.buttonContainer}>
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
  buttonContainer: { justifyContent: "center", alignItems: "center" },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: 307,
    marginTop: 40
  },
  text: {
    fontWeight: "bold",
    fontSize: 15
  }
});

export default BankAccountDetailsScreen;
