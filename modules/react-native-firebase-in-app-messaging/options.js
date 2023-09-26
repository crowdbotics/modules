import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    padding: 35,
    justifyContent: "center"
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    padding: 20
  },
  simpleText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 16
  },
  buttonTextStyle: {
    color: "white",
    fontWeight: "bold"
  },
  buttonStyle: {
    alignItems: "center",
    backgroundColor: "#000",
    padding: 10,
    width: "100%",
    marginTop: 16,
    borderRadius: 3
  },
  footerHeading: {
    fontSize: 18,
    textAlign: "center",
    color: "grey"
  },
  footerText: {
    fontSize: 16,
    textAlign: "center",
    color: "grey"
  }
});

export default {
  styles: styles
};
