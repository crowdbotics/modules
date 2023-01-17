import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  heading: {
    height: 60,
    backgroundColor: "#333333",
    padding: 20,
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "center"
  }
});

const userToken = "User Token";
export default {
  styles: styles,
  user_token: userToken
};
