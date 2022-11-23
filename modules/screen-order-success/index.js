import React from "react";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";

const OrderSuccess = () => {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.circle}>
          <Image
            source={require("./assets/checkIcon.png")}
            style={styles.check}
          />
        </View>
        <Text style={styles.heading}>Order Successful</Text>
        <Text style={styles.subHeading}>Your order has been processed.</Text>
      </View>

      <Button buttonText="Go back" style={styles.button} />
      <Button
        buttonText="Track order"
        style={styles.button}
        color="#fff"
        textColor="#000"
        outlineColor="#000"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#12D790",
    alignSelf: "center"
  },
  check: {
    width: 50,
    height: 50
  },
  heading: {
    marginTop: 10,
    fontSize: 32,
    alignSelf: "center",
    color: "#000"
  },
  subHeading: {
    fontSize: 16,
    alignSelf: "center",
    marginTop: 10,
    color: "#8A8A8E"
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    marginBottom: 20,
    marginHorizontal: 20
  }
});

export default OrderSuccess;

const Button = (params) => {
  const backgroundColor = params.color || "#000";
  const textColor = params.textColor || "#fff";
  const btnStyle = {
    backgroundColor: backgroundColor,
    borderColor: params.outlineColor || backgroundColor,
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
          onPress={params.onPress}
        >
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
