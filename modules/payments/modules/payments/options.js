import { StyleSheet, Dimensions } from "react-native";

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  hr: {
    marginTop: 20,
    marginBottom: 20,
    borderBottomColor: "black",
    borderBottomWidth: 1
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center"
  },
  checkoutView: {
    paddingHorizontal: 15,
    margin: 20
  },
  inputField: {
    padding: 15,
    borderWidth: 1,
    fontSize: 18,
    borderRadius: 8,
    backgroundColor: "#fff"
  },
  list: {
    marginHorizontal: 15,
    marginTop: 15,
    paddingBottom: 10
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
    alignSelf: "center",
    width: deviceWidth / 2.5,
    height: 50
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
    height: 42
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "500",
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

// Backend API authentication token
const token = "Token user_authentication_token";

const STRIPE_SECRET_KEY = "sk_test_xxxxxxxxxxx";
const MERCHANT_NAME = "Example Inc.";
const ENABLE_GOOGLE_PAY = true;
const ENABLE_APPLE_PAY = true;
const MERCHANT_IDENTIFIER = "merchant.com.crowdbotics.inaday";
const MERCHANT_COUNTRY_CODE = "US";
const MERCHANT_CURRENCY = "USD";
const STRIPE_TEST_ENV = true;
const STRIPE_PUBLISH_KEY = "pk_test_xxxxxxxxxx";

export default {
  title: "App Menu",
  copy: "Routes available",
  styles: styles,
  token: token,
  STRIPE_SECRET_KEY: STRIPE_SECRET_KEY,
  MERCHANT_NAME: MERCHANT_NAME,
  ENABLE_GOOGLE_PAY: ENABLE_GOOGLE_PAY,
  ENABLE_APPLE_PAY: ENABLE_APPLE_PAY,
  MERCHANT_IDENTIFIER: MERCHANT_IDENTIFIER,
  MERCHANT_COUNTRY_CODE: MERCHANT_COUNTRY_CODE,
  MERCHANT_CURRENCY: MERCHANT_CURRENCY,
  STRIPE_TEST_ENV: STRIPE_TEST_ENV,
  STRIPE_PUBLISH_KEY: STRIPE_PUBLISH_KEY
};
