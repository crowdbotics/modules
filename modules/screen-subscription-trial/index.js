import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
  Image
} from "react-native";

const SubscriptionTrial = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.heading}>Free tiral period</Text>
        <View style={styles.daysContainer}>
          <Text style={styles.days}>30</Text>
          <Text>Days</Text>
        </View>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non at sed.
        </Text>
        <View style={styles.separator}>
          <View style={styles.bar} />
          <Text style={styles.separatorText}>Or</Text>
          <View style={styles.bar} />
        </View>
        <Text style={styles.periodHeading}>Choose your period</Text>
        <View style={styles.inputsContainer}>
          <Input
            text="Start date"
            value={startDate}
            onChange={setStartDate}
            containerStyle={styles.input}
          />
          <Input
            text="End date"
            value={endDate}
            onChange={setEndDate}
            containerStyle={styles.input}
          />
        </View>
        <Button buttonText="Ok" style={styles.button} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center"
  },
  daysContainer: {
    width: 130,
    height: 130,
    borderRadius: 70,
    borderColor: "#12D790",
    borderWidth: 12,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 20
  },
  days: {
    fontSize: 36,
    fontWeight: "bold"
  },
  description: {
    fontSize: 14,
    color: "#888888",
    textAlign: "center",
    paddingHorizontal: 40
  },
  separator: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20
  },
  bar: {
    width: 100,
    height: 1,
    backgroundColor: "#e6e6e6"
  },
  separatorText: {
    fontSize: 14,
    color: "#888888",
    marginHorizontal: 30
  },
  periodHeading: {
    fontSize: 18,
    color: "#000",
    textAlign: "center",
    marginVertical: 10,
    fontWeight: "bold"
  },
  inputsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 20
  },
  input: {
    flex: 1,
    marginHorizontal: 5
  },
  button: {
    marginHorizontal: 40,
    marginTop: 60,
    marginBottom: 20
  }
});

export default SubscriptionTrial;

const Input = props => {
  return (
    <View style={[inputStyles.inputContainer, props.containerStyle]}>
      {props.text
        ? (
        <Text style={inputStyles.inputText}>{props.text}</Text>
          )
        : null}

      <TextInput
        style={[
          inputStyles.input,
          props.style,
          props.textArea ? inputStyles.textArea : null
        ]}
        placeholder={props.placeholder ? props.placeholder : "Enter"}
        value={props.value}
        onChangeText={() => props.onChange()}
        placeholderTextColor={
          props.placeholderTextColor ? props.placeholderTextColor : "#9B9B9B"
        }
        editable={props.editable !== false}
        autoCapitalize="none"
        autoCorrect={false}
        multiline={!!props.textArea}
        backgroundColor={props.backgroundColor}
        secureTextEntry={props.secureTextEntry}
      />
      {props.errorText
        ? (
        <Text style={inputStyles.error}>{props.errorText}</Text>
          )
        : null}
      {props.icon
        ? (
        <Pressable
          onPress={() => props.iconOnPress()}
          style={inputStyles.iconWithText}>
          <Image source={props.icon} style={inputStyles.icon} />
        </Pressable>
          )
        : null}
      <View style={styles.children}>{props.children}</View>
    </View>
  );
};

const inputStyles = StyleSheet.create({
  inputContainer: {
    flexDirection: "column",
    justifyContent: "center"
  },
  inputText: {
    fontSize: 14,
    marginLeft: 20,
    color: "#111112"
  },
  input: {
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 10,
    padding: 10,
    paddingLeft: 20,
    marginVertical: 10,
    width: "100%",
    height: 50,
    color: "#000"
  },
  iconWithText: {
    position: "absolute",
    right: 30,
    bottom: 25,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1
  },
  icon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  textArea: {
    height: 150
  },
  children: {}
});

const Button = params => {
  const backgroundColor = params.backgroundColor || "#000";
  const textColor = params.textColor || "#fff";
  const btnStyle = {
    backgroundColor: backgroundColor,
    borderColor: params.borderColor || backgroundColor,
    borderWidth: 1
  };
  const btnText = {
    color: textColor
  };
  return (
    <View style={[buttonStyles.btnContainer, params.style]}>
      <View style={!params.hideShadow ? buttonStyles.shadowContainer : null}>
        <Pressable
          style={[buttonStyles.btn, btnStyle]}
          onPress={params.onPress}>
          <Text style={[buttonStyles.btnText, btnText]}>
            {params.buttonText}
          </Text>
          <View style={styles.childrenContainer}>{params.children}</View>
        </Pressable>
      </View>
    </View>
  );
};

const buttonStyles = StyleSheet.create({
  btnContainer: {
    justifyContent: "center"
  },
  shadowContainer: {
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    backgroundColor: "#fff",
    borderRadius: 10
  },
  btn: {
    height: 50,
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row"
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  childrenContainer: {
    justifyContent: "center",
    alignItems: "center"
  }
});
