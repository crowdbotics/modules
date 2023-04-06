import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  hr: {
    marginTop: 20,
    marginBottom: 20,
    borderBottomColor: "black",
    borderBottomWidth: 1
  },
  container: {
    flex: 1,
    height: 100,
    padding: 13
  },
  text: {
    color: "black",
    fontSize: 20
  },
  payButton: {
    width: "40%",
    height: 50,
    alignSelf: "center"
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    margin: 5,
    height: 50
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white"
  },
  payNow: {
    width: "40%",
    alignSelf: "center",
    backgroundColor: "#016f70"
  },
  bold: {
    fontWeight: "600"
  },
  listItemContainer: {
    padding: 10,
    margin: 10,
    backgroundColor: "#c9c9c9c9",
    borderRadius: 10
  }
});

const token = "Token user_authentication_token";
export const localOptions = {
  stripeSecretKey: "",
  merchantName: "Example Inc.",
  enableGooglePay: true,
  enableApplePay: true,
  merchantIdentifier: "merchant.com.crowdbotics.inaday",
  merchantCountryCode: "US",
  merchantCurrency: "USD",
  stripeTestEnv: true,
  stripePublishKey: ""
};

export default {
  title: "App Menu",
  copy: "Routes available",
  styles: styles,
  localOptions: localOptions,
  token: token
};
