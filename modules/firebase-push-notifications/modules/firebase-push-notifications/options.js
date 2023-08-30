import { StyleSheet } from "react-native";

// User's accessToken
const authToken = "";
// User's id from backend
const userID = "";

// Source link for the dummy immage
const dummyImageLink =
  "https://img.freepik.com/premium-vector/message-app-icon-paper-cut-style-social-media-icons_505135-255.jpg?w=100";

const styles = StyleSheet.create({
  container: { flex: 1 },
  walletCard: {
    backgroundColor: "#fff",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 15,
    borderRadius: 8,
    elevation: 15,
    shadowColor: "#ccc9c9"
  },
  walletInner: {
    display: "flex",
    flexDirection: "row"
  },
  walletCarder: {
    alignSelf: "center",
    display: "flex",
    flexDirection: "column"
  },
  eventName: {
    color: "#000",
    fontSize: 16,
    marginLeft: 10,
    width: 115,
    fontWeight: "bold"
  },
  eventType: {
    color: "#6e7075",
    fontSize: 14,
    marginLeft: 10,
    width: 115,
    marginVertical: 5
  },
  imgContainer: {
    height: 70,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dadada",
    borderRadius: 10
  },
  image: { height: 70, width: 70, borderRadius: 10 },
  listStyle: {
    marginHorizontal: 15,
    marginTop: 15,
    paddingBottom: 10,
    fontWeight: "bold"
  },
  view: {
    fontSize: 12,
    color: "#6e7075",
    paddingHorizontal: 10,
    marginBottom: 10
  },
  leftSection: { justifyContent: "flex-start", alignItems: "flex-start" },
  reject: {
    fontSize: 12,
    color: "#6e7075",
    backgroundColor: "#fff",
    paddingHorizontal: 10
  }
});

export default {
  authToken: authToken,
  userID: userID,
  styles: styles,
  dummyImageLink: dummyImageLink
};
