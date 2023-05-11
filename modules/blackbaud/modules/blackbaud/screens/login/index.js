import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageBackground
} from "react-native";
import bottomBackground from "../../assets/bottomBackground.png";
import logo from "../../assets/blackbaudLogo.png";

const Login = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={bottomBackground}
        style={styles.bottomBackground}
        resizeMode="cover"
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 25
          }}
        >
          <Image source={logo} style={{ height: 64, width: 64 }} />
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate("EventListing")}
        >
          <Text style={styles.textColor}>Login</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#E5E5E5"
  },
  bottomBackground: {
    height: 383,
    width: "100%",
    justifyContent: "space-between"
  },
  backIconStyles: {
    height: 20,
    width: 11
  },
  loginButton: {
    backgroundColor: "#000000",
    width: 330,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 25
  },
  backButtonContainer: {
    marginTop: 43,
    marginLeft: 27
  },
  textColor: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16
  }
});

export default Login;
