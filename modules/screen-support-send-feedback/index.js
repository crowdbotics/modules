import React from "react";
import { Text, View, StyleSheet, TouchableHighlight, TextInput } from "react-native";

const SupportSendFeedbackScreen = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.labelText}>
          Email address
        </Text>
        <Input
          placeholder='Enter'
        />
      </View>
      <View style={styles.Textarea}>
        <Text style={styles.labelText}>
          Message
        </Text>
        <TextInput style={styles.TextAreaInput}
          numberOfLines={5}
          multiline={true}
          placeholder='Enter'
          placeholderTextColor='#ddd'
        />
      </View>

      <View style={styles.SubmitBtn}>
        <Button>Submit</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    height: "100%",
    backgroundColor: "white"
  },
  labelText: {
    fontSize: 14,
    fontWeight: "400",
    marginBottom: 10,
    marginLeft: 15
  },
  Textarea: {
    marginTop: 30
  },
  TextAreaInput: {
    height: 160,
    borderWidth: 1,
    borderColor: "#C4C4C4",
    borderRadius: 10,
    textAlignVertical: "top",
    padding: 10
  },
  SubmitBtn: {
    marginTop: 100
  }
});

export default SupportSendFeedbackScreen;

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

const Input = (props) => {
  return (
    <View>
      <TextInput
        style={textStyles.input}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={(num) => props.setValue(num)}
        placeholderTextColor='#ddd'
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
    paddingHorizontal: 10
  },
  error: {
    fontSize: 13,
    color: "#FA060D",
    paddingTop: 8
  }
});
