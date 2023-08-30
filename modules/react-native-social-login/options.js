import { StyleSheet, Dimensions } from "react-native";

// Web OAuth client id obtained from google developer console
const GOOGLE_WEB_CLIENT_ID = "XXXXXX.apps.googleusercontent.com";
// iOS OAuth client id obtained from google developer console
const GOOGLE_IOS_CLIENT_ID = "YYYYYY.apps.googleusercontent.com";
// Apple service id obtained from apple developer account.
const APPLE_SERVICE_ID = "com.crowdbotics.APP_NAME";

// URL to redirect to once login is successfull
const APPLE_REDIRECT_CALLBACK =
  "https://your-app-here.com/accounts/apple/login/callback/";

// Source link for foreground image
const LOGO_URL =
  "https://crowdbotics-slack-dev.s3.amazonaws.com/media/project_component_resources/cb-icon.png";
// Source link for background image
const BACKGROUND_URL =
  "https://crowdbotics-slack-dev.s3.amazonaws.com/media/project_component_resources/halfbg.png";

const { width, height } = Dimensions.get("window");

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = (size) => (width / guidelineBaseWidth) * size;
const scaleVertical = (size) => (height / guidelineBaseHeight) * size;

const Color = {
  malibu: "#46E1FD",
  white: "#fff",
  whiteOff: "#F4F5F9",
  steel: "#CCCCCC",
  black: "#000",
  facebook: "#3b5998",
  google: "#4285F4",
  red: "red"
};

const styles = StyleSheet.create({
  screen: {
    flexDirection: "column",
    backgroundColor: "white",
    justifyContent: "flex-start",
    paddingHorizontal: 26,
    alignItems: "center"
  },
  googleLoginButton: {
    width: "99%",
    height: 48,
    marginHorizontal: 2
  },
  foregroundImage: {
    width: 155,
    height: 155,
    alignSelf: "center",
    resizeMode: "contain"
  },
  forgotPasswordView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  backgroundImageStyles: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
    height: "100%",
    width: "100%"
  },
  orText: {
    textAlign: "center",
    width: "100%",
    marginVertical: 5
  },
  appleButton: {
    width: "97%", // You must specify a width
    height: 44, // You must specify a height
    marginHorizontal: 5,
    marginTop: 2
  },
  facebookButton: {
    backgroundColor: Color.facebook,
    borderColor: Color.facebook,
    marginHorizontal: 5,
    marginBottom: 2
  },
  input: {
    backgroundColor: "white",
    marginTop: scaleVertical(5),
    marginBottom: scaleVertical(5),
    borderRadius: 5,
    borderColor: "#95989A",
    padding: 5,
    height: 40,
    borderWidth: 1,
    width: "100%"
  },
  label: {
    fontWeight: "bold",
    color: "#979797"
  },
  fieldContainer: {
    alignItems: "flex-start",
    width: "100%",
    marginTop: scaleVertical(8)
  },
  heading: {
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: scaleVertical(25),
    fontSize: 20,
    fontFamily: "Roboto-Bold",
    color: "#707070"
  },
  actionButon: {
    backgroundColor: Color.malibu,
    borderWidth: 0,
    marginLeft: scale(10),
    marginRight: scale(10),
    marginTop: scaleVertical(10),
    marginBottom: scaleVertical(10),
    borderRadius: 5,
    height: 44,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  image: {
    resizeMode: "contain",
    marginBottom: scale(10),
    marginTop: scaleVertical(63)
  },
  logo: {
    width: 155,
    height: 155,
    alignSelf: "center",
    resizeMode: "contain"
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    resizeMode: "cover",
    height: "100%",
    width: "100%"
  },
  textRow: {
    textAlign: "center",
    color: "#707070",
    fontSize: 14,
    marginVertical: scaleVertical(5),
    fontFamily: "Roboto-Regular"
  },
  boldText: {
    fontWeight: "bold"
  },
  text: {
    color: "black",
    fontSize: 14,
    paddingVertical: scaleVertical(5)
  },
  button: {
    alignItems: "center",
    backgroundColor: Color.malibu,
    padding: 10
  },
  container: {
    flex: 1,
    backgroundColor: Color.whiteOff
  },
  imageContainer: {
    marginTop: -20,
    width: width,
    height: height / 2
  },
  cardView: {
    marginTop: -90,
    marginBottom: 20,
    marginHorizontal: 20,
    backgroundColor: Color.white,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    borderRadius: 10,
    elevation: 3,
    shadowOffset: { height: 10, width: 10 },
    shadowOpacity: 0.3,
    shadowColor: Color.steel
  },
  tabContainerStyle: {
    marginTop: 5,
    marginHorizontal: 10,
    width: "100%",
    elevation: 0,
    paddingBottom: 20,
    backgroundColor: Color.white
  },
  activeTabStyle: {
    borderBottomWidth: 5,
    borderBottomColor: Color.malibu,
    paddingBottom: 5
  },
  tabStyle: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 10,
    fontSize: 18
  },
  error1: {
    color: "#f77474",
    fontStyle: "italic",
    fontSize: 14,
    paddingTop: 10,
    alignSelf: "center"
  },
  error: {
    color: "#f77474",
    fontStyle: "italic",
    fontSize: 12,
    paddingLeft: 50
  },
  viewStyle: {
    backgroundColor: Color.malibu,
    borderRadius: 5,
    borderColor: Color.black,
    justifyContent: "center",
    marginHorizontal: 10,
    marginBottom: 10,
    height: 40
  },
  textStyle: {
    fontSize: 16,
    textAlign: "center",
    color: Color.white,
    marginHorizontal: 20,
    marginVertical: 10
  },
  textInput: {
    borderColor: Color.steel,
    borderWidth: 0.5,
    borderRadius: 5,
    fontSize: 18,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 7,
    color: Color.black
  },
  inputLabel: {
    color: "#6A6A6A",
    fontSize: 12
  },
  inputError: {
    color: Color.red,
    fontSize: 9,
    marginLeft: 12
  }
});

export default {
  styles: styles,
  Color: Color,
  GOOGLE_WEB_CLIENT_ID: GOOGLE_WEB_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID: GOOGLE_IOS_CLIENT_ID,
  APPLE_SERVICE_ID: APPLE_SERVICE_ID,
  APPLE_REDIRECT_CALLBACK: APPLE_REDIRECT_CALLBACK,
  BACKGROUND_URL: BACKGROUND_URL,
  LOGO_URL: LOGO_URL
};
