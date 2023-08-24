import { StyleSheet } from "react-native";

const BASE_URL = "http://localhost:8000";

const REDIRECT_URI = "https://www.crowdbotics.com/";
const CLIENT_ID = "";
const CLIENT_SECRET = "";
const WEBHOOK_URL = `${BASE_URL}/webhook/`; // http://localhost:8000/webhook/
const WEBHOOK_TAG = "cb-module";

const userAgent =
  "Mozilla/5.0 (Linux; Android) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/98.0.4758.87 Mobile Safari/537.36";

const styles = StyleSheet.create({
  formListContainer: {
    padding: 10,
    backgroundColor: "#FFF",
    height: "100%"
  },
  colouredText: {
    color: "grey"
  },
  responseButton: {
    padding: 10,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 12
  },
  heading: {
    fontSize: 20,
    marginVertical: 10,
    paddingHorizontal: 10,
    color: "#000",
    fontWeight: "500",
    marginBottom: 20
  },
  p10: {
    padding: 10
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15
  },
  token: {
    width: 100,
    fontWeight: "bold"
  },
  date: {
    fontWeight: "bold"
  },
  responseCard: {
    justifyContent: "center",
    alignItems: "flex-start"
  },
  question: {
    fontWeight: "bold",
    fontSize: 16
  },
  container: {
    width: "100%",
    height: "100%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999
  },
  loaderContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    shadowColor: "#000",
    elevation: 3
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  cardContainer: {
    shadowColor: "gray",
    elevation: 20,
    borderLeftWidth: 3,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10
  },
  resText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "500"
  }
});

export default {
  styles: styles,
  userAgent: userAgent,
  REDIRECT_URI: REDIRECT_URI,
  CLIENT_ID: CLIENT_ID,
  CLIENT_SECRET: CLIENT_SECRET,
  WEBHOOK_URL: WEBHOOK_URL,
  WEBHOOK_TAG: WEBHOOK_TAG
};
