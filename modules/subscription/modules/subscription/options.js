import { StyleSheet, Dimensions } from "react-native";
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  headerContainer: {
    height: 150,
    justifyContent: "center",
    alignItems: "center"
  },
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
  inputField: {
    padding: 15,
    borderWidth: 1,
    fontSize: 18,
    borderRadius: 8,
    backgroundColor: "#fff"
  },
  bold: {
    fontWeight: "600"
  },
  listItemContainer: {
    paddingTop: 15,
    padding: 10,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    height: 350,
    width: deviceWidth / 1.8,
    borderWidth: 1,
    borderColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  selected: {
    borderColor: "#CEEBD6",
    backgroundColor: "#CEEBD6",
    borderWidth: 1
  },
  disabled: {
    backgroundColor: "gray"
  },
  selectedPlanTag: {
    position: "absolute",
    right: 0,
    top: -10,
    borderRadius: 26,
    backgroundColor: "black",
    paddingVertical: 5,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  }
});

export const localOptions = {
  stripeSecretKey: "your stripe secret key here  e.g. sk_test_xxxx",
  merchantName: "Example Inc.",
  enableGooglePay: true,
  enableApplePay: true,
  merchantIdentifier: "merchant.com.crowdbotics.inaday",
  merchantCountryCode: "US",
  merchantCurrency: "USD",
  stripeTestEnv: true,
  stripePublishKey: "your stripe publish key here e.g. pk_test_xxxx"
};

export default {
  title: "App Menu2",
  copy: "Routes available2",
  styles: styles,
  localOptions: localOptions
};
