import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get("window");
const popupStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00a4de"
  },
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 164, 222, 0.9)",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  contentContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff"
  },
  logo: {
    marginVertical: 45
  },
  heading: {
    textAlign: "center",
    color: "#00a4de",
    fontSize: 21
  },
  buttonContainer: {
    padding: 20
  },
  buttonText: {
    color: "#8fbc5a",
    fontSize: 15,
    fontWeight: "bold"
  },
  popup: {
    width: width * 0.8
  }
});

const descriptionStyle = (error) => ({
  textAlign: "center",
  color: error ? "#ea3d13" : "#a5a5a5",
  height: 65,
  fontSize: 18,
  marginVertical: 10,
  marginHorizontal: 20
});

export default {
  popupStyles: popupStyles,
  descriptionStyle: descriptionStyle
};
