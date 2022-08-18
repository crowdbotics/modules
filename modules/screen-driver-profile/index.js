import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  ScrollView
} from "react-native";

const DriverProfile = () => {
  const [profile, setProfile] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [carModel, setCarModel] = useState("");
  const [seats, setSeats] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [color, setColor] = useState("");
  useEffect(() => {
    setProfile({
      name: "Username",
      email: "Username@email.com",
      picture: require("./assets/profilePicture.png")
    });
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image source={profile.picture} style={styles.profilePicture} />
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.email}>{profile.email}</Text>
        </View>
        <View style={styles.separator}>
          <Text style={[styles.separatorText, styles.green]}>Edit Account</Text>
          <Text style={[styles.separatorText, styles.red]}>Delete Account</Text>
        </View>
        <Input text="Name" value={name} onChange={text => setName(text)} />
        <Input text="Email" value={email} onChange={text => setEmail(text)} />
        <View style={styles.halfInputs}>
          <Input
            text="Car Model"
            value={carModel}
            onChange={setCarModel}
            style={styles.input1}
            containerStyle={styles.inputContainer1}
          />
          <Input
            text="Seats"
            value={seats}
            onChange={setSeats}
            style={styles.input2}
            containerStyle={styles.inputContainer2}
          />
        </View>
        <View style={styles.halfInputs}>
          <Input
            text="Plate Number"
            value={plateNumber}
            onChange={setPlateNumber}
            style={styles.input1}
            containerStyle={styles.inputContainer1}
          />
          <Input
            text="Color"
            value={color}
            onChange={setColor}
            style={styles.input2}
            containerStyle={styles.inputContainer2}
          />
        </View>
        <Text style={styles.uploadText}>Driver license</Text>
        <View style={styles.uploadLicense}>
          <Text style={styles.placeholder}>Upload</Text>
          <Pressable style={styles.button}>
            <Image
              source={require("./assets/uploadIcon.png")}
              style={styles.icon}
            />
          </Pressable>
        </View>
        <Button buttonText="Save" />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20
  },
  heading: {
    fontSize: 20
  },
  header: {
    alignItems: "center"
  },
  profilePicture: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    borderRadius: 60
  },
  name: {
    fontSize: 20,
    marginTop: 10
  },
  email: {
    fontSize: 13,
    color: "#aaa"
  },
  separator: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    marginHorizontal: 10,
    borderBottomColor: "#f2f2f2",
    borderBottomWidth: 1,
    marginVertical: 10
  },
  separatorText: {
    fontSize: 14,
    fontWeight: "bold"
  },
  green: {
    color: "#12D790"
  },
  red: {
    color: "#FF6848"
  },
  halfInputs: {
    flexDirection: "row"
  },
  inputContainer1: {
    flex: 1
  },
  inputContainer2: {
    flex: 1
  },
  input1: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRightWidth: 0
  },
  input2: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeftWidth: 0
  },
  uploadText: {
    fontSize: 14,
    marginLeft: 20,
    color: "#111112"
  },
  uploadLicense: {
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 10,
    padding: 2,
    paddingLeft: 20,
    marginVertical: 10,
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  placeholder: {
    fontSize: 14,
    color: "#9B9B9B"
  },
  button: {
    width: 70,
    height: "100%",
    backgroundColor: "#EE4137",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain"
  }
});

export default DriverProfile;

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
        onChangeText={text => props.onChange(text)}
        placeholderTextColor={
          props.placeholderTextColor ? props.placeholderTextColor : "#9B9B9B"
        }
        editable={props.editable !== false}
        autoCapitalize="none"
        autoCorrect={false}
        multiline={!!props.textArea}
      />
      {props.errorText
        ? (
        <Text style={inputStyles.error}>{props.errorText}</Text>
          )
        : null}
      {props.icon
        ? (
        <Image
          source={props.icon}
          style={
            props.text ? inputStyles.iconWithText : inputStyles.iconWithoutText
          }
        />
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
    // flex: 1
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
    height: 50
  },
  iconWithText: {
    position: "absolute",
    right: 30,
    top: 48,
    width: 15,
    height: 15,
    resizeMode: "contain"
  },
  iconWithoutText: {
    position: "absolute",
    right: 30,
    top: 28,
    width: 15,
    height: 15,
    resizeMode: "contain"
  },
  textArea: {
    height: 150
  },
  children: {}
});

const Button = params => {
  const backgroundColor = params.color ? params.color : "#000";
  const textColor = params.textColor ? params.textColor : "#fff";
  const btnStyle = {
    backgroundColor: params.outline ? "#fff" : backgroundColor,
    borderColor: params.outline ? backgroundColor : null,
    borderWidth: params.outline ? 1 : 0
  };
  const btnText = {
    color: params.outline ? "#000" : textColor
  };
  return (
    <View style={buttonStyles.btnContainer}>
      <View style={!params.hideShadow ? buttonStyles.shadowContainer : null}>
        <Pressable
          style={[buttonStyles.btn, btnStyle, params.style]}
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
    paddingHorizontal: 40,
    justifyContent: "center",
    marginVertical: 20
  },
  shadowContainer: {
    shadowColor: "rgba(0, 0, 0, 0.5)",
    elevation: 10,
    backgroundColor: "#fff",
    borderRadius: 10
  },
  btn: {
    height: 50,
    width: "100%",
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
