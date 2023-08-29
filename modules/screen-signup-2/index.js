import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
  ScrollView
} from "react-native";

const Signup2 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isCheck, setIsCheck] = useState(false);
  const [secureTextEntryPassword, setSecureTextEntryPassword] = useState(true);
  const [secureTextEntryConfirmPassword, setSecureTextEntryConfirmPassword] =
    useState(true);
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Welcome</Text>
        <Text style={styles.subHeading}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non at sed.
        </Text>
        <Input
          text="Email address"
          placeholder="Enter your email address"
          value={email}
          onChange={setEmail}
          containerStyle={styles.inputContainer}
        />
        <Input
          text="Password"
          placeholder="Enter your password"
          value={password}
          onChange={setPassword}
          containerStyle={styles.inputContainer}
          secureTextEntry={secureTextEntryPassword}
          icon={require("./assets/eyeIcon.png")}
          iconOnPress={() =>
            setSecureTextEntryPassword(!secureTextEntryPassword)
          }
        />
        <Input
          text="Confirm password"
          placeholder="Enter your password again"
          value={confirmPassword}
          onChange={setConfirmPassword}
          containerStyle={styles.inputContainer}
          secureTextEntry={secureTextEntryConfirmPassword}
          icon={require("./assets/eyeIcon.png")}
          iconOnPress={() =>
            setSecureTextEntryConfirmPassword(!secureTextEntryConfirmPassword)
          }
        />
        <View style={styles.flexRow}>
          <Checkbox
            value={isCheck}
            setValue={setIsCheck}
            style={styles.checkbox}
          />
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non at sed.
          </Text>
        </View>
        <View style={styles.flexRow}>
          <Button buttonText="Sign Up" style={styles.button} />
          <Pressable style={styles.fingerprintButton}>
            <Image
              source={require("./assets/fingerprintIcon.png")}
              style={styles.fingerprintIcon}
            />
          </Pressable>
        </View>
        <Text style={styles.separatorText}>Or Sign Up with</Text>
        <SocialButton text="Apple" icon={require("./assets/appleIcon.png")} />
        <SocialButton text="Google" icon={require("./assets/googleIcon.png")} />
        <SocialButton
          text="Facebook"
          icon={require("./assets/facebookIcon.png")}
        />
        <View style={styles.footer}>
          <Text style={styles.footerText}>I have an account. </Text>
          <Pressable>
            <Text style={[styles.footerText, styles.bold]}>Login</Text>
          </Pressable>
        </View>
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
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
    color: "#222222",
    marginVertical: 10
  },
  subHeading: {
    fontSize: 14,
    color: "#888888",
    textAlign: "center",
    alignSelf: "center",
    width: "80%",
    lineHeight: 20,
    marginBottom: 20
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10
  },
  checkbox: {
    marginLeft: 10
  },
  description: {
    fontSize: 14,
    color: "#888888",
    lineHeight: 20,
    marginLeft: 10,
    flex: 1,
    flexWrap: "wrap"
  },
  button: {
    flex: 1,
    marginRight: 10
  },
  fingerprintButton: {
    width: 50,
    height: 50,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    borderRadius: 10
  },
  fingerprintIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain"
  },
  separatorText: {
    fontSize: 12,
    color: "#888888",
    textAlign: "center",
    alignSelf: "center",
    marginBottom: 20
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20
  },
  footerText: {
    fontSize: 16,
    color: "#888888"
  },
  bold: {
    fontWeight: "bold"
  }
});

export default Signup2;

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

const Checkbox = props => {
  return (
    <Pressable
      onPress={() => {
        props.setValue(!props.value);
      }}
      style={[checkboxStyles.container, props.style]}>
      <Image
        source={
          props.value
            ? require("./assets/checkboxIconActive.png")
            : require("./assets/checkboxIcon.png")
        }
        style={[
          checkboxStyles.checkbox,
          props.color && { tintColor: props.color },
          props.activeColor && props.value && { tintColor: props.activeColor }
        ]}
      />
    </Pressable>
  );
};

const checkboxStyles = StyleSheet.create({
  container: {
    height: 20,
    width: 20
  },
  checkbox: {
    height: "100%",
    width: "100%",
    tintColor: "#000"
  }
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

const SocialButton = props => {
  return (
    <Pressable
      style={[socialButtonStyles.container, props.style]}
      onPress={props.onPress}>
      <Image source={props.icon} style={socialButtonStyles.icon} />
      <Text style={socialButtonStyles.text}>Sign up via {props.text}</Text>
    </Pressable>
  );
};

const socialButtonStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: "100%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#C4C4C4",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    marginVertical: 5
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginRight: 10
  },
  text: {
    fontSize: 16,
    color: "#888888",
    flex: 1,
    textAlign: "center"
  }
});
