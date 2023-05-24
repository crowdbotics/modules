import React, { useEffect, useState, useContext } from "react";
import { slice } from "./store";
import { authorize } from "react-native-app-auth";
import { View, ActivityIndicator, Alert, StyleSheet, ImageBackground, Image, Pressable, Text } from "react-native";
import { OptionsContext } from "@options";
import { useDispatch } from "react-redux";

const BlackbaudSky = ({
  navigation
}) => {
  const [browserRequesting, setBrowserRequesting] = useState(false);
  const options = useContext(OptionsContext);
  const {
    issuer, clientId, redirectUrl, successNavScreen
  } = options;
  const dispatch = useDispatch();
  const config = {
    issuer: issuer,
    clientId: clientId,
    redirectUrl: redirectUrl
  };
  useEffect(() => {

  }, []);
  const login = async () => {
    setBrowserRequesting(true);
    try {
      authorize(config).then(response => {
        dispatch(slice.actions.saveAccessToken(response?.accessToken));
        setBrowserRequesting(false);
        navigation.navigate(successNavScreen);
      }).catch(err => {
        Alert.alert("Error", err.message);
        setBrowserRequesting(false);
      });
    } catch (error) {
      Alert.alert("Error", error.message);
      setBrowserRequesting(false);
    }
  };
  return <View style={styles.container}>
        <View style={styles.logoTopView}>
          <Image source={require("./assets/whitebaudLogo.png")} style={styles.blackbaudTopLogo} />
          <ImageBackground
          source={require("./assets/topBackground.png")}
          style={styles.topBackground}
        ></ImageBackground>
        </View>
        <ImageBackground source={require("./assets/bottomBackground.png")} style={styles.bottomBackground} resizeMode="cover">
          <View style={styles.logoView}>
            <Image source={require("./assets/blackbaudLogo.png")} style={styles.blackbaudLogo} />
          </View>
          <View style={styles.infoContainer}>
              <Text style={styles.infoTitleText}>
                Blackbaud Sky
              </Text>
              <Text style={styles.infoDescText}>
                Login to your Blackbaud Sky account
              </Text>
            </View>
          <Pressable style={styles.loginButton} onPress={() => { login(); }} >
            {browserRequesting
              ? <ActivityIndicator size={"large"} color={"#000"} />
              : <Text style={styles.btnTextColor}>
              Login
            </Text>}
          </Pressable>
        </ImageBackground>

      </View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: "#075a7c"
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
  topBackground: {
    flex: 6,
    width: "100%",
    zIndex: -1,
    marginBottom: -30,
    minHeight: 200
  },
  blackbaudTopLogo: {
    flex: 2,
    height: 60,
    minHeight: 60,
    width: "100%"
  },
  logoTopView: {
    flex: 1
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
  btnTextColor: {
    fontWeight: "500",
    color: "#fff",
    fontSize: 16
  },
  infoContainer: {
  },
  infoTitleText: {
    color: "#000",
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center"
  },
  infoDescText: {
    color: "#666",
    fontSize: 16,
    textAlign: "center"
  }
});

export default {
  title: "BlackbaudSky",
  navigator: BlackbaudSky,
  slice
};
