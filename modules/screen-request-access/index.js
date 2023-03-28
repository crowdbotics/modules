import React, { useState } from "react";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";

const RequestAccess = () => {
  const [checked, setChecked] = useState(false);
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("./assets/icon.png")} />
      <Text style={styles.heading}>
        Please go to Settings and make the app accessible on locked screen
      </Text>
      <Button buttonText="Close" style={styles.button} />
      <View style={styles.flexRow}>
        <Checkbox value={checked} setValue={setChecked} />
        <Text style={styles.description}>Do not show this again</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  heading: {
    fontSize: 20,
    textAlign: "center",
    color: "#222222",
    width: "90%",
    alignSelf: "center"
  },
  image: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginTop: 100,
    marginBottom: 20
  },
  button: {
    marginHorizontal: 40,
    marginTop: 40,
    marginBottom: 20
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 40
  },
  description: {
    fontSize: 14,
    color: "#888888",
    marginLeft: 10
  }
});

export default RequestAccess;

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
        style={[checkboxStyles.checkbox]}
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
    width: "100%"
  }
});
