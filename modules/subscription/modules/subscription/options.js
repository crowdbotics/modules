import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  hr: {
    marginTop: 20,
    marginBottom: 20,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  container: {
    flex: 1,
    height: 100,
    padding: 13,
  },
  text: {
    color: "black",
    fontSize: 20,
  },
  payButton: {
    width: '40%',
    height: 50,
    alignSelf: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    margin: 5,
    height: 50,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  payNow: { 
    width: '40%', 
    alignSelf: 'center', 
    backgroundColor: '#016f70'
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
    padding: 10, 
    margin: 10, 
    backgroundColor: "#c9c9c9c9", 
    borderRadius: 10,
    height: 350,
    width: 200,
    borderWidth: 1
  },
  selected: {
    borderColor: '#EA9FAA',
    backgroundColor: "#EA9F16",
    borderWidth: 1
  },
  disabled: {
      backgroundColor: 'gray'
  }
});

export const localOptions = {
  stripeSecretKey: "sk_test_51EA1HwDWvyLYvYlERNHHINu6Ngdh8MjRGxqRMNc69rOEAJAbv7ru8Ivi07JpUUMG2YbktCNLBO3SxV7NMwDyRjq4007822BMDs",
  merchantName: "Example Inc.",
  enableGooglePay: true,
  enableApplePay: true,
  merchantIdentifier:"merchant.com.crowdbotics.inaday",
  merchantCountryCode: 'US',
  merchantCurrency: 'USD',
  stripeTestEnv: true,
  stripePublishKey: "pk_test_FrvlAsdLgTI9r0qdAO1KcXLI"
}

export default {
  title: "App Menu2",
  copy: "Routes available2",
  styles: styles,
  localOptions: localOptions
};
