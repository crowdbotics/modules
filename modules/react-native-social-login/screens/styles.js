import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = size => (width / guidelineBaseWidth) * size;
const scaleVertical = size => (height / guidelineBaseHeight) * size;

export const Color = {
  malibu: "#46E1FD",
  white: "#fff",
  whiteOff: "#F4F5F9",
  steel: "#CCCCCC",
  black: "#000",
  facebook: "#3b5998",
  google: "#4285F4",
  red: "red"
};

export const styles = StyleSheet.create({
  screen: {
    flexDirection: "column",
    backgroundColor: "white",
    justifyContent: "flex-start",
    paddingHorizontal: 26,
    alignItems: "center"
  },
  input: {
    backgroundColor: "white",
    // marginLeft: scale(10), marginRight: scale(10),
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
  imageContainer: { marginTop: -20, width: width, height: height / 2 },
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
  }
});

export const buttonStyles = {
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
  }
};

export const textInputStyles = {
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
  label: { color: "#6A6A6A", fontSize: 12 },
  error: { color: Color.red, fontSize: 9, marginLeft: 12 }
};
