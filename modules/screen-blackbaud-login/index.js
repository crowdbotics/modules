import React from "react";
import { Image, ImageBackground, Pressable, StyleSheet, View, Text } from "react-native";

const Login = ({ navigation }) => {
  return <View style={styles.container}>
    <ImageBackground source={require("./assets/bottomBackground.png")} style={styles.bottomBackground} resizeMode="cover">
      <View style={styles.logoView}>
        <Image source={require("./assets/blackbaudLogo.png")} style={styles.blackbaudLogo} />
      </View>
      <Pressable style={styles.loginButton} onPress={() => navigation.navigate("Blackbaud")} >
        <Text style={styles.textColor}>
          Login
        </Text>
      </Pressable>
    </ImageBackground>
  </View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#E5E5E5"
  },
  logoView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25
  },
  bottomBackground: {
    height: 383,
    width: "100%",
    justifyContent: "space-between"
  },
  blackbaudLogo: {
    height: 64,
    width: 64
  },
  loginButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    alignSelf: "center",
    marginBottom: 25,
    paddingHorizontal: 12,
    backgroundColor: "#075a7c",
    width: "80%",
    height: 50
  },
  textColor: {
    fontWeight: "500",
    color: "#fff",
    fontSize: 16
  }
});
export default Login;
