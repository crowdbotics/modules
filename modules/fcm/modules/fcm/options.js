
import { StyleSheet } from "react-native";

const authToken = "71ff6f22e983ed6da5df25ff8524057ee5830400";
const senderID = "678501629451";

const styles = StyleSheet.create({
  heading: {
    height: 60,
    backgroundColor: "#333333",
    padding: 20,
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "center"
  },
  text: {
    color: "#000000",
    fontSize: 16,
    width: "100%"
  },
  icon: { width: 18, height: 16 },
  touchableopacity: { padding: 5 },
  scrollview: { flex: 1, padding: 20 },
  header: { color: "#fff", fontSize: 16 }
});

export default {
  authToken: authToken,
  senderID: senderID,
  styles: styles
};
