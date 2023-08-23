import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 10,
    marginTop: 10
  },
  text: {
    fontSize: 15,
    paddingVertical: 5,
    textAlign: "center"
  },
  header: {
    flexDirection: "row",
    borderLeftColor: "#EA8FEA",
    borderLeftWidth: 1,
    borderRightColor: "#EA8FEA",
    borderRightWidth: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F7C8E0"
  },
  hText: {
    alignSelf: "center",
    textAlign: "center",
    borderColor: "#EA8FEA",
    borderWidth: 1,
    width: "33.33%",
    paddingVertical: 9,
    color: "#000"
  },
  tableRow: {
    flexDirection: "row",
    borderLeftColor: "#EA8FEA",
    borderLeftWidth: 1,
    borderRightColor: "#EA8FEA",
    borderRightWidth: 1,
    justifyContent: "space-between",
    alignItems: "center"
  },
  feeContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    zIndex: 999
  },
  mr10: {
    marginLeft: 15,
    marginBottom: 10
  },
  inputContainer: {
    width: "50%"
  },
  sortContainer: {
    width: "34%"
  }
});
