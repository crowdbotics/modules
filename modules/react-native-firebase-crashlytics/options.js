import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonStyles: {
    width: 160,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 4,
    marginHorizontal: 10,
    marginVertical: 10
  },
  buttonTitle: {
    color: "#fff",
    fontWeight: "500"
  },
  screenTitle: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 32,
    fontWeight: "500",
    color: "#000"
  },
  switchView: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default {
  styles: styles
};
